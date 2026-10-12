# Qalt Systems refinement audit

Baseline: production commit `8640ad3249bb4569cb2dfaf102238f2a766bbe88` in `Keenwayllc/qalt-quote-widget`. Production project: `qalt-quote-widget` on Vercel. The established Git integration deploys `main` to qalt.site. No new design, logo, assets, packages, schema, payment rules or entitlements are part of this refinement.

## Audit and implementation

The baseline already had the approved logo, restrained red identity, vehicle assets, clear instant-quoting hero, primary how-it-works sequence, plan-fit guide, product-boundary section and labeled homepage example. Those remain. Sections have distinct purposes and were retained.

- Homepage, pricing, billing and guided introduction now share existing published price amounts in `src/lib/billing-display.ts`. This is display data, not a Stripe billing change. Starter display counts use `src/lib/plans.ts`.
- Pricing and signup distinguish the card-free registration trial from the Pro checkout trial. Annual cards disclose the yearly total. Pricing no longer promises deposits or a full write-capable API. The comparison exposes included/excluded text and table semantics to assistive technology.
- Shared quote-outcome FAQs explain estimates, pending requests, notifications, optional full-amount payment, merchant scheduling and technical handoff. Homepage, demo and product overview reuse them. The intro no longer promises a booked job pays for the subscription. Sample payment screens no longer imply automatic dispatch readiness.
- Security badges and the security page describe source-verifiable controls. Unverified storage-encryption and processor-certification claims were removed. Shared links are described as private capabilities, without an absolute guessing or isolation guarantee.
- Login and signup preview metrics are visibly marked as illustrative. Approved product illustrations and sample vehicle artwork remain.
- Billing checkout/portal failures produce accessible error and retry guidance. Cancellation copy explains account retention without promising records are never deleted. Subscription and setup guidance explains metering.
- Quote inputs have accessible names, errors use alerts and the saved-summary region announces updates while retaining its existing region semantics.
- Navigation disclosures support Escape, restore trigger focus and close on focus leaving the group. FAQ and billing toggles expose state. Shared motion preferences and CSS honor reduced motion. The setup checklist retains its workflow and improves narrow-screen spacing.
- Pricing card headers use minimum heights so longer text does not cover CTAs. Pricing comparison overflow stays within a scrollable container. Public metadata now describes verified quoting behavior, with distinct canonical URLs for pricing, demo and product overview. Existing sitemap, robots rules, SEO routes and articles remain.

## Verified facts and code sources

| Fact | Source |
| --- | --- |
| Starter: 50 saved requests/month, 1 form. Pro: unlimited requests, 5 forms. Enterprise: unlimited requests/forms. | `src/lib/plans.ts` |
| Published display amounts retained: Pro $39/month or $348/year. Enterprise $99/month or $948/year. | Baseline homepage, pricing, billing; consolidated in `src/lib/billing-display.ts` |
| Actual subscription charges use configured Stripe price IDs, not the display helper. | `src/app/api/stripe/checkout/route.ts` |
| Registration grants 14 days of Pro without a card. Pro subscription checkout separately offers 7 days with a card. Enterprise checkout has no trial. | `src/app/api/auth/register/route.tsx`, `src/app/api/stripe/checkout/route.ts` |
| Unsubscribed expired trials return to Starter. Ending a paid subscription returns the account to Starter. | `src/app/dashboard/layout.tsx`, `src/app/api/webhooks/stripe/route.ts` |
| Saved requests, not calculations, count toward the allowance. All saved account requests since the UTC month boundary count. Submissions return 403 at the limit. | `src/app/api/widget/[companyId]/submit/route.tsx`, `src/lib/plans.ts` |
| Submit recomputes authoritative pricing and creates a PENDING quote request. Merchant/customer email sending is attempted. | Submit route, `src/lib/serverQuotePricing.ts` |
| Enterprise, payment-enabled forms and a connected Stripe account are required for payment. Checkout charges the full quote on the connected account. | `src/app/api/stripe/quote-payment/route.ts` |
| A verified, account-bound payment event marks the quote PAID and CONFIRMED and issues an invoice. It does not assign a driver. | `src/app/api/webhooks/stripe/route.ts`, `src/lib/customer-invoice-documents.ts` |
| Accepted/paid quotes feed the separate booking workflow. Ops jobs, stops, readiness and exceptions remain functional. | `src/app/dashboard/ops/bookings/page.tsx`, existing Ops routes |
| Enterprise connections provide scoped read-only quote/analytics REST and MCP access, plus configured webhooks. No direct dispatch synchronization is promised. | `src/lib/integration-auth.ts`, `src/app/api/v1/`, `src/app/api/mcp/route.ts`, `src/app/api/dashboard/integrations/route.ts`, `src/lib/webhooks.ts` |
| Password hashes, HttpOnly session cookies, public selected fields and company-scoped dashboard queries exist. | `src/lib/auth.ts`, `src/lib/session.ts`, `src/lib/publicWidget.ts`, dashboard queries |

## Verification scope

The release checks use the real TypeScript build, existing Node test suite, changed-file lint and temporary-app browser fixture. External Maps, Stripe, email and upload boundaries are mocked in the embedded-flow suite. Public browser smoke tests are read-only and create no accounts, leads or payments.

Representative Chromium viewport widths are 375, 390, 768, 1024 and 1440 pixels. This is browser emulation, not certification on physical iPhone/Android devices. Screenshots and machine-readable results are written to ignored `test-results/` paths.

Baseline tests: 102 passed. Updated Node suite: 104 passed, including preserved prices, annual arithmetic and entitlement boundaries. Repository-wide baseline lint: 528 errors and 680 warnings in existing code and generated files. Changed-source lint has no errors; existing animation helper warnings are retained. The local production build uses fixture credentials and does not execute production database migrations.

Real Postgres migration/RLS/error-monitor tests were attempted but blocked: embedded Postgres refuses root, and this execution environment denies changing process groups. No schema or database behavior is changed by this PR. Production Stripe price records, processor fees, real refunds/payouts, physical devices and live authenticated tenant workflows are not verified by local fixtures. Actual configured Stripe charges remain authoritative. No conversion, ROI, uptime or performance improvement is claimed.

Existing error reporting, registration attribution and actual-activity tracking remain unchanged. No new tracking events were added. Deployment uses the existing Vercel Git workflow after branch preview checks, with the prior production deployment `dpl_CjyqKVZRVPbN27MvzAGWU3AhAY41` available as the rollback reference.
