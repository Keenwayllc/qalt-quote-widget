"use client";

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
  User
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
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

export function InsightsCard() {
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
