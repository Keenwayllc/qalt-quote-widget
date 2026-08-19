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
