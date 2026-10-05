import Link from "next/link";
import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Shield, Building2, FileText, Sparkles, MousePointerClick } from "lucide-react";
import { widgetInstallationStatus, widgetInstallationSource } from "@/lib/widget-installations";
import PlanSelect from "./PlanSelect";
import VehicleRequestStatusSelect from "./VehicleRequestStatusSelect";

export const dynamic = "force-dynamic";

type WidgetInstallRow = {
  companyId: string;
  formId: string;
  formName: string;
  domain: string;
  firstSeenAt: Date;
  lastSeenAt: Date;
  loadCount: number;
};

type LeadActivity = {
  demoQuotes: number;
  partnerInquiries: number;
  latestAt: Date | null;
  latestQuotePrice: number | null;
};

function emailKey(value: string): string {
  return value.trim().toLowerCase();
}

function referrerHost(value: string | null): string | null {
  if (!value) return null;
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function fmtDate(d: Date | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    timeZoneName: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function money(value: number | null): string | null {
  if (value == null || !Number.isFinite(value)) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function bumpLatest(current: Date | null, next: Date): Date {
  if (!current || next.getTime() > current.getTime()) return next;
  return current;
}

export default async function AdminPage() {
  const me = await getCurrentCompany();
  if (!me.isAdmin) notFound();

  const companies = await prisma.company.findMany({
    orderBy: { lastLoginAt: { sort: "desc", nulls: "last" } },
    select: {
      id: true,
      name: true,
      email: true,
      subscriptionPlan: true,
      createdAt: true,
      lastLoginAt: true,
      registrationSource: true,
      registrationReferrer: true,
      registrationLandingPage: true,
      registrationUtmSource: true,
      registrationUtmMedium: true,
      registrationUtmCampaign: true,
    },
  });

  const vehicleRequests = await prisma.vehicleRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true, vehicleName: true, description: true, referenceUrl: true, status: true, createdAt: true,
      company: { select: { name: true, email: true } },
    },
  });

  const companyByEmail = new Map(companies.map((c) => [emailKey(c.email), c]));
  const emailFilters = companies.map((c) => ({
    customerEmail: { equals: c.email, mode: "insensitive" as const },
  }));
  const inquiryEmailFilters = companies.map((c) => ({
    email: { equals: c.email, mode: "insensitive" as const },
  }));

  const widgetInstalls = await prisma.$queryRaw<WidgetInstallRow[]>`
    SELECT wi."companyId", wi."formId", ws."name" AS "formName", wi."domain",
           wi."firstSeenAt", wi."lastSeenAt", wi."loadCount"
    FROM "WidgetInstallation" wi
    JOIN "WidgetSettings" ws ON ws."id" = wi."formId"
    ORDER BY wi."lastSeenAt" DESC
  `;

  const installsByCompany = new Map<string, WidgetInstallRow[]>();
  for (const install of widgetInstalls) {
    const rows = installsByCompany.get(install.companyId) ?? [];
    rows.push(install);
    installsByCompany.set(install.companyId, rows);
  }

  const [quoteCounts, totalQuotes, demoQuoteMatches, partnerInquiries] = await Promise.all([
    prisma.quoteRequest.groupBy({
      by: ["companyId"],
      where: { deletedAt: null },
      _count: { _all: true },
    }),
    prisma.quoteRequest.count({ where: { deletedAt: null } }),
    emailFilters.length
      ? prisma.quoteRequest.findMany({
          where: { deletedAt: null, OR: emailFilters },
          select: {
            companyId: true,
            customerEmail: true,
            estimatedPrice: true,
            createdAt: true,
          },
        })
      : Promise.resolve([]),
    inquiryEmailFilters.length
      ? prisma.partnerInquiry.findMany({
          where: { OR: inquiryEmailFilters },
          select: {
            email: true,
            partnershipType: true,
            createdAt: true,
          },
        })
      : Promise.resolve([]),
  ]);

  const leadActivityMap = new Map<string, LeadActivity>();
  const getActivity = (key: string): LeadActivity => {
    const existing = leadActivityMap.get(key);
    if (existing) return existing;
    const created = { demoQuotes: 0, partnerInquiries: 0, latestAt: null, latestQuotePrice: null };
    leadActivityMap.set(key, created);
    return created;
  };

  for (const quote of demoQuoteMatches) {
    const key = emailKey(quote.customerEmail);
    const company = companyByEmail.get(key);
    if (!company || quote.companyId === company.id) continue;

    const activity = getActivity(key);
    activity.demoQuotes += 1;
    activity.latestAt = bumpLatest(activity.latestAt, quote.createdAt);
    activity.latestQuotePrice = quote.estimatedPrice;
  }

  for (const inquiry of partnerInquiries) {
    const key = emailKey(inquiry.email);
    const activity = getActivity(key);
    activity.partnerInquiries += 1;
    activity.latestAt = bumpLatest(activity.latestAt, inquiry.createdAt);
  }

  const sortedCompanies = [...companies].sort((a, b) => {
    const aActivity = leadActivityMap.get(emailKey(a.email));
    const bActivity = leadActivityMap.get(emailKey(b.email));
    const aTime = a.lastLoginAt?.getTime() ?? aActivity?.latestAt?.getTime() ?? a.createdAt.getTime();
    const bTime = b.lastLoginAt?.getTime() ?? bActivity?.latestAt?.getTime() ?? b.createdAt.getTime();
    return bTime - aTime;
  });

  const countMap = new Map(quoteCounts.map((c) => [c.companyId, c._count._all]));
  const demoLeadCount = [...leadActivityMap.values()].filter(
    (a) => a.demoQuotes > 0 || a.partnerInquiries > 0
  ).length;
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
    { label: "Widgets installed", value: installsByCompany.size, icon: MousePointerClick },
    {
      label: "Pro / Enterprise accounts",
      value: (planTotals.PRO ?? 0) + (planTotals.ENTERPRISE ?? 0),
      icon: Sparkles,
    },
  ];

  return (
    <div className="p-6 sm:p-8 max-w-7xl">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center">
          <Shield size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Every company on Qalt, sorted by most recent login or demo activity.
          </p>
        </div>
        <Link
          href="/dashboard/admin/seo"
          className="ml-auto rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:border-red-200 hover:text-red-600 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-200"
        >
          SEO Snapshot
        </Link>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
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

      <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
        Times are shown in Pacific time. Plan counts reflect assigned tiers, not confirmed payments.
      </p>
      <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
        {installsByCompany.size} accounts with detected embeds. Active means an external widget loaded within 30 days.
        Detection starts after this feature goes live. Not detected does not confirm absence.
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
                <th className="px-4 py-3 font-bold">Widget installation</th>
                <th className="px-4 py-3 font-bold">Demo activity</th>
                <th className="px-4 py-3 font-bold">Source</th>
                <th className="px-4 py-3 font-bold">Last login</th>
                <th className="px-4 py-3 font-bold">Signed up</th>
              </tr>
            </thead>
            <tbody>
              {sortedCompanies.map((c) => {
                const leadActivity = leadActivityMap.get(emailKey(c.email));
                const hasLeadActivity = !!leadActivity && (leadActivity.demoQuotes > 0 || leadActivity.partnerInquiries > 0);
                const installs = installsByCompany.get(c.id) ?? [];
                const latestInstall = installs[0];

                return (
                  <tr
                    key={c.id}
                    className="border-t border-slate-100 dark:border-white/[0.05] hover:bg-slate-50 dark:hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3">
                      <p className="font-bold text-slate-900 dark:text-white">{c.name?.trim() || "—"}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{c.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <PlanSelect companyId={c.id} plan={c.subscriptionPlan} />
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">
                      {countMap.get(c.id) ?? 0}
                    </td>
                    <td className="px-4 py-3 min-w-[220px]">
                      {latestInstall ? (
                        <div className="space-y-1">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${widgetInstallationStatus(latestInstall.lastSeenAt) === "Active embed" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300" : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"}`}>
                            {widgetInstallationSource(latestInstall.domain) === "Builder/preview detection" && widgetInstallationStatus(latestInstall.lastSeenAt) === "Active embed" ? "Recent builder load" : widgetInstallationStatus(latestInstall.lastSeenAt)}
                          </span>
                          <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{latestInstall.domain}</p>
                          <p className="text-[11px] text-slate-500">{widgetInstallationSource(latestInstall.domain)}</p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500">
                            {latestInstall.formName} · {latestInstall.loadCount.toLocaleString()} load{latestInstall.loadCount === 1 ? "" : "s"}
                          </p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500">First seen {fmtDate(latestInstall.firstSeenAt)}</p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500">Last seen {fmtDate(latestInstall.lastSeenAt)}</p>
                          {installs.length > 1 && (
                            <details className="text-[11px] text-slate-500 dark:text-slate-400">
                              <summary className="cursor-pointer font-semibold">{installs.length - 1} more domain/form {installs.length === 2 ? "install" : "installs"}</summary>
                              {installs.slice(1).map((install) => (
                                <p key={`${install.formId}:${install.domain}`} className="mt-1 break-all">
                                  {install.domain} · {widgetInstallationSource(install.domain)} · {install.formName} · Last seen {fmtDate(install.lastSeenAt)}
                                </p>
                              ))}
                            </details>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500 dark:bg-white/[0.06] dark:text-slate-400">
                            Not detected
                          </span>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500">No embedded widget load seen yet</p>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {hasLeadActivity ? (
                        <div className="space-y-1">
                          {leadActivity.demoQuotes > 0 && (
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                              {leadActivity.demoQuotes} demo quote{leadActivity.demoQuotes === 1 ? "" : "s"}
                              {money(leadActivity.latestQuotePrice) ? ` · ${money(leadActivity.latestQuotePrice)}` : ""}
                            </p>
                          )}
                          {leadActivity.partnerInquiries > 0 && (
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {leadActivity.partnerInquiries} demo access request{leadActivity.partnerInquiries === 1 ? "" : "s"}
                            </p>
                          )}
                          <p className="text-[11px] text-slate-400 dark:text-slate-500">
                            Last activity {fmtDate(leadActivity.latestAt)}
                          </p>
                        </div>
                      ) : (
                        <span className="text-slate-300 dark:text-slate-600">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700 dark:bg-white/[0.06] dark:text-slate-200">
                        {c.registrationSource || "Before tracking"}
                      </span>
                      {c.registrationUtmCampaign ? (
                        <p className="mt-1 max-w-[180px] truncate text-[11px] text-slate-400" title={c.registrationUtmCampaign}>
                          Campaign: {c.registrationUtmCampaign}
                        </p>
                      ) : c.registrationUtmSource || c.registrationUtmMedium ? (
                        <p className="mt-1 max-w-[180px] truncate text-[11px] text-slate-400">
                          {[c.registrationUtmSource, c.registrationUtmMedium].filter(Boolean).join(" / ")}
                        </p>
                      ) : referrerHost(c.registrationReferrer) ? (
                        <p className="mt-1 max-w-[180px] truncate text-[11px] text-slate-400" title={c.registrationReferrer || undefined}>
                          {referrerHost(c.registrationReferrer)}
                        </p>
                      ) : c.registrationLandingPage ? (
                        <p className="mt-1 max-w-[180px] truncate text-[11px] text-slate-400" title={c.registrationLandingPage}>
                          {c.registrationLandingPage}
                        </p>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      {c.lastLoginAt ? (
                        fmtDate(c.lastLoginAt)
                      ) : hasLeadActivity ? (
                        <span className="font-semibold text-amber-600 dark:text-amber-300">Account not activated</span>
                      ) : (
                        <span className="text-slate-300 dark:text-slate-600">Never</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{fmtDate(c.createdAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <section className="mt-10" aria-labelledby="vehicle-requests">
        <h2 id="vehicle-requests" className="text-lg font-bold text-slate-900 dark:text-white">Vehicle requests</h2>
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          Vehicles merchants asked for. Once added to the catalog, mark them Added so the merchant sees it.
        </p>
        {vehicleRequests.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-200 p-6 text-sm text-slate-400 dark:border-white/10">No requests yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-white/[0.06] dark:bg-[#1e1e1e]">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:bg-white/[0.03] dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3">Vehicle</th>
                  <th className="px-4 py-3">Merchant</th>
                  <th className="px-4 py-3">Sent</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
                {vehicleRequests.map((r) => (
                  <tr key={r.id} className="align-top">
                    <td className="max-w-md px-4 py-3">
                      <p className="font-semibold text-slate-900 dark:text-white">{r.vehicleName}</p>
                      <p className="mt-1 whitespace-pre-wrap text-xs text-slate-500 dark:text-slate-400">{r.description}</p>
                      {r.referenceUrl && (
                        <a href={r.referenceUrl} target="_blank" rel="noopener noreferrer nofollow" className="mt-1 inline-block text-xs font-semibold text-red-600 hover:underline">
                          Reference link
                        </a>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                      <p className="font-medium">{r.company.name}</p>
                      <a href={`mailto:${r.company.email}`} className="text-xs text-slate-400 hover:text-red-600">{r.company.email}</a>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-500 dark:text-slate-400">{fmtDate(r.createdAt)}</td>
                    <td className="px-4 py-3"><VehicleRequestStatusSelect id={r.id} status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
