import { getCurrentCompany } from "@/lib/session";
import { getEntitlements } from "@/lib/plans";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { subDays, format } from "date-fns";
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
  Calculator
} from "lucide-react";

import DashboardCharts from "./DashboardCharts";
import RecentQuotesTable from "./RecentQuotesTable";

export default async function AnalyticsPage() {
  const company = await getCurrentCompany();
  const entitlements = getEntitlements(company.subscriptionPlan);

  if (!entitlements.isAnalyticsDashboardEnabled) {
    return (
      <div className="p-4 lg:p-10 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-2xl shadow-slate-200/40 overflow-hidden relative min-h-[600px] flex flex-col items-center justify-center text-center px-6">
          {/* Decorative background elements */}
          <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-blue-500 to-indigo-600" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />

          <div className="relative z-10 max-w-md">
            <div className="inline-flex p-6 bg-amber-50 rounded-full mb-8 relative">
              <BarChart3 size={48} className="text-amber-500" />
              <div className="absolute -top-1 -right-1 bg-white p-1.5 rounded-full shadow-md">
                <Lock size={20} className="text-slate-900 fill-slate-900" />
              </div>
            </div>

            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
              Analytics is a Pro Feature
            </h1>
            <p className="text-slate-500 font-medium leading-relaxed mb-10">
              Unlock deep insights into your widget performance, customer behavior, and conversion rates. Upgrade to the Pro plan to start tracking data today.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left">
              {[
                { icon: Zap, text: "Real-time tracking" },
                { icon: Target, text: "Conversion optimization" },
                { icon: Users, text: "Visitor demographics" },
                { icon: TrendingUp, text: "Revenue forecasting" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <item.icon size={18} className="text-blue-600" />
                  <span className="text-sm font-bold text-slate-700">{item.text}</span>
                </div>
              ))}
            </div>

            <Link 
              href="/dashboard/billing"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 hover:scale-[1.02] transition-all shadow-xl shadow-blue-200 group"
            >
              Upgrade to Pro
              <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Locked Dashboard Mockup Overlay */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] pointer-events-none -z-10 opacity-20 transform scale-105 select-none">
             {/* Mocking some dashboard elements */}
             <div className="p-10 flex flex-col gap-10">
                <div className="h-40 w-full bg-slate-100 rounded-3xl" />
                <div className="grid grid-cols-3 gap-6">
                   <div className="h-32 bg-slate-100 rounded-3xl" />
                   <div className="h-32 bg-slate-100 rounded-3xl" />
                   <div className="h-32 bg-slate-100 rounded-3xl" />
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // Fetch true analytics data
  const thirtyDaysAgo = subDays(new Date(), 30);
  
  const recentQuotes = await prisma.quoteRequest.findMany({
    where: { 
      companyId: company.id,
      createdAt: { gte: thirtyDaysAgo }
    },
    orderBy: { createdAt: 'desc' }
  });

  // Calculate KPIs
  const totalQuotes = recentQuotes.length;
  const pipelineValue = recentQuotes.reduce((sum, q) => sum + (q.estimatedPrice || 0), 0);
  const avgQuoteValue = totalQuotes > 0 ? pipelineValue / totalQuotes : 0;

  // Group quotes by day for the chart
  const dailyDataMap = new Map<string, number>();
  
  // Initialize last 30 days with 0
  for (let i = 29; i >= 0; i--) {
    const day = subDays(new Date(), i);
    dailyDataMap.set(format(day, 'MMM dd'), 0);
  }

  // Populate actual data
  recentQuotes.forEach(q => {
    const dayKey = format(new Date(q.createdAt), 'MMM dd');
    if (dailyDataMap.has(dayKey)) {
      dailyDataMap.set(dayKey, dailyDataMap.get(dayKey)! + 1);
    }
  });

  const chartData = Array.from(dailyDataMap.entries()).map(([date, quotes]) => ({
    date,
    quotes
  }));

  // Take top 5 recent quotes for the table
  const latestQuotes = recentQuotes.slice(0, 5);

  return (
    <div className="p-4 lg:p-10 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Analytics Overview
          </h1>
          <p className="text-slate-500 font-medium">
             Track your conversion performance and visitor trends over the last 30 days.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard 
          title="Total Quotes" 
          value={totalQuotes.toString()} 
          icon={<Activity size={24} className="text-blue-600" />} 
        />
        <KPICard 
          title="Pipeline Value" 
          value={`$${pipelineValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
          icon={<DollarSign size={24} className="text-emerald-600" />} 
        />
        <KPICard 
          title="Avg. Quote Value" 
          value={`$${avgQuoteValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
          icon={<Calculator size={24} className="text-amber-600" />} 
        />
      </div>

      <DashboardCharts data={chartData} />
      <RecentQuotesTable quotes={latestQuotes} />
    </div>
  );
}

function KPICard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 p-6 flex flex-col justify-center">
      <div className="flex items-center gap-4 mb-2">
        <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
          {icon}
        </div>
        <p className="text-sm font-bold text-slate-500 tracking-wide uppercase">{title}</p>
      </div>
      <h3 className="text-3xl font-black text-slate-900 tracking-tight pl-1">{value}</h3>
    </div>
  );
}
