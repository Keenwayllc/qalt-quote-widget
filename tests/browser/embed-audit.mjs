import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, writeFileSync, symlinkSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { SignJWT } from 'jose';
import { widgetEmbedCode, widgetFormUrl } from '../../src/lib/widget-embed.ts';
const require=createRequire(import.meta.url);
const {chromium}=require('playwright');
const root=resolve(new URL('../..',import.meta.url).pathname);
const temp=mkdtempSync(join(tmpdir(),'qalt-embed-audit-'));
const out=join(root,'test-results/embed-audit');mkdirSync(out,{recursive:true});
const database=join(temp,'fixture.json');
const defaults={formStyle:'standard',customQuestions:[],primaryColor:'#1E40AF',headerText:'Default form',quickSubtitleText:'Choose your vehicle',buttonText:'Calculate default',showWeight:false,showItemCount:true,showExtras:false,insideDeliveryLabel:'Inside',addon3Label:'Special',disclaimerText:'Default disclaimer',backgroundImageUrl:null,logoUrl:null,companyNameText:'Merchant default',companyNameFont:'Inter',mapLayout:'inline',websiteUrl:'https://merchant.example',paymentsEnabled:false,showVehicles:false,pricePerVehicle:0,vehicleOptions:[],showAwb:false,geoFencingEnabled:false,serviceZips:[],themeMode:'light'};
const companies=[{id:'merchantA',name:'A very long merchant name for responsive delivery services',logoUrl:null,logoBackdrop:'dark',subscriptionPlan:'ENTERPRISE',email:'fixture@example.invalid',passwordHash:'PRIVATE_PASSWORD',stripeConnectAccountId:'acct_fixture',customWidgetDomain:'quotes.merchant.example',customWidgetDomainVerified:true,onboardingCompletedAt:new Date().toISOString(),onboardingStep:5,trialEndsAt:null,createdAt:new Date().toISOString()}, {id:'merchantB',name:'Other merchant',subscriptionPlan:'ENTERPRISE',email:'private@example.invalid'}, {id:'empty',name:'Empty',subscriptionPlan:'ENTERPRISE'}];
const forms=[{...defaults,id:'formA',companyId:'merchantA',name:'Default'}, {...defaults,id:'formB',companyId:'merchantA',name:'Second customized',formStyle:'extended',headerText:'Exact second form',companyNameText:'Long customized delivery company name which must wrap on mobile devices',primaryColor:'#087c68',buttonText:'Calculate second',disclaimerText:'Second disclaimer',showVehicles:true,showWeight:true,showExtras:true,showAwb:true,geoFencingEnabled:true,serviceZips:['90001'],vehicleOptions:[{name:'Cargo Van',fee:35,artwork:'cargo-van'}],customQuestions:[{id:'gate',type:'text',label:'Gate instructions',required:true}],themeMode:'dark',backgroundImageUrl:'/images/qalt-icon-400.jpg',logoUrl:'/images/qalt-icon-400.jpg'}, {...defaults,id:'foreign',companyId:'merchantB',name:'Foreign'}];
const price={baseRatePerMile:3,minimumCharge:25,useMinimumCharge:true,minMilesThreshold:0,weightFee:1,itemCountFee:2,additionalStopFee:10,stairsFee:5,insideDeliveryFee:6,addon3Fee:7,afterHoursFee:0,businessHoursStart:'00:00',businessHoursEnd:'23:59',businessDays:'0,1,2,3,4,5,6',largeItemFee:0,largeItemsEnabled:false,largeItemCategories:[],serviceOptions:[]};
writeFileSync(database,JSON.stringify({companies,forms,prices:[{...price,id:'pA',companyId:'merchantA',widgetSettingsId:'formA'},{...price,id:'pB',companyId:'merchantA',widgetSettingsId:'formB',minimumCharge:99},{...price,id:'pForeign',companyId:'merchantB',widgetSettingsId:'foreign'}],quotes:[],installs:[]}));
for(const file of ['src','public','prisma','package.json','tsconfig.json','next.config.ts','postcss.config.mjs'])cpSync(join(root,file),join(temp,file),{recursive:true});
symlinkSync(join(root,'node_modules'),join(temp,'node_modules'),'dir');
writeFileSync(join(temp,'src/lib/prisma.ts'),readFileSync(join(root,'tests/browser/prisma-fixture.ts.fixture')));
// Exercise the real Stripe SDK with its fetch transport; only provider HTTP is mocked.
writeFileSync(join(temp,'src/lib/stripe.ts'),readFileSync(join(root,'src/lib/stripe.ts'),'utf8').replace('new Stripe(process.env.STRIPE_SECRET_KEY)', 'new Stripe(process.env.STRIPE_SECRET_KEY, { httpClient: Stripe.createFetchHttpClient() })'));
// No production credentials or env files are copied.
const port=3219;
const log=join(out,'server.log');const {openSync}=require('node:fs');const fd=openSync(log,'w');
const server=spawn(process.execPath,[join(root,'node_modules/next/dist/bin/next'),'dev','--webpack','--hostname','127.0.0.1','--port',String(port)],{cwd:temp,env:{...process.env,DATABASE_URL:'postgresql://fixture:fixture@localhost/fixture',JWT_SECRET:'fixture-only-secret',NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:'fixture',GOOGLE_MAPS_API_KEY:'fixture',RESEND_API_KEY:'fixture',STRIPE_SECRET_KEY:'sk_test_fixture',QALT_FIXTURE_CHECKOUT:join(temp,'checkout.json'),QALT_FIXTURE_DB:database,NODE_OPTIONS:`--require=${join(root,'tests/browser/network-fixture.cjs')}`,NEXT_TELEMETRY_DISABLED:'1'},stdio:['ignore',fd,fd]});
let browser; let testPage; const errors=[];
const results=[];
const db=()=>JSON.parse(readFileSync(database,'utf8'));
async function check(name,fn){await fn();results.push(name);console.log(`PASS ${name}`)}
try {
  for(let i=0;i<180;i++){try{const response=await fetch(`http://localhost:${port}/widget/form/formB`);if(response.ok)break;}catch{}if(i===179)throw new Error('Next server did not become ready');await new Promise(r=>setTimeout(r,500));}
  browser=await chromium.launch({executablePath:process.env.QALT_CHROMIUM_EXECUTABLE || undefined,headless:true,args:['--no-sandbox']});
  const context=await browser.newContext({viewport:{width:390,height:900},reducedMotion:'reduce'});
  const page=await context.newPage();testPage=page;page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error' && !m.text().includes('/_next/webpack-hmr') && !(m.text().includes('503 (Service Unavailable)') && m.location().url.includes('/api/zip-areas')))errors.push(m.text())});
  await context.route('https://www.qalt.site/**',async route=>{
    const request=route.request(); const url=new URL(request.url());
    const headers={...request.headers(),host:'localhost',origin:`http://localhost:${port}`};
    const response=await route.fetch({url:`http://localhost:${port}${url.pathname}${url.search}`,headers});await route.fulfill({response});
  });
  const maps=readFileSync(join(root,'tests/browser/google-maps-fixture.js'),'utf8');
  await context.route('https://maps.googleapis.com/**',async route=>{await new Promise(r=>setTimeout(r,250));await route.fulfill({contentType:'text/javascript',body:maps})});
  await context.route('https://fonts.googleapis.com/**',route=>route.fulfill({contentType:'text/css',body:''}));
  await context.route('https://checkout.stripe.com/**',route=>route.fulfill({contentType:'text/html',body:'<h1>Fixture secure checkout</h1>'}));
  const host='https://funnel.systeme.io/quote';
  await context.route(host,route=>route.fulfill({contentType:'text/html',body:`<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="margin:0"><main>${widgetEmbedCode('formB')}</main></body></html>`}));
  await check('actual public route renders without framework or hydration errors',async()=>{
    await page.goto(widgetFormUrl('formB'));await page.getByText('Exact second form',{exact:true}).waitFor();
    await page.getByPlaceholder('Enter pickup address').waitFor();await page.waitForFunction(()=>!document.querySelector('input[placeholder="Enter pickup address"]').disabled,undefined,{timeout:15000});
    assert.equal(await page.locator('[data-nextjs-dialog]').count(),0);assert.equal(await page.locator('[data-qalt-widget-theme]').getAttribute('data-qalt-widget-theme'),'dark');assert.equal(db().installs.length,0);
    const consent=page.getByRole('button',{name:'Accept all',exact:true});if(await consent.isVisible())await consent.click();
  });
  await check('company URL renders default and stale/empty forms return 404',async()=>{
    await page.goto('https://www.qalt.site/widget/merchantA');await page.getByText('Default form',{exact:true}).waitFor();
    for(const path of ['/widget/form/deleted','/widget/empty']){const r=await fetch(`http://localhost:${port}${path}`);const body=await r.text();assert.ok(r.status===404 || body.includes('NEXT_HTTP_ERROR_FALLBACK;404'), `Missing safe not-found response for ${path}`);}
  });
  await check('generated HTML parses and iframe loads selected form on Systeme.io-like host',async()=>{
    await page.goto(host);const frame=page.frameLocator('iframe');await frame.getByText('Exact second form',{exact:true}).waitFor();assert.equal(await page.locator('iframe').getAttribute('src'),widgetFormUrl('formB'));
    assert.equal(await page.locator('iframe').getAttribute('title'),'Delivery quote form');assert.equal(await page.locator('iframe').getAttribute('sandbox'),null);
    const actual=page.frames().find(f=>f.url().includes('/widget/form/formB'));
    await actual.waitForFunction(()=>!document.querySelector('input[placeholder="Enter pickup address"]')?.disabled,undefined,{timeout:15000});
    console.log('Embed context',await actual.evaluate(()=>({referrer:document.referrer,ancestors:Array.from(location.ancestorOrigins),embedded:top!==self})));
    for(let i=0;i<40&&!db().installs.length;i++)await page.waitForTimeout(250);
    assert.equal(db().installs.find(i=>i.domain==='funnel.systeme.io'&&i.formId==='formB')?.loadCount,1);
  });
  await check('375, 390, 768, 1024 and 1440px layouts do not clip horizontally',async()=>{
    for(const width of [375,390,768,1024,1440]){
      await page.setViewportSize({width,height:1000});const frame=page.frames().find(f=>f.url().includes('/widget/form/formB'));
      const layout=await frame.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert.ok(layout.scroll<=layout.width+1,JSON.stringify({width,...layout}));
      await page.screenshot({path:join(out,`embed-${width}.png`),fullPage:true});
    }
  });
  const frame=()=>page.frameLocator('iframe');
  async function address(placeholder,text){await frame().getByPlaceholder(placeholder).fill(text);await frame().getByRole('button',{name:`${text} fixture address`,exact:true}).click();}
  await check('autocomplete, geofence and vehicle controls run inside actual iframe',async()=>{
    await address('Enter pickup address','Outside pickup');await address('Enter dropoff address','Outside dropoff');
    await frame().getByRole('button',{name:/Cargo Van/}).click();await frame().locator('input[name="vehicleCount"]').fill('1');await frame().getByLabel('Gate instructions').fill('Gate 4');
    await frame().getByRole('button',{name:/Calculate second/}).click();await frame().getByText(/don't currently service that area/).waitFor();
    await address('Enter pickup address','Pickup');await address('Enter dropoff address','Dropoff');
  });
  await check('customer quote form has no separate ZIP lookup or service-area editor',async()=>{
    assert.equal(await frame().getByRole('region',{name:'ZIP area map',exact:true}).count(),0);
    assert.equal(await frame().getByRole('region',{name:'Service area map',exact:true}).count(),0);
    assert.equal(await frame().getByLabel('Look up a ZIP code').count(),0);
  });
  await check('route calculation and form-specific quote pricing use real estimate API',async()=>{
    const response=page.waitForResponse(r=>r.url().includes('/estimate')&&r.request().method()==='POST');await frame().getByRole('button',{name:/Calculate second/}).click();const r=await response;assert.equal(r.status(),200);const data=await r.json();assert.equal(data.estimate,134);await frame().getByPlaceholder('John Doe').waitFor();
    assert.ok(await frame().locator('[data-fixture-map]').count()>0);
  });
  await check('quote submits through real API with correct form snapshot and custom answers',async()=>{
    await frame().getByPlaceholder('John Doe').fill('Fixture Customer');await frame().getByPlaceholder('john@example.com').fill('customer@example.invalid');await frame().getByPlaceholder('(555) 000-0000').fill('5550000000');
    const response=page.waitForResponse(r=>r.url().includes('/submit')&&r.request().method()==='POST');await frame().getByRole('button',{name:/Send|Submit|Request|Book/}).click();const r=await response;assert.equal(r.status(),200,await r.text());await frame().getByText(/Your quote is ready/i).first().waitFor();
    const quote=db().quotes.at(-1);assert.equal(quote.companyId,'merchantA');assert.equal(JSON.parse(quote.selectedExtras).formId,'formB');assert.equal(quote.estimatedPrice,134);assert.ok(quote.selectedExtras.includes('Gate 4'));
    const receipt=frame().getByRole('region',{name:'Saved quote details'});
    await receipt.getByText('Gate 4',{exact:true}).waitFor();await receipt.getByText('$134.00',{exact:true}).first().waitFor();
    await frame().getByText('Your quote has been saved. This is an estimate. Your delivery is not booked yet.',{exact:true}).waitFor();
    assert.equal(await frame().getByText(/will reach out shortly/).count(),0);
    const actual=page.frames().find(f=>f.url().includes('/widget/form/formB'));
    const icon=await actual.locator('[data-qalt-success-icon]').evaluate(el=>({stroke:getComputedStyle(el).stroke,color:getComputedStyle(el.parentElement).color}));
    assert.equal(icon.stroke,'rgb(4, 120, 87)');
    for(const width of [375,1440]){await page.setViewportSize({width,height:1000});const layout=await actual.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert.ok(layout.scroll<=layout.width+1);await page.screenshot({path:join(out,`quote-receipt-${width}.png`),fullPage:true});}
  });
  await check('refresh counts one more iframe load without creating duplicate domain/form rows',async()=>{await page.reload();await frame().getByText('Exact second form',{exact:true}).waitFor();for(let i=0;i<40 && db().installs[0]?.loadCount!==2;i++)await page.waitForTimeout(250);assert.equal(db().installs.length,1);assert.equal(db().installs[0].loadCount,2)});
  const token=await new SignJWT({companyId:'merchantA',email:'fixture@example.invalid'}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('1h').sign(new TextEncoder().encode('fixture-only-secret'));
  await context.addCookies([{name:'qalt_token',value:token,domain:'www.qalt.site',path:'/'}]);
  await check('embed selector honors non-default form and preview URL equals copied HTML URL',async()=>{
    await page.goto('https://www.qalt.site/dashboard/embed?formId=formB');await page.getByLabel('Selected form').waitFor();await page.waitForFunction(()=>document.querySelector('select[aria-label="Selected form"]')?.value==='formB');assert.ok((await page.locator('pre code').textContent()).includes(widgetFormUrl('formB')));assert.equal(await page.locator('iframe').getAttribute('src'),widgetFormUrl('formB'));await page.getByText(/Your verified domain quotes.merchant.example opens the default form/).waitFor();await page.getByRole('button',{name:'Systeme.io'}).click();await page.getByText('Save and publish the page.').waitFor();
  });
  await check('default, invalid and switched embed selections never silently copy another form',async()=>{
    await page.goto('https://www.qalt.site/dashboard/embed');
    await page.waitForFunction(()=>document.querySelector('select[aria-label="Selected form"]')?.value==='formA');
    assert.ok((await page.locator('pre code').textContent()).includes(widgetFormUrl('formA')));
    await page.getByLabel('Selected form').selectOption('formB');
    assert.ok((await page.locator('pre code').textContent()).includes(widgetFormUrl('formB')));
    await page.goto('https://www.qalt.site/dashboard/embed?formId=foreign');
    await page.getByText('That form is unavailable. Choose an existing form below.').waitFor();
    assert.equal(await page.getByRole('button',{name:'Copy Snippet'}).isDisabled(),true);
    assert.equal((await page.locator('pre code').textContent()).trim(),'');
    await page.getByLabel('Selected form').selectOption('formB');
  });
  await check('clipboard errors stay visible and successful copying uses selected-form HTML',async()=>{
    await page.evaluate(()=>{navigator.clipboard.writeText=async()=>{throw new Error('Clipboard unavailable')}});
    await page.getByRole('button',{name:'Copy Snippet'}).click();
    await page.getByText('Copy failed. Select the snippet below and copy it manually.').waitFor();
    assert.equal(await page.getByRole('button',{name:'Copied!'}).count(),0);
    await page.evaluate(()=>{navigator.clipboard.writeText=async(value)=>{window.fixtureClipboard=value}});
    await page.getByRole('button',{name:'Copy Snippet'}).click();await page.getByRole('button',{name:'Copied!'}).waitFor();
    assert.equal(await page.evaluate(()=>window.fixtureClipboard),widgetEmbedCode('formB'));
  });
  await check('verified custom-domain root stays default and unverified domains never alter form embeds',async()=>{
    const result=await fetch(`http://localhost:${port}/custom-widget/quotes.merchant.example`);const html=await result.text();
    assert.ok(html.includes('https://www.qalt.site/widget/merchantA?surface=custom-domain'));
    const state=db();state.companies[0].customWidgetDomainVerified=false;writeFileSync(database,JSON.stringify(state));
    await page.goto('https://www.qalt.site/dashboard/embed?formId=formB');
    await page.waitForFunction(()=>document.querySelector('select[aria-label="Selected form"]')?.value==='formB');
    assert.ok((await page.locator('pre code').textContent()).includes(widgetFormUrl('formB')));
    assert.equal(await page.getByText(/Your verified domain/).count(),0);
    const restored=db();restored.companies[0].customWidgetDomainVerified=true;writeFileSync(database,JSON.stringify(restored));
  });
  await check('save and new session retain selected-form changes without altering default form',async()=>{
    await page.goto('https://www.qalt.site/dashboard/widget?formId=formB');
    await page.getByLabel('Header Title').fill('Saved second form');
    const serviceMap=page.getByRole('region',{name:'Service area map',exact:true});
    await serviceMap.getByText('Highlighted ZIP areas: 90001',{exact:true}).waitFor();
    const zipInput=page.getByPlaceholder('e.g. 60601, 60602, 60603');await zipInput.fill('91601, 90024');await zipInput.press('Enter');
    await serviceMap.getByText('Highlighted ZIP areas: 90001, 90024, 91601',{exact:true}).waitFor();
    await page.getByRole('button',{name:'Remove 90024',exact:true}).click();await serviceMap.getByText('Highlighted ZIP areas: 90001, 91601',{exact:true}).waitFor();
    await serviceMap.screenshot({path:join(out,'service-area-map.png')});
    await page.getByRole('button',{name:'Remove 91601',exact:true}).click();
    for(const zip of ['99701','96813','99546']){
      await zipInput.fill(zip);await zipInput.press('Enter');await serviceMap.getByText(new RegExp(`Highlighted ZIP areas: .*${zip}`)).waitFor();
      const bounds=JSON.parse(await serviceMap.locator('[data-fixture-zip-areas]').getAttribute('data-fixture-bounds'));
      if(zip==='99701')assert.ok(bounds.north>60);if(zip==='96813')assert.ok(bounds.west<-150);
      await page.getByRole('button',{name:`Remove ${zip}`,exact:true}).click();
      await serviceMap.getByText('Highlighted ZIP areas: 90001',{exact:true}).waitFor();
    }
    await zipInput.fill('00000');await zipInput.press('Enter');await serviceMap.getByText(/No mapped area available for: 00000/).waitFor();await page.getByRole('button',{name:'Remove 00000',exact:true}).click();
    await zipInput.fill('88888');await zipInput.press('Enter');await serviceMap.getByRole('button',{name:'Retry ZIP map',exact:true}).waitFor();assert.equal(await serviceMap.locator('[data-fixture-zip-areas]').count(),0);
    await page.getByRole('button',{name:'Remove 88888',exact:true}).click();await serviceMap.getByText('Highlighted ZIP areas: 90001',{exact:true}).waitFor();


    await page.getByText('Enable Pay & Book',{exact:true}).click();
    assert.equal(await page.locator('input[name="paymentsEnabled"]').isChecked(),true);
    const saved=page.waitForResponse(r=>r.url().includes('/api/dashboard/widget') && r.request().method()==='POST');
    await page.getByRole('button',{name:'Save Settings',exact:true}).click();
    assert.equal((await saved).status(),200);
    await page.getByText('Widget settings updated!',{exact:true}).waitFor();
    const preview=page.frameLocator('iframe[title="Saved customer form preview"]');
    await preview.getByText('Saved second form',{exact:true}).waitFor();
    await context.clearCookies();await page.goto(widgetFormUrl('formB'));await page.getByText('Saved second form',{exact:true}).waitFor();assert.equal(db().forms.find(f=>f.id==='formA').headerText,'Default form');
  });
  await check('payment-enabled iframe uses a user link to top-level secure checkout',async()=>{
    await page.evaluate(()=>sessionStorage.clear());await page.goto(host);await address('Enter pickup address','Pickup');await address('Enter dropoff address','Dropoff');await frame().getByRole('button',{name:/Cargo Van/}).click();await frame().locator('input[name="vehicleCount"]').fill('1');await frame().getByLabel('Gate instructions').fill('Gate 4');await frame().getByRole('button',{name:/Calculate second/}).click();await frame().getByPlaceholder('John Doe').fill('Payment Fixture');await frame().getByPlaceholder('john@example.com').fill('payment@example.invalid');await frame().getByPlaceholder('(555) 000-0000').fill('5550000000');await frame().getByRole('button',{name:'Pay & Book'}).click();await frame().getByRole('button',{name:'Continue to secure payment'}).click();await frame().getByRole('link',{name:'Continue to secure payment'}).waitFor();assert.ok(JSON.parse(readFileSync(join(temp,'checkout.json'),'utf8')).cancel_url.endsWith('/widget/form/formB?cancelled=1'));await frame().getByRole('link',{name:'Continue to secure payment'}).click();await page.getByText('Fixture secure checkout').waitFor();assert.ok(page.url().startsWith('https://checkout.stripe.com/'));
  });
  await check('public hydration also works without reduced motion',async()=>{
    await page.emulateMedia({reducedMotion:'no-preference'});
    await page.goto(widgetFormUrl('formB'));await page.getByText('Saved second form',{exact:true}).waitFor();
    await page.evaluate(()=>sessionStorage.clear());await page.reload();
    await page.getByPlaceholder('Enter pickup address').waitFor();
    await page.waitForFunction(()=>document.querySelector('input[placeholder="Enter pickup address"]')?.disabled === false);
    assert.equal(await page.locator('[data-nextjs-dialog]').count(),0);
  });
  await page.emulateMedia({reducedMotion:'reduce'});
  await context.addCookies([{name:'qalt_token',value:token,domain:'www.qalt.site',path:'/'}]);
  await check('merchant saves service fees and delivery windows for the selected form',async()=>{
    await page.goto('https://www.qalt.site/dashboard/pricing?formId=formB');
    const consent=page.getByRole('button',{name:'Accept all',exact:true});if(await consent.isVisible())await consent.click();
    // The server-rendered preset can appear before the cold dev client hydrates.
    const standardPreset=page.getByRole('button',{name:/^[+✓] Standard$/});
    for(let i=0;i<8 && !await standardPreset.isDisabled();i++){await standardPreset.click();await page.waitForTimeout(250);}
    assert.equal(await standardPreset.isDisabled(),true);
    await page.getByRole('button',{name:'+ Rush',exact:true}).click();
    await page.getByRole('button',{name:'+ Scheduled Route',exact:true}).click();
    const fees=page.locator('input[id^="service-fee-"]');await fees.nth(0).fill('10');await fees.nth(1).fill('30');await fees.nth(2).fill('0');
    const windows=page.locator('input[id^="service-window-"]');await windows.nth(0).fill('Today by 6 PM');await windows.nth(1).fill('Within 2 hours after pickup');await windows.nth(2).fill('Selected delivery date');
    const response=page.waitForResponse(r=>r.url().includes('/api/dashboard/pricing')&&r.request().method()==='PATCH');
    await page.getByRole('button',{name:'Save services',exact:true}).click();assert.equal((await response).status(),200);
    assert.equal(db().prices.find(p=>p.widgetSettingsId==='formA').serviceOptions.length,0);
    assert.equal(db().prices.find(p=>p.widgetSettingsId==='formB').serviceOptions[1].deliveryWindow,'Within 2 hours after pickup');
  });
  await check('merchant adds conditional shipment preset and saves answer fees through real editor',async()=>{
    await page.goto('https://www.qalt.site/dashboard/forms');await page.getByRole('button',{name:'Edit fields & questions',exact:true}).click();
    await page.getByRole('button',{name:'Add furniture and pallet questions',exact:true}).click();
    await page.getByLabel('Fee for Yes',{exact:true}).nth(0).fill('25');await page.getByLabel('Fee for Yes',{exact:true}).nth(2).fill('40');
    const response=page.waitForResponse(r=>r.url().includes('/api/dashboard/forms/formB')&&r.request().method()==='PATCH');
    await page.getByRole('button',{name:'Save selections',exact:true}).click();const result=await response;assert.equal(result.status(),200,await result.text());
    assert.equal(db().forms.find(f=>f.id==='formB').customQuestions.length,9);
    assert.equal(db().forms.find(f=>f.id==='formA').customQuestions.length,0);
    const state=db();state.forms.find(f=>f.id==='formB').paymentsEnabled=false;writeFileSync(database,JSON.stringify(state));
    await context.clearCookies();await page.goto(widgetFormUrl('formB'));await page.evaluate(()=>sessionStorage.clear());await page.goto(host);
  });
  await check('iframe compares full service totals with conditional furniture handling fees',async()=>{
    await address('Enter pickup address','Pickup');await address('Enter dropoff address','Dropoff');
    await frame().getByRole('button',{name:/Cargo Van/}).click();await frame().locator('input[name="vehicleCount"]').fill('1');
    await frame().getByLabel('Gate instructions').fill('Gate 8');await frame().getByLabel('What are you shipping?').selectOption('Furniture');
    await frame().getByLabel('Are there stairs at pickup or delivery?').selectOption('Yes');await frame().getByLabel('Is an elevator available?').selectOption('No');
    await frame().getByLabel('Do you need two-person handling?').selectOption('Yes');await frame().getByLabel('Furniture dimensions (L × W × H, inches)').fill('72 × 30 × 28');
    assert.equal(await frame().getByLabel('Total pallet weight (lb)').count(),0);
    const response=page.waitForResponse(r=>r.url().includes('/estimate')&&r.request().method()==='POST');await frame().getByRole('button',{name:'Calculate second',exact:true}).click();
    const result=await response;assert.equal(result.status(),200,await result.text());const prices=await result.json();
    assert.deepEqual(prices.serviceComparisons.map(s=>s.total),[209,229,199]);
    await frame().getByRole('button',{name:/^Rush/}).getByText('$229.00',{exact:false}).waitFor();await frame().getByText('Within 2 hours after pickup',{exact:true}).waitFor();
    await page.setViewportSize({width:375,height:1000});const actual=page.frames().find(f=>f.url().includes('/widget/form/formB'));
    const sizes=await actual.evaluate(()=>[innerWidth,document.documentElement.scrollWidth]);assert.ok(sizes[1]<=sizes[0]+1);
    await frame().getByRole('button',{name:/^Rush/}).scrollIntoViewIfNeeded();await page.screenshot({path:join(out,'shipment-comparison-375.png'),fullPage:true});
  });
  await check('changing shipment clears displayed totals and ignores hidden handling answers',async()=>{
    await frame().getByLabel('What are you shipping?').selectOption('Documents / parcels');
    assert.equal(await frame().getByLabel('Are there stairs at pickup or delivery?').count(),0);
    assert.equal(await frame().getByText('Quote total',{exact:true}).count(),0);
    const response=page.waitForResponse(r=>r.url().includes('/estimate')&&r.request().method()==='POST');await frame().getByRole('button',{name:'Calculate second',exact:true}).click();
    const result=await response;assert.equal(result.status(),200);assert.deepEqual((await result.json()).serviceComparisons.map(s=>s.total),[144,164,134]);
    await frame().getByRole('button',{name:/^Rush/}).click();await frame().getByRole('button',{name:'Calculate second',exact:true}).click();await frame().getByPlaceholder('John Doe').waitFor();
    await frame().getByRole('button',{name:/^Scheduled Route/}).click();await frame().getByText('$134.00',{exact:true}).first().waitFor();
    await frame().getByRole('button',{name:/^Rush/}).click();
  });
  await check('selected comparison persists authoritative total and only visible answers on booking',async()=>{
    await frame().getByPlaceholder('John Doe').fill('Comparison Customer');await frame().getByPlaceholder('john@example.com').fill('compare@example.invalid');await frame().getByPlaceholder('(555) 000-0000').fill('5550000000');
    const response=page.waitForResponse(r=>r.url().includes('/submit')&&r.request().method()==='POST');await frame().getByRole('button',{name:/Send|Submit|Request|Book/}).click();const result=await response;assert.equal(result.status(),200,await result.text());
    const quote=db().quotes.at(-1);assert.equal(quote.estimatedPrice,164);assert.equal(quote.serviceType,'Rush');
    const saved=JSON.parse(quote.selectedExtras);assert.equal(saved.deliveryWindow,'Within 2 hours after pickup');assert.equal(saved.customAnswers.length,2);assert.ok(!saved.customAnswers.some(a=>a.label.includes('stairs')));assert.ok(!quote.pricingBreakdown.lineItems.some(i=>i.key.startsWith('question:')));
  });
  assert.deepEqual(errors,[],'Browser errors');
  writeFileSync(join(out,'results.json'),JSON.stringify({passed:results,errors,limitations:['Google Maps, Stripe and email responses mocked at external boundaries.','In-memory fixture replaces Prisma in temporary application.','Merchant production site and live payment not exercised.']},null,2));
  console.log(`All ${results.length} browser scenarios passed. Evidence: ${out}`);
} catch(error){console.error(error);console.error('Browser errors:',errors);if(testPage){console.error(await testPage.locator('body').innerText().catch(()=>''));await testPage.screenshot({path:join(out,'failure.png'),fullPage:true}).catch(()=>{});}writeFileSync(join(out,'results.json'),JSON.stringify({passed:results,failure:String(error)},null,2));process.exitCode=1;}
finally{for(const context of browser?.contexts() ?? [])await context.unrouteAll({behavior:'wait'});await browser?.close();const closed=new Promise(r=>server.once('exit',r));server.kill('SIGTERM');await Promise.race([closed,new Promise(r=>setTimeout(r,3000))]);if(server.exitCode===null){server.kill('SIGKILL');await closed;}if(!process.env.QALT_KEEP_FIXTURE)rmSync(temp,{recursive:true,force:true});}
