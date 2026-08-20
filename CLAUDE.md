# Qalt

White-label delivery quote+book SaaS. Delivery firms embed branded widget on site — customer get instant price, book, pay. Dashboard let operator set pricing, manage quote requests, control widget look.

Live demo account: Pittman (active).

## Stack

- Next.js + TypeScript
- Prisma ORM → Supabase (PostgreSQL, ref: sxuphhdtgqzeacybdosn)
- Shopify integration (widget distribution)
- Vercel deployment

## Database rules

Prisma migrations live in `prisma/migrations/`. **No run `prisma migrate deploy` against prod without verify migration is additive.** Prod DB may have diverged.

Schema changes:
- Add new Prisma migration file (`prisma migrate dev --name <desc>` locally to generate)
- Review generated SQL — confirm only adds, never drops or rewrites
- Apply to prod manually: `supabase db execute --file prisma/migrations/<timestamp>_<name>/migration.sql`

## Design

"Fast, sharp, operator-grade." Dark-first (Antigravity dark theme = native state).

- Brand accent: `#dc2626` (red) — signal primary actions + energy, **not errors**
- Error states use separate destructive color, not brand red
- Dense-but-clear over spacious-but-shallow — users are operators running business
- No decorative elements. No floating cards with purple-to-pink gradients

Use `impeccable` skill for all UI work.

## Key files

| File | Purpose |
|---|---|
| `prisma/schema.prisma` | Source of truth for DB schema |
| `src/` | Next.js app |
| `shopify.app.toml` | Shopify app config |
| `PRODUCT.md` | Product decisions + brand guidelines |
| `DESIGN.md` | Design system reference |

## Scope

Standalone project — not part of Keenway platform. Supabase DB here (`sxuphhdtgqzeacybdosn`) is separate from Keenway DB and editable.