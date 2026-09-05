"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from "next-themes";

interface ServiceData {
  name: string;
  value: number;
}

interface ServiceTypeChartProps {
  data: ServiceData[];
}

const COLORS = ["#df1731", "#3159ca", "#087c68", "#7950bf", "#d97706", "#646b76"];

export default function ServiceTypeChart({ data }: ServiceTypeChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="bg-white dark:bg-[#141414] p-5 sm:p-6 border border-[#e2e4e9] dark:border-white/[0.07] flex flex-col h-full">
      <div className="mb-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8a919d] dark:text-slate-500">Mix</p>
        <h3 className="mt-1.5 text-lg font-bold tracking-[-0.02em] text-[#22252b] dark:text-white">Request breakdown</h3>
        <p className="mt-1 text-xs text-[#777e89] dark:text-slate-400">Quotes by service type</p>
      </div>

      <div className="flex-1 min-h-[250px] w-full flex items-center justify-center">
        {data.length === 0 ? (
          <div className="text-sm text-[#9aa0aa] dark:text-slate-500">Not enough data yet</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={58}
                outerRadius={78}
                paddingAngle={2}
                dataKey="value"
                animationDuration={900}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1c1c1c" : "#ffffff",
                  borderRadius: 0,
                  border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e2e4e9",
                  boxShadow: "0 12px 32px rgba(34,37,43,0.10)",
                  padding: "8px 10px",
                  color: isDark ? "#f4f4f5" : "#22252b",
                }}
                itemStyle={{ fontWeight: 700, fontSize: "12px" }}
              />
              <Legend
                verticalAlign="bottom"
                height={38}
                iconType="square"
                iconSize={8}
                wrapperStyle={{ fontSize: "11px", fontWeight: 500, color: isDark ? "#8a919d" : "#777e89" }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
