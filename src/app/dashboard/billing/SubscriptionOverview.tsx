"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Gauge, Sparkles } from "lucide-react";

export default function SubscriptionOverview({
  plan,
  monthlyQuotes,
  limit,
}: {
  plan: string;
  monthlyQuotes: number;
  limit: number | "unlimited";
}) {
  const unlimited = limit === "unlimited";
  const pct = unlimited ? 18 : Math.min(100, Math.max(4, (monthlyQuotes / Math.max(limit, 1)) * 100));

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#080B14] p-6 text-white shadow-[0_30px_70px_-38px_rgba(8,11,20,.75)] sm:p-8"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 bottom-[-45%] h-72 w-72 rounded-full bg-red-600/20 blur-[90px]" />
        <div className="absolute -right-20 top-[-35%] h-64 w-64 rounded-full bg-amber-500/10 blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
      </div>

      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white/65">
            <Sparkles size={12} className="text-red-400" />
            Qalt Subscription
          </div>
          <p className="mb-2 text-sm font-semibold text-white/45">Current plan</p>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-[800] tracking-[-0.04em] sm:text-4xl">{plan}</h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-300">
              <CheckCircle2 size={12} /> Active
            </span>
          </div>
          <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-white/45">
            Your plan controls quote volume, forms, branding, analytics, operations tools, and payment features. Change plans anytime.
          </p>
        </div>

        <div className="rounded-[22px] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-sm sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-white/35">Quotes this month</p>
              <p className="mt-1 text-3xl font-[800] tracking-[-0.035em]">
                {monthlyQuotes}
                <span className="ml-2 text-sm font-semibold text-white/35">
                  {unlimited ? "Unlimited" : `/ ${limit}`}
                </span>
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/45">
              <Gauge size={19} />
            </div>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-red-500"
            />
          </div>
          <p className="mt-3 text-xs font-medium text-white/35">
            {unlimited ? "No monthly quote ceiling on this plan." : `${Math.max(0, limit - monthlyQuotes)} quotes remaining this month.`}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
