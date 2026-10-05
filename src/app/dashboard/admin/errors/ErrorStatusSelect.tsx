"use client";

import { useState } from "react";

const LABELS: Record<string, string> = { NEW: "New", INVESTIGATING: "Investigating", FIXED: "Fixed", IGNORED: "Ignored" };

export default function ErrorStatusSelect({ id, status }: { id: string; status: string }) {
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState(false);

  const change = async (next: string) => {
    const previous = value;
    setValue(next);
    setSaving(true);
    setFailed(false);
    try {
      const res = await fetch("/api/dashboard/admin/errors", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: next }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setValue(previous);
      setFailed(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <select value={value} disabled={saving} onChange={(e) => change(e.target.value)} aria-label="Error status"
      className={`rounded-lg border px-2 py-1 text-xs font-semibold dark:bg-[#1e1e1e] ${failed ? "border-red-400 text-red-600" : "border-slate-200 text-slate-700 dark:border-white/10 dark:text-slate-200"}`}>
      {Object.entries(LABELS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
    </select>
  );
}
