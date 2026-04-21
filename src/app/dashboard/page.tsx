import { getCurrentCompany, getDefaultPricing } from "@/lib/session";
import { getEntitlements } from "@/lib/plans";
import prisma from "@/lib/prisma";
import MetricCard from "@/components/dashboard/MetricCard";
import QuotaBar from "@/components/dashboard/QuotaBar";
import OnboardingChecklist from "@/components/dashboard/OnboardingChecklist";
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
  Clock
} from "lucide-react";
import Link from "next/link";

export default async function DashboardOverview() {
  const company = await getCurrentCompany();
  const defaultPricing = getDefaultPricing(company);

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  // Get recent quotes + monthly count
  let recentQuotes: Awaited<ReturnType<typeof prisma.quoteRequest.findMany>> = [];
  let totalQuotes = 0;
  let monthlyQuotes = 0;
  try {
    [recentQuotes, totalQuotes, monthlyQuotes] = await Promise.all([
      prisma.quoteRequest.findMany({
        where: { companyId: company.id },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.quoteRequest.count({ where: { companyId: company.id } }),
      prisma.quoteRequest.count({ where: { companyId: company.id, createdAt: { gte: monthStart } } }),
    ]);
  } catch (error) {
    console.error("Dashboard query error:", error instanceof Error ? error.message : String(error));
  }

  const entitlements = getEntitlements(company.subscriptionPlan);
  const quotaLimit = entitlements.maxQuotesPerMonth;

  // Onboarding checklist — detect completion from real data
  const [widgets, pricingProfiles] = await Promise.all([
    prisma.widgetSettings.findMany({ where: { companyId: company.id } }),
    prisma.pricingProfile.findMany({ where: { companyId: company.id } }),
  ]);

  // Active Jobs for today's ops summary
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  let activeJobs: any[] = [];
  try {
    activeJobs = await prisma.job.findMany({
      where: {
        companyId: company.id,
        status: { in: ["PENDING", "READY", "IN_PROGRESS", "ISSUE"] },
      },
      include: {
        stops: { include: { stopNote: { select: { companyName: true } } }, orderBy: { order: "asc" } },
      },
      orderBy: { scheduledDate: "asc" },
      take: 5,
    });
  } catch { /* Jobs table may not exist yet on first boot */ }

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
      description: "Configure your base rate, minimum charge, and any service extras so your widget quotes accurately.",
      href: "/dashboard/pricing",
      cta: "Set Pricing",
      done: hasCustomPricing,
    },
    {
      id: "branding",
      label: "Customize your widget",
      description: "Upload your logo or a background image so the widget matches your brand.",
      href: "/dashboard/widget",
      cta: "Customize",
      done: hasBranding,
    },
    {
      id: "embed",
      label: "Embed the widget on your site",
      description: "Copy your embed code and paste it into your website to start receiving quote requests.",
      href: "/dashboard/embed",
      cta: "Get Embed Code",
      done: hasEmbedded,
    },
    {
      id: "quote",
      label: "Receive your first quote",
      description: "Once your widget is live, customers can request quotes directly from your site.",
      href: "/dashboard/quotes",
      cta: "View Quotes",
      done: hasQuotes,
    },
  ];

  // Hide checklist only when all steps are done
  const doneCount = onboardingSteps.filter((s) => s.done).length;
  const showChecklist = doneCount < onboardingSteps.length;

  // Chart Data preparation
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  let chartQuotes: { createdAt: Date }[] = [];
  let serviceTypeGroups: any[] = [];
  try {
    [chartQuotes, serviceTypeGroups] = await Promise.all([
      prisma.quoteRequest.findMany({
        where: { companyId: company.id, createdAt: { gte: sevenDaysAgo } },
        select: { createdAt: true }
      }),
      prisma.quoteRequest.groupBy({
        by: ['serviceType'],
        where: { companyId: company.id },
        _count: { serviceType: true }
      })
    ]);
  } catch (error) {
    console.error("Dashboard chart query error:", error instanceof Error ? error.message : String(error));
  }

  // Map 7-day volume
  const dailyDataMap = new Map<string, number>();
  for (let i = 0; i < 7; i++) {
    const d = new Date(sevenDaysAgo);
    d.setDate(d.getDate() + i);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    dailyDataMap.set(dateStr, 0);
  }

  chartQuotes.forEach(q => {
    const dateStr = new Date(q.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (dailyDataMap.has(dateStr)) {
      dailyDataMap.set(dateStr, dailyDataMap.get(dateStr)! + 1);
    }
  });

  const quoteTrendData = Array.from(dailyDataMap.entries()).map(([date, count]) => ({ date, count }));

  // Map Service Type chart data
  const serviceTypeData = serviceTypeGroups.map(g => ({
    name: g.serviceType || "Unknown",
    value: g._count.serviceType
  })).sort((a, b) => b.value - a.value);

  return (
    <div className="p-4 lg:p-10 space-y-10 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400 text-[10px] font-black uppercase tracking-wider rounded-md">
              {company.subscriptionPlan} Plan
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Welcome back, <span className="text-slate-900 dark:text-white font-bold">{company.name}</span>. Here&apos;s your performance.
          </p>
        </div>
        
        <Link 
          href="/dashboard/widget"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-slate-900 border border-transparent dark:border-white/10 dark:bg-[#1e1e1e] text-white dark:text-white text-sm font-bold rounded-none hover:bg-slate-800 dark:hover:bg-white/5 transition-all shadow-none"
        >
          Customize Widget
          <ArrowUpRight className="ml-2 w-4 h-4" />
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Total Quotes"
          value={totalQuotes}
          description="Cumulative quote requests generated"
          icon={<FileText size={20} />}
          variant="blue"
          trend={{ value: 12, isPositive: true }}
        />

        <MetricCard
          title="Base Rate"
          value={`$${defaultPricing?.baseRatePerMile.toFixed(2) ?? "0.00"}`}
          description="Current price per mile"
          icon={<DollarSign size={20} />}
          variant="emerald"
        />

        <MetricCard
          title="Active Status"
          value="Online"
          description="Widget is initialized on your site"
          icon={<Activity size={20} />}
          variant="rose"
        />
      </div>

      <QuotaBar used={monthlyQuotes} limit={quotaLimit} plan={company.subscriptionPlan} />

      {/* Active Jobs Summary Widget */}
      {activeJobs.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Briefcase size={20} className="text-red-500" />
              Active Jobs
            </h2>
            <Link
              href="/dashboard/ops/jobs"
              className="text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 flex items-center gap-1 group"
            >
              View all
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeJobs.map((job: any) => {
              const statusMap: Record<string, { cls: string; icon: any; label: string }> = {
                PENDING:     { cls: "text-amber-600 bg-amber-50 border-amber-100", icon: Clock, label: "Pending" },
                READY:       { cls: "text-emerald-600 bg-emerald-50 border-emerald-100", icon: CheckCircle2, label: "Ready" },
                IN_PROGRESS: { cls: "text-blue-600 bg-blue-50 border-blue-100", icon: Activity, label: "In Progress" },
                ISSUE:       { cls: "text-rose-600 bg-rose-50 border-rose-100", icon: AlertCircle, label: "Issue" },
              };
              const s = statusMap[job.status] || statusMap.PENDING;
              const Icon = s.icon;
              return (
                <Link
                  key={job.id}
                  href={`/dashboard/ops/jobs/${job.id}`}
                  className="bg-white dark:bg-[#1e1e1e] rounded-none border border-slate-200/60 dark:border-white/[0.06] shadow-sm dark:shadow-none p-5 flex items-center gap-4 hover:shadow-lg dark:hover:border-white/10 hover:border-slate-300 transition-all group"
                >
                  <div className={`w-12 h-12 rounded-none flex items-center justify-center border shrink-0 ${s.cls}`}>
                    <Icon size={22} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-0.5">#{job.id.slice(-6).toUpperCase()}</p>
                    <p className="font-black text-slate-900 dark:text-slate-100 text-sm truncate">
                      {job.stops.map((js: any) => js.stopNote.companyName).join(" → ") || "No stops"}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">
                      {new Date(job.scheduledDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-slate-200 dark:text-slate-600 group-hover:text-slate-600 dark:group-hover:text-slate-300 shrink-0 transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Onboarding checklist — shown until merchant completes 3 of 4 steps */}
      {showChecklist && <OnboardingChecklist steps={onboardingSteps} />}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <QuoteTrendChart data={quoteTrendData} />
        </div>
        <div>
          <ServiceTypeChart data={serviceTypeData} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Recent Requests
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          </h2>
          <Link
            href="/dashboard/quotes"
            className="text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 flex items-center gap-1 group"
          >
            View all
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Recent Quotes List */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-[#1e1e1e] rounded-none border border-slate-200/60 dark:border-white/[0.06] shadow-md dark:shadow-none overflow-hidden">
            {recentQuotes.length === 0 ? (
              <div className="p-12 text-center">
                <div className="inline-flex p-4 bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-slate-500 rounded-full mb-4">
                  <FileText size={32} />
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-bold">No requests yet.</p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1 max-w-[200px] mx-auto">
                  Embed the widget to start receiving quote requests.
                </p>
                <Link 
                  href="/dashboard/embed" 
                  className="mt-6 inline-block text-red-600 font-bold text-sm hover:underline"
                >
                  Get Embed Code &rarr;
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-white/[0.04]">
                {recentQuotes.map((quote) => (
                  <div key={quote.id} className="group px-6 py-5 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-none bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/[0.06] flex items-center justify-center text-slate-400 dark:text-slate-500 font-black text-xs transition-colors group-hover:border-red-100 dark:group-hover:border-red-500/20 group-hover:bg-red-50 dark:group-hover:bg-red-500/10 group-hover:text-red-500 dark:group-hover:text-red-400">
                        {quote.customerName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 dark:text-slate-100 tracking-tight leading-none mb-1.5">{quote.customerName}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-bold">
                           <span className="flex items-center gap-1">
                             <MapPin size={10} className="text-slate-300 dark:text-slate-600" />
                             {quote.pickupZip} &rarr; {quote.dropoffZip}
                           </span>
                           <span className="h-1 w-1 rounded-full bg-slate-200 dark:bg-slate-600" />
                           <span>{quote.distanceMiles.toFixed(1)} mi</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight leading-none mb-1">${quote.estimatedPrice.toFixed(2)}</p>
                      <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{new Date(quote.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Tips / Sidebar Card */}
        <div>
          <div className="bg-linear-to-br from-red-700 to-[#4f515b] rounded-none p-6 text-white shadow-md shadow-red-200/50 dark:shadow-none">
            <TrendingUp size={32} className="mb-4 text-red-200" />
            <h3 className="text-xl font-black tracking-tight mb-2 leading-tight">Increase Conversion</h3>
            <p className="text-red-100 text-sm font-medium leading-relaxed mb-6">
              Add a specialized background image to your widget to build trust with your customers.
            </p>
            <Link 
              href="/dashboard/widget"
              className="block w-full text-center py-2.5 bg-white/20 backdrop-blur-md rounded-none text-sm font-bold hover:bg-white/30 transition-all border border-white/20"
            >
              Update Styles
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
