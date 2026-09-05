"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  CreditCard,
  MapPin,
  Package,
  Pencil,
  ReceiptText,
  Route,
  Zap,
} from "lucide-react";

const STAGE_MS = 4800;

const stages = [
  {
    id: "details",
    eyebrow: "01 · Delivery details",
    title: "Customer enters the job",
    description: "Pickup, delivery, shipment details, date, and service add-ons stay in one branded flow.",
    icon: MapPin,
  },
  {
    id: "quote",
    eyebrow: "02 · Instant quote",
    title: "Your pricing appears clearly",
    description: "Distance, service charges, and the final estimate are shown before the customer books.",
    icon: ReceiptText,
  },
  {
    id: "pay",
    eyebrow: "03 · Pay & book",
    title: "The customer confirms the job",
    description: "Contact details, route information, and the booking move forward without starting over.",
    icon: CreditCard,
  },
];

const FONT = {
  fontFamily: "var(--font-inter), Inter, Arial, Helvetica, sans-serif",
};

function StageProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-2">
      {stages.map((stage, index) => (
        <div key={stage.id} className="flex items-center gap-2">
          <div
            className={`grid h-7 w-7 place-items-center rounded-full border text-[10px] font-black transition-all duration-500 ${
              index < currentStep
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : index === currentStep
                  ? "border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/15"
                  : "border-slate-200 bg-white text-slate-400"
            }`}
          >
            {index < currentStep ? <CheckCircle2 size={13} /> : index + 1}
          </div>
          {index < stages.length - 1 && (
            <div className={`h-px w-7 sm:w-10 ${index < currentStep ? "bg-emerald-300" : "bg-slate-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function RouteMap({ active, reduceMotion }: { active: boolean; reduceMotion: boolean | null }) {
  const route = "M72 52 V108 Q72 124 88 124 H174 Q193 124 193 143 V199 Q193 218 212 218 H292";
  const accent = "#50a875";

  return (
    <div className="relative min-h-[260px] flex-1 overflow-hidden bg-[#f7f8fa]">
      <div className="absolute inset-0 bg-[#f7f8fa]" />
      <div className="absolute left-[4%] top-[8%] h-[34%] w-[36%] rounded-[42%_58%_55%_45%] bg-[#dcebd9]/80" />
      <div className="absolute bottom-[10%] right-[-4%] h-[42%] w-[38%] rounded-[52%_48%_46%_54%] bg-[#dfeaf3]/85" />

      <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-3 py-2 shadow-sm backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-700">Route overview</span>
      </div>

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 360 270" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <pattern id="customer-flow-route-grid" width="34" height="34" patternUnits="userSpaceOnUse">
            <path d="M34 0H0V34" fill="none" stroke="#e4e7eb" strokeWidth="0.8" />
          </pattern>
          <filter id="customer-flow-route-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.2" floodColor={accent} floodOpacity="0.24" />
          </filter>
        </defs>

        <rect width="360" height="270" fill="url(#customer-flow-route-grid)" />

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
          filter="url(#customer-flow-route-shadow)"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0.25 }}
          animate={{ pathLength: active ? 1 : 0.38, opacity: 1 }}
          transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
        />

        {active && !reduceMotion && (
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

      <motion.div
        className="absolute bottom-4 left-4 right-4 z-20 grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: active ? 1 : 0.65, y: 0 }}
      >
        <div>
          <div className="text-[8px] font-black uppercase tracking-widest text-slate-400">Distance</div>
          <div className="mt-0.5 text-sm font-black text-slate-900">20.8 mi</div>
        </div>
        <div>
          <div className="text-[8px] font-black uppercase tracking-widest text-slate-400">Drive time</div>
          <div className="mt-0.5 text-sm font-black text-slate-900">34 min</div>
        </div>
      </motion.div>
    </div>
  );
}

function QuotePanel({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex w-full flex-col bg-white lg:w-[46%]">
      <div className="relative overflow-hidden bg-slate-900 px-5 py-5 text-white sm:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(220,38,38,.28),transparent_46%)]" />
        <div className="relative">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/50">Northline Delivery Co.</div>
              <div className="mt-1 text-lg font-black tracking-tight">Delivery Quote Calculator</div>
            </div>
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/10 font-black">N</div>
          </div>
          <div className="mt-5"><StageProgress currentStep={currentStep} /></div>
        </div>
      </div>

      <div className="flex-1 p-5 sm:p-6">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.35 }}
              className="space-y-4"
            >
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">Where are we going?</div>
                <div className="mt-3 space-y-2.5">
                  {[
                    ["Pickup", "North Hollywood, CA"],
                    ["Delivery", "Downtown Los Angeles, CA"],
                  ].map(([label, value], index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.2 }}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin size={13} className={index === 0 ? "text-emerald-600" : "text-red-500"} />
                        <div>
                          <div className="text-[8px] font-black uppercase tracking-widest text-slate-400">{label}</div>
                          <div className="mt-0.5 text-xs font-bold text-slate-800">{value}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-slate-200 p-3">
                  <Package size={14} className="text-slate-400" />
                  <div className="mt-2 text-[8px] font-black uppercase tracking-widest text-slate-400">Shipment</div>
                  <div className="mt-0.5 text-xs font-black text-slate-900">1 pallet · 400 lb</div>
                </div>
                <div className="rounded-xl border border-slate-200 p-3">
                  <Clock3 size={14} className="text-slate-400" />
                  <div className="mt-2 text-[8px] font-black uppercase tracking-widest text-slate-400">Pickup</div>
                  <div className="mt-0.5 text-xs font-black text-slate-900">Today · 3:30 PM</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[9px] font-black text-amber-700">Stairs</span>
                <span className="rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-[9px] font-black text-red-700">Inside Delivery</span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 text-xs font-black text-white shadow-lg"
              >
                Get instant quote <ArrowRight size={14} />
              </motion.div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="quote"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35 }}
              className="space-y-4"
            >
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 text-center">
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-700">Your estimated rate</div>
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 180, damping: 18 }}
                  className="mt-2 text-4xl font-black tracking-tight text-emerald-800"
                >
                  $127<span className="text-xl text-emerald-700/50">.00</span>
                </motion.div>
                <div className="mt-1 text-[10px] font-bold text-emerald-700/70">20.8 miles</div>
              </div>

              <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4">
                {[
                  ["Base service", "$60.00"],
                  ["20.8 mi × $2.50", "$52.00"],
                  ["Inside delivery", "$15.00"],
                ].map(([label, value], index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + index * 0.18 }}
                    className="flex items-center justify-between text-[11px]"
                  >
                    <span className="font-medium text-slate-500">{label}</span>
                    <span className="font-black text-slate-900">{value}</span>
                  </motion.div>
                ))}
                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Estimated delivery</span>
                  <span className="text-lg font-black text-slate-900">$127.00</span>
                </div>
              </div>

              <div className="flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 text-xs font-black text-white shadow-lg shadow-emerald-600/15">
                Pay & Book <ArrowRight size={14} />
              </div>
              <div className="flex items-center justify-center gap-1.5 text-[9px] font-bold text-slate-400"><Pencil size={11} /> Edit details</div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="paid"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="flex min-h-[325px] flex-col justify-center"
            >
              <motion.div
                initial={{ scale: 0.5, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 14 }}
                className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700"
              >
                <CheckCircle2 size={32} />
              </motion.div>
              <div className="mt-5 text-center">
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600">Payment complete</div>
                <h4 className="mt-1 text-2xl font-black tracking-tight text-slate-900">Delivery booked</h4>
                <p className="mx-auto mt-2 max-w-[260px] text-xs font-medium leading-relaxed text-slate-500">The customer is done. Qalt keeps the quote, route, and booking details together.</p>
              </div>
              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[8px] font-black uppercase tracking-widest text-slate-400">Booking</div>
                    <div className="mt-1 text-sm font-black text-slate-900">North Hollywood → Downtown LA</div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[9px] font-black text-emerald-700">PAID</span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 text-xs">
                  <span className="font-medium text-slate-500">1 pallet · Inside delivery</span>
                  <span className="font-black text-slate-900">$127.00</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function HowItWorksAnimation() {
  const [currentStep, setCurrentStep] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      setCurrentStep((step) => (step + 1) % stages.length);
    }, STAGE_MS);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  return (
    <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16" style={FONT}>
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-red-700">
          <Zap size={12} className="fill-red-600" />
          How it works
        </div>
        <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-5xl">
          The same Qalt flow your customer actually sees.
        </h2>
        <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-slate-500 sm:text-lg">
          No abstract software mockup. The homepage now demonstrates the real quote experience: delivery details, transparent pricing, and Pay & Book.
        </p>

        <div className="mt-8 space-y-3">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const active = currentStep === index;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setCurrentStep(index)}
                className={`w-full rounded-2xl border p-4 text-left transition-all duration-300 ${
                  active
                    ? "border-slate-200 bg-white shadow-xl shadow-slate-200/55"
                    : "border-transparent bg-transparent hover:border-slate-100 hover:bg-white/60"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${active ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-400"}`}>
                    <Icon size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={`text-[9px] font-black uppercase tracking-[0.18em] ${active ? "text-red-600" : "text-slate-400"}`}>{stage.eyebrow}</div>
                    <div className="mt-1 text-base font-black tracking-tight text-slate-900">{stage.title}</div>
                    <div className="mt-1 text-sm font-medium leading-relaxed text-slate-500">{stage.description}</div>
                  </div>
                  <ArrowRight size={15} className={`mt-1 shrink-0 transition-all ${active ? "translate-x-0 text-slate-900" : "-translate-x-1 text-slate-300"}`} />
                </div>
                {active && !reducedMotion && (
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      key={currentStep}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: STAGE_MS / 1000, ease: "linear" }}
                      className="h-full bg-red-600"
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-5 rounded-[36px] bg-gradient-to-br from-red-100/70 via-white to-emerald-100/50 blur-2xl" />
        <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_30px_80px_-34px_rgba(15,23,42,0.42)]">
          <div className="flex h-10 items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-4">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <div className="mx-auto rounded-full border border-slate-200 bg-white px-5 py-1 text-[8px] font-bold text-slate-400">northline-delivery.com/quote</div>
          </div>
          <div className="flex min-h-[520px] flex-col lg:flex-row">
            <QuotePanel currentStep={currentStep} />
            <RouteMap active={currentStep >= 1} reduceMotion={reducedMotion} />
          </div>
        </div>

        <motion.div
          animate={reducedMotion ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-3 -top-4 hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3.5 py-3 shadow-xl lg:flex"
        >
          <Route size={15} className="text-emerald-600" />
          <div>
            <div className="text-[7px] font-black uppercase tracking-widest text-slate-400">Live route</div>
            <div className="text-[10px] font-black text-slate-900">20.8 mi calculated</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
