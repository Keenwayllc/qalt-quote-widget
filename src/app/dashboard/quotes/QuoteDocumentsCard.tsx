"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle2, Eye, FileText, Loader2, Mail, Receipt } from "lucide-react";

type DocumentDto = {
  id: string;
  type: string;
  number: string;
  status: string;
  issuedAt: string | null;
  paidAt: string | null;
  lastEmailedAt: string | null;
  lastViewedAt: string | null;
};

function formatDate(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function formatDateTime(value: string | null) {
  if (!value) return "Never";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Never";
  return date.toLocaleString();
}

export default function QuoteDocumentsCard({ quoteId }: { quoteId: string }) {
  const [documents, setDocuments] = useState<DocumentDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState<string | null>(null);
  const [message, setMessage] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  const loadDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/dashboard/quotes/${quoteId}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Could not load documents");
      const data = (await res.json()) as { documents?: DocumentDto[] };
      setDocuments(Array.isArray(data.documents) ? data.documents : []);
    } catch {
      setMessage({ kind: "error", text: "Could not load customer documents." });
    } finally {
      setLoading(false);
    }
  }, [quoteId]);

  useEffect(() => {
    setDocuments([]);
    setMessage(null);
    void loadDocuments();
  }, [loadDocuments]);

  const quoteDocument = useMemo(() => documents.find((doc) => doc.type === "QUOTE") ?? null, [documents]);
  const invoiceDocument = useMemo(() => documents.find((doc) => doc.type === "INVOICE") ?? null, [documents]);

  const runAction = async (nextAction: "issue_quote" | "view_quote" | "email_quote" | "view_invoice") => {
    setAction(nextAction);
    setMessage(null);
    try {
      const res = await fetch(`/api/dashboard/quotes/${quoteId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: nextAction }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) throw new Error(data.error || "Document action failed");

      if ((nextAction === "view_quote" || nextAction === "view_invoice") && data.url) {
        window.open(data.url, "_blank", "noopener,noreferrer");
      }
      if (nextAction === "email_quote") {
        setMessage({ kind: "success", text: "Quote email sent." });
      }
      await loadDocuments();
    } catch (error) {
      setMessage({
        kind: "error",
        text: error instanceof Error ? error.message : "Document action failed.",
      });
    } finally {
      setAction(null);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-[#1c1c1c] rounded-2xl p-5 border border-transparent dark:border-white/6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <p className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest">Customer Documents</p>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Issued records for this quote</p>
        </div>
        <FileText size={18} className="text-red-500" />
      </div>

      {loading ? (
        <div className="flex items-center gap-2 py-3 text-sm font-bold text-slate-400 dark:text-zinc-500">
          <Loader2 size={15} className="animate-spin" /> Loading documents…
        </div>
      ) : (
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-[#151515] p-4">
            {quoteDocument ? (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">Quote</p>
                    <p className="font-black text-slate-900 dark:text-white mt-1 break-all">{quoteDocument.number}</p>
                    <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 mt-1">
                      {quoteDocument.issuedAt ? `Issued ${formatDate(quoteDocument.issuedAt)}` : "Issued"}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-zinc-500 mt-1">Last emailed: {formatDateTime(quoteDocument.lastEmailedAt)}</p>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 size={11} /> {quoteDocument.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button type="button" disabled={action !== null} onClick={() => void runAction("view_quote")} className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-white/8 bg-white dark:bg-white/5 px-3 py-2.5 text-xs font-black text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-50 transition-colors">
                    {action === "view_quote" ? <Loader2 size={13} className="animate-spin" /> : <Eye size={13} />} View PDF
                  </button>
                  <button type="button" disabled={action !== null} onClick={() => void runAction("email_quote")} className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-red-600 px-3 py-2.5 text-xs font-black text-white hover:bg-red-700 disabled:opacity-50 transition-colors">
                    {action === "email_quote" ? <Loader2 size={13} className="animate-spin" /> : <Mail size={13} />} {quoteDocument.lastEmailedAt ? "Resend Quote" : "Email Quote"}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500">Quote</p>
                  <p className="text-sm font-bold text-slate-600 dark:text-zinc-300 mt-1">Not issued yet</p>
                </div>
                <button type="button" disabled={action !== null} onClick={() => void runAction("issue_quote")} className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 dark:bg-zinc-700 px-3 py-2.5 text-xs font-black text-white hover:bg-slate-700 disabled:opacity-50 transition-colors">
                  {action === "issue_quote" ? <Loader2 size={13} className="animate-spin" /> : <FileText size={13} />} Issue Quote
                </button>
              </div>
            )}
          </div>

          {invoiceDocument && (
            <div className="rounded-xl border border-emerald-200/70 dark:border-emerald-500/20 bg-emerald-50/60 dark:bg-emerald-500/5 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400"><Receipt size={13} /><p className="text-[10px] font-black uppercase tracking-widest">Paid Invoice</p></div>
                  <p className="font-black text-slate-900 dark:text-white mt-1 break-all">{invoiceDocument.number}</p>
                  <p className="text-xs font-bold text-slate-500 dark:text-zinc-400 mt-1">{invoiceDocument.paidAt ? `Paid ${formatDate(invoiceDocument.paidAt)}` : "Paid"}</p>
                </div>
                <span className="shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">PAID</span>
              </div>
              <button type="button" disabled={action !== null} onClick={() => void runAction("view_invoice")} className="mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-black text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors">
                {action === "view_invoice" ? <Loader2 size={13} className="animate-spin" /> : <Eye size={13} />} View Paid Invoice
              </button>
            </div>
          )}
        </div>
      )}

      {message && <p className={`mt-3 text-xs font-bold ${message.kind === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{message.text}</p>}
    </div>
  );
}
