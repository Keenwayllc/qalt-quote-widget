import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
import * as questions from '../src/lib/form-questions.ts';
import { estimatePriceDetailed } from '../src/lib/calculator.ts';
import { routeLocations } from '../src/lib/route-stops.ts';
const require = createRequire(import.meta.url);
function load(file, stubs) {
  const js=ts.transpileModule(readFileSync(new URL(`../${file}`,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText;
  const cjs={exports:{}};
  new Function('require','module','exports',js)((name)=>name in stubs?stubs[name]:require(name),cjs,cjs.exports);
  return cjs.exports;
}
const preset=questions.shipmentQuestionPreset('test');
preset[1].optionFees={Yes:25};
preset[3].optionFees={Yes:40};
const furniture={'test-shipment':'Furniture','test-stairs':'Yes','test-elevator':'No','test-team':'Yes','test-furniture-size':'72 × 30 × 28'};
test('shipment preset saves with conditional questions and merchant fees',()=>{
  assert.equal(questions.validateCustomQuestionDefinitions(preset),null);
  assert.deepEqual(questions.normalizeCustomQuestions(preset),preset);
  assert.equal(questions.visibleCustomQuestions(preset,furniture).length,5);
  const validated=questions.validateCustomAnswers(preset,furniture);
  assert.equal(validated.error,undefined);
  assert.equal(questions.customAnswerCharges(preset,validated.answers).reduce((s,i)=>s+i.amount,0),65);
});
test('switching shipment hides stale answers, required fields, and charges',()=>{
  const answers={...furniture,'test-shipment':'Documents / parcels'};
  const validated=questions.validateCustomAnswers(preset,answers);
  assert.equal(validated.error,undefined);
  assert.deepEqual(validated.answers,[{id:'test-shipment',label:'What are you shipping?',answer:'Documents / parcels'}]);
  assert.deepEqual(questions.customAnswerCharges(preset,validated.answers),[]);
});
test('pallet weight and conditional required fields reject missing or invalid input',()=>{
  assert.match(questions.validateCustomAnswers(preset,{'test-shipment':'Pallets'}).error,/weight/);
  for(const weight of ['-1','0','Infinity','bad','1000001']) assert.ok(questions.validateCustomAnswers(preset,{'test-shipment':'Pallets','test-weight':weight}).error);
  assert.equal(questions.validateCustomAnswers(preset,{'test-shipment':'Pallets','test-weight':'550','test-dimensions':'48 × 40 × 50','test-dock':'Yes'}).error,undefined);
});
test('invalid conditions, cycles, and forged fee definitions cannot be saved',()=>{
  for(const showWhen of [{questionId:'missing',answer:'Yes'},{questionId:'test-stairs',answer:'Yes'},{questionId:'test-shipment',answer:'Unlisted'}])
    assert.ok(questions.validateCustomQuestionDefinitions([{...preset[0],showWhen},...preset.slice(1)]));
  for(const fee of [-1,Infinity,'25',100001]) assert.ok(questions.validateCustomQuestionDefinitions([preset[0],{...preset[1],optionFees:{Yes:fee}}]));
  assert.ok(questions.validateCustomQuestionDefinitions([preset[0],{...preset[1],optionFees:{Maybe:5}}]));
});
test('nested hidden parents cannot activate a priced descendant',()=>{
  const nested=[preset[0],preset[1],{id:'third',label:'Crew',type:'single',required:true,options:['Yes','No'],showWhen:{questionId:'test-stairs',answer:'Yes'},optionFees:{Yes:100}}];
  const checked=questions.validateCustomAnswers(nested,{'test-shipment':'Documents / parcels','test-stairs':'Yes',third:'Yes'});
  assert.equal(checked.answers.length,1);
  assert.deepEqual(questions.customAnswerCharges(nested,checked.answers),[]);
});
function pricingFixture(){
  let distances=0,ruleReads=0;
  const growth=load('src/lib/growth-engine.ts',{'server-only':{},'@/lib/prisma':{default:{$executeRawUnsafe:async()=>1,$queryRawUnsafe:async()=>{ruleReads++;return[{id:'percent',name:'Handling overhead',active:true,conditionType:'DISTANCE_GT',threshold:0,adjustmentType:'PERCENT',amount:10}]}}}});
  const profile={baseRatePerMile:3,minimumCharge:50,useMinimumCharge:true,minMilesThreshold:0,businessDays:'0,1,2,3,4,5,6',businessHoursStart:'00:00',businessHoursEnd:'23:59',serviceOptions:[{name:'Scheduled',fee:0,deliveryWindow:'Selected date'},{name:'Same Day',fee:10,deliveryWindow:'Today by 6 PM'},{name:'Rush',fee:30,deliveryWindow:'Within 2 hours after pickup'}]};
  const prisma={widgetSettings:{findUnique:async({where})=>where.id==='owned'?{id:'owned',companyId:'a',formStyle:'extended',customQuestions:preset,showVehicles:true,pricePerVehicle:0,vehicleOptions:[{name:'Van',fee:20}]}:{id:'foreign',companyId:'b'}},pricingProfile:{findFirst:async()=>profile}};
  prisma.widgetSettings.findFirst=async()=>prisma.widgetSettings.findUnique({where:{id:'owned'}});
  const pricing=load('src/lib/serverQuotePricing.ts',{'server-only':{},'@/lib/prisma':{default:prisma},'@/lib/form-questions':questions,'@/lib/calculator':{estimatePriceDetailed},'@/lib/route-stops':{routeLocations},'@/lib/google-maps':{calculateMultiStopDrivingDistance:async()=>{distances++;return{distanceMiles:10,durationMinutes:20}}},'@/lib/growth-engine':growth});
  const input={companyId:'a',formId:'owned',startLocation:'Pickup',endLocation:'Dropoff',extras:{hasStairs:false,needsInsideDelivery:false,needsAddon3:false},vehicleCount:1,vehicleType:'Van',customAnswers:furniture};
  return {pricing,input,counts:()=>({distances,ruleReads})};
}
test('all service totals include handling, vehicle, minimum, and percentage rules with one route lookup',async()=>{
  const {pricing,input,counts}=pricingFixture();
  const result=await pricing.computeAuthoritativeQuote({...input,compareServices:true});
  assert.equal(result.ok,true);
  assert.deepEqual(result.quote.serviceComparisons.map(s=>[s.name,s.total]),[['Scheduled',148.5],['Same Day',159.5],['Rush',181.5]]);
  assert.equal(result.quote.serviceComparisons[2].deliveryWindow,'Within 2 hours after pickup');
  assert.deepEqual(counts(),{distances:1,ruleReads:1});
  for(const option of result.quote.serviceComparisons)assert.equal(option.breakdown.lineItems.reduce((s,i)=>s+i.amount,0),option.total);
  const selected=await pricing.computeAuthoritativeQuote({...input,serviceType:'Rush'});
  assert.equal(selected.quote.total,result.quote.serviceComparisons[2].total);
  assert.equal(selected.quote.deliveryWindow,'Within 2 hours after pickup');
});
test('client-forged fees or totals never change authoritative pricing',async()=>{
  const {pricing,input}=pricingFixture();
  const result=await pricing.computeAuthoritativeQuote({...input,serviceType:'Rush',estimatedPrice:1,customAnswers:{...furniture,fees:0,optionFees:{Yes:0},total:1}});
  assert.equal(result.quote.total,181.5);
  const documents=await pricing.computeAuthoritativeQuote({...input,serviceType:'Rush',customAnswers:{...furniture,'test-shipment':'Documents / parcels'}});
  assert.equal(documents.quote.total,110);
});
test('unknown service, missing charged answer, and foreign form cannot produce a quote',async()=>{
  const {pricing,input}=pricingFixture();
  assert.equal((await pricing.computeAuthoritativeQuote({...input,serviceType:'Fake'})).status,400);
  assert.equal((await pricing.computeAuthoritativeQuote({...input,serviceType:'Rush',customAnswers:{'test-shipment':'Furniture'}})).status,422);
  assert.equal((await pricing.computeAuthoritativeQuote({...input,serviceType:'Rush',customAnswers:undefined})).status,422);
  assert.equal((await pricing.computeAuthoritativeQuote({...input,formId:'foreign',compareServices:true})).status,404);
});

test('legacy estimates without a form ID still use the default form handling fees',async()=>{
  const {pricing,input}=pricingFixture();
  const result=await pricing.computeAuthoritativeQuote({...input,formId:null,serviceType:'Rush'});
  assert.equal(result.quote.total,181.5);
  assert.equal((await pricing.computeAuthoritativeQuote({...input,formId:null,serviceType:'Rush',customAnswers:undefined})).status,422);
});

test('both quote emails include the selected service window as escaped text',()=>{
  const {renderToStaticMarkup}=require('react-dom/server');
  const React=require('react');
  for(const name of ['NewQuoteEmail','CustomerQuoteEmail']){
    const component=load(`src/components/emails/${name}.tsx`,{})[name];
    const html=renderToStaticMarkup(React.createElement(component,{customerName:'Customer',customerEmail:'customer@example.invalid',companyName:'Merchant',pickupZip:'90001',dropoffZip:'90002',distanceMiles:10,estimatedPrice:181.5,serviceType:'Rush',deliveryWindow:'Within 2 hours <script>bad</script>'}));
    assert.ok(html.includes('Within 2 hours &lt;script&gt;bad&lt;/script&gt;'));
    assert.ok(!html.includes('<script>'));
  }
});
