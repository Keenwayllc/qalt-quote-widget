# Third Configurable Flat-Fee Add-on (Add-on 3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a universal third merchant-configurable flat-fee add-on ("Add-on 3"), cloned end-to-end from the existing Inside Delivery add-on, plus fix the shared quote-detail badge bug.

**Architecture:** Mirror the Inside Delivery / Stairs pattern across schema → calculator → estimate API → submit/webhook → dashboard Pricing & Appearance UIs → public widget → quote-detail view. New generic fields `addon3Fee` (PricingProfile), `addon3Label` (WidgetSettings), `needsAddon3` (extras/selectedExtras). Widget shows the checkbox only when `addon3Label` is set AND `addon3Fee > 0`, which requires exposing the fee to the widget config.

**Tech Stack:** Next.js 16, TypeScript, Prisma 7 → Supabase Postgres (ref `sxuphhdtgqzeacybdosn`), Vercel.

## Global Constraints

- Existing merchants must be unaffected: defaults `addon3Fee = 0`, `addon3Label = ""` → add-on hidden until configured.
- Migration must be **purely additive** (`ADD COLUMN … DEFAULT …` only). Apply to prod via `supabase db execute`, never `prisma migrate deploy`. (CLAUDE.md rule.)
- No fee ranges, no per-item logic, no auto-calc, no conditional rules. Single flat value toggled by a checkbox.
- Naming is generic: `addon3Fee`, `addon3Label`, `needsAddon3`.
- No em/en dashes in any customer-facing copy (use plain hyphens).
- Design: dark-first, brand accent `#dc2626` for primary actions, dense operator-grade. Use existing component patterns; do not restyle neighbors.
- Verification per task: `npx tsc --noEmit` must pass and `npm run lint` must not add new errors. No test runner exists; do not add one.

---

### Task 1: Schema + additive migration

**Files:**
- Modify: `prisma/schema.prisma` (PricingProfile ~line 60, WidgetSettings ~line 80)
- Create: `prisma/migrations/<timestamp>_add_addon3/migration.sql` (generated)

**Interfaces:**
- Produces: `PricingProfile.addon3Fee: Float` (default 0), `WidgetSettings.addon3Label: String` (default "").

- [ ] **Step 1: Add the PricingProfile field**

In `prisma/schema.prisma`, in `model PricingProfile`, directly after the `insideDeliveryFee` line, add:

```prisma
  addon3Fee         Float           @default(0)
```

- [ ] **Step 2: Add the WidgetSettings field**

In `model WidgetSettings`, directly after the `insideDeliveryLabel` line, add:

```prisma
  addon3Label        String         @default("")
```

- [ ] **Step 3: Generate the migration**

Run: `npx prisma migrate dev --name add_addon3`
Expected: a new folder `prisma/migrations/<timestamp>_add_addon3/` with `migration.sql`, and the local dev DB updated. Prisma Client regenerates.

- [ ] **Step 4: Review the generated SQL is additive-only**

Open the generated `migration.sql`. Confirm it contains ONLY two statements of the form:

```sql
ALTER TABLE "PricingProfile" ADD COLUMN "addon3Fee" DOUBLE PRECISION NOT NULL DEFAULT 0;
ALTER TABLE "WidgetSettings" ADD COLUMN "addon3Label" TEXT NOT NULL DEFAULT '';
```

If it contains any `DROP`, `ALTER COLUMN`, or rewrite of other columns, STOP and reconcile drift (do not proceed).

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS (Prisma types now include the new fields).

- [ ] **Step 6: Commit**

```bash
git add prisma/schema.prisma prisma/migrations
git commit -m "feat: add addon3Fee + addon3Label schema fields (additive)"
```

---

### Task 2: Calculator — charge the add-on when selected

**Files:**
- Modify: `src/lib/calculator.ts` (`rules` type ~line 78, `extras` type ~line 89, calc body ~line 122)

**Interfaces:**
- Consumes: `PricingProfile.addon3Fee` (Task 1).
- Produces: `estimatePrice` now honors `extras.needsAddon3` by adding `rules.addon3Fee`.

- [ ] **Step 1: Add `addon3Fee` to the rules type**

In the `rules` parameter type, directly after `insideDeliveryFee: number;`, add:

```typescript
    addon3Fee: number;
```

- [ ] **Step 2: Add `needsAddon3` to the extras type**

In the `extras` parameter type, directly after `needsInsideDelivery: boolean;`, add:

```typescript
    needsAddon3: boolean;
```

- [ ] **Step 3: Add the charge line**

Directly after the line `if (extras.needsInsideDelivery) total += rules.insideDeliveryFee;`, add:

```typescript
  if (extras.needsAddon3) total += rules.addon3Fee;
```

- [ ] **Step 4: Runtime math check (throwaway script, matches project's prior pattern)**

Create `check-addon3.mjs` at repo root:

```javascript
import { estimatePrice } from './src/lib/calculator.ts';
```

If a direct TS import is not runnable, instead verify by reasoning + tsc only (skip the script). Preferred quick check: run `npx tsc --noEmit` and confirm no type error, then delete `check-addon3.mjs` if created.

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS. (Every call site that builds a `rules` object literal now requires `addon3Fee`; if any fails to compile, note the file — it is handled in Task 3, so a transient error here is expected only if a call site passes a literal. The DB-sourced pricingProfile satisfies the type automatically.)

- [ ] **Step 6: Commit**

```bash
git add src/lib/calculator.ts
git commit -m "feat: calculator charges addon3Fee when needsAddon3 is set"
```

---

### Task 3: Estimate API — type + pass-through

**Files:**
- Modify: `src/app/api/widget/[companyId]/estimate/route.ts` (`PricingProfileShape` ~line 16)

**Interfaces:**
- Consumes: calculator `rules.addon3Fee` (Task 2).
- Produces: estimate endpoint forwards `extras.needsAddon3` (already generic) with `addon3Fee` typed on the profile.

- [ ] **Step 1: Add `addon3Fee` to `PricingProfileShape`**

Directly after `insideDeliveryFee: number;` in the `PricingProfileShape` type, add:

```typescript
  addon3Fee: number;
```

- [ ] **Step 2: Confirm extras pass-through**

Confirm the route calls `estimatePrice(distance, pricingProfile, extras)` with `extras` taken from the request body unchanged. No further change needed — `needsAddon3` flows through. If the route destructures/whitelists specific extras keys, add `needsAddon3` to that whitelist.

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add "src/app/api/widget/[companyId]/estimate/route.ts"
git commit -m "feat: estimate API types addon3Fee on pricing profile"
```

---

### Task 4: Submit/save — record selection on quote + webhook

**Files:**
- Modify: `src/app/api/widget/[companyId]/submit/route.tsx` (`selectedExtras` object ~line 102-107)

**Interfaces:**
- Produces: saved `QuoteRequest.selectedExtras` JSON now includes `needsAddon3`; webhook payload (whole `quote`) carries it.

- [ ] **Step 1: Add `needsAddon3` to the persisted extras**

In the `selectedExtras: JSON.stringify({ … })` object, directly after `needsInsideDelivery: data.needsInsideDelivery,`, add:

```typescript
          needsAddon3: data.needsAddon3,
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add "src/app/api/widget/[companyId]/submit/route.tsx"
git commit -m "feat: persist needsAddon3 on saved quote (feeds webhook)"
```

---

### Task 5: Pricing Settings UI — Add-on 3 Fee input

**Files:**
- Modify: `src/components/dashboard/PricingForm.tsx` (type ~line 18, state ~line 179, PATCH payload ~line 477, "Optional Flat Fees" card ~line 508-521)
- Modify: `src/app/api/dashboard/pricing/route.ts` (PATCH/POST field handling ~line 128-129)

**Interfaces:**
- Consumes: `PricingProfile.addon3Fee` (Task 1).
- Produces: merchants can set and persist `addon3Fee`.

- [ ] **Step 1: Add `addon3Fee` to the local `PricingProfile` type in the component**

Find the type/interface listing `insideDeliveryFee` and add `addon3Fee: number;` beside it.

- [ ] **Step 2: Add state**

Mirror `insideDeliveryFee` state. After its `useState` declaration, add:

```typescript
  const [addon3Fee, setAddon3Fee] = useState(String(initialData?.addon3Fee ?? 0));
```

(Match the exact init expression the neighboring fees use — copy their pattern verbatim.)

- [ ] **Step 3: Add the input in the "Optional Flat Fees" card**

Directly after the Inside Delivery Fee input block, add a matching block:

```tsx
<div>
  <label className="...same classes as neighbor...">Add-on 3 Fee (Flat $)</label>
  <input
    type="number"
    min="0"
    step="0.01"
    value={addon3Fee}
    onChange={(e) => setAddon3Fee(e.target.value)}
    className="...same classes as neighbor..."
  />
  <p className="...same helper classes...">Optional extra (e.g. Helper Fee, Assembly, White Glove). Name it on the Widget Appearance page. Leave at 0 to hide it.</p>
</div>
```

Copy the exact wrapper/label/input/helper classNames from the Inside Delivery Fee block so styling matches.

- [ ] **Step 4: Include in the PATCH payload**

In the flat-fees save handler, in the object passed to `patchPricing(...)`, after `insideDeliveryFee: parseFloat(insideDeliveryFee) || 0,` add:

```typescript
        addon3Fee: parseFloat(addon3Fee) || 0,
```

- [ ] **Step 5: Ensure the API route persists it**

Open `src/app/api/dashboard/pricing/route.ts`. In the PATCH handler where `insideDeliveryFee` is read/defaulted, add parallel handling:

```typescript
        addon3Fee: typeof body.addon3Fee === "number" ? body.addon3Fee : undefined,
```

Match the exact idiom the route already uses for `insideDeliveryFee` (the neighbor is the source of truth for shape). Do the same in the POST handler if it enumerates fields. Confirm GET returns `addon3Fee` (it will if it returns the whole profile).

- [ ] **Step 6: Typecheck + lint**

Run: `npx tsc --noEmit` then `npm run lint`
Expected: PASS / no new errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/dashboard/PricingForm.tsx "src/app/api/dashboard/pricing/route.ts"
git commit -m "feat: Add-on 3 Fee input on Pricing Settings"
```

---

### Task 6: Widget Appearance UI — Add-on 3 Label

**Files:**
- Modify: `src/components/dashboard/WidgetForm.tsx` (state ~line 79, label input ~line 422-436)
- Modify: `src/app/api/dashboard/widget/route.ts` (POST field handling ~line 79)

**Interfaces:**
- Consumes: `WidgetSettings.addon3Label` (Task 1).
- Produces: merchants can set/persist `addon3Label`; it flows into `previewData` and the widget config.

- [ ] **Step 1: Add to component state init**

In the `previewData` init (where `insideDeliveryLabel: initialData.insideDeliveryLabel || "Inside Delivery"` is set), add:

```typescript
      addon3Label: initialData.addon3Label || "",
```

- [ ] **Step 2: Add the label input**

Directly after the Inside Delivery label control block, add a matching block:

```tsx
<div>
  <label htmlFor="addon3Label" className="...same classes...">Add-on 3 Label</label>
  <input
    id="addon3Label"
    name="addon3Label"
    type="text"
    placeholder="e.g. Helper Fee"
    value={previewData.addon3Label}
    onChange={handleChange}
    className="...same classes..."
  />
  <p className="...same helper classes...">Name a third add-on (e.g. "Helper Fee", "Assembly", "White Glove"). Charges the Add-on 3 fee from Pricing. Leave blank (or fee 0) to hide it.</p>
</div>
```

Copy classNames from the Inside Delivery label block verbatim.

- [ ] **Step 3: Persist in the widget POST route**

In `src/app/api/dashboard/widget/route.ts`, where `insideDeliveryLabel` is read (`data.insideDeliveryLabel ? String(...).trim() : "Inside Delivery"`), add parallel handling in the upsert data:

```typescript
      addon3Label: data.addon3Label ? String(data.addon3Label).trim() : "",
```

Apply in both create and update paths of the upsert, mirroring `insideDeliveryLabel`. Confirm GET returns `addon3Label`.

- [ ] **Step 4: Typecheck + lint**

Run: `npx tsc --noEmit` then `npm run lint`
Expected: PASS / no new errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/dashboard/WidgetForm.tsx "src/app/api/dashboard/widget/route.ts"
git commit -m "feat: Add-on 3 Label field on Widget Appearance"
```

---

### Task 7: Public widget — render the Add-on 3 checkbox

**Files:**
- Modify: server source that assembles `widgetSettings` for the public widget (trace from `QuoteWidgetForm` usage — the page/route that selects WidgetSettings fields and, per this task, must also project `addon3Fee` from the pricing profile).
- Modify: `src/components/widget/QuoteWidgetForm.tsx` (formData init ~line 266-284, add-ons array ~line 676, estimate `extras` ~line 342-406, submit `extras` ~line 408-449, Step-2 summary ~line 1091-1109)

**Interfaces:**
- Consumes: `widgetSettings.addon3Label` (Task 6) and `widgetSettings.addon3Fee` (this task's server projection).
- Produces: a rendered "Add-on 3" checkbox visible only when label set AND fee > 0; selection sent to estimate + submit as `needsAddon3`.

- [ ] **Step 1: Expose `addon3Fee` to the widget**

Find where the public widget's `widgetSettings` object is built (the server component/route that queries `prisma.widgetSettings` + its `pricingProfile` and passes props to `QuoteWidgetForm`). Add `addon3Fee` (from the associated `pricingProfile`) onto the object the widget receives. Add `addon3Fee: number` and `addon3Label: string` to the `widgetSettings` prop type in `QuoteWidgetForm.tsx`.

- [ ] **Step 2: Add `needsAddon3` to formData init**

In the `FormData` interface add `needsAddon3: boolean;` (after `needsInsideDelivery`). In the initial `formData` state add `needsAddon3: false,`.

- [ ] **Step 3: Render the checkbox conditionally**

Replace the hardcoded add-ons id array with a computed one so Add-on 3 only appears when configured:

```tsx
{widgetSettings.showExtras && (() => {
  const addonIds: Array<'hasStairs' | 'needsInsideDelivery' | 'needsAddon3'> = ['hasStairs', 'needsInsideDelivery'];
  if (widgetSettings.addon3Label && widgetSettings.addon3Fee > 0) addonIds.push('needsAddon3');
  const config: Record<string, { label: string; icon: React.ReactNode }> = {
    hasStairs: { label: 'Stairs', icon: <Footprints size={15} /> },
    needsInsideDelivery: { label: widgetSettings.insideDeliveryLabel || 'Inside Delivery', icon: <Home size={15} /> },
    needsAddon3: { label: widgetSettings.addon3Label, icon: <Sparkles size={15} /> },
  };
  return ( /* existing grid, mapping over addonIds using config[id] */ );
})()}
```

Keep the existing label/checkbox JSX; only the id list and config map change. Import `Sparkles` from `lucide-react`.

- [ ] **Step 4: Send in estimate request**

In `getEstimate()`'s `extras` object, after `needsInsideDelivery: formData.needsInsideDelivery,` add:

```typescript
        needsAddon3: formData.needsAddon3,
```

- [ ] **Step 5: Send in submit payload**

In `submitQuote()`'s payload, add `needsAddon3: formData.needsAddon3,` alongside the other extras fields.

- [ ] **Step 6: Step-2 summary badge**

Where the summary shows the Inside Delivery badge (`widgetSettings.insideDeliveryLabel`), add a parallel badge shown when `formData.needsAddon3`, displaying `widgetSettings.addon3Label`.

- [ ] **Step 7: Typecheck + lint**

Run: `npx tsc --noEmit` then `npm run lint`
Expected: PASS / no new errors.

- [ ] **Step 8: Commit**

```bash
git add src/components/widget/QuoteWidgetForm.tsx <widget-server-file>
git commit -m "feat: render Add-on 3 checkbox in widget when configured"
```

---

### Task 8: Quote-detail badge fix (shared)

**Files:**
- Modify: `src/app/dashboard/quotes/QuotesClient.tsx` (extras parse ~line 88-90, badge render ~line 192-201, `Quote`/props types ~line 13-33)
- Modify: `src/app/dashboard/quotes/page.tsx` (data fetch ~line 8-11)

**Interfaces:**
- Consumes: `QuoteRequest.selectedExtras` object shape `{ hasStairs, needsInsideDelivery, needsAddon3, stairsFlights?, selectedLargeItems }`, and the company's primary `WidgetSettings` labels.
- Produces: quote-detail "Extras" section renders human-readable badges for Stairs, Inside Delivery, and Add-on 3 (fixes the pre-existing object-vs-array no-op).

- [ ] **Step 1: Pass widget labels into the client**

In `page.tsx`, fetch the company's primary widget settings labels and pass them to `QuotesClient`:

```typescript
const widget = await prisma.widgetSettings.findFirst({
  where: { companyId: company.id },
  select: { insideDeliveryLabel: true, addon3Label: true },
});
// pass insideDeliveryLabel={widget?.insideDeliveryLabel ?? "Inside Delivery"}
//      addon3Label={widget?.addon3Label ?? ""} to <QuotesClient/>
```

Add these two props to `QuotesClient`'s props type and thread them to the `QuoteDrawer`.

- [ ] **Step 2: Fix the parse + build a labels array**

Replace the broken `const extras = quote.selectedExtras ? (JSON.parse(...) as string[]) : [];` with:

```typescript
const parsed = quote.selectedExtras
  ? (JSON.parse(quote.selectedExtras) as {
      hasStairs?: boolean;
      needsInsideDelivery?: boolean;
      needsAddon3?: boolean;
      stairsFlights?: number;
      selectedLargeItems?: string[];
    })
  : {};
const extras: string[] = [
  ...(parsed.hasStairs ? [parsed.stairsFlights && parsed.stairsFlights > 1 ? `Stairs x${parsed.stairsFlights}` : "Stairs"] : []),
  ...(parsed.needsInsideDelivery ? [insideDeliveryLabel] : []),
  ...(parsed.needsAddon3 && addon3Label ? [addon3Label] : []),
  ...((parsed.selectedLargeItems ?? [])),
];
```

The existing `extras.length > 0` guard and `extras.map((e) => <span key={e}>{e}</span>)` render block now work unchanged.

- [ ] **Step 3: Typecheck + lint**

Run: `npx tsc --noEmit` then `npm run lint`
Expected: PASS / no new errors.

- [ ] **Step 4: Commit**

```bash
git add "src/app/dashboard/quotes/QuotesClient.tsx" "src/app/dashboard/quotes/page.tsx"
git commit -m "fix: render human-readable add-on badges on quote detail"
```

---

### Task 9: Full local verification, prod migration, deploy

**Files:** none (operational)

- [ ] **Step 1: Build**

Run: `npm run build`
Expected: PASS (`prisma generate && next build`).

- [ ] **Step 2: Manual test plan (local `npm run dev`)**

Run through spec test plan for a test merchant:
1. Pricing Settings: Add-on 3 Fee input appears, saves.
2. Widget Appearance: Add-on 3 Label appears, saves; set "Helper Fee".
3. Fee `45` → widget preview shows "Helper Fee" checkbox.
4. Checked → total +$45. Unchecked → no change.
5. Saved quote `selectedExtras` + webhook payload contain `needsAddon3: true`.
6. Fee `0` alone hides it; blank label alone hides it.
7. Pre-existing merchant unaffected (add-on off, empty label).
8. Quote detail shows badges for Stairs, Inside Delivery, Add-on 3.

- [ ] **Step 3: Apply the additive migration to prod**

Run: `supabase db execute --file prisma/migrations/<timestamp>_add_addon3/migration.sql`
(Target project ref `sxuphhdtgqzeacybdosn`.) Confirm success; re-run is safe only if using `IF NOT EXISTS` — otherwise verify columns absent first via `list_tables`.

- [ ] **Step 4: Deploy**

Merge to `main` (or push) so Vercel builds and deploys. Since the prod columns now exist, the new build reads/writes them cleanly.

- [ ] **Step 5: Prod smoke check**

On the live site, load a merchant with Add-on 3 unset → confirm no visible change. Configure Add-on 3 on a test/Pittman-style account → confirm checkbox + $ behavior + saved quote.

---

## Self-Review

- **Spec coverage:** Pricing input (T5), label rename (T6), widget checkbox + hide rule (T7), quote calc (T2), selectedExtras + webhook (T4), data model + backfill (T1), parity/badges (T8), deploy safety (T9). All spec sections mapped.
- **Placeholders:** Class names are intentionally "copy from neighbor" because exact Tailwind strings must match the adjacent field; the widget server file is identified by trace instruction, not left as TBD. No TODO/TBD logic gaps.
- **Type consistency:** `addon3Fee` (number), `addon3Label` (string), `needsAddon3` (boolean) used identically across Tasks 1-8. `selectedExtras` object shape in T4 (write) matches T8 (read).
