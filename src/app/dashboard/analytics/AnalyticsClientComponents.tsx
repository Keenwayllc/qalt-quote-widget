"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Zap,
  DollarSign,
  Users,
  Calculator,
  ChevronRight,
  MapPin,
  Mail,
  Clock,
  User,
  X,
  Target,
  BarChart2,
  ArrowUpRight,
  Lightbulb,
  AlertCircle,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

export function KPICard({ title, value, subtitle, trend, icon, color, delay }: {
  title: string;
  value: string;
  subtitle: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
  color: string;
  delay: number;
}) {
  const colorMap: Record<string, string> = {
    blue: "from-red-500/10 to-slate-500/5 border-red-100/50",
    emerald: "from-emerald-500/10 to-teal-500/5 border-emerald-100/50",
    purple: "from-rose-500/10 to-fuchsia-500/5 border-rose-100/50"
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

export function PremiumChart({ data }: { data: { date: string; quotes: number }[] }) {
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
          <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
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

interface InsightsData {
  busiestTime: string;
  topRegion: string;
  conversionRate: number;
  convTrend: "up" | "down" | "neutral";
  topService: string;
  avgQuoteValue: number;
  valueTrend: "up" | "down" | "neutral";
  avgDistance: number;
  weekOverWeek: number | null;
  thisWeekCount: number;
  totalLast30: number;
}

function buildRecommendations(data: InsightsData) {
  const tips: { icon: React.ReactNode; priority: "high" | "medium" | "quick"; title: string; desc: string; action: string; href: string }[] = [];

  if (data.conversionRate < 5) {
    tips.push({
      icon: <Target size={18} className="text-red-400" />,
      priority: "high",
      title: "Low conversion rate detected",
      desc: `Your conversion rate is ${data.conversionRate.toFixed(1)}%. Most businesses see 10–20%. Review your pricing — quotes may be coming in too high or your widget isn't collecting enough context to price accurately.`,
      action: "Review Pricing Settings",
      href: "/dashboard/pricing",
    });
  }

  if (data.totalLast30 < 10) {
    tips.push({
      icon: <BarChart2 size={18} className="text-amber-400" />,
      priority: "high",
      title: "Quote volume is low",
      desc: `Only ${data.totalLast30} quotes in the last 30 days. Copy your embed code and paste it on a high-traffic page — ideally your homepage or a dedicated "Get a Quote" page. More visibility = more quotes.`,
      action: "Copy Embed Code",
      href: "/dashboard/embed",
    });
  }

  if (data.avgQuoteValue > 0 && data.avgQuoteValue < 50) {
    tips.push({
      icon: <DollarSign size={18} className="text-emerald-400" />,
      priority: "medium",
      title: "Average quote value is low",
      desc: `Your average quote is $${data.avgQuoteValue.toFixed(0)}. Consider adding extras like after-hours, special handling, or rush delivery options to increase order value.`,
      action: "Add Pricing Extras",
      href: "/dashboard/pricing",
    });
  }

  if (data.avgDistance > 80) {
    tips.push({
      icon: <MapPin size={18} className="text-red-400" />,
      priority: "medium",
      title: "Long-distance jobs are common",
      desc: `Average distance is ${data.avgDistance.toFixed(0)} miles. Make sure your per-mile rate is profitable at this range. Consider a tiered rate for jobs over 50 miles.`,
      action: "Update Pricing Rules",
      href: "/dashboard/pricing",
    });
  }

  if (data.thisWeekCount === 0) {
    tips.push({
      icon: <AlertCircle size={18} className="text-orange-400" />,
      priority: "quick",
      title: "No quotes this week",
      desc: "You haven't received any quotes this week. Check that your widget is still live on your site and that the embed code hasn't been removed.",
      action: "Check Your Embed Code",
      href: "/dashboard/embed",
    });
  }

  // Always include a general best-practice tip
  tips.push({
    icon: <Lightbulb size={18} className="text-yellow-400" />,
    priority: "quick",
    title: "Your busiest time is " + data.busiestTime,
    desc: `Schedule promotions or social posts just before your peak time to drive more traffic when conversion is highest. Even a small boost in traffic during peak hours compounds quickly.`,
    action: "View Widget Appearance",
    href: "/dashboard/widget",
  });

  return tips;
}

const priorityLabel: Record<string, { label: string; cls: string }> = {
  high:   { label: "High Impact",   cls: "bg-red-500/20 text-red-300 border-red-500/20" },
  medium: { label: "Medium Impact", cls: "bg-amber-500/20 text-amber-300 border-amber-500/20" },
  quick:  { label: "Quick Win",     cls: "bg-emerald-500/20 text-emerald-300 border-emerald-500/20" },
};

export function InsightsCard() {
  const [data, setData] = useState<InsightsData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/dashboard/insights")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {});
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!modalOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setModalOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalOpen]);

  const items = data
    ? [
        { label: "Busiest Time", value: data.busiestTime, color: "text-red-400" },
        { label: "Top Region", value: data.topRegion, color: "text-emerald-400" },
        { label: "Conv. Rate", value: `${data.conversionRate.toFixed(1)}%`, color: "text-rose-400" },
      ]
    : [
        { label: "Busiest Time", value: "Loading…", color: "text-red-400" },
        { label: "Top Region", value: "Loading…", color: "text-emerald-400" },
        { label: "Conv. Rate", value: "Loading…", color: "text-rose-400" },
      ];

  const recommendations = data ? buildRecommendations(data) : [];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-linear-to-br from-slate-900 to-slate-800 rounded-[32px] p-8 text-white h-full relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-red-500 rounded-full blur-[80px] opacity-20 translate-x-10 -translate-y-10" />
        <div className="relative z-10 flex flex-col h-full">
          <div className="mb-8">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
              <Zap size={22} className="text-red-400" />
            </div>
            <h3 className="text-2xl font-black tracking-tight mb-2">Qalt Insights</h3>
            <p className="text-slate-400 font-medium leading-relaxed font-['Outfit']">Live metrics from your last 90 days of quote activity.</p>
          </div>
          <div className="space-y-4 flex-1">
            {items.map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4">
                <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">{item.label}</p>
                <p className={`text-sm font-bold ${item.color}`}>{item.value}</p>
              </div>
            ))}
          </div>
          {data && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/5 rounded-2xl p-3">
                <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">Avg Value</p>
                <p className="text-sm font-bold text-amber-400">${data.avgQuoteValue.toFixed(0)}</p>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-3">
                <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">This Week</p>
                <p className="text-sm font-bold text-sky-400">{data.thisWeekCount} quotes</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setModalOpen(true)}
            className="mt-6 group flex items-center justify-between w-full p-4 bg-white/10 hover:bg-white/20 active:scale-95 rounded-2xl border border-white/10 transition-all font-bold text-sm"
          >
            Optimize Conversion <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* Optimize Conversion Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-slate-950 z-50 overflow-y-auto shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 bg-slate-950/95 backdrop-blur-md border-b border-white/10 px-6 py-5 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center">
                    <ArrowUpRight size={18} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-black text-lg tracking-tight">Optimize Conversion</h2>
                    <p className="text-slate-500 text-xs font-medium">Based on your last 90 days of data</p>
                  </div>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all active:scale-90"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Summary strip */}
              {data && (
                <div className="px-6 py-4 grid grid-cols-3 gap-3 border-b border-white/5">
                  {[
                    { label: "Conv. Rate", value: `${data.conversionRate.toFixed(1)}%`, color: "text-rose-400" },
                    { label: "Avg Value",  value: `$${data.avgQuoteValue.toFixed(0)}`,   color: "text-amber-400" },
                    { label: "This Week",  value: `${data.thisWeekCount} quotes`,         color: "text-sky-400" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/5 rounded-2xl p-3 text-center">
                      <p className="text-[9px] uppercase font-black text-slate-500 tracking-widest mb-1">{s.label}</p>
                      <p className={`text-sm font-black ${s.color}`}>{s.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Recommendations */}
              <div className="px-6 py-6 space-y-4">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">
                  {recommendations.length} recommendation{recommendations.length !== 1 ? "s" : ""} for your account
                </p>
                {recommendations.length === 0 && (
                  <div className="text-center py-12 text-slate-500 font-medium">
                    Loading recommendations…
                  </div>
                )}
                {recommendations.map((tip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-white/5 border border-white/5 rounded-2xl p-5"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 bg-white/5 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                        {tip.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-white font-black text-sm">{tip.title}</span>
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${priorityLabel[tip.priority].cls}`}>
                            {priorityLabel[tip.priority].label}
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed font-medium">{tip.desc}</p>
                      </div>
                    </div>
                    <a
                      href={tip.href}
                      className="flex items-center gap-1.5 text-xs font-black text-red-600 hover:text-red-700 transition-colors mt-2 group/link"
                    >
                      {tip.action}
                      <ArrowUpRight size={13} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function PremiumTable({ quotes }: { quotes: {
  id: string;
  customerName: string;
  customerEmail: string;
  pickupZip: string;
  dropoffZip: string;
  distanceMiles: number | null;
  estimatedPrice: number;
  status: string;
  createdAt: Date;
}[] }) {
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
        {quotes.map((quote) => (
          <div key={quote.id} className="group bg-white rounded-[32px] border border-slate-200/60 shadow-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-red-200 transition-all duration-300">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-red-50 transition-colors">
                <User size={24} className="text-slate-400 group-hover:text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{quote.customerName}</h3>
                <div className="flex items-center gap-3 mt-1 underline-offset-4 decoration-red-500/30">
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
                    <div className="w-20 h-0.5 bg-slate-100 group-hover:bg-red-200 transition-colors" />
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
