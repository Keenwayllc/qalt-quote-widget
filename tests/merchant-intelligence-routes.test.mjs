import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
import * as engine from "../src/lib/quote-profit-intelligence.ts";
import * as formVehicles from "../src/lib/form-vehicles.ts";

const require = createRequire(import.meta.url);
function load(file, deps) {
  const module = { exports: {} };
  const code = ts.transpileModule(readFileSync(new URL(`../src/${file}`, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  new Function("require", "module", "exports", code)((n) => {
    if (n in deps) return deps[n];
    return require(n);
  }, module, module.exports);
  return module.exports;
}
const mi = load("lib/merchant-intelligence.ts", { "./quote-profit-intelligence": engine, "./form-vehicles": formVehicles });
const assistant = load("lib/merchant-assistant.ts", { "./merchant-intelligence": mi });
const nextServer = { NextResponse: { json: (body, init = {}) => ({ status: init.status ?? 200, body, headers: init.headers }) } };

const costs = {
  vehicleKey: "", label: "All vehicles", followUpAfterHours: 24, fuelPricePerGallon: 4, milesPerGallon: 20,
  driverHourlyCost: 30, averageSpeedMph: 30, handlingMinutes: 30, deadheadMiles: 0, tollsPerJob: 0, otherCostPerJob: 0, targetMarginPercent: 25,
};
const shortTrip = (id, companyId) => ({
  id, companyId, createdAt: new Date(), customerName: `C ${id}`, status: "PENDING", paymentStatus: null, estimatedPrice: 35,
  distanceMiles: 20, vehicleType: null, serviceType: "Same day", pickupZip: "91601", dropoffZip: "90001", pricingBreakdown: { minimumApplied: true },
});

// In-memory multi-tenant database. Every query must carry the session company.
function world({ table = true } = {}) {
  const calls = [];
  const quotes = [...[1, 2, 3, 4, 5].map((i) => shortTrip(`a${i}`, "company-a")), shortTrip("b1", "company-b")];
  const profiles = [{ ...costs, companyId: "company-a" }, { ...costs, companyId: "company-b", fuelPricePerGallon: 99 }];
  const pricing = [
    { id: "pp-a", companyId: "company-a", widgetSettingsId: null, baseRatePerMile: 2, minimumCharge: 35, useMinimumCharge: true },
    { id: "pp-b", companyId: "company-b", widgetSettingsId: null, baseRatePerMile: 2, minimumCharge: 35, useMinimumCharge: true },
  ];
  const scoped = (rows, where) => rows.filter((r) => r.companyId === where.companyId && (!where.id || r.id === where.id));
  const missing = () => Object.assign(new Error("table missing"), { code: "P2021" });
  const db = {
    calls,
    pricing,
    quoteRequest: {
      findMany: async (args) => (calls.push(["quotes", args.where.companyId]), scoped(quotes, args.where)),
      findFirst: async (args) => (calls.push(["quote", args.where.companyId]), scoped(quotes, args.where)[0] ?? null),
    },
    merchantCostProfile: {
      findMany: async (args) => {
        calls.push(["costs", args.where.companyId]);
        if (!table) throw missing();
        return scoped(profiles, args.where);
      },
      upsert: async (args) => (calls.push(["upsert", args.where.companyId_vehicleKey.companyId, args]), { updatedAt: new Date() }),
      deleteMany: async (args) => (calls.push(["delete", args.where.companyId]), { count: 1 }),
    },
    job: {
      groupBy: async (args) => (calls.push(["jobs", args.where.companyId]), []),
      count: async (args) => (calls.push(["jobCount", args.where.companyId]), 0),
      findMany: async (args) => (calls.push(["issueJobs", args.where.companyId]), []),
    },
    pricingProfile: {
      updateMany: async (args) => {
        calls.push(["updatePricing", args.where.companyId, args]);
        const row = pricing.find((p) => p.id === args.where.id && p.companyId === args.where.companyId && p.widgetSettingsId === null);
        if (row) Object.assign(row, args.data);
        return { count: row ? 1 : 0 };
      },
    },
  };
  const company = (id) => ({ id, name: id, timezone: "America/Los_Angeles", widgetSettings: [], pricingProfiles: pricing.filter((p) => p.companyId === id) });
  const routes = (companyId) => {
    const session = {
      getCurrentCompany: async () => company(companyId),
      getDefaultPricing: (c) => c.pricingProfiles.find((p) => p.widgetSettingsId === null) ?? null,
    };
    const prisma = { __esModule: true, default: db };
    const data = load("lib/merchant-intelligence-data.ts", { "@/lib/session": session, "@/lib/prisma": prisma, "@/lib/merchant-intelligence": mi });
    const deps = {
      "next/server": nextServer, "@/lib/session": session, "@/lib/prisma": prisma, "@/lib/merchant-intelligence": mi,
      "@/lib/merchant-intelligence-data": data, "@/lib/merchant-assistant": assistant,
      "next/navigation": { unstable_rethrow: (e) => { if (e?.digest?.startsWith?.("NEXT_REDIRECT")) throw e; } },
    };
    return {
      data,
      apply: load("app/api/dashboard/intelligence/recommendations/apply/route.ts", deps),
      quote: load("app/api/dashboard/intelligence/quote/[id]/route.ts", deps),
      costs: load("app/api/dashboard/intelligence/cost-profiles/route.ts", deps),
      ask: load("app/api/dashboard/intelligence/assistant/route.ts", deps),
    };
  };
  return { db, routes };
}
const req = (body, url = "https://qalt.test/api") => ({ url, json: async () => body });

test("every intelligence query is scoped to the session company", async () => {
  const w = world();
  const view = await w.routes("company-a").data.loadMerchantIntelligence();
  assert.ok(view.quotes.every((q) => q.id.startsWith("a")));
  assert.ok(w.db.calls.length >= 5);
  assert.ok(w.db.calls.every(([, companyId]) => companyId === "company-a"), JSON.stringify(w.db.calls));
});

test("a merchant cannot read another merchant's quote estimate", async () => {
  const w = world();
  const { quote } = w.routes("company-a");
  const other = await quote.GET({}, { params: Promise.resolve({ id: "b1" }) });
  assert.equal(other.status, 404);
  const own = await quote.GET({}, { params: Promise.resolve({ id: "a1" }) });
  assert.equal(own.status, 200);
  assert.equal(own.body.estimate.status, "ok");
  assert.equal(own.headers["Cache-Control"], "private, no-store");
});

test("pricing changes need confirmation and the server-computed value, and stay in the tenant", async () => {
  const w = world();
  const { apply } = w.routes("company-a");
  const id = "minimum_charge:default";
  // cost per trip: fuel 20/20*$4 = 4 + driver (0.5h + 20/30h) * $30 = 35 -> 39 / 0.75 = 52
  assert.equal((await apply.POST(req({ recommendationId: id, proposed: 52 }))).status, 400, "no confirm");
  assert.equal((await apply.POST(req({ recommendationId: id, proposed: 9999, confirm: true }))).status, 409, "edited value");
  assert.equal((await apply.POST(req({ recommendationId: "made-up", proposed: 52, confirm: true }))).status, 409);
  const ok = await apply.POST(req({ recommendationId: id, proposed: 52, confirm: true, companyId: "company-b", profileId: "pp-b" }));
  assert.equal(ok.status, 200);
  assert.equal(w.db.pricing.find((p) => p.id === "pp-a").minimumCharge, 52);
  assert.equal(w.db.pricing.find((p) => p.id === "pp-b").minimumCharge, 35, "other tenant untouched");
});

test("cost settings save only to the session company and validate input", async () => {
  const w = world();
  const { costs: route } = w.routes("company-a");
  assert.equal((await route.PUT(req({ profile: { ...costs, milesPerGallon: 0 } }))).status, 400);
  const saved = await route.PUT(req({ profile: { ...costs, companyId: "company-b" } }));
  assert.equal(saved.status, 200);
  const upsert = w.db.calls.find(([name]) => name === "upsert");
  assert.equal(upsert[1], "company-a");
  assert.equal(upsert[2].create.companyId, "company-a");
  assert.ok(!("companyId" in upsert[2].update));
  assert.equal((await route.DELETE(req(null, "https://qalt.test/api?vehicleKey="))).status, 400, "default row is permanent");
});

test("before the migration is applied the feature degrades instead of failing", async () => {
  const w = world({ table: false });
  const r = w.routes("company-a");
  const view = await r.data.loadMerchantIntelligence();
  assert.equal(view.costTableReady, false);
  assert.ok(view.quotes.every((q) => q.estimate.status === "unavailable"));
  assert.equal((await r.costs.PUT(req({ profile: costs }))).status, 503);
});

test("assistant validates input, throttles, and answers from the tenant's data only", async () => {
  const w = world();
  const { ask } = w.routes("company-a");
  assert.equal((await ask.POST(req({ question: "  " }))).status, 400);
  assert.equal((await ask.POST(req({ question: "x".repeat(301) }))).status, 400);
  const res = await ask.POST(req({ question: "Which customers have outstanding quotes?" }));
  assert.equal(res.status, 200);
  assert.ok(res.body.answer.quoteIds.every((id) => id.startsWith("a")));
  let limited = 0;
  for (let i = 0; i < 25; i++) if ((await ask.POST(req({ question: "revenue" }))).status === 429) limited++;
  assert.ok(limited > 0, "per-company throttle engages");
});

test("an expired session redirect is not reported as a server error", async () => {
  const w = world();
  const r = w.routes("company-a");
  const redirect = Object.assign(new Error("NEXT_REDIRECT"), { digest: "NEXT_REDIRECT;replace;/login;307;" });
  const deps = {
    "next/server": nextServer, "@/lib/session": { getCurrentCompany: async () => { throw redirect; } },
    "@/lib/prisma": { __esModule: true, default: w.db }, "@/lib/merchant-intelligence": mi, "@/lib/merchant-intelligence-data": r.data,
    "next/navigation": { unstable_rethrow: (e) => { if (e?.digest?.startsWith?.("NEXT_REDIRECT")) throw e; } },
  };
  const route = load("app/api/dashboard/intelligence/cost-profiles/route.ts", deps);
  await assert.rejects(() => route.GET(), /NEXT_REDIRECT/);
});
