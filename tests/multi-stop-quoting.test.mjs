import test from "node:test";
import assert from "node:assert/strict";

import { estimatePriceDetailed } from "../src/lib/calculator.ts";
import { calculateMultiStopDrivingDistance } from "../src/lib/google-maps.ts";
import {
  MAX_INTERMEDIATE_STOPS,
  hasDuplicateConsecutiveLocations,
  normalizeIntermediateStops,
  routeLocations,
} from "../src/lib/route-stops.ts";

const rules = {
  baseRatePerMile: 2,
  minimumCharge: 35,
  useMinimumCharge: true,
  minMilesThreshold: 0,
  weightFee: 1,
  itemCountFee: 3,
  additionalStopFee: 10,
  stairsFee: 5,
  insideDeliveryFee: 4,
  addon3Fee: 2,
  afterHoursFee: 6,
  businessHoursStart: "08:00",
  businessHoursEnd: "18:00",
  businessDays: "1,2,3,4,5",
  largeItemFee: 0,
  largeItemsEnabled: true,
  largeItemCategories: [{ name: "Pallet", price: 8 }],
};

const baseExtras = {
  hasStairs: false,
  needsInsideDelivery: false,
  needsAddon3: false,
};

test("zero additional stops preserves the existing single-route quote", () => {
  const quote = estimatePriceDetailed(10, rules, { ...baseExtras, additionalStopCount: 0 });
  assert.equal(quote.total, 35);
  assert.equal(quote.minimumApplied, true);
  assert.equal(quote.lineItems.some((item) => item.key === "additionalStops"), false);
});

test("one additional stop adds one clearly separated flat fee", () => {
  const quote = estimatePriceDetailed(10, rules, { ...baseExtras, additionalStopCount: 1 });
  const stopLine = quote.lineItems.find((item) => item.key === "additionalStops");
  assert.deepEqual(stopLine, {
    key: "additionalStops",
    label: "Additional stop, 1",
    amount: 10,
    detail: "1 × $10.00",
  });
  assert.equal(quote.total, 45);
});

test("multiple stops charge once each while existing surcharges still compose", () => {
  const quote = estimatePriceDetailed(10, rules, {
    hasStairs: true,
    stairsFlights: 2,
    needsInsideDelivery: true,
    needsAddon3: true,
    isAfterHours: true,
    packageWeight: 2,
    itemCount: 2,
    selectedLargeItems: ["Pallet"],
    additionalStopCount: 3,
  });
  assert.equal(quote.lineItems.find((item) => item.key === "additionalStops")?.amount, 30);
  assert.equal(quote.lineItems.find((item) => item.key === "weight")?.amount, 2);
  assert.equal(quote.lineItems.find((item) => item.key === "items")?.amount, 6);
  assert.equal(quote.lineItems.find((item) => item.key === "stairs")?.amount, 10);
  assert.equal(quote.lineItems.find((item) => item.key === "insideDelivery")?.amount, 4);
  assert.equal(quote.lineItems.find((item) => item.key === "addon3")?.amount, 2);
  assert.equal(quote.lineItems.find((item) => item.key === "afterHours")?.amount, 6);
  assert.equal(quote.lineItems.find((item) => item.key === "large:Pallet")?.amount, 8);
  assert.equal(quote.total, 103);
});

test("ordered route helpers retain 0, 1, and multiple validated stops", () => {
  assert.deepEqual(normalizeIntermediateStops([]), []);
  assert.deepEqual(normalizeIntermediateStops([{ address: "  Stop One  ", zip: " 90210 " }]), [
    { address: "Stop One", zip: "90210" },
  ]);
  const stops = normalizeIntermediateStops([
    { address: "Stop One", zip: "11111" },
    { address: "Stop Two", zip: "22222" },
  ]);
  assert.deepEqual(routeLocations("Pickup", stops, "Drop-off"), ["Pickup", "Stop One", "Stop Two", "Drop-off"]);
  assert.equal(hasDuplicateConsecutiveLocations(["Pickup", " pickup "]), true);
  assert.equal(normalizeIntermediateStops(Array.from({ length: 20 }, (_, i) => ({ address: `Stop ${i}`, zip: "" }))).length, MAX_INTERMEDIATE_STOPS);
});

test("route distance sums every ordered leg for 0, 1, and multiple additional stops", async () => {
  const distances = new Map([
    ["Pickup→Drop-off", { distanceMiles: 8, durationMinutes: 12 }],
    ["Pickup→Stop One", { distanceMiles: 3, durationMinutes: 5 }],
    ["Stop One→Drop-off", { distanceMiles: 7, durationMinutes: 10 }],
    ["Stop One→Stop Two", { distanceMiles: 4, durationMinutes: 6 }],
    ["Stop Two→Drop-off", { distanceMiles: 5, durationMinutes: 8 }],
  ]);
  const calls = [];
  const calculateLeg = async (origin, destination) => {
    calls.push(`${origin}→${destination}`);
    return distances.get(`${origin}→${destination}`) ?? null;
  };

  assert.deepEqual(await calculateMultiStopDrivingDistance(["Pickup", "Drop-off"], calculateLeg), {
    distanceMiles: 8,
    durationMinutes: 12,
  });
  assert.deepEqual(await calculateMultiStopDrivingDistance(["Pickup", "Stop One", "Drop-off"], calculateLeg), {
    distanceMiles: 10,
    durationMinutes: 15,
  });
  assert.deepEqual(
    await calculateMultiStopDrivingDistance(["Pickup", "Stop One", "Stop Two", "Drop-off"], calculateLeg),
    { distanceMiles: 12, durationMinutes: 19 }
  );
  assert.deepEqual(calls, [
    "Pickup→Drop-off",
    "Pickup→Stop One",
    "Stop One→Drop-off",
    "Pickup→Stop One",
    "Stop One→Stop Two",
    "Stop Two→Drop-off",
  ]);
});
