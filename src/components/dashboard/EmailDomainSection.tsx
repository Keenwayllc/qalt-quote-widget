"use client";

import { useEffect, useState } from "react";
import {
  Mail, Globe, CheckCircle2, AlertCircle, RefreshCw, Trash2, Copy, Lock,
} from "lucide-react";

interface DnsRecord {
  record?: string;
  name?: string;
  type?: string;
  value?: string;
  ttl?: string | number;
  priority?: number;
  status?: string;
}

interface DomainState {
  enabled: boolean;
  domain: string | null;
  fromName: string | null;
  verified: boolean;
  dnsRecords: DnsRecord[] | null;
  hasResendDomain: boolean;
}

function StatusBadge({ verified }: { verified: boolean }) {
  return verified ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
      <CheckCircle2 size={10} /> Verified
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
      Pending DNS
    </span>
  );
}

function CopyCell({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
    >
      <Copy size={11} /> {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function EmailDomainSection() {
  const [state, setState] = useState<DomainState | null>(null);
  const [loading, setLoading] = useState(true);
  const [domainInput, setDomainInput] = useState("");
  const [fromNameInput, setFromNameInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const refresh = async () => {
    const res = await fetch("/api/dashboard/email-domain");
    if (!res.ok) {
      setLoading(false);
      return;
    }
    const data = await res.json();
    setState(data);
    setDomainInput(data.domain ?? "");
    setFromNameInput(data.fromName ?? "");
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSubmitting(true);
    const res = await fetch("/api/dashboard/email-domain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain: domainInput.trim(), fromName: fromNameInput.trim() }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (res.ok) {
      setMessage({ type: "success", text: "Domain added. Add the DNS records below to your provider, then click Verify." });
      await refresh();
    } else {
      setMessage({ type: "error", text: data.error || "Could not add domain." });
    }
  };

  const handleVerify = async () => {
    setMessage(null);
    setVerifying(true);
    const res = await fetch("/api/dashboard/email-domain/verify", { method: "POST" });
    const data = await res.json();
    setVerifying(false);
    if (res.ok) {
      if (data.verified) {
        setMessage({ type: "success", text: "Domain verified. Customer emails will now send from your domain." });
      } else {
        setMessage({ type: "error", text: `Not yet verified (${data.status}). DNS changes can take up to 24 hours to propagate.` });
      }
      await refresh();
    } else {
      setMessage({ type: "error", text: data.error || "Verification failed." });
    }
  };

  const handleRemove = async () => {
    if (!confirm("Remove this domain? Emails will go back to the default Qalt sender.")) return;
    setMessage(null);
    setRemoving(true);
    const res = await fetch("/api/dashboard/email-domain", { method: "DELETE" });
    setRemoving(false);
    if (res.ok) {
      setMessage({ type: "success", text: "Domain removed." });
      setDomainInput("");
      setFromNameInput("");
      await refresh();
    } else {
      const data = await res.json();
      setMessage({ type: "error", text: data.error || "Could not remove domain." });
    }
  };

  if (loading) {
    return (
      <section className="bg-white dark:bg-[#1e1e1e] rounded-none border border-slate-200 dark:border-white/[0.06] shadow-sm dark:shadow-none p-6">
        <div className="h-6 w-48 bg-slate-100 dark:bg-white/5 animate-pulse rounded" />
      </section>
    );
  }

  if (!state) return null;

  if (!state.enabled) {
    return (
      <section className="bg-white dark:bg-[#1e1e1e] rounded-none border border-slate-200 dark:border-white/[0.06] shadow-sm dark:shadow-none p-6">
        <div className="flex items-start gap-3">
          <Lock size={18} className="text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
          <div>
            <h2 className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Custom Email Domain</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              Send customer confirmation emails from your own domain. Available on Pro and Enterprise plans.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const records: DnsRecord[] = Array.isArray(state.dnsRecords) ? state.dnsRecords : [];

  return (
    <section className="bg-white dark:bg-[#1e1e1e] rounded-none border border-slate-200 dark:border-white/[0.06] shadow-sm dark:shadow-none p-6 space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Custom Email Domain</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Send customer quote emails from your own domain instead of <code className="text-xs">qalt.site</code>.
          </p>
        </div>
        {state.domain && <StatusBadge verified={state.verified} />}
      </div>

      <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        <div className="sm:col-span-3">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Subdomain
          </label>
          <div className="relative">
            <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value.toLowerCase().trim())}
              placeholder="e.g. mail.yourcompany.com"
              required
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 dark:border-white/[0.06] rounded-none text-sm text-slate-900 dark:text-white bg-white dark:bg-[#161616] placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
            Use a subdomain you control (e.g. <code>mail.yourcompany.com</code>), not your root domain.
          </p>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Sender Name
          </label>
          <div className="relative">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={fromNameInput}
              onChange={(e) => setFromNameInput(e.target.value)}
              placeholder="Your Company"
              maxLength={60}
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 dark:border-white/[0.06] rounded-none text-sm text-slate-900 dark:text-white bg-white dark:bg-[#161616] placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
        <div className="sm:col-span-5 flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-none disabled:opacity-60 transition-colors"
          >
            {submitting ? "Saving…" : state.domain ? "Update Domain" : "Add Domain"}
          </button>
          {state.domain && (
            <>
              <button
                type="button"
                onClick={handleVerify}
                disabled={verifying}
                className="px-4 py-2 bg-slate-800 dark:bg-white/10 hover:bg-slate-900 dark:hover:bg-white/15 text-white text-sm font-bold rounded-none disabled:opacity-60 transition-colors flex items-center gap-2"
              >
                <RefreshCw size={13} className={verifying ? "animate-spin" : ""} />
                {verifying ? "Checking…" : "Verify DNS"}
              </button>
              <button
                type="button"
                onClick={handleRemove}
                disabled={removing}
                className="px-4 py-2 border border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 text-sm font-bold rounded-none disabled:opacity-60 transition-colors flex items-center gap-2"
              >
                <Trash2 size={13} />
                {removing ? "Removing…" : "Remove"}
              </button>
            </>
          )}
        </div>
      </form>

      {message && (
        <div
          className={`flex items-start gap-2 text-sm rounded-none px-4 py-3 border ${
            message.type === "success"
              ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/30"
              : "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/30"
          }`}
        >
          {message.type === "success" ? <CheckCircle2 size={15} className="mt-0.5" /> : <AlertCircle size={15} className="mt-0.5" />}
          <span>{message.text}</span>
        </div>
      )}

      {state.domain && records.length > 0 && (
        <div>
          <h3 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">
            DNS Records
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Add these records at your DNS provider (Cloudflare, GoDaddy, Namecheap, etc.) to verify your domain.
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-white/[0.06]">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 dark:bg-white/5">
                <tr className="text-left">
                  <th className="px-3 py-2 font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Type</th>
                  <th className="px-3 py-2 font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name</th>
                  <th className="px-3 py-2 font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Value</th>
                  <th className="px-3 py-2 font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec, i) => (
                  <tr key={i} className="border-t border-slate-100 dark:border-white/[0.06] align-top">
                    <td className="px-3 py-2 font-mono font-bold text-slate-700 dark:text-slate-200">{rec.type}</td>
                    <td className="px-3 py-2 font-mono text-slate-700 dark:text-slate-200 break-all">
                      <div className="flex items-center gap-2">
                        <span>{rec.name}</span>
                        {rec.name && <CopyCell text={rec.name} />}
                      </div>
                    </td>
                    <td className="px-3 py-2 font-mono text-slate-700 dark:text-slate-200 break-all max-w-md">
                      <div className="flex items-start gap-2">
                        <span className="break-all">{rec.value}</span>
                        {rec.value && <CopyCell text={rec.value} />}
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                          rec.status === "verified"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {rec.status || "pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
