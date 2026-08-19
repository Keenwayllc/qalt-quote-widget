# Password Reset / Forgot Password Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a self-serve password reset flow so a merchant who forgets their password can request a time-limited email link and set a new password.

**Architecture:** Mirror the existing email-verification flow. Add two nullable fields to `Company` (`passwordResetToken`, `passwordResetExpires`), two API routes (`forgot-password`, `reset-password`), two client pages, one Resend email template, and a "Forgot password?" link on the login page. A successful reset also sets `emailVerified = true`.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Prisma 7 → Supabase Postgres (ref `sxuphhdtgqzeacybdosn`), Resend, Vercel.

**Spec:** `docs/superpowers/specs/2026-08-03-password-reset-design.md`

## Global Constraints

- Link expiry: **1 hour**, single-use (cleared on success).
- A successful reset sets `emailVerified = true` and clears `emailVerificationToken`.
- `forgot-password` has **enumeration protection**: always returns the same success response whether or not the email exists.
- Post-reset: redirect to `/login?reset=success` (no auto-login).
- Password minimum length: **8 characters** (enforced server-side in `reset-password`).
- Migration must be **purely additive** (`ADD COLUMN` only). Apply to prod via Supabase MCP `apply_migration` (ref `sxuphhdtgqzeacybdosn`); never `prisma migrate deploy`.
- No em/en dashes in customer-facing copy (plain hyphens).
- No rate-limiting, no session invalidation, no Turnstile on this flow (v1 scope).
- No test runner exists; do not add one. Verify each task with `npx tsc --noEmit` and `npm run lint` (must not add new errors in changed files). Full build check in the final task.
- Reuse existing patterns: token = `crypto.randomBytes(32).toString("hex")`; email via `sendEmail` from `src/lib/email.ts`; `hashPassword`/`verifyPassword`/`signToken` from `src/lib/auth.ts`; base URL `process.env.NEXT_PUBLIC_APP_URL`.

---

### Task 1: Schema + additive migration

**Files:**
- Modify: `prisma/schema.prisma` (model `Company`)
- Create: `prisma/migrations/<timestamp>_add_password_reset/migration.sql`

**Interfaces:**
- Produces: `Company.passwordResetToken: string | null` (`@unique`), `Company.passwordResetExpires: DateTime | null`.

- [ ] **Step 1: Add the two fields to `Company`**

In `prisma/schema.prisma`, inside `model Company`, directly after the `emailVerificationToken` line, add:

```prisma
  passwordResetToken   String?   @unique
  passwordResetExpires DateTime?
```

- [ ] **Step 2: Author the additive migration SQL**

Create `prisma/migrations/20260803120000_add_password_reset/migration.sql` with exactly:

```sql
-- Additive: self-serve password reset.
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "passwordResetToken" TEXT;
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "passwordResetExpires" TIMESTAMP(3);
CREATE UNIQUE INDEX IF NOT EXISTS "Company_passwordResetToken_key" ON "Company"("passwordResetToken");
```

- [ ] **Step 3: Regenerate the Prisma client**

Run: `DATABASE_URL="postgresql://user:pass@localhost:5432/db" npx prisma generate`
Expected: "Generated Prisma Client". (Dummy URL is fine; generate does not connect. If `.env.local` exists from `vercel env pull`, its real `DATABASE_URL` is used instead — also fine.)

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS (Prisma types now include the two fields).

- [ ] **Step 5: Apply the additive migration to prod**

Apply via Supabase MCP `apply_migration` (project `sxuphhdtgqzeacybdosn`, name `add_password_reset`) with the three statements from Step 2. Then verify with a `SELECT` on `information_schema.columns` that `passwordResetToken` + `passwordResetExpires` exist on `Company`.

- [ ] **Step 6: Commit**

```bash
git add prisma/schema.prisma prisma/migrations src/generated/prisma
git commit -m "feat: add passwordReset fields to Company (additive)"
```

---

### Task 2: ResetPassword email template

**Files:**
- Create: `src/components/emails/ResetPassword.tsx`
- Reference: `src/components/emails/VerifyEmail.tsx` (mirror its structure/styling)

**Interfaces:**
- Produces: `export function ResetPassword({ companyName, resetUrl }: { companyName: string; resetUrl: string })` — a React email component.

- [ ] **Step 1: Read the reference template**

Open `src/components/emails/VerifyEmail.tsx` and note its exact prop shape, imports, and inline-style structure. The new template must match its look (button, colors, layout) so both emails feel consistent.

- [ ] **Step 2: Create `ResetPassword.tsx`**

Create `src/components/emails/ResetPassword.tsx` mirroring `VerifyEmail.tsx`, changing only the copy and the CTA target:

- Props: `{ companyName: string; resetUrl: string }`.
- Heading: "Reset your password".
- Body: `Hi ${companyName}, we received a request to reset your Qalt password. Click the button below to choose a new one.`
- Primary button labeled "Reset Password" linking to `resetUrl`.
- Fine print: "This link expires in 1 hour. If you didn't request a reset, you can safely ignore this email."
- No em dashes. Match VerifyEmail's inline-style approach exactly (copy its wrapper markup, swap text + href).

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/emails/ResetPassword.tsx
git commit -m "feat: ResetPassword email template"
```

---

### Task 3: forgot-password API route

**Files:**
- Create: `src/app/api/auth/forgot-password/route.ts`
- Reference: `src/app/api/auth/resend-verification/route.ts` (enumeration-protected send pattern)

**Interfaces:**
- Consumes: `Company.passwordResetToken`/`passwordResetExpires` (Task 1); `ResetPassword` (Task 2); `sendEmail` (`src/lib/email.ts`).
- Produces: `POST /api/auth/forgot-password` accepting `{ email }`, always returning `{ success: true }` (200).

- [ ] **Step 1: Create the route**

Create `src/app/api/auth/forgot-password/route.ts`:

```ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { ResetPassword } from "@/components/emails/ResetPassword";
import crypto from "crypto";
import React from "react";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Missing email" }, { status: 400 });

    const company = await prisma.company.findUnique({ where: { email } });

    // Enumeration protection: always report success.
    if (!company) return NextResponse.json({ success: true });

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await prisma.company.update({
      where: { id: company.id },
      data: { passwordResetToken: token, passwordResetExpires: expires },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL!;
    const resetUrl = `${appUrl}/reset-password?token=${token}`;

    const emailResult = await sendEmail({
      to: email,
      subject: "Reset your Qalt password",
      react: React.createElement(ResetPassword, { companyName: company.name, resetUrl }),
    });
    if (!emailResult.success) {
      console.error("[forgot-password] reset email failed to send for", email);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[forgot-password]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add "src/app/api/auth/forgot-password/route.ts"
git commit -m "feat: forgot-password route (enumeration-protected, 1h token)"
```

---

### Task 4: reset-password API route

**Files:**
- Create: `src/app/api/auth/reset-password/route.ts`
- Reference: `src/lib/auth.ts` (`hashPassword`), `src/app/api/auth/verify-email/route.ts` (token lookup pattern)

**Interfaces:**
- Consumes: `Company.passwordResetToken`/`passwordResetExpires` (Task 1); `hashPassword` (`src/lib/auth.ts`).
- Produces: `POST /api/auth/reset-password` accepting `{ token, password }`, returning `{ success: true }` (200) or a 400 with `{ error }`.

- [ ] **Step 1: Create the route**

Create `src/app/api/auth/reset-password/route.ts`:

```ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Invalid or missing reset token." }, { status: 400 });
    }
    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    const company = await prisma.company.findFirst({
      where: { passwordResetToken: token, passwordResetExpires: { gt: new Date() } },
    });
    if (!company) {
      return NextResponse.json(
        { error: "This reset link is invalid or has expired. Please request a new one." },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);
    await prisma.company.update({
      where: { id: company.id },
      data: {
        passwordHash,
        passwordResetToken: null,
        passwordResetExpires: null,
        emailVerified: true,
        emailVerificationToken: null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[reset-password]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add "src/app/api/auth/reset-password/route.ts"
git commit -m "feat: reset-password route (validate token+expiry, set new hash, auto-verify)"
```

---

### Task 5: /forgot-password page

**Files:**
- Create: `src/app/forgot-password/page.tsx`
- Reference: `src/app/register/page.tsx` (visual language, form styles, success-screen pattern)

**Interfaces:**
- Consumes: `POST /api/auth/forgot-password` (Task 3).

- [ ] **Step 1: Create the page**

Create `src/app/forgot-password/page.tsx` as a client component. It renders a single email input and submits to `/api/auth/forgot-password`. Regardless of the response it shows the same confirmation screen (enumeration protection). Match the register page's Tailwind classes for inputs/buttons/cards. Include a "Back to login" link to `/login`.

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Loader2, ArrowRight, MailCheck } from "lucide-react";
import QaltLogo from "@/components/shared/QaltLogo";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const email = String(new FormData(e.currentTarget).get("email") || "");
    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Enumeration protection + resilient UX: show the same screen regardless.
    } finally {
      setSubmittedEmail(email);
      setSent(true);
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-[32px] shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-red-600 px-8 py-10 text-center">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
              <MailCheck size={36} className="text-red-600" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Check your inbox</h1>
          </div>
          <div className="px-8 py-8 text-center space-y-4">
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              If an account exists for{" "}
              <span className="font-black text-slate-900">{submittedEmail}</span>, we&apos;ve sent a password reset link.
              <br />The link expires in 1 hour.
            </p>
            <p className="text-slate-400 text-xs font-medium">Check your spam folder if you don&apos;t see it.</p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all"
            >
              Back to Login <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center"><QaltLogo size="sm" /></div>
        <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 p-8">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Forgot your password?</h2>
          <p className="text-sm font-medium text-slate-500 mb-6">
            Enter your account email and we&apos;ll send you a link to reset it.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="hello@company.com"
                className="w-full pl-14 pr-5 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#1E40AF] transition-all font-semibold text-slate-900 text-sm placeholder:text-slate-400 shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-[0.15em] rounded-2xl transition-all shadow-lg shadow-red-900/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>) : (<>Send reset link <ArrowRight size={16} /></>)}
            </button>
          </form>
          <p className="mt-6 text-center text-sm font-medium text-slate-500">
            Remembered it?{" "}
            <Link href="/login" className="text-red-600 font-bold hover:text-red-700 transition-colors">Back to login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck + lint**

Run: `npx tsc --noEmit` then `npm run lint`
Expected: PASS / no new errors in this file.

- [ ] **Step 3: Commit**

```bash
git add "src/app/forgot-password/page.tsx"
git commit -m "feat: /forgot-password page"
```

---

### Task 6: /reset-password page

**Files:**
- Create: `src/app/reset-password/page.tsx`
- Reference: `src/app/register/page.tsx` (password field with show/hide, styles)

**Interfaces:**
- Consumes: `POST /api/auth/reset-password` (Task 4); reads `token` from the URL query string.

- [ ] **Step 1: Create the page**

Create `src/app/reset-password/page.tsx` as a client component. It reads `token` from the query string via `useSearchParams`, shows two password fields (new + confirm) with show/hide, validates match + min-8 client-side, and POSTs `{ token, password }`. On success → `router.push("/login?reset=success")`. On failure → show the returned error with a link to `/forgot-password`. If `token` is missing entirely, show the invalid-link state immediately. Wrap the `useSearchParams` usage in a `<Suspense>` boundary (Next.js App Router requirement).

```tsx
"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, Loader2, ArrowRight, ShieldAlert } from "lucide-react";
import QaltLogo from "@/components/shared/QaltLogo";

function ResetForm() {
  const router = useRouter();
  const token = useSearchParams().get("token") || "";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("Passwords do not match.");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        router.push("/login?reset=success");
      } else {
        setError(data.error || "Could not reset password.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 p-8 text-center space-y-4">
        <ShieldAlert size={40} className="text-red-600 mx-auto" />
        <h2 className="text-xl font-black text-slate-900">Invalid reset link</h2>
        <p className="text-sm font-medium text-slate-500">This link is missing or malformed. Request a new one.</p>
        <Link href="/forgot-password" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all">
          Request new link <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 p-8">
      <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Set a new password</h2>
      <p className="text-sm font-medium text-slate-500 mb-6">Choose a new password for your account.</p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            placeholder="New password (min. 8 characters)"
            className="w-full pl-14 pr-14 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#1E40AF] transition-all font-semibold text-slate-900 text-sm placeholder:text-slate-400 shadow-sm"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none" aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="relative">
          <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            name="confirm"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            placeholder="Confirm new password"
            className="w-full pl-14 pr-5 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#1E40AF] transition-all font-semibold text-slate-900 text-sm placeholder:text-slate-400 shadow-sm"
          />
        </div>
        {error && (
          <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 rounded-2xl">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
            <p className="text-sm font-semibold text-rose-700">{error}</p>
          </div>
        )}
        <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2.5 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-[0.15em] rounded-2xl transition-all shadow-lg shadow-red-900/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Updating...</>) : (<>Update password <ArrowRight size={16} /></>)}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center"><QaltLogo size="sm" /></div>
        <Suspense fallback={<div className="text-center text-slate-400 text-sm">Loading...</div>}>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck + lint**

Run: `npx tsc --noEmit` then `npm run lint`
Expected: PASS / no new errors in this file.

- [ ] **Step 3: Commit**

```bash
git add "src/app/reset-password/page.tsx"
git commit -m "feat: /reset-password page"
```

---

### Task 7: Login page — link + success banner

**Files:**
- Modify: `src/app/login/page.tsx`

**Interfaces:**
- Consumes: `/forgot-password` (Task 5); reads `?reset=success` from the URL.

- [ ] **Step 1: Read the login page**

Open `src/app/login/page.tsx`. Locate: (a) the password field / the area beside its label, and (b) how it reads query params (if it uses `useSearchParams`, reuse that; if not, add it, and ensure any `useSearchParams` call sits inside a `<Suspense>` boundary per Next.js App Router rules).

- [ ] **Step 2: Add the "Forgot password?" link**

Near the password field label (mirror wherever the register link sits), add:

```tsx
<Link href="/forgot-password" className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors">
  Forgot password?
</Link>
```

Ensure `Link` is imported (it already is on this page — confirm).

- [ ] **Step 3: Add the reset-success banner**

When the URL has `?reset=success`, render a success notice above the form:

```tsx
{resetSuccess && (
  <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl mb-5">
    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
    <p className="text-sm font-semibold text-emerald-700">Password updated. Sign in with your new password.</p>
  </div>
)}
```

Derive `resetSuccess` from the existing search-params reader (e.g. `searchParams.get("reset") === "success"`). If the page had no search-params reader, add one inside the existing `<Suspense>` boundary (or wrap the form section in `<Suspense>`), consistent with how `/reset-password` does it.

- [ ] **Step 4: Typecheck + lint**

Run: `npx tsc --noEmit` then `npm run lint`
Expected: PASS / no new errors.

- [ ] **Step 5: Commit**

```bash
git add "src/app/login/page.tsx"
git commit -m "feat: login page forgot-password link + reset-success banner"
```

---

### Task 8: Full verification + deploy

**Files:** none (operational)

- [ ] **Step 1: Full production build**

Run: `export DATABASE_URL="$(grep '^DATABASE_URL=' .env.local | cut -d= -f2- | sed 's/^\"//; s/\"$//')" && npx prisma generate >/dev/null && npx next build`
Expected: build succeeds (exit 0). If no `.env.local` exists, first run `npx vercel env pull` (CLI is authed as `keenwayllc`, project linked).

- [ ] **Step 2: Manual flow check (local `npm run dev`)**

1. `/login` shows "Forgot password?" → click → `/forgot-password` renders.
2. Submit a known email → confirmation screen; the reset email arrives (check Resend/inbox).
3. Click the emailed link → `/reset-password?token=…`; set a valid new password → redirected to `/login?reset=success` with the green banner.
4. Log in with the new password → success. Old password → rejected.
5. Reuse the same link → invalid/expired error with a "request new link" path.
6. Submit an unknown email at `/forgot-password` → identical confirmation (no enumeration leak).
7. Reset a never-verified test account → confirm `emailVerified` is now true (query the DB) and it can log in.

- [ ] **Step 3: Confirm prod migration is applied**

Verify (Supabase MCP `execute_sql`) that `Company.passwordResetToken` + `passwordResetExpires` exist in prod (applied in Task 1). If not, apply now before deploying.

- [ ] **Step 4: Deploy**

```bash
git push origin main
```

Vercel auto-deploys `main`. Since the prod columns already exist, the new build reads/writes them cleanly.

- [ ] **Step 5: Prod smoke check**

On the live site: `/login` shows "Forgot password?"; run one real reset end-to-end with a throwaway/owned email and confirm the new password logs in.

---

## Self-Review

- **Spec coverage:** data model (T1), ResetPassword email (T2), forgot-password route + enumeration (T3), reset-password route + validation + auto-verify + single-use (T4), /forgot-password page (T5), /reset-password page + expired-link handling (T6), login link + success banner (T7), build/deploy/prod-migration (T8). All spec sections mapped.
- **Placeholders:** none — every route/page/email has full code; class strings are copied from existing pages by reference where noted.
- **Type consistency:** `passwordResetToken: string | null`, `passwordResetExpires: DateTime | null` (T1) used identically in T3 (set) and T4 (query `{ gt: new Date() }` + clear). `ResetPassword({ companyName, resetUrl })` defined in T2, called in T3 with those exact props. Routes accept `{ email }` (T3) and `{ token, password }` (T4), matching the pages in T5/T6.
