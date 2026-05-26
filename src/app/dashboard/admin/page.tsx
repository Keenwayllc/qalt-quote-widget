import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Shield, Building2, FileText, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

function fmtDate(d: Date | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function planBadge(plan: string): string {
  switch (plan) {
    case "ENTERPRISE":
      return "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300";
    case "PRO":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300";
    default:
      return "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300";
  }
}

export default async function AdminPage() {
  const me = await getCurrentCompany();
  if (!me.isAdmin) notFound();

  const [companies, quoteCounts, totalQuotes] = await Promise.all([
    prisma.company.findMany({
      orderBy: { lastLoginAt: { sort: "desc", nulls: "last" } },
      select: {
        id: true,
        name: true,
        email: true,
        subscriptionPlan: true,
        createdAt: true,
        lastLoginAt: true,
      },
    }),
    prisma.quoteRequest.groupBy({
      by: ["companyId"],
      _count: { _all: true },
    }),
    prisma.quoteRequest.count(),
  ]);

  const countMap = new Map(quoteCounts.map((c) => [c.companyId, c._count._all]));
  const planTotals = companies.reduce(
    (acc, c) => {
      const key = c.subscriptionPlan as "STARTER" | "PRO" | "ENTERPRISE";
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const stats = [
    { label: "Companies", value: companies.length, icon: Building2 },
    { label: "Total quotes", value: totalQuotes, icon: FileText },
    {
      label: "On a paid plan",
      value: (planTotals.PRO ?? 0) + (planTotals.ENTERPRISE ?? 0),
      icon: Sparkles,
    },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-6xl">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center">
          <Shield size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Every company on Qalt, sorted by most recent activity.
          </p>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white dark:bg-[#1e1e1e] border border-slate-200 dark:border-white/[0.06] rounded-xl p-5 flex items-center gap-4 shadow-sm dark:shadow-none"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-300">
              <s.icon size={18} />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">{s.value}</p>
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mt-1">
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
        Plans: {planTotals.STARTER ?? 0} Starter · {planTotals.PRO ?? 0} Pro · {planTotals.ENTERPRISE ?? 0} Enterprise
      </p>

      {/* Company table */}
      <div className="bg-white dark:bg-[#1e1e1e] border border-slate-200 dark:border-white/[0.06] rounded-xl overflow-hidden shadow-sm dark:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/[0.03] text-left text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
                <th className="px-4 py-3 font-bold">Company</th>
                <th className="px-4 py-3 font-bold">Plan</th>
                <th className="px-4 py-3 font-bold">Quotes</th>
                <th className="px-4 py-3 font-bold">Last login</th>
                <th className="px-4 py-3 font-bold">Signed up</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => (
                <tr
                  key={c.id}
                  className="border-t border-slate-100 dark:border-white/[0.05] hover:bg-slate-50 dark:hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-900 dark:text-white">{c.name?.trim() || "—"}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{c.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide ${planBadge(c.subscriptionPlan)}`}>
                      {c.subscriptionPlan}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">
                    {countMap.get(c.id) ?? 0}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {c.lastLoginAt ? fmtDate(c.lastLoginAt) : <span className="text-slate-300 dark:text-slate-600">Never</span>}
                  </td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{fmtDate(c.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
