"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Shield, CheckCircle2, CalendarDays,
  Save, Check
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  stops: Array<{ id: string; stopNote: { id: string; companyName: string } }>;
  onSuccess: () => void;
}

const Toggle = ({ active, onChange, label, sublabel }: { active: boolean; onChange: (v: boolean) => void; label: string; sublabel: string }) => (
  <button
    type="button"
    onClick={() => onChange(!active)}
    className={`group flex items-center justify-between p-5 rounded-2xl border-2 transition-all text-left ${
      active
        ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200"
        : "bg-white border-slate-100 text-slate-600 hover:border-slate-200"
    }`}
  >
    <div className="space-y-0.5">
      <p className="font-black text-xs uppercase tracking-widest">{label}</p>
      <p className={`text-[10px] font-bold ${active ? "text-slate-400" : "text-slate-400"}`}>{sublabel}</p>
    </div>
    <div className={`w-11 h-6 rounded-full relative transition-all shrink-0 ml-4 ${active ? "bg-red-500" : "bg-slate-200"}`}>
      <motion.div
        animate={{ x: active ? 22 : 4 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
      />
    </div>
  </button>
);

export default function ReadinessModal({ isOpen, onClose, jobId, stops, onSuccess }: Props) {
  const [selectedStopId, setSelectedStopId] = useState(stops[0]?.stopNote?.id || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [checkData, setCheckData] = useState({
    scheduledDate: new Date().toISOString().split("T")[0],
    contactConfirmed: false,
    addressConfirmed: false,
    accessConfirmed: false,
    siteReady: false,
    notes: "",
  });

  const allReady =
    checkData.contactConfirmed &&
    checkData.addressConfirmed &&
    checkData.accessConfirmed &&
    checkData.siteReady;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStopId) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/dashboard/ops/readiness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stopNoteId: selectedStopId,
          jobId,
          ...checkData,
          status: allReady ? "READY" : "NEEDS_REVIEW",
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onSuccess();
          onClose();
        }, 1200);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="bg-white rounded-[2.5rem] w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-8 pb-0 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shrink-0">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Verify Readiness</h2>
                    <p className="text-xs font-bold text-slate-400">Pre-dispatch confirmation check</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Stop Selector (only if multiple stops on job) */}
                {stops.length > 1 && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Checking Stop</label>
                    <select
                      value={selectedStopId}
                      onChange={(e) => setSelectedStopId(e.target.value)}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      {stops.map((js) => (
                        <option key={js.stopNote.id} value={js.stopNote.id}>
                          {js.stopNote.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Target Date */}
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <CalendarDays size={18} className="text-slate-400 shrink-0" />
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Date</p>
                    <input
                      type="date"
                      value={checkData.scheduledDate}
                      onChange={(e) => setCheckData({ ...checkData, scheduledDate: e.target.value })}
                      className="bg-transparent font-black text-slate-900 text-sm focus:outline-none"
                    />
                  </div>
                  <div className={`ml-auto px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                    allReady
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : "bg-amber-50 text-amber-600 border-amber-100"
                  }`}>
                    {allReady ? "All Clear" : "Pending"}
                  </div>
                </div>

                {/* Toggle Checks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Toggle active={checkData.contactConfirmed} onChange={(v) => setCheckData({ ...checkData, contactConfirmed: v })} label="Contact Confirmed" sublabel="Spoke with site contact" />
                  <Toggle active={checkData.addressConfirmed} onChange={(v) => setCheckData({ ...checkData, addressConfirmed: v })} label="Address Verified" sublabel="Correct location confirmed" />
                  <Toggle active={checkData.accessConfirmed} onChange={(v) => setCheckData({ ...checkData, accessConfirmed: v })} label="Access Clear" sublabel="Gate / Dock is available" />
                  <Toggle active={checkData.siteReady} onChange={(v) => setCheckData({ ...checkData, siteReady: v })} label="Site Ready" sublabel="Staff / freight prepared" />
                </div>

                {/* Notes */}
                <textarea
                  value={checkData.notes}
                  onChange={(e) => setCheckData({ ...checkData, notes: e.target.value })}
                  placeholder="Optional readiness notes..."
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                  rows={2}
                />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!selectedStopId || isSubmitting}
                  className={`w-full py-4 rounded-2xl font-black text-base shadow-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
                    success
                      ? "bg-emerald-600 text-white"
                      : !selectedStopId || isSubmitting
                      ? "bg-slate-100 text-slate-300 shadow-none cursor-not-allowed"
                      : "bg-slate-900 text-white shadow-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {success ? (
                    <><Check size={20} /> Readiness Saved</>
                  ) : (
                    <><Save size={18} />{isSubmitting ? "Saving..." : "Submit Check"}</>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
