"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Search, MapPin, CalendarDays, 
  CheckCircle2, Clock, AlertCircle, ChevronRight, 
  X, Briefcase, Hash, Map, User, Check
} from "lucide-react";
import { useRouter } from "next/navigation";

const statusConfig: Record<string, { label: string; cls: string; icon: any }> = {
  PENDING:     { label: "Pending",     cls: "bg-amber-50 text-amber-700 border-amber-100", icon: Clock },
  READY:       { label: "Ready",       cls: "bg-emerald-50 text-emerald-700 border-emerald-100", icon: CheckCircle2 },
  IN_PROGRESS: { label: "In Progress", cls: "bg-blue-50 text-blue-700 border-blue-100", icon: Map },
  COMPLETED:   { label: "Completed",   cls: "bg-slate-900 text-white border-slate-900", icon: CheckCircle2 },
  ISSUE:       { label: "Issue",       cls: "bg-rose-50 text-rose-700 border-rose-100", icon: AlertCircle },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] || { label: status, cls: "bg-slate-50 text-slate-500 border-slate-100", icon: Clock };
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${cfg.cls}`}>
      <Icon size={12} />
      {cfg.label}
    </span>
  );
}

export default function JobsClient({ initialJobs, stops, quotes }: { initialJobs: any[], stops: any[], quotes: any[] }) {
  const router = useRouter();
  const [jobs, setJobs] = useState(initialJobs);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stopError, setStopError] = useState(false);

  // Modal State
  const [formData, setFormData] = useState({
    scheduledDate: new Date().toISOString().split('T')[0],
    stopNoteIds: [] as string[],
    quoteRequestId: "",
  });

  const filteredJobs = jobs.filter(job => 
    job.id.toLowerCase().includes(search.toLowerCase()) ||
    job.stops.some((js: any) => js.stopNote.companyName.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.stopNoteIds.length === 0) {
      setStopError(true);
      return;
    }
    setStopError(false);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/dashboard/ops/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const newJob = await res.json();
        // Since we need relationships for the UI, let's refresh or optimistically update
        // Simple way: redirect or window.location.reload() for a "simple" phase 1
        router.refresh();
        setIsModalOpen(false);
        setFormData({ scheduledDate: new Date().toISOString().split('T')[0], stopNoteIds: [], quoteRequestId: "" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleStop = (id: string) => {
    setFormData(prev => ({
      ...prev,
      stopNoteIds: prev.stopNoteIds.includes(id) 
        ? prev.stopNoteIds.filter(sid => sid !== id) 
        : [...prev.stopNoteIds, id]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search jobs by ID or stop name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-[#1c1c1c] border border-slate-200 dark:border-white/6 rounded-2xl shadow-sm dark:shadow-none focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium text-slate-700 dark:text-zinc-200 placeholder:text-slate-400 dark:placeholder:text-zinc-600"
          />
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3.5 bg-zinc-900 dark:bg-zinc-800 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-95 transition-all shadow-lg shadow-slate-200 dark:shadow-none"
        >
          <Plus size={20} />
          Create New Job
        </button>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white dark:bg-[#141414] rounded-[32px] border border-slate-200/60 dark:border-white/6 shadow-xl dark:shadow-none p-12 text-center">
          <div className="p-6 bg-red-50 dark:bg-red-500/10 rounded-3xl w-24 h-24 flex items-center justify-center mx-auto mb-6 text-red-600 dark:text-red-400">
            <Briefcase size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No Active Jobs</h2>
          <p className="text-slate-500 dark:text-zinc-400 font-medium mb-8 max-w-sm mx-auto">
            Get started by creating a job and assigning stops from your saved notes library.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3.5 bg-zinc-900 dark:bg-zinc-800 text-white rounded-xl font-bold hover:bg-zinc-800 dark:hover:bg-zinc-700 transition-all"
          >
            Create Your First Job
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
            {filteredJobs.map((job) => (
                <div 
                  key={job.id}
                  onClick={() => router.push(`/dashboard/ops/jobs/${job.id}`)}
                  className="bg-white dark:bg-[#141414] rounded-4xl border border-slate-200/60 dark:border-white/6 shadow-sm dark:shadow-none p-6 hover:shadow-xl dark:hover:shadow-none hover:border-slate-300 dark:hover:border-white/10 transition-all cursor-pointer group flex flex-col md:flex-row md:items-center gap-6"
                >
                    <div className="flex items-center gap-4 shrink-0">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-zinc-500 group-hover:bg-zinc-900 dark:group-hover:bg-zinc-700 group-hover:text-white transition-all">
                           <Briefcase size={28} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                                JOB #{job.id.slice(-6).toUpperCase()}
                            </p>
                            <StatusBadge status={job.status} />
                        </div>
                    </div>

                    <div className="flex-1 min-w-0 px-2 space-y-2">
                        <div className="flex items-center gap-3">
                            <CalendarDays size={14} className="text-red-500" />
                            <span className="text-sm font-black text-slate-800 dark:text-white">
                                {new Date(job.scheduledDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 overflow-hidden">
                            <div className="flex -space-x-2">
                                {job.stops.map((js: any, idx: number) => (
                                    <div key={js.id} className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-slate-600">
                                        {idx + 1}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs font-bold text-slate-500 dark:text-zinc-500 truncate">
                                {job.stops.map((js: any) => js.stopNote.companyName).join(' → ')}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Readiness</p>
                            {job.readinessChecks?.[0]?.status === 'READY' ? (
                                <span className="text-emerald-600 font-black text-xs flex items-center gap-1 justify-end">
                                    <CheckCircle2 size={12} /> VERIFIED
                                </span>
                            ) : (
                                <span className="text-amber-500 font-black text-xs flex items-center gap-1 justify-end">
                                    <Clock size={12} /> PENDING
                                </span>
                            )}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-300 dark:text-zinc-600 group-hover:text-slate-900 dark:group-hover:text-white group-hover:bg-slate-100 dark:group-hover:bg-white/10 transition-all">
                            <ChevronRight size={20} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )}

      {/* Create Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white dark:bg-[#161616] rounded-[2.5rem] w-full max-w-xl max-h-[85vh] overflow-y-auto shadow-2xl dark:shadow-black/60 p-6 sm:p-10 scrollbar-hide border dark:border-white/6"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Schedule New Job</h2>
                <p className="text-slate-400 dark:text-zinc-500 text-sm font-bold">Connect stops into a single delivery</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-zinc-500 hover:bg-slate-200 dark:hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Scheduled Date</label>
                <input
                  type="date"
                  required
                  value={formData.scheduledDate}
                  onChange={e => setFormData({...formData, scheduledDate: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-100 dark:bg-[#1c1c1c] border border-slate-300 dark:border-white/6 rounded-2xl text-sm font-bold text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-red-500 outline-none dark:scheme-dark"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Select Stops (Library)</label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {stops.map((stop) => (
                    <button
                      key={stop.id}
                      type="button"
                      onClick={() => { toggleStop(stop.id); setStopError(false); }}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${
                        formData.stopNoteIds.includes(stop.id)
                        ? "bg-zinc-900 dark:bg-zinc-700 border-zinc-900 dark:border-zinc-600 text-white shadow-lg dark:shadow-none"
                        : "bg-white dark:bg-[#1c1c1c] border-slate-100 dark:border-white/6 hover:border-slate-200 dark:hover:border-white/15 text-slate-700 dark:text-zinc-300"
                      }`}
                    >
                      <div className="min-w-0 pr-4">
                        <p className="font-black text-sm truncate leading-none mb-1">{stop.companyName}</p>
                        <p className={`text-[10px] font-bold truncate ${formData.stopNoteIds.includes(stop.id) ? "text-slate-400" : "text-slate-400"}`}>
                           {stop.address}
                        </p>
                      </div>
                      {formData.stopNoteIds.includes(stop.id) && <Check size={16} className="shrink-0 text-red-500" />}
                    </button>
                  ))}
                  {stops.length === 0 && (
                     <p className="text-xs text-slate-400 font-bold italic p-4 text-center">No stop notes saved. Create them first in Stops Console.</p>
                  )}
                </div>
                {stopError && (
                  <p className="text-xs font-black text-rose-500 px-1 flex items-center gap-1">
                    <span>⚠</span> Select at least one stop to create a job.
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Linked Quote (Optional)</label>
                <select
                  value={formData.quoteRequestId}
                  onChange={e => setFormData({...formData, quoteRequestId: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-100 dark:bg-[#1c1c1c] border border-slate-300 dark:border-white/6 rounded-2xl text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none appearance-none cursor-pointer"
                >
                  <option value="">No linked quote</option>
                  {quotes.map((q) => (
                    <option key={q.id} value={q.id}>{q.customerName} - {q.pickupZip} → {q.dropoffZip}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-zinc-400 rounded-2xl font-black hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className={`flex-2 py-4 rounded-2xl font-black transition-all shadow-xl ${
                    isSubmitting
                      ? "bg-zinc-600 text-white shadow-none cursor-not-allowed"
                      : "bg-zinc-900 dark:bg-zinc-800 text-white shadow-slate-200 dark:shadow-none hover:bg-zinc-800 dark:hover:bg-zinc-700"
                  }`}
                >
                  {isSubmitting ? "Creating..." : "Create Job"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
