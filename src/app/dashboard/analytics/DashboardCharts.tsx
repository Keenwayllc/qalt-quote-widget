"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface DailyData {
  date: string;
  quotes: number;
}

interface DashboardChartsProps {
  data: DailyData[];
}

export default function DashboardCharts({ data }: DashboardChartsProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 p-6 md:p-8 h-[400px]">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Quote Volume (30 Days)</h2>
        <p className="text-sm text-slate-500 font-medium">Daily quote requests over the last 30 days.</p>
      </div>
      
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorQuotes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#0f172a', fontWeight: 600 }}
            />
            <Area 
              type="monotone" 
              dataKey="quotes" 
              stroke="#2563eb" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorQuotes)" 
              activeDot={{ r: 6, fill: "#2563eb", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
