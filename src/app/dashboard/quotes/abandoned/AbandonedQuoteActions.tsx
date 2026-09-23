"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Mail, Trash2 } from "lucide-react";

export default function AbandonedQuoteActions({
  id,
  email,
}: {
  id: string;
  email: string | null;
}) {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const sendRecovery = async () => {
    if (!email || sending) return;
    setSending(true);
    setError("");
    setSent(false);
    try {
      const response = await fetch(`/api/dashboard/quotes/abandoned/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send_recovery" }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Could not send recovery email");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send recovery email");
    } finally {
      setSending(false);
    }
  };

  const deleteLead = async () => {
    if (deleting) return;
    if (!window.confirm("Delete this abandoned quote? This cannot be undone.")) return;

    setDeleting(true);
    setError("");
    try {
      const response = await fetch(`/api/dashboard/quotes/abandoned/${id}`, {
        method: "DELETE",
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Could not delete abandoned quote");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete abandoned quote");
      setDeleting(false);
    }
  };

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 lg:justify-end">
      {email ? (
        <button
          type="button"
          onClick={sendRecovery}
          disabled={sending}
          className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-3.5 py-2 text-xs font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? <Loader2 size={14} className="animate-spin" /> : sent ? <Check size={14} /> : <Mail size={14} />}
          {sending ? "Sending..." : sent ? "Recovery sent" : "Send recovery email"}
        </button>
      ) : (
        <span className="text-xs font-bold text-slate-400">No email available</span>
      )}

      <button
        type="button"
        onClick={deleteLead}
        disabled={deleting}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-black text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-red-950/30 dark:hover:text-red-300"
      >
        {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
        {deleting ? "Deleting..." : "Delete"}
      </button>

      {error && <div className="basis-full text-xs font-bold text-red-600">{error}</div>}
    </div>
  );
}
