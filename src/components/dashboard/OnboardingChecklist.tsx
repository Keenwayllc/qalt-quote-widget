"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Rocket } from "lucide-react";
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
  const [collapsed, setCollapsed] = useState(false);

  const doneCount = steps.filter((s) => s.done).length;
  const allDone = doneCount === steps.length;
  const pct = Math.round((doneCount / steps.length) * 100);

  // Don't render if fully complete
  if (allDone) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/40 overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="w-full flex items-center justify-between px-6 py-5 hover:bg-slate-50/60 transition-colors group"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200 shrink-0">
            <Rocket size={18} className="text-white" />
          </div>
          <div className="text-left">
            <p className="font-black text-slate-900 tracking-tight text-base">
              Get started with Qalt
            </p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {doneCount} of {steps.length} steps complete
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Progress bar */}
          <div className="hidden sm:block w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            />
          </div>
          <span className="text-xs font-black text-slate-400 tabular-nums w-8 text-right">{pct}%</span>
          {collapsed ? (
            <ChevronDown size={18} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
          ) : (
            <ChevronUp size={18} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
          )}
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
            <div className="border-t border-slate-100 divide-y divide-slate-50">
              {steps.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className={`flex items-center gap-4 px-6 py-4 transition-colors ${step.done ? "bg-slate-50/40" : "hover:bg-blue-50/30"}`}
                >
                  {/* Icon */}
                  <div className="shrink-0">
                    {step.done ? (
                      <CheckCircle2 size={22} className="text-emerald-500" />
                    ) : (
                      <Circle size={22} className="text-slate-300" />
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm ${step.done ? "line-through text-slate-400" : "text-slate-900"}`}>
                      {step.label}
                    </p>
                    {!step.done && (
                      <p className="text-xs text-slate-500 font-medium mt-0.5 leading-relaxed">
                        {step.description}
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  {!step.done && (
                    <Link
                      href={step.href}
                      className="shrink-0 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 hover:scale-[1.03] active:scale-[0.97] transition-all shadow-sm shadow-blue-200 whitespace-nowrap"
                    >
                      {step.cta}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
