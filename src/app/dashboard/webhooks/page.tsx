"use client";

import { useEffect, useState } from "react";
import {
  Webhook,
  Plus,
  Trash2,
  Copy,
  Check,
  Zap,
  ChevronDown,
  ChevronUp,
  Lock,
  ExternalLink,
  ToggleLeft,
  ToggleRight,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WebhookRow {
  id: string;
  url: string;
  events: string[];
  secret: string;
  enabled: boolean;
  createdAt: string;
}

const ALL_EVENTS = [
  { value: "quote.created", label: "quote.created", desc: "Fired when a customer submits a quote via the widget" },
  { value: "quote.status_changed", label: "quote.status_changed", desc: "Fired when you update a quote status (Confirmed, Won, Lost, Paid…)" },
];

const EXAMPLE_PAYLOAD = `{
  "event": "quote.created",
  "timestamp": "2026-04-11T14:32:00.000Z",
  "data": {
    "quote": {
      "id": "clxyz123",
      "customerName": "Jane Smith",
      "customerEmail": "jane@example.com",
      "pickupZip": "10001",
      "dropoffZip": "10002",
      "distanceMiles": 8.4,
      "estimatedPrice": 65.00,
      "status": "PENDING",
      "serviceType": "Standard Delivery",
      "awbNumber": null,
      "vehicleCount": null,
      "createdAt": "2026-04-11T14:32:00.000Z"
    }
  }
}`;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="p-1.5 rounded-none hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"
      title="Copy to clipboard"
    >
      {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
    </button>
  );
}

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState<WebhookRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [planError, setPlanError] = useState(false);

  const [url, setUrl] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>(["quote.created", "quote.status_changed"]);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");

  const [docsOpen, setDocsOpen] = useState(false);

  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<Record<string, { ok: boolean; msg: string }>>({});

  const [revealedSecrets, setRevealedSecrets] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/dashboard/webhooks")
      .then((r) => {
        if (r.status === 403) { setPlanError(true); return null; }
        return r.json();
      })
      .then((d) => { if (d) setWebhooks(d.webhooks ?? []); })
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setAddError("");
    if (!url.trim()) { setAddError("URL is required."); return; }
    if (selectedEvents.length === 0) { setAddError("Select at least one event."); return; }
    setAdding(true);
    try {
      const res = await fetch("/api/dashboard/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), events: selectedEvents }),
      });
      const data = await res.json();
      if (!res.ok) { setAddError(data.error ?? "Failed to add webhook."); return; }
      setWebhooks((prev) => [data.webhook, ...prev]);
      setUrl("");
      setSelectedEvents(["quote.created", "quote.status_changed"]);
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this webhook?")) return;
    await fetch(`/api/dashboard/webhooks/${id}`, { method: "DELETE" });
    setWebhooks((prev) => prev.filter((h) => h.id !== id));
  }

  async function handleToggle(hook: WebhookRow) {
    const res = await fetch(`/api/dashboard/webhooks/${hook.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: !hook.enabled }),
    });
    if (res.ok) {
      setWebhooks((prev) =>
        prev.map((h) => (h.id === hook.id ? { ...h, enabled: !h.enabled } : h))
      );
    }
  }

  async function handleTest(hook: WebhookRow) {
    setTestingId(hook.id);
    setTestResult((prev) => ({ ...prev, [hook.id]: { ok: false, msg: "" } }));
    try {
      const res = await fetch("/api/dashboard/webhooks/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ webhookId: hook.id }),
      });
      const data = await res.json();
      if (data.success) {
        setTestResult((prev) => ({ ...prev, [hook.id]: { ok: true, msg: `Delivered (HTTP ${data.httpStatus})` } }));
      } else {
        setTestResult((prev) => ({ ...prev, [hook.id]: { ok: false, msg: data.error ?? `HTTP ${data.httpStatus}` } }));
      }
    } catch {
      setTestResult((prev) => ({ ...prev, [hook.id]: { ok: false, msg: "Network error" } }));
    } finally {
      setTestingId(null);
      setTimeout(() => setTestResult((prev) => { const n = { ...prev }; delete n[hook.id]; return n; }), 6000);
    }
  }

  function toggleEvent(ev: string) {
    setSelectedEvents((prev) =>
      prev.includes(ev) ? prev.filter((e) => e !== ev) : [...prev, ev]
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-slate-400 dark:text-slate-500" size={28} />
      </div>
    );
  }

  if (planError) {
    return (
      <div className="p-6 sm:p-10 max-w-2xl mx-auto">
        <div className="bg-white dark:bg-[#1e1e1e] rounded-none border border-slate-200/60 dark:border-white/[0.06] shadow-xl dark:shadow-none p-10 text-center">
          <div className="w-16 h-16 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/30 rounded-none flex items-center justify-center mx-auto mb-6">
            <Lock size={28} className="text-amber-500 dark:text-amber-400" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Webhooks: Pro & Enterprise</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">
            Webhooks let you push quote events to any endpoint (Zapier, Onfleet, Shipday, or your own server). Upgrade to Pro or Enterprise to unlock.
          </p>
          <a
            href="/dashboard/billing"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-black px-8 py-3 rounded-none transition-all"
          >
            Upgrade Plan
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/30 rounded-none flex items-center justify-center">
            <Webhook size={22} className="text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Webhooks</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Push quote events to Zapier, Onfleet, Shipday, or your own server.</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white dark:bg-[#1e1e1e] rounded-none border border-slate-200/60 dark:border-white/[0.06] shadow-xl shadow-slate-200/40 dark:shadow-none p-8"
      >
        <h2 className="text-lg font-black text-slate-900 dark:text-white mb-6 tracking-tight">Add Endpoint</h2>
        <form onSubmit={handleAdd} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
              Endpoint URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              className="w-full border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-[#1e1e1e] rounded-none px-4 py-3 text-sm font-medium text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-300 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">
              Events to send
            </label>
            <div className="space-y-2">
              {ALL_EVENTS.map((ev) => (
                <label
                  key={ev.value}
                  className={`flex items-start gap-3 p-4 rounded-none border cursor-pointer transition-all ${
                    selectedEvents.includes(ev.value)
                      ? "border-red-300 dark:border-red-500/40 bg-red-50 dark:bg-red-500/10"
                      : "border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes(ev.value)}
                    onChange={() => toggleEvent(ev.value)}
                    className="mt-0.5 accent-red-600"
                  />
                  <div>
                    <p className="text-sm font-black text-slate-800 dark:text-white font-mono">{ev.label}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{ev.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
          {addError && <p className="text-sm text-red-600 dark:text-red-400 font-bold">{addError}</p>}
          <button
            type="submit"
            disabled={adding}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 active:scale-95 disabled:opacity-60 text-white font-black px-6 py-3 rounded-none transition-all text-sm"
          >
            {adding ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            {adding ? "Adding…" : "Add Webhook"}
          </button>
        </form>
      </motion.div>

      {webhooks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">
            {webhooks.length} endpoint{webhooks.length !== 1 ? "s" : ""}
          </h2>
          <AnimatePresence>
            {webhooks.map((hook) => {
              const result = testResult[hook.id];
              const isTesting = testingId === hook.id;
              const secretRevealed = revealedSecrets.has(hook.id);

              return (
                <motion.div
                  key={hook.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className={`bg-white dark:bg-[#1e1e1e] rounded-none border shadow-lg dark:shadow-none p-6 transition-all ${
                    hook.enabled ? "border-slate-200/60 dark:border-white/[0.06]" : "border-slate-100 dark:border-white/[0.04] opacity-60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <a
                          href={hook.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-black text-slate-900 dark:text-white truncate hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-1 group"
                        >
                          {hook.url}
                          <ExternalLink size={11} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </a>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {hook.events.map((ev) => (
                          <span key={ev} className="px-2 py-0.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-[10px] font-black rounded-full font-mono">
                            {ev}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggle(hook)}
                        title={hook.enabled ? "Disable" : "Enable"}
                        className="text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      >
                        {hook.enabled
                          ? <ToggleRight size={26} className="text-emerald-500" />
                          : <ToggleLeft size={26} />}
                      </button>
                      <button
                        onClick={() => handleDelete(hook.id)}
                        className="p-2 rounded-none hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 transition-all"
                        title="Delete webhook"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.06] rounded-none px-4 py-2 mb-4">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest shrink-0">Secret</span>
                    <span className="flex-1 text-xs font-mono text-slate-600 dark:text-slate-300 truncate select-all">
                      {secretRevealed ? hook.secret : "•".repeat(20)}
                    </span>
                    <button
                      onClick={() =>
                        setRevealedSecrets((prev) => {
                          const n = new Set(prev);
                          n.has(hook.id) ? n.delete(hook.id) : n.add(hook.id);
                          return n;
                        })
                      }
                      className="text-[10px] font-black text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 shrink-0 transition-colors"
                    >
                      {secretRevealed ? "Hide" : "Reveal"}
                    </button>
                    <CopyButton text={hook.secret} />
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleTest(hook)}
                      disabled={isTesting}
                      className="flex items-center gap-1.5 text-xs font-black text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 border border-slate-200 dark:border-white/[0.06] hover:border-red-200 dark:hover:border-red-500/30 hover:bg-red-50 dark:hover:bg-red-500/10 px-4 py-2 rounded-none transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isTesting
                        ? <Loader2 size={13} className="animate-spin" />
                        : <Zap size={13} />}
                      {isTesting ? "Sending…" : "Send Test"}
                    </button>
                    {result && (
                      <span className={`text-xs font-bold ${result.ok ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
                        {result.ok ? "✓" : "✗"} {result.msg}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {webhooks.length === 0 && (
        <div className="text-center py-12 text-slate-400 dark:text-slate-500 font-medium text-sm">
          No webhooks yet. Add your first endpoint above.
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white dark:bg-[#1e1e1e] rounded-none border border-slate-200/60 dark:border-white/[0.06] shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden"
      >
        <button
          onClick={() => setDocsOpen((v) => !v)}
          className="w-full flex items-center justify-between px-8 py-6 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-100 dark:bg-white/5 rounded-none flex items-center justify-center">
              <Zap size={15} className="text-slate-600 dark:text-slate-300" />
            </div>
            <span className="font-black text-slate-900 dark:text-white text-sm">Payload Schema & Signature Verification</span>
          </div>
          {docsOpen ? <ChevronUp size={18} className="text-slate-400 dark:text-slate-500" /> : <ChevronDown size={18} className="text-slate-400 dark:text-slate-500" />}
        </button>

        <AnimatePresence>
          {docsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-8 pb-8 space-y-6 border-t border-slate-100 dark:border-white/[0.06]">
                <div className="pt-6">
                  <h3 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Example Payload</h3>
                  <div className="relative">
                    <pre className="bg-slate-950 dark:bg-black/40 ring-1 ring-slate-800 dark:ring-white/[0.06] text-emerald-400 text-xs rounded-none p-5 overflow-x-auto leading-relaxed font-mono">
                      {EXAMPLE_PAYLOAD}
                    </pre>
                    <div className="absolute top-3 right-3">
                      <CopyButton text={EXAMPLE_PAYLOAD} />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Signature Verification (Node.js)</h3>
                  <pre className="bg-slate-950 dark:bg-black/40 ring-1 ring-slate-800 dark:ring-white/[0.06] text-sky-300 text-xs rounded-none p-5 overflow-x-auto leading-relaxed font-mono">{`const crypto = require("crypto");

function isValidSignature(body, signature, secret) {
  const expected = "sha256=" + crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

// In your handler:
const rawBody = await req.text();
const sig = req.headers.get("X-Qalt-Signature");
if (!isValidSignature(rawBody, sig, YOUR_WEBHOOK_SECRET)) {
  return new Response("Unauthorized", { status: 401 });
}`}</pre>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.06] rounded-none p-4">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Headers Sent</p>
                    <div className="space-y-1 font-mono text-xs text-slate-700 dark:text-slate-300">
                      <p><span className="text-slate-400 dark:text-slate-500">Content-Type:</span> application/json</p>
                      <p><span className="text-slate-400 dark:text-slate-500">X-Qalt-Event:</span> quote.created</p>
                      <p><span className="text-slate-400 dark:text-slate-500">X-Qalt-Signature:</span> sha256=…</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.06] rounded-none p-4">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Quick Test</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                      Use{" "}
                      <a
                        href="https://webhook.site"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 dark:text-red-400 font-black hover:underline"
                      >
                        webhook.site
                      </a>{" "}
                      to get a free inspection URL, paste it above, and hit Send Test to see the full payload.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
