"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PLANS = ["STARTER", "PRO", "ENTERPRISE"] as const;

export default function PlanSelect({
  companyId,
  plan,
}: {
  companyId: string;
  plan: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(plan);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const change = async (newPlan: string) => {
    const prev = value;
    setValue(newPlan);
    setSaving(true);
    setError(false);
    try {
      const res = await fetch("/api/dashboard/admin/set-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId, plan: newPlan }),
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      setValue(prev);
      setError(true);
      setTimeout(() => setError(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <select
      value={value}
      disabled={saving}
      onChange={(e) => change(e.target.value)}
      className={`px-2 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wide border bg-white dark:bg-[#1e1e1e] text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 ${
        error ? "border-red-400" : "border-slate-300 dark:border-white/10"
      }`}
      title="Change this company's plan"
    >
      {PLANS.map((p) => (
        <option key={p} value={p}>
          {p}
        </option>
      ))}
    </select>
  );
}
