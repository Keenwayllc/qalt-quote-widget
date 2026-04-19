"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Loader2, CheckCircle, Zap, Shield, BarChart3, MailCheck } from "lucide-react";
import QaltLogo from "@/components/shared/QaltLogo";

const features = [
  { icon: Zap, title: "Instant Quotes", desc: "Add a real-time delivery quote widget to your site in minutes." },
  { icon: Shield, title: "Built-in Plan Controls", desc: "Usage limits, billing, and upgrades are handled for you." },
  { icon: BarChart3, title: "Lead Tracking", desc: "Every quote request is saved so your team can follow up fast." },
];

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const name = formData.get("name");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });

      if (res.ok) {
        setRegisteredEmail(String(email));
        setRegistered(true);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to register");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md bg-white rounded-[32px] shadow-xl border border-slate-100 overflow-hidden"
        >
          <div className="bg-red-600 px-8 py-10 text-center">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
              <MailCheck size={36} className="text-red-600" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Check your inbox</h1>
            <p className="text-red-200 text-sm font-medium mt-2">One more step to activate your account</p>
          </div>
          <div className="px-8 py-8 text-center space-y-4">
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              We sent a confirmation link to{" "}
              <span className="font-black text-slate-900">{registeredEmail}</span>.
              <br />Click it to confirm your email and get started.
            </p>
            <p className="text-slate-400 text-xs font-medium">
              The link expires in 24 hours. Check your spam folder if you don&apos;t see it.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all"
            >
              Back to Login <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 overflow-hidden bg-slate-900">
        <Image
          src="/images/register-bg.png"
          alt="Delivery Logistics"
          fill
          className="object-cover object-center z-0 opacity-80 mix-blend-luminosity"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/40 z-0" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1E40AF]/60 to-transparent z-0 mix-blend-multiply" />

        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-3 w-fit group">
          <ArrowLeft size={16} className="text-white/40 group-hover:text-white/70 group-hover:-translate-x-0.5 transition-all shrink-0" />
          <QaltLogo size="xl" linked={false} white />
        </Link>

        {/* Center content */}
        <div className="relative z-10 space-y-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Start free. No card required.</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight leading-tight">
              Turn visitors into<br />
              <span className="text-red-200">quoted delivery requests.</span>
            </h1>
            <p className="text-red-200/80 font-medium text-sm leading-relaxed max-w-xs">
              Qalt gives your business an embeddable quote calculator that prices jobs fast and captures delivery leads automatically.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                className="flex items-start gap-4"
              >
                <div className="p-2 bg-white/10 rounded-xl border border-white/15 shrink-0">
                  <f.icon size={16} className="text-red-200" />
                </div>
                <div>
                  <p className="text-sm font-black text-white">{f.title}</p>
                  <p className="text-xs text-red-200/70 font-medium mt-0.5">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom social proof */}
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
            Built for delivery companies
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 bg-slate-50">
        {/* Mobile logo */}
        <div className="lg:hidden mb-10 flex justify-center">
          <QaltLogo size="sm" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Create your account
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Already have one?{" "}
              <Link href="/login" className="text-red-600 font-bold hover:text-red-700 transition-colors">
                Sign in instead
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Company Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                Company Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="organization"
                  required
                  placeholder="Acme Deliveries"
                  className="w-full pl-14 pr-5 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#1E40AF] transition-all font-semibold text-slate-900 text-sm placeholder:text-slate-400 shadow-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="hello@company.com"
                  className="w-full pl-14 pr-5 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#1E40AF] transition-all font-semibold text-slate-900 text-sm placeholder:text-slate-400 shadow-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  placeholder="Min. 8 characters"
                  className="w-full pl-14 pr-14 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#1E40AF] transition-all font-semibold text-slate-900 text-sm placeholder:text-slate-400 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 rounded-2xl"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                <p className="text-sm font-semibold text-rose-700">{error}</p>
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-sm uppercase tracking-[0.15em] rounded-2xl transition-all shadow-lg shadow-red-900/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Creating account...</>
              ) : (
                <>Create Account <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          {/* Feature checklist */}
          <div className="mt-8 pt-8 border-t border-slate-200 space-y-2.5">
            {["Free to start, no credit card required", "Widget live on your site in under 10 minutes", "Cancel anytime"].map((text) => (
              <div key={text} className="flex items-center gap-2.5">
                <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                <span className="text-xs font-medium text-slate-500">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
