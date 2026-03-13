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
  variant?: "blue" | "emerald" | "amber" | "indigo";
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
    blue: "from-blue-500/10 to-blue-600/5 text-blue-700 border-blue-100",
    emerald: "from-emerald-500/10 to-emerald-600/5 text-emerald-700 border-emerald-100",
    amber: "from-amber-500/10 to-amber-600/5 text-amber-700 border-amber-100",
    indigo: "from-indigo-500/10 to-indigo-600/5 text-indigo-700 border-indigo-100",
  };

  const iconVariants = {
    blue: "bg-blue-100 text-blue-600",
    emerald: "bg-emerald-100 text-emerald-600",
    amber: "bg-amber-100 text-amber-600",
    indigo: "bg-indigo-100 text-indigo-600",
  };

  return (
    <div className={`relative overflow-hidden bg-white p-6 rounded-2xl border ${variants[variant].split(' ')[4]} shadow-sm transition-all hover:shadow-md group`}>
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-linear-to-br ${variants[variant].split(' ').slice(0, 2).join(' ')} opacity-50`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2.5 rounded-xl ${iconVariants[variant]} transition-transform group-hover:scale-110`}>
            {icon}
          </div>
          {trend && (
            <div className={`text-xs font-bold px-2 py-1 rounded-full ${trend.isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
              {trend.isPositive ? '+' : '-'}{trend.value}%
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-tight mb-1">{title}</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p>
          </div>
          {description && (
            <p className="text-xs text-slate-400 mt-2 font-medium">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
