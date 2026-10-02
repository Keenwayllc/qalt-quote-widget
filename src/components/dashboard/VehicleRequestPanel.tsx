"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, Send } from "lucide-react";
import { VEHICLE_REQUEST_STATUS_LABELS, type VehicleRequestStatus } from "@/lib/vehicle-requests";

type SentRequest = { id: string; vehicleName: string; status: VehicleRequestStatus; createdAt: string };

const STATUS_STYLES: Record<VehicleRequestStatus, string> = {
  NEW: "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300",
  IN_PROGRESS: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  ADDED: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  DECLINED: "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-400",
};

const input = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-500 dark:border-white/10 dark:bg-[#1e1e1e] dark:text-white";

/** Lets a merchant ask Qalt to add a vehicle to the shared catalog. */
export default function VehicleRequestPanel() {
  const [open, setOpen] = useState(false);
  const [vehicleName, setVehicleName] = useState("");
  const [description, setDescription] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sentName, setSentName] = useState("");
  const [requests, setRequests] = useState<SentRequest[]>([]);

  useEffect(() => {
    if (!open) return;
    let active = true;
    fetch("/api/dashboard/vehicle-requests")
      .then((res) => (res.ok ? res.json() : { requests: [] }))
      .then((data: { requests: SentRequest[] }) => { if (active) setRequests(data.requests ?? []); })
      .catch(() => {});
    return () => { active = false; };
  }, [open]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/dashboard/vehicle-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicleName, description, referenceUrl }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not send your request. Please try again.");
      setRequests((current) => [data.request, ...current]);
      setSentName(vehicleName.trim());
      setVehicleName("");
      setDescription("");
      setReferenceUrl("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send your request. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/60 dark:border-white/10 dark:bg-white/[0.02]">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left">
        <span>
          <span className="block text-sm font-black text-slate-900 dark:text-white">Don&apos;t see your vehicle?</span>
          <span className="block text-xs text-slate-500 dark:text-slate-400">Tell us what you need. Qalt Systems adds it to the catalog for every merchant.</span>
        </span>
        <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {open && (
        <div className="space-y-4 border-t border-slate-200 px-4 py-4 dark:border-white/10">
          {sentName && (
            <p className="flex items-start gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300">
              <Check size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
              Thanks. We got your request for &ldquo;{sentName}&rdquo; and will let you know when it&apos;s added.
            </p>
          )}

          <form onSubmit={submit} className="space-y-3">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
              Vehicle name
              <input value={vehicleName} onChange={(e) => setVehicleName(e.target.value)} maxLength={80} required
                placeholder="e.g. Hotshot with 40 ft gooseneck" className={`mt-1 ${input}`} />
            </label>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
              Description
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={2000} required rows={4}
                placeholder="As much detail as you can: body type, length, axles, capacity or weight, liftgate or special equipment, and what you use it for."
                className={`mt-1 ${input}`} />
            </label>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-200">
              Reference link <span className="font-medium text-slate-400">(optional photo or listing)</span>
              <input value={referenceUrl} onChange={(e) => setReferenceUrl(e.target.value)} maxLength={500} type="url"
                placeholder="https://" className={`mt-1 ${input}`} />
            </label>
            {error && <p className="text-xs font-semibold text-red-600 dark:text-red-400">{error}</p>}
            <button type="submit" disabled={sending}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-white dark:text-slate-900">
              <Send size={13} aria-hidden="true" /> {sending ? "Sending..." : "Send request"}
            </button>
          </form>

          {requests.length > 0 && (
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your requests</p>
              <ul className="mt-2 space-y-1.5">
                {requests.map((request) => (
                  <li key={request.id} className="flex items-center justify-between gap-3 text-xs">
                    <span className="truncate font-semibold text-slate-700 dark:text-slate-200">{request.vehicleName}</span>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${STATUS_STYLES[request.status] ?? STATUS_STYLES.NEW}`}>
                      {VEHICLE_REQUEST_STATUS_LABELS[request.status] ?? "Requested"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
