"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { useState } from "react";

export default function SuccessBanner({ plan }: { plan: string }) {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.985 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 rounded-[18px] border border-emerald-200 bg-emerald-50/80 px-5 py-4 shadow-[0_14px_32px_-28px_rgba(5,150,105,.5)] dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:shadow-none"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
            <CheckCircle2 size={18} />
          </div>
          <p className="flex-1 text-sm font-semibold text-emerald-900 dark:text-emerald-300">
            You&apos;re now on the <span className="capitalize font-black">{plan.toLowerCase()}</span> plan. Your new features are ready.
          </p>
          <button
            onClick={() => setVisible(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-emerald-600 transition-colors hover:bg-emerald-100 hover:text-emerald-800 dark:hover:bg-emerald-500/15 dark:hover:text-emerald-200"
            aria-label="Dismiss"
          >
            <X size={15} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
