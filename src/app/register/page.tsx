"use client";

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MailCheck,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import QaltLogo from "@/components/shared/QaltLogo";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function ProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.07] p-3 shadow-[0_35px_90px_-35px_rgba(0,0,0,.8)] backdrop-blur-xl">
      <div className="overflow-hidden rounded-[24px] bg-[#f7f8fa]">
        <div className="flex h-10 items-center gap-1.5 border-b border-slate-200 bg-white px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <div className="ml-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[8px] font-semibold text-slate-400">yourcompany.com/quote</div>
        </div>

        <div className="grid min-h-[350px] grid-cols-[1.05fr_.95fr] gap-0">
          <div className="border-r border-slate-200 bg-white p-5">
            <div className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#df1731]">Delivery Quote</div>
            <div className="mt-2 text-xl font-bold tracking-[-0.03em] text-slate-950">Turn delivery details into a price.</div>
            <div className="mt-5 space-y-3">
              {[
                ["Pickup", "North Hollywood, CA"],
                ["Dropoff", "Downtown Los Angeles, CA"],
                ["Pickup time", "Today · 2:30 PM"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-slate-200 bg-[#fafbfc] px-3 py-2.5">
                  <div className="text-[7px] font-bold uppercase tracking-wider text-slate-400">{label}</div>
                  <div className="mt-1 text-[9px] font-semibold text-slate-700">{value}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-[#df1731] px-4 py-3 text-center text-[9px] font-bold text-white">Get instant quote</div>
          </div>

          <div className="p-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[7px] font-bold uppercase tracking-wider text-slate-400">Estimated total</div>
                  <div className="mt-1 text-2xl font-bold tracking-[-0.04em] text-slate-950">$127.00</div>
                </div>
                <div className="rounded-full bg-emerald-50 px-2 py-1 text-[7px] font-bold text-emerald-700">20.8 MI</div>
              </div>

              <div className="relative mt-4 h-28 overflow-hidden rounded-xl bg-[#f7f8fa]">
                <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "linear-gradient(#e4e7eb 1px,transparent 1px),linear-gradient(90deg,#e4e7eb 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 220 112" aria-hidden="true">
                  <path d="M28 20 V50 Q28 58 38 58 H96 Q108 58 108 70 V88 Q108 96 120 96 H191" fill="none" stroke="#df1731" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="28" cy="20" r="6" fill="white" stroke="#df1731" strokeWidth="3" />
                  <circle cx="191" cy="96" r="7" fill="#df1731" />
                  <circle cx="191" cy="96" r="2.5" fill="white" />
                </svg>
              </div>

              <div className="mt-4 space-y-2 text-[8px] font-medium text-slate-500">
                <div className="flex justify-between"><span>Base + mileage</span><span className="font-semibold text-slate-800">$102.00</span></div>
                <div className="flex justify-between"><span>Inside delivery</span><span className="font-semibold text-slate-800">$25.00</span></div>
              </div>
              <div className="mt-3 rounded-xl bg-slate-950 px-3 py-2.5 text-center text-[9px] font-bold text-white">Pay &amp; Book</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [emailSent, setEmailSent] = useState(true);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResend = async () => {
    setResending(true);
    try {
      await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: registeredEmail }),
      });
    } finally {
      setResending(false);
      setResent(true);
      setTimeout(() => setResent(false), 5000);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const name = formData.get("name");
    const password = formData.get("password");
    const turnstileToken = formData.get("cf-turnstile-response");

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setError("Please complete the \"I am human\" check below.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password, turnstileToken }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setRegisteredEmail(String(email));
        setEmailSent(data.emailSent !== false);
        setRegistered(true);
      } else {
        setError(data.error || "Failed to register");
        window.turnstile?.reset();
      }
    } catch {
      setError("An unexpected error occurred.");
      window.turnstile?.reset();
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f8fa] px-5 py-10">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} className="w-full max-w-[470px]">
          <Link href="/" className="mb-8 flex justify-center"><QaltLogo size="sm" /></Link>
          <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_24px_70px_-38px_rgba(15,23,42,.35)] sm:p-9">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-[#df1731]">
              <MailCheck size={27} />
            </div>
            <div className="mt-5 text-center">
              <div className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#df1731]">Account created</div>
              <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-slate-950">Check your inbox</h1>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-500">
                We sent a confirmation link to <span className="font-semibold text-slate-900">{registeredEmail}</span>. Confirm your email to open your Qalt workspace.
              </p>
            </div>

            {!emailSent && (
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3.5">
                <AlertTriangle size={17} className="mt-0.5 shrink-0 text-amber-600" />
                <p className="text-xs font-medium leading-5 text-amber-800">Your account was created, but the confirmation email did not send. Try resending it below.</p>
              </div>
            )}

            <div className="mt-6 grid gap-3">
              <button onClick={handleResend} disabled={resending || resent} className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-55">
                {resending ? <><Loader2 size={15} className="animate-spin" /> Sending...</> : resent ? <><CheckCircle size={15} className="text-emerald-500" /> Email sent</> : <><RefreshCw size={15} /> Resend confirmation email</>}
              </button>
              <Link href="/login" className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-slate-950 text-sm font-bold text-white transition hover:bg-slate-800">Back to sign in <ArrowRight size={15} /></Link>
            </div>
            <p className="mt-5 text-center text-[11px] font-medium text-slate-400">Confirmation links expire after 24 hours.</p>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-slate-950 lg:grid lg:grid-cols-[1.04fr_.96fr]">
      <section className="relative hidden min-h-screen overflow-hidden bg-[#17191e] px-10 py-9 lg:flex lg:flex-col xl:px-14 xl:py-11">
        <div className="absolute -left-32 top-12 h-80 w-80 rounded-full bg-[#df1731]/20 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-white/10 blur-[120px]" />

        <Link href="/" className="relative z-10 inline-flex w-fit items-center gap-3 text-white/70 transition hover:text-white">
          <ArrowLeft size={15} />
          <QaltLogo size="xl" linked={false} white />
        </Link>

        <div className="relative z-10 my-auto py-10">
          <div className="mb-8 max-w-xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-red-300"><Sparkles size={12} /> Start free</div>
            <h1 className="mt-4 max-w-lg text-4xl font-bold leading-[1.02] tracking-[-0.045em] text-white xl:text-5xl">Give customers a cleaner path from delivery details to booked job.</h1>
            <p className="mt-4 max-w-md text-sm font-medium leading-6 text-white/55">Create your widget, set your pricing, embed it on your site, and manage every quote from one place.</p>
          </div>
          <ProductPreview />
        </div>

        <div className="relative z-10 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-semibold text-white/45">
          <span className="inline-flex items-center gap-1.5"><Check size={12} /> No card required</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck size={12} /> Secure signup</span>
          <span className="inline-flex items-center gap-1.5"><BarChart3 size={12} /> Quote tracking included</span>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 lg:px-12">
        <div className="absolute inset-x-0 top-0 h-px bg-slate-200 lg:hidden" />
        <div className="w-full max-w-[440px]">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Link href="/" aria-label="Back to Qalt homepage"><QaltLogo size="sm" /></Link>
            <Link href="/login" className="text-sm font-semibold text-[#df1731]">Sign in</Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}>
            <div className="mb-7">
              <div className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#df1731]">Create your workspace</div>
              <h2 className="mt-3 text-[34px] font-bold leading-tight tracking-[-0.04em] text-slate-950">Start using Qalt</h2>
              <p className="mt-2 text-sm font-medium text-slate-500">Already have an account? <Link href="/login" className="font-semibold text-[#df1731] hover:text-red-700">Sign in</Link></p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4.5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">Company name</label>
                <div className="relative">
                  <Building2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input id="name" name="name" type="text" autoComplete="organization" required placeholder="Acme Deliveries" className="h-13 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-[15px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-900/5" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Work email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" className="h-13 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-[15px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-900/5" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" required minLength={8} placeholder="At least 8 characters" className="h-13 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-12 text-[15px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-900/5" />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3.5 text-sm font-medium text-rose-800">{error}</motion.div>
              )}

              {TURNSTILE_SITE_KEY && (
                <>
                  <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
                  <div className="cf-turnstile flex justify-center rounded-2xl border border-slate-200 bg-white py-2" data-sitekey={TURNSTILE_SITE_KEY} data-theme="light" />
                </>
              )}

              <button type="submit" disabled={loading} className="group flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-[#df1731] px-5 text-sm font-bold text-white shadow-[0_12px_30px_-14px_rgba(223,23,49,.75)] transition hover:bg-[#c9142b] active:scale-[.99] disabled:cursor-not-allowed disabled:opacity-55">
                {loading ? <><Loader2 size={17} className="animate-spin" /> Creating account...</> : <>Create account <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" /></>}
              </button>
            </form>

            <div className="mt-6 grid grid-cols-1 gap-2 text-[11px] font-medium text-slate-500 sm:grid-cols-3">
              {["No card required", "Fast setup", "Cancel anytime"].map((item) => <div key={item} className="flex items-center gap-1.5"><CheckCircle size={13} className="text-emerald-500" /> {item}</div>)}
            </div>

            <div className="mt-6 border-t border-slate-200 pt-5 text-center text-[11px] font-medium leading-5 text-slate-400">
              By creating an account, you agree to our <Link href="/legal/terms" className="text-slate-600 hover:text-slate-900">Terms</Link> and <Link href="/legal/privacy" className="text-slate-600 hover:text-slate-900">Privacy Policy</Link>.
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
