# Qalt embed audit

2026-10-04. The embed audit fixes were deployed in commit `3cc45f8`. The audit introduced no schema changes.

The selected form now supplies the copied URL, iframe HTML, editor preview, and embed-page preview. Existing company URLs continue to select that company's first form in ID order. Verified custom-domain roots still open the default form; the embed page explains this and always uses the canonical selected-form URL.

## Root causes and fixes

| Root cause | Resulting behavior |
| --- | --- |
| Embed page ignored the selected form; branded root could open another form | Form selector and `formId` query select an owned form. Missing/foreign selections disable copying instead of silently selecting the default. |
| Forms list used the current browser origin | Shared URL/snippet generation always uses HTTPS `www.qalt.site/widget/form/<id>`. |
| Appearance preview was an approximation; fixed 700px embeds could be cramped | Editor uses the actual saved public route, refreshes after saving, and links to the selected form's embed page. Script-free snippets use 1000px height with normal internal scrolling. |
| Dashboard default selection was unordered | Widget APIs sort forms consistently with the public company route. |
| Public pages omitted company logo backdrop | Both public routes pass the allow-listed backdrop, with form logo/company logo fallback intact. The editor labels backdrop as applying to all forms. |
| Places hook could initialize before Google Maps | Initialize autocomplete after the Maps loader is ready. Address-verification failures show a recoverable message; loader failures ask the visitor to reload. |
| Reduced-motion markup differed between server and browser; branding mutated unhydrated DOM | Stable initial rendering and React-owned brand variables eliminate the observed hydration failures in public forms and the embed-page wrapper. |
| Blank disclaimer was overwritten; merchant URLs were unsanitized | Deliberately blank disclaimers persist. HTTPS link/image validation blocks active schemes, credentials and mixed content; public routes sanitize legacy URLs too. CSS image URLs are quoted. |
| Quotes did not retain the selected form for payment return links | New quotes snapshot the validated owned form ID in existing extras JSON. Payment success/cancellation preserve that form; legacy/deleted-form records fall back to the company route. |
| Async iframe checkout depended on automatic top navigation | An explicit secure-checkout link leaves the iframe on a fresh user click. The URL must be HTTPS on `checkout.stripe.com`. Direct visits retain automatic redirect. Disabled/unentitled quote payments are rejected. |
| Builder loads looked like published-site evidence; recovery sessions were company-scoped | Admin distinguishes known builder hosts and unknown external hosts. Nested dashboard previews are excluded where ancestor origins are available. Recovery session keys include the form. |
| Public endpoints lacked a request-flood backstop | Bounded per-process, hashed-IP limits: 600 installation pings/minute and 60 quote submissions/company/minute, with retry responses. |

Ownership checks remain intact. Pricing reads now include company scope. Public form pricing comes from the owning company's allow-listed profiles. Quote submissions resolve and validate one owned form before calculating pricing or saving. No subscription entitlements or fee formulas changed. `publicWidget.ts` remains strict and unchanged.

## Verification

- **55 repository tests pass**, including 14 new audit cases. Coverage includes malformed IDs/URLs, full appearance-setting saves, blank disclaimers, public customization/pricing/theme payloads, absence of private data, missing forms/zero-form accounts, foreign-merchant API rejection, authoritative pricing scope, rate limits, payment return paths, and StrictMode tracking deduplication.
- **15 Playwright scenarios pass** against the actual Next.js public pages, dashboard editor and quote APIs. The host fixture serves the copied iframe HTML without Qalt JavaScript in the parent page.
- Browser checks exercise selected/default/invalid form links, generated HTML, custom-domain behavior, clipboard failure/success, Maps initialization/autocomplete, unsupported ZIP blocking, vehicle selection, real quote calculation/submission, custom answers, installation counts, editor Save + preview refresh, persistence after clearing the merchant session, and top-level checkout navigation.
- Browser widths: **375, 390, 768, 1024, 1440px**, with no document-level horizontal overflow. Dark theme, logo/background, vehicle controls and both motion preferences were exercised. Application/hydration error collection is empty. Dev-only cross-origin HMR socket messages are excluded.
- Google Maps, Resend and Stripe HTTP responses are mocked at the external network boundary. The final payment test uses the real Stripe SDK. Prisma is replaced only in a temporary copied application with two merchant fixtures and an empty account. Production data and credentials are not used.

The less common combinations of large-item settings, after-hours schedules, font/logo combinations and every fee toggle were inspected through saving, allow-lists and rendering/calculation code; this is not an exhaustive browser test of every possible combination. Existing calculator, vehicle, question and service tests also remain passing.

## Commands and results

| Command | Result |
| --- | --- |
| `npm test` | 55 passed, 0 failed |
| `npx tsc --noEmit` | Passed |
| `npx eslint <all changed source and test files>` | Passed; two existing warnings: unused admin `demoLeadCount`, embed-page `<img>` guidance |
| `npm run lint -- --format json --output-file /tmp/qalt-final-lint.json` | Fails with 494 errors and 654 warnings in unchanged/generated files; no errors in changed/new files |
| `QALT_CHROMIUM_EXECUTABLE=/tmp/qalt-chromium LD_LIBRARY_PATH=/tmp/qalt-browser-al2023/lib:/tmp/qalt-browser-swiftshader npm run test:embed` | 15 scenarios passed |
| `git diff --check` | Passed |

For a normal development environment: run `npm ci`, `npx playwright install chromium`, then `npm run test:embed`. This workspace's standard Chromium download failed; a test-only Chromium package supplied the executable above. It is not a production dependency. The runner accepts `QALT_CHROMIUM_EXECUTABLE` for an existing browser and cleans up its temporary application.

Browser evidence is generated under `test-results/embed-audit/`: results, server log, and five viewport screenshots. These outputs are ignored by Git. The production-migrating `npm run build` command was deliberately not run.

## Files changed

- Embed/copy/editor: `src/lib/widget-embed.ts`, `src/app/dashboard/embed/page.tsx`, `src/app/dashboard/forms/page.tsx`, `src/app/dashboard/widget/page.tsx`, `src/components/dashboard/WidgetForm.tsx`.
- Public rendering/hydration: `src/app/widget/[companyId]/page.tsx`, `src/app/widget/form/[formId]/page.tsx`, `src/components/widget/QuoteWidgetForm.tsx`, `src/components/shared/WidgetBrandRuntime.tsx`, `src/components/dashboard/SecondaryConsoleMotion.tsx`, `src/lib/color.ts`, `src/lib/widget-urls.ts`.
- Settings/pricing/payment: `src/app/api/dashboard/widget/route.ts`, `src/app/api/dashboard/pricing/route.ts`, `src/lib/serverQuotePricing.ts`, `src/app/api/widget/[companyId]/submit/route.tsx`, `src/app/api/stripe/quote-payment/route.ts`, `src/app/widget/payment-success/page.tsx`, `src/lib/quote-widget-return.ts`.
- Tracking/abuse controls: `src/components/widget/WidgetInstallTracker.tsx`, `src/components/widget/AbandonedQuoteTracker.tsx`, `src/lib/widget-installations.ts`, `src/lib/widget-rate-limit.ts`, `src/app/api/widget/install-ping/route.ts`, `src/app/dashboard/admin/page.tsx`.
- Tests/tooling: `tests/widget-embed-audit.test.mjs`, `tests/widget-install-route.test.mjs`, four files in `tests/browser/`, `package.json`, `package-lock.json`, `.gitignore`, this report.

## Remaining limitations

This verifies the isolated merchant flow, not a published merchant account. Actual Systeme.io publishing, Uptime's live website, production Google Maps restrictions, real Stripe payments/webhooks and production PostgreSQL were not exercised. The report does not claim production acceptance is complete.

The HTML uses a conservative fixed height and scrolling rather than parent-side resize JavaScript, because builders can remove scripts. Very long forms may still scroll internally. Nested preview exclusion depends on browser-provided ancestor/referrer information. Hostnames alone cannot prove that a page is published, and builder-owned domains can also host published pages. Rate limits are per server process and should be supplemented by distributed/edge controls. Next.js streamed not-found responses may carry HTTP 200 while rendering its safe 404 boundary; non-streamed/API failures retain explicit status codes.

Before production acceptance, publish one merchant test page, complete a real quote and test payment, confirm its published domain in Admin, then change and re-save that same form and reload the published page.


## Delivery comparison and shipment questions, 2026-10-04

- Forms with multiple configured services compare full server-calculated quote totals. Mileage, minimum charges, vehicle charges, shipment answer fees, and pricing rules are included. One route lookup and one pricing-rule read serve the comparison.
- Merchants configure service windows under Pricing Settings. Customers select or switch services before booking. The selected window is saved in the quote snapshot and included in merchant and customer emails.
- Extended forms support conditions based on earlier choice questions, positive numeric answers, and optional fees for answer choices. A furniture/pallet preset adds eight relevant questions without assigning merchant prices.
- Hidden answers are excluded from validation, fee calculation, and saved quote answers. Conditions cannot reference later questions or form cycles. Server-owned definitions determine charges, including legacy requests without a form ID.
- Existing JSON settings and quote snapshots store the new configuration. No schema migration is needed. Existing forms retain their settings until merchants edit them.
- Service windows are merchant-provided descriptions. This release does not reserve driver capacity. Numeric and text custom answers collect information; configured choice fees affect pricing. Existing built-in weight pricing remains separate.

Verification: 65 automated tests pass. The expanded browser suite covers 20 scenarios, including real settings saves, conditional fees, mobile comparison cards, service switching, saved totals and windows, and hidden-answer removal. TypeScript and changed-file lint pass with two existing email-image warnings. Browser providers and Prisma use isolated fixtures, as described above. Live payments and publishing in a merchant's Systeme.io account were not exercised.
