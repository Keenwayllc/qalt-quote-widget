import Link from "next/link";
import { Zap, AlertTriangle, CheckCircle } from "lucide-react";

interface QuotaBarProps {
  used: number;
  limit: number | "unlimited";
  plan: string;
}

export default function QuotaBar({ used, limit, plan }: QuotaBarProps) {
  if (limit === "unlimited") {
    return (
      <div className="bg-white dark:bg-[#141414] border border-[#e2e4e9] dark:border-white/[0.07] px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 border border-emerald-100 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
            <CheckCircle size={17} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#22252b] dark:text-white">Unlimited quotes</p>
            <p className="mt-0.5 text-xs text-[#777e89] dark:text-slate-400">
              {used} sent this month · No monthly cap on your {plan.charAt(0) + plan.slice(1).toLowerCase()} plan
            </p>
          </div>
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">Healthy</span>
      </div>
    );
  }

  const remaining = Math.max(0, limit - used);
  const pct = Math.min(100, Math.round((used / limit) * 100));
  const isExhausted = remaining === 0;
  const isWarning = remaining <= 5 && remaining > 0;
  const statusColor = isExhausted ? "#df1731" : isWarning ? "#d97706" : "#df1731";

  return (
    <div className={`bg-white dark:bg-[#141414] border px-5 sm:px-6 py-5 ${isExhausted ? "border-red-200 dark:border-red-500/20" : isWarning ? "border-amber-200 dark:border-amber-500/20" : "border-[#e2e4e9] dark:border-white/[0.07]"}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-9 h-9 border flex items-center justify-center shrink-0 ${isExhausted ? "border-red-100 bg-red-50 dark:border-red-500/20 dark:bg-red-500/10" : isWarning ? "border-amber-100 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/10" : "border-[#f4d7dc] bg-[#fff4f5] dark:border-red-500/20 dark:bg-red-500/10"}`}>
            {isExhausted || isWarning ? (
              <AlertTriangle size={17} className={isExhausted ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"} />
            ) : (
              <Zap size={17} className="text-[#df1731] dark:text-red-400" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#22252b] dark:text-white">
              {isExhausted ? "Monthly quote limit reached" : `${remaining} quote${remaining === 1 ? "" : "s"} remaining this month`}
            </p>
            <p className="mt-0.5 text-xs text-[#777e89] dark:text-slate-400">
              {used} of {limit} used · Resets on the 1st
            </p>
          </div>
        </div>
        <div className="sm:text-right shrink-0">
          <span className="text-2xl font-extrabold tracking-[-0.03em] text-[#22252b] dark:text-white">{used}</span>
          <span className="text-sm font-medium text-[#9aa0aa]"> / {limit}</span>
        </div>
      </div>

      <div className="mt-4 h-1.5 w-full bg-[#eef0f3] dark:bg-white/[0.06] overflow-hidden">
        <div className="h-full transition-[width] duration-500" style={{ width: `${pct}%`, backgroundColor: statusColor }} />
      </div>

      {isExhausted && (
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-red-100 dark:border-red-500/15 pt-4">
          <p className="text-xs leading-relaxed text-red-700 dark:text-red-400">
            Your widget is paused until the quota resets or the plan is upgraded.
          </p>
          <Link href="/dashboard/billing" className="shrink-0 text-xs font-semibold text-white bg-[#df1731] hover:bg-[#c9142b] px-3.5 py-2 transition-colors">
            Upgrade plan
          </Link>
        </div>
      )}

      {isWarning && (
        <p className="mt-3 text-xs text-amber-700 dark:text-amber-400">
          You&apos;re close to the monthly limit. <Link href="/dashboard/billing" className="font-semibold underline underline-offset-2">View plan options</Link>
        </p>
      )}
    </div>
  );
}
