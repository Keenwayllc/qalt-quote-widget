import assert from "node:assert/strict";
import test from "node:test";
import { pricingProfileForForm } from "../src/lib/widget-pricing.ts";

test("company widget uses the displayed form's service pricing", () => {
  const profiles = [
    { widgetSettingsId: null, serviceOptions: [{ name: "Default" }] },
    { widgetSettingsId: "form-a", serviceOptions: [{ name: "Rush" }] },
    { widgetSettingsId: "form-b", serviceOptions: [{ name: "Medical" }] },
  ];
  assert.equal(pricingProfileForForm(profiles, "form-a")?.serviceOptions[0].name, "Rush");
  assert.equal(pricingProfileForForm(profiles, "form-b")?.serviceOptions[0].name, "Medical");
  assert.equal(pricingProfileForForm(profiles, "legacy-form")?.serviceOptions[0].name, "Default");
});
