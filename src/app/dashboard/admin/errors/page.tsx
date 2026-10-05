import Link from "next/link";
import { notFound } from "next/navigation";
import { Bug } from "lucide-react";
import prisma from "@/lib/prisma";
import { getCurrentCompany } from "@/lib/session";
import ErrorStatusSelect from "./ErrorStatusSelect";

export const dynamic = "force-dynamic";

const SEVERITY_STYLES: Record<string, string> = {
  critical: "bg-red-600 text-white",
  high: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  low: "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300",
};

function fmt(d: Date) {
  return new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

const tab = (active: boolean) =>
  `rounded-xl border px-4 py-2 ${active ? "border-red-200 text-red-600" : "border-slate-200 text-slate-600 dark:border-white/10 dark:text-slate-300"}`;

export default async function AdminErrorsPage({ searchParams }: { searchParams: Promise<{ show?: string }> }) {
  const me = await getCurrentCompany();
  if (!me.isAdmin) notFound();
  const { show } = await searchParams;
  const showAll = show === "all";

  const errors = await prisma.appError.findMany({
    where: showAll ? {} : { status: { in: ["NEW", "INVESTIGATING"] } },
    orderBy: { lastSeen: "desc" },
    take: 100,
  });
  const companyIds = [...new Set(errors.map((e) => e.companyId).filter((id): id is string => !!id))];
  const companies = companyIds.length
    ? await prisma.company.findMany({ where: { id: { in: companyIds } }, select: { id: true, name: true } })
    : [];
  const companyName = new Map(companies.map((c) => [c.id, c.name]));

  return (
    <div className="max-w-7xl p-6 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white"><Bug size={20} /></div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Errors</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Bugs caught across Qalt, grouped and explained by Claude. New bugs are emailed to support@qalt.site.
          </p>
        </div>
        <div className="ml-auto flex gap-2 text-sm font-bold">
          <Link href="/dashboard/admin/errors" className={tab(!showAll)}>Open</Link>
          <Link href="/dashboard/admin/errors?show=all" className={tab(showAll)}>All</Link>
          <Link href="/dashboard/admin" className={tab(false)}>Back to Admin</Link>
        </div>
      </div>

      {errors.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400 dark:border-white/10">
          {showAll ? "No errors recorded yet." : "No open errors."}
        </p>
      ) : (
        <ul className="space-y-3">
          {errors.map((e) => {
            const company = e.companyId ? companyName.get(e.companyId) : undefined;
            return (
              <li key={e.id} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-white/[0.06] dark:bg-[#1e1e1e]">
                <div className="flex flex-wrap items-start gap-3">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${SEVERITY_STYLES[e.severity ?? ""] ?? "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-400"}`}>
                    {e.severity ?? "unrated"}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{e.source}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{e.path ?? "unknown page"}</span>
                  <div className="ml-auto"><ErrorStatusSelect id={e.id} status={e.status} /></div>
                </div>
                {e.aiSummary && <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">{e.aiSummary}</p>}
                {e.aiCause && <p className="mt-1 text-sm text-slate-600 dark:text-slate-300"><span className="font-semibold">Likely cause:</span> {e.aiCause}</p>}
                <p className="mt-2 break-words font-mono text-xs text-red-700 dark:text-red-300">{e.message}</p>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {e.count.toLocaleString()} {e.count === 1 ? "time" : "times"} · first {fmt(e.firstSeen)} · last {fmt(e.lastSeen)}
                  {company ? ` · last seen by ${company}` : ""}
                </p>
                {e.stack && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-xs font-semibold text-slate-500 dark:text-slate-400">Stack trace</summary>
                    <pre className="mt-2 max-h-72 overflow-auto rounded-lg bg-slate-50 p-3 text-[11px] text-slate-700 dark:bg-black/30 dark:text-slate-300">{e.stack}</pre>
                  </details>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
