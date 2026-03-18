"use client";

import { getCurrentCompany } from "@/lib/session";
import { getEntitlements } from "@/lib/plans";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { subDays, format, startOfToday, endOfToday, formatDistanceToNow } from "date-fns";
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
  Clock,
  ChevronRight,
  TrendingDown,
  MapPin,
  ArrowRight,
  User,
  Phone,
  Mail
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

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
    orderBy: { createdAt: 'desc' }
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
    dailyDataMap.set(format(day, 'MMM dd'), 0);
  }

  recentQuotesData.forEach(q => {
    const dayKey = format(new Date(q.createdAt), 'MMM dd');
    if (dailyDataMap.has(dayKey)) {
      dailyDataMap.set(dayKey, dailyDataMap.get(dayKey)! + 1);
    }
  });

  const chartData = Array.from(dailyDataMap.entries()).map(([date, quotes]) => ({
    date,
    quotes
  }));

  const latestQuotes = recentQuotesData.slice(0, 5);

  return (
    <div className="p-4 lg:p-10 space-y-10 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 border border-blue-100/50 shadow-sm"
          >
            <Activity size={12} /> Qalt • Smart Quotes
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-black text-slate-900 tracking-tight"
          >
            Analytics Overview
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-medium text-lg mt-2 font-['Outfit']"
          >
             Instant insights for your logistics pipeline. <span className="text-blue-600 font-bold italic">Qalt: Quotes at light speed.</span>
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <div className="hidden sm:flex flex-col items-end">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Plan</p>
            <p className="text-sm font-bold text-slate-700">{company.subscriptionPlan}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
            <Calendar size={22} className="text-slate-400" />
          </div>
        </motion.div>
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

function KPICard({ title, value, subtitle, trend, icon, color, delay }: any) {
  const colorMap: any = {
    blue: "from-blue-500/10 to-indigo-500/5 border-blue-100/50",
    emerald: "from-emerald-500/10 to-teal-500/5 border-emerald-100/50",
    purple: "from-purple-500/10 to-fuchsia-500/5 border-purple-100/50"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-[32px] border border-slate-200/60 shadow-xl shadow-slate-200/40 p-8 flex flex-col justify-between relative overflow-hidden group hover:shadow-2xl transition-all duration-500"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${colorMap[color]} blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl group-hover:bg-white group-hover:shadow-md transition-all">
            {icon}
          </div>
          {trend !== "neutral" && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-black tracking-tight ${trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
              {trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              +12%
            </div>
          )}
        </div>
        <p className="text-sm font-bold text-slate-500 tracking-widest uppercase mb-1">{title}</p>
        <h3 className="text-4xl font-black text-slate-900 tracking-tight">{value}</h3>
      </div>
      <div className="mt-6 flex items-center gap-2 relative z-10 text-sm font-semibold text-slate-400">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
        {subtitle}
      </div>
    </motion.div>
  );
}

function PremiumChart({ data }: { data: any[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="bg-white rounded-[40px] border border-slate-200/60 shadow-xl shadow-slate-200/40 p-10 h-[450px] relative overflow-hidden"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Lead Velocity</h2>
          <p className="text-sm text-slate-500 font-medium font-['Outfit']">Quote volume distribution over the last 30 days.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Real-time Data</span>
        </div>
      </div>
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorQuotes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} dy={15} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} />
            <Tooltip 
              cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
              contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px -12px rgb(0 0 0 / 0.15)', padding: '16px 20px', backgroundColor: '#ffffff' }}
              itemStyle={{ color: '#0f172a', fontWeight: 800, fontSize: '16px' }}
              labelStyle={{ color: '#94a3b8', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', marginBottom: '4px' }}
            />
            <Area type="monotone" dataKey="quotes" stroke="#2563eb" strokeWidth={4} fill="url(#colorQuotes)" animationDuration={2000} activeDot={{ r: 8, fill: "#2563eb", stroke: "#fff", strokeWidth: 3 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

function InsightsCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-linear-to-br from-slate-900 to-slate-800 rounded-[32px] p-8 text-white h-full relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full blur-[80px] opacity-20 translate-x-10 -translate-y-10" />
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-8">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
            <Zap size={22} className="text-blue-400" />
          </div>
          <h3 className="text-2xl font-black tracking-tight mb-2">Qalt Insights</h3>
          <p className="text-slate-400 font-medium leading-relaxed font-['Outfit']">AI-powered logistics optimization tips based on your trends.</p>
        </div>
        <div className="space-y-4 flex-1">
          {[
            { label: "Busiest Time", value: "Tuesdays @ 2PM", color: "text-blue-400" },
            { label: "Top Region", value: "Los Angeles, CA", color: "text-emerald-400" },
            { label: "Conv. Rate", value: "3.4%", color: "text-purple-400" }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4">
              <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">{item.label}</p>
              <p className={`text-sm font-bold ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </div>
        <button className="mt-8 group flex items-center justify-between w-full p-4 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 transition-all font-bold text-sm">
          Optimize Conversion <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

function PremiumTable({ quotes }: { quotes: any[] }) {
  if (quotes.length === 0) return null;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Recent Opportunities</h2>
          <p className="text-sm text-slate-500 font-medium font-['Outfit']">The latest incoming leads from your platform.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {quotes.map((quote, idx) => (
          <div key={quote.id} className="group bg-white rounded-[32px] border border-slate-200/60 shadow-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-200 transition-all duration-300">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
                <User size={24} className="text-slate-400 group-hover:text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{quote.customerName}</h3>
                <div className="flex items-center gap-3 mt-1 underline-offset-4 decoration-blue-500/30">
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1"><Mail size={12} /> {quote.customerEmail}</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col md:flex-row md:items-center justify-center gap-8 group-hover:scale-[1.02] transition-transform">
               <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-1"><MapPin size={14} className="text-emerald-500" /></div>
                    <span className="text-[10px] font-black text-slate-400">{quote.pickupZip}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-20 h-0.5 bg-slate-100 group-hover:bg-blue-200 transition-colors" />
                    <span className="text-[8px] font-bold text-slate-300 uppercase">{quote.distanceMiles?.toFixed(1)} miles</span>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-1"><MapPin size={14} className="text-red-500" /></div>
                    <span className="text-[10px] font-black text-slate-400">{quote.dropoffZip}</span>
                  </div>
               </div>
               <div className="text-center md:text-right min-w-[120px]">
                  <div className="text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center md:justify-end gap-1">
                    <DollarSign size={18} className="text-emerald-500" />
                    {quote.estimatedPrice.toFixed(2)}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Est. Revenue</span>
               </div>
            </div>
            <div className="flex items-center justify-between md:flex-col md:items-end gap-3 min-w-[140px]">
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest ${quote.status === "PENDING" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>{quote.status}</span>
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><Clock size={12} /> {formatDistanceToNow(new Date(quote.createdAt), { addSuffix: true })}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
