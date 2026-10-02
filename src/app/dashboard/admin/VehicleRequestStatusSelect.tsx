"use client";

import { useState } from "react";
import { VEHICLE_REQUEST_STATUSES, VEHICLE_REQUEST_STATUS_LABELS, type VehicleRequestStatus } from "@/lib/vehicle-requests";

export default function VehicleRequestStatusSelect({ id, status }: { id: string; status: string }) {
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const change = async (next: string) => {
    const previous = value;
    setValue(next);
    setSaving(true);
    setError(false);
    try {
      const res = await fetch("/api/dashboard/admin/vehicle-requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: next }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setValue(previous);
      setError(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <select value={value} disabled={saving} onChange={(e) => change(e.target.value)} aria-label="Request status"
      className={`rounded-lg border px-2 py-1 text-xs font-semibold dark:bg-[#1e1e1e] ${error ? "border-red-400 text-red-600" : "border-slate-200 text-slate-700 dark:border-white/10 dark:text-slate-200"}`}>
      {VEHICLE_REQUEST_STATUSES.map((s) => (
        <option key={s} value={s}>{VEHICLE_REQUEST_STATUS_LABELS[s as VehicleRequestStatus]}</option>
      ))}
    </select>
  );
}
