"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Clock, Search, Plus,
  ChevronRight, X, Building2, Shield,
  Map as MapIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Stop {
  id: string;
  companyName: string;
  address: string;
  contactName: string | null;
  contactPhone: string | null;
  gateCode: string | null;
  dockInfo: string | null;
  hours: string | null;
  parkingNotes: string | null;
  accessNotes: string | null;
  deliveryNotes: string | null;
  createdAt: Date;
}

export default function StopsClient({ initialStops }: { initialStops: any[] }) {
  const [stops, setStops] = useState<Stop[]>(initialStops);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    contactName: "",
    contactPhone: "",
    gateCode: "",
    dockInfo: "",
    hours: "",
    parkingNotes: "",
    accessNotes: "",
    deliveryNotes: "",
  });

  const filteredStops = stops.filter(stop => 
    stop.companyName.toLowerCase().includes(search.toLowerCase()) ||
    stop.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/dashboard/ops/stops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const newStop = await res.json();
        setStops([newStop, ...stops]);
        setIsModalOpen(false);
        setFormData({
          companyName: "", address: "", contactName: "", contactPhone: "",
          gateCode: "", dockInfo: "", hours: "", parkingNotes: "",
          accessNotes: "", deliveryNotes: "",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Action Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search stops by name or address..."
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
          <span className="whitespace-nowrap">Add New Stop</span>
        </button>
      </div>

      {stops.length === 0 ? (
        <div className="bg-white dark:bg-[#141414] rounded-[32px] border border-slate-200/60 dark:border-white/6 shadow-xl dark:shadow-none p-12 text-center">
          <div className="p-6 bg-red-50 dark:bg-red-500/10 rounded-3xl w-24 h-24 flex items-center justify-center mx-auto mb-6 text-red-600 dark:text-red-400">
            <MapIcon size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No Saved Stops Yet</h2>
          <p className="text-slate-500 dark:text-zinc-400 font-medium mb-8 max-w-sm mx-auto">
            Save details for frequent pickup and delivery locations to speed up your operations.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3.5 bg-zinc-900 dark:bg-zinc-800 text-white rounded-xl font-bold hover:bg-zinc-800 dark:hover:bg-zinc-700 transition-all"
          >
            Create Your First Stop
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredStops.map((stop) => (
              <motion.div
                key={stop.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-[#141414] rounded-4xl border border-slate-200/60 dark:border-white/6 shadow-sm dark:shadow-none hover:shadow-xl dark:hover:shadow-none hover:border-red-100 dark:hover:border-white/10 transition-all group overflow-hidden flex flex-col h-full cursor-pointer relative isolate"
                onClick={() => router.push(`/dashboard/ops/stops/${stop.id}`)}
              >
                <div className="p-6 sm:p-8 flex-1">
                  <div className="flex items-start justify-between mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-zinc-500 group-hover:bg-red-50 dark:group-hover:bg-red-500/10 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors flex items-center justify-center shrink-0">
                      <Building2 size={28} />
                    </div>
                    <div className="flex gap-2">
                       <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-red-400 transition-colors">
                        <ChevronRight size={18} />
                       </div>
                    </div>
                  </div>

                  <div className="space-y-1 mb-6">
                    <h3 className="font-black text-slate-900 dark:text-white text-xl tracking-tight leading-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors truncate">
                      {stop.companyName}
                    </h3>
                    <div className="flex items-start gap-1.5 text-slate-500 font-bold text-xs uppercase tracking-tight">
                      <MapPin size={14} className="text-red-500 mt-px shrink-0" />
                      <span className="line-clamp-2">{stop.address}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-slate-50 dark:border-white/6">
                    <div className="flex items-center justify-between text-xs font-bold">
                       <span className="text-slate-400 flex items-center gap-1.5">
                        <Clock size={14} /> Hours
                       </span>
                       <span className="text-slate-800 dark:text-zinc-200">{stop.hours || "--"}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold">
                       <span className="text-slate-400 flex items-center gap-1.5">
                        <Shield size={14} /> Gate Code
                       </span>
                       <span className="text-slate-800 dark:text-zinc-200">{stop.gateCode || "None"}</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 dark:bg-white/3 border-t border-slate-100 dark:border-white/6 flex items-center justify-between group-hover:bg-red-50/30 dark:group-hover:bg-red-500/5 transition-colors mt-auto">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {stop.contactName || "No contact"}
                    </span>
                    <span className="text-xs font-black text-red-600">View Details →</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Create Stop Modal */}
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
            className="relative bg-white dark:bg-[#161616] border dark:border-white/6 rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl dark:shadow-black/60 p-6 sm:p-10 scrollbar-hide"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">New Stop Note</h2>
                <p className="text-slate-400 dark:text-zinc-500 text-sm font-bold">Save delivery details for this location</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-zinc-500 hover:bg-slate-200 dark:hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Company Name</label>
                  <input
                    required
                    type="text"
                    value={formData.companyName}
                    onChange={e => setFormData({...formData, companyName: e.target.value})}
                    placeholder="e.g. Acme Warehousing"
                    className="w-full px-5 py-4 bg-slate-100 dark:bg-[#1c1c1c] border border-slate-300 dark:border-white/6 rounded-2xl text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Address</label>
                  <input
                    required
                    type="text"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    placeholder="Full street address"
                    className="w-full px-5 py-4 bg-slate-100 dark:bg-[#1c1c1c] border border-slate-300 dark:border-white/6 rounded-2xl text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Contact Name</label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={e => setFormData({...formData, contactName: e.target.value})}
                    placeholder="Who to ask for"
                    className="w-full px-5 py-4 bg-slate-100 dark:bg-[#1c1c1c] border border-slate-300 dark:border-white/6 rounded-2xl text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Contact Phone</label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={e => setFormData({...formData, contactPhone: e.target.value})}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-5 py-4 bg-slate-100 dark:bg-[#1c1c1c] border border-slate-300 dark:border-white/6 rounded-2xl text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Gate / Entry Code</label>
                  <input
                    type="text"
                    value={formData.gateCode}
                    onChange={e => setFormData({...formData, gateCode: e.target.value})}
                    placeholder="Code or instructions"
                    className="w-full px-5 py-4 bg-slate-100 dark:bg-[#1c1c1c] border border-slate-300 dark:border-white/6 rounded-2xl text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Hours / Dock Info</label>
                  <input
                    type="text"
                    value={formData.hours}
                    onChange={e => setFormData({...formData, hours: e.target.value})}
                    placeholder="e.g. 8am-4pm, Door 4"
                    className="w-full px-5 py-4 bg-slate-100 dark:bg-[#1c1c1c] border border-slate-300 dark:border-white/6 rounded-2xl text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Access & Parking Notes</label>
                <textarea
                  value={formData.accessNotes}
                  onChange={e => setFormData({...formData, accessNotes: e.target.value})}
                  placeholder="Low clearance, park in rear, one-way street, etc."
                  rows={2}
                  className="w-full px-5 py-4 bg-slate-100 dark:bg-[#1c1c1c] border border-slate-300 dark:border-white/6 rounded-2xl text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-red-500 outline-none resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">General Delivery Notes</label>
                <textarea
                  value={formData.deliveryNotes}
                  onChange={e => setFormData({...formData, deliveryNotes: e.target.value})}
                  placeholder="Liftgate required, inside delivery, white glove only, etc."
                  rows={3}
                  className="w-full px-5 py-4 bg-slate-100 dark:bg-[#1c1c1c] border border-slate-300 dark:border-white/6 rounded-2xl text-sm font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:ring-2 focus:ring-red-500 outline-none resize-none"
                />
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
                  className="flex-2 py-4 bg-zinc-900 dark:bg-zinc-800 text-white rounded-2xl font-black hover:bg-zinc-800 dark:hover:bg-zinc-700 transition-all shadow-xl shadow-slate-200 dark:shadow-none"
                >
                  {isSubmitting ? "Saving..." : "Save Stop Note"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
