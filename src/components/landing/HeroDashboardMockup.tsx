"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  Check,
  CheckCircle2,
  CreditCard,
  MapPin,
  Package,
  Palette,
  Route,
  Sparkles,
  Truck,
} from "lucide-react";

const STAGES = [
  { label: "Details", icon: MapPin },
  { label: "Route", icon: Route },
  { label: "Quote", icon: Calculator },
  { label: "Paid", icon: CreditCard },
];

const ACCENTS = [
  { name: "Qalt Red", value: "#ef4444" },
  { name: "Electric Blue", value: "#3b82f6" },
  { name: "Emerald", value: "#10b981" },
];

const STEP_MS = 4200;

function Field({
  label,
  value,
  delay = 0,
  accent,
  reduceMotion,
}: {
  label: string;
  value: string;
  delay?: number;
  accent: string;
  reduceMotion: boolean | null;
}) {
  return (
    <div>
      <p className="mb-1.5 text-[8px] font-black uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
        <motion.div
          initial={reduceMotion ? false : { width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.1, delay }}
          className="overflow-hidden whitespace-nowrap text-[10px] font-bold text-slate-700"
        >
          {value}
        </motion.div>
        <MapPin
          size={12}
          className="absolute right-3 top-1/2 -translate-y-1/2"
          style={{ color: accent }}
        />
      </div>
    </div>
  );
}

function StagePanel({
  stage,
  accent,
  reduceMotion,
}: {
  stage: number;
  accent: string;
  reduceMotion: boolean | null;
}) {
  return (
    <AnimatePresence mode="wait">
      {stage === 0 && (
        <motion.div
          key="details"
          initial={reduceMotion ? false : { opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: 18 }}
          transition={{ duration: 0.45 }}
          className="space-y-3"
        >
          <div className="mb-1 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-400">
                Instant quote
              </p>
              <h3 className="text-base font-black text-slate-900">Where is it going?</h3>
            </div>
            <div className="rounded-full bg-slate-100 px-2.5 py-1 text-[8px] font-black text-slate-500">
              1 of 4
            </div>
          </div>

          <Field
            label="Pickup"
            value="Downtown Los Angeles, CA"
            accent={accent}
            delay={0.15}
            reduceMotion={reduceMotion}
          />
          <Field
            label="Dropoff"
            value="Santa Monica, CA"
            accent={accent}
            delay={0.65}
            reduceMotion={reduceMotion}
          />

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <Package size={13} className="mb-2 text-slate-500" />
              <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">Shipment</p>
              <p className="mt-0.5 text-[10px] font-black text-slate-800">2 boxes · 85 lb</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <Truck size={13} className="mb-2 text-slate-500" />
              <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">Service</p>
              <p className="mt-0.5 text-[10px] font-black text-slate-800">Same day</p>
            </div>
          </div>

          <motion.div
            animate={reduceMotion ? undefined : { scale: [1, 1.015, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-[10px] font-black text-white"
            style={{ backgroundColor: accent }}
          >
            Calculate route <ArrowRight size={12} />
          </motion.div>
        </motion.div>
      )}

      {stage === 1 && (
        <motion.div
          key="route"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.45 }}
          className="space-y-3"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: accent }}>
                Route ready
              </p>
              <h3 className="text-base font-black text-slate-900">Distance calculated.</h3>
            </div>
            <motion.div
              initial={reduceMotion ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.25 }}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: accent }}
            >
              <Check size={15} />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">Distance</p>
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-1 text-xl font-black text-slate-900"
              >
                16.8 mi
              </motion.p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">Drive time</p>
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-1 text-xl font-black text-slate-900"
              >
                29 min
              </motion.p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
              <div>
                <p className="text-[9px] font-black text-slate-800">Pickup confirmed</p>
                <p className="text-[8px] text-slate-400">Downtown Los Angeles</p>
              </div>
            </div>
            <div className="ml-[5px] h-5 w-px border-l border-dashed border-slate-300" />
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-slate-900" />
              <div>
                <p className="text-[9px] font-black text-slate-800">Dropoff confirmed</p>
                <p className="text-[8px] text-slate-400">Santa Monica</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-[10px] font-black text-white">
            Price this job <Calculator size={12} />
          </div>
        </motion.div>
      )}

      {stage === 2 && (
        <motion.div
          key="quote"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -18 }}
          transition={{ duration: 0.45 }}
          className="space-y-3"
        >
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: accent }}>
              Instant price
            </p>
            <h3 className="text-base font-black text-slate-900">Your rates did the math.</h3>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="space-y-2.5 text-[10px]">
              {[
                ["Base delivery", "$49.00"],
                ["Mileage", "$33.60"],
                ["Same-day service", "$15.00"],
              ].map(([label, price], index) => (
                <motion.div
                  key={label}
                  initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.22 }}
                  className="flex items-center justify-between"
                >
                  <span className="font-medium text-slate-500">{label}</span>
                  <span className="font-black text-slate-800">{price}</span>
                </motion.div>
              ))}
            </div>
            <div className="my-3 border-t border-dashed border-slate-200" />
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.95, type: "spring" }}
              className="flex items-end justify-between"
            >
              <div>
                <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">Customer total</p>
                <p className="text-[9px] font-bold text-slate-500">Ready to book</p>
              </div>
              <p className="text-3xl font-black" style={{ color: accent }}>$97.60</p>
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-[10px] font-black text-white"
            style={{ backgroundColor: accent }}
          >
            Book & pay <CreditCard size={12} />
          </motion.div>
        </motion.div>
      )}

      {stage === 3 && (
        <motion.div
          key="paid"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="flex min-h-[255px] flex-col items-center justify-center text-center"
        >
          <motion.div
            initial={reduceMotion ? false : { scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 13, delay: 0.1 }}
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-full text-white shadow-xl"
            style={{ backgroundColor: accent, boxShadow: `0 18px 45px ${accent}45` }}
          >
            <CheckCircle2 size={32} />
          </motion.div>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-[9px] font-black uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            Payment complete
          </motion.p>
          <motion.h3
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-1 text-xl font-black text-slate-900"
          >
            New delivery booked.
          </motion.h3>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-2 max-w-[220px] text-[10px] font-medium leading-relaxed text-slate-500"
          >
            The customer gets confirmation. Your team gets the job details and payment status.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-5 flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-left"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                <Truck size={15} />
              </div>
              <div>
                <p className="text-[9px] font-black text-slate-800">Job #Q-1084</p>
                <p className="text-[8px] text-slate-400">Ready for operations</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-black text-emerald-600">PAID</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function HeroDashboardMockup() {
  const [stage, setStage] = useState(0);
  const [accent, setAccent] = useState(ACCENTS[0].value);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setStage((current) => (current + 1) % STAGES.length);
    }, STEP_MS);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <div className="relative w-full max-w-[570px] select-none">
      <motion.div
        animate={reduceMotion ? undefined : { opacity: [0.35, 0.7, 0.35], scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -inset-8 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent}2e 0%, transparent 66%)` }}
      />

      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#10131d] shadow-2xl shadow-black/50"
        style={{ boxShadow: `0 28px 90px rgba(0,0,0,.48), 0 0 55px ${accent}18` }}
      >
        <div className="flex items-center gap-2 border-b border-white/[0.07] bg-black/20 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="mx-2 flex min-w-0 flex-1 items-center gap-2 rounded-md border border-white/[0.07] bg-white/[0.05] px-3 py-1.5">
            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            <span className="truncate font-mono text-[9px] text-white/35">yourcompany.com/quote</span>
          </div>
          <div className="hidden items-center gap-1 text-[8px] font-black text-white/30 sm:flex">
            <Sparkles size={10} style={{ color: accent }} /> LIVE
          </div>
        </div>

        <div className="grid min-h-[390px] grid-cols-1 sm:grid-cols-[48%_52%]">
          <div className="relative z-10 border-b border-white/[0.06] bg-white p-4 sm:border-b-0 sm:border-r">
            <div className="mb-4 flex items-center justify-between">
              <Image
                src="/images/qalt-logo-main-2026.png"
                alt="Qalt"
                width={58}
                height={21}
                className="object-contain"
              />
              <span className="text-[7px] font-black uppercase tracking-[0.18em] text-slate-400">Powered by Qalt</span>
            </div>

            <StagePanel stage={stage} accent={accent} reduceMotion={reduceMotion} />
          </div>

          <div className="relative min-h-[300px] overflow-hidden bg-[#171b26] p-4 text-white sm:min-h-0">
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.14) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/35">Customer journey</p>
                  <p className="mt-0.5 text-xs font-black text-white">Quote to paid, on your site.</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[8px] font-black text-white/50">
                  Auto
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1.5">
                {STAGES.map((item, index) => {
                  const Icon = item.icon;
                  const active = index === stage;
                  const complete = index < stage;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      aria-label={`Show ${item.label} step`}
                      onClick={() => setStage(index)}
                      className="flex min-w-0 flex-1 flex-col items-center gap-1"
                    >
                      <div
                        className="flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300"
                        style={
                          active || complete
                            ? { backgroundColor: accent, borderColor: accent, color: "white" }
                            : { borderColor: "rgba(255,255,255,.1)", color: "rgba(255,255,255,.3)" }
                        }
                      >
                        {complete ? <Check size={11} /> : <Icon size={11} />}
                      </div>
                      <span className={`truncate text-[7px] font-black ${active ? "text-white" : "text-white/30"}`}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="relative mt-5 min-h-[190px] flex-1 overflow-hidden rounded-xl border border-white/[0.08] bg-[#202633]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_22%,rgba(255,255,255,.08),transparent_25%),radial-gradient(circle_at_80%_72%,rgba(255,255,255,.05),transparent_28%)]" />
                <div className="absolute left-[8%] top-[18%] h-[20%] w-[35%] rounded-[45%] bg-emerald-500/10 blur-[1px]" />
                <div className="absolute bottom-[-12%] right-[-8%] h-[48%] w-[46%] rounded-full bg-blue-400/10" />

                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 190" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    d="M 48 40 C 88 52, 80 93, 132 100 S 202 112, 250 150"
                    stroke="rgba(255,255,255,.09)"
                    strokeWidth="9"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <motion.path
                    d="M 48 40 C 88 52, 80 93, 132 100 S 202 112, 250 150"
                    stroke={accent}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={reduceMotion ? false : { pathLength: 0 }}
                    animate={{ pathLength: stage >= 1 ? 1 : 0.2 }}
                    transition={{ duration: reduceMotion ? 0 : 1.5, ease: "easeInOut" }}
                  />
                </svg>

                <motion.div
                  animate={
                    reduceMotion
                      ? undefined
                      : stage >= 1
                        ? { left: ["15%", "42%", "62%", "80%"], top: ["18%", "46%", "54%", "72%"] }
                        : { y: [0, -3, 0] }
                  }
                  transition={stage >= 1 ? { duration: 2.2, ease: "easeInOut" } : { duration: 2, repeat: Infinity }}
                  className="absolute left-[15%] top-[18%] z-20 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-slate-900 shadow-lg"
                  style={{ color: accent }}
                >
                  <Truck size={13} />
                </motion.div>

                <div className="absolute left-[11%] top-[12%] z-10 flex items-center gap-1.5 rounded-md border border-white/10 bg-black/30 px-2 py-1 backdrop-blur">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                  <span className="text-[7px] font-black text-white/70">Pickup</span>
                </div>
                <div className="absolute bottom-[12%] right-[7%] z-10 flex items-center gap-1.5 rounded-md border border-white/10 bg-black/30 px-2 py-1 backdrop-blur">
                  <div className="h-2 w-2 rounded-full bg-white" />
                  <span className="text-[7px] font-black text-white/70">Dropoff</span>
                </div>

                <AnimatePresence>
                  {stage === 3 && (
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.85, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute inset-x-5 top-1/2 z-30 -translate-y-1/2 rounded-xl border border-white/10 bg-[#111722]/95 p-4 text-center shadow-2xl backdrop-blur"
                    >
                      <CheckCircle2 size={25} className="mx-auto mb-2" style={{ color: accent }} />
                      <p className="text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: accent }}>
                        Booking confirmed
                      </p>
                      <p className="mt-1 text-xs font-black text-white">$97.60 collected</p>
                      <p className="mt-1 text-[8px] text-white/40">Job sent to your Qalt dashboard</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <Palette size={12} className="shrink-0 text-white/35" />
                  <div className="flex items-center gap-1.5">
                    {ACCENTS.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        aria-label={`Use ${color.name} accent`}
                        onClick={() => setAccent(color.value)}
                        className="relative h-4 w-4 rounded-full border border-white/20 transition-transform hover:scale-110"
                        style={{ backgroundColor: color.value }}
                      >
                        {accent === color.value && (
                          <span className="absolute inset-[-3px] rounded-full border border-white/60" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[7px] font-black text-white/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  YOUR BRAND
                </div>
              </div>
            </div>
          </div>
        </div>

        {!reduceMotion && (
          <div className="h-[3px] bg-white/5">
            <motion.div
              key={`${stage}-${accent}`}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: STEP_MS / 1000, ease: "linear" }}
              className="h-full"
              style={{ backgroundColor: accent }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
