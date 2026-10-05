---
title: Qalt latest status and Codex changelog
updated_local_date: 2026-10-04
timezone: America/Los_Angeles
project: Qalt Systems
repository: Keenwayllc/qalt-quote-widget
last_verified_production_commit: 47159d928d3a3622a7a29419f838a584a4bd7d3c
obsidian_status: prepared_for_import_no_confirmed_vault_write
---

# Qalt latest status and Codex changelog

This records Codex's completed work and verification in Emmanuel's current Qalt session. It is an import-ready baseline for the real Obsidian vault.

Codex did not have a connected Obsidian tool or a confirmed accessible vault path. Saving this file in GitHub does not constitute an Obsidian write. Claude should reconcile this note with current main and newer verified releases before updating the vault.

## Last production release independently verified by Codex

| Item | Evidence |
| --- | --- |
| Repository | Keenwayllc/qalt-quote-widget |
| Production commit | 47159d928d3a3622a7a29419f838a584a4bd7d3c |
| Commit title | Add merchant favicons to hosted quote forms |
| Tested source tree | 3d21c207e6d493934ed61f51485e196a7b2a6214 |
| Deployment | dpl_5sFUkHcQo8Fjwgt2gP1P6Z1nRMMg |
| State | READY, canonical alias matched the commit, no alias error |
| Canonical URL | https://www.qalt.site |
| Other known aliases | https://qalt.site and https://quote.gokeenway.com |
| Vercel project | prj_nwf5Amew7l9ktOOriOrCPQGVlyVi |

The document branch is docs/qalt-audit-handoff-2026-10-04. Documentation commits on this branch are not product-release commits.

## Published plans at the last pricing check

| Capability | Starter | Pro | Enterprise |
| --- | --- | --- | --- |
| Monthly price | Free | $39 | $99 |
| Annual equivalent | Free | $29/month, billed $348 annually | $79/month, billed $948 annually |
| Monthly quotes | 50 | Unlimited | Unlimited |
| Forms | 1 | 5 | Unlimited |
| Custom branding/favicon editing | No | Yes | Yes |
| Analytics entitlement | No | Yes | Yes |
| Widget payment entitlement | No | No | Yes |
| Vehicle quoting entitlement | No | No | Yes |
| Custom CSS and advanced webhooks | No | No | Yes |
| Support tier in source | Email | Priority | Dedicated |

Entitlement source: src/lib/plans.ts. Price sources: src/app/pricing/page.tsx and public landing/pricing surfaces. Earlier conversation memories of $19/$39 and 25 free quotes are stale for this snapshot. Emmanuel chose to leave current pricing unchanged.

Published prices do not independently prove every live Stripe price object, existing billing agreement, or checkout amount matches. An assigned paid tier in Admin does not prove a merchant is paying.

## Completed Codex work

### Merchant favicon, latest release

- Widget Appearance includes Form Favicon, preview thumbnail, upload/replace, remove, and Save Settings.
- Pro and Enterprise allow custom favicon uploads/edits. Starter retains the paid-feature editing restriction.
- Each form saves its own nullable faviconUrl.
- Hosted form pages show the merchant/form name in the tab title and the saved icon. Removing the icon restores the Qalt icon.
- Company URLs and the outer branded-domain page use the same default form. Non-default hosted forms retain separate icons.
- Embedded forms leave the parent website's favicon under the website owner's control.
- PNG, JPEG, WebP, GIF, and simple SVG uploads, up to 5 MB, become transparent 256 by 256 PNGs preserving the full artwork.
- Authentication, paid upload entitlement, SVG safety, decoding limits, tenant ownership, and server-generated storage paths apply.
- Unique immutable URLs avoid stale browser icons after replacement.
- Settings payloads omit favicon edits for merchants without the entitlement, preserving unrelated settings saves after downgrade.
- Migration 20261005043000_widget_favicon adds the field. Production build logs confirmed successful application.

Relevant files:

    prisma/schema.prisma
    prisma/migrations/20261005043000_widget_favicon/migration.sql
    src/lib/widget-favicon.ts
    src/lib/favicon-image.ts
    src/lib/publicWidget.ts
    src/app/api/upload/route.ts
    src/app/api/dashboard/widget/route.ts
    src/components/dashboard/WidgetForm.tsx
    src/app/widget/form/[formId]/page.tsx
    src/app/widget/[companyId]/page.tsx
    src/app/custom-widget/[domain]/page.tsx
    tests/widget-favicon.test.mjs
    tests/widget-embed-audit.test.mjs
    tests/browser/embed-audit.mjs

### Nationwide ZIP service area map, backend only

- Widget Appearance, Service Area now displays actual ZIP-area outlines in soft red.
- Adding/removing saved ZIPs updates the map and persists per form.
- Nationwide Census ZCTA data includes mainland states, Hawaii, Alaska, and date-line areas.
- Geometry validation preserves holes and islands. Date-line bounds use the shorter longitude arc.
- Leading-zero ZIPs remain intact. Missing ZIP areas receive an honest message, never a fabricated shape.
- The public endpoint validates bounded ZIP queries, rate limits requests, uses a fixed provider, limits response size, times out, and caches successful validated results.
- Loading, missing-area, provider failure, and retry states exist. Obsolete requests do not overwrite newer input.
- Map shading illustrates approximate ZIP geography. Existing server-side saved-ZIP quote restrictions remain authoritative.

Correction: Codex initially added a separate ZIP lookup to the customer form. Emmanuel clarified the map belongs in the backend. Codex removed that customer section and deployed the correction. Customer forms retain pickup and delivery addresses.

Release anchors:

- Initial map: 7afabb55cd3929c631b271d43d1854c87deeabdf.
- Backend-only correction: e6bd8ea92b14587af3980cdf67431f388a1d47c6.
- Production trigger with the same tested correction tree: 30c28e533e439e706c210d5be8e209f3c41495b4.

Relevant files:

    src/lib/zip-areas.ts
    src/app/api/zip-areas/route.ts
    src/components/widget/ZipAreaMap.tsx
    src/components/dashboard/WidgetForm.tsx
    src/components/widget/QuoteWidgetForm.tsx
    tests/zip-areas.test.mjs
    tests/fixtures/zip-areas-national.json

### Quote receipt and customer message

- Replaced the merchant-callback promise with a quote-ready result.
- Clarified saved estimate versus confirmed booking or payment.
- Added receipt details: reference, route, service/window, vehicle, relevant custom answers, and authoritative saved price breakdown.
- Email confirmation messaging reflects the submission API's actual email provider result.
- Fixed success icon visibility in dark mode and start-new-quote contrast.

### Delivery Services layout

- Matched the Delivery Services container to pricing card width, margins, gutters, padding, corner treatment, and shadow.
- Removed the narrower service editor wrapper.
- Checked 375, 768, 1440, and 1920 pixel widths in light/dark themes with matching dimensions and no horizontal overflow.

### Service comparisons and conditional shipment questions

- Merchant service fees and delivery windows persist per selected form.
- Comparisons display complete service totals and windows.
- Conditional questions support visibility, required answers, and handling fees.
- Hidden questions neither validate nor charge. Input changes invalidate stale totals.
- Server pricing stays authoritative. Submission retains the chosen service/window and relevant answers.
- Furniture/pallet question presets support merchant configuration.

### Embed reliability and ownership

- Canonical embed code and previews resolve to the selected owned form.
- Default, non-default, stale, and foreign form selections have explicit behavior.
- Appearance, questions, vehicles, ZIPs, pricing, and submission metadata remain form-scoped.
- Server APIs reject invalid/foreign form references and calculate quote amounts.
- Public queries use allow-lists to prevent private company fields reaching client components.
- Payment checkout opens at the top level rather than becoming trapped in an iframe.

### Admin and installation visibility

- Admin surfaces signup time, last login, demo activity, attribution, and detected external installations.
- Tracking records external domain/form loads, first/last seen times, and counts.
- Active embed means an external load within the tracked 30-day window. Not detected does not prove absence.
- Direct visits, dashboard wrappers, ordinary external hosts, and builder/preview contexts have documented distinctions.
- Dates use the intended Pacific presentation. Assigned plan counts are separate from confirmed subscription payments.
- Vehicle request/catalog handling is a separate merchant/admin workflow requiring its own end-to-end audit when changed.

## Broader product inventory for the latest vault notes

These areas appear in the established source/navigation. Their presence is not proof Codex reverified every flow in this session. Claude should inspect current implementation, document actual plan gates, and record verification status.

- Account registration/authentication, password recovery, onboarding, profile, customer contact, and subscription settings.
- Standard, extended, and quick forms, templates, per-form appearance/theme/questions/vehicles/pricing.
- Pickup/dropoff and intermediate stops, route/distance calculation, service choices, minimum charges, weight/item/add-on/handling pricing.
- Hosted pages, embeds, copied HTML, branded domains, logo treatment, colors, fonts, backgrounds, and favicons.
- Quote storage, saved receipts, customer document/invoice code, and payment/booking flows.
- Analytics, attribution, abandoned quote recovery, email notifications, webhooks, and billing.
- Main Admin, demo activity, installations, vehicle requests, and SEO snapshot.
- Field Operations: Jobs Dashboard, Saved Stop Notes, and Delivery Readiness.
- Help/FAQ, What's New, security/legal pages, and public pricing/marketing.

Items marked Soon, including any developer API or team-member roadmap entries, remain planned until current working code and evidence establish delivery. A menu label alone is not verification.

## Verification evidence

### Latest favicon release

- 78 unit tests passed after the favicon tests and test loader updates.
- Type checking passed after Prisma generation. Changed-source lint passed.
- Existing browser scenarios passed before the audit reached the newly added favicon checks.
- The final three focused favicon scenarios passed: rejected unauthorized/unsafe/corrupt/oversized uploads; upload/save/fresh-session rendering; ownership/replacement/removal/default-form/custom-domain consistency.
- Actual Sharp decoding ran in tests. Storage was replaced only at the external provider boundary.
- A screenshot-induced fixture hydration timing issue was corrected by waiting for the backend map to finish hydration before capture. The final focused run reported no browser errors.
- Production READY state and canonical alias matched the release commit.
- A read-only live browser check confirmed the merchant title, single Qalt fallback icon, and pickup/delivery form loaded correctly.

### Map and earlier changes

- The map release passed 74 unit tests, type checking, and changed-source lint.
- The backend-only correction passed 21 fixture browser scenarios.
- The live ZIP API returned actual shapes for representative mainland, leading-zero, Hawaii, Alaska, and date-line ZIPs.
- Native Google Maps browser checks confirmed the real data layer, soft red style, and fitting behavior for California, Alaska, and Hawaii.
- A live check confirmed the separate customer ZIP lookup was absent after correction.
- Earlier receipt/layout checks covered the corrected message, saved details, theme contrast, responsive dimensions, and overflow.

### Limits

- Fixture tests replace database and external Google Maps, Census, Stripe, email, and storage boundaries.
- Codex did not submit production customer quotes or charge live cards.
- No claim of a complete independent audit of all historical features, billing agreements, custom domains, or Field Operations flows.
- Provider acceptance of an email is not proof of inbox delivery.
- No confirmed Obsidian vault write occurred. This note is ready for import and reconciliation.

## Audit and update discipline

Use QALT_CLAUDE_CODE_AUDIT_HANDOFF.md for the root-cause checklist and token rules.

Generate Prisma from current schema before type checking. Checked-in generated output has lagged behind source changes. Avoid unrelated generated churn.

npm run build applies migrations before Prisma generation and Next.js compilation. Do not treat it as a harmless compilation command against production.

Keep one authoritative latest-state vault note. Preserve existing notes and links. Record exact commits/deployments, applied migrations, actual checks/results, and unresolved limits. Distinguish implemented, verified, blocked, and planned.

Obsidian write status: no connected vault tool or confirmed accessible vault path in this Codex session. Claude should locate the real local vault, update its existing Qalt notes, verify saved paths, and report those exact paths.
