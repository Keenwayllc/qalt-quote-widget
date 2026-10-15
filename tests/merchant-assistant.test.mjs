import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
import * as engine from "../src/lib/quote-profit-intelligence.ts";

const require = createRequire(import.meta.url);
function load(file, deps) {
  const module = { exports: {} };
  const code = ts.transpileModule(readFileSync(new URL(`../src/lib/${file}`, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  new Function("require", "module", "exports", code)((n) => deps[n] ?? require(n), module, module.exports);
  return module.exports;
}
const mi = load("merchant-intelligence.ts", { "./quote-profit-intelligence": engine });
const assistant = load("merchant-assistant.ts", { "./merchant-intelligence": mi });

const now = new Date("2026-10-14T18:00:00Z");
const ago = (h) => new Date(now.getTime() - h * 3_600_000).toISOString();
const costs = [{
  vehicleKey: "", label: "All vehicles", fuelPricePerGallon: 4, milesPerGallon: 20, driverHourlyCost: 30,
  averageSpeedMph: 30, handlingMinutes: 30, deadheadMiles: 0, tollsPerJob: 0, otherCostPerJob: 0,
  targetMarginPercent: 25, followUpAfterHours: 24,
}];
const q = (id, over = {}) => ({
  id, createdAt: ago(5), customerName: `Customer ${id}`, status: "PENDING", paymentStatus: null,
  estimatedPrice: 150, distanceMiles: 30, vehicleType: "Cargo Van", serviceType: "Same day",
  pickupZip: "91601", dropoffZip: "90001", pricingBreakdown: null, ...over,
});
const quotes = [
  q("a", { estimatedPrice: 300, status: "WON" }),
  q("b", { estimatedPrice: 40, createdAt: ago(30) }),
  q("c", { paymentStatus: "PAID", status: "CONFIRMED", estimatedPrice: 120, vehicleType: "Box Truck" }),
  q("d", { status: "LOST", estimatedPrice: 1000 }),
];
const ctx = (over = {}) => {
  const analyzed = mi.analyzeQuotes(quotes, costs, now);
  return { quotes: analyzed, profiles: costs, recommendations: [], now, ...over };
};
const ask = (text, over) => assistant.answerQuestion(text, ctx(over));

test("routes every example question to a verified-data intent", () => {
  const expected = {
    "What was my most profitable quote this week?": "most_profitable",
    "Which deliveries have low margins?": "low_margin",
    "Am I charging enough for cargo van deliveries?": "charging_enough",
    "Which customers have outstanding quotes?": "outstanding",
    "How much revenue did I generate this month?": "revenue",
    "Which vehicle type performs best?": "best_vehicle",
    "Why is this quote unprofitable?": "why_unprofitable",
  };
  for (const [question, intent] of Object.entries(expected)) assert.equal(assistant.detectIntent(question), intent, question);
  assert.deepEqual(assistant.SUGGESTED_QUESTIONS, Object.keys(expected));
});

test("revenue keeps online payments separate from booked estimates", () => {
  const a = ask("How much revenue did I generate this month?");
  assert.match(a.answer, /collected \$120\.00 in online payments from 1 paid quote/);
  assert.match(a.answer, /total \$420\.00 in quoted value/);
});

test("most profitable ignores closed quotes and names the quote", () => {
  const a = ask("most profitable quote this week");
  assert.deepEqual(a.quoteIds, ["a"]);
  assert.match(a.answer, /Customer a/);
});

test("why unprofitable explains the largest cost and the price needed", () => {
  const a = ask("Why is this quote unprofitable?", { quoteId: "b" });
  assert.deepEqual(a.quoteIds, ["b"]);
  assert.match(a.answer, /biggest cost is driver time/);
  assert.match(a.answer, /would need about \$/);
});

test("outstanding lists pending customers and promises not to contact them", () => {
  const a = ask("Which customers have outstanding quotes?");
  assert.deepEqual(a.quoteIds.sort(), ["b"]);
  assert.match(a.answer, /needs follow-up/);
  assert.match(a.answer, /won't contact anyone/);
});

test("small samples are flagged instead of stated as conclusions", () => {
  const a = ask("Am I charging enough for cargo van deliveries?");
  assert.match(a.answer, /early signal/);
});

test("without cost settings the assistant refuses to make up profit", () => {
  const analyzed = mi.analyzeQuotes(quotes, [], now);
  const a = assistant.answerQuestion("Which deliveries have low margins?", { quotes: analyzed, profiles: [], recommendations: [], now });
  assert.match(a.answer, /can't estimate profit yet/);
});

test("unknown questions get help, not a guess", () => {
  const a = ask("what's the weather?");
  assert.equal(a.intent, "help");
  assert.equal(a.matched, false);
});
