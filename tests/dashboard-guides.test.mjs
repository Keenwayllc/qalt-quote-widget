import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { createRequire } from "node:module";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import { getEntitlements } from "../src/lib/plans.ts";
import { getPageGuide, pageGuides, gettingStartedSteps, guideActionHref } from "../src/lib/dashboard-guides.ts";
import { guideStorageKey, readWalkthroughStatus, saveWalkthroughStatus, subscribeToGuideState } from "../src/lib/dashboard-guide-state.ts";

const require = createRequire(import.meta.url);
const repo = resolve(import.meta.dirname, "..");
const clientCache = new Map();
let currentPath = "/dashboard";
// Render the real shared component with only Next's route hooks substituted.
function loadClient(file) {
  file = resolve(repo, file);
  if (clientCache.has(file)) return clientCache.get(file);
  const code = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const compiledModule = { exports: {} };
  const localRequire = (name) => {
    if (name === "next/navigation") return { usePathname: () => currentPath, useSearchParams: () => new URLSearchParams() };
    if (name === "next/link") return { __esModule: true, default: ({ children, ...props }) => React.createElement("a", props, children) };
    if (name.startsWith("@/")) return loadClient("src/" + name.slice(2) + ".ts");
    return require(name);
  };
  new Function("require", "module", "exports", code)(localRequire, compiledModule, compiledModule.exports);
  clientCache.set(file, compiledModule.exports);
  return compiledModule.exports;
}
const DashboardGuide = loadClient("src/components/dashboard/DashboardGuide.tsx").default;
function dashboardPages(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? dashboardPages(resolve(directory, entry.name))
      : entry.name === "page.tsx" ? [dirname(resolve(directory, entry.name))] : []);
}

test("every implemented dashboard route renders the shared Guide and Getting started buttons", () => {
  for (const directory of dashboardPages(resolve(repo, "src/app/dashboard"))) {
    currentPath = directory.slice(resolve(repo, "src/app").length).replaceAll("\\", "/").replace(/\[.*?\]/g, "example");
    const guide = getPageGuide(currentPath, true);
    assert.ok(guide, currentPath);
    assert.ok(guide.purpose && guide.controls.length && guide.configure && guide.next, currentPath);
    const html = renderToStaticMarkup(React.createElement(DashboardGuide, {
      companyId: "merchant-a", subscriptionPlan: "ENTERPRISE", isAdmin: true, onboardingCompleted: true,
    }));
    const expectedLabel = renderToStaticMarkup(React.createElement("span", null, "Guide for " + guide.title)).slice(6, -7);
    assert.ok(html.includes(expectedLabel), currentPath);
    assert.ok(html.includes("Getting started"), currentPath);
  }
  const layout = readFileSync(resolve(repo, "src/app/dashboard/DashboardClientLayout.tsx"), "utf8");
  assert.ok(layout.includes("<DashboardGuide companyId={companyId}"));
});

test("specific subpages win and admin guidance is hidden from merchants", () => {
  assert.equal(getPageGuide("/dashboard/settings/customer-contact").title, "Customer Contact");
  assert.equal(getPageGuide("/dashboard/pricing/simulator").title, "Pricing simulator");
  assert.equal(getPageGuide("/dashboard/ops/jobs/job-123").title, "Jobs Dashboard");
  assert.equal(getPageGuide("/dashboard/admin"), null);
  assert.equal(getPageGuide("/dashboard/admin/company", false), null);
  assert.equal(getPageGuide("/dashboard/admin", true).title, "Admin");
  assert.equal(getPageGuide("/dashboard/unknown"), null);
  assert.equal(getPageGuide("/dashboard/pricing-other"), null);
  currentPath = "/dashboard/admin";
  assert.equal(renderToStaticMarkup(React.createElement(DashboardGuide, {
    companyId: "merchant-a", subscriptionPlan: "STARTER", isAdmin: false, onboardingCompleted: true,
  })), "");
});

test("walkthrough order and navigation respect plans and selected forms", () => {
  assert.deepEqual(gettingStartedSteps.map((step) => step.label),
    ["Pricing Settings", "Widget Appearance", "Preview Widget", "Get Embed Code", "My Forms", "Quotes", "Analytics"]);
  const analytics = gettingStartedSteps.at(-1);
  assert.equal(guideActionHref(analytics, getEntitlements("STARTER"), "merchant"), "/dashboard/billing");
  for (const plan of ["PRO", "ENTERPRISE"]) {
    assert.equal(guideActionHref(analytics, getEntitlements(plan), "merchant"), "/dashboard/analytics");
  }
  for (const plan of ["STARTER", "PRO"]) {
    assert.equal(getEntitlements(plan)[pageGuides["/dashboard/webhooks"].feature], false);
  }
  assert.equal(getEntitlements("ENTERPRISE")[pageGuides["/dashboard/webhooks"].feature], true);
  assert.equal(guideActionHref(gettingStartedSteps[2], getEntitlements("PRO"), "company /"), "/widget/company%20%2F");
  assert.equal(guideActionHref(gettingStartedSteps[2], getEntitlements("PRO"), "company", "form /"), "/widget/form/form%20%2F");
  assert.equal(guideActionHref(gettingStartedSteps[0], getEntitlements("PRO"), "company", "form /"), "/dashboard/pricing?formId=form%20%2F");
  assert.equal(guideActionHref(gettingStartedSteps[3], getEntitlements("PRO"), "company", "form"), "/dashboard/forms");
});

test("dismissal and completion stay company-scoped, including blocked browser storage", () => {
  const storage = new Map();
  const events = new Map();
  globalThis.window = {
    localStorage: { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) },
    addEventListener: (name, listener) => events.set(name, listener),
    removeEventListener: (name) => events.delete(name),
  };
  try {
    let updates = 0;
    const unsubscribe = subscribeToGuideState(() => updates++);
    saveWalkthroughStatus("a", "dismissed");
    assert.equal(readWalkthroughStatus("a"), "dismissed");
    assert.equal(readWalkthroughStatus("b"), null);
    saveWalkthroughStatus("b", "completed");
    assert.equal(readWalkthroughStatus("b"), "completed");
    assert.equal(storage.get(guideStorageKey("b")), "completed");
    assert.equal(updates, 2);
    unsubscribe();
    assert.equal(events.size, 0);
    storage.set(guideStorageKey("invalid"), "unexpected");
    assert.equal(readWalkthroughStatus("invalid"), null);
    window.localStorage = { getItem() { throw Error("blocked"); }, setItem() { throw Error("blocked"); } };
    assert.doesNotThrow(() => saveWalkthroughStatus("blocked", "dismissed"));
    assert.equal(readWalkthroughStatus("blocked"), "dismissed");
  } finally { delete globalThis.window; }
});
