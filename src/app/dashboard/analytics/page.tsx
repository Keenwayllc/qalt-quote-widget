import { getCurrentCompany } from "@/lib/session";
import { getEntitlements } from "@/lib/plans";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { subDays, format, startOfToday, endOfToday } from "date-fns";
import {
  BarChart3,
  Lock,
  ArrowUpRight,
  Zap,
  Target,
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  Calculator,
  Calendar,
} from "lucide-react";
import { KPICard, PremiumChart, InsightsCard, PremiumTable } from "./AnalyticsClientComponents";

export default async function AnalyticsPage() {
  const company = await getCurrentCompany();
  const entitlements = getEntitlements(company.subscriptionPlan);

  if (!entitlements.isAnalyticsDashboardEnabled) {
    return (
      <div className="qalt-analytics p-4 lg:p-10 max-w-7xl mx-auto">
        <div className="analytics-gate min-h-[620px] flex items-center justify-center px-6 py-16">
          <div className="max-w-3xl w-full grid lg:grid-cols-[1fr_0.9fr] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-100 bg-red-50 text-red-700 text-[10px] font-black uppercase tracking-[0.16em] mb-5">
                <Lock size={12} /> Pro analytics
              </div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-[-0.045em] text-slate-900 dark:text-white leading-[0.98]">
                See what is driving your quote pipeline.
              </h1>
              <p className="mt-5 text-base text-slate-500 dark:text-zinc-400 leading-relaxed max-w-xl">
                Analytics gives you a clearer view of quote volume, pipeline value, customer behavior, and conversion opportunities without changing how your widget works.
              </p>
              <Link
                href="/dashboard/billing"
                className="mt-8 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#df1731] hover:bg-[#c9142b] text-white text-sm font-bold rounded-xl transition-all active:scale-[0.985]"
              >
                Upgrade to Pro <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="analytics-preview-card">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Preview</p>
                  <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white mt-1">Performance snapshot</h2>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                  <BarChart3 size={18} className="text-[#df1731]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Zap, label: "Quote activity", value: "Real-time" },
                  { icon: Target, label: "Conversion", value: "Track trends" },
                  { icon: Users, label: "Lead behavior", value: "See patterns" },
                  { icon: TrendingUp, label: "Pipeline", value: "Watch growth" },
                ].map((item) => (
                  <div key={item.label} className="analytics-mini-card">
                    <item.icon size={16} className="text-[#df1731]" />
                    <p className="text-xs font-bold text-slate-800 dark:text-zinc-100 mt-3">{item.label}</p>
                    <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const thirtyDaysAgo = subDays(new Date(), 30);
  const todayStart = startOfToday();
  const todayEnd = endOfToday();

  const recentQuotesData = await prisma.quoteRequest.findMany({
    where: {
      companyId: company.id,
      deletedAt: null,
      createdAt: { gte: thirtyDaysAgo },
    },
    orderBy: { createdAt: "desc" },
  });

  const todayQuotes = recentQuotesData.filter(
    (q) => new Date(q.createdAt) >= todayStart && new Date(q.createdAt) <= todayEnd
  );

  const totalQuotes = recentQuotesData.length;
  const pipelineValue = recentQuotesData.reduce((sum, q) => sum + (q.estimatedPrice || 0), 0);
  const avgQuoteValue = totalQuotes > 0 ? pipelineValue / totalQuotes : 0;

  const todayQuotesCount = todayQuotes.length;
  const todayPipeline = todayQuotes.reduce((sum, q) => sum + (q.estimatedPrice || 0), 0);

  const dailyDataMap = new Map<string, number>();
  for (let i = 29; i >= 0; i--) {
    const day = subDays(new Date(), i);
    dailyDataMap.set(format(day, "MMM dd"), 0);
  }

  recentQuotesData.forEach((q) => {
    const dayKey = format(new Date(q.createdAt), "MMM dd");
    if (dailyDataMap.has(dayKey)) {
      dailyDataMap.set(dayKey, dailyDataMap.get(dayKey)! + 1);
    }
  });

  const chartData = Array.from(dailyDataMap.entries()).map(([date, quotes]) => ({ date, quotes }));
  const latestQuotes = recentQuotesData.slice(0, 5);

  return (
    <div className="qalt-analytics p-4 lg:p-10 space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-[10px] font-black uppercase tracking-[0.16em] mb-4 border border-red-100">
            <Activity size={12} /> Performance
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-[-0.045em] leading-none">
            Analytics
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            A focused view of quote demand, pipeline value, and the trends shaping your delivery business.
          </p>
        </div>

        <div className="analytics-period-card">
          <Calendar size={16} className="text-slate-400" />
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] font-black text-slate-400">Reporting window</p>
            <p className="text-sm font-bold text-slate-800 dark:text-zinc-100">Last 30 days</p>
          </div>
          <span className="ml-3 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-zinc-400">
            {company.subscriptionPlan}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
        <KPICard
          title="Total Leads"
          value={totalQuotes.toString()}
          subtitle={`${todayQuotesCount} today`}
          trend={todayQuotesCount > 0 ? "up" : "neutral"}
          icon={<Users size={20} className="text-[#df1731]" />}
          color="blue"
          delay={0.1}
        />
        <KPICard
          title="Pipeline Value"
          value={`$${pipelineValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
          subtitle={`$${todayPipeline.toLocaleString()} today`}
          trend={todayPipeline > 0 ? "up" : "neutral"}
          icon={<DollarSign size={20} className="text-emerald-600" />}
          color="emerald"
          delay={0.15}
        />
        <KPICard
          title="Avg. Deal Size"
          value={`$${avgQuoteValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subtitle="30-day average"
          trend="neutral"
          icon={<Calculator size={20} className="text-slate-700 dark:text-zinc-300" />}
          color="purple"
          delay={0.2}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <PremiumChart data={chartData} />
        </div>
        <div>
          <InsightsCard />
        </div>
      </div>

      <PremiumTable quotes={latestQuotes} />
    </div>
  );
}
