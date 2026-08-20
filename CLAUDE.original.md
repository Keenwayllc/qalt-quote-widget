# Qalt

White-label delivery quoting and booking SaaS. Delivery companies embed a branded widget on their site — customers get an instant price, book, and pay. Dashboard lets operators configure pricing, manage quote requests, and control widget appearance.

Live demo account: Pittman (active).

## Stack

- Next.js + TypeScript
- Prisma ORM → Supabase (PostgreSQL, ref: sxuphhdtgqzeacybdosn)
- Shopify integration (widget distribution)
- Vercel deployment

## Database rules

Prisma migrations live in `prisma/migrations/`. **Do not run `prisma migrate deploy` against prod without verifying the migration is additive.** The prod DB may have diverged.

For schema changes:
- Add a new Prisma migration file (`prisma migrate dev --name <desc>` locally to generate)
- Review the generated SQL — confirm it only adds, never drops or rewrites
- Apply to prod manually: `supabase db execute --file prisma/migrations/<timestamp>_<name>/migration.sql`

## Design

"Fast, sharp, operator-grade." Dark-first (Antigravity dark theme is native state).

- Brand accent: `#dc2626` (red) — signals primary actions and energy, **not errors**
- Error states use a separate destructive color, not the brand red
- Dense-but-clear over spacious-but-shallow — users are operators running a business
- No decorative elements. No floating cards with purple-to-pink gradients

Use the `impeccable` skill for all UI work.

## Key files

| File | Purpose |
|---|---|
| `prisma/schema.prisma` | Source of truth for DB schema |
| `src/` | Next.js app |
| `shopify.app.toml` | Shopify app config |
| `PRODUCT.md` | Product decisions and brand guidelines |
| `DESIGN.md` | Design system reference |

## Scope

This is a standalone project — not part of the Keenway platform. The Supabase DB here (`sxuphhdtgqzeacybdosn`) is separate from Keenway's DB and is editable.
