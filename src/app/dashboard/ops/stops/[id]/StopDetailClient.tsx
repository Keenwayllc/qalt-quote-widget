"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, MapPin, Building2, Phone, User,
  Shield, Clock, Truck, Edit3, Trash2,
  History, AlertCircle, CheckCircle2, ChevronRight, Save
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ExceptionDrawer from "@/components/dashboard/ExceptionDrawer";

export default function StopDetailClient({ stop: initialStop }: { stop: any }) {
  const router = useRouter();
  const [stop, setStop] = useState(initialStop);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [formData, setFormData] = useState({
    companyName: stop.companyName,
    address: stop.address,
    contactName: stop.contactName || "",
    contactPhone: stop.contactPhone || "",
    gateCode: stop.gateCode || "",
    dockInfo: stop.dockInfo || "",
    hours: stop.hours || "",
    parkingNotes: stop.parkingNotes || "",
    accessNotes: stop.accessNotes || "",
    deliveryNotes: stop.deliveryNotes || ""
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/dashboard/ops/stops/${stop.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const updated = await res.json();
        setStop(updated);
        setIsEditing(false);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const inputCls = "w-full px-5 py-3.5 bg-slate-50 dark:bg-[#1c1c1c] border border-slate-200 dark:border-white/6 rounded-2xl text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-red-500 outline-none";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/dashboard/ops/stops"
          className="inline-flex items-center gap-2 text-slate-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 font-bold text-sm transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-red-50 dark:group-hover:bg-red-500/10 transition-colors">
            <ArrowLeft size={16} />
          </div>
          Back to Stops
        </Link>
        <div className="flex gap-2">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-black hover:bg-red-100 dark:hover:bg-red-500/20 transition-all shadow-sm dark:shadow-none"
            >
              <AlertCircle size={16} />
              Log Issue
            </button>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/6 text-slate-700 dark:text-zinc-300 rounded-xl text-sm font-black hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm dark:shadow-none"
              >
                <Edit3 size={16} />
                Edit Details
              </button>
            ) : (
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/6 text-slate-600 dark:text-zinc-300 rounded-xl text-sm font-black hover:bg-slate-50 dark:hover:bg-white/10"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        disabled={isUpdating}
                        className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 dark:bg-zinc-700 text-white rounded-xl text-sm font-black hover:bg-slate-800 dark:hover:bg-zinc-600 shadow-lg shadow-slate-200 dark:shadow-none disabled:opacity-50"
                    >
                        <Save size={16} />
                        {isUpdating ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white dark:bg-[#141414] rounded-4xl border border-slate-200/60 dark:border-white/6 shadow-sm dark:shadow-none p-8 sm:p-10">
            <div className="flex items-start gap-6 mb-10">
               <div className="w-20 h-20 rounded-3xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-zinc-500 shrink-0">
                  <Building2 size={40} />
               </div>
               <div className="min-w-0">
                  <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-3 break-words">
                    {stop.companyName}
                  </h1>
                  <div className="flex items-start gap-1.5 text-slate-500 dark:text-zinc-400 font-bold text-sm leading-snug">
                    <MapPin size={16} className="text-red-500 mt-px shrink-0" />
                    <span>{stop.address}</span>
                  </div>
               </div>
            </div>

            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest px-1">Location Name</label>
                    <input type="text" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} className={inputCls} />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest px-1">Address</label>
                    <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className={inputCls} />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest px-1">Contact Name</label>
                    <input type="text" value={formData.contactName} onChange={e => setFormData({...formData, contactName: e.target.value})} className={inputCls} />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest px-1">Contact Phone</label>
                    <input type="text" value={formData.contactPhone} onChange={e => setFormData({...formData, contactPhone: e.target.value})} className={inputCls} />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest px-1">Gate Code</label>
                    <input type="text" value={formData.gateCode} onChange={e => setFormData({...formData, gateCode: e.target.value})} className={inputCls} />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest px-1">Hours / Dock Info</label>
                    <input type="text" value={formData.hours} onChange={e => setFormData({...formData, hours: e.target.value})} className={inputCls} />
                 </div>
                 <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest px-1">Access & Parking Notes</label>
                    <textarea value={formData.accessNotes} onChange={e => setFormData({...formData, accessNotes: e.target.value})} className={`${inputCls} resize-none`} rows={3} />
                 </div>
                 <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest px-1">Delivery Notes</label>
                    <textarea value={formData.deliveryNotes} onChange={e => setFormData({...formData, deliveryNotes: e.target.value})} className={`${inputCls} resize-none`} rows={3} />
                 </div>
                 <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                    <button onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-2xl border border-slate-200 dark:border-white/6 text-slate-600 dark:text-zinc-300 font-black text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-all">Cancel</button>
                    <button onClick={handleUpdate} disabled={isUpdating} className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-zinc-700 text-white rounded-2xl font-black text-sm hover:bg-slate-800 dark:hover:bg-zinc-600 shadow-lg shadow-slate-200 dark:shadow-none disabled:opacity-50 transition-all">
                       <Save size={16} /> {isUpdating ? "Saving..." : "Save Changes"}
                    </button>
                 </div>
              </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Gate / Entry Code</p>
                        <p className="text-slate-900 dark:text-white font-black text-lg">{stop.gateCode || "Not set"}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Hours / Dock Info</p>
                        <p className="text-slate-900 dark:text-white font-black text-lg">{stop.hours || "Not set"}</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-2">Primary Contact</p>
                        <div className="space-y-1">
                            <p className="text-slate-900 dark:text-white font-black text-lg flex items-center gap-2">
                                <User size={16} className="text-slate-300 dark:text-zinc-600" />
                                {stop.contactName || "No contact name"}
                            </p>
                            <p className="text-slate-600 dark:text-zinc-400 font-bold flex items-center gap-2">
                                <Phone size={16} className="text-slate-300 dark:text-zinc-600" />
                                {stop.contactPhone || "No phone added"}
                            </p>
                        </div>
                    </div>
                  </div>
                </div>
            )}

            {!isEditing && (
              <div className="grid grid-cols-1 gap-8 mt-12 pt-10 border-t border-slate-50 dark:border-white/6">
                <div>
                   <p className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Shield size={14} /> Access & Parking Notes
                   </p>
                   <div className="bg-slate-50 dark:bg-[#1c1c1c] rounded-2xl p-6 text-slate-700 dark:text-zinc-300 font-medium leading-relaxed whitespace-pre-wrap border dark:border-white/6">
                    {stop.accessNotes || "None"}
                   </div>
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Truck size={14} /> General Delivery Notes
                   </p>
                   <div className="bg-slate-50 dark:bg-[#1c1c1c] rounded-2xl p-6 text-slate-700 dark:text-zinc-300 font-medium leading-relaxed whitespace-pre-wrap text-sm sm:text-base border dark:border-white/6">
                    {stop.deliveryNotes || "None"}
                   </div>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* History Sidebar */}
        <div className="space-y-8">
           <section className="bg-white dark:bg-[#141414] rounded-4xl border border-slate-200/60 dark:border-white/6 shadow-sm dark:shadow-none p-8 h-full">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-8 flex items-center gap-2">
                <History size={18} className="text-red-500" /> Activity History
              </h3>

              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Recent Readiness</p>
                  {stop.readinessChecks.length === 0 ? (
                    <p className="text-xs text-slate-400 dark:text-zinc-600 font-bold italic ml-1">No checks logged</p>
                  ) : (
                    stop.readinessChecks.map((check: any) => (
                      <div key={check.id} className="flex gap-3">
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${check.status === 'READY' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>
                            {check.status === 'READY' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                         </div>
                         <div className="min-w-0">
                            <p className="text-xs font-black text-slate-800 dark:text-zinc-200 leading-none mb-1">Status: {check.status.replace('_', ' ')}</p>
                            <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-tighter">
                              {new Date(check.createdAt).toLocaleDateString()}
                            </p>
                         </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-4 mt-8 pt-8 border-t border-slate-50 dark:border-white/6">
                  <p className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Recent Exceptions</p>
                   {stop.exceptionLogs.length === 0 ? (
                    <p className="text-xs text-slate-400 dark:text-zinc-600 font-bold italic ml-1">No issues logged</p>
                  ) : (
                    stop.exceptionLogs.map((log: any) => (
                      <div key={log.id} className="flex gap-3">
                         <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                            <AlertCircle size={14} />
                         </div>
                         <div className="min-w-0">
                            <p className="text-xs font-black text-rose-600 dark:text-rose-400 leading-none mb-1 truncate">{log.type}</p>
                            <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-tighter">
                              {new Date(log.timestamp).toLocaleString()}
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
        onClose={() => setIsDrawerOpen(false)}
        stopNoteId={stop.id}
      />
    </div>
  );
}
