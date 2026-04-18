"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, MapPin, CheckCircle2, Clock, AlertTriangle, 
  ChevronDown, Save, User, CalendarDays, Check, AlertCircle 
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import ExceptionDrawer from "@/components/dashboard/ExceptionDrawer";

export default function ReadinessClient({ stops }: { stops: any[] }) {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const [selectedStopId, setSelectedStopId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [checkData, setCheckData] = useState({
    scheduledDate: new Date().toISOString().split('T')[0],
    contactConfirmed: false,
    addressConfirmed: false,
    accessConfirmed: false,
    siteReady: false,
    notes: ""
  });

  const selectedStop = stops.find(s => s.id === selectedStopId);

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
          status: checkData.contactConfirmed && checkData.addressConfirmed && checkData.accessConfirmed && checkData.siteReady ? "READY" : "NEEDS_REVIEW"
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        // Reset form but keep selected stop
        setCheckData({
          scheduledDate: new Date().toISOString().split('T')[0],
          contactConfirmed: false,
          addressConfirmed: false,
          accessConfirmed: false,
          siteReady: false,
          notes: ""
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const Toggle = ({ active, onChange, label, sublabel }: any) => (
    <button
      type="button"
      onClick={() => onChange(!active)}
      className={`group flex items-center justify-between p-6 rounded-[2rem] border-2 transition-all text-left ${
        active 
          ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200" 
          : "bg-white border-slate-100 text-slate-600 hover:border-slate-200"
      }`}
    >
      <div className="space-y-1">
        <p className="font-black text-sm uppercase tracking-widest">{label}</p>
        <p className={`text-xs font-bold transition-colors ${active ? "text-slate-400" : "text-slate-400"}`}>{sublabel}</p>
      </div>
      <div className={`w-12 h-6 rounded-full relative transition-all ${active ? "bg-red-500" : "bg-slate-200"}`}>
         <motion.div 
            animate={{ x: active ? 24 : 4 }}
            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
         />
      </div>
    </button>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Left: Stop Selector */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm p-8">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Select Location</p>
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
            <select
              value={selectedStopId}
              onChange={(e) => setSelectedStopId(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-black text-slate-900 focus:ring-2 focus:ring-red-500 outline-none appearance-none cursor-pointer"
            >
              <option value="">Choose a stop...</option>
              {stops.map((stop: any) => (
                <option key={stop.id} value={stop.id}>{stop.companyName}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
          </div>

          {selectedStop && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-8 border-t border-slate-50 space-y-4"
            >
               <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-red-500 shrink-0 mt-1" />
                  <p className="text-sm font-bold text-slate-600 leading-snug">{selectedStop.address}</p>
               </div>
               <div className="flex items-center gap-3">
                  <User size={16} className="text-slate-300 shrink-0" />
                  <p className="text-sm font-bold text-slate-600">{selectedStop.contactName || "No contact"} — {selectedStop.contactPhone || "No phone"}</p>
               </div>

               <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-rose-100 transition-all mt-4"
               >
                 <AlertCircle size={14} /> Log Field Issue
               </button>
            </motion.div>
          )}
        </div>

        {/* Info Card */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden isolate shadow-2xl shadow-slate-200">
           <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-red-500/20 blur-3xl rounded-full" />
           <p className="text-xs font-black uppercase tracking-widest text-red-400 mb-4">Pro Tip</p>
           <h4 className="text-lg font-black mb-3 leading-tight">Always confirm site ready before dispatch.</h4>
           <p className="text-sm text-slate-400 font-medium leading-relaxed">
             Verified stops reduce driver wait times and unexpected rescheduling. If any check below is No, set a reminder to follow up.
           </p>
        </div>
      </div>

      {/* Right: The Check Form */}
      <div className="lg:col-span-3">
        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-sm p-8 sm:p-10 space-y-8">
           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <CalendarDays size={24} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Date</p>
                    <input 
                      type="date" 
                      value={checkData.scheduledDate}
                      onChange={e => setCheckData({...checkData, scheduledDate: e.target.value})}
                      className="bg-transparent font-black text-slate-900 focus:outline-none"
                    />
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border ${
                    checkData.contactConfirmed && checkData.addressConfirmed && checkData.accessConfirmed && checkData.siteReady
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : "bg-amber-50 text-amber-600 border-amber-100"
                 }`}>
                    {checkData.contactConfirmed && checkData.addressConfirmed && checkData.accessConfirmed && checkData.siteReady 
                      ? "Everything Ready" 
                      : "Needs Review"}
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Toggle 
                active={checkData.contactConfirmed}
                onChange={(val: boolean) => setCheckData({...checkData, contactConfirmed: val})}
                label="Contact Confirmed"
                sublabel="Spoke with site contact"
              />
              <Toggle 
                active={checkData.addressConfirmed}
                onChange={(val: boolean) => setCheckData({...checkData, addressConfirmed: val})}
                label="Address Verified"
                sublabel="Correct location confirmed"
              />
              <Toggle 
                active={checkData.accessConfirmed}
                onChange={(val: boolean) => setCheckData({...checkData, accessConfirmed: val})}
                label="Access Clear"
                sublabel="Gate / Dock is available"
              />
              <Toggle 
                active={checkData.siteReady}
                onChange={(val: boolean) => setCheckData({...checkData, siteReady: val})}
                label="Site Ready"
                sublabel="Staff/Freight is prepared"
              />
           </div>

           <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Readiness Notes</label>
              <textarea 
                value={checkData.notes}
                onChange={e => setCheckData({...checkData, notes: e.target.value})}
                placeholder="Specific context for this check..."
                className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-6 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none"
                rows={3}
              />
           </div>

           <button
            disabled={!selectedStopId || isSubmitting}
            className={`w-full py-5 rounded-[2rem] font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${
                !selectedStopId || isSubmitting
                ? "bg-slate-100 text-slate-300 shadow-none cursor-not-allowed"
                : success
                  ? "bg-emerald-600 text-white shadow-emerald-100"
                  : "bg-slate-900 text-white shadow-slate-200 hover:bg-slate-800"
            }`}
           >
             {success ? (
                <>
                  <Check size={24} /> Successfully Saved
                </>
             ) : (
                <>
                  <Save size={20} />
                  {isSubmitting ? "Processing..." : "Submit Readiness Check"}
                </>
             )}
           </button>
        </form>
      </div>

      <ExceptionDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        stopNoteId={selectedStopId} 
      />
    </div>
  );
}
