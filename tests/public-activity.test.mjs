import assert from 'node:assert/strict';
import test from 'node:test';
import { buildPublicActivity, activityAge, activityMessage, ACTIVITY_WINDOW_MS } from '../src/lib/public-activity.ts';

const now = Date.parse('2026-10-11T20:00:00Z');
const signup = new Date(now - 2 * 86400000);
const company = {
  id: 'private-company-id', name: 'Real Courier', emailVerified: true,
  isAdmin: false, isSuperAdmin: false, registrationSource: 'website',
  createdAt: signup, trialEndsAt: new Date(+signup + 14 * 86400000),
  subscriptionPlan: 'PRO', stripeSubscriptionId: 'sub_private',
};
const payment = {
  id: 'in_private', livemode: true, created: now / 1000 - 60,
  subscriptionId: 'sub_private', amountPaid: 3900,
  billingReason: 'subscription_create', priceId: 'price_pro',
};
const prices = { price_pro: 'PRO', price_enterprise: 'ENTERPRISE' };

test('actual signup trial stays a trial and no company identity reaches public payload', () => {
  const events = buildPublicActivity([company], [], prices, now);
  assert.deepEqual(events, [{kind:'trial', plan:'PRO', occurredAt:signup.toISOString()}]);
  assert.equal(activityMessage(events[0]), 'Started a free Pro trial');
  assert.ok(!JSON.stringify(events).includes('private'));
  assert.ok(!JSON.stringify(events).includes('Real Courier'));
  assert.equal(buildPublicActivity([{...company,trialEndsAt:null}],[],prices,now)[0].kind,'signup');
});
test('Starter signup needs stored free plan, not a paid-plan override', () => {
  const free = buildPublicActivity([{...company,trialEndsAt:null,subscriptionPlan:'STARTER'}],[],prices,now)[0];
  assert.equal(activityMessage(free),'Signed up for Starter Free');
  const override = buildPublicActivity([{...company,trialEndsAt:null,subscriptionPlan:'ENTERPRISE'}],[],prices,now)[0];
  assert.equal(activityMessage(override),'Joined Qalt');
  assert.equal(override.plan,null);
});
test('only live positive paid subscription creation or change produces purchased-plan card', () => {
  const events = buildPublicActivity([company],[payment,{...payment}],prices,now);
  assert.equal(events.length,2);
  assert.equal(activityMessage(events[0]),'Subscribed to Pro');
  const enterprise = buildPublicActivity([company],[{...payment,priceId:'price_enterprise',billingReason:'subscription_update'}],prices,now)[0];
  assert.equal(activityMessage(enterprise),'Subscribed to Enterprise');
  for (const patch of [{livemode:false},{amountPaid:0},{amountPaid:-1},{subscriptionId:'sub_other'},{priceId:'unknown'},{billingReason:'subscription_cycle'},{billingReason:null},{subscriptionId:null},{created:now/1000+1}]) {
    assert.equal(buildPublicActivity([company],[{...payment,...patch}],prices,now).length,1);
  }
});
test('unverified, administrative, test and expired records never appear', () => {
  for (const patch of [{emailVerified:false},{isAdmin:true},{isSuperAdmin:true},{name:'Demo Courier'},{registrationSource:'test'},{createdAt:new Date(now-ACTIVITY_WINDOW_MS-1),trialEndsAt:null},{createdAt:new Date(now+1)}]) {
    const changed={...company,...patch};
    assert.equal(buildPublicActivity([changed],[],prices,now).length,0);
  }
  assert.equal(buildPublicActivity([{...company,name:'Sandbox Courier'}],[payment],prices,now).length,0);
  assert.deepEqual(buildPublicActivity([],[],prices,now),[]);
});
test('cards keep real timestamps, chronological order, and bounded results', () => {
  const events = buildPublicActivity(Array.from({length:12},(_,i)=>({...company,createdAt:new Date(now-i*60000)})),[],prices,now);
  assert.equal(events.length,8);
  assert.equal(events[0].occurredAt,new Date(now).toISOString());
  assert.equal(activityAge(new Date(now-2*86400000).toISOString(),now),'2 days ago');
  assert.equal(activityAge(new Date(now-3600000).toISOString(),now),'1 hour ago');
  assert.equal(activityAge(new Date(now-60000).toISOString(),now),'1 minute ago');
});
