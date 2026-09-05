"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import QaltLogo from "@/components/shared/QaltLogo";

function ProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.07] p-3 shadow-[0_35px_90px_-35px_rgba(0,0,0,.8)] backdrop-blur-xl">
      <div className="overflow-hidden rounded-[24px] bg-[#f7f8fa]">
        <div className="flex h-10 items-center gap-1.5 border-b border-slate-200 bg-white px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <div className="ml-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[8px] font-semibold text-slate-400">qalt.site/dashboard</div>
        </div>

        <div className="grid grid-cols-[112px_1fr] min-h-[350px]">
          <aside className="border-r border-slate-200 bg-white p-3">
            <div className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">Merchant Console</div>
            <div className="mt-3 space-y-1.5">
              {[
                ["Overview", true],
                ["Quotes", false],
                ["Analytics", false],
                ["My Forms", false],
              ].map(([label, active]) => (
                <div key={String(label)} className={`rounded-lg px-2.5 py-2 text-[9px] font-semibold ${active ? "bg-[#df1731] text-white" : "text-slate-500"}`}>
                  {label}
                </div>
              ))}
            </div>
          </aside>

          <div className="p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#df1731]">Overview</div>
                <div className="mt-1 text-xl font-bold tracking-[-0.03em] text-slate-950">Your quote flow, in one place.</div>
              </div>
              <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-[8px] font-bold text-emerald-700">LIVE</div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[["Quotes", "128"], ["Booked", "41"], ["Avg. quote", "$142"]].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                  <div className="text-[7px] font-bold uppercase tracking-wider text-slate-400">{label}</div>
                  <div className="mt-1 text-base font-bold text-slate-950">{value}</div>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-slate-400">Latest booking</div>
                  <div className="mt-1 text-sm font-bold text-slate-900">North Hollywood → Downtown LA</div>
                </div>
                <div className="text-sm font-bold text-slate-950">$127</div>
              </div>

              <div className="relative mt-4 h-28 overflow-hidden rounded-xl bg-[#f7f8fa]">
                <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "linear-gradient(#e4e7eb 1px,transparent 1px),linear-gradient(90deg,#e4e7eb 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 320 112" aria-hidden="true">
                  <path d="M38 22 V52 Q38 61 48 61 H140 Q152 61 152 73 V87 Q152 96 164 96 H275" fill="none" stroke="#df1731" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="38" cy="22" r="6" fill="white" stroke="#df1731" strokeWidth="3" />
                  <circle cx="275" cy="96" r="7" fill="#df1731" />
                  <circle cx="275" cy="96" r="2.5" fill="white" />
                </svg>
                <div className="absolute left-3 bottom-3 rounded-full border border-slate-200 bg-white/90 px-2.5 py-1 text-[8px] font-semibold text-slate-600">20.8 mi</div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[9px] font-medium text-slate-500">
                <span className="inline-flex items-center gap-1.5"><MapPin size={10} /> Route verified</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-700"><Check size={10} /> Paid & booked</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const resetSuccess = searchParams.get("reset") === "success";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [lastEmail, setLastEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSent, setResendSent] = useState(false);
  const isVerificationError = error.toLowerCase().includes("verify your email");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password");
    setLastEmail(email);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) window.location.href = redirectTo;
      else {
        const data = await res.json();
        setError(data.error || "Invalid login credentials");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

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
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-300">Merchant Console</div>
            <h1 className="mt-4 max-w-lg text-4xl font-bold leading-[1.02] tracking-[-0.045em] text-white xl:text-5xl">
              Pick up exactly where your delivery business left off.
            </h1>
            <p className="mt-4 max-w-md text-sm font-medium leading-6 text-white/55">
              Quotes, bookings, payments, customer activity, and your live widget are waiting in one clean workspace.
            </p>
          </div>
          <ProductPreview />
        </div>

        <div className="relative z-10 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-semibold text-white/45">
          <span className="inline-flex items-center gap-1.5"><ShieldCheck size={12} /> Secure account access</span>
          <span className="inline-flex items-center gap-1.5"><BarChart3 size={12} /> Live quote activity</span>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 lg:px-12">
        <div className="absolute inset-x-0 top-0 h-px bg-slate-200 lg:hidden" />
        <div className="w-full max-w-[440px]">
          <div className="mb-10 flex items-center justify-between lg:hidden">
            <Link href="/" aria-label="Back to Qalt homepage"><QaltLogo size="sm" /></Link>
            <Link href="/register" className="text-sm font-semibold text-[#df1731]">Create account</Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}>
            <div className="mb-8">
              <div className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#df1731]">Welcome back</div>
              <h2 className="mt-3 text-[34px] font-bold leading-tight tracking-[-0.04em] text-slate-950">Sign in to Qalt</h2>
              <p className="mt-2 text-sm font-medium text-slate-500">
                New here? <Link href="/register" className="font-semibold text-[#df1731] transition hover:text-red-700">Create an account</Link>
              </p>
            </div>

            {resetSuccess && (
              <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                Password updated. Sign in with your new password.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Email address</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" className="h-13 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-[15px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-900/5" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</label>
                  <Link href="/forgot-password" className="text-xs font-semibold text-[#df1731] hover:text-red-700">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required placeholder="Enter your password" className="h-13 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-12 text-[15px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-900/5" />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3.5">
                  <p className="text-sm font-medium text-rose-800">{error}</p>
                  {isVerificationError && (
                    <button type="button" disabled={resendLoading || resendSent} onClick={async () => {
                      setResendLoading(true);
                      await fetch("/api/auth/resend-verification", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: lastEmail }) });
                      setResendLoading(false);
                      setResendSent(true);
                    }} className="mt-2 text-xs font-semibold text-[#df1731] underline disabled:opacity-50">
                      {resendSent ? "Confirmation email sent" : resendLoading ? "Sending..." : "Resend confirmation email"}
                    </button>
                  )}
                </motion.div>
              )}

              <button type="submit" disabled={loading} className="group flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-[#df1731] px-5 text-sm font-bold text-white shadow-[0_12px_30px_-14px_rgba(223,23,49,.75)] transition hover:bg-[#c9142b] active:scale-[.99] disabled:cursor-not-allowed disabled:opacity-55">
                {loading ? <><Loader2 size={17} className="animate-spin" /> Signing in...</> : <>Sign in <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" /></>}
              </button>
            </form>

            <div className="mt-8 border-t border-slate-200 pt-5 text-center text-[11px] font-medium leading-5 text-slate-400">
              By signing in, you agree to our <Link href="/legal/terms" className="text-slate-600 hover:text-slate-900">Terms</Link> and <Link href="/legal/privacy" className="text-slate-600 hover:text-slate-900">Privacy Policy</Link>.
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
