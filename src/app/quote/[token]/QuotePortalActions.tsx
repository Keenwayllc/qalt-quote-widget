"use client";

import { useState } from "react";
import { Check, CreditCard, Loader2 } from "lucide-react";

export default function QuotePortalActions({
  token,
  canAccept,
  canPay,
}: {
  token: string;
  canAccept: boolean;
  canPay: boolean;
}) {
  const [loading, setLoading] = useState<"accept" | "pay" | null>(null);
  const [accepted, setAccepted] = useState(!canAccept);
  const [error, setError] = useState("");

  async function acceptQuote() {
    setLoading("accept");
    setError("");
    try {
      const res = await fetch(`/api/public/quote/${token}/accept`, { method: "POST" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Unable to accept quote");
      }
      setAccepted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to accept quote");
    } finally {
      setLoading(null);
    }
  }

  async function payQuote() {
    setLoading("pay");
    setError("");
    try {
      const res = await fetch(`/api/public/quote/${token}/pay`, { method: "POST" });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.checkoutUrl) throw new Error(body.error || "Unable to start payment");
      window.location.href = body.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start payment");
      setLoading(null);
    }
  }

  if (!canAccept && !canPay) return null;

  return (
    <div className="space-y-3">
      {canAccept && !accepted && (
        <button
          type="button"
          onClick={acceptQuote}
          disabled={loading !== null}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-900 transition hover:bg-slate-50 disabled:opacity-50"
        >
          {loading === "accept" ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
          Accept quote
        </button>
      )}

      {accepted && canAccept && (
        <div className="flex h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-bold text-emerald-800">
          <Check size={16} /> Quote accepted
        </div>
      )}

      {canPay && (
        <button
          type="button"
          onClick={payQuote}
          disabled={loading !== null}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#df1731] px-5 text-sm font-bold text-white transition hover:bg-[#c9142b] disabled:opacity-50"
        >
          {loading === "pay" ? <Loader2 size={16} className="animate-spin" /> : <CreditCard size={16} />}
          Pay & book
        </button>
      )}

      {error && <p className="text-center text-xs font-semibold text-rose-600">{error}</p>}
    </div>
  );
}
