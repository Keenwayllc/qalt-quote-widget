"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";

interface DailyQuoteData {
  date: string;
  count: number;
}

interface QuoteTrendChartProps {
  data: DailyQuoteData[];
}

export default function QuoteTrendChart({ data }: QuoteTrendChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="bg-white dark:bg-[#141414] p-5 sm:p-6 border border-[#e2e4e9] dark:border-white/[0.07] flex flex-col h-full">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a919d] dark:text-slate-500">Performance</p>
          <h3 className="mt-1.5 text-lg font-bold tracking-[-0.02em] text-[#22252b] dark:text-white">Quote requests</h3>
          <p className="mt-1 text-xs text-[#777e89] dark:text-slate-400">Last 7 days</p>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-medium text-[#777e89] dark:text-slate-400">
          <span className="w-2 h-2 bg-[#df1731]" />
          Requests
        </div>
      </div>

      <div className="flex-1 min-h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 6, left: -24, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke={isDark ? "rgba(255,255,255,0.05)" : "#eef0f3"} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: isDark ? "#8a919d" : "#8a919d", fontWeight: 500 }}
              dy={9}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: isDark ? "#8a919d" : "#8a919d", fontWeight: 500 }}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: isDark ? "rgba(255,255,255,0.025)" : "#fafbfc" }}
              contentStyle={{
                backgroundColor: isDark ? "#1c1c1c" : "#ffffff",
                borderRadius: 0,
                border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e4e9",
                boxShadow: "0 12px 32px rgba(34,37,43,0.10)",
                padding: "8px 10px",
                color: isDark ? "#f4f4f5" : "#22252b",
              }}
              labelStyle={{ color: "#8a919d", fontWeight: 600, fontSize: "11px", marginBottom: "3px" }}
              itemStyle={{ color: "#df1731", fontWeight: 700, fontSize: "13px", padding: 0 }}
            />
            <Bar dataKey="count" name="Quotes" fill="#df1731" radius={[0, 0, 0, 0]} maxBarSize={42} animationDuration={900} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
