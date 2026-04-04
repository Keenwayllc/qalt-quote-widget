"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, MapPin, Mail, Phone, Calendar, ChevronRight,
  X, Package, Truck, Hash, CreditCard, Clock, CheckCircle2,
  AlertCircle, Copy, Check, Settings, Code
} from "lucide-react";
import Link from "next/link";

interface Quote {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  pickupZip: string;
  dropoffZip: string;
  distanceMiles: number;
  serviceType: string;
  packageSize: string | null;
  packageWeight: string | null;
  selectedExtras: string | null;
  status: string;
  internalNotes: string | null;
  estimatedPrice: number;
  vehicleCount: number | null;
  awbNumber: string | null;
  paymentStatus: string | null;
  paidAt: Date | null;
  createdAt: Date;
}

const statusConfig: Record<string, { label: string; cls: string }> = {
  PENDING:   { label: "Pending",   cls: "bg-amber-50 text-amber-700 border-amber-100" },
  CONFIRMED: { label: "Confirmed", cls: "bg-red-50 text-red-700 border-red-100" },
  WON:       { label: "Won",       cls: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  LOST:      { label: "Lost",      cls: "bg-rose-50 text-rose-700 border-rose-100" },
  PAID:      { label: "Paid",      cls: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  CANCELLED: { label: "Cancelled", cls: "bg-red-50 text-red-700 border-red-100" },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] ?? { label: status, cls: "bg-slate-50 text-slate-600 border-slate-100" };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button onClick={copy} className="ml-1 text-slate-300 hover:text-red-500 transition-colors">
      {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
    </button>
  );
}

function QuoteDrawer({ quote, onClose, onUpdate }: { quote: Quote; onClose: () => void; onUpdate: (q: Quote) => void }) {
  const [notes, setNotes] = useState(quote.internalNotes || "");
  const [isUpdating, setIsUpdating] = useState(false);

  const updateQuote = async (data: Partial<Quote>) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/dashboard/quotes/${quote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const updated = await res.json();
        onUpdate(updated);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const extras = quote.selectedExtras
    ? (JSON.parse(quote.selectedExtras) as string[])
    : [];

  return (
    <AnimatePresence>
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        />

        {/* Drawer */}
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 260 }}
          className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
            <div>
              <h2 className="font-black text-slate-900 text-lg tracking-tight">Quote Details</h2>
              <p className="text-slate-400 text-xs font-medium">ID: {quote.id.slice(0, 12)}…</p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-all active:scale-90"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-6 py-6 space-y-5">
            {/* Customer */}
            <div className="bg-slate-50 rounded-2xl p-5">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Customer</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-11 w-11 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-sm shrink-0">
                  {quote.customerName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-black text-slate-900">{quote.customerName}</p>
                  <StatusBadge status={quote.status} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                  <Mail size={14} className="text-slate-300 shrink-0" />
                  <span className="truncate">{quote.customerEmail}</span>
                  <CopyButton text={quote.customerEmail} />
                </div>
                {quote.customerPhone && (
                  <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <Phone size={14} className="text-slate-300 shrink-0" />
                    <span>{quote.customerPhone}</span>
                    <CopyButton text={quote.customerPhone} />
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                  <Clock size={14} className="text-slate-300 shrink-0" />
                  <span>{new Date(quote.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Route */}
            <div className="bg-slate-50 rounded-2xl p-5">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Route</p>
              <div className="flex items-center gap-3 text-slate-700 font-black text-lg mb-2">
                <MapPin size={16} className="text-red-500 shrink-0" />
                <span>{quote.pickupZip}</span>
                <ChevronRight size={14} className="text-slate-300" />
                <span>{quote.dropoffZip}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
                <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg">{quote.serviceType}</span>
                <span>{quote.distanceMiles.toFixed(1)} miles</span>
                {quote.vehicleCount && <span>{quote.vehicleCount} vehicle{quote.vehicleCount > 1 ? "s" : ""}</span>}
              </div>
            </div>

            {/* Package */}
            {(quote.packageSize || quote.packageWeight || extras.length > 0) && (
              <div className="bg-slate-50 rounded-2xl p-5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Package Details</p>
                <div className="space-y-2">
                  {quote.packageSize && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                      <Package size={14} className="text-slate-300" />
                      <span>Size: <span className="font-bold text-slate-800">{quote.packageSize}</span></span>
                    </div>
                  )}
                  {quote.packageWeight && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                      <Truck size={14} className="text-slate-300" />
                      <span>Weight: <span className="font-bold text-slate-800">{quote.packageWeight}</span></span>
                    </div>
                  )}
                  {extras.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-slate-400 font-bold mb-1.5">Extras</p>
                      <div className="flex flex-wrap gap-1.5">
                        {extras.map((e) => (
                          <span key={e} className="px-2.5 py-1 bg-red-50 text-red-700 border border-red-100 rounded-lg text-xs font-bold">{e}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* AWB */}
            {quote.awbNumber && (
              <div className="bg-slate-50 rounded-2xl p-5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">AWB Number</p>
                <div className="flex items-center gap-2 text-sm font-black text-slate-800">
                  <Hash size={14} className="text-slate-300" />
                  {quote.awbNumber}
                  <CopyButton text={quote.awbNumber} />
                </div>
              </div>
            )}

            {/* Payment */}
            <div className="bg-slate-50 rounded-2xl p-5">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Payment</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                  <CreditCard size={14} className="text-slate-300" />
                  {quote.paymentStatus === "PAID" ? (
                    <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                      <CheckCircle2 size={14} />
                      Paid {quote.paidAt ? `on ${new Date(quote.paidAt).toLocaleDateString()}` : ""}
                    </span>
                  ) : quote.paymentStatus === "FAILED" ? (
                    <span className="flex items-center gap-1.5 text-red-500 font-bold">
                      <AlertCircle size={14} />
                      Payment failed
                    </span>
                  ) : (
                    <span className="text-slate-400 font-medium">No payment collected</span>
                  )}
                </div>
                <span className="text-2xl font-black text-slate-900">${quote.estimatedPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* CRM Status & Notes */}
            <div className="bg-slate-50 rounded-2xl p-5 mt-5">
              <div className="flex items-center gap-1.5 mb-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Internal Status</p>
                <div className="relative group/tip">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-slate-300 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                  <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 bg-slate-900 text-white text-[11px] font-medium rounded-xl px-3 py-2 opacity-0 group-hover/tip:opacity-100 transition-opacity z-50 shadow-xl">
                    Track where this lead stands. Mark it to keep your pipeline organised.
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="relative group/confirmed">
                  <button
                    disabled={isUpdating}
                    onClick={() => updateQuote({ status: "CONFIRMED" })}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${quote.status === "CONFIRMED" ? "bg-red-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"}`}
                  >Confirmed</button>
                  <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-44 bg-slate-900 text-white text-[11px] font-medium rounded-xl px-3 py-2 opacity-0 group-hover/confirmed:opacity-100 transition-opacity z-50 shadow-xl">
                    You&apos;ve spoken to the customer and confirmed the job is happening.
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900" />
                  </div>
                </div>
                <div className="relative group/won">
                  <button
                    disabled={isUpdating}
                    onClick={() => updateQuote({ status: "WON" })}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${quote.status === "WON" ? "bg-emerald-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"}`}
                  >Won</button>
                  <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-44 bg-slate-900 text-white text-[11px] font-medium rounded-xl px-3 py-2 opacity-0 group-hover/won:opacity-100 transition-opacity z-50 shadow-xl">
                    The job was completed and you got paid. Close this as a win!
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900" />
                  </div>
                </div>
                <div className="relative group/lost">
                  <button
                    disabled={isUpdating}
                    onClick={() => updateQuote({ status: "LOST" })}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${quote.status === "LOST" ? "bg-rose-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-700"}`}
                  >Lost</button>
                  <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-44 bg-slate-900 text-white text-[11px] font-medium rounded-xl px-3 py-2 opacity-0 group-hover/lost:opacity-100 transition-opacity z-50 shadow-xl">
                    The customer didn&apos;t move forward. Mark it lost to track missed opportunities.
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 mb-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Private Notes</p>
                <div className="relative group/notes">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-slate-300 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                  <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-52 bg-slate-900 text-white text-[11px] font-medium rounded-xl px-3 py-2 opacity-0 group-hover/notes:opacity-100 transition-opacity z-50 shadow-xl">
                    Only you can see these notes. Use them to track follow-ups, special instructions, or context about the customer.
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900" />
                  </div>
                </div>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={() => { if (notes !== (quote.internalNotes || "")) updateQuote({ internalNotes: notes }) }}
                placeholder="Add private notes about this quote..."
                className="w-full h-24 p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white resize-none"
              />
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`mailto:${quote.customerEmail}?subject=Your Delivery Quote - $${quote.estimatedPrice.toFixed(2)}`}
                className="flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-700 active:scale-95 transition-all"
              >
                <Mail size={15} />
                Email Customer
              </a>
              {quote.customerPhone && (
                <a
                  href={`tel:${quote.customerPhone}`}
                  className="flex items-center justify-center gap-2 py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 active:scale-95 transition-all"
                >
                  <Phone size={15} />
                  Call Customer
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}

export default function QuotesClient({ quotes: initialQuotes }: { quotes: Quote[] }) {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [selected, setSelected] = useState<Quote | null>(null);

  const handleUpdate = (updated: Quote) => {
    setQuotes((prev) => prev.map((q) => q.id === updated.id ? updated : q));
    setSelected(updated);
  };

  return (
    <>
      {quotes.length === 0 ? (
        <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden text-center relative isolate mb-12">
          {/* Subtle Background Glows */}
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-red-400/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-slate-400/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="px-6 py-24 flex flex-col items-center">
            <div className="p-6 bg-linear-to-br from-red-50 to-slate-100 rounded-3xl border border-red-100/50 shadow-inner text-red-500 mb-8 relative">
              <div className="absolute inset-0 bg-white/20 rounded-3xl backdrop-blur-md" />
              <div className="relative">
                <Settings size={48} strokeWidth={1.5} className="text-red-600" />
              </div>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">You&apos;re almost there!</h2>
            <p className="text-slate-500 font-medium text-lg mb-10 max-w-md mx-auto leading-relaxed">
              Your dashboard is ready, but your customers need a way to reach you. Customize your widget and embed it on your site to start receiving leads.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link href="/dashboard/widget" className="px-8 py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 active:scale-95 transition-all shadow-lg shadow-slate-200 flex items-center gap-2">
                <Settings size={18} /> Customize Widget
              </Link>
              <Link href="/dashboard/embed" className="px-8 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 active:scale-95 transition-all flex items-center gap-2">
                <Code size={18} /> Get Embed Code
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-4xl border border-slate-200/60 shadow-2xl shadow-slate-200/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer &amp; Date</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Route Details</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Value</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Information</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {quotes.map((quote) => (
                    <tr key={quote.id} className="group hover:bg-slate-50/80 transition-all duration-300">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xs shrink-0">
                            {quote.customerName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1.5 group-hover:text-red-600 transition-colors">
                              {quote.customerName}
                            </p>
                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                              <Calendar size={10} />
                              {new Date(quote.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                            <MapPin size={12} className="text-red-500" />
                            <span>{quote.pickupZip}</span>
                            <ChevronRight size={10} className="text-slate-300" />
                            <span>{quote.dropoffZip}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-400 font-bold">
                            <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-600">{quote.serviceType}</span>
                            <span>{quote.distanceMiles.toFixed(1)} miles</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="inline-flex flex-col">
                          <span className="text-lg font-black text-slate-900 tracking-tighter">${quote.estimatedPrice.toFixed(2)}</span>
                          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-0.5">ESTIMATED</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                            <Mail size={12} className="text-slate-300" />
                            {quote.customerEmail}
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                            <Phone size={12} className="text-slate-300" />
                            {quote.customerPhone || "No phone provided"}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button
                          onClick={() => setSelected(quote)}
                          className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-900 hover:text-white active:scale-90 transition-all shadow-sm"
                          title="View quote details"
                        >
                          <FileText size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5 cursor-pointer hover:shadow-md transition-all"
                onClick={() => setSelected(quote)}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xs shrink-0">
                      {quote.customerName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1">{quote.customerName}</p>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        <Calendar size={9} />
                        {new Date(quote.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-black text-slate-900 tracking-tighter leading-none">${quote.estimatedPrice.toFixed(2)}</p>
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-0.5">estimated</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                  <MapPin size={12} className="text-red-500 shrink-0" />
                  <span>{quote.pickupZip}</span>
                  <ChevronRight size={10} className="text-slate-300" />
                  <span>{quote.dropoffZip}</span>
                  <span className="ml-auto text-xs text-slate-400 font-bold">{quote.distanceMiles.toFixed(1)} mi</span>
                </div>
                <div className="border-t border-slate-100 pt-3 mt-3 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <Mail size={11} className="text-slate-300 shrink-0" />
                    <span className="truncate">{quote.customerEmail}</span>
                  </div>
                  {quote.customerPhone && (
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <Phone size={11} className="text-slate-300 shrink-0" />
                      {quote.customerPhone}
                    </div>
                  )}
                </div>
                <div className="mt-3 text-right">
                  <span className="text-xs font-black text-red-600">Tap to view details →</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Detail Drawer */}
      <AnimatePresence>
        {selected && <QuoteDrawer quote={selected} onClose={() => setSelected(null)} onUpdate={handleUpdate} />}
      </AnimatePresence>
    </>
  );
}
