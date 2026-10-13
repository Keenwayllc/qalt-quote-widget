# Global dashboard analytics

Analytics is available to Starter, Pro and Enterprise. The server always obtains the current company from the existing authenticated session and filters requests by that company, deletedAt=null and the selected date window. Only aggregate dimensions and the latest six quote IDs/routes reach the client; customer contact fields are not selected.

The 7/30/90-day report uses UTC calendar days including the current partial day. The prior window contains the same number of days immediately before it. Quoted and paid-quote values are estimates, not collected/settled revenue. Booking rate includes WON, CONFIRMED, PAID and paymentStatus=PAID. Outcome buckets are mutually exclusive. A zero denominator yields no measured rate or average. Today is explicitly labelled as partial.

The dashboard includes real period comparisons, a chart with optional prior-period overlay and accessible data table, quote outcomes, service/pickup-area distributions, operational signals, cohort-specific guidance, recent quote links, refresh, and aggregate CSV export. Spreadsheet formula-like labels are prefixed as text. No customer contact details are exported. Pricing comparison and dashboard guides reflect global analytics access; other paid entitlements are unchanged.

## Verification

- `npm test`: 112 passing tests, including date boundaries, empty cohorts, status deduplication, invalid values, all-plan entitlements, and execution of the actual page loader with two tenants, and quote drill-down limited to tenant-scoped requests.
- Scoped ESLint and TypeScript checks.
- Playwright verification of 7/30/90 windows, overlay switch, daily table, sort order, quote links, refresh, CSV download, empty states, keyboard focus, 375/768/1080/1440 layouts, light/dark themes, and the actual dashboard shell for all three plans.
- Production build and live deployment smoke checks are performed before reporting completion.

## Reproduce browser checks locally

The fixture is test-only and must never be included in a production deployment. From the repository root in PowerShell:

```powershell
New-Item -ItemType Directory -Force src/app/analytics-verification | Out-Null
Copy-Item -LiteralPath tests/browser/fixtures/analytics-page.tsx -Destination src/app/analytics-verification/page.tsx
npx next dev --port 3107
```

Run `node tests/browser/analytics-verification.mjs` in a separate terminal, then stop the dev server. Delete the two explicitly named fixture paths before building:

```powershell
Remove-Item -LiteralPath src/app/analytics-verification/page.tsx
Remove-Item -LiteralPath src/app/analytics-verification
```

If Next reports stale generated types for the deleted fixture, remove only the local `.next/dev` cache before running `npx next build`. Screenshots are written to the parent directory of the checkout.
