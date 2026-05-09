"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const DURATION = 8000;

function WelcomeToastInner({ companyName }: { companyName?: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (searchParams.get("welcome") !== "1") return;

    // Clean the param from URL immediately so refresh doesn't re-trigger
    const params = new URLSearchParams(searchParams.toString());
    params.delete("welcome");
    const newUrl = params.size > 0 ? `${pathname}?${params}` : pathname;
    router.replace(newUrl, { scroll: false });

    setVisible(true);

    // Animate the progress bar
    const tick = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const remaining = Math.max(0, 100 - (elapsed / DURATION) * 100);
      setProgress(remaining);
      if (elapsed < DURATION) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    timerRef.current = setTimeout(() => setVisible(false), DURATION);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const dismiss = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ type: "spring", damping: 24, stiffness: 280 }}
          className="fixed bottom-6 right-6 z-[100] w-full max-w-sm"
        >
          <div className="relative bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl shadow-slate-300/40 dark:shadow-black/60 overflow-hidden">
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-slate-100 dark:bg-white/5">
              <div
                className="h-full bg-red-500 transition-none"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="p-5 pt-6">
              {/* Header row */}
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-100 dark:border-emerald-500/20">
                  <CheckCircle2 size={20} className="text-emerald-500" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <p className="font-black text-slate-900 dark:text-white text-sm tracking-tight">
                      Account verified!
                    </p>
                    <Sparkles size={12} className="text-amber-400 shrink-0" />
                  </div>
                  <p className="text-xs font-medium text-slate-500 dark:text-zinc-400 leading-relaxed">
                    {companyName ? (
                      <>Welcome, <span className="font-bold text-slate-700 dark:text-zinc-200">{companyName}</span>. Your 14-day free trial has started.</>
                    ) : (
                      "Your 14-day free trial has started."
                    )}
                  </p>
                </div>

                <button
                  onClick={dismiss}
                  className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-slate-300 dark:text-zinc-600 hover:text-slate-500 dark:hover:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  aria-label="Dismiss"
                >
                  <X size={14} />
                </button>
              </div>

              {/* CTA */}
              <div className="mt-4 flex items-center gap-2">
                <Link
                  href="/dashboard/widget"
                  onClick={dismiss}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-xl transition-colors active:scale-95"
                >
                  Set up your widget
                  <ArrowRight size={12} />
                </Link>
                <button
                  onClick={dismiss}
                  className="px-4 py-2.5 text-xs font-bold text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function WelcomeToast({ companyName }: { companyName?: string }) {
  return (
    <Suspense fallback={null}>
      <WelcomeToastInner companyName={companyName} />
    </Suspense>
  );
}
