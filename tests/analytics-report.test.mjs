import test from "node:test";
import assert from "node:assert/strict";
import {
  analyticsDays,
  analyticsWindow,
  buildAnalytics,
  percentageChange,
} from "../src/lib/analytics-report.ts";
import { getEntitlements } from "../src/lib/plans.ts";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
const now = new Date("2026-10-13T16:30:00Z");
const quote = (overrides = {}) => ({
  id: "q1",
  createdAt: "2026-10-13T01:00:00Z",
  status: "PENDING",
  paymentStatus: null,
  estimatedPrice: 100,
  distanceMiles: 25,
  serviceType: "same_day",
  pickupZip: "91601",
  dropoffZip: "90001",
  ...overrides,
});
test("reporting windows include exactly N UTC dates and validate the selected range", () => {
  assert.equal(analyticsDays("7"), 7);
  assert.equal(analyticsDays("90"), 90);
  assert.equal(analyticsDays("invalid"), 30);
  assert.equal(
    analyticsWindow(7, now).start.toISOString(),
    "2026-10-07T00:00:00.000Z",
  );
  for (const days of [7, 30, 90])
    assert.equal(buildAnalytics([], days, now).daily.length, days);
});
test("empty cohorts report no rate or average and never manufacture growth", () => {
  const r = buildAnalytics([], 30, now);
  assert.equal(r.summary.count, 0);
  assert.equal(r.summary.bookingRate, null);
  assert.equal(r.summary.average, null);
  assert.equal(r.quoteChange, null);
  assert.equal(r.peakHour, null);
  assert.equal(r.averageDistance, null);
  assert.equal(percentageChange(10, 0), null);
  assert.equal(percentageChange(0, 10), -100);
});
test("boundary requests belong to one window and future requests are excluded", () => {
  const r = buildAnalytics(
    [
      quote({ id: "prior", createdAt: "2026-10-06T23:59:59Z" }),
      quote({ createdAt: "2026-10-07T00:00:00Z" }),
      quote({ id: "future", createdAt: "2026-10-13T17:00:00Z" }),
      quote({ id: "old", createdAt: "2026-09-29T23:59:59Z" }),
    ],
    7,
    now,
  );
  assert.equal(r.summary.count, 1);
  assert.equal(r.prior.count, 1);
  assert.equal(
    r.daily.reduce((s, d) => s + d.quotes, 0),
    1,
  );
  assert.equal(
    r.daily.reduce((s, d) => s + d.previous, 0),
    1,
  );
  assert.equal(r.quoteChange, 0);
});
test("outcome buckets are exclusive and all booking statuses are counted", () => {
  const rows = [
    "PENDING",
    "WON",
    "CONFIRMED",
    "PAID",
    "LOST",
    "CANCELLED",
    "CUSTOM",
  ].map((status, i) => quote({ id: `q${i}`, status }));
  rows.push(quote({ id: "payment", status: "PENDING", paymentStatus: "PAID" }));
  const r = buildAnalytics(rows, 30, now);
  assert.equal(r.summary.count, 8);
  assert.equal(r.summary.booked, 4);
  assert.equal(r.summary.paid, 2);
  assert.equal(r.summary.bookingRate, 50);
  assert.equal(r.summary.openValue, 100);
  assert.equal(r.summary.paidValue, 200);
  assert.equal(
    r.outcomes.reduce((s, x) => s + x.count, 0),
    8,
  );
  assert.equal(r.outcomes.find((x) => x.label === "Booked").count, 2);
});
test("breakdowns preserve totals and handle malformed values without NaN", () => {
  const r = buildAnalytics(
    [
      quote(),
      quote({
        id: "bad",
        estimatedPrice: NaN,
        distanceMiles: 0,
        pickupZip: "unknown",
        serviceType: "",
      }),
      quote({ id: "negative", estimatedPrice: -50, distanceMiles: 50 }),
    ],
    30,
    now,
  );
  assert.equal(r.summary.quotedValue, 100);
  assert.equal(r.averageDistance, 37.5);
  assert.equal(
    r.regions.reduce((s, x) => s + x.count, 0),
    3,
  );
  assert.equal(
    r.services.reduce((s, x) => s + x.value, 0),
    100,
  );
  assert(r.regions.some((x) => x.label === "Unknown ZIP area"));
  const tie = buildAnalytics(
    [
      quote({ createdAt: "2026-10-13T10:00:00Z" }),
      quote({ id: "early", createdAt: "2026-10-13T02:00:00Z" }),
    ],
    7,
    now,
  );
  assert.equal(tie.peakHour, "02:00 UTC");
});
test("analytics is globally available without enabling other paid features", () => {
  for (const plan of ["STARTER", "PRO", "ENTERPRISE", null])
    assert.equal(getEntitlements(plan).isAnalyticsDashboardEnabled, true);
  assert.equal(getEntitlements("STARTER").isPaymentsEnabled, false);
  assert.equal(getEntitlements("PRO").isWebhookEnabled, false);
});
test("actual analytics loader restricts every query to current tenant and excludes deleted rows", async () => {
  const source = readFileSync(
    new URL("../src/app/dashboard/analytics/page.tsx", import.meta.url),
    "utf8",
  );
  const code = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  const require = createRequire(import.meta.url);
  let company = "tenant-a";
  let query;
  const module = { exports: {} };
  const localRequire = (name) =>
    name === "@/lib/session"
      ? { getCurrentCompany: async () => ({ id: company }) }
      : name === "@/lib/prisma"
        ? {
            __esModule: true,
            default: {
              quoteRequest: {
                findMany: async (args) => {
                  query = args;
                  return [];
                },
              },
            },
          }
        : name === "@/lib/analytics-report"
          ? { analyticsDays, analyticsWindow, buildAnalytics }
          : name === "./AnalyticsClientComponents"
            ? { __esModule: true, default: () => null }
            : require(name);
  new Function("require", "module", "exports", code)(
    localRequire,
    module,
    module.exports,
  );
  for (const tenant of ["tenant-a", "tenant-b"]) {
    company = tenant;
    await module.exports.default({
      searchParams: Promise.resolve({ days: "90" }),
    });
    assert.equal(query.where.companyId, tenant);
    assert.equal(query.where.deletedAt, null);
    assert(query.where.createdAt.gte instanceof Date);
    assert.equal(query.select.customerEmail, undefined);
  }
});
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
test("quote drill-down opens only a request already present in the tenant-scoped list", () => {
  const source = readFileSync(
    new URL("../src/app/dashboard/quotes/QuotesClient.tsx", import.meta.url),
    "utf8",
  );
  const code = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  const require = createRequire(import.meta.url);
  const module = { exports: {} };
  const localRequire = (name) =>
    name === "next/navigation"
      ? { useRouter: () => ({ refresh() {} }) }
      : name === "next/link"
        ? {
            __esModule: true,
            default: ({ children, ...props }) =>
              React.createElement("a", props, children),
          }
        : name === "./KanbanBoard" || name === "./QuoteDocumentsCard"
          ? { __esModule: true, default: () => null }
          : require(name);
  new Function("require", "module", "exports", code)(
    localRequire,
    module,
    module.exports,
  );
  const q = {
    ...quote(),
    createdAt: new Date(now),
    customerName: "Alex",
    customerEmail: "alex@example.com",
    customerPhone: null,
    intermediateStops: [],
    packageSize: null,
    packageWeight: null,
    selectedExtras: null,
    internalNotes: null,
    vehicleCount: null,
    awbNumber: null,
    paidAt: null,
  };
  const render = (id) =>
    renderToStaticMarkup(
      React.createElement(module.exports.default, {
        quotes: [q],
        initialQuoteId: id,
        insideDeliveryLabel: "Inside delivery",
        addon3Label: "",
      }),
    );
  assert(render("q1").includes("Quote Details"));
  assert(!render("other-tenant-request").includes("Quote Details"));
  assert(!render(undefined).includes("Quote Details"));
});
