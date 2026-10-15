import test from "node:test";
import assert from "node:assert/strict";
import { estimateQuoteProfit } from "../src/lib/quote-profit-intelligence.ts";

const settings = {
  fuelPricePerGallon: 4,
  vehicleMilesPerGallon: 20,
  driverHourlyCost: 25,
  estimatedHours: 2,
  deadheadMiles: 10,
  tolls: 5,
  otherCosts: 5,
  minimumTargetMarginPercent: 20,
};

test("calculates merchant-only costs and margin from loaded + deadhead miles", () => {
  const r = estimateQuoteProfit(200, 50, settings);
  assert.equal(r.costBreakdown.fuel, 12);
  assert.equal(r.estimatedCost, 72);
  assert.equal(r.estimatedProfit, 128);
  assert.equal(r.marginPercent, 64);
  assert.equal(r.revenuePerLoadedMile, 4);
  assert.equal(r.isBelowTargetMargin, false);
});
test("flags negative-profit quotes", () => {
  const r = estimateQuoteProfit(30, 50, settings);
  assert.equal(r.isBelowTargetMargin, true);
  assert.ok(r.estimatedProfit < 0);
});
test("never divides by zero on no-mile quote", () => {
  const r = estimateQuoteProfit(100, 0, settings);
  assert.equal(r.revenuePerLoadedMile, null);
});
test("rejects invalid inputs", () => {
  assert.throws(() => estimateQuoteProfit(-1, 10, settings), RangeError);
  assert.throws(() => estimateQuoteProfit(100, 10, { ...settings, vehicleMilesPerGallon: 0 }), RangeError);
});
