"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function CancelSubscriptionButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCancel = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Could not open billing portal. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="shrink-0 px-4 py-2 text-xs font-black text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all whitespace-nowrap"
      >
        Manage Plan
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100">
              <h2 className="font-black text-slate-900 text-base">Cancel your subscription?</h2>
            </div>
            <div className="px-6 py-6 space-y-4">
              <p className="text-slate-600 text-sm leading-relaxed">
                You&apos;ll be taken to the Stripe billing portal where you can cancel your subscription. Your account stays active on the <strong>free plan</strong> with up to 25 quotes/month. Your data is never deleted.
              </p>
              {error && <p className="text-xs font-bold text-red-600">{error}</p>}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => { setOpen(false); setError(""); }}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Keep my plan
                </button>
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-sm font-black hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <><Loader2 size={14} className="animate-spin" /> Opening...</> : "Go to Billing Portal"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
