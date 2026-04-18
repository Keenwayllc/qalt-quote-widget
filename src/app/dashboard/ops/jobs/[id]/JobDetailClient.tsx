"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Building2, MapPin, User, 
  Phone, Clock, Shield, CheckCircle2, 
  AlertCircle, History, Play, Check, 
  ChevronRight, ExternalLink, AlertTriangle, Map
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ExceptionDrawer from "@/components/dashboard/ExceptionDrawer";
import ReadinessModal from "@/components/dashboard/ReadinessModal";

export default function JobDetailClient({ job: initialJob }: { job: any }) {
  const router = useRouter();
  const [job, setJob] = useState(initialJob);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isReadinessOpen, setIsReadinessOpen] = useState(false);

  const updateStatus = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/dashboard/ops/jobs/${job.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setJob({ ...job, status: updated.status });
        router.refresh();
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const latestReadiness = job.readinessChecks[0];

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link 
          href="/dashboard/ops/jobs"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-red-600 font-bold text-sm transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-red-50 transition-colors">
            <ArrowLeft size={16} />
          </div>
          Back to Jobs
        </Link>
        <div className="flex gap-2">
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-black hover:bg-rose-100 transition-all shadow-sm"
            >
              <AlertCircle size={16} />
              Log Field Exception
            </button>
            
            {job.status === 'READY' && (
                <button 
                    onClick={() => updateStatus('IN_PROGRESS')}
                    disabled={isUpdating}
                    className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-black hover:bg-slate-800 shadow-lg shadow-slate-200 disabled:opacity-50"
                >
                    <Play size={16} fill="currentColor" />
                    Start Execution
                </button>
            )}

            {(job.status === 'IN_PROGRESS' || job.status === 'ISSUE') && (
                <button 
                    onClick={() => updateStatus('COMPLETED')}
                    disabled={isUpdating}
                    className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-black hover:bg-emerald-700 shadow-lg shadow-emerald-100 disabled:opacity-50"
                >
                    <Check size={16} />
                    Mark Completed
                </button>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Job State & Info */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm p-8 sm:p-10 relative overflow-hidden">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Job Workflow</p>
                   <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-4">
                     #{job.id.slice(-8).toUpperCase()}
                   </h1>
                   <div className="flex flex-wrap gap-2">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border transition-colors ${
                        job.status === 'ISSUE' ? "bg-rose-50 border-rose-100 text-rose-600" :
                        job.status === 'READY' ? "bg-emerald-50 border-emerald-100 text-emerald-600" :
                        job.status === 'PENDING' ? "bg-amber-50 border-amber-100 text-amber-600" :
                        job.status === 'IN_PROGRESS' ? "bg-blue-50 border-blue-100 text-blue-600" :
                        "bg-slate-900 text-white border-slate-900"
                      }`}>
                         {job.status.replace('_', ' ')}
                      </span>
                      <span className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-xs font-black uppercase tracking-widest">
                         {new Date(job.scheduledDate).toLocaleDateString(undefined, { dateStyle: 'long' })}
                      </span>
                   </div>
                </div>

                {job.quoteRequest && (
                    <Link 
                      href={`/dashboard/quotes?id=${job.quoteRequest.id}`}
                      className="inline-flex items-center gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-red-200 group transition-all"
                    >
                       <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-red-500 group-hover:border-red-100 transition-all">
                          <ExternalLink size={18} />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Source Quote</p>
                          <p className="text-xs font-black text-slate-800 leading-none">View Deal Details</p>
                       </div>
                    </Link>
                )}
             </div>

             {/* Steps Flow */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button
                    type="button"
                    onClick={() => setIsReadinessOpen(true)}
                    className={`block w-full text-left p-8 rounded-[2rem] border-2 transition-all group ${
                        latestReadiness?.status === 'READY'
                        ? "bg-emerald-50 border-emerald-100 hover:border-emerald-200"
                        : "bg-white border-slate-100 hover:border-amber-200"
                    }`}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${latestReadiness?.status === 'READY' ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400 group-hover:text-amber-500"}`}>
                            <Shield size={24} />
                        </div>
                        {latestReadiness?.status === 'READY' ? (
                            <CheckCircle2 size={24} className="text-emerald-500" />
                        ) : (
                            <ChevronRight size={24} className="text-slate-200 group-hover:text-amber-400" />
                        )}
                    </div>
                    <h3 className="font-black text-slate-900 mb-1">Verify Readiness</h3>
                    <p className="text-xs font-bold text-slate-500">
                        {latestReadiness?.status === 'READY'
                            ? "Verified check complete"
                            : "Tap to confirm pre-dispatch"}
                    </p>
                </button>

                <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 opacity-60">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-300 mb-4">
                        <Map size={24} />
                    </div>
                    <h3 className="font-black text-slate-400 mb-1">Execution Hub</h3>
                    <p className="text-xs font-bold text-slate-400">Reserved for Phase 2 Routing</p>
                </div>
             </div>
          </section>

          {/* Stops Sequence */}
          <section className="space-y-4">
             <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                Assigned Stops <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center">{job.stops.length}</span>
             </h2>
             <div className="space-y-4">
                {job.stops.map((js: any, index: number) => (
                    <Link 
                        key={js.id}
                        href={`/dashboard/ops/stops/${js.stopNote.id}`}
                        className="flex items-center gap-6 p-6 bg-white rounded-[2rem] border border-slate-200/60 shadow-sm hover:shadow-lg transition-all group"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-lg shrink-0">
                            {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-black text-slate-900 truncate group-hover:text-red-600 transition-colors">
                                {js.stopNote.companyName}
                            </h4>
                            <p className="text-xs font-bold text-slate-500 truncate">{js.stopNote.address}</p>
                        </div>
                        <div className="hidden sm:flex flex-col items-end shrink-0 px-4 border-l border-slate-100">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gate Code</p>
                             <p className="text-sm font-black text-slate-700">{js.stopNote.gateCode || "None"}</p>
                        </div>
                        <ChevronRight size={20} className="text-slate-200 group-hover:text-slate-900 transition-all" />
                    </Link>
                ))}
             </div>
          </section>
        </div>

        {/* Sidebar History */}
        <div className="space-y-8">
            {/* Logs Activity */}
            <section className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm p-8 h-full">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-2">
                <History size={18} className="text-red-500" /> Operational History
              </h3>
              
              <div className="space-y-8">
                {/* Exceptions Logged on this Job */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Field Issues</p>
                   {job.exceptionLogs.length === 0 ? (
                    <p className="text-xs text-slate-400 font-bold italic ml-1">No issues logged</p>
                  ) : (
                    job.exceptionLogs.map((log: any) => (
                      <div key={log.id} className="flex gap-4">
                         <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                            <AlertTriangle size={16} />
                         </div>
                         <div className="min-w-0">
                            <p className="text-xs font-black text-rose-600 mb-0.5">{log.type}</p>
                            <p className="text-[10px] font-bold text-slate-500 line-clamp-2 leading-tight mb-1">{log.notes}</p>
                            <p className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">
                              {new Date(log.timestamp).toLocaleString(undefined, { timeStyle: 'short', dateStyle: 'short' })}
                            </p>
                         </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Readiness Checks for this Job */}
                <div className="space-y-4 mt-8 pt-8 border-t border-slate-50">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Readiness Verification</p>
                  {job.readinessChecks.length === 0 ? (
                    <p className="text-xs text-slate-400 font-bold italic ml-1">No checks logged</p>
                  ) : (
                    job.readinessChecks.map((check: any) => (
                      <div key={check.id} className="flex gap-4">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${check.status === 'READY' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                            {check.status === 'READY' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                         </div>
                         <div className="min-w-0">
                            <p className="text-xs font-black text-slate-800 mb-0.5">Check Status: {check.status}</p>
                            <p className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">
                              {new Date(check.createdAt).toLocaleString(undefined, { timeStyle: 'short', dateStyle: 'short' })}
                            </p>
                         </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
           </section>
        </div>
      </div>

      <ExceptionDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
            setIsDrawerOpen(false);
            router.refresh();
        }}
        jobId={job.id}
      />

      <ReadinessModal
        isOpen={isReadinessOpen}
        onClose={() => setIsReadinessOpen(false)}
        jobId={job.id}
        stops={job.stops}
        onSuccess={() => {
          router.refresh();
        }}
      />
    </div>
  );
}
