"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, AlertCircle, Clock, MapPin, 
  Package, UserX, ShieldAlert, Save, Check 
} from "lucide-react";

const EXCEPTION_TYPES = [
  { id: "customer_not_ready", label: "Customer Not Ready", icon: UserX, color: "text-amber-600 bg-amber-50" },
  { id: "wrong_address", label: "Wrong Address", icon: MapPin, color: "text-rose-600 bg-rose-50" },
  { id: "no_access", label: "No Access / Rejected", icon: ShieldAlert, color: "text-red-600 bg-red-50" },
  { id: "waiting", label: "Driver Waiting", icon: Clock, color: "text-blue-600 bg-blue-50" },
  { id: "damaged_freight", label: "Damaged Freight", icon: Package, color: "text-slate-600 bg-slate-50" },
  { id: "other", label: "Other Issue", icon: AlertCircle, color: "text-slate-600 bg-slate-50" },
];

export default function ExceptionDrawer({ 
  isOpen, 
  onClose, 
  stopNoteId,
  jobId
}: { 
  isOpen: boolean; 
  onClose: () => void;
  stopNoteId?: string;
  jobId?: string;
}) {
  const [selectedType, setSelectedType] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!selectedType) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/dashboard/ops/exceptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stopNoteId,
          jobId,
          type: EXCEPTION_TYPES.find(t => t.id === selectedType)?.label,
          notes
        }),
      });
      if (res.ok) {
        setSuccess(true);
        // Keep isSubmitting true through success flash so button doesn't revert
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setIsSubmitting(false);
          setSelectedType("");
          setNotes("");
        }, 900);
      } else {
        setIsSubmitting(false);
      }
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-900 tracking-tight">Log Exception</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Field Operational Issue</p>
                  </div>
               </div>
               <button 
                onClick={onClose}
                className="w-10 h-10 rounded-xl hover:bg-slate-200 flex items-center justify-center text-slate-400 transition-colors"
               >
                <X size={20} />
               </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
               <div className="space-y-4">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Select Issue Type</p>
                  <div className="grid grid-cols-1 gap-3">
                     {EXCEPTION_TYPES.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setSelectedType(type.id)}
                          className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                            selectedType === type.id 
                            ? "bg-slate-900 border-slate-900 shadow-lg shadow-slate-200" 
                            : "bg-white border-slate-100 hover:border-slate-200"
                          }`}
                        >
                           <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${type.color} ${selectedType === type.id ? "!bg-white/10 !text-white" : ""}`}>
                              <type.icon size={24} />
                           </div>
                           <span className={`font-black text-sm ${selectedType === type.id ? "text-white" : "text-slate-800"}`}>
                              {type.label}
                           </span>
                           {selectedType === type.id && (
                              <div className="ml-auto w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white">
                                <Check size={14} />
                              </div>
                           )}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="space-y-3">
                   <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Internal Notes</p>
                   <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Provide context for the dispatcher..."
                    className="w-full bg-slate-100 border border-slate-300 rounded-3xl p-6 text-sm font-bold text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none"
                    rows={4}
                   />
               </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-slate-50/50 border-t border-slate-100">
               <button
                disabled={!selectedType || isSubmitting}
                onClick={handleSubmit}
                className={`w-full py-5 rounded-3xl font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${
                  !selectedType || isSubmitting
                  ? "bg-slate-200 text-slate-400 shadow-none cursor-not-allowed"
                  : success
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-900 text-white shadow-slate-200 hover:bg-slate-800"
                }`}
               >
                 {success ? (
                    <>
                      <Check size={24} /> Logged Successfully
                    </>
                 ) : (
                    <>
                      <Save size={20} />
                      {isSubmitting ? "Logging..." : "Log Exception Now"}
                    </>
                 )}
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
