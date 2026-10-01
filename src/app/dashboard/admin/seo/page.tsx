import Link from "next/link";
import { notFound } from "next/navigation";
import { Search, LogIn, FileText, CreditCard, ArrowLeft, Globe2 } from "lucide-react";
import prisma from "@/lib/prisma";
import { getCurrentCompany } from "@/lib/session";

export const dynamic = "force-dynamic";

function isSearchSource(source: string | null, referrer: string | null) {
  const s = (source || "").toLowerCase();
  const r = (referrer || "").toLowerCase();
  return s === "google" || s === "bing" || r.includes("google.") || r.includes("bing.com");
}

export default async function AdminSeoPage() {
  const me = await getCurrentCompany();
  if (!me.isAdmin) notFound();

  const companies = await prisma.company.findMany({
    select: {
      id: true, name: true, email: true, subscriptionPlan: true, stripeSubscriptionId: true,
      lastLoginAt: true, registrationSource: true, registrationReferrer: true,
      registrationLandingPage: true, registrationUtmSource: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const seoCompanies = companies.filter((c) => isSearchSource(c.registrationSource, c.registrationReferrer));
  const ids = seoCompanies.map((c) => c.id);
  const quoted = ids.length ? await prisma.quoteRequest.findMany({
    where: { companyId: { in: ids }, deletedAt: null },
    select: { companyId: true },
    distinct: ["companyId"],
  }) : [];
  const quoteSet = new Set(quoted.map((q) => q.companyId));
  const loggedIn = seoCompanies.filter((c) => c.lastLoginAt).length;
  const firstQuote = seoCompanies.filter((c) => quoteSet.has(c.id)).length;
  const subscriptionRecords = seoCompanies.filter((c) => !!c.stripeSubscriptionId && (c.subscriptionPlan === "PRO" || c.subscriptionPlan === "ENTERPRISE")).length;

  const cards = [
    { label: "SEO-attributed signups", value: seoCompanies.length, icon: Search },
    { label: "First login", value: loggedIn, icon: LogIn },
    { label: "First quote", value: firstQuote, icon: FileText },
    { label: "Stripe subscription record", value: subscriptionRecords, icon: CreditCard },
  ];

  return (
    <div className="mx-auto max-w-7xl p-6 sm:p-8">
      <Link href="/dashboard/admin" className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-red-600"><ArrowLeft size={15} /> Back to Admin</Link>
      <div className="mb-8 flex gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white"><Globe2 size={20} /></div>
        <div><h1 className="text-2xl font-bold text-slate-900 dark:text-white">SEO conversion snapshot</h1><p className="mt-1 max-w-3xl text-sm text-slate-500 dark:text-slate-400">Uses Qalt's existing first-touch signup attribution without adding pageview tracking or extra per-visit function calls.</p></div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/[0.06] dark:bg-[#1e1e1e]"><card.icon size={18} className="mb-4 text-red-600" /><p className="text-3xl font-black text-slate-900 dark:text-white">{card.value}</p><p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-400">{card.label}</p></div>)}
      </div>

      <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-200">
        Search impressions, clicks, queries, positions, and true organic visit counts come from Google Search Console and analytics. Qalt does not invent those numbers. This page shows the Qalt-side conversion signals that are already stored.
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-white/[0.06] dark:bg-[#1e1e1e]">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-400 dark:bg-white/[0.03]"><tr><th className="px-4 py-3">Company</th><th className="px-4 py-3">Source</th><th className="px-4 py-3">Landing page</th><th className="px-4 py-3">Login</th><th className="px-4 py-3">Quote</th><th className="px-4 py-3">Plan</th></tr></thead>
          <tbody>
            {seoCompanies.length ? seoCompanies.map((c) => <tr key={c.id} className="border-t border-slate-100 dark:border-white/[0.05]"><td className="px-4 py-3"><p className="font-bold text-slate-900 dark:text-white">{c.name || "—"}</p><p className="text-xs text-slate-400">{c.email}</p></td><td className="px-4 py-3">{c.registrationSource || c.registrationUtmSource || "Search"}</td><td className="max-w-[220px] truncate px-4 py-3" title={c.registrationLandingPage || undefined}>{c.registrationLandingPage || "—"}</td><td className="px-4 py-3">{c.lastLoginAt ? "Yes" : "No"}</td><td className="px-4 py-3">{quoteSet.has(c.id) ? "Yes" : "No"}</td><td className="px-4 py-3 font-bold">{c.subscriptionPlan}</td></tr>) : <tr><td colSpan={6} className="px-4 py-10 text-center text-slate-400">No Google or Bing attributed signups yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
