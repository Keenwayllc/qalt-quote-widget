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
  { name: "Crimson", value: "#df1731" },
  { name: "Cobalt", value: "#3159ca" },
  { name: "Evergreen", value: "#087c68" },
  { name: "Violet", value: "#7950bf" },
];

const STEP_MS = 4300;
const QALT_RED = "#df1731";

function RouteMap({ accent, reduceMotion }: { accent: string; reduceMotion: boolean | null }) {
  const route = "M72 52 V108 Q72 124 88 124 H174 Q193 124 193 143 V199 Q193 218 212 218 H292";

  return (
    <div className="overflow-hidden border border-slate-200 bg-[#f7f8fa]">
      <div className="flex items-center justify-between px-3 pb-1 pt-2.5">
        <span className="text-[7px] font-bold uppercase tracking-[0.14em] text-slate-400">The delivery route</span>
        <span className="text-[8px] font-bold text-slate-600">20.8 mi</span>
      </div>
      <svg viewBox="0 0 360 270" className="block h-[132px] w-full" role="img" aria-label="Illustrative route from North Hollywood to Downtown Los Angeles">
        <defs>
          <pattern id="qalt-route-grid" width="34" height="34" patternUnits="userSpaceOnUse">
            <path d="M34 0H0V34" fill="none" stroke="#e4e7eb" strokeWidth="0.8" />
          </pattern>
          <filter id="qalt-route-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.2" floodColor={accent} floodOpacity="0.24" />
          </filter>
        </defs>

        <rect width="360" height="270" fill="url(#qalt-route-grid)" />

        {/* Single-stroke streets: no doubled white road casing. */}
        <path d="M-25 212 C65 178 172 146 388 62" fill="none" stroke="#d8dde4" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M18 -8 C90 63 180 150 325 292" fill="none" stroke="#d8dde4" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M-12 77 C104 108 220 154 382 245" fill="none" stroke="#d8dde4" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M123 -20 C144 66 147 157 132 298" fill="none" stroke="#e1e4e9" strokeWidth="1" strokeLinecap="round" />

        <text x="24" y="28" fill="#a3a9b3" fontSize="10" letterSpacing="1.7" style={{ fontFamily: "var(--font-inter), Inter, Arial, sans-serif" }}>
          LOS ANGELES
        </text>

        <motion.path
          d={route}
          pathLength={1}
          fill="none"
          stroke={accent}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#qalt-route-shadow)"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0.25 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
        />

        {!reduceMotion && (
          <motion.circle
            r="5"
            fill={accent}
            stroke="white"
            strokeWidth="2"
            initial={{ cx: 72, cy: 52 }}
            animate={{
              cx: [72, 72, 88, 174, 193, 193, 212, 292],
              cy: [52, 108, 124, 124, 143, 199, 218, 218],
            }}
            transition={{ duration: 3.3, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.8 }}
          />
        )}

        <circle cx="72" cy="52" r="8" fill="white" stroke={accent} strokeWidth="3" />
        <circle cx="292" cy="218" r="8" fill={accent} />
        <circle cx="292" cy="218" r="3" fill="white" />

        <g>
          <rect x="87" y="34" width="122" height="27" rx="5" fill="white" stroke="#e6e8ed" />
          <text x="97" y="51" fill="#525967" fontSize="9" fontWeight="600" style={{ fontFamily: "var(--font-inter), Inter, Arial, sans-serif" }}>
            North Hollywood
          </text>
        </g>
        <g>
          <rect x="171" y="229" width="155" height="27" rx="5" fill="white" stroke="#e6e8ed" />
          <text x="181" y="246" fill="#525967" fontSize="9" fontWeight="600" style={{ fontFamily: "var(--font-inter), Inter, Arial, sans-serif" }}>
            Downtown Los Angeles
          </text>
        </g>
      </svg>
    </div>
  );
}

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
      <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-lg text-[10px] font-extrabold text-white" style={{ backgroundColor: accent }}>
            ND
          </div>
          <div>
            <p className="text-[10px] font-bold leading-none text-slate-900">Northline Delivery Co.</p>
            <p className="mt-1 text-[7px] font-medium text-slate-400">Local delivery, made simple.</p>
          </div>
        </div>
        <span className="text-[6px] font-bold uppercase tracking-[0.16em] text-slate-300">Powered by Qalt</span>
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
            <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-slate-400">Delivery request</p>
            <h3 className="mt-1 text-[17px] font-extrabold tracking-[-0.035em] text-slate-950">Where are we going?</h3>

            <div className="mt-3 space-y-2">
              {[
                ["Pickup", "North Hollywood, CA"],
                ["Delivery", "Downtown Los Angeles, CA"],
              ].map(([label, value], index) => (
                <motion.div
                  key={label}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.08 }}
                  className="flex items-center gap-2 border border-slate-200 bg-white px-3 py-2.5"
                >
                  <span className="h-2 w-2 rounded-full border-2" style={{ borderColor: accent, backgroundColor: index === 1 ? accent : "white" }} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[6px] font-bold uppercase tracking-[0.14em] text-slate-400">{label}</p>
                    <p className="truncate text-[9px] font-semibold text-slate-700">{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="border border-slate-200 bg-slate-50 p-2.5">
                <Package size={12} className="mb-1.5 text-slate-400" />
                <p className="text-[6px] font-bold uppercase tracking-wider text-slate-400">Shipment</p>
                <p className="mt-0.5 text-[8px] font-bold">1 pallet · 400 lb</p>
              </div>
              <div className="border border-slate-200 bg-slate-50 p-2.5">
                <Truck size={12} className="mb-1.5 text-slate-400" />
                <p className="text-[6px] font-bold uppercase tracking-wider text-slate-400">Service</p>
                <p className="mt-0.5 text-[8px] font-bold">Inside delivery</p>
              </div>
            </div>

            <div className="mt-2">
              <RouteMap accent={accent} reduceMotion={reduceMotion} />
            </div>

            <motion.div
              animate={reduceMotion ? undefined : { scale: [1, 1.01, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="mt-2 flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-[8px] font-bold text-white"
              style={{ backgroundColor: accent }}
            >
              Get instant quote <ArrowRight size={10} />
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
            <p className="text-[7px] font-bold uppercase tracking-[0.18em]" style={{ color: accent }}>Instant quote</p>
            <h3 className="mt-1 text-[17px] font-extrabold tracking-[-0.035em] text-slate-950">A price. In an instant.</h3>

            <div className="mt-3">
              <RouteMap accent={accent} reduceMotion={reduceMotion} />
            </div>

            <div className="mt-2 border border-slate-200 bg-white p-3">
              <div className="space-y-2">
                {[
                  ["Base service", "$60.00"],
                  ["20.8 mi × $2.50", "$52.00"],
                  ["Inside delivery", "$15.00"],
                ].map(([label, value], index) => (
                  <motion.div
                    key={label}
                    initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + index * 0.16 }}
                    className="flex items-center justify-between text-[8px]"
                  >
                    <span className="font-medium text-slate-500">{label}</span>
                    <span className="font-semibold text-slate-800">{value}</span>
                  </motion.div>
                ))}
              </div>
              <div className="my-2 border-t border-dashed border-slate-200" />
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[6px] font-bold uppercase tracking-wider text-slate-400">Estimated delivery</p>
                  <p className="text-[6px] font-medium text-slate-400">Transparent pricing</p>
                </div>
                <motion.p
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.72, type: "spring" }}
                  className="text-[27px] font-extrabold tracking-[-0.05em]"
                  style={{ color: accent }}
                >
                  $127.00
                </motion.p>
              </div>
            </div>

            <div className="mt-auto flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-[8px] font-bold text-white" style={{ backgroundColor: accent }}>
              Preview booking & payment <CreditCard size={10} />
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
              className="grid h-14 w-14 place-items-center rounded-full text-white"
              style={{ backgroundColor: accent }}
            >
              <Check size={25} />
            </motion.div>
            <p className="mt-4 text-[7px] font-bold uppercase tracking-[0.18em]" style={{ color: accent }}>Sample payment received</p>
            <h3 className="mt-1 text-[19px] font-extrabold tracking-[-0.04em] text-slate-950">Booked. Paid. Ready.</h3>
            <p className="mt-2 max-w-[220px] text-[8px] font-medium leading-relaxed text-slate-400">
              Booking and payment move together while the delivery details stay attached to the job.
            </p>
            <div className="mt-5 w-full border border-slate-200 bg-slate-50 p-3 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-bold text-slate-700">North Hollywood → Downtown LA</span>
                <span className="rounded-sm bg-emerald-50 px-2 py-1 text-[7px] font-bold text-emerald-700">PAID</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[7px] font-medium text-slate-400">
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
            <p className="text-[7px] font-bold uppercase tracking-[0.18em] text-slate-400">Customer side complete</p>
            <h3 className="mt-1 text-[19px] font-extrabold tracking-[-0.04em] text-slate-950">The job keeps moving.</h3>
            <p className="mt-3 text-[9px] font-medium leading-relaxed text-slate-500">
              Qalt carries the quote, route, payment state, stops, and readiness context into the merchant workflow.
            </p>
            <div className="mt-5 space-y-2">
              {["Quote details attached", "Pickup & delivery stops", "Payment status saved", "Ready for operations"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 border-b border-slate-100 pb-2 text-[8px] font-semibold text-slate-600 last:border-0"
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
    <aside className="hidden w-[106px] shrink-0 border-r border-slate-200 bg-white p-2.5 sm:block">
      <div className="mb-4 px-1">
        <Image src="/images/qalt-logo-main-2026.png" alt="Qalt" width={48} height={18} className="object-contain" />
      </div>
      <p className="mb-2 px-1 text-[5px] font-bold uppercase tracking-[0.18em] text-slate-400">Merchant Console</p>
      <div className="space-y-1">
        {nav.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className={`flex items-center gap-1.5 rounded-md px-2 py-2 text-[6px] font-semibold ${item.active ? "bg-red-600 text-white" : "text-slate-500"}`}>
              <Icon size={9} className={item.active ? "text-white" : "text-slate-400"} />
              <span className="truncate">{item.name}</span>
            </div>
          );
        })}
      </div>

      <p className="mb-2 mt-5 px-1 text-[5px] font-bold uppercase tracking-[0.18em] text-slate-400">Field Operations</p>
      <div className={`flex items-center gap-1.5 rounded-md px-2 py-2 text-[6px] font-semibold ${stage === 3 ? "bg-slate-900 text-white" : "text-slate-500"}`}>
        <Briefcase size={9} className={stage === 3 ? "text-white" : "text-slate-400"} />
        <span>Jobs Dashboard</span>
      </div>
    </aside>
  );
}

function Metric({ label, value, icon, tone }: { label: string; value: string; icon: React.ReactNode; tone: "red" | "emerald" | "rose" }) {
  const tones = {
    red: "bg-red-50 text-red-600",
    emerald: "bg-emerald-50 text-emerald-600",
    rose: "bg-rose-50 text-rose-600",
  };

  return (
    <div className="border border-slate-200 bg-white p-2.5">
      <div className={`mb-2 grid h-6 w-6 place-items-center ${tones[tone]}`}>{icon}</div>
      <p className="text-[5px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-0.5 text-[14px] font-extrabold tracking-[-0.03em] text-slate-900">{value}</p>
    </div>
  );
}

function DashboardOverview({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <motion.div key="overview" initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -8 }} className="p-3.5">
      <span className="rounded-sm bg-red-50 px-2 py-1 text-[5px] font-bold uppercase tracking-wider text-red-700">PRO Plan</span>
      <h3 className="mt-2 text-[18px] font-extrabold tracking-[-0.04em] text-slate-950">Dashboard</h3>
      <p className="text-[7px] font-medium text-slate-400">Here&apos;s your performance.</p>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <Metric label="Total Quotes" value="128" icon={<FileText size={11} />} tone="red" />
        <Metric label="Base Rate" value="$2.50" icon={<Calculator size={11} />} tone="emerald" />
        <Metric label="Active Status" value="Online" icon={<Activity size={11} />} tone="rose" />
      </div>

      <div className="mt-3 border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[7px] font-bold text-slate-800">Recent Requests</span>
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          </div>
          <span className="text-[6px] font-bold text-red-600">View all →</span>
        </div>
        <div className="flex items-center gap-2.5 p-3">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-slate-900 text-[8px] font-bold text-white">J</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[7px] font-bold text-slate-800">Jordan Lee</p>
            <p className="mt-0.5 truncate text-[6px] font-medium text-slate-400">91605 → 90012 · 20.8 mi</p>
          </div>
          <span className="text-[11px] font-extrabold text-slate-900">$127</span>
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
    <motion.div key={paid ? "paid-board" : "quote-board"} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -8 }} className="p-3.5">
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-[18px] font-extrabold tracking-[-0.04em] text-slate-950">Quotes</h3>
          <p className="text-[7px] font-medium text-slate-400">Manage customer quote requests.</p>
        </div>
        <span className="rounded-md bg-slate-900 px-2.5 py-1.5 text-[6px] font-bold text-white">List · Board</span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {columns.map((column, index) => {
          const hasCard = paid ? index === 2 : index === 0;
          return (
            <div key={column.label} className={`min-h-[168px] rounded-md border border-slate-200 ${column.bg}`}>
              <div className="flex items-center gap-1.5 border-b border-slate-200 px-2 py-2">
                <span className={`h-1.5 w-1.5 rounded-full ${column.dot}`} />
                <span className="text-[5px] font-bold uppercase tracking-wider text-slate-600">{column.label}</span>
                <span className="ml-auto rounded-full bg-white/80 px-1.5 py-0.5 text-[5px] font-bold text-slate-400">{hasCard ? 1 : 0}</span>
              </div>

              {hasCard ? (
                <motion.div
                  layout
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 170, damping: 16, delay: 0.18 }}
                  className="m-2 overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm"
                >
                  <div className="flex items-start gap-1.5 p-2">
                    <div className="grid h-5 w-5 place-items-center rounded-md bg-slate-900 text-[6px] font-bold text-white">J</div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[6px] font-bold text-slate-900">Jordan Lee</p>
                      <div className="mt-1 flex items-center gap-1 text-[5px] font-medium text-slate-400">
                        <MapPin size={6} className="text-red-400" /> 91605 → 90012
                      </div>
                    </div>
                    <span className="text-[8px] font-extrabold text-slate-900">$127</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 px-2 py-1.5">
                    <span className="text-[5px] font-medium text-slate-400">20.8 mi</span>
                    {paid ? <span className="text-[5px] font-bold text-emerald-700">PAID ✓</span> : <span className="text-[5px] font-bold text-red-600">Details →</span>}
                  </div>
                </motion.div>
              ) : (
                <div className="m-2 flex h-12 items-center justify-center rounded-md border border-dashed border-slate-200 text-[5px] font-medium text-slate-300">Drop here</div>
              )}
            </div>
          );
        })}
      </div>

      {paid && (
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-2 flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-[6px] font-bold text-emerald-700">
          <CheckCircle2 size={10} /> Payment received. Quote is ready for operations.
        </motion.div>
      )}
    </motion.div>
  );
}

function JobsDashboard({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <motion.div key="jobs" initial={reduceMotion ? false : { opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -10 }} className="p-3.5">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[5px] font-bold uppercase tracking-[0.18em] text-slate-400">Field Operations</p>
          <h3 className="mt-1 text-[18px] font-extrabold tracking-[-0.04em] text-slate-950">Jobs Dashboard</h3>
        </div>
        <span className="rounded-md bg-slate-900 px-2.5 py-1.5 text-[6px] font-bold text-white">+ Create New Job</span>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-[6px] font-medium text-slate-400">
        <MapPin size={9} /> Search jobs by ID or stop name...
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="mt-3 rounded-md border border-slate-200 bg-white p-3 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-slate-50 text-slate-400"><Briefcase size={18} /></div>
          <div>
            <p className="text-[5px] font-bold uppercase tracking-[0.18em] text-slate-400">JOB #Q1042</p>
            <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-1 text-[5px] font-bold uppercase tracking-wider text-emerald-700">
              <CheckCircle2 size={7} /> Ready
            </span>
          </div>

          <div className="ml-2 min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-[6px] font-bold text-slate-700"><Clock size={8} className="text-red-500" /> Today</div>
            <div className="mt-2 flex items-center gap-1 text-[6px] font-medium text-slate-400">
              <span className="grid h-4 w-4 place-items-center rounded-full border-2 border-white bg-slate-100 text-[5px] font-bold">1</span>
              <span className="grid h-4 w-4 place-items-center rounded-full border-2 border-white bg-slate-100 text-[5px] font-bold">2</span>
              <span className="truncate">North Hollywood → Downtown Los Angeles</span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[5px] font-bold uppercase tracking-wider text-slate-400">Readiness</p>
            <p className="mt-1 flex items-center justify-end gap-1 text-[6px] font-bold text-emerald-600"><CheckCircle2 size={8} /> VERIFIED</p>
          </div>
        </div>
      </motion.div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {["Quote attached", "2 stops saved", "$127 paid"].map((item) => (
          <div key={item} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-2 text-center text-[5px] font-semibold text-slate-500">
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
    <div className="flex h-full min-h-[370px] bg-slate-50">
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
    const timer = window.setInterval(() => setStage((current) => (current + 1) % STAGES.length), STEP_MS);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <div className="relative w-full max-w-[670px] select-none" style={{ fontFamily: "var(--font-inter), Inter, Arial, Helvetica, sans-serif" }}>
      <motion.div
        animate={reduceMotion ? undefined : { opacity: [0.24, 0.48, 0.24], scale: [0.98, 1.025, 0.98] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -inset-7 rounded-full bg-red-500/10 blur-3xl"
      />

      <div className="relative overflow-hidden rounded-[15px] border border-white/10 bg-white shadow-2xl shadow-black/45">
        <div className="flex items-center gap-2 border-b border-slate-200 bg-[#f8f9fa] px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-slate-300" />
            <div className="h-2 w-2 rounded-full bg-slate-300" />
            <div className="h-2 w-2 rounded-full bg-slate-300" />
          </div>
          <div className="mx-2 flex min-w-0 flex-1 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="truncate text-[8px] font-medium text-slate-400">your-delivery-business.com</span>
          </div>
          <span className="hidden text-[7px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:block">Interactive product preview</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[41%_59%]">
          <div className="min-h-[370px] border-b border-slate-200 sm:border-b-0 sm:border-r">
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
                    className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[7px] font-semibold transition-all ${
                      active ? "border-red-600 bg-red-600 text-white" : complete ? "border-slate-200 bg-slate-50 text-slate-700" : "border-slate-200 bg-white text-slate-400"
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
              <span className="text-[6px] font-bold uppercase tracking-[0.14em] text-slate-400">Try a brand color</span>
              <div className="flex items-center gap-1.5">
                {BRAND_COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    aria-label={`Use ${color.name} brand color`}
                    onClick={() => setAccent(color.value)}
                    className="relative h-4 w-4 rounded-full border-[3px] border-white shadow-sm transition-transform hover:scale-110"
                    style={{ backgroundColor: color.value, outline: accent === color.value ? `1px solid ${color.value}` : "1px solid transparent" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {!reduceMotion && (
          <div className="h-[2px] bg-slate-100">
            <motion.div
              key={stage}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: STEP_MS / 1000, ease: "linear" }}
              className="h-full"
              style={{ backgroundColor: stage === 3 ? "#22252b" : QALT_RED }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
