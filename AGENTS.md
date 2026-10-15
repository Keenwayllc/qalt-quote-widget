# AGENTS.md

Instructions for Codex and any other coding agent working in this repo. Read `CLAUDE.md` too (database rules, design rules).

## Merchant Intelligence and Quinn: shipped, do not change

Built by Claude Code on 2026-10-14 and approved by the owner (Emmanuel). Live in production on every plan (Free, Pro, Enterprise).

| PR | Merge commit | Contents |
|---|---|---|
| #65 | `e52d729` | Merchant Intelligence: profit estimates, dashboard, alerts, recommendations, assistant |
| #66 | `3108c18` | Assistant named Quinn |
| #67 | `0e4007e` | Cost settings vehicle catalog with artwork, vehicle requests, catalog cost fallback |

**Do not modify, refactor, rename, reformat, move or delete these files** unless Emmanuel explicitly asks for a change to this feature:

- `src/lib/merchant-intelligence.ts` - profit estimates, stages, alerts, insights, recommendations (pure)
- `src/lib/merchant-assistant.ts` - Quinn, rule-based answers (pure)
- `src/lib/merchant-intelligence-data.ts` - session-scoped data loader
- `src/lib/quote-profit-intelligence.ts` - the underlying profit engine
- `src/app/api/dashboard/intelligence/**` - cost-profiles, assistant, quote/[id], recommendations/apply
- `src/app/dashboard/intelligence/**` - dashboard page, cost settings page, styles
- `src/components/intelligence/**` - ProfitBreakdown
- `src/app/dashboard/quotes/QuoteProfitCard.tsx`
- `prisma/migrations/20261014120000_merchant_cost_profiles/` - already applied to production; never edit an applied migration
- `tests/merchant-intelligence.test.mjs`, `tests/merchant-assistant.test.mjs`, `tests/merchant-intelligence-routes.test.mjs`

Small hooks into shared files also belong to this feature. Keep them when editing those files: the Intelligence nav item in `src/app/dashboard/DashboardClientLayout.tsx`, the two guides in `src/lib/dashboard-guides.ts`, the palette entry in `src/components/dashboard/DashboardTips.tsx`, the `QuoteProfitCard` line in `src/app/dashboard/quotes/QuotesClient.tsx`, the `./QuoteProfitCard` stub in `tests/analytics-report.test.mjs`, and the `MerchantCostProfile` model plus `Company.costProfiles` in `prisma/schema.prisma`.

### Rules the feature depends on (do not break)

1. **Merchant-only.** Profit data never appears in the public widget, public APIs or customer emails. Every query is scoped by the company id from `getCurrentCompany()` (the session), never a client-supplied id.
2. **Never changes prices.** Estimates use the stored `QuoteRequest.estimatedPrice`. Nothing here may write `estimatedPrice` or affect Stripe checkout amounts.
3. **No fabricated numbers.** Missing fuel price, mpg, driver cost or average speed gives an "unavailable" estimate. "Collected online" counts `paymentStatus === "PAID"` only.
4. **Pricing changes need confirmation.** `recommendations/apply` recomputes the proposal on the server, requires `confirm: true` and a matching value, caps changes at +50%, and only updates the company's default `PricingProfile`.
5. **Quinn is rule-based.** No AI provider calls, no data writes, never contacts customers. Do not wire it to an LLM without Emmanuel's approval (the Anthropic key is intentionally unset).
6. **Alerts are dashboard-only.** No automated customer email or SMS.

If a change elsewhere breaks one of the tests above, fix your change, not the test. If you believe this feature has a bug, describe it to Emmanuel instead of editing it.

## Repo-wide cautions

- **Vercel Preview shares the production database**, and `npm run build` runs `prisma migrate deploy`. Pushing any branch that adds a migration changes production. Only add migrations that are purely additive, and tell Emmanuel first.
- Enable RLS on every new table. Never run `prisma db push` or `migrate dev` against production.
- Do not use `npm run build` locally against production env vars. Use `npx next build`.
- Copy rule: no em dashes or en dashes in user-facing text. Use hyphens, commas or periods.
- Tests: `npm test` (unit), `npm run test:db` (embedded Postgres). Both must pass before merging.
