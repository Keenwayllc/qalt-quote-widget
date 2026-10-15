"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import type { ProfitEstimate } from "@/lib/merchant-intelligence";
import ProfitBreakdown from "@/components/intelligence/ProfitBreakdown";

type State = { status: "loading" } | { status: "ready"; estimate: ProfitEstimate; costsReady: boolean } | { status: "error" };

/** Merchant-only profit estimate inside the quote drawer, loaded on open. */
export default function QuoteProfitCard({ quoteId }: { quoteId: string }) {
  const [state, setState] = useState<State>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/dashboard/intelligence/quote/${encodeURIComponent(quoteId)}`, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error();
        const body = await res.json();
        setState({ status: "ready", estimate: body.estimate, costsReady: body.costsReady });
      })
      .catch((error) => {
        if (error?.name !== "AbortError") setState({ status: "error" });
      });
    return () => controller.abort();
  }, [quoteId, attempt]);

  return (
    <div className="bg-slate-50 dark:bg-[#1c1c1c] rounded-2xl p-5 mt-5 border border-transparent dark:border-white/6">
      <p className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-3">Estimated profit · private</p>
      {state.status === "loading" && (
        <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400" role="status">
          <Loader2 size={14} className="animate-spin" /> Estimating…
        </p>
      )}
      {state.status === "error" && (
        <p className="text-sm text-slate-500 dark:text-zinc-400" role="alert">
          Could not load the estimate.{" "}
          <button
            type="button"
            className="font-bold text-red-700 dark:text-red-400 underline"
            onClick={() => {
              setState({ status: "loading" });
              setAttempt((n) => n + 1);
            }}
          >
            Try again
          </button>
        </p>
      )}
      {state.status === "ready" &&
        (state.costsReady ? (
          <ProfitBreakdown estimate={state.estimate} />
        ) : (
          <p className="text-sm text-slate-500 dark:text-zinc-400">Profit estimates are being set up and will appear here shortly.</p>
        ))}
    </div>
  );
}
