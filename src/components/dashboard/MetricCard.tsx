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
  const accents = {
    blue: "text-[#df1731] bg-[#fff4f5] border-[#f4d7dc] dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400",
    emerald: "text-emerald-700 bg-emerald-50 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400",
    amber: "text-amber-700 bg-amber-50 border-amber-100 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400",
    rose: "text-[#df1731] bg-[#fff4f5] border-[#f4d7dc] dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400",
  };

  return (
    <div className="group bg-white dark:bg-[#141414] border border-[#e2e4e9] dark:border-white/[0.07] p-5 sm:p-6 transition-colors hover:border-[#cfd3da] dark:hover:border-white/[0.12]">
      <div className="flex items-start justify-between gap-4">
        <div className={`w-10 h-10 border flex items-center justify-center ${accents[variant]}`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-[11px] font-semibold px-2 py-1 border ${trend.isPositive ? "text-emerald-700 bg-emerald-50 border-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20" : "text-rose-700 bg-rose-50 border-rose-100 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/20"}`}>
            {trend.isPositive ? "+" : "-"}{trend.value}%
          </span>
        )}
      </div>

      <div className="mt-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a919d] dark:text-slate-500">
          {title}
        </p>
        <p className="mt-2 text-[32px] leading-none font-extrabold tracking-[-0.035em] text-[#22252b] dark:text-white">
          {value}
        </p>
        {description && (
          <p className="mt-3 text-xs leading-relaxed text-[#777e89] dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
