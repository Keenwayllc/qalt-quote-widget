import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
import { getEntitlements, quotaMonthStart } from "../src/lib/plans.ts";
import {
  analyticsWindow,
  buildAnalytics,
} from "../src/lib/analytics-report.ts";
import { widgetInstallationStatus } from "../src/lib/widget-installations.ts";
const now = new Date("2026-10-13T16:30:00Z");
function loader({
  tenant = "company-a",
  plan = "STARTER",
  fail = [],
  monthly = 2,
  embed = null,
  empty = false,
} = {}) {
  const calls = [];
  const row = {
    id: "quote-one",
    customerName: "Alex",
    createdAt: new Date("2026-10-13T10:00:00Z"),
    estimatedPrice: 100,
    pickupZip: "91601",
    dropoffZip: "90001",
    status: "PENDING",
    paymentStatus: null,
    distanceMiles: 15,
    serviceType: "Same day",
  };
  const invoke = (name, fn) => async (args) => {
    calls.push({ name, args });
    if (fail.includes(name)) throw Error("internal private failure");
    return fn(args);
  };
  const db = {
    quoteRequest: {
      findMany: invoke("quotes", (args) => (empty ? [] : [row])),
      count: invoke("count", (args) =>
        args.where.createdAt ? monthly : empty ? 0 : 1,
      ),
      aggregate: invoke("pending", () => ({
        _count: { _all: empty ? 0 : 1 },
        _sum: { estimatedPrice: empty ? null : 100 },
      })),
    },
    job: {
      findMany: invoke("jobs", () =>
        empty
          ? []
          : [
              {
                id: "job-one",
                status: "ISSUE",
                scheduledDate: new Date("2026-10-14T00:00:00Z"),
                stops: [{ stopNote: { companyName: "Warehouse" } }],
              },
            ],
      ),
      groupBy: invoke("jobCounts", () =>
        empty
          ? []
          : [
              { status: "ISSUE", _count: { _all: 8 } },
              { status: "READY", _count: { _all: 2 } },
            ],
      ),
    },
    widgetInstallation: { findFirst: invoke("embed", () => embed) },
  };
  const require = createRequire(import.meta.url);
  const module = { exports: {} };
  const company = {
    id: tenant,
    name: "Example delivery",
    subscriptionPlan: plan,
    widgetSettings: [],
    pricingProfiles: [],
  };
  const localRequire = (name) =>
    name === "@/lib/session"
      ? {
          getCurrentCompany: async () => company,
          getEffectivePricing: () => null,
        }
      : name === "@/lib/plans"
        ? { getEntitlements, quotaMonthStart }
        : name === "@/lib/prisma"
          ? { __esModule: true, default: db }
          : name === "@/lib/customer-contact"
            ? {
                getCustomerFacingContact: invoke("contact", () => ({
                  email: null,
                  phone: null,
                })),
              }
            : name === "@/lib/analytics-report"
              ? { analyticsWindow, buildAnalytics }
              : name === "@/lib/widget-installations"
                ? { widgetInstallationStatus }
                : require(name);
  const code = ts.transpileModule(
    readFileSync(
      new URL("../src/lib/overview-data.ts", import.meta.url),
      "utf8",
    ),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        esModuleInterop: true,
      },
    },
  ).outputText;
  new Function("require", "module", "exports", code)(
    localRequire,
    module,
    module.exports,
  );
  return { load: () => module.exports.loadOverview(now), calls };
}
test("every overview source remains company-scoped and quota counts retain deleted usage", async () => {
  for (const tenant of ["company-a", "company-b"]) {
    const { load, calls } = loader({ tenant });
    await load();
    for (const call of calls) {
      if (call.name === "contact") assert.equal(call.args, tenant);
      else assert.equal(call.args.where.companyId, tenant);
    }
    const counts = calls.filter((c) => c.name === "count");
    assert.equal(
      counts.find((c) => c.args.where.createdAt).args.where.deletedAt,
      undefined,
    );
    assert.equal(
      counts.find((c) => !c.args.where.createdAt).args.where.deletedAt,
      null,
    );
    for (const query of calls.filter(
      (c) => c.name === "quotes" || c.name === "pending",
    ))
      assert.equal(query.args.where.deletedAt, null);
    assert(
      calls
        .find((c) => c.name === "pending")
        .args.where.OR.some((q) => q.paymentStatus === null),
    );
  }
});
test("job totals use all active groups, not only the limited job preview", async () => {
  const { load } = loader();
  const data = await load();
  assert.equal(data.activeCount, 10);
  assert.equal(data.jobs.length, 1);
  assert.equal(data.jobStatuses.find((j) => j.status === "ISSUE").count, 8);
  assert.equal(data.pendingCount, 1);
  assert.equal(data.openValue, 100);
  assert.equal(data.report.summary.count, 1);
});
test("partial failure keeps independent values and never turns missing data into zero", async () => {
  const data = await loader({
    fail: ["quotes", "jobs", "jobCounts", "embed", "contact"],
  }).load();
  assert.equal(data.unavailable, true);
  assert.equal(data.report, null);
  assert.equal(data.recent, null);
  assert.equal(data.jobs, null);
  assert.equal(data.activeCount, null);
  assert.equal(data.pendingCount, 1);
  assert.equal(data.embedStatus, "Detection unavailable");
  assert.equal(data.setup.find((s) => s.id === "embed").done, null);
  assert.equal(data.setup.find((s) => s.id === "contact").done, null);
  assert(!JSON.stringify(data).includes("internal private failure"));
});
test("empty company has honest zero counts and no fabricated online status", async () => {
  const data = await loader({ empty: true, monthly: 0 }).load();
  assert.equal(data.total, 0);
  assert.equal(data.openValue, 0);
  assert.equal(data.activeCount, 0);
  assert.equal(data.embedStatus, "Not detected");
  assert.equal(data.report.summary.count, 0);
  assert.equal(data.report.quoteChange, null);
  assert.equal(data.setup.find((s) => s.id === "embed").done, false);
});
test("embed status is evidence of a load and all plans retain their quota rules", async () => {
  const recent = await loader({
    embed: { lastSeenAt: new Date("2026-10-12T00:00:00Z") },
  }).load();
  assert.equal(recent.embedStatus, "Active embed");
  assert.equal(recent.setup.find((s) => s.id === "embed").done, true);
  const old = await loader({
    embed: { lastSeenAt: new Date("2026-08-01T00:00:00Z") },
  }).load();
  assert.equal(old.embedStatus, "Previously detected");
  const exhausted = await loader({ monthly: 50 }).load();
  assert.equal(exhausted.quotaReached, true);
  assert.equal(exhausted.embedStatus, "Monthly limit reached");
  for (const plan of ["PRO", "ENTERPRISE"]) {
    const data = await loader({ plan, monthly: 500 }).load();
    assert.equal(data.quotaLimit, "unlimited");
    assert.equal(data.quotaReached, false);
  }
});
