"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Briefcase,
  Calculator,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  LayoutDashboard,
  MapPin,
  Package,
  Palette,
  Settings,
  Truck,
} from "lucide-react";

const STAGES = [
  { label: "Details", icon: MapPin },
  { label: "Instant quote", icon: Calculator },
  { label: "Book & pay", icon: CreditCard },
  { label: "Ops Console", icon: Briefcase },
];

const BRAND_COLORS = [
  { name: "Crimson", value: "#ef4444" },
  { name: "Cobalt", value: "#2563eb" },
  { name: "Evergreen", value: "#059669" },
  { name: "Violet", value: "#7c3aed" },
];

const STEP_MS = 4300;
const QALT_RED = "#dc2626";

function CustomerWidget({
  stage,
  accent,
  reduceMotion,
}: {
  stage: number;
  accent: string;
  reduceMotion: boolean | null;
}) {
  return (
    <div className="flex h-full flex-col bg-white p-4 text-slate-900">
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center text-[10px] font-black text-white"
            style={{ backgroundColor: accent }}
          >
            ND
          </div>
          <div>
            <p className="text-[10px] font-black leading-none text-slate-900">Northline Delivery Co.</p>
            <p className="mt-1 text-[7px] font-bold text-slate-400">Local delivery, made simple.</p>
          </div>
        </div>
        <span className="text-[6px] font-black uppercase tracking-[0.16em] text-slate-300">Powered by Qalt</span>
      </div>

      <AnimatePresence mode="wait">
        {stage === 0 && (
          <motion.div
            key="customer-details"
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: 12 }}
            transition={{ duration: 0.4 }}
            className="flex flex-1 flex-col"
          >
            <p className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-400">Delivery request</p>
            <h3 className="mt-1 text-[17px] font-bold tracking-tight text-slate-950">Where are we going?</h3>

            <div className="mt-4 space-y-3">
              {[
                ["Pickup", "North Hollywood, CA"],
                ["Delivery", "Downtown Los Angeles, CA"],
              ].map(([label, value], index) => (
                <motion.div
                  key={label}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.22 + 0.1 }}
                >
                  <p className="mb-1 text-[7px] font-black uppercase tracking-[0.16em] text-slate-400">{label}</p>
                  <div className="flex items-center gap-2 border border-slate-200 bg-white px-3 py-2.5">
                    <MapPin size={11} style={{ color: accent }} />
                    <span className="truncate text-[9px] font-bold text-slate-700">{value}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="border border-slate-200 bg-slate-50 p-2.5">
                <Package size={12} className="mb-1.5 text-slate-400" />
                <p className="text-[7px] font-black uppercase tracking-wider text-slate-400">Shipment</p>
                <p className="mt-0.5 text-[9px] font-black">1 pallet · 400 lb</p>
              </div>
              <div className="border border-slate-200 bg-slate-50 p-2.5">
                <Truck size={12} className="mb-1.5 text-slate-400" />
                <p className="text-[7px] font-black uppercase tracking-wider text-slate-400">Service</p>
                <p className="mt-0.5 text-[9px] font-black">Inside delivery</p>
              </div>
            </div>

            <motion.div
              animate={reduceMotion ? undefined : { scale: [1, 1.012, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="mt-auto flex items-center justify-center gap-2 px-4 py-3 text-[9px] font-black text-white"
              style={{ backgroundColor: accent }}
            >
              Get instant quote <ArrowRight size={11} />
            </motion.div>
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div
            key="customer-quote"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -14 }}
            transition={{ duration: 0.4 }}
            className="flex flex-1 flex-col"
          >
            <p className="text-[7px] font-black uppercase tracking-[0.2em]" style={{ color: accent }}>
              Instant quote
            </p>
            <h3 className="mt-1 text-[17px] font-bold tracking-tight text-slate-950">Your delivery estimate</h3>

            <div className="mt-4 border border-slate-200 bg-white p-4">
              <div className="space-y-2.5">
                {[
                  ["Base service", "$60.00"],
                  ["20.8 mi × $2.50", "$52.00"],
                  ["Inside delivery", "$15.00"],
                ].map(([label, value], index) => (
                  <motion.div
                    key={label}
                    initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + index * 0.18 }}
                    className="flex items-center justify-between text-[9px]"
                  >
                    <span className="font-medium text-slate-500">{label}</span>
                    <span className="font-black text-slate-800">{value}</span>
                  </motion.div>
                ))}
              </div>
              <div className="my-3 border-t border-dashed border-slate-200" />
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="flex items-end justify-between"
              >
                <div>
                  <p className="text-[7px] font-black uppercase tracking-wider text-slate-400">Estimated delivery</p>
                  <p className="text-[7px] font-bold text-slate-400">Transparent pricing</p>
                </div>
                <p className="text-[29px] font-bold tracking-tight" style={{ color: accent }}>$127.00</p>
              </motion.div>
            </div>

            <div className="mt-3 flex items-center gap-2 border border-slate-200 bg-slate-50 p-2.5 text-[8px] font-bold text-slate-500">
              <CheckCircle2 size={12} style={{ color: accent }} />
              Quote details are ready to book.
            </div>

            <div
              className="mt-auto flex items-center justify-center gap-2 px-4 py-3 text-[9px] font-black text-white"
              style={{ backgroundColor: accent }}
            >
              Book delivery <CreditCard size={11} />
            </div>
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div
            key="customer-paid"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.42 }}
            className="flex flex-1 flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={reduceMotion ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.08 }}
              className="flex h-14 w-14 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: accent }}
            >
              <Check size={25} />
            </motion.div>
            <p className="mt-4 text-[7px] font-black uppercase tracking-[0.2em]" style={{ color: accent }}>
              Payment complete
            </p>
            <h3 className="mt-1 text-[19px] font-bold tracking-tight text-slate-950">Delivery booked.</h3>
            <p className="mt-2 max-w-[210px] text-[8px] font-medium leading-relaxed text-slate-400">
              The customer receives confirmation while the merchant sees the paid quote inside Qalt.
            </p>
            <div className="mt-5 w-full border border-slate-200 bg-slate-50 p-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-black text-slate-700">North Hollywood → Downtown LA</span>
                <span className="bg-emerald-50 px-2 py-1 text-[7px] font-black text-emerald-700">PAID</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[8px] font-bold text-slate-400">
                <span>1 pallet · Inside delivery</span>
                <span>$127.00</span>
              </div>
            </div>
          </motion.div>
        )}

        {stage === 3 && (
          <motion.div
            key="customer-finished"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            className="flex flex-1 flex-col justify-center"
          >
            <p className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-400">Customer side complete</p>
            <h3 className="mt-1 text-[19px] font-bold tracking-tight text-slate-950">The job keeps moving.</h3>
            <p className="mt-3 text-[9px] font-medium leading-relaxed text-slate-500">
              Once the customer books, Qalt carries the delivery details into the merchant workflow for jobs, stops, and readiness.
            </p>
            <div className="mt-5 space-y-2">
              {["Quote details attached", "Pickup & delivery stops", "Payment status saved", "Ready for operations"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.12 }}
                  className="flex items-center gap-2 border-b border-slate-100 pb-2 text-[8px] font-bold text-slate-600 last:border-0"
                >
                  <CheckCircle2 size={12} style={{ color: accent }} />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MiniSidebar({ stage }: { stage: number }) {
  const nav = [
    { name: "Overview", icon: LayoutDashboard, active: stage === 0 },
    { name: "Quotes", icon: FileText, active: stage === 1 || stage === 2 },
    { name: "Analytics", icon: BarChart3, active: false },
    { name: "My Forms", icon: Calculator, active: false },
    { name: "Widget Appearance", icon: Settings, active: false },
  ];

  return (
    <aside className="hidden w-[104px] shrink-0 border-r border-slate-200 bg-white p-2.5 sm:block">
      <div className="mb-4 px-1">
        <Image src="/images/qalt-logo-main-2026.png" alt="Qalt" width={48} height={18} className="object-contain" />
      </div>
      <p className="mb-2 px-1 text-[5px] font-black uppercase tracking-[0.19em] text-slate-400">Merchant Console</p>
      <div className="space-y-1">
        {nav.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              className={`flex items-center gap-1.5 px-2 py-2 text-[6px] font-bold ${
                item.active ? "bg-red-600 text-white" : "text-slate-500"
              }`}
            >
              <Icon size={9} className={item.active ? "text-white" : "text-slate-400"} />
              <span className="truncate">{item.name}</span>
            </div>
          );
        })}
      </div>

      <p className="mb-2 mt-5 px-1 text-[5px] font-black uppercase tracking-[0.19em] text-slate-400">Field Operations</p>
      <div
        className={`flex items-center gap-1.5 px-2 py-2 text-[6px] font-bold ${
          stage === 3 ? "bg-slate-900 text-white" : "text-slate-500"
        }`}
      >
        <Briefcase size={9} className={stage === 3 ? "text-white" : "text-slate-400"} />
        <span>Jobs Dashboard</span>
      </div>
    </aside>
  );
}

function Metric({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  tone: "red" | "emerald" | "rose";
}) {
  const tones = {
    red: "bg-red-50 text-red-600",
    emerald: "bg-emerald-50 text-emerald-600",
    rose: "bg-rose-50 text-rose-600",
  };

  return (
    <div className="border border-slate-200 bg-white p-2.5">
      <div className={`mb-2 flex h-6 w-6 items-center justify-center ${tones[tone]}`}>{icon}</div>
      <p className="text-[5px] font-black uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-0.5 text-[14px] font-bold tracking-tight text-slate-900">{value}</p>
    </div>
  );
}

function DashboardOverview({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <motion.div
      key="overview"
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
      className="p-3.5"
    >
      <span className="bg-red-50 px-2 py-1 text-[5px] font-black uppercase tracking-wider text-red-700">PRO Plan</span>
      <h3 className="mt-2 text-[18px] font-bold tracking-tight text-slate-950">Dashboard</h3>
      <p className="text-[7px] font-medium text-slate-400">Here&apos;s your performance.</p>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <Metric label="Total Quotes" value="128" icon={<FileText size={11} />} tone="red" />
        <Metric label="Base Rate" value="$2.50" icon={<Calculator size={11} />} tone="emerald" />
        <Metric label="Active Status" value="Online" icon={<Activity size={11} />} tone="rose" />
      </div>

      <div className="mt-3 border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[7px] font-black text-slate-800">Recent Requests</span>
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          </div>
          <span className="text-[6px] font-black text-red-600">View all →</span>
        </div>
        <div className="flex items-center gap-2.5 p-3">
          <div className="flex h-7 w-7 items-center justify-center bg-slate-900 text-[8px] font-black text-white">J</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[7px] font-black text-slate-800">Jordan Lee</p>
            <p className="mt-0.5 truncate text-[6px] font-bold text-slate-400">91605 → 90012 · 20.8 mi</p>
          </div>
          <span className="text-[11px] font-black text-slate-900">$127</span>
        </div>
      </div>
    </motion.div>
  );
}

function QuoteBoard({ paid, reduceMotion }: { paid: boolean; reduceMotion: boolean | null }) {
  const columns = [
    { label: "Pending", dot: "bg-amber-400", bg: "bg-amber-50/60" },
    { label: "Confirmed", dot: "bg-blue-500", bg: "bg-blue-50/60" },
    { label: "Paid", dot: "bg-emerald-600", bg: "bg-emerald-50/60" },
  ];

  return (
    <motion.div
      key={paid ? "paid-board" : "quote-board"}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
      className="p-3.5"
    >
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-[18px] font-bold tracking-tight text-slate-950">Quotes</h3>
          <p className="text-[7px] font-medium text-slate-400">Manage customer quote requests.</p>
        </div>
        <span className="bg-slate-900 px-2.5 py-1.5 text-[6px] font-black text-white">List · Board</span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {columns.map((column, index) => {
          const hasCard = paid ? index === 2 : index === 0;
          return (
            <div key={column.label} className={`min-h-[168px] border border-slate-200 ${column.bg}`}>
              <div className="flex items-center gap-1.5 border-b border-slate-200 px-2 py-2">
                <span className={`h-1.5 w-1.5 rounded-full ${column.dot}`} />
                <span className="text-[5px] font-black uppercase tracking-wider text-slate-600">{column.label}</span>
                <span className="ml-auto bg-white/80 px-1.5 py-0.5 text-[5px] font-black text-slate-400">{hasCard ? 1 : 0}</span>
              </div>

              {hasCard ? (
                <motion.div
                  layout
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 170, damping: 16, delay: 0.18 }}
                  className="m-2 border border-slate-200 bg-white shadow-sm"
                >
                  <div className="flex items-start gap-1.5 p-2">
                    <div className="flex h-5 w-5 items-center justify-center bg-slate-900 text-[6px] font-black text-white">J</div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[6px] font-black text-slate-900">Jordan Lee</p>
                      <div className="mt-1 flex items-center gap-1 text-[5px] font-bold text-slate-400">
                        <MapPin size={6} className="text-red-400" /> 91605 → 90012
                      </div>
                    </div>
                    <span className="text-[8px] font-black text-slate-900">$127</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 px-2 py-1.5">
                    <span className="text-[5px] font-bold text-slate-400">20.8 mi</span>
                    {paid ? (
                      <span className="text-[5px] font-black text-emerald-700">PAID ✓</span>
                    ) : (
                      <span className="text-[5px] font-black text-red-600">Details →</span>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="m-2 flex h-12 items-center justify-center border border-dashed border-slate-200 text-[5px] font-bold text-slate-300">
                  Drop here
                </div>
              )}
            </div>
          );
        })}
      </div>

      {paid && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-2 flex items-center gap-2 bg-emerald-50 px-3 py-2 text-[6px] font-black text-emerald-700"
        >
          <CheckCircle2 size={10} /> Payment received. Quote is ready for operations.
        </motion.div>
      )}
    </motion.div>
  );
}

function JobsDashboard({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <motion.div
      key="jobs"
      initial={reduceMotion ? false : { opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, x: -10 }}
      className="p-3.5"
    >
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[5px] font-black uppercase tracking-[0.19em] text-slate-400">Field Operations</p>
          <h3 className="mt-1 text-[18px] font-bold tracking-tight text-slate-950">Jobs Dashboard</h3>
        </div>
        <span className="bg-slate-900 px-2.5 py-1.5 text-[6px] font-black text-white">+ Create New Job</span>
      </div>

      <div className="mt-3 flex items-center gap-2 border border-slate-200 bg-white px-3 py-2 text-[6px] font-bold text-slate-400">
        <MapPin size={9} /> Search jobs by ID or stop name...
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="mt-3 border border-slate-200 bg-white p-3 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center bg-slate-50 text-slate-400">
            <Briefcase size={18} />
          </div>
          <div>
            <p className="text-[5px] font-black uppercase tracking-[0.18em] text-slate-400">JOB #Q1042</p>
            <span className="mt-1 inline-flex items-center gap-1 border border-emerald-100 bg-emerald-50 px-2 py-1 text-[5px] font-black uppercase tracking-wider text-emerald-700">
              <CheckCircle2 size={7} /> Ready
            </span>
          </div>

          <div className="ml-2 min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-[6px] font-black text-slate-700">
              <Clock size={8} className="text-red-500" /> Today
            </div>
            <div className="mt-2 flex items-center gap-1 text-[6px] font-bold text-slate-400">
              <span className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[5px] font-black">1</span>
              <span className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[5px] font-black">2</span>
              <span className="truncate">North Hollywood → Downtown Los Angeles</span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[5px] font-black uppercase tracking-wider text-slate-400">Readiness</p>
            <p className="mt-1 flex items-center justify-end gap-1 text-[6px] font-black text-emerald-600">
              <CheckCircle2 size={8} /> VERIFIED
            </p>
          </div>
        </div>
      </motion.div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {["Quote attached", "2 stops saved", "$127 paid"].map((item) => (
          <div key={item} className="border border-slate-200 bg-slate-50 px-2 py-2 text-center text-[5px] font-black text-slate-500">
            <Check size={8} className="mx-auto mb-1 text-emerald-600" />
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function MerchantConsole({ stage, reduceMotion }: { stage: number; reduceMotion: boolean | null }) {
  return (
    <div className="flex h-full min-h-[315px] bg-slate-50">
      <MiniSidebar stage={stage} />
      <main className="min-w-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {stage === 0 && <DashboardOverview reduceMotion={reduceMotion} />}
          {stage === 1 && <QuoteBoard paid={false} reduceMotion={reduceMotion} />}
          {stage === 2 && <QuoteBoard paid reduceMotion={reduceMotion} />}
          {stage === 3 && <JobsDashboard reduceMotion={reduceMotion} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function HeroDashboardMockup() {
  const [stage, setStage] = useState(0);
  const [accent, setAccent] = useState(BRAND_COLORS[0].value);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setStage((current) => (current + 1) % STAGES.length);
    }, STEP_MS);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <div
      className="relative w-full max-w-[650px] select-none"
      style={{ fontFamily: "var(--font-space-grotesk), var(--font-geist-sans), system-ui, sans-serif" }}
    >
      <motion.div
        animate={reduceMotion ? undefined : { opacity: [0.25, 0.5, 0.25], scale: [0.98, 1.025, 0.98] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -inset-7 rounded-full bg-red-500/10 blur-3xl"
      />

      <div className="relative overflow-hidden border border-white/10 bg-white shadow-2xl shadow-black/45">
        <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-950 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </div>
          <div className="mx-2 flex min-w-0 flex-1 items-center gap-2 border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="truncate text-[8px] font-bold text-white/40">your-delivery-business.com</span>
          </div>
          <span className="hidden text-[7px] font-black uppercase tracking-[0.18em] text-white/30 sm:block">Interactive product preview</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[39%_61%]">
          <div className="min-h-[315px] border-b border-slate-200 sm:border-b-0 sm:border-r">
            <CustomerWidget stage={stage} accent={accent} reduceMotion={reduceMotion} />
          </div>
          <MerchantConsole stage={stage} reduceMotion={reduceMotion} />
        </div>

        <div className="border-t border-slate-200 bg-white px-4 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-1.5">
              {STAGES.map((item, index) => {
                const Icon = item.icon;
                const active = stage === index;
                const complete = index < stage;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setStage(index)}
                    className={`flex items-center gap-1.5 border px-2.5 py-1.5 text-[7px] font-black transition-all ${
                      active
                        ? "border-red-600 bg-red-600 text-white"
                        : complete
                          ? "border-slate-200 bg-slate-50 text-slate-700"
                          : "border-slate-200 bg-white text-slate-400"
                    }`}
                  >
                    {complete ? <Check size={9} /> : <Icon size={9} />}
                    {String(index + 1).padStart(2, "0")} {item.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <Palette size={11} className="text-slate-400" />
              <span className="text-[6px] font-black uppercase tracking-[0.16em] text-slate-400">Try a brand color</span>
              <div className="flex items-center gap-1.5">
                {BRAND_COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    aria-label={`Use ${color.name} brand color`}
                    onClick={() => setAccent(color.value)}
                    className="relative h-4 w-4 rounded-full border border-slate-200 transition-transform hover:scale-110"
                    style={{ backgroundColor: color.value }}
                  >
                    {accent === color.value && (
                      <span className="absolute inset-[-3px] rounded-full border border-slate-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {!reduceMotion && (
          <div className="h-[3px] bg-slate-100">
            <motion.div
              key={stage}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: STEP_MS / 1000, ease: "linear" }}
              className="h-full"
              style={{ backgroundColor: stage === 3 ? "#0f172a" : QALT_RED }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
