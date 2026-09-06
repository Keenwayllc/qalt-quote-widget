import { getCurrentCompany, getDefaultPricing } from "@/lib/session";
import { getEntitlements } from "@/lib/plans";
import prisma from "@/lib/prisma";
import MetricCard from "@/components/dashboard/MetricCard";
import QuotaBar from "@/components/dashboard/QuotaBar";
import OnboardingChecklist from "@/components/dashboard/OnboardingChecklist";
import WhatsNewHighlight from "@/components/dashboard/WhatsNewHighlight";
import QuoteTrendChart from "@/components/dashboard/QuoteTrendChart";
import ServiceTypeChart from "@/components/dashboard/ServiceTypeChart";
import {
  FileText,
  DollarSign,
  Activity,
  ChevronRight,
  ArrowUpRight,
  TrendingUp,
  MapPin,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default async function DashboardOverview() {
  const company = await getCurrentCompany();
  const defaultPricing = getDefaultPricing(company);

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  let recentQuotes: Awaited<ReturnType<typeof prisma.quoteRequest.findMany>> = [];
  let totalQuotes = 0;
  let monthlyQuotes = 0;
  let prevMonthQuotes = 0;

  try {
    [recentQuotes, totalQuotes, monthlyQuotes, prevMonthQuotes] = await Promise.all([
      prisma.quoteRequest.findMany({
        where: { companyId: company.id, deletedAt: null },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.quoteRequest.count({ where: { companyId: company.id, deletedAt: null } }),
      prisma.quoteRequest.count({
        where: { companyId: company.id, deletedAt: null, createdAt: { gte: monthStart } },
      }),
      prisma.quoteRequest.count({
        where: {
          companyId: company.id,
          deletedAt: null,
          createdAt: { gte: prevMonthStart, lt: monthStart },
        },
      }),
    ]);
  } catch {
    // Dashboard remains usable if non-critical metrics fail to load.
  }

  const quoteTrend =
    prevMonthQuotes > 0
      ? {
          value: Math.round(
            Math.abs((monthlyQuotes - prevMonthQuotes) / prevMonthQuotes) * 100
          ),
          isPositive: monthlyQuotes >= prevMonthQuotes,
        }
      : null;

  const entitlements = getEntitlements(company.subscriptionPlan);
  const quotaLimit = entitlements.maxQuotesPerMonth;

  const [widgets, pricingProfiles] = await Promise.all([
    prisma.widgetSettings.findMany({ where: { companyId: company.id } }),
    prisma.pricingProfile.findMany({ where: { companyId: company.id } }),
  ]);

  let activeJobs: any[] = [];
  try {
    activeJobs = await prisma.job.findMany({
      where: {
        companyId: company.id,
        status: { in: ["PENDING", "READY", "IN_PROGRESS", "ISSUE"] },
      },
      include: {
        stops: {
          include: { stopNote: { select: { companyName: true } } },
          orderBy: { order: "asc" },
        },
      },
      orderBy: { scheduledDate: "asc" },
      take: 5,
    });
  } catch {
    // Jobs can be unavailable on a first boot without blocking the overview.
  }

  const hasBranding = widgets.some(
    (w) =>
      w.logoUrl ||
      w.backgroundImageUrl ||
      w.primaryColor !== "#1E40AF" ||
      w.buttonText !== "Get Instant Quote"
  );

  const hasCustomPricing = pricingProfiles.some(
    (p) =>
      p.baseRatePerMile !== 2.5 ||
      p.minimumCharge !== 35.0 ||
      p.useMinimumCharge !== true ||
      p.minMilesThreshold !== 0 ||
      p.weightFee !== 0 ||
      p.itemCountFee !== 0 ||
      p.stairsFee !== 0 ||
      p.insideDeliveryFee !== 0 ||
      p.afterHoursFee !== 0 ||
      p.largeItemFee !== 0
  );

  const hasQuotes = totalQuotes > 0;
  const hasEmbedded = hasQuotes;

  const onboardingSteps = [
    {
      id: "pricing",
      label: "Set your pricing",
      description:
        "Configure your base rate, minimum charge, and service extras so your widget quotes accurately.",
      href: "/dashboard/pricing",
      cta: "Set Pricing",
      done: hasCustomPricing,
    },
    {
      id: "branding",
      label: "Customize your widget",
      description: "Add your logo and brand color so the quote experience feels like your business.",
      href: "/dashboard/widget",
      cta: "Customize",
      done: hasBranding,
    },
    {
      id: "embed",
      label: "Embed the widget on your site",
      description: "Copy your embed code into your site and start accepting quote requests.",
      href: "/dashboard/embed",
      cta: "Get Embed Code",
      done: hasEmbedded,
    },
    {
      id: "quote",
      label: "Receive your first quote",
      description: "Once your widget is live, new requests appear here automatically.",
      href: "/dashboard/quotes",
      cta: "View Quotes",
      done: hasQuotes,
    },
  ];

  const doneCount = onboardingSteps.filter((step) => step.done).length;
  const showChecklist = doneCount < onboardingSteps.length;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  let chartQuotes: { createdAt: Date }[] = [];
  let serviceTypeGroups: any[] = [];

  try {
    [chartQuotes, serviceTypeGroups] = await Promise.all([
      prisma.quoteRequest.findMany({
        where: {
          companyId: company.id,
          deletedAt: null,
          createdAt: { gte: sevenDaysAgo },
        },
        select: { createdAt: true },
      }),
      prisma.quoteRequest.groupBy({
        by: ["serviceType"],
        where: { companyId: company.id, deletedAt: null },
        _count: { serviceType: true },
      }),
    ]);
  } catch {
    // Charts gracefully render empty states if analytics data is unavailable.
  }

  const dailyDataMap = new Map<string, number>();
  for (let i = 0; i < 7; i += 1) {
    const date = new Date(sevenDaysAgo);
    date.setDate(date.getDate() + i);
    dailyDataMap.set(
      date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      0
    );
  }

  chartQuotes.forEach((quote) => {
    const date = new Date(quote.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    if (dailyDataMap.has(date)) {
      dailyDataMap.set(date, (dailyDataMap.get(date) ?? 0) + 1);
    }
  });

  const quoteTrendData = Array.from(dailyDataMap.entries()).map(([date, count]) => ({
    date,
    count,
  }));

  const serviceTypeData = serviceTypeGroups
    .map((group) => ({
      name: group.serviceType || "Unknown",
      value: group._count.serviceType,
    }))
    .sort((a, b) => b.value - a.value);

  const statusMap: Record<
    string,
    { cls: string; icon: typeof Clock; label: string }
  > = {
    PENDING: {
      cls: "text-amber-700 bg-amber-50 border-amber-100 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/20",
      icon: Clock,
      label: "Pending",
    },
    READY: {
      cls: "text-emerald-700 bg-emerald-50 border-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20",
      icon: CheckCircle2,
      label: "Ready",
    },
    IN_PROGRESS: {
      cls: "text-blue-700 bg-blue-50 border-blue-100 dark:text-blue-400 dark:bg-blue-500/10 dark:border-blue-500/20",
      icon: Activity,
      label: "In progress",
    },
    ISSUE: {
      cls: "text-rose-700 bg-rose-50 border-rose-100 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/20",
      icon: AlertCircle,
      label: "Issue",
    },
  };

  return (
    <div className="min-h-full bg-[#f7f8fa] dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        <header className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-5 border-b border-[#e2e4e9] dark:border-white/[0.07] pb-7">
          <div>
            <span className="inline-flex px-2.5 py-1 border border-[#f1d7dc] bg-[#fff4f5] text-[#b91329] dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 text-[10px] font-semibold uppercase tracking-[0.12em]">
              {company.subscriptionPlan} plan
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-[-0.04em] text-[#22252b] dark:text-white">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-[#646b76] dark:text-slate-400">
              Welcome back, <span className="font-semibold text-[#22252b] dark:text-white">{company.name}</span>. Your quotes, pricing, and operations at a glance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Link
              href="/dashboard/quotes"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-[#d9dde3] dark:border-white/[0.10] bg-white dark:bg-[#141414] text-sm font-semibold text-[#3c424b] dark:text-slate-200 hover:bg-[#f1f3f5] dark:hover:bg-white/[0.04] transition-colors"
            >
              View quotes
              <ChevronRight size={15} />
            </Link>
            <Link
              href="/dashboard/widget"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#df1731] hover:bg-[#c9142b] text-white text-sm font-semibold transition-colors"
            >
              Customize widget
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </header>

        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a919d] dark:text-slate-500">At a glance</p>
              <h2 className="mt-1 text-lg font-bold tracking-[-0.02em] text-[#22252b] dark:text-white">Business snapshot</h2>
            </div>
            <span className="text-xs text-[#8a919d] dark:text-slate-500">Updated from live account data</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              title="Total quotes"
              value={totalQuotes}
              description="All quote requests generated"
              icon={<FileText size={18} />}
              variant="blue"
              trend={quoteTrend ?? undefined}
            />
            <MetricCard
              title="Base rate"
              value={`$${defaultPricing?.baseRatePerMile.toFixed(2) ?? "0.00"}`}
              description="Current price per mile"
              icon={<DollarSign size={18} />}
              variant="emerald"
            />
            <MetricCard
              title="Widget status"
              value="Online"
              description="Ready to accept customer requests"
              icon={<Activity size={18} />}
              variant="rose"
            />
          </div>

          <div className="mt-4">
            <QuotaBar used={monthlyQuotes} limit={quotaLimit} plan={company.subscriptionPlan} />
          </div>
        </section>

        {showChecklist && <OnboardingChecklist steps={onboardingSteps} />}

        <section>
          <div className="mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a919d] dark:text-slate-500">Analytics</p>
            <h2 className="mt-1 text-lg font-bold tracking-[-0.02em] text-[#22252b] dark:text-white">Quote performance</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <QuoteTrendChart data={quoteTrendData} />
            </div>
            <ServiceTypeChart data={serviceTypeData} />
          </div>
        </section>

        {activeJobs.length > 0 && (
          <section>
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a919d] dark:text-slate-500">Field operations</p>
                <h2 className="mt-1 text-lg font-bold tracking-[-0.02em] text-[#22252b] dark:text-white">Active jobs</h2>
              </div>
              <Link href="/dashboard/ops/jobs" className="text-xs font-semibold text-[#df1731] hover:text-[#b91329] flex items-center gap-1">
                View all <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {activeJobs.map((job: any) => {
                const status = statusMap[job.status] ?? statusMap.PENDING;
                const StatusIcon = status.icon;
                const stopNames = job.stops
                  .map((stop: any) => stop.stopNote?.companyName)
                  .filter(Boolean)
                  .join(" → ");

                return (
                  <Link
                    key={job.id}
                    href={`/dashboard/ops/jobs/${job.id}`}
                    className="group bg-white dark:bg-[#141414] border border-[#e2e4e9] dark:border-white/[0.07] p-5 hover:border-[#cfd3da] dark:hover:border-white/[0.12] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className={`w-9 h-9 border flex items-center justify-center ${status.cls}`}>
                        <StatusIcon size={16} />
                      </div>
                      <span className={`px-2 py-1 border text-[10px] font-semibold uppercase tracking-[0.08em] ${status.cls}`}>
                        {status.label}
                      </span>
                    </div>
                    <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9aa0aa] dark:text-slate-500">
                      #{job.id.slice(-6).toUpperCase()}
                    </p>
                    <p className="mt-1.5 font-semibold text-[#22252b] dark:text-white truncate">
                      {stopNames || "No stops added"}
                    </p>
                    <div className="mt-4 pt-4 border-t border-[#eef0f3] dark:border-white/[0.05] flex items-center justify-between gap-3">
                      <span className="text-xs text-[#777e89] dark:text-slate-400">
                        {new Date(job.scheduledDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      </span>
                      <ChevronRight size={15} className="text-[#b3b8c0] group-hover:text-[#df1731] transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <section>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a919d] dark:text-slate-500">Inbox</p>
              <h2 className="mt-1 text-lg font-bold tracking-[-0.02em] text-[#22252b] dark:text-white">Recent requests</h2>
            </div>
            <Link href="/dashboard/quotes" className="text-xs font-semibold text-[#df1731] hover:text-[#b91329] flex items-center gap-1">
              View all <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
            <div className="lg:col-span-2 bg-white dark:bg-[#141414] border border-[#e2e4e9] dark:border-white/[0.07] overflow-hidden">
              {recentQuotes.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="w-11 h-11 mx-auto border border-[#e2e4e9] dark:border-white/[0.08] bg-[#fafbfc] dark:bg-white/[0.03] flex items-center justify-center text-[#9aa0aa]">
                    <FileText size={19} />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-[#3c424b] dark:text-slate-200">No quote requests yet</p>
                  <p className="mt-1 text-xs text-[#8a919d] dark:text-slate-500">Embed your widget to start receiving customer requests.</p>
                  <Link href="/dashboard/embed" className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#df1731] hover:text-[#b91329]">
                    Get embed code <ChevronRight size={13} />
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-[#eef0f3] dark:divide-white/[0.05]">
                  {recentQuotes.map((quote) => (
                    <div key={quote.id} className="px-5 sm:px-6 py-4 flex items-center justify-between gap-4 hover:bg-[#fafbfc] dark:hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 shrink-0 bg-[#f7f8fa] dark:bg-white/[0.04] border border-[#e2e4e9] dark:border-white/[0.06] flex items-center justify-center text-xs font-bold text-[#646b76] dark:text-slate-300">
                          {quote.customerName.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#22252b] dark:text-white truncate">{quote.customerName}</p>
                          <div className="mt-1 flex items-center gap-2 text-[11px] text-[#8a919d] dark:text-slate-500">
                            <span className="flex items-center gap-1 truncate">
                              <MapPin size={10} />
                              {quote.pickupZip} → {quote.dropoffZip}
                            </span>
                            <span>·</span>
                            <span>{quote.distanceMiles.toFixed(1)} mi</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-base font-bold text-[#22252b] dark:text-white">${quote.estimatedPrice.toFixed(2)}</p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.08em] text-[#9aa0aa] dark:text-slate-500">
                          {new Date(quote.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <aside className="bg-[#22252b] dark:bg-[#141414] border border-[#22252b] dark:border-white/[0.07] p-6 text-white">
              <div className="w-10 h-10 border border-white/15 bg-white/[0.06] flex items-center justify-center">
                <TrendingUp size={18} className="text-[#ff8997]" />
              </div>
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/45">Next best action</p>
              <h3 className="mt-2 text-xl font-bold tracking-[-0.025em]">Make the widget unmistakably yours.</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                Match your logo, color, and call-to-action so customers experience one consistent brand from your site to checkout.
              </p>
              <Link href="/dashboard/widget" className="mt-6 inline-flex w-full items-center justify-between bg-[#df1731] hover:bg-[#c9142b] px-4 py-3 text-sm font-semibold transition-colors">
                Customize widget
                <ArrowUpRight size={15} />
              </Link>
            </aside>
          </div>
        </section>

        <WhatsNewHighlight />
      </div>
    </div>
  );
}
