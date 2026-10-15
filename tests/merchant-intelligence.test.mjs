import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
import * as engine from "../src/lib/quote-profit-intelligence.ts";

// Load the module the way overview-data.test.mjs does so its sibling import
// resolves to the real profit engine.
export function loadIntelligence() {
  const require = createRequire(import.meta.url);
  const module = { exports: {} };
  const code = ts.transpileModule(readFileSync(new URL("../src/lib/merchant-intelligence.ts", import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const localRequire = (name) => (name === "./quote-profit-intelligence" ? engine : require(name));
  new Function("require", "module", "exports", code)(localRequire, module, module.exports);
  return module.exports;
}
const mi = loadIntelligence();
const now = new Date("2026-10-14T18:00:00Z");
const hoursAgo = (h) => new Date(now.getTime() - h * 3_600_000).toISOString();

const base = {
  vehicleKey: "",
  label: "All vehicles",
  fuelPricePerGallon: 4,
  milesPerGallon: 20,
  driverHourlyCost: 30,
  averageSpeedMph: 30,
  handlingMinutes: 30,
  deadheadMiles: 10,
  tollsPerJob: 5,
  otherCostPerJob: 5,
  targetMarginPercent: 25,
  followUpAfterHours: 24,
};
const quote = (over = {}) => ({
  id: "q1",
  createdAt: hoursAgo(2),
  customerName: "Alex",
  status: "PENDING",
  paymentStatus: null,
  estimatedPrice: 200,
  distanceMiles: 50,
  vehicleType: "Cargo Van",
  serviceType: "Same day",
  pickupZip: "91601",
  dropoffZip: "90001",
  pricingBreakdown: null,
  ...over,
});

test("profit estimate uses the existing engine and splits deadhead without changing totals", () => {
  const e = mi.estimateProfit(quote(), [base]);
  assert.equal(e.status, "ok");
  // hours = 0.5 + 60/30 = 2.5 -> driver 75; fuel (60/20)*4 = 12; tolls 5; other 5
  const direct = engine.estimateQuoteProfit(200, 50, {
    fuelPricePerGallon: 4, vehicleMilesPerGallon: 20, driverHourlyCost: 30, estimatedHours: 2.5,
    deadheadMiles: 10, tolls: 5, otherCosts: 5, minimumTargetMarginPercent: 25,
  });
  assert.equal(e.totalCost, direct.estimatedCost);
  assert.equal(e.profit, direct.estimatedProfit);
  assert.equal(e.totalCost, 97);
  assert.equal(e.costs.deadhead, 12); // 10mi: fuel 2 + driver 10
  assert.equal(e.costs.fuel + e.costs.driver + e.costs.deadhead + e.costs.tolls + e.costs.other, e.totalCost);
  assert.equal(e.marginPercent, 51.5);
  assert.equal(e.tone, "healthy");
});

test("margin tone is healthy, below target, or loss", () => {
  assert.equal(mi.estimateProfit(quote({ estimatedPrice: 120 }), [base]).tone, "below"); // 19.17%
  assert.equal(mi.estimateProfit(quote({ estimatedPrice: 90 }), [base]).tone, "loss");
  assert.equal(mi.marginTone(0, 0, 20), "below");
});

test("rounds currency to cents", () => {
  const e = mi.estimateProfit(quote({ estimatedPrice: 133.333, distanceMiles: 7.77 }), [base]);
  for (const v of [e.revenue, e.totalCost, e.profit, ...Object.values(e.costs)]) {
    assert.equal(Math.round(v * 100) / 100, v);
  }
});

test("missing critical costs show an unavailable estimate instead of a number", () => {
  const e = mi.estimateProfit(quote(), [{ ...base, driverHourlyCost: null, averageSpeedMph: null }]);
  assert.equal(e.status, "unavailable");
  assert.deepEqual(e.missing, ["Driver cost", "Average driving speed"]);
  assert.equal(mi.estimateProfit(quote(), []).status, "unavailable");
  assert.equal(mi.estimateProfit(quote({ estimatedPrice: 0 }), [base]).status, "unavailable");
  assert.equal(mi.estimateProfit(quote({ distanceMiles: Number.NaN }), [base]).status, "unavailable");
});

test("legacy quotes with no vehicle, no breakdown and zero miles still estimate", () => {
  const e = mi.estimateProfit(quote({ vehicleType: null, distanceMiles: 0, pricingBreakdown: undefined }), [base]);
  assert.equal(e.status, "ok");
  assert.equal(e.assumptions.loadedMiles, 0);
});

test("vehicle rows override the default field by field and inherit nulls", () => {
  const van = { ...Object.fromEntries(Object.keys(base).map((k) => [k, null])), vehicleKey: "cargo van", label: "Cargo Van", milesPerGallon: 10 };
  const r = mi.resolveCosts([base, van], "  CARGO  van ");
  assert.equal(r.vehicleSpecific, true);
  assert.equal(r.values.milesPerGallon, 10);
  assert.equal(r.values.fuelPricePerGallon, 4);
  assert.ok(r.inherited.includes("fuelPricePerGallon"));
  assert.equal(mi.resolveCosts([base, van], "Box Truck").values.milesPerGallon, 20);
});

test("cost profile validation rejects bad numbers and keeps follow-up on the default row only", () => {
  assert.match(mi.parseCostProfile({ ...base, fuelPricePerGallon: -1 }).error, /Fuel price/);
  assert.match(mi.parseCostProfile({ ...base, milesPerGallon: 0 }).error, /greater than 0/);
  assert.match(mi.parseCostProfile({ ...base, followUpAfterHours: 0 }).error, /Follow-up/);
  assert.equal(mi.parseCostProfile({ ...base, driverHourlyCost: "" }).profile.driverHourlyCost, null);
  assert.equal(mi.parseCostProfile({ ...base, vehicleKey: "Box Truck", followUpAfterHours: 8 }).profile.followUpAfterHours, null);
  assert.equal(mi.parseCostProfile({ ...base, vehicleKey: "Box Truck" }).profile.vehicleKey, "box truck");
});

test("stages derive from existing statuses without redefining them", () => {
  const s = (over) => mi.quoteStage(quote(over), 24, now);
  assert.equal(s({}), "new");
  assert.equal(s({ createdAt: hoursAgo(30) }), "follow_up");
  assert.equal(s({ status: "CONFIRMED" }), "booked");
  assert.equal(s({ paymentStatus: "PAID" }), "booked");
  assert.equal(s({ status: "LOST" }), "closed");
});

test("one alert per quote with every reason, highest priority first", () => {
  const rows = mi.analyzeQuotes(
    [
      quote({ id: "a", createdAt: hoursAgo(30), paymentStatus: "PENDING", estimatedPrice: 90 }),
      quote({ id: "b", createdAt: hoursAgo(30) }),
      quote({ id: "c", status: "LOST", estimatedPrice: 50 }),
      quote({ id: "d", createdAt: hoursAgo(24 * 40) }),
    ],
    [base],
    now,
  );
  const alerts = mi.buildAlerts(rows, [{ id: "j1", status: "ISSUE", quoteRequestId: null, scheduledDate: now, updatedAt: now }], [base], now);
  const keys = alerts.map((a) => a.key);
  assert.equal(new Set(keys).size, keys.length);
  const a = alerts.find((x) => x.quoteId === "a");
  assert.equal(a.kind, "checkout_incomplete");
  assert.deepEqual(a.reasons.map((r) => r.split(" ")[0]), ["Checkout", "Estimated"]);
  assert.equal(alerts.find((x) => x.quoteId === "b").kind, "stale_quote");
  assert.ok(!alerts.some((x) => x.quoteId === "c"), "closed quotes do not alert");
  assert.ok(!alerts.some((x) => x.quoteId === "d"), "quotes older than 30 days do not alert");
  assert.ok(alerts.some((x) => x.jobId === "j1" && x.kind === "job_issue"));
});

test("insights separate paid revenue from booked and quoted estimates", () => {
  const rows = mi.analyzeQuotes(
    [
      quote({ id: "p", status: "CONFIRMED", paymentStatus: "PAID", estimatedPrice: 200 }),
      quote({ id: "w", status: "WON", estimatedPrice: 100 }),
      quote({ id: "n", estimatedPrice: 50 }),
      quote({ id: "old", status: "WON", createdAt: hoursAgo(24 * 10) }),
    ],
    [base],
    now,
  );
  const week = mi.buildInsights(rows, "week", now);
  assert.equal(week.totalQuotes, 3);
  assert.equal(week.paidRevenue, 200);
  assert.equal(week.bookedValue, 300);
  assert.equal(week.quotedValue, 350);
  assert.equal(week.outstandingCount, 1);
  assert.equal(week.conversionRate, 66.67);
  assert.deepEqual(week.profitCoverage, { estimated: 2, booked: 2 });
  assert.equal(mi.buildInsights(rows, "month", now).totalQuotes, 4);
  const unconfigured = mi.buildInsights(mi.analyzeQuotes([quote({ status: "WON" })], [], now), "week", now);
  assert.equal(unconfigured.estimatedProfit, null, "no fabricated profit without costs");
  assert.equal(unconfigured.averageMargin, null);
  assert.equal(mi.buildInsights([], "day", now).conversionRate, null);
});

const pricing = { defaultProfileId: "pp1", baseRatePerMile: 2, minimumCharge: 35, useMinimumCharge: true, hasFormSpecificPricing: false };

test("recommendations need a minimum sample before drawing conclusions", () => {
  const few = mi.analyzeQuotes([1, 2, 3, 4].map((i) => quote({ id: `q${i}`, estimatedPrice: 110 })), [base], now);
  assert.deepEqual(mi.buildRecommendations(few, [base], pricing, now).filter((r) => r.kind === "underpriced_vehicle"), []);
  const five = mi.analyzeQuotes([1, 2, 3, 4, 5].map((i) => quote({ id: `q${i}`, estimatedPrice: 110 })), [base], now);
  const rec = mi.buildRecommendations(five, [base], pricing, now).find((r) => r.kind === "underpriced_vehicle");
  assert.ok(rec);
  assert.match(rec.reasoning, /Cargo Van quotes average a 11\.8% estimated margin across 5 quotes\. Your configured target is 25%/);
  assert.equal(rec.proposal, null);
});

test("minimum charge proposal reaches target and is withheld when forms have their own pricing", () => {
  const short = [1, 2, 3, 4, 5].map((i) =>
    quote({ id: `m${i}`, estimatedPrice: 35, distanceMiles: 3, pricingBreakdown: { minimumApplied: true } }),
  );
  const rows = mi.analyzeQuotes(short, [base], now);
  const rec = mi.buildRecommendations(rows, [base], pricing, now).find((r) => r.kind === "minimum_charge");
  // cost = fuel (13/20)*4=2.6 + driver (0.5+13/30)*30=28 + 10 = 40.6 -> 40.6/0.75 = 54.13 -> 55
  assert.equal(rec.proposal.proposed, 52, "capped at floor(35 * 1.5)");
  assert.match(rec.reasoning, /would need about \$55/);
  assert.equal(rec.proposal.current, 35);
  const blocked = mi.buildRecommendations(rows, [base], { ...pricing, hasFormSpecificPricing: true }, now);
  assert.equal(blocked.find((r) => r.kind === "minimum_charge").proposal, null);
});

test("table filters, search and pagination stay server side and bounded", () => {
  const rows = mi.analyzeQuotes(
    Array.from({ length: 45 }, (_, i) => quote({ id: `t${i}`, customerName: i === 7 ? "Rosa Diaz" : `C${i}`, createdAt: hoursAgo(i * 2) })),
    [base],
    now,
  );
  assert.equal(mi.parseFilter("nope"), "all");
  assert.equal(mi.searchQuotes(rows, "rosa").length, 1);
  assert.equal(mi.searchQuotes(rows, "  ").length, 45);
  const followUps = rows.filter((q) => mi.matchesFilter(q, "follow_up", new Set()));
  assert.ok(followUps.every((q) => q.ageHours > 24));
  const last = mi.paginate(rows, 99);
  assert.deepEqual([last.page, last.pages, last.rows.length, last.total], [3, 3, 5, 45]);
  assert.equal(mi.paginate([], 1).pages, 1);
  assert.equal(mi.paginate(rows, Number.NaN).page, 1);
});

test("booked low-margin quotes are not alerts but stay filterable", () => {
  const rows = mi.analyzeQuotes([quote({ id: "bk", status: "WON", estimatedPrice: 90 }), quote({ id: "op", estimatedPrice: 90 })], [base], now);
  const alerts = mi.buildAlerts(rows, [], [base], now);
  assert.deepEqual(alerts.map((a) => a.quoteId), ["op"]);
  assert.equal(alerts[0].reasons[0], "Estimated loss of $7.00");
  assert.ok(mi.matchesFilter(rows[0], "low_margin", new Set()));
});

test("only Qalt checkout payments count as collected online", () => {
  const rows = mi.analyzeQuotes([quote({ id: "manual", status: "PAID", estimatedPrice: 500 }), quote({ id: "stripe", status: "CONFIRMED", paymentStatus: "PAID", estimatedPrice: 80 })], [base], now);
  const s = mi.buildInsights(rows, "week", now);
  assert.equal(s.paidRevenue, 80);
  assert.equal(s.paidCount, 1);
  assert.equal(s.bookedValue, 580, "a hand-marked PAID quote is still booked");
});

test("required revenue is null at a 100% target and proposals are capped at +50%", () => {
  const e = mi.estimateProfit(quote(), [base]);
  assert.equal(mi.requiredRevenue({ ...e, targetMarginPercent: 100 }), null);
  assert.equal(mi.requiredRevenue({ ...e, targetMarginPercent: 120 }), null);
  const pricey = { ...base, targetMarginPercent: 95 };
  const rows = mi.analyzeQuotes([1, 2, 3, 4, 5].map((i) => quote({ id: `x${i}`, estimatedPrice: 35, distanceMiles: 20, pricingBreakdown: { minimumApplied: true } })), [pricey], now);
  const rec = mi.buildRecommendations(rows, [pricey], { defaultProfileId: "pp", baseRatePerMile: 2, minimumCharge: 35, useMinimumCharge: true, hasFormSpecificPricing: false }, now).find((r) => r.kind === "minimum_charge");
  assert.equal(rec.proposal.proposed, 52, "floor(35 * 1.5)");
  assert.match(rec.reasoning, /50% step/);
});

test("per-mile proposal spreads the shortfall over billable miles only", () => {
  const rows = mi.analyzeQuotes([1, 2, 3, 4, 5].map((i) => quote({ id: `r${i}`, estimatedPrice: 90, distanceMiles: 30, pricingBreakdown: { billableMiles: 30, minimumApplied: false } })), [base], now);
  const rec = mi.buildRecommendations(rows, [base], { defaultProfileId: "pp", baseRatePerMile: 2, minimumCharge: 35, useMinimumCharge: true, hasFormSpecificPricing: false }, now).find((r) => r.kind === "rate_per_mile");
  const e = rows[0].estimate;
  const expected = Math.ceil((2 + (mi.requiredRevenue(e) - 90) / 30) * 20) / 20;
  assert.equal(rec.proposal.proposed, expected);
  assert.ok(rec.proposal.proposed <= 3.05);
});

test("issue jobs alert even when their quote is outside the analysed window", () => {
  const alerts = mi.buildAlerts([], [{ id: "j9", status: "ISSUE", quoteRequestId: "gone", scheduledDate: now, updatedAt: now }], [base], now);
  assert.deepEqual(alerts.map((a) => [a.kind, a.jobId]), [["job_issue", "j9"]]);
});

test("optional costs left blank are listed, and time zones fall back to UTC", () => {
  const e = mi.estimateProfit(quote(), [{ ...base, tollsPerJob: null, handlingMinutes: null }]);
  assert.deepEqual(e.assumptions.unsetOptional, ["Loading and handling time", "Tolls"]);
  assert.equal(mi.safeTimeZone("America/Chicago"), "America/Chicago");
  assert.equal(mi.safeTimeZone("Not/AZone"), "UTC");
  assert.equal(mi.safeTimeZone(null), "UTC");
});
