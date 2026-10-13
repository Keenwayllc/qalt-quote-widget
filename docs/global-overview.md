# Global Overview workspace

Overview is available on Starter, Pro and Enterprise without a feature gate. Existing company branding, navigation and subscription quotas remain intact. All server queries begin with the authenticated company ID; the browser receives that company's selected dashboard records only.

The workspace shows a seven-day request count with the preceding seven-day comparison, pending decisions and their estimated value, all active-job totals, a latest-five quote inbox, a first-four dispatch preview, measured installation status, setup readiness, monthly capacity and quick actions. Estimated quote values are labelled as estimates, not revenue. UTC periods and snapshot time are explicit. Embed detection is based on recorded external loads and does not assert uptime. Failed sources render unavailable independently; empty sources render real zero activity. Monthly quota counts include deleted requests to match enforcement.

Verification:

- `npm test`: 117 tests, including two-tenant isolation, actual totals independent of preview limits, null payment states, empty and partial failures, embed detection and unchanged plan allowances.
- Scoped ESLint and production Next.js build.
- Browser fixture: all plans; 375, 768, 1080, 1440 and 2560 pixel layouts; light/dark themes; keyboard focus; accessible daily table; setup accordion; quote/job links; refresh; exhausted allowance; empty and partial failures; no browser exceptions.

For repeatable browser checks, copy `tests/browser/fixtures/overview-page.tsx` to `src/app/overview-verification/page.tsx`, run Next development on port 3107, then run `node tests/browser/overview-verification.mjs`. The fixture uses synthetic example records and the real dashboard shell. Remove the temporary route and `.next/dev` before the production build. Never deploy the verification route. Screenshots show example records, not live tenant data.

New Overview styles own their surfaces and responsive layout; `overview-premium.css` retains only a home-route shell background. Dark-mode text accents have a lighter color while filled buttons retain Qalt red.
