# Qalt Quote Command Center + Quote/Invoice PDF UX

This document captures the approved product/UX direction for the next Qalt feature before backend implementation.

## Product model

The Merchant Console is the command center for each delivery company. One customer quote should have one coherent history:

Customer → Route → Pricing → Payment → Documents → Job

The merchant should not have to hunt across unrelated areas to understand a quote.

## Quote detail UX

The quote detail surface should show:

- customer identity and contact information
- quote status
- route and distance
- shipment details / add-ons
- transparent pricing breakdown
- payment status
- document history
- quote-to-job relationship
- chronological lifecycle events

### Documents card

V1 should live inside Quote detail rather than adding a new top-level Documents nav item.

Show:

- Quote number, e.g. `Q-2026-00124`
- status such as Generated / Sent / Viewed
- issue date
- last viewed/sent date where available
- actions: View, Download, Email/Resend
- Invoice/Receipt number after successful payment, e.g. `INV-2026-00081`
- paid status and paid date

If a Job is linked, Job detail may surface a small link back to the quote's documents. Do not create duplicate job documents in V1.

## Customer-facing Quote PDF

The PDF should be branded as the merchant, not as a generic Qalt document.

Include:

- merchant logo
- merchant company name and contact details
- saved merchant primary brand color as accent
- Quote or Invoice label
- human-readable document number
- issue date
- customer name/email/phone
- full pickup address
- full dropoff address
- distance
- service type
- pickup date/time if available
- shipment information
- add-ons
- transparent price line items
- total
- status
- disclaimer / merchant terms

### Paid Invoice / Receipt

After trusted server-side payment confirmation, the paid document should also show:

- clear PAID status
- paid date
- safe payment reference
- wording that payment was processed securely via Stripe where appropriate

Never expose card secrets, Stripe secrets, internal merchant notes, webhook secrets, or other private fields.

## Historical accuracy

Documents must render from immutable snapshots. Once issued, an old quote or invoice must not change if the merchant later changes:

- mileage rate
- minimum charge
- add-on prices
- brand color
- company profile details
- pricing configuration

## Multi-tenant rule

Every QuoteRequest, document, invoice, email action, and dashboard download must be scoped to the authenticated merchant company.

For dashboard operations:

1. derive company identity from authenticated server-side session
2. fetch/verify the requested record belongs to that company
3. only then read, update, email, download, or generate

Never trust a browser-supplied `companyId` as authorization.

Public customer document links must use an unguessable token/signed mechanism and expose only the intended read-only customer document.

## Visual direction

Stay inside the current Qalt/Astra system:

- Inter
- ink `#22252b`
- muted `#646b76`
- Qalt red `#df1731`
- line `#e2e4e9`
- paper `#f7f8fa`
- premium dark `#080b14`
- rounded cards and controls
- restrained motion
- responsive/mobile-safe layouts

## Design preview

A non-production-behavior visual prototype is available at:

`/design/quote-command-center`

It is intentionally presentation-only. It does not create documents, mutate quotes, send email, or alter pricing/payment behavior.

## Backend implementation order

1. Tenant-isolation audit
2. Persist missing quote historical inputs
3. Immutable CustomerDocument snapshot model
4. Tenant-scoped document numbering
5. Quote PDF generation
6. Secure public download token
7. Resend email integration
8. Stripe-paid invoice/receipt creation with idempotency
9. Merchant Console Documents card wiring
10. Customer widget document actions
11. Tests + Vercel production build

Do not merge document backend work until tenant-isolation findings are reviewed first.
