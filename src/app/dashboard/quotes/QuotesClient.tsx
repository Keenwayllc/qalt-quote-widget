"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, MapPin, Mail, Phone, Calendar, ChevronRight,
  X, Package, Truck, Hash, CreditCard, Clock, CheckCircle2,
  AlertCircle, Copy, Check,
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
  estimatedPrice: number;
  vehicleCount: number | null;
  awbNumber: string | null;
  paymentStatus: string | null;
  paidAt: Date | null;
  createdAt: Date;
}

const statusConfig: Record<string, { label: string; cls: string }> = {
  PENDING:   { label: "Pending",   cls: "bg-amber-50 text-amber-700 border-amber-100" },
  CONFIRMED: { label: "Confirmed", cls: "bg-blue-50 text-blue-700 border-blue-100" },
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
    <button onClick={copy} className="ml-1 text-slate-300 hover:text-blue-500 transition-colors">
      {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
    </button>
  );
}

function QuoteDrawer({ quote, onClose }: { quote: Quote; onClose: () => void }) {
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
                <MapPin size={16} className="text-blue-500 shrink-0" />
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
                          <span key={e} className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-xs font-bold">{e}</span>
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
                  className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 active:scale-95 transition-all"
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

export default function QuotesClient({ quotes }: { quotes: Quote[] }) {
  const [selected, setSelected] = useState<Quote | null>(null);

  return (
    <>
      {quotes.length === 0 ? (
        <div className="bg-white rounded-4xl border border-slate-200/60 shadow-2xl shadow-slate-200/50 overflow-hidden p-12 text-center">
          <div className="flex flex-col items-center">
            <div className="p-6 bg-slate-50 rounded-full text-slate-300 mb-4">
              <FileText size={48} />
            </div>
            <p className="text-slate-900 font-black text-xl mb-1">No leads found</p>
            <p className="text-slate-400 font-medium mb-6">Your quote history will appear here once customers interact with your widget.</p>
            <Link href="/dashboard/embed" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
              Setup Widget &rarr;
            </Link>
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
                            <p className="text-sm font-black text-slate-900 tracking-tight leading-none mb-1.5 group-hover:text-blue-600 transition-colors">
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
                            <MapPin size={12} className="text-blue-500" />
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
                  <MapPin size={12} className="text-blue-500 shrink-0" />
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
                  <span className="text-xs font-black text-blue-600">Tap to view details →</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Detail Drawer */}
      <AnimatePresence>
        {selected && <QuoteDrawer quote={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}
