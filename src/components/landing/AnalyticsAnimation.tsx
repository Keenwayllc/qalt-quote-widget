"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  CircleDollarSign,
  LayoutDashboard,
  MapPin,
  ReceiptText,
  TrendingUp,
} from "lucide-react";

const FONT = {
  fontFamily: "var(--font-space-grotesk), var(--font-geist-sans), system-ui, sans-serif",
};

const STEP_MS = 4600;

const navItems = [
  ["Overview", LayoutDashboard],
  ["Analytics", BarChart3],
  ["Pricing Settings", CircleDollarSign],
  ["My Forms", ReceiptText],
  ["Quotes", ReceiptText],
] as const;

const steps = [
  { id: "overview", label: "Overview" },
  { id: "analytics", label: "Analytics" },
  { id: "quotes", label: "Recent Requests" },
];

function Shell({ currentStep }: { currentStep: number }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-[#f8fafc] shadow-[0_30px_80px_-36px_rgba(15,23,42,.45)]">
      <div className="flex h-10 items-center gap-1.5 border-b border-slate-200 bg-white px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <div className="ml-4 rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-[8px] font-bold text-slate-400">qalt.site/dashboard</div>
      </div>

      <div className="flex min-h-[500px]">
        <aside className="hidden w-[128px] shrink-0 border-r border-slate-200 bg-white p-3 sm:block">
          <div className="flex items-center gap-2 px-1 py-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-xs font-black text-white">Q</div>
            <div className="text-lg font-black tracking-tight text-slate-800">QALT</div>
          </div>
          <div className="mt-5 px-1 text-[7px] font-black uppercase tracking-[0.18em] text-slate-400">Merchant Console</div>
          <div className="mt-2 space-y-1">
            {navItems.map(([label, Icon], index) => {
              const active = currentStep === 0 ? index === 0 : currentStep === 1 ? index === 1 : index === 4;
              return (
                <div
                  key={label}
                  className={`flex items-center gap-2 rounded-lg px-2 py-2 text-[8px] font-black transition-all ${
                    active ? "bg-red-600 text-white" : "text-slate-500"
                  }`}
                >
                  <Icon size={11} />
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-5 px-1 text-[7px] font-black uppercase tracking-[0.18em] text-slate-400">Field Operations</div>
          <div className="mt-2 rounded-lg px-2 py-2 text-[8px] font-black text-slate-500">Jobs Dashboard</div>
        </aside>

        <div className="min-w-0 flex-1 p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <div className="inline-flex rounded-full border border-red-100 bg-red-50 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.16em] text-red-700">Pro Plan</div>
              <div className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">{currentStep === 0 ? "Dashboard" : currentStep === 1 ? "Analytics" : "Quotes"}</div>
            </div>
            <div className="hidden rounded-xl bg-slate-950 px-3 py-2 text-[9px] font-black text-white sm:block">Customize Widget ↗</div>
          </div>

          <div className="mb-4 flex gap-2">
            {steps.map((step, index) => (
              <div key={step.id} className="h-1 flex-1 overflow-hidden rounded-full bg-slate-200">
                <motion.div
                  className="h-full bg-red-600"
                  initial={false}
                  animate={{ width: currentStep > index ? "100%" : currentStep === index ? "100%" : "0%" }}
                  transition={{ duration: currentStep === index ? STEP_MS / 1000 : 0.2, ease: "linear" }}
                />
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {[
                    ["TOTAL QUOTES", "128", "+12%"],
                    ["BASE RATE", "$2.50", "per mile"],
                    ["ACTIVE STATUS", "Online", "Widget live"],
                  ].map(([label, value, sub], index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.12 }}
                      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div className={`grid h-8 w-8 place-items-center rounded-lg ${index === 1 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                          {index === 1 ? <CircleDollarSign size={15} /> : index === 2 ? <Activity size={15} /> : <ReceiptText size={15} />}
                        </div>
                        <span className={`rounded-full px-2 py-1 text-[7px] font-black ${index === 0 ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{sub}</span>
                      </div>
                      <div className="mt-4 text-[8px] font-black uppercase tracking-[0.16em] text-slate-400">{label}</div>
                      <div className="mt-1 text-2xl font-black tracking-tight text-slate-950">{value}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-black text-slate-900">Recent Requests</div>
                      <div className="mt-0.5 text-[9px] font-medium text-slate-400">Latest customer quote activity</div>
                    </div>
                    <div className="text-[9px] font-black text-red-600">View all →</div>
                  </div>
                  <div className="mt-3 divide-y divide-slate-100">
                    {[
                      ["Jordan Lee", "91605 → 90012", "20.8 mi", "$127.00"],
                      ["Avery Smith", "91316 → 91606", "10.9 mi", "$96.00"],
                    ].map(([name, route, distance, amount], index) => (
                      <motion.div
                        key={name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45 + index * 0.18 }}
                        className="flex items-center gap-3 py-3"
                      >
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-100 text-[9px] font-black text-slate-600">{name.charAt(0)}</div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] font-black text-slate-900">{name}</div>
                          <div className="mt-0.5 flex items-center gap-1.5 text-[8px] font-bold text-slate-400"><MapPin size={9} /> {route} · {distance}</div>
                        </div>
                        <div className="text-[11px] font-black text-slate-900">{amount}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {[
                    ["Quote volume", "128", TrendingUp],
                    ["Avg. quote", "$142", CircleDollarSign],
                    ["Booked", "41", CheckCircle2],
                    ["Conversion", "32%", Activity],
                  ].map(([label, value, Icon], index) => (
                    <motion.div
                      key={String(label)}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
                    >
                      <Icon size={14} className={index === 2 ? "text-emerald-600" : "text-red-600"} />
                      <div className="mt-2 text-[8px] font-black uppercase tracking-widest text-slate-400">{String(label)}</div>
                      <div className="mt-0.5 text-lg font-black text-slate-950">{String(value)}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-black text-slate-900">Quote activity</div>
                      <div className="text-[9px] font-medium text-slate-400">Last 30 days</div>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[8px] font-black text-emerald-700">+18%</span>
                  </div>
                  <div className="relative mt-5 h-40 overflow-hidden rounded-xl bg-slate-50">
                    <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(148,163,184,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.14) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                      <motion.path
                        d="M 2 82 C 14 80, 20 62, 31 66 C 42 70, 45 45, 56 50 C 66 55, 70 32, 82 38 C 90 42, 94 24, 98 20"
                        fill="none"
                        stroke="#dc2626"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2.1, ease: "easeInOut" }}
                      />
                    </svg>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.6, type: "spring" }}
                      className="absolute right-[4%] top-[15%] rounded-lg border border-red-100 bg-white px-2.5 py-1.5 shadow-md"
                    >
                      <div className="text-[7px] font-black uppercase tracking-widest text-slate-400">This week</div>
                      <div className="text-xs font-black text-slate-900">34 quotes</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="quotes"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="space-y-3"
              >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  {[
                    ["Pending", "3", "amber"],
                    ["Confirmed", "8", "blue"],
                    ["Paid", "21", "emerald"],
                  ].map(([label, count, tone], index) => (
                    <div key={label} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black text-slate-700">{label}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[8px] font-black ${tone === "emerald" ? "bg-emerald-50 text-emerald-700" : tone === "blue" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>{count}</span>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18 + index * 0.18 }}
                        className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-[9px] font-black text-slate-900">Jordan Lee</div>
                            <div className="mt-1 text-[8px] font-bold text-slate-400">91605 → 90012</div>
                          </div>
                          <div className="text-[9px] font-black text-slate-900">$127</div>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-[7px] font-bold text-slate-400">
                          <span>20.8 mi</span>
                          <span>{index === 2 ? "PAID" : index === 1 ? "CONFIRMED" : "PENDING"}</span>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50 p-4"
                >
                  <div>
                    <div className="text-[8px] font-black uppercase tracking-widest text-emerald-700">Quote paid</div>
                    <div className="mt-1 text-xs font-black text-slate-900">Ready to move into operations</div>
                  </div>
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-600 text-white"><ArrowUpRight size={16} /></div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsAnimation() {
  const [currentStep, setCurrentStep] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => setCurrentStep((step) => (step + 1) % steps.length), STEP_MS);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  return (
    <div className="w-full max-w-6xl mx-auto" style={FONT}>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 items-center">
        <div className="order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-red-300">
            <BarChart3 size={13} />
            Merchant Console
          </div>
          <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl">
            Show the dashboard customers actually get after signup.
          </h2>
          <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-slate-400 sm:text-lg">
            The homepage now uses Qalt&apos;s real Merchant Console structure: overview cards, quote analytics, request activity, and operational handoff.
          </p>

          <div className="mt-8 space-y-3">
            {steps.map((step, index) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setCurrentStep(index)}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all ${
                  currentStep === index ? "border-white/15 bg-white/8 text-white" : "border-transparent bg-transparent text-slate-500 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`grid h-8 w-8 place-items-center rounded-lg text-[10px] font-black ${currentStep === index ? "bg-red-600 text-white" : "bg-white/5 text-slate-500"}`}>{index + 1}</div>
                  <span className="text-sm font-black">{step.label}</span>
                </div>
                <ArrowUpRight size={14} className={currentStep === index ? "text-red-300" : "text-slate-600"} />
              </button>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="absolute" />
          <Shell currentStep={currentStep} />
        </div>
      </div>
    </div>
  );
}
