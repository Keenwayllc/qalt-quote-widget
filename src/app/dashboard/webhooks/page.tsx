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
  Bot,
  PlugZap,
  Radio,
  ShieldCheck,
  ArrowRight,
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
  {
    value: "quote.created",
    label: "New quote received",
    code: "quote.created",
    desc: "Sent when a customer submits a new quote through your Qalt form.",
  },
  {
    value: "quote.status_changed",
    label: "Quote status updated",
    code: "quote.status_changed",
    desc: "Sent when a quote changes status, such as Confirmed, Won, Lost, or Paid.",
  },
];

const AI_CONNECTIONS = [
  {
    name: "ChatGPT",
    description: "Connect Qalt through an MCP-powered app so approved Qalt data and actions can be used inside ChatGPT.",
  },
  {
    name: "Claude",
    description: "Use a remote Qalt MCP connection so Claude can work with approved quote, booking, pricing, and analytics tools.",
  },
  {
    name: "Manus",
    description: "Manus connectors can work with third-party APIs and MCP servers, making it a strong fit for future Qalt workflows.",
  },
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
      className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
      title="Copy to clipboard"
    >
      {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
    </button>
  );
}

export default function IntegrationsPage() {
  const [webhooks, setWebhooks] = useState<WebhookRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [webhooksLocked, setWebhooksLocked] = useState(false);
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
      .then(async (r) => {
        if (r.status === 403) {
          setWebhooksLocked(true);
          return null;
        }
        return r.json();
      })
      .then((d) => {
        if (d) setWebhooks(d.webhooks ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setAddError("");
    if (!url.trim()) {
      setAddError("Enter the endpoint URL that should receive Qalt events.");
      return;
    }
    if (selectedEvents.length === 0) {
      setAddError("Choose at least one event to send.");
      return;
    }
    setAdding(true);
    try {
      const res = await fetch("/api/dashboard/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), events: selectedEvents }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAddError(data.error ?? "Qalt could not add this webhook.");
        return;
      }
      setWebhooks((prev) => [data.webhook, ...prev]);
      setUrl("");
      setSelectedEvents(["quote.created", "quote.status_changed"]);
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this webhook endpoint?")) return;
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
      setWebhooks((prev) => prev.map((h) => (h.id === hook.id ? { ...h, enabled: !h.enabled } : h)));
    }
  }

  async function handleTest(hook: WebhookRow) {
    setTestingId(hook.id);
    try {
      const res = await fetch("/api/dashboard/webhooks/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ webhookId: hook.id }),
      });
      const data = await res.json();
      setTestResult((prev) => ({
        ...prev,
        [hook.id]: data.success
          ? { ok: true, msg: `Delivered (HTTP ${data.httpStatus})` }
          : { ok: false, msg: data.error ?? `HTTP ${data.httpStatus}` },
      }));
    } catch {
      setTestResult((prev) => ({ ...prev, [hook.id]: { ok: false, msg: "Network error" } }));
    } finally {
      setTestingId(null);
      setTimeout(() => {
        setTestResult((prev) => {
          const next = { ...prev };
          delete next[hook.id];
          return next;
        });
      }, 6000);
    }
  }

  function toggleEvent(eventName: string) {
    setSelectedEvents((prev) =>
      prev.includes(eventName) ? prev.filter((event) => event !== eventName) : [...prev, eventName]
    );
  }

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/30 flex items-center justify-center shrink-0">
            <PlugZap size={22} className="text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Integrations & Developer Tools</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1 max-w-2xl">
              Connect Qalt to the tools your business already uses. Webhooks handle real-time events today, while MCP is the connection layer for AI assistants and agent workflows.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.03 }}
        className="bg-white dark:bg-[#141414] border border-slate-200/70 dark:border-white/[0.07] shadow-lg shadow-slate-200/30 dark:shadow-none p-7"
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Bot size={19} className="text-red-600 dark:text-red-400" />
              <h2 className="text-xl font-black text-slate-900 dark:text-white">AI Connections</h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
              Qalt is being structured so supported AI assistants can securely work with approved Qalt tools instead of requiring a separate custom integration for every AI platform.
            </p>
          </div>
          <span className="shrink-0 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20">
            MCP foundation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {AI_CONNECTIONS.map((connection) => (
            <div key={connection.name} className="border border-slate-200/70 dark:border-white/[0.07] bg-slate-50/70 dark:bg-white/[0.025] p-5">
              <div className="flex items-center justify-between gap-3 mb-3">
                <h3 className="font-black text-slate-900 dark:text-white">{connection.name}</h3>
                <Radio size={15} className="text-slate-400" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{connection.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 border border-slate-200/70 dark:border-white/[0.07] bg-white dark:bg-[#141414] p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck size={19} className="text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-black text-sm text-slate-900 dark:text-white">Secure connection comes before public MCP access</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                Qalt will not expose customer data through an unauthenticated MCP endpoint. The next connection layer needs merchant authorization, scoped permissions, and revocable access before AI assistants can use live Qalt data or actions.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
        className="bg-white dark:bg-[#141414] border border-slate-200/70 dark:border-white/[0.07] shadow-lg shadow-slate-200/30 dark:shadow-none p-7"
      >
        <div className="flex items-start gap-3 mb-6">
          <Webhook size={20} className="text-red-600 dark:text-red-400 mt-0.5" />
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Webhooks</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
              Webhooks automatically send Qalt activity to another business system the moment something happens. They are ideal for automation platforms, CRMs, internal software, and custom applications.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-14">
            <Loader2 className="animate-spin text-slate-400" size={26} />
          </div>
        ) : webhooksLocked ? (
          <div className="border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.025] p-7">
            <div className="w-11 h-11 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/[0.07] flex items-center justify-center mb-4">
              <Lock size={20} className="text-slate-500 dark:text-slate-400" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Webhooks are an Enterprise feature</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
              Enterprise merchants can send Qalt quote events to automation tools, CRMs, dispatch systems, or their own applications. No competing delivery platform is required.
            </p>
            <a href="/dashboard/billing" className="inline-flex items-center gap-2 mt-5 bg-red-600 hover:bg-red-500 text-white font-black px-5 py-2.5 text-sm transition-colors">
              View Enterprise <ArrowRight size={15} />
            </a>
          </div>
        ) : (
          <>
            <div className="border border-slate-200 dark:border-white/[0.07] bg-slate-50/60 dark:bg-white/[0.02] p-6 mb-6">
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-1">Connect an endpoint</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                Add the secure URL provided by your automation tool, CRM, internal application, or integration provider.
              </p>
              <form onSubmit={handleAdd} className="space-y-5">
                <div>
                  <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Endpoint URL</label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://your-system.com/qalt/webhook"
                    className="w-full border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#141414] px-4 py-3 text-sm font-medium text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-300 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Events to send</label>
                  <div className="space-y-2">
                    {ALL_EVENTS.map((event) => (
                      <label
                        key={event.value}
                        className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                          selectedEvents.includes(event.value)
                            ? "border-red-300 dark:border-red-500/40 bg-red-50/70 dark:bg-red-500/10"
                            : "border-slate-200/70 dark:border-white/[0.07] bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedEvents.includes(event.value)}
                          onChange={() => toggleEvent(event.value)}
                          className="mt-1 accent-red-600"
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-black text-slate-900 dark:text-white">{event.label}</p>
                            <code className="text-[10px] text-slate-400 dark:text-slate-500">{event.code}</code>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{event.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {addError && <p className="text-sm text-red-600 dark:text-red-400 font-bold">{addError}</p>}
                <button type="submit" disabled={adding} className="flex items-center gap-2 bg-red-600 hover:bg-red-500 active:scale-[0.98] disabled:opacity-60 text-white font-black px-5 py-2.5 transition-all text-sm">
                  {adding ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
                  {adding ? "Connecting…" : "Add Webhook"}
                </button>
              </form>
            </div>

            {webhooks.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-slate-200 dark:border-white/[0.08] text-slate-400 dark:text-slate-500 text-sm">
                No webhooks connected yet. Add an endpoint above when you are ready to automate Qalt events.
              </div>
            ) : (
              <div className="space-y-3">
                {webhooks.map((hook) => {
                  const result = testResult[hook.id];
                  const isTesting = testingId === hook.id;
                  const secretRevealed = revealedSecrets.has(hook.id);
                  return (
                    <div key={hook.id} className={`border p-5 ${hook.enabled ? "border-slate-200 dark:border-white/[0.07]" : "border-slate-100 dark:border-white/[0.04] opacity-60"}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <a href={hook.url} target="_blank" rel="noopener noreferrer" className="text-sm font-black text-slate-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 inline-flex items-center gap-1 max-w-full">
                            <span className="truncate">{hook.url}</span><ExternalLink size={11} className="shrink-0" />
                          </a>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {hook.events.map((event) => (
                              <span key={event} className="px-2 py-0.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-[10px] font-black font-mono">{event}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleToggle(hook)} title={hook.enabled ? "Disable" : "Enable"} className="text-slate-400 hover:text-red-600">
                            {hook.enabled ? <ToggleRight size={26} className="text-emerald-500" /> : <ToggleLeft size={26} />}
                          </button>
                          <button onClick={() => handleDelete(hook.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-400 hover:text-red-500" title="Delete webhook">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-slate-50 dark:bg-white/[0.025] border border-slate-100 dark:border-white/[0.06] px-3 py-2 mt-4">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secret</span>
                        <span className="flex-1 text-xs font-mono text-slate-600 dark:text-slate-300 truncate select-all">{secretRevealed ? hook.secret : "•".repeat(20)}</span>
                        <button
                          onClick={() => setRevealedSecrets((prev) => {
                            const next = new Set(prev);
                            next.has(hook.id) ? next.delete(hook.id) : next.add(hook.id);
                            return next;
                          })}
                          className="text-[10px] font-black text-slate-400 hover:text-slate-700 dark:hover:text-white"
                        >
                          {secretRevealed ? "Hide" : "Reveal"}
                        </button>
                        <CopyButton text={hook.secret} />
                      </div>

                      <div className="flex items-center gap-3 mt-4">
                        <button onClick={() => handleTest(hook)} disabled={isTesting} className="flex items-center gap-1.5 text-xs font-black text-slate-600 dark:text-slate-300 hover:text-red-600 border border-slate-200 dark:border-white/[0.07] px-3 py-2 disabled:opacity-50">
                          {isTesting ? <Loader2 size={13} className="animate-spin" /> : <Zap size={13} />}
                          {isTesting ? "Sending…" : "Send Test"}
                        </button>
                        {result && <span className={`text-xs font-bold ${result.ok ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>{result.ok ? "✓" : "✗"} {result.msg}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.09 }}
        className="bg-white dark:bg-[#141414] border border-slate-200/70 dark:border-white/[0.07] shadow-lg shadow-slate-200/30 dark:shadow-none overflow-hidden"
      >
        <button onClick={() => setDocsOpen((value) => !value)} className="w-full flex items-center justify-between px-7 py-5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
          <div className="flex items-center gap-3 text-left">
            <div className="w-9 h-9 bg-slate-100 dark:bg-white/5 flex items-center justify-center">
              <Zap size={16} className="text-slate-600 dark:text-slate-300" />
            </div>
            <div>
              <p className="font-black text-slate-900 dark:text-white text-sm">Developer reference</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Payload format and webhook signature verification</p>
            </div>
          </div>
          {docsOpen ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
        </button>

        <AnimatePresence>
          {docsOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
              <div className="px-7 pb-7 space-y-6 border-t border-slate-100 dark:border-white/[0.06]">
                <div className="pt-6">
                  <h3 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Example payload</h3>
                  <div className="relative">
                    <pre className="bg-slate-950 dark:bg-black/40 ring-1 ring-slate-800 dark:ring-white/[0.06] text-emerald-400 text-xs p-5 overflow-x-auto leading-relaxed font-mono">{EXAMPLE_PAYLOAD}</pre>
                    <div className="absolute top-3 right-3"><CopyButton text={EXAMPLE_PAYLOAD} /></div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Signature verification (Node.js)</h3>
                  <pre className="bg-slate-950 dark:bg-black/40 ring-1 ring-slate-800 dark:ring-white/[0.06] text-sky-300 text-xs p-5 overflow-x-auto leading-relaxed font-mono">{`const crypto = require("crypto");

function isValidSignature(body, signature, secret) {
  const expected = "sha256=" + crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}`}</pre>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  );
}
