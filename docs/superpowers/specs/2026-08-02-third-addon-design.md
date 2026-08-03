# Qalt — Third Configurable Flat-Fee Add-on (Add-on 3)

**Date:** 2026-08-02
**Type:** Feature (clone of the existing Inside Delivery add-on)
**Scope:** Universal for all merchant accounts. Not tied to any single customer.
**Priority:** This week. Not a blocker for sales outreach.

---

## Objective

Add a third merchant-configurable flat-fee add-on to the pricing engine and widget, cloned end-to-end from the existing **Inside Delivery** add-on. A merchant sets a flat fee and a custom customer-facing label; the widget renders a checkbox; checking it adds the flat fee to the quote. Single flat value, toggled by a checkbox. No ranges, no per-item logic, no conditional rules.

Existing merchants must be completely unaffected after deploy: the add-on defaults to off (fee `0`, empty label) and stays hidden until a merchant configures it.

---

## Decisions (locked)

1. **Naming:** generic — `addon3Fee` (PricingProfile), `addon3Label` (WidgetSettings), `needsAddon3` (extras / selectedExtras key). Neutral because the merchant names it whatever they want ("Helper Fee", "Assembly", "White Glove").
2. **Visibility rule:** the widget shows the Add-on 3 checkbox **only when `addon3Label` is non-empty AND `addon3Fee > 0`.** This requires exposing `addon3Fee` to the widget client (it currently only receives labels). This is stricter than the current Inside Delivery behavior, and is what the acceptance criteria (#5/#6) actually require.
3. **Quote-detail badge bug:** fix the shared pre-existing bug so Stairs, Inside Delivery, and Add-on 3 all render human-readable badges on the quote detail view.

---

## Reference implementation

Inside Delivery / Stairs are the template. Verified current touchpoints:

- Schema: `PricingProfile.insideDeliveryFee` / `stairsFee`; `WidgetSettings.insideDeliveryLabel`; `QuoteRequest.selectedExtras` (JSON string).
- Calculator: `src/lib/calculator.ts` — `rules.insideDeliveryFee`, `extras.needsInsideDelivery`, `if (extras.needsInsideDelivery) total += rules.insideDeliveryFee`.
- Estimate API: `src/app/api/widget/[companyId]/estimate/route.ts` — `PricingProfileShape` type; `extras` passes straight through to the calculator.
- Submit/save: `src/app/api/widget/[companyId]/submit/route.tsx` — `selectedExtras: JSON.stringify({ hasStairs, needsInsideDelivery, pickupDateTime, selectedLargeItems })`. Webhook fires the whole `quote` object via `fireWebhooks(companyId, "quote.created", { quote })`.
- Pricing Settings UI: `src/components/dashboard/PricingForm.tsx` — "Optional Flat Fees" card; PATCH `/api/dashboard/pricing`.
- Widget Appearance UI: `src/components/dashboard/WidgetForm.tsx` — "Inside Delivery Add-on Label" field; POST `/api/dashboard/widget`.
- Widget render: `src/components/widget/QuoteWidgetForm.tsx` — add-ons array `['hasStairs', 'needsInsideDelivery']` gated by `widgetSettings.showExtras`.
- Quote detail: `src/app/dashboard/quotes/QuotesClient.tsx` — parses `selectedExtras`.

---

## Change map (8 + 1 touchpoints)

### 1. Prisma schema — `prisma/schema.prisma`
- `PricingProfile`: add `addon3Fee Float @default(0)` (next to `insideDeliveryFee`).
- `WidgetSettings`: add `addon3Label String @default("")` (next to `insideDeliveryLabel`). **Default is empty string** (Inside Delivery defaults to `"Inside Delivery"`, which is why it always shows; empty keeps Add-on 3 hidden by default).

### 2. Migration — `prisma/migrations/<timestamp>_add_addon3/migration.sql`
- Generate locally with `npx prisma migrate dev --name add_addon3`.
- Must be **purely additive**: two `ALTER TABLE … ADD COLUMN … DEFAULT …` statements. Postgres backfills existing rows via the column defaults, so every existing merchant gets `addon3Fee = 0` / `addon3Label = ''` automatically.
- Review the generated SQL — confirm only `ADD COLUMN`, no drops/rewrites.
- Apply to prod manually per CLAUDE.md: `supabase db execute --file prisma/migrations/<ts>_add_addon3/migration.sql`. **Do not** run `prisma migrate deploy` against prod.

### 3. Calculator — `src/lib/calculator.ts`
- Add `addon3Fee: number` to the `rules` type.
- Add `needsAddon3: boolean` to the `extras` type.
- Add `if (extras.needsAddon3) total += rules.addon3Fee;` right after the Inside Delivery line.

### 4. Estimate API — `src/app/api/widget/[companyId]/estimate/route.ts`
- Add `addon3Fee: number` to `PricingProfileShape`. `extras` already passes through untouched, so `needsAddon3` flows to the calculator with no further change. The fetched `pricingProfile` includes `addon3Fee` automatically once it's in the schema.

### 5. Submit / save + webhook — `src/app/api/widget/[companyId]/submit/route.tsx`
- Add `needsAddon3: data.needsAddon3` to the `selectedExtras` object. The webhook sends the whole `quote`, so the payload gets it for free. Satisfies acceptance criterion #4.

### 6. Pricing Settings — `src/components/dashboard/PricingForm.tsx`
- Add `addon3Fee` string state (mirror `insideDeliveryFee`).
- Add an input in the "Optional Flat Fees" card: label **"Add-on 3 Fee (Flat $)"**, same validation, default `0`.
- Include `addon3Fee: parseFloat(addon3Fee) || 0` in the PATCH payload to `/api/dashboard/pricing`. Confirm `/api/dashboard/pricing` (GET/PATCH/POST) passes the field through (it maps pricing fields generically; add explicit handling if the route enumerates fields).

### 7. Widget Appearance — `src/components/dashboard/WidgetForm.tsx`
- Add `addon3Label` to `previewData` state (init from `initialData.addon3Label || ""`).
- Add a text input mirroring the Inside Delivery label control: label **"Add-on 3 Label"**, placeholder e.g. "Helper Fee", helper text explaining it charges the Add-on 3 fee and that leaving it blank (or fee `0`) hides the add-on.
- Ensure it is included in the POST to `/api/dashboard/widget`; add explicit handling in that route mirroring `insideDeliveryLabel` (trim; default `""`).

### 8. Widget render — `src/components/widget/QuoteWidgetForm.tsx`
- The `widgetSettings` object passed to the widget must now carry `addon3Label` **and** `addon3Fee`. Trace where `widgetSettings` is assembled server-side for the public widget and add `addon3Fee` to that projection (the widget currently receives labels but not fees — this is the plumbing the strict hide rule needs).
- Build the add-ons list dynamically instead of the hardcoded `['hasStairs', 'needsInsideDelivery']`: append `'needsAddon3'` **only when** `widgetSettings.addon3Label && widgetSettings.addon3Fee > 0`.
- Add `needsAddon3: false` to `formData` initial state; add its `config` entry `{ label: widgetSettings.addon3Label, icon: <…> }` (reuse an appropriate lucide icon, e.g. `Sparkles` or `Plus`).
- Include `needsAddon3: formData.needsAddon3` in both the estimate request `extras` and the submit payload.
- Mirror the Step-2 summary badge (where Inside Delivery shows `widgetSettings.insideDeliveryLabel`).

### 9. Quote-detail badge fix — `src/app/dashboard/quotes/QuotesClient.tsx` (+ `page.tsx`)
- Current bug: `selectedExtras` is an **object** but is parsed `as string[]` and `.map`ped, so **no add-on badges render today** (Stairs or Inside Delivery).
- Fix: parse `selectedExtras` as the object it is, then derive a `string[]` of human labels:
  - `hasStairs` → `"Stairs"` (append `×N` if a flights count is present).
  - `needsInsideDelivery` → the merchant's `insideDeliveryLabel` (fallback `"Inside Delivery"`).
  - `needsAddon3` → the merchant's `addon3Label` (fallback `"Add-on 3"`).
  - `selectedLargeItems` → keep existing behavior.
- To resolve the custom labels, `src/app/dashboard/quotes/page.tsx` passes the company's primary `WidgetSettings` (`insideDeliveryLabel`, `addon3Label`) into `QuotesClient`. Accepted limitation: multi-form merchants use the primary form's labels for badge display. This fixes historical quotes too.

---

## Data flow (after change)

Merchant sets `addon3Fee = 45`, `addon3Label = "Helper Fee"` → widget config carries both → widget shows "Helper Fee" checkbox (because fee > 0 and label set) → customer checks it → estimate request `extras.needsAddon3 = true` → calculator adds `addon3Fee` → on submit, `selectedExtras.needsAddon3 = true` saved on the quote → webhook payload includes it → quote detail shows a "Helper Fee" badge.

Merchant leaves defaults (`0` / `""`) → widget omits the checkbox → nothing added → no badge → dashboard unchanged.

---

## Out of scope

- No fee ranges (no min/max).
- No per-item logic.
- No auto-calculation from distance, weight, or difficulty.
- No conditional rules.
- Analytics per-add-on breakdown and Ops Console job view are **not** currently implemented for Inside Delivery either, so Add-on 3 does not add them (true parity). If desired later, it's a separate task covering all three add-ons.

---

## Acceptance criteria

1. Merchant sets Add-on 3 to `$45`, labels it "Helper Fee", saves — both persist.
2. Widget displays a "Helper Fee" checkbox.
3. Checking it adds exactly $45 to the quote; unchecking adds nothing.
4. Selection appears on the saved quote (`selectedExtras`) and in the webhook payload.
5. Merchant leaving Add-on 3 at `0` with no label sees no change anywhere.
6. All existing merchants unaffected after deploy (fee `0`, empty label by default).
7. (Badge fix) Quote detail shows human-readable badges for Stairs, Inside Delivery, and Add-on 3.

---

## Test plan (local)

1. Pricing Settings for a test merchant: new **Add-on 3 Fee** input appears under Optional Flat Fees and saves.
2. Widget Appearance: new **Add-on 3 Label** field appears and saves; set "Helper Fee".
3. Set fee `45`; open widget preview → "Helper Fee" checkbox renders.
4. Quote with box checked → total +$45.
5. Quote with box unchecked → no change.
6. Inspect saved quote record + webhook payload → `needsAddon3: true` captured, matching Inside Delivery.
7. Set fee back to `0` and clear label → checkbox disappears (verify each condition independently: fee `0` alone hides; blank label alone hides).
8. Load a pre-existing merchant → nothing broke; add-on off, label empty.
9. Quote detail badges render for all three add-ons (badge fix).

---

## Deploy safety

- Build is `prisma generate && next build` — migrations are **not** auto-applied on Vercel. Prod schema change is applied manually and additively via `supabase db execute` before/with the deploy.
- Column defaults (`0` / `""`) are the backfill. Verify the additive migration SQL before merging.
- Prod Supabase ref: `sxuphhdtgqzeacybdosn` (in-bounds to edit). Keenway DB is unrelated and off-limits.
