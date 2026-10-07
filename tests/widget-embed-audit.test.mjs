import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
import { widgetFormUrl, widgetEmbedCode } from '../src/lib/widget-embed.ts';
import { safeWidgetUrl } from '../src/lib/widget-urls.ts';
import { embeddingWidgetHost, widgetInstallationSource } from '../src/lib/widget-installations.ts';
import { publicCompanySelect, publicWidgetSettingsSelect, publicPricingProfileSelect } from '../src/lib/publicWidget.ts';
import { pricingProfileForForm } from '../src/lib/widget-pricing.ts';
import { getEntitlements } from '../src/lib/plans.ts';
import { sanitizeHex } from '../src/lib/color.ts';
import { normalizeQuickSubtitle } from '../src/lib/quick-subtitle.ts';
import { parseVehicleArtworkKey } from '../src/lib/form-vehicles.ts';
import { safeWidgetFavicon, widgetPageMetadata } from '../src/lib/widget-favicon.ts';
const require = createRequire(import.meta.url);
function load(file, stubs) {
  const js = ts.transpileModule(readFileSync(new URL(`../${file}`, import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: false } }).outputText;
  const cjsModule = { exports: {} };
  new Function('require', 'module', 'exports', js)((name) => name in stubs ? stubs[name] : require(name), cjsModule, cjsModule.exports);
  return cjsModule.exports;
}

test('canonical form URLs and snippets never inherit company, builder or preview origins', () => {
  for (const id of ['default_form', 'second_form']) {
    assert.equal(widgetFormUrl(id), `https://www.qalt.site/widget/form/${id}`);
    const html = widgetEmbedCode(id);
    assert.ok(html.includes(`src="${widgetFormUrl(id)}"`));
    assert.ok(html.includes('title="Delivery quote form"'));
    assert.ok(html.includes('height="1000"'));
    assert.ok(!html.includes('sandbox') && !html.includes('<script'));
  }
  for (const id of [null, undefined, '', '../other', 'x" onload="evil', 'x'.repeat(129)]) {
    assert.equal(widgetFormUrl(id), ''); assert.equal(widgetEmbedCode(id), '');
  }
});
test('unsafe merchant URLs are rejected while HTTPS branding and local image paths work', () => {
  for (const value of ['javascript:alert(1)', 'data:text/html,evil', 'http://merchant.com', '//evil.com', 'https://u:p@merchant.com', 'https://good.com\n']) assert.equal(safeWidgetUrl(value), null);
  assert.equal(safeWidgetUrl('https://merchant.com'), 'https://merchant.com/');
  assert.equal(safeWidgetUrl('/images/logo.png', true), '/images/logo.png');
  assert.equal(safeWidgetUrl('/\\evil.com', true), null);
});
test('tracking separates direct visits, dashboard wrappers, builders and ordinary external hosts', () => {
  const app = 'https://www.qalt.site';
  assert.equal(embeddingWidgetHost(false, 'https://merchant.com', [], app), null);
  assert.equal(embeddingWidgetHost(true, 'https://merchant.com', [], app), 'merchant.com');
  assert.equal(embeddingWidgetHost(true, '', ['https://funnel.systeme.io'], app), 'funnel.systeme.io');
  assert.equal(embeddingWidgetHost(true, 'https://merchant.com', ['https://merchant.com', app], app), null);
  assert.equal(embeddingWidgetHost(true, 'javascript:alert(1)', [], app), null);
  assert.equal(widgetInstallationSource('funnel.systeme.io'), 'Builder/preview detection');
  assert.equal(widgetInstallationSource('systeme.io.attacker.com'), 'Unknown external host');
});

function publicPage(kind) {
  const forms = [{ id: 'a', headerText: 'Default', companyId: 'merchantA', logoUrl: null }, { id: 'b', headerText: 'Second', companyId: 'merchantA', logoUrl: 'https://images.example/logo.png', customQuestions: [{id:'q', label:'Gate', type:'text'}], geoFencingEnabled: true, serviceZips:['90001'], vehicleOptions:[{name:'Van',fee:35}], backgroundImageUrl:'https://images.example/bg.png', advancedAppearance:{marker:'TOKENS'} }];
  const company = { id:'merchantA', name:'Merchant', logoUrl:'https://images.example/company.png', logoBackdrop:'dark', subscriptionPlan:'ENTERPRISE', email:'PRIVATE', passwordHash:'SECRET', widgetSettings:forms, pricingProfiles:[{id:'priceA',widgetSettingsId:'a',minimumCharge:25},{id:'priceB',widgetSettingsId:'b',minimumCharge:99}] };
  const project = (value, select) => Object.fromEntries(Object.entries(select).map(([key, rule]) => [key, rule === true ? value[key] : Array.isArray(value[key]) ? value[key].map(v=>project(v,rule.select)) : value[key] ? project(value[key],rule.select) : null]));
  const prisma = { company: { findUnique: async ({where,select}) => where.id === 'merchantA' ? project(company,select) : where.id === 'empty' ? {...project(company,select),widgetSettings:[]} : null }, widgetSettings:{ findUnique:async ({where,select}) => { const form=forms.find(f=>f.id===where.id); return form ? project({...form,company,pricingProfile:company.pricingProfiles.find(p=>p.widgetSettingsId===form.id)},select) : null; } } };
  const components = {};
  for (const name of ['QuoteWidgetForm','AbandonedQuoteTracker','WidgetInstallTracker','WidgetAppearanceShell']) components[`@/components/widget/${name}`]={default:name};
  const page=load(`src/app/widget/${kind === 'form' ? 'form/[formId]' : '[companyId]'}/page.tsx`, {...components,'@/lib/prisma':{default:prisma},'@/lib/advanced-appearance':{effectiveAppearance:(raw,plan)=>plan==='ENTERPRISE'&&raw?raw:null},'@/lib/widget-theme':{getWidgetTheme:async id=>id==='b'?'dark':'light'},'next/navigation':{notFound:()=>{throw new Error('404')}},'@/lib/publicWidget':{publicCompanySelect,publicWidgetSettingsSelect,publicPricingProfileSelect},'@/lib/widget-pricing':{pricingProfileForForm},'@/lib/widget-urls':{safeWidgetUrl},'@/lib/widget-favicon':{widgetPageMetadata}}).default;
  return page;
}
function find(element, type) {
  if (!element || typeof element !== 'object') return;
  if (element.type === type) return element;
  for (const child of [element.props?.children].flat(Infinity)) { const found=find(child,type); if(found)return found; }
}
test('actual public page selects second-form customization, theme and pricing without private fields', async () => {
  const tree = await publicPage('form')({params:Promise.resolve({formId:'b'}),searchParams:Promise.resolve({})});
  assert.equal(tree.props.theme,'dark');
  const payload=find(tree,'QuoteWidgetForm').props.company;
  assert.equal(payload.formId,'b'); assert.equal(payload.widgetSettings.headerText,'Second');
  assert.equal(payload.logoBackdrop,'dark'); assert.equal(payload.pricingProfile.minimumCharge,99);
  assert.equal(payload.widgetSettings.vehicleOptions[0].fee,35);
  assert.deepEqual(payload.widgetSettings.serviceZips,['90001']);
  assert.equal(payload.widgetSettings.customQuestions[0].label,'Gate');
  assert.ok(!JSON.stringify(tree).includes('PRIVATE') && !JSON.stringify(tree).includes('SECRET'));
});
test('advanced appearance reaches the shell plan-checked, never as a raw form field', async () => {
  const live = await publicPage('form')({params:Promise.resolve({formId:'b'}),searchParams:Promise.resolve({})});
  assert.equal(live.type,'WidgetAppearanceShell');
  assert.deepEqual(live.props.appearance,{marker:'TOKENS'});
  assert.equal(live.props.allowPreview,false);
  assert.equal('advancedAppearance' in find(live,'QuoteWidgetForm').props.company.widgetSettings,false);
  const preview = await publicPage('form')({params:Promise.resolve({formId:'b'}),searchParams:Promise.resolve({preview:'appearance'})});
  assert.equal(preview.props.allowPreview,true);
  const basic = await publicPage('form')({params:Promise.resolve({formId:'a'}),searchParams:Promise.resolve({})});
  assert.equal(basic.props.appearance,null);
});
test('basic Widget Appearance saves never touch advanced appearance', async () => {
  const d=dashboard();
  const res=await d.POST(d.req({formId:'b',primaryColor:'#ABCDEF',advancedAppearance:null}));
  assert.equal(res.status,200);
  assert.equal('advancedAppearance' in d.updates[0].data,false);
});
test('legacy company page uses its own default form and form pricing, missing pages are safe 404s', async () => {
  const page=publicPage('company'); const tree=await page({params:Promise.resolve({companyId:'merchantA'})});
  const payload=find(tree,'QuoteWidgetForm').props.company;
  assert.equal(payload.formId,'a'); assert.equal(payload.pricingProfile.minimumCharge,25);
  for (const companyId of ['empty','missing']) await assert.rejects(page({params:Promise.resolve({companyId})}), /404/);
  await assert.rejects(publicPage('form')({params:Promise.resolve({formId:'deleted'}),searchParams:Promise.resolve({})}), /404/);
});

function dashboard() {
  const forms=[{id:'a',primaryColor:'#000000'},{id:'b',primaryColor:'#123456'}]; const updates=[];
  const prisma={ company:{findUnique:async()=>({id:'merchantA',name:'Merchant',subscriptionPlan:'ENTERPRISE',widgetSettings:forms})}, widgetSettings:{update:async ({where,data})=>{updates.push({where,data});Object.assign(forms.find(f=>f.id===where.id),data)}} };
  const routes=load('src/app/api/dashboard/widget/route.ts',{'next/server':{NextResponse:Response},'next/headers':{cookies:async()=>({get:()=>({value:'tokenA'})})},'@/lib/auth':{verifyToken:async()=>({companyId:'merchantA'})},'@/lib/prisma':{default:prisma},'@/lib/plans':{getEntitlements},'@/lib/color':{sanitizeHex},'@/lib/quick-subtitle':{normalizeQuickSubtitle},'@/lib/form-vehicles':{parseVehicleArtworkKey},'@/lib/widget-urls':{safeWidgetUrl},'@/lib/widget-favicon':{safeWidgetFavicon}});
  const req=(data,method='POST')=>new Request('https://www.qalt.site/api/dashboard/widget',{method,body:JSON.stringify(data)});
  return {...routes,req,forms,updates};
}
test('actual dashboard GET, POST and PATCH reject another merchant form',async()=>{
  const api=dashboard();
  assert.equal((await api.GET(new Request('https://www.qalt.site/api/dashboard/widget?formId=foreign'))).status,404);
  assert.equal((await api.POST(api.req({formId:'foreign'}))).status,404);
  assert.equal((await api.PATCH(api.req({formId:'foreign',showWeight:true},'PATCH'))).status,404);
  assert.equal(api.updates.length,0);
});
test('saving second form preserves the first form and deliberately blank disclaimer',async()=>{
  const api=dashboard();
  assert.equal((await api.POST(api.req({formId:'b',primaryColor:'#abcdef',headerText:'Saved second',disclaimerText:''}))).status,200);
  assert.equal(api.forms[0].primaryColor,'#000000');
  assert.equal(api.forms[1].headerText,'Saved second'); assert.equal(api.forms[1].disclaimerText,'');
  const response=await api.GET(new Request('https://www.qalt.site/api/dashboard/widget?formId=b'));
  assert.equal((await response.json()).widgetSettings.headerText,'Saved second');
});
test('malformed form IDs and unsafe URL saves cannot silently update the default form',async()=>{
  for(const data of [{formId:''},{formId:4},{formId:'b',websiteUrl:'javascript:alert(1)'},{formId:'b',logoUrl:'data:text/html,x'},{formId:'b',backgroundImageUrl:'http://mixed.com/bg.png'}]){
    const api=dashboard(); assert.equal((await api.POST(api.req(data))).status,400); assert.equal(api.updates.length,0);
  }
});
test('payment return path preserves a validated owned form and safely handles legacy/deleted forms',async()=>{
  const loadedModule=load('src/lib/quote-widget-return.ts',{'@/lib/prisma':{default:{widgetSettings:{findFirst:async({where})=>where.id==='b'&&where.companyId==='merchantA'?{id:'b'}:null}}}});
  assert.equal(await loadedModule.quoteWidgetReturnPath('merchantA','{"formId":"b"}'),'/widget/form/b');
  for(const extras of [null,'{','{"formId":"foreign"}','{"formId":"deleted"}']) assert.equal(await loadedModule.quoteWidgetReturnPath('merchantA',extras),'/widget/merchantA');
});

test('bounded limiter allows meaningful loads, blocks floods and resets after a minute',async()=>{
  const {createWidgetRateLimiter}=await import('../src/lib/widget-rate-limit.ts');
  const allow=createWidgetRateLimiter(2);
  assert.equal(allow('a',2,0),true);assert.equal(allow('a',2,1),true);assert.equal(allow('a',2,2),false);
  assert.equal(allow('b',2,2),true);assert.equal(allow('c',2,3),false);
  assert.equal(allow('a',2,60001),true);assert.equal(allow('c',2,60002),true);
});

test('form rename/delete, pricing and theme APIs reject cross-merchant requests before mutation',async()=>{
  const questions=await import('../src/lib/form-questions.ts'); const vehicles=await import('../src/lib/form-vehicles.ts');
  let writes=0;
  const prisma={widgetSettings:{findUnique:async()=>({id:'foreign',companyId:'merchantB'}),findFirst:async()=>null,update:async()=>{writes++},delete:async()=>{writes++}},pricingProfile:{findFirst:async()=>{throw new Error('Must not fetch foreign pricing')},findUnique:async()=>{throw new Error('Must not fetch foreign pricing')}}};
  const stubs={'next/server':{NextResponse:Response},'next/headers':{cookies:async()=>({get:()=>({value:'tokenA'})})},'@/lib/auth':{verifyToken:async()=>({companyId:'merchantA'})},'@/lib/prisma':{default:prisma},'@/lib/plans':{getEntitlements},'@/lib/form-questions':questions,'@/lib/form-vehicles':vehicles,'@/lib/widget-theme':{getWidgetTheme:async()=>{throw new Error('Must not read foreign theme')},setWidgetTheme:async()=>{writes++}}};
  const forms=load('src/app/api/dashboard/forms/[formId]/route.ts',stubs);
  const params={params:Promise.resolve({formId:'foreign'})};
  assert.equal((await forms.PATCH(new Request('https://www.qalt.site/api/dashboard/forms/foreign',{method:'PATCH',body:JSON.stringify({name:'Stolen'})}),params)).status,404);
  assert.equal((await forms.DELETE(new Request('https://www.qalt.site/api/dashboard/forms/foreign',{method:'DELETE'}),params)).status,404);
  const pricing=load('src/app/api/dashboard/pricing/route.ts',stubs);
  assert.equal((await pricing.GET(new Request('https://www.qalt.site/api/dashboard/pricing?formId=foreign'))).status,404);
  for(const method of ['POST','PATCH'])assert.equal((await pricing[method](new Request('https://www.qalt.site/api/dashboard/pricing',{method,body:JSON.stringify({formId:'foreign',minimumCharge:1})}))).status,404);
  const theme=load('src/app/api/dashboard/widget-theme/route.ts',stubs);
  assert.equal((await theme.GET(new Request('https://www.qalt.site/api/dashboard/widget-theme?formId=foreign'))).status,404);
  assert.equal((await theme.POST(new Request('https://www.qalt.site/api/dashboard/widget-theme',{method:'POST',body:JSON.stringify({formId:'foreign',themeMode:'dark'})}))).status,404);
  assert.equal(writes,0);
});

test('real tracker effect deduplicates StrictMode and skips direct visits',async()=>{
  const {embeddingWidgetHost}=await import('../src/lib/widget-installations.ts');
  const previous={window:globalThis.window,document:globalThis.document,navigator:Object.getOwnPropertyDescriptor(globalThis,'navigator')};
  const effects=[];let ref={current:''};const beacons=[];
  globalThis.window={top:{},self:{},location:{origin:'https://www.qalt.site',ancestorOrigins:['https://funnel.systeme.io']}};
  globalThis.document={referrer:'https://funnel.systeme.io/preview'};
  Object.defineProperty(globalThis,'navigator',{configurable:true,value:{sendBeacon:(_url,body)=>{beacons.push(body);return true}}});
  try{
    const tracker=load('src/components/widget/WidgetInstallTracker.tsx',{'react':{useRef:()=>ref,useEffect:fn=>effects.push(fn)},'@/lib/widget-installations':{embeddingWidgetHost}}).default;
    tracker({companyId:'merchantA',formId:'formB'});effects[0]();effects[0]();assert.equal(beacons.length,1);
    assert.deepEqual(JSON.parse(await beacons[0].text()),{companyId:'merchantA',formId:'formB',domain:'funnel.systeme.io'});
    ref={current:''};globalThis.window.top=globalThis.window.self;tracker({companyId:'merchantA',formId:'formB'});effects[1]();assert.equal(beacons.length,1);
  }finally{globalThis.window=previous.window;globalThis.document=previous.document;if(previous.navigator)Object.defineProperty(globalThis,'navigator',previous.navigator);else delete globalThis.navigator;}
});

test('all appearance, field, vehicle, service-area and payment settings survive a scoped save',async()=>{
  const api=dashboard();
  const data={formId:'b',primaryColor:'#123abc',buttonText:'Request delivery',headerText:'Customized title',quickSubtitleText:'Customized subtitle',companyNameText:'Custom company',companyNameFont:'Montserrat',logoUrl:'https://images.example/form-b.png',backgroundImageUrl:'https://images.example/background.png',mapLayout:'side',websiteUrl:'https://merchant.example/',disclaimerText:'Custom disclaimer',showWeight:true,showItemCount:false,showExtras:true,insideDeliveryLabel:'White glove',addon3Label:'Assembly',showVehicles:true,pricePerVehicle:22,vehicleOptions:[{name:'Cargo Van',fee:35,artwork:'cargo-van'}],showAwb:true,geoFencingEnabled:true,serviceZips:['90001','90002'],paymentsEnabled:true};
  assert.equal((await api.POST(api.req(data))).status,200);
  const payload=await (await api.GET(new Request('https://www.qalt.site/api/dashboard/widget?formId=b'))).json();
  for(const [key,value] of Object.entries(data))if(key!=='formId')assert.deepEqual(payload.widgetSettings[key],key==='primaryColor'?'#123ABC':value,key);
  assert.equal(api.forms[0].primaryColor,'#000000');
});

test('server quote pricing scopes lookup to company and cannot price a foreign form',async()=>{
  const {estimatePriceDetailed}=await import('../src/lib/calculator.ts');
  const {routeLocations}=await import('../src/lib/route-stops.ts');
  const queries=[];
  const profile={baseRatePerMile:3,minimumCharge:99,useMinimumCharge:true,minMilesThreshold:0,weightFee:0,itemCountFee:0,additionalStopFee:10,stairsFee:0,insideDeliveryFee:0,addon3Fee:0,afterHoursFee:0,businessHoursStart:'00:00',businessHoursEnd:'23:59',businessDays:'0,1,2,3,4,5,6',largeItemsEnabled:false,largeItemFee:0,largeItemCategories:[],serviceOptions:[{name:'Rush',fee:15}]};
  const prisma={widgetSettings:{findUnique:async({where})=>({id:where.id,companyId:where.id==='foreign'?'merchantB':'merchantA',showVehicles:true,pricePerVehicle:0,vehicleOptions:[{name:'Van',fee:35}]})},pricingProfile:{findFirst:async(query)=>{queries.push(query);return profile}}};
  const {computeAuthoritativeQuote}=load('src/lib/serverQuotePricing.ts',{'server-only':{},'@/lib/prisma':{default:prisma},'@/lib/form-questions':await import('../src/lib/form-questions.ts'),'@/lib/calculator':{estimatePriceDetailed},'@/lib/google-maps':{calculateMultiStopDrivingDistance:async()=>({distanceMiles:10,durationMinutes:20})},'@/lib/route-stops':{routeLocations},'@/lib/growth-engine':{applyPricingRules:async(_company,_distance,_extras,total)=>({total,lineItems:[]})}});
  const input={companyId:'merchantA',formId:'b',startLocation:'Pickup',endLocation:'Dropoff',extras:{hasStairs:false,needsInsideDelivery:false,needsAddon3:false},vehicleCount:1,vehicleType:'Van',serviceType:'Rush'};
  const result=await computeAuthoritativeQuote(input);assert.equal(result.ok,true);assert.equal(result.quote.total,149);
  assert.deepEqual(queries[0].where,{widgetSettingsId:'b',companyId:'merchantA'});
  const foreign=await computeAuthoritativeQuote({...input,formId:'foreign'});assert.equal(foreign.status,404);assert.equal(queries.length,1);
});
