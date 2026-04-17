"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Rocket, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChecklistStep {
  id: string;
  label: string;
  description: string;
  href: string;
  cta: string;
  done: boolean;
}

interface Props {
  steps: ChecklistStep[];
}

export default function OnboardingChecklist({ steps }: Props) {
  const doneCount = steps.filter((s) => s.done).length;
  const allDone = doneCount === steps.length;
  const pct = Math.round((doneCount / steps.length) * 100);
  const isNew = doneCount === 0;

  const [collapsed, setCollapsed] = useState(false);

  if (allDone) return null;

  // First step not yet done — highlight it
  const nextStep = steps.find((s) => !s.done);

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative rounded-3xl overflow-hidden border shadow-xl ${
        isNew
          ? "bg-linear-to-br from-slate-900 to-slate-800 border-slate-700 shadow-slate-900/40"
          : "bg-white border-slate-200 shadow-slate-200/40"
      }`}
    >
      {/* Glow for fresh users */}
      {isNew && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-red-600/20 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-800/10 rounded-full blur-[60px]" />
        </div>
      )}

      {/* Header */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className={`relative w-full flex items-center justify-between px-6 py-5 transition-colors group ${
          isNew ? "hover:bg-white/5" : "hover:bg-slate-50/60"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className={`relative w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg shrink-0 ${
            isNew ? "bg-red-600 shadow-red-900/40" : "bg-red-600 shadow-red-200"
          }`}>
            <Rocket size={18} className="text-white" />
            {isNew && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-slate-900 animate-pulse" />
            )}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <p className={`font-black tracking-tight text-base ${isNew ? "text-white" : "text-slate-900"}`}>
                {isNew ? "Welcome! Let's get you set up 👋" : "Get started with Qalt"}
              </p>
              {isNew && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[10px] font-black rounded-full uppercase tracking-widest">
                  <Sparkles size={8} />
                  Start here
                </span>
              )}
            </div>
            <p className={`text-xs font-medium mt-0.5 ${isNew ? "text-slate-400" : "text-slate-500"}`}>
              {doneCount} of {steps.length} steps complete
              {isNew && nextStep && (
                <span className="ml-2 text-amber-400 font-bold">· Next: {nextStep.label}</span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={`hidden sm:block w-32 h-2 rounded-full overflow-hidden ${isNew ? "bg-slate-700" : "bg-slate-100"}`}>
            <motion.div
              className="h-full bg-red-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            />
          </div>
          <span className={`text-xs font-black tabular-nums w-8 text-right ${isNew ? "text-slate-400" : "text-slate-400"}`}>
            {pct}%
          </span>
          {collapsed
            ? <ChevronDown size={18} className={`${isNew ? "text-slate-500" : "text-slate-400"} group-hover:text-slate-300 transition-colors`} />
            : <ChevronUp size={18} className={`${isNew ? "text-slate-500" : "text-slate-400"} group-hover:text-slate-300 transition-colors`} />
          }
        </div>
      </button>

      {/* Steps */}
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={`border-t divide-y ${
              isNew ? "border-slate-700/60 divide-slate-700/40" : "border-slate-100 divide-slate-50"
            }`}>
              {steps.map((step, i) => {
                const isNext = step.id === nextStep?.id;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className={`flex items-center gap-4 px-6 py-4 transition-colors ${
                      step.done
                        ? isNew ? "bg-white/5" : "bg-slate-50/40"
                        : isNew
                          ? isNext ? "bg-red-900/20" : "hover:bg-white/5"
                          : "hover:bg-red-50/30"
                    }`}
                  >
                    {/* Icon */}
                    <div className="shrink-0 relative">
                      {step.done ? (
                        <CheckCircle2 size={22} className="text-emerald-500" />
                      ) : (
                        <div className="relative">
                          <Circle size={22} className={isNew ? "text-slate-600" : "text-slate-300"} />
                          {isNext && (
                            <span className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-60" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm ${
                        step.done
                          ? "line-through text-slate-500"
                          : isNew ? "text-white" : "text-slate-900"
                      }`}>
                        {step.label}
                        {isNext && !step.done && (
                          <span className="ml-2 text-[10px] font-black text-amber-400 uppercase tracking-widest">← Do this first</span>
                        )}
                      </p>
                      {!step.done && (
                        <p className={`text-xs font-medium mt-0.5 leading-relaxed ${isNew ? "text-slate-400" : "text-slate-500"}`}>
                          {step.description}
                        </p>
                      )}
                    </div>

                    {/* CTA */}
                    {!step.done && (
                      <Link
                        href={step.href}
                        className={`shrink-0 px-4 py-2 text-xs font-bold rounded-xl transition-all active:scale-[0.97] whitespace-nowrap ${
                          isNext
                            ? "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-900/30"
                            : isNew
                              ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                              : "bg-slate-900 text-white hover:bg-slate-800 shadow-sm shadow-slate-200"
                        }`}
                      >
                        {step.cta}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {isNew && (
              <div className="px-6 py-4 border-t border-slate-700/40">
                <p className="text-xs text-slate-500 font-medium text-center">
                  Complete these steps to go live — it takes less than 5 minutes.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
