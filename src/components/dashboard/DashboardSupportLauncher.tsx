"use client";

import { useState } from "react";
import { CircleHelp } from "lucide-react";
import SupportModal from "@/components/shared/SupportModal";

export default function DashboardSupportLauncher() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-4 z-30 inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/95 px-3 text-sm font-bold text-slate-700 shadow-lg shadow-slate-900/5 backdrop-blur transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-[#171717]/95 dark:text-slate-200 dark:shadow-black/30 dark:hover:border-red-500/40 dark:hover:bg-red-500/10 dark:hover:text-red-300 dark:focus-visible:ring-offset-[#0a0a0a] sm:right-6 sm:top-5"
        aria-label="Open Qalt support"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        title="Qalt Support"
      >
        <CircleHelp size={18} aria-hidden="true" />
        <span className="hidden sm:inline">Help</span>
      </button>

      <SupportModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
