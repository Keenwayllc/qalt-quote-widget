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
      <div className="p-4 lg:p-10 max-w-7xl mx-auto">
        <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-2xl shadow-slate-200/40 overflow-hidden relative min-h-[650px] flex flex-col items-center justify-center text-center px-6">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-60" />

          <div className="relative z-10 max-w-lg">
            <div className="inline-flex p-8 bg-linear-to-br from-blue-50 to-indigo-50 rounded-[32px] mb-8 relative border border-blue-100/50 shadow-inner">
              <BarChart3 size={56} className="text-blue-600" />
              <div className="absolute -top-2 -right-2 bg-white p-2 rounded-full shadow-lg border border-slate-100">
                <Lock size={22} className="text-slate-900 fill-slate-900" />
              </div>
            </div>

            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-4 bg-linear-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              Analytics is a Pro Feature
            </h1>
            <p className="text-slate-600 font-medium leading-relaxed mb-10 text-lg">
              Unlock deep insights into your widget performance, customer behavior, and conversion rates. Upgrade to the Pro plan to start tracking data today.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 text-left">
              {[
                { icon: Zap, text: "Real-time tracking", color: "text-amber-500", bg: "bg-amber-50" },
                { icon: Target, text: "Conversion optimization", color: "text-emerald-500", bg: "bg-emerald-50" },
                { icon: Users, text: "Visitor demographics", color: "text-blue-500", bg: "bg-blue-50" },
                { icon: TrendingUp, text: "Revenue forecasting", color: "text-purple-500", bg: "bg-purple-50" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-slate-200 transition-colors group">
                  <div className={`p-2 ${item.bg} rounded-xl group-hover:scale-110 transition-transform`}>
                    <item.icon size={20} className={item.color} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{item.text}</span>
                </div>
              ))}
            </div>

            <Link
              href="/dashboard/billing"
              className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-2xl shadow-blue-200 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Upgrade to Pro
                <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Fetch true analytics data
  const thirtyDaysAgo = subDays(new Date(), 30);
  const todayStart = startOfToday();
  const todayEnd = endOfToday();

  const recentQuotesData = await prisma.quoteRequest.findMany({
    where: {
      companyId: company.id,
      createdAt: { gte: thirtyDaysAgo }
    },
    orderBy: { createdAt: "desc" }
  });

  const todayQuotes = recentQuotesData.filter(q => new Date(q.createdAt) >= todayStart && new Date(q.createdAt) <= todayEnd);

  // Calculate KPIs
  const totalQuotes = recentQuotesData.length;
  const pipelineValue = recentQuotesData.reduce((sum, q) => sum + (q.estimatedPrice || 0), 0);
  const avgQuoteValue = totalQuotes > 0 ? pipelineValue / totalQuotes : 0;

  const todayQuotesCount = todayQuotes.length;
  const todayPipeline = todayQuotes.reduce((sum, q) => sum + (q.estimatedPrice || 0), 0);

  // Group quotes by day for the chart
  const dailyDataMap = new Map<string, number>();
  for (let i = 29; i >= 0; i--) {
    const day = subDays(new Date(), i);
    dailyDataMap.set(format(day, "MMM dd"), 0);
  }

  recentQuotesData.forEach(q => {
    const dayKey = format(new Date(q.createdAt), "MMM dd");
    if (dailyDataMap.has(dayKey)) {
      dailyDataMap.set(dayKey, dailyDataMap.get(dayKey)! + 1);
    }
  });

  const chartData = Array.from(dailyDataMap.entries()).map(([date, quotes]) => ({ date, quotes }));
  const latestQuotes = recentQuotesData.slice(0, 5);

  return (
    <div className="p-4 lg:p-10 space-y-10 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 border border-blue-100/50 shadow-sm">
            <Activity size={12} /> Qalt • Smart Quotes
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">
            Analytics Overview
          </h1>
          <p className="text-slate-500 font-medium text-lg mt-2 font-['Outfit']">
            Instant insights for your logistics pipeline. <span className="text-blue-600 font-bold italic">Qalt: Quotes at light speed.</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Plan</p>
            <p className="text-sm font-bold text-slate-700">{company.subscriptionPlan}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
            <Calendar size={22} className="text-slate-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Total Leads"
          value={totalQuotes.toString()}
          subtitle={`${todayQuotesCount} today`}
          trend={todayQuotesCount > 0 ? "up" : "neutral"}
          icon={<Users size={24} className="text-blue-600" />}
          color="blue"
          delay={0.4}
        />
        <KPICard
          title="Pipeline Value"
          value={`$${pipelineValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
          subtitle={`$${todayPipeline.toLocaleString()} today`}
          trend={todayPipeline > 0 ? "up" : "neutral"}
          icon={<DollarSign size={24} className="text-emerald-600" />}
          color="emerald"
          delay={0.5}
        />
        <KPICard
          title="Avg. Deal Size"
          value={`$${avgQuoteValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subtitle="Lifetime average"
          trend="neutral"
          icon={<Calculator size={24} className="text-purple-600" />}
          color="purple"
          delay={0.6}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
