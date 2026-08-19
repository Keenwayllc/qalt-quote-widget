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
