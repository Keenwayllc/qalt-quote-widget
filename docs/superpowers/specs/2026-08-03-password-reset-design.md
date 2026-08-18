# Qalt — Password Reset / Forgot Password

**Date:** 2026-08-03
**Type:** Feature (new auth flow, mirrors existing email-verification pattern)
**Priority:** High. Qalt currently has NO password recovery — any user who forgets their password is permanently locked out (only fix today is a manual DB password-hash reset in Supabase). Real churn/support risk for a paid product.
**Status:** Design APPROVED by user 2026-08-03. Next step: writing-plans → implement.

---

## Objective

Give merchants a self-serve password reset flow. A user who forgets their password requests a reset by email, clicks a time-limited single-use link, sets a new password, and can log in. Built to mirror the existing email-verification flow so it reuses established patterns (token field on `Company`, Resend email, token-lookup route).

---

## Decisions (locked with user)

1. **Link expiry:** 1 hour, single-use.
2. **Auto-verify on reset:** YES. A successful reset also sets `emailVerified = true`, because clicking a link delivered to the user's inbox proves email ownership (same proof as verification). This also cleanly un-sticks never-verified leads (e.g. First Class, N.Y.S Logix): they "forgot password" and land in, verified.
3. **Abuse protection:** Enumeration protection only — `forgot-password` always returns the same success response regardless of whether the email exists (matches the existing `resend-verification` route). Rate-limiting deferred (no rate-limiter infra in the project yet).
4. **Post-reset:** redirect to `/login?reset=success`; user signs in with the new password (standard, confirms they know it). Not auto-login.

---

## Reference pattern (existing, to mirror)

- `Company.emailVerificationToken String? @unique` + `emailVerified Boolean` — the token/flag shape to copy.
- `src/app/api/auth/verify-email/route.ts` — GET, looks up company by token, updates, sets cookie. Model the reset-token lookup on this.
- `src/app/api/auth/resend-verification/route.ts` — enumeration-protected email send (`if (!company || company.emailVerified) return success` without leaking). Model `forgot-password` enumeration handling on this.
- `src/lib/email.ts` — `sendEmail({ to, subject, react })`, `DEFAULT_FROM = 'Qalt <notifications@qalt.site>'`, returns `{ success }`.
- `src/components/emails/VerifyEmail.tsx` — template shape to mirror for `ResetPassword`.
- `src/lib/auth.ts` — `hashPassword`, `verifyPassword`, `signToken`.
- `process.env.NEXT_PUBLIC_APP_URL` — base URL for the emailed link (confirmed set in Vercel across all envs).

---

## Data model

Additive migration (like the addon3 migration). Apply to prod via Supabase MCP `apply_migration` (ref `sxuphhdtgqzeacybdosn`); never `prisma migrate deploy`.

```prisma
model Company {
  // ...existing fields...
  passwordResetToken   String?   @unique
  passwordResetExpires DateTime?
}
```

Both nullable, no defaults needed → pure additive `ADD COLUMN`. Existing rows unaffected.

---

## Components / flow

### 1. Login page — `src/app/login/page.tsx`
Add a "Forgot password?" link near the password field → `/forgot-password`. Also surface a success banner when `?reset=success` is present ("Password updated — sign in with your new password").

### 2. `/forgot-password` page — `src/app/forgot-password/page.tsx`
Client page: single email input + submit. POSTs to `/api/auth/forgot-password`. On response always shows the same confirmation screen ("If an account exists for that email, we've sent a reset link") — no enumeration leak. Reuse the register page's visual language.

### 3. `POST /api/auth/forgot-password` — `src/app/api/auth/forgot-password/route.ts`
- Parse `{ email }`.
- Look up company. If missing → return success anyway (enumeration protection).
- Generate `token = crypto.randomBytes(32).toString("hex")`, set `passwordResetToken = token`, `passwordResetExpires = now + 1h`.
- Email `ResetPassword` template with `resetUrl = ${NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`.
- Always return `{ success: true }`. Capture `sendEmail` result and log on failure (consistent with the hardened register route).

### 4. `/reset-password?token=…` page — `src/app/reset-password/page.tsx`
Client page: reads `token` from the query string. Two fields (new password + confirm). Basic client validation (match, min 8). POSTs `{ token, password }` to `/api/auth/reset-password`. On success → redirect to `/login?reset=success`. On failure (invalid/expired) → clear error with a link to request a new one.

### 5. `POST /api/auth/reset-password` — `src/app/api/auth/reset-password/route.ts`
- Parse `{ token, password }`. Validate `password` length ≥ 8 → 400 otherwise.
- Look up company where `passwordResetToken = token` AND `passwordResetExpires > now`. If none → 400 "This reset link is invalid or has expired."
- Update: `passwordHash = hashPassword(password)`, `passwordResetToken = null`, `passwordResetExpires = null`, `emailVerified = true`, `emailVerificationToken = null`.
- Return `{ success: true }`.

### 6. Email template — `src/components/emails/ResetPassword.tsx`
Mirror `VerifyEmail.tsx`. Props `{ companyName, resetUrl }`. Copy: reset button/link, "expires in 1 hour", "if you didn't request this, ignore this email." No em dashes.

---

## Error handling

- Invalid/expired/used token → 400 with a friendly message and a path back to `/forgot-password`.
- Short password → 400 "Password must be at least 8 characters."
- Email send failure on forgot → still return success to the user (enumeration), log server-side.
- All routes wrapped in try/catch returning 500 on unexpected errors, matching existing auth routes.

---

## Security notes

- Token is 32 random bytes (256-bit), `@unique`, single-use (cleared on success), 1h expiry.
- Enumeration protection on `forgot-password`.
- Existing JWT sessions are NOT force-invalidated on reset (no token-versioning in the app). New password applies to future logins. Accepted for now (YAGNI); revisit if session invalidation becomes a requirement.
- No rate-limiting yet (deferred). Turnstile is not added to this flow in v1 (could be added later to `forgot-password` if abuse appears).

---

## Files

- Modify: `prisma/schema.prisma` (+ new migration dir + prod apply), `src/app/login/page.tsx`
- Create: `src/app/api/auth/forgot-password/route.ts`, `src/app/api/auth/reset-password/route.ts`, `src/app/forgot-password/page.tsx`, `src/app/reset-password/page.tsx`, `src/components/emails/ResetPassword.tsx`

---

## Acceptance criteria

1. "Forgot password?" link on the login page → `/forgot-password`.
2. Submitting a registered email sends a reset email with a working link; submitting an unregistered email shows the same confirmation (no enumeration).
3. The reset link opens `/reset-password`; setting a valid new password succeeds and redirects to `/login?reset=success`.
4. Logging in with the new password works; the old password no longer works.
5. A used or >1h-old link shows an invalid/expired error, not a reset form.
6. A never-verified user who resets is afterward `emailVerified = true` and can log in.
7. Existing merchants unaffected; migration is additive (new columns null by default).

---

## Test plan (local, with pulled `.env.local`)

1. `npm run build` passes (prisma generate with DATABASE_URL, then next build).
2. From `/login`, click "Forgot password?" → form renders.
3. Submit a known email → confirmation screen; check inbox/Resend for the reset email.
4. Click the link → `/reset-password` with token; set new password → redirect to `/login?reset=success` with banner.
5. Log in with new password → success. Old password → rejected.
6. Reuse the same link → invalid/expired error.
7. Submit an unknown email → identical confirmation (no leak).
8. Reset a never-verified test account → confirm `emailVerified` flips true.

---

## Deploy

- Build is `prisma generate && next build`; migrations are not auto-applied. Apply the additive migration to prod Supabase (`sxuphhdtgqzeacybdosn`) via MCP `apply_migration` before/with the deploy.
- Ship by pushing to `main` (Vercel auto-deploys; CLI authed as `keenwayllc`, project linked).
