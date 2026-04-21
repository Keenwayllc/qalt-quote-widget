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
      <div className="bg-white dark:bg-[#1e1e1e] rounded-none border border-slate-200 dark:border-white/[0.06] shadow-sm dark:shadow-none px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-none bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
            <CheckCircle size={18} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Unlimited Quotes</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{used} sent this month · No limit on your {plan.charAt(0) + plan.slice(1).toLowerCase()} plan</p>
          </div>
        </div>
      </div>
    );
  }

  const remaining = Math.max(0, limit - used);
  const pct = Math.min(100, Math.round((used / limit) * 100));

  const isExhausted = remaining === 0;
  const isWarning = remaining <= 5 && remaining > 0;

  const barColor = isExhausted
    ? "bg-red-500"
    : isWarning
    ? "bg-amber-400"
    : "bg-red-500";

  const bgColor = isExhausted
    ? "border-red-200 bg-red-50 dark:border-red-500/20 dark:bg-red-500/5"
    : isWarning
    ? "border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/5"
    : "bg-white dark:bg-[#1e1e1e] border-slate-200 dark:border-white/[0.06]";

  return (
    <div className={`rounded-none border shadow-sm dark:shadow-none px-6 py-4 ${bgColor}`}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-none flex items-center justify-center ${
            isExhausted ? "bg-red-100 dark:bg-red-500/15" : isWarning ? "bg-amber-100 dark:bg-amber-500/15" : "bg-red-50 dark:bg-red-500/10"
          }`}>
            {isExhausted || isWarning
              ? <AlertTriangle size={18} className={isExhausted ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400"} />
              : <Zap size={18} className="text-red-600 dark:text-red-400" />}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {isExhausted
                ? "Monthly quota reached"
                : `${remaining} quote${remaining === 1 ? "" : "s"} remaining this month`}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {used} of {limit} used · Resets on the 1st of next month
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className={`text-2xl font-black ${isExhausted ? "text-red-600 dark:text-red-400" : isWarning ? "text-amber-600 dark:text-amber-400" : "text-slate-900 dark:text-slate-100"}`}>
            {used}<span className="text-sm font-semibold text-slate-400 dark:text-slate-500"> / {limit}</span>
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-slate-100 dark:bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Status message */}
      {isExhausted && (
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs font-semibold text-red-700 dark:text-red-400">
            Your widget has paused. Customers can&apos;t request quotes until your quota resets or you upgrade.
          </p>
          <Link
            href="/dashboard/billing"
            className="ml-4 shrink-0 text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-none transition-colors"
          >
            Upgrade now
          </Link>
        </div>
      )}

      {isWarning && (
        <p className="mt-3 text-xs font-semibold text-amber-700 dark:text-amber-400">
          Almost out! Once you hit 25, your widget will pause.{" "}
          <Link href="/dashboard/billing" className="underline hover:text-amber-900 dark:hover:text-amber-300">Upgrade to Pro</Link> for unlimited quotes.
        </p>
      )}
    </div>
  );
}
