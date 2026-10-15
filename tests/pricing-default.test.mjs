import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

// session.ts touches cookies and the database at import time only through
// functions we do not call, so stub those modules.
const module = { exports: {} };
const code = ts.transpileModule(readFileSync(new URL("../src/lib/session.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const stubs = { react: { cache: (f) => f }, "next/headers": {}, "next/navigation": {}, "./auth": {}, "./prisma": { __esModule: true, default: {} } };
new Function("require", "module", "exports", code)((n) => stubs[n] ?? {}, module, module.exports);
const { getDefaultPricing, getEffectivePricing } = module.exports;

const profile = (id, widgetSettingsId, baseRatePerMile) => ({ id, widgetSettingsId, baseRatePerMile });

test("with duplicate defaults, the oldest wins on every page", () => {
  const company = { widgetSettings: [], pricingProfiles: [profile("cmz3", null, 3), profile("cma1", null, 81), profile("cmm2", null, 2)] };
  assert.equal(getDefaultPricing(company).id, "cma1");
  assert.equal(getDefaultPricing({ ...company, pricingProfiles: [...company.pricingProfiles].reverse() }).id, "cma1");
  assert.equal(getDefaultPricing({ widgetSettings: [], pricingProfiles: [] }), null);
});

test("overview rate is the single form's own pricing when it has one", () => {
  const company = { widgetSettings: [{ id: "form88" }], pricingProfiles: [profile("cma1", null, 3), profile("cmb2", "form88", 3.25)] };
  assert.equal(getEffectivePricing(company).baseRatePerMile, 3.25);
  assert.equal(getEffectivePricing({ ...company, pricingProfiles: [profile("cma1", null, 3)] }).baseRatePerMile, 3, "form without own pricing uses the default");
  assert.equal(getEffectivePricing({ ...company, widgetSettings: [{ id: "form88" }, { id: "f2" }] }).baseRatePerMile, 3, "several forms: show the default");
});

test("deleting a form deletes its pricing in the same transaction", () => {
  const src = readFileSync(new URL("../src/app/api/dashboard/forms/[formId]/route.ts", import.meta.url), "utf8");
  assert.match(src, /\$transaction\(\[\s*prisma\.pricingProfile\.deleteMany\(\{ where: \{ widgetSettingsId: formId, companyId: payload\.companyId \} \}\),\s*prisma\.widgetSettings\.delete/);
});
