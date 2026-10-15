# Qalt Merchant Intelligence

Status: first release built on feature/merchant-intelligence-foundation (Draft PR #65). Not deployed.

## Implemented (first release)
- **Schema:** additive migration `20261014120000_merchant_cost_profiles` adds `MerchantCostProfile` (company default row with `vehicleKey = ''`, optional per-vehicle overrides where null inherits the default, plus the follow-up threshold). RLS enabled. No existing table changes.
- **Profit estimates:** `src/lib/merchant-intelligence.ts` wraps `estimateQuoteProfit`. Hours = handling minutes + (loaded + deadhead miles) / average speed. Deadhead is split out for display only; totals equal the engine's. Revenue is the stored `estimatedPrice`. Missing fuel price, MPG, driver cost or speed gives "unavailable", never a number.
- **Dashboard** `/dashboard/intelligence`: pipeline band (derived from existing statuses, nothing redefined), attention list (one alert per quote: unfinished checkout, job Issue, estimated loss or below-target while still open, stale pending), period insights (online payments shown apart from estimates), pricing recommendations, Quinn (assistant), server-paginated quote table with search and filters.
- **Cost settings** `/dashboard/intelligence/costs` and a private profit card in the Quotes drawer.
- **Recommendations:** at least 5 estimated quotes per group (10 for conversion). Minimum-charge and per-mile proposals are offered only when one default pricing profile prices every quote (no form-specific profiles). Applying needs an explicit confirm; the server recomputes the proposal and rejects edited or stale values. Only new quotes are affected: checkout charges the stored quote price.
- **Quinn (assistant, shown as "Ask Quinn"):** rule-based intents over verified numbers. No AI provider calls, no writes, no customer messages. Per-company throttle.
- **Alerts:** dashboard only. No automated customer email or SMS.

## Not in this release
- Conversational AI (LLM) answers. Add behind a daily budget like `ERROR_TRIAGE_AI_DAILY_ATTEMPTS`, sending aggregates only (no names, emails or addresses).
- Per-form pricing proposals, refund-aware revenue, time-zone-aware calendar periods (periods are rolling 24h / 7d / 30d).
- Plan gating: available on every plan for now (product decision pending).

## Goal
Bring the useful ideas from Dispatch Trucks into Qalt without copying its product or replacing Qalt's embedded instant quote and checkout workflow.

## Feature 1: Profit Intelligence
- Provide merchant-specific cost settings per vehicle and form: fuel price, MPG, labor cost, time assumptions, deadhead, tolls, other costs and margin target.
- Compute from server-authoritative QuoteRequest.estimatedPrice, distanceMiles and the merchant's configured assumptions.
- Show revenue, estimated operating cost, estimated profit, margin percentage and a low-margin flag in merchant-only quote detail and quote list.
- Preserve quoted customer prices, pricingBreakdown snapshots, Stripe payment amounts, and existing saved quote logic.
- Include explanation and editable assumptions. These are estimates, not guarantees or tax accounting.
- For zero or missing input, show "insufficient cost data" rather than fabricated profit.
- Gate by existing plan entitlements; never trust client-supplied company IDs.
- Add tests for isolation between merchants, currency rounding, refunds, legacy quote rows and zero-distance routes.

## Feature 2: Smarter Merchant Dashboard
- Make a merchant-scoped board for New Quote, Follow-Up, Booked, In Progress and Completed.
- Do not reassign or redefine existing QuoteRequest.status or Job.status without an explicit migration plan. Start with a derived read-only view.
- Cards show quote value, estimated margin if configured, customer, route, age, and an alert when attention is needed.
- One-click buttons must use existing protected state transitions and display immediate pending/success/error feedback.
- Add alerts for stale pending quotes, paid orders needing action, and low-margin quotes. No false "live tracking" promises.
- Keep tables/board responsive on mobile, accessible, and performant with pagination.

## Feature 3: Qalt AI Assistant
- Merchant-only assistant helps explain quote breakdowns, identify below-target margin bookings and suggest cost/price improvements.
- Reuse existing Anthropic dependency/provider configuration. No new paid service without review.
- Read access to merchant-authorized data only, filter PII from prompts where feasible.
- Assistants never silently alter pricing rules, customer quotes, checkout, payment state or send messages.
- AI suggestions must have an explanation and explicit confirmation for any eventual write.
- Log model usage, implement quotas, secure server-side rate limits and fallbacks.
- First release: deterministic insight cards using the profit helper. Add conversational AI after privacy and usage controls.

## Proposed rollout
1. Backend schema migration for per-merchant cost profiles and feature flags.
2. Protected server-side quote analysis API and tests.
3. Quote details and board UI, private to merchant.
4. Deterministic insight cards and analytics.
5. AI chat with explicit user approval for write actions.
6. Staging QA, Stripe regression, mobile test, then gated production release.

## Guardrails
- Do not copy Dispatch Trucks branding, artwork or source code.
- Preserve Qalt quote accuracy, multi-tenant boundaries, Stripe checkout, draft recovery and public embed speed.
- Treat the existing src/lib/quote-profit-intelligence.ts function as a pure calculation foundation. It is not wired into production views yet.
