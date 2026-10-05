# Qalt verification handoff for Claude Code

Prepared for Emmanuel on October 4, 2026, America/Los_Angeles.

## Objective

Audit the Qalt work recorded in QALT_LATEST_STATUS_AND_CODEX_CHANGELOG.md against the newest source and deployed application. Reproduce failures, find the root cause, apply narrow fixes, verify the affected behavior, and save the reconciled current state to Emmanuel's real Obsidian vault.

This is verification and repair. Do not add unrelated features or change pricing.

## Model and effort

Use the Opus option shown in Emmanuel's selector, with High effort for this audit. Use Medium for routine documentation once the technical conclusions are established. Leave Ultracode off unless a specific unresolved problem warrants it. This is a task-specific recommendation, not a claim about every model's capability.

## Token discipline and direct troubleshooting

1. Read applicable AGENTS.md or CLAUDE.md once. Check worktree status, current revision, relevant scripts, and deployed revision before editing.
2. Use one agent by default. Do not start parallel agents unless Emmanuel authorizes them.
3. Build one checklist. Batch independent searches, use rg, read relevant files once, and retain concise evidence.
4. Do not repeatedly scan the repository, reread unchanged files, restate plans, rerun passing checks, or explore unrelated redesigns.
5. Start with the failing flow. Trace input, API, ownership, persisted state, and output. Diagnose the cause before editing. Do not cycle through speculative fixes.
6. Run one baseline verification pass. After a fix, rerun affected checks and required regressions. Broaden only for a new failure, changed dependency, or unresolved concern.
7. Keep logs in files. Report relevant failure excerpts, not full logs, dependency dumps, or environment values.
8. Stop when acceptance criteria pass or a concrete access blocker remains. Do not invent a token cap which prevents finishing a necessary fix.
9. Report the result, root cause, fix, evidence, and remaining blocker directly. No circular explanations or repeated offers to continue.

## Repository and scope

- Repository: Keenwayllc/qalt-quote-widget.
- Canonical production: https://www.qalt.site.
- Known aliases: https://qalt.site and https://quote.gokeenway.com.
- Last production release independently verified by Codex: 47159d928d3a3622a7a29419f838a584a4bd7d3c.
- Deployment: dpl_5sFUkHcQo8Fjwgt2gP1P6Z1nRMMg, READY, canonical alias matched the commit, no alias error.
- Vercel project: prj_nwf5Amew7l9ktOOriOrCPQGVlyVi.
- These handoff documents are on docs/qalt-audit-handoff-2026-10-04. Inspect current main separately. Newer verified changes supersede the snapshot.
- Locate Claude's existing checkout. Do not assume Codex's cloud workspace path exists on Emmanuel's Windows computer.
- Keep the separate Keenway application, driver app, and customer app outside this audit.
- Preserve unrelated work. Do not reset, clean, rewrite history, reformat broadly, or delete notes.
- No outreach, real customer quote submissions, live card charges, or live merchant setting changes as audit side effects. Use fixtures or an explicitly designated test account for writes.
- Never print credentials, tokens, private merchant/customer records, or full environment dumps.

Emmanuel authorized checking and fixing Qalt. Complete routine reversible fixes directly. If a production release is necessary, finish the change and required checks first, publish the tested commit through the established release process, and verify the production alias before claiming it is live.

## Baseline verification

Inspect package.json and use the existing test framework:

    npm test
    npx tsc --noEmit
    npm run test:embed

Generate the Prisma client from the current schema before type checking. The checked-in generated client has lagged behind source changes. Do not mistake stale generated types for the source of truth or commit unrelated generated churn.

Lint files changed during this audit. Run the browser runner in a supported environment with an available Chromium executable. Distinguish test-environment failures from product defects.

The browser runner supports QALT_BROWSER_CHECK_FILTER=favicon for a focused favicon follow-up. Do not repeat the entire browser suite after a fixture-only or narrowly scoped correction when affected checks suffice.

Important: npm run build executes prisma migrate deploy, prisma generate, then next build. Do not run it against production merely to test compilation. Use a disposable database or a separate compile command. A production migration is a deliberate release action.

Fixture browser tests replace Prisma and external provider boundaries. They do not prove every real Google Maps, Census, Stripe, email, or storage configuration works.

## Acceptance checklist

### Merchant favicon

- Pro and Enterprise expose Form Favicon under Widget Appearance. Starter does not gain custom favicon editing.
- Upload, replace, remove, and Save Settings operate on the selected owned form. Uploading alone does not publish settings.
- PNG, JPEG, WebP, GIF, and simple SVG become transparent 256 by 256 PNGs, preserving the whole artwork.
- Verify corrupt input, active SVG, invalid declared MIME, non-square artwork, and files over 5 MB.
- /api/upload authenticates the merchant, derives ownership from the token, enforces the favicon entitlement, and generates the storage path.
- Settings reject foreign icons and foreign forms. A downgraded merchant still saves unrelated appearance changes successfully.
- Verify merchant title and icon on /widget/form/[formId], /widget/[companyId], and the outer /custom-widget/[domain] document.
- Company URLs and branded domains use the same default form. Non-default forms retain separate icons.
- Replacement uses a new URL. Removal restores the Qalt fallback. No competing default icon wins over the merchant icon.
- Embeds leave the parent website's tab icon under the website owner's control.
- Verify mobile layout, keyboard upload access, visible errors, and no hydration or browser errors.

### Backend service area map

- The shaded ZIP map/editor appears only in Widget Appearance, Service Area. Customers enter pickup and delivery addresses without a separate ZIP lookup.
- ZIP additions/removals update actual Census ZCTA outlines in soft red and persist per form.
- Verify mainland ZIPs, leading-zero ZIPs, Hawaii, Alaska, and Alaska date-line areas.
- Preserve polygon holes and islands. Never fabricate shapes for ZIPs without a mapped area.
- Clearly handle timeout, provider failure, missing shapes, empty lists, and missing Maps configuration. Retry works and stale requests do not overwrite newer input.
- /api/zip-areas validates bounded five-digit queries, uses a fixed provider origin, limits response size and request rate, and caches validated results.
- Display geometry remains separate from server-side saved-ZIP enforcement.

### Forms, quotes, comparisons, and embeds

- Copied HTML and preview resolve to the selected owned form at the canonical origin. Verify default, non-default, stale, and foreign forms.
- Appearance, questions, vehicles, ZIPs, service options, pricing, and submission metadata persist per form without changing another form.
- Verify autocomplete, route calculation, form-specific pricing, submission, and receipt inside an actual iframe.
- Server totals remain authoritative. Tampered totals, invalid IDs, foreign forms, and hidden conditional answers cannot change the quote.
- Service comparisons show complete totals and the selected delivery window. Visible handling questions charge once. Hidden questions neither validate nor charge.
- Changing shipment inputs invalidates stale totals. Saved quotes contain only relevant answers and the chosen service/window.
- Results say the quote is ready and distinguish an estimate from a booked or paid delivery. The old promise of a merchant callback stays removed.
- Saved receipts include reference, route, service/window, vehicle, answers, and server-calculated breakdown.
- Success icon and start-new-quote control remain visible in light/dark themes.
- Payment flows use the authoritative total and secure top-level checkout. Verify actual webhook/configuration behavior separately using test-mode resources.
- Delivery Services and pricing cards align at mobile/desktop widths without horizontal overflow.

### Admin, plans, and telemetry

- Verify signup time, last login, demo activity, attribution, detected widget installations, and Pacific date display.
- Installation records update external domain/form counts and timestamps without duplicates.
- Direct visits and dashboard wrappers must not falsely prove installation. Preserve documented builder/preview distinctions.
- Active embed means an external load within the tracked 30-day window. Not detected does not prove absence.
- Assigned Pro/Enterprise tiers are not proof of paid Stripe subscriptions. Verify subscription state separately when reporting revenue.
- Published prices in the Codex snapshot: Pro $39 monthly or $29 monthly equivalent billed annually; Enterprise $99 monthly or $79 monthly equivalent billed annually.
- Starter allowance: one form and 50 monthly quotes. Pro: five forms. Enterprise: unlimited forms. Verify server-side limits.
- Compare published prices, checkout Stripe price amounts, and entitlements. Do not change prices during this audit.

## Inventory and Obsidian updates

Codex had no connected Obsidian tool or confirmed accessible vault path. A saved GitHub document is not a completed Obsidian write.

1. Locate the real vault through existing Obsidian integration/configuration or Emmanuel's confirmed local path. Do not invent a vault.
2. Locate existing Qalt notes. Preserve titles, frontmatter, links, and history. Update authoritative notes rather than creating competing latest-state copies.
3. Reconcile the companion Codex changelog with current source, newer releases, and actual audit findings.
4. Maintain one Qalt current-state note, feature/plan inventory, dated changelog, and audit result. Create missing notes inside the confirmed vault's appropriate Qalt folder.
5. Inspect broader Qalt areas: account/onboarding/password recovery, forms/templates, analytics, abandoned quote recovery, contact settings, documents/invoices, webhooks, billing, Field Operations, admin, help, and marketing.
6. Do not infer complete working functionality from a menu label. Keep implemented, verified, blocked, and planned items separate. Features marked Soon remain planned until working code and evidence establish delivery.
7. Record exact release commits, deployments, URLs, plan gates, migrations, test commands/results, limitations, and unresolved findings.
8. Verify saved note files once and report exact vault paths. If access fails, preserve import-ready Markdown and report the concrete missing connection/path. Never claim the vault was updated without a successful write.

## Final report

Keep it short:

- Verified, fixed and verified, or blocked.
- Each material defect's trigger, root cause, narrow fix, and affected file.
- Checks actually run and pass/fail results.
- Tested commit and confirmed production deployment/alias if released.
- Exact Obsidian paths updated, or the access blocker and import-ready files.
- Only concrete unresolved findings. Do not claim everything works beyond tested scope.
