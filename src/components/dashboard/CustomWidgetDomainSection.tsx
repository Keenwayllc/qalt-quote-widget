"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Copy, ExternalLink, Globe2, Loader2, ShieldCheck, Trash2 } from "lucide-react";

interface DomainState {
  eligible: boolean;
  domain: string | null;
  verified: boolean;
  hostingConfigured: boolean;
  dns: { type: string; name: string; value: string } | null;
}

export default function CustomWidgetDomainSection() {
  const [state, setState] = useState<DomainState | null>(null);
  const [domain, setDomain] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    const res = await fetch("/api/dashboard/widget-domain", { cache: "no-store" });
    const data = await res.json();
    if (res.ok) {
      setState(data);
      setDomain(data.domain || "");
    }
  };

  useEffect(() => { void load(); }, []);

  const connect = async () => {
    setBusy(true); setError(""); setMessage("");
    try {
      const res = await fetch("/api/dashboard/widget-domain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain, action: "connect" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not connect domain.");
      setMessage(data.verified ? "Domain connected and verified." : "Domain added. Qalt generated the DNS record below. Add that record at your domain provider, then return here to verify it.");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not connect domain.");
    } finally { setBusy(false); }
  };

  const verify = async () => {
    setBusy(true); setError(""); setMessage("");
    try {
      const res = await fetch("/api/dashboard/widget-domain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed.");
      setMessage(data.verified ? "Domain verified. Your branded widget domain is live." : "DNS is not verified yet. Check the record below and try again shortly.");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Verification failed.");
    } finally { setBusy(false); }
  };

  const remove = async () => {
    setBusy(true); setError(""); setMessage("");
    try {
      const res = await fetch("/api/dashboard/widget-domain", { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not remove domain.");
      setMessage("Custom widget domain removed.");
      setDomain("");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not remove domain.");
    } finally { setBusy(false); }
  };

  if (!state) {
    return <div className="h-40 border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-[#1e1e1e] flex items-center justify-center"><Loader2 className="animate-spin text-slate-400" size={20} /></div>;
  }

  return (
    <section className="bg-white dark:bg-[#1e1e1e] border border-slate-200 dark:border-white/[0.06] p-6 space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Globe2 size={18} className="text-red-600" />
            <h2 className="text-base font-black text-slate-900 dark:text-white">White-Label Widget Domain</h2>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            Serve your Qalt quote form from your own branded subdomain, such as <strong className="text-slate-700 dark:text-slate-200">quote.yourcompany.com</strong>.
          </p>
        </div>
        <span className="shrink-0 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-slate-100 dark:bg-white/[0.05] text-slate-500 dark:text-slate-400">Pro / Enterprise</span>
      </div>

      {!state.eligible ? (
        <div className="border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-4 text-sm text-amber-800 dark:text-amber-300">
          Upgrade to Pro or Enterprise to use a branded customer-facing widget domain.
        </div>
      ) : (
        <>
          <div className="border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.025] p-4">
            <h3 className="text-sm font-black text-slate-900 dark:text-white">How to connect your branded domain</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Start here in Qalt. You do not need to change anything at your domain provider until Qalt generates the DNS record for you.
            </p>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 dark:bg-white text-xs font-black text-white dark:text-slate-900">1</span><p><strong>Enter the branded address you want to use in Qalt</strong>, for example <code className="text-xs">quote.yourcompany.com</code>, then click <strong>Connect Domain</strong>. This tells Qalt which address to prepare. Do not add a DNS record yet.</p></div>
              <div className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 dark:bg-white text-xs font-black text-white dark:text-slate-900">2</span><p><strong>Qalt will generate the exact DNS record for you.</strong> After you click Connect Domain, a DNS Setup box appears below with the required <strong>Type</strong>, <strong>Name / Host</strong>, and <strong>Target</strong>. Use those exact values.</p></div>
              <div className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 dark:bg-white text-xs font-black text-white dark:text-slate-900">3</span><p><strong>Now open your domain provider's DNS settings</strong> such as GoDaddy, Cloudflare, Namecheap, or Squarespace. Add a new record using the values Qalt generated, save it, and leave TTL at the provider's default unless you have a reason to change it.</p></div>
              <div className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 dark:bg-white text-xs font-black text-white dark:text-slate-900">4</span><p><strong>Return to Qalt and click Verify DNS.</strong> DNS may update within minutes, but some providers can take longer. Once verified, Qalt marks the branded address live and customers can use it.</p></div>
            </div>
            <div className="mt-4 border-t border-slate-200 dark:border-white/[0.06] pt-3 text-xs text-slate-500 dark:text-slate-400">
              <strong>GoDaddy example:</strong> after Qalt shows the DNS values, click <strong>Add New Record</strong> in GoDaddy DNS. Choose <strong>CNAME</strong>. For an address such as <code>quote.yourcompany.com</code>, the <strong>Name</strong> is usually <code>quote</code>. Put the exact Qalt <strong>Target</strong> into GoDaddy's <strong>Value / Points to</strong> field, then save.
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Custom subdomain</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="quote.yourcompany.com"
                disabled={busy || state.verified}
                className="flex-1 px-4 py-3 bg-white dark:bg-[#151515] border border-slate-300 dark:border-white/[0.08] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              {!state.verified && (
                <button type="button" onClick={connect} disabled={busy || !domain.trim()} className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-sm disabled:opacity-50">
                  {busy ? "Working..." : state.domain ? "Update Domain" : "Connect Domain"}
                </button>
              )}
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">Enter only the hostname. Do not include https:// or a page path.</p>
          </div>

          {state.domain && state.dns && !state.verified && (
            <div className="border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.025] p-4 space-y-3">
              <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-slate-500" /><h3 className="text-sm font-black text-slate-900 dark:text-white">DNS setup</h3></div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Qalt has prepared the record below. Now add this record at the company that manages your domain's DNS, exactly as shown.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                {[['Type', state.dns.type], ['Name / Host', state.dns.name], ['Target', state.dns.value]].map(([label, value]) => (
                  <div key={label} className="bg-white dark:bg-[#151515] border border-slate-200 dark:border-white/[0.06] p-3">
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">{label}</p>
                    <div className="mt-1 flex items-center gap-2"><code className="text-xs text-slate-800 dark:text-slate-200 break-all">{value}</code><button type="button" onClick={() => navigator.clipboard.writeText(value)} className="ml-auto text-slate-400 hover:text-slate-700 dark:hover:text-white" title={`Copy ${label}`}><Copy size={13} /></button></div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">For providers such as GoDaddy, the Name / Host field normally uses only the subdomain portion. Example: for <code>quote.yourcompany.com</code>, enter <code>quote</code>. Use the Target exactly as Qalt shows it.</p>
              <button type="button" onClick={verify} disabled={busy} className="px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-sm disabled:opacity-50">{busy ? "Checking..." : "Verify DNS"}</button>
            </div>
          )}

          {state.verified && state.domain && (
            <div className="border border-emerald-200 dark:border-emerald-500/25 bg-emerald-50 dark:bg-emerald-500/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={19} className="mt-0.5 text-emerald-600 dark:text-emerald-400" />
                <div><p className="font-black text-emerald-900 dark:text-emerald-300">Branded domain is live</p><p className="text-sm text-emerald-800/80 dark:text-emerald-300/80">Customers can open your quote form at <strong>{state.domain}</strong>.</p></div>
              </div>
              <a href={`https://${state.domain}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-black text-emerald-800 dark:text-emerald-300">Open Widget <ExternalLink size={14} /></a>
            </div>
          )}

          {state.domain && (
            <button type="button" onClick={remove} disabled={busy} className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-rose-600 transition-colors"><Trash2 size={13} /> Remove custom domain</button>
          )}
        </>
      )}

      {message && <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{message}</div>}
      {error && <div className="text-sm font-semibold text-rose-600 dark:text-rose-400">{error}</div>}
      {state.eligible && !state.hostingConfigured && <p className="text-xs text-amber-600 dark:text-amber-400">Custom-domain automation is installed in Qalt, but the production Vercel API credential still needs to be configured before merchants can connect domains.</p>}
    </section>
  );
}
