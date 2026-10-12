// Read-only public smoke checks. No accounts, leads, subscriptions or charges are created.
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { createInterface } from 'node:readline';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, openSync } from 'node:fs';
const base = process.env.QALT_AUDIT_URL || 'http://localhost:3201';
const out = process.env.QALT_AUDIT_OUT || 'test-results/refinement-audit';
mkdirSync(out, {recursive:true});
let server;
if(!base.startsWith('https:')) {
  server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3201'],{env:{...process.env,DATABASE_URL:'postgresql://fixture:fixture@localhost/fixture',JWT_SECRET:'fixture-only-secret',RESEND_API_KEY:'re_fixture',NEXT_PUBLIC_APP_URL:base},stdio:['ignore',openSync(`${out}/server.log`,'w'),openSync(`${out}/server-error.log`,'w')]});
  for(let i=0;i<60;i++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,250));}
}
const browser = await chromium.launch({executablePath:process.env.QALT_CHROMIUM_EXECUTABLE || undefined,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--host-resolver-rules=MAP localhost 127.0.0.1'],proxy:base.startsWith('https:') && process.env.HTTPS_PROXY ? {server:process.env.HTTPS_PROXY} : undefined});
const context = await browser.newContext({ignoreHTTPSErrors:true,reducedMotion:'reduce'});
if(process.env.QALT_AUDIT_ACCESS_STDIN==='1') {
  const reader=createInterface({input:process.stdin});
  const accessUrl=await new Promise(resolve=>reader.once('line',line=>{reader.close();resolve(line);}));
  await context.request.get(accessUrl,{timeout:60000});
}
const page=await context.newPage();const errors=[];const passed=[];const measurements=[];
page.on('pageerror',error=>errors.push(error.message));
async function check(name,fn){await fn();passed.push(name);console.log(`PASS ${name}`);}
async function visit(path){const start=Date.now();const response=await page.goto(`${base}${path}`,{waitUntil:'domcontentloaded',timeout:60000});assert.equal(response.status(),200,path);const skip=page.getByRole('button',{name:'Skip to website',exact:true});if(await skip.isVisible())await skip.click();await page.locator('h1').first().waitFor();measurements.push({path,domContentLoadedMs:Date.now()-start});}
try {
  await check('home, pricing, signup, login, security and product overview render at phone, tablet and desktop widths',async()=>{
    for(const path of ['/','/pricing','/register','/login','/security','/what-qalt-does']) {
      for(const width of [375,390,768,1024,1440]) {
        console.log(`CHECK ${path} ${width}`);await page.setViewportSize({width,height:900});await visit(path);
        // Trigger existing intersection-driven reveals before capturing the page.
        await page.evaluate(async()=>{const height=Math.min(document.body.scrollHeight,20000);for(let y=0;y<height;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,30));}scrollTo(0,0)});
        if(!await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)) {
          console.log(await page.evaluate(()=>[...document.querySelectorAll('body *')].filter(el=>el.getBoundingClientRect().right>innerWidth+1 && getComputedStyle(el).position!=='absolute').slice(0,20).map(el=>({tag:el.tagName,cls:el.className,text:el.textContent?.slice(0,65),right:el.getBoundingClientRect().right}))));
          await page.screenshot({path:`${out}/failure.png`,fullPage:true});throw new Error(`${path} overflow at ${width}`);
        }
        if([375,1440].includes(width))await page.screenshot({path:`${out}/${path.slice(1)||'home'}-${width}.png`,fullPage:true});
      }
    }
  });
  await check('monthly/annual amounts, billing disclosure and accessible comparison match',async()=>{
    await visit('/pricing');
    await page.getByRole('button',{name:/Monthly/,exact:true}).click();
    assert.equal(await page.getByRole('button',{name:'Monthly',exact:true}).getAttribute('aria-pressed'),'true');
    await page.getByText('$39',{exact:true}).waitFor();await page.getByText('$99',{exact:true}).waitFor();
    await page.getByRole('button',{name:/Annually/}).click();await page.getByText('$29',{exact:true}).waitFor();await page.getByText('$79',{exact:true}).waitFor();
    await page.getByText(/Billed \$348 annually/).waitFor();await page.getByText(/Billed \$948 annually/).waitFor();
    assert.ok(await page.getByRole('table',{name:'Qalt plan feature comparison'}).isVisible());
    const faq=page.getByRole('button',{name:'What happens if I exceed my limit on the free plan?',exact:true});await faq.click();assert.equal(await faq.getAttribute('aria-expanded'),'true');
    await page.getByText(/not calculations or displayed estimates/).waitFor();
    const payment=page.getByRole('button',{name:'How do optional payments work?',exact:true});await payment.click();await page.getByText(/full quoted amount, not a deposit/).waitFor();
    const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');assert.equal(new URL(canonical).pathname,'/pricing');
  });
  await check('keyboard navigation disclosures close with Escape and retain trigger focus',async()=>{
    await page.setViewportSize({width:1440,height:900});await visit('/');
    const product=page.getByRole('button',{name:'Product',exact:true});await product.focus();await page.getByRole('link',{name:/What Qalt Does/}).first().focus();await page.keyboard.press('Escape');
    assert.equal(await product.getAttribute('aria-expanded'),'false');assert.ok(await product.evaluate(el=>document.activeElement===el));
    await page.setViewportSize({width:375,height:900});const open=page.getByRole('button',{name:'Open navigation menu'});await open.click();await page.getByRole('link',{name:'Log in',exact:true}).last().waitFor();await page.keyboard.press('Escape');await open.waitFor();
  });
  await check('signup fields have labels, password visibility and validation without posting an account',async()=>{
    await visit('/register');await page.getByLabel('Company name',{exact:true}).fill('QA sample, never submitted');await page.getByLabel('Work email',{exact:true}).fill('invalid');await page.getByLabel('Password',{exact:true}).fill('short');
    await page.getByRole('button',{name:'Show password'}).click();assert.equal(await page.getByLabel('Password',{exact:true}).getAttribute('type'),'text');
    assert.equal(await page.locator('form').evaluate(form=>form.checkValidity()),false);
    await page.getByText(/14-day Pro trial. No card required/).waitFor();
  });
  await check('public navigation URLs, robots and sitemap respond without dead links',async()=>{
    await visit('/');const links=await page.locator('nav a, footer a, main a').evaluateAll(els=>[...new Set(els.map(el=>el.getAttribute('href')).filter(href=>href?.startsWith('/')).map(href=>href.split('#')[0]||'/'))]);
    for(const path of [...links,'/robots.txt','/sitemap.xml']){if(path==='/demo' && !base.startsWith('https:'))continue;const response=await context.request.get(`${base}${path}`,{timeout:60000});assert.equal(response.status(),200,path);}
  });
  if(base.startsWith('https:'))await check('live demo overview and full-size demo load without payment or account mutation',async()=>{await visit('/demo');await page.getByText(/Payments are disabled in the demo/).first().waitFor();await visit('/demo/try');});
  assert.deepEqual(errors,[]);
} finally {
  writeFileSync(`${out}/results.json`,JSON.stringify({base,passed,errors,measurements,limitations:['Representative viewports in Chromium, not physical Android/iPhone devices.','Read-only smoke, no live charges or account creation.','Timing includes network and is not a Core Web Vitals benchmark.']},null,2));
  await browser.close();
  server?.kill();
}
