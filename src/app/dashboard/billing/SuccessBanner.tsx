"use client";

import { CheckCircle, X } from "lucide-react";
import { useState } from "react";

export default function SuccessBanner({ plan }: { plan: string }) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="mb-6 flex items-center gap-3 px-5 py-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
      <CheckCircle size={20} className="text-emerald-600 shrink-0" />
      <p className="flex-1 text-sm font-semibold text-emerald-800">
        You&apos;re now on the <span className="capitalize">{plan.toLowerCase()}</span> plan. Welcome aboard!
      </p>
      <button onClick={() => setVisible(false)} className="text-emerald-500 hover:text-emerald-700 transition-colors">
        <X size={16} />
      </button>
    </div>
  );
}
