import test from 'node:test';
import assert from 'node:assert/strict';
import { BILLING_DISPLAY, billingDisplay } from '../src/lib/billing-display.ts';
import { PLANS, quotaMonthStart } from '../src/lib/plans.ts';

test('published monthly and annual amounts remain unchanged', () => {
  assert.deepEqual(BILLING_DISPLAY, { PRO: {monthly:39, annualTotal:348}, ENTERPRISE: {monthly:99, annualTotal:948} });
  for (const plan of ['PRO','ENTERPRISE']) {
    const config = BILLING_DISPLAY[plan];
    assert.equal(Number(billingDisplay(plan, true).price.slice(1))*12, config.annualTotal);
    assert.ok(billingDisplay(plan,true).detail.includes(`$${config.annualTotal} annually`));
    assert.equal(billingDisplay(plan,false).detail,'Billed monthly');
  }
});
test('Starter limits and paid feature boundaries stay intact', () => {
  assert.equal(PLANS.STARTER.maxQuotesPerMonth,50);
  assert.equal(PLANS.STARTER.maxForms,1);
  assert.equal(PLANS.PRO.maxForms,5);
  assert.equal(PLANS.ENTERPRISE.maxForms,'unlimited');
  for(const feature of ['isPaymentsEnabled','isWebhookEnabled','isAdvancedAppearanceEnabled','isVehicleQuotingEnabled']) {
    assert.equal(PLANS.STARTER[feature],false);
    assert.equal(PLANS.PRO[feature],false);
    assert.equal(PLANS.ENTERPRISE[feature],true);
  }
  assert.equal(quotaMonthStart(new Date('2026-11-01T00:00:00Z')).toISOString(),'2026-11-01T00:00:00.000Z');
  assert.equal(quotaMonthStart(new Date('2026-10-31T23:59:59Z')).toISOString(),'2026-10-01T00:00:00.000Z');
});
