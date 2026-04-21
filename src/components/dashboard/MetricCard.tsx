"use client";

import type { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "blue" | "emerald" | "amber" | "rose";
}

export default function MetricCard({
  title,
  value,
  description,
  icon,
  trend,
  variant = "blue",
}: MetricCardProps) {
  const variants = {
    blue:    "from-red-500/10 to-red-600/5 text-red-700 border-red-100 dark:from-red-500/5 dark:to-red-900/10 dark:border-white/5",
    emerald: "from-emerald-500/10 to-emerald-600/5 text-emerald-700 border-emerald-100 dark:from-emerald-500/5 dark:to-emerald-900/10 dark:border-white/5",
    amber:   "from-amber-500/10 to-amber-600/5 text-amber-700 border-amber-100 dark:from-amber-500/5 dark:to-amber-900/10 dark:border-white/5",
    rose:    "from-rose-500/10 to-red-600/5 text-red-700 border-red-100 dark:from-rose-500/5 dark:to-rose-900/10 dark:border-white/5",
  };

  const iconVariants = {
    blue:    "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400",
    emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
    amber:   "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
    rose:    "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400",
  };

  return (
    <div className={`relative overflow-hidden bg-white dark:bg-[#1e1e1e] p-6 rounded-none border border-slate-200/60 dark:border-white/[0.06] shadow-sm dark:shadow-none transition-all hover:shadow-md dark:hover:border-white/10 group`}>
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-linear-to-br ${variants[variant]} opacity-50 dark:opacity-30`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2.5 rounded-none ${iconVariants[variant]} transition-transform group-hover:scale-110`}>
            {icon}
          </div>
          {trend && (
            <div className={`text-xs font-bold px-2 py-1 rounded-full ${trend.isPositive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400'}`}>
              {trend.isPositive ? '+' : '-'}{trend.value}%
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight mb-1">{title}</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{value}</p>
          </div>
          {description && (
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-medium">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
