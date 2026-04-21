"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { useTheme } from "next-themes";

interface ServiceData {
  name: string;
  value: number;
}

interface ServiceTypeChartProps {
  data: ServiceData[];
}

const COLORS = ["#e9001a", "#4f515b", "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6"];

export default function ServiceTypeChart({ data }: ServiceTypeChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-none border border-slate-200/60 dark:border-white/[0.06] shadow-sm dark:shadow-none flex flex-col h-full">
      <div className="mb-2">
        <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Request Breakdown
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Quotes by service type</p>
      </div>

      <div className="flex-1 min-h-[240px] w-full flex items-center justify-center">
        {data.length === 0 ? (
          <div className="text-sm font-medium text-slate-400 dark:text-slate-500">Not enough data</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#252526" : "#ffffff",
                  borderRadius: "12px",
                  border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e8f0",
                  boxShadow: isDark ? "0 10px 15px -3px rgba(0,0,0,0.4)" : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  padding: "8px 12px",
                  color: isDark ? "#e2e8f0" : undefined,
                }}
                itemStyle={{ fontWeight: 700, fontSize: "13px" }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: "12px", fontWeight: 600, color: isDark ? "#94a3b8" : "#64748b" }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
