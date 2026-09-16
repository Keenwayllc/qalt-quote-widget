"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  Loader2,
  Lock,
  Plus,
  Radio,
  ShieldCheck,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Webhook,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

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

const MCP_TARGETS = [
  {
    name: "ChatGPT",
    description: "Use approved Qalt tools from a secure MCP-powered ChatGPT app or connector.",
  },
  {
    name: "Claude",
    description: "Connect Claude to approved Qalt tools through a secure remote MCP connection.",
  },
  {
    name: "Manus",
    description: "Connect Manus to Qalt through its connector and MCP workflow support.",
  },
];

const ADDITIONAL_AI = [
  {
    name: "Perplexity",
    description: "Qalt can support Perplexity through secure API or compatible agent connection methods as available.",
  },
  {
    name: "Qwen",
    description: "Qalt can work with Qwen-based agents through APIs or MCP-compatible tooling when supported.",
  },
  {
    name: "DeepSeek",
    description: "Qalt can connect to DeepSeek-based workflows through secure APIs or compatible agent tooling.",
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
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/5 dark:hover:text-slate-200"
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
      .then(async (response) => {
        if (response.status === 403) {
          setWebhooksLocked(true);
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) setWebhooks(data.webhooks ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(event: React.FormEvent) {
    event.preventDefault();
    setAddError("");

    if (!url.trim()) {
      setAddError("Enter the secure endpoint URL that should receive Qalt events.");
      return;
    }
    if (selectedEvents.length === 0) {
      setAddError("Choose at least one event to send.");
      return;
    }

    setAdding(true);
    try {
      const response = await fetch("/api/dashboard/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), events: selectedEvents }),
      });
      const data = await response.json();
      if (!response.ok) {
        setAddError(data.error ?? "Qalt could not connect this endpoint.");
        return;
      }
      setWebhooks((current) => [data.webhook, ...current]);
      setUrl("");
      setSelectedEvents(["quote.created", "quote.status_changed"]);
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this webhook connection?")) return;
    await fetch(`/api/dashboard/webhooks/${id}`, { method: "DELETE" });
    setWebhooks((current) => current.filter((hook) => hook.id !== id));
  }

  async function handleToggle(hook: WebhookRow) {
    const response = await fetch(`/api/dashboard/webhooks/${hook.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: !hook.enabled }),
    });

    if (response.ok) {
      setWebhooks((current) =>
        current.map((item) => (item.id === hook.id ? { ...item, enabled: !item.enabled } : item))
      );
    }
  }

  async function handleTest(hook: WebhookRow) {
    setTestingId(hook.id);
    try {
      const response = await fetch("/api/dashboard/webhooks/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ webhookId: hook.id }),
      });
      const data = await response.json();
      setTestResult((current) => ({
        ...current,
        [hook.id]: data.success
          ? { ok: true, msg: `Delivered (HTTP ${data.httpStatus})` }
          : { ok: false, msg: data.error ?? `HTTP ${data.httpStatus}` },
      }));
    } catch {
      setTestResult((current) => ({ ...current, [hook.id]: { ok: false, msg: "Network error" } }));
    } finally {
      setTestingId(null);
      setTimeout(() => {
        setTestResult((current) => {
          const next = { ...current };
          delete next[hook.id];
          return next;
        });
      }, 6000);
    }
  }

  function toggleEvent(eventName: string) {
    setSelectedEvents((current) =>
      current.includes(eventName)
        ? current.filter((item) => item !== eventName)
        : [...current, eventName]
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6 sm:p-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-red-100 bg-red-50 dark:border-red-500/30 dark:bg-red-500/10">
            <Sparkles size={22} className="text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Integrations & AI Connections
            </h1>
            <p className="mt-1 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              Connect Qalt to the tools your business already uses. AI connections let approved assistants work with Qalt, while webhooks send real-time Qalt activity to other business systems.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.03 }}
        className="border border-slate-200/70 bg-white p-7 shadow-lg shadow-slate-200/30 dark:border-white/[0.07] dark:bg-[#141414] dark:shadow-none"
      >
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <Bot size={19} className="text-red-600 dark:text-red-400" />
            <h2 className="text-xl font-black text-slate-900 dark:text-white">AI Connections & Agents</h2>
          </div>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            MCP is a secure way for an AI assistant to use approved Qalt tools. Instead of giving an AI direct database access, Qalt decides exactly what the assistant is allowed to read or do.
          </p>
        </div>

        <div className="mb-6 border border-red-100 bg-red-50/60 p-5 dark:border-red-500/20 dark:bg-red-500/[0.06]">
          <p className="text-sm font-black text-slate-900 dark:text-white">What could I ask an AI to do with Qalt?</p>
          <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-slate-600 dark:text-slate-300 md:grid-cols-2">
            <p>“Show me today’s new quotes.”</p>
            <p>“Which quotes are still waiting for a response?”</p>
            <p>“Create a booking from this approved quote.”</p>
            <p>“Show me my average quote value this month.”</p>
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">Primary MCP connection targets</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              These are the first assistants Qalt is being designed to support through a secure MCP connection.
            </p>
          </div>
          <span className="shrink-0 border border-amber-200 bg-amber-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300">
            In development
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {MCP_TARGETS.map((connection) => (
            <div key={connection.name} className="border border-slate-200/70 bg-slate-50/70 p-5 dark:border-white/[0.07] dark:bg-white/[0.025]">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h4 className="font-black text-slate-900 dark:text-white">{connection.name}</h4>
                <Radio size={15} className="text-slate-400" />
              </div>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{connection.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-7">
          <h3 className="text-sm font-black text-slate-900 dark:text-white">Additional AI platforms</h3>
          <p className="mt-1 max-w-3xl text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Qalt can also support other AI platforms through secure APIs, MCP-compatible tooling, or future connector standards. Compatibility will be enabled only after it is tested and secure.
          </p>
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
            {ADDITIONAL_AI.map((connection) => (
              <div key={connection.name} className="border border-slate-200/70 bg-white p-5 dark:border-white/[0.07] dark:bg-[#141414]">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h4 className="font-black text-slate-900 dark:text-white">{connection.name}</h4>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Compatibility path</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{connection.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border border-slate-200/70 bg-white p-5 dark:border-white/[0.07] dark:bg-[#141414]">
          <div className="flex items-start gap-3">
            <ShieldCheck size={19} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="text-sm font-black text-slate-900 dark:text-white">Your Qalt data stays protected</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Qalt will require merchant authorization, limited permissions, revocable access, and action logging before live AI connections are enabled. An AI assistant will never receive unrestricted database access.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
        className="border border-slate-200/70 bg-white p-7 shadow-lg shadow-slate-200/30 dark:border-white/[0.07] dark:bg-[#141414] dark:shadow-none"
      >
        <div className="mb-6 flex items-start gap-3">
          <Webhook size={20} className="mt-0.5 text-red-600 dark:text-red-400" />
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Webhooks</h2>
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              A webhook simply tells another system when something happens in Qalt. For example, Qalt can notify your CRM or internal software the moment a new quote arrives.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-14">
            <Loader2 className="animate-spin text-slate-400" size={26} />
          </div>
        ) : webhooksLocked ? (
          <div className="border border-slate-200 bg-slate-50 p-7 dark:border-white/[0.07] dark:bg-white/[0.025]">
            <div className="mb-4 flex h-11 w-11 items-center justify-center border border-slate-200 bg-white dark:border-white/[0.07] dark:bg-white/5">
              <Lock size={20} className="text-slate-500 dark:text-slate-400" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Webhooks are included with Enterprise</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Enterprise merchants can automatically send Qalt events to automation tools, CRMs, internal systems, and custom applications.
            </p>
            <a href="/dashboard/billing" className="mt-5 inline-flex items-center gap-2 bg-red-600 px-5 py-2.5 text-sm font-black text-white transition-colors hover:bg-red-500">
              View Enterprise <ArrowRight size={15} />
            </a>
          </div>
        ) : (
          <>
            <div className="mb-6 border border-slate-200 bg-slate-50/60 p-6 dark:border-white/[0.07] dark:bg-white/[0.02]">
              <h3 className="text-base font-black text-slate-900 dark:text-white">Connect an endpoint</h3>
              <p className="mb-5 mt-1 text-xs text-slate-500 dark:text-slate-400">
                Paste the secure URL provided by the business tool or system you want Qalt to notify.
              </p>

              <form onSubmit={handleAdd} className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Endpoint URL</label>
                  <input
                    type="url"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    placeholder="https://your-system.com/qalt/webhook"
                    className="w-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 placeholder:text-slate-300 focus:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:border-white/[0.07] dark:bg-[#141414] dark:text-white dark:placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">What should Qalt send?</label>
                  <div className="space-y-2">
                    {ALL_EVENTS.map((item) => (
                      <label
                        key={item.value}
                        className={`flex cursor-pointer items-start gap-3 border p-4 transition-all ${
                          selectedEvents.includes(item.value)
                            ? "border-red-300 bg-red-50/70 dark:border-red-500/40 dark:bg-red-500/10"
                            : "border-slate-200/70 bg-white hover:bg-slate-50 dark:border-white/[0.07] dark:bg-[#141414] dark:hover:bg-white/[0.03]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedEvents.includes(item.value)}
                          onChange={() => toggleEvent(item.value)}
                          className="mt-1 accent-red-600"
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-black text-slate-900 dark:text-white">{item.label}</p>
                            <code className="text-[10px] text-slate-400 dark:text-slate-500">{item.code}</code>
                          </div>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {addError && <p className="text-sm font-bold text-red-600 dark:text-red-400">{addError}</p>}
                <button type="submit" disabled={adding} className="flex items-center gap-2 bg-red-600 px-5 py-2.5 text-sm font-black text-white transition-all hover:bg-red-500 disabled:opacity-60">
                  {adding ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
                  {adding ? "Connecting…" : "Add Webhook"}
                </button>
              </form>
            </div>

            {webhooks.length === 0 ? (
              <div className="border border-dashed border-slate-200 py-8 text-center text-sm text-slate-400 dark:border-white/[0.08] dark:text-slate-500">
                No webhooks connected yet. You only need one if another business system should receive Qalt events automatically.
              </div>
            ) : (
              <div className="space-y-3">
                {webhooks.map((hook) => {
                  const result = testResult[hook.id];
                  const isTesting = testingId === hook.id;
                  const secretRevealed = revealedSecrets.has(hook.id);

                  return (
                    <div key={hook.id} className={`border p-5 ${hook.enabled ? "border-slate-200 dark:border-white/[0.07]" : "border-slate-100 opacity-60 dark:border-white/[0.04]"}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <a href={hook.url} target="_blank" rel="noopener noreferrer" className="inline-flex max-w-full items-center gap-1 text-sm font-black text-slate-900 hover:text-red-600 dark:text-white dark:hover:text-red-400">
                            <span className="truncate">{hook.url}</span>
                            <ExternalLink size={11} className="shrink-0" />
                          </a>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {hook.events.map((eventName) => (
                              <span key={eventName} className="bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-black text-slate-600 dark:bg-white/5 dark:text-slate-300">
                                {eventName}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => handleToggle(hook)} title={hook.enabled ? "Pause" : "Enable"} className="text-slate-400 hover:text-red-600">
                            {hook.enabled ? <ToggleRight size={26} className="text-emerald-500" /> : <ToggleLeft size={26} />}
                          </button>
                          <button type="button" onClick={() => handleDelete(hook.id)} className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10" title="Remove webhook">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 border border-slate-100 bg-slate-50 px-3 py-2 dark:border-white/[0.06] dark:bg-white/[0.025]">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secret</span>
                        <span className="flex-1 truncate select-all font-mono text-xs text-slate-600 dark:text-slate-300">
                          {secretRevealed ? hook.secret : "•".repeat(20)}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setRevealedSecrets((current) => {
                              const next = new Set(current);
                              next.has(hook.id) ? next.delete(hook.id) : next.add(hook.id);
                              return next;
                            })
                          }
                          className="text-[10px] font-black text-slate-400 hover:text-slate-700 dark:hover:text-white"
                        >
                          {secretRevealed ? "Hide" : "Reveal"}
                        </button>
                        <CopyButton text={hook.secret} />
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <button type="button" onClick={() => handleTest(hook)} disabled={isTesting} className="flex items-center gap-1.5 border border-slate-200 px-3 py-2 text-xs font-black text-slate-600 hover:text-red-600 disabled:opacity-50 dark:border-white/[0.07] dark:text-slate-300">
                          {isTesting ? <Loader2 size={13} className="animate-spin" /> : <Zap size={13} />}
                          {isTesting ? "Sending…" : "Send Test"}
                        </button>
                        {result && (
                          <span className={`text-xs font-bold ${result.ok ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
                            {result.ok ? "✓" : "✗"} {result.msg}
                          </span>
                        )}
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
        className="overflow-hidden border border-slate-200/70 bg-white shadow-lg shadow-slate-200/30 dark:border-white/[0.07] dark:bg-[#141414] dark:shadow-none"
      >
        <button type="button" onClick={() => setDocsOpen((current) => !current)} className="flex w-full items-center justify-between px-7 py-5 transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.02]">
          <div className="flex items-center gap-3 text-left">
            <div className="flex h-9 w-9 items-center justify-center bg-slate-100 dark:bg-white/5">
              <Zap size={16} className="text-slate-600 dark:text-slate-300" />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 dark:text-white">Developer reference</p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">For developers connecting another system to Qalt</p>
            </div>
          </div>
          {docsOpen ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
        </button>

        <AnimatePresence>
          {docsOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
              <div className="space-y-6 border-t border-slate-100 px-7 pb-7 dark:border-white/[0.06]">
                <div className="pt-6">
                  <h3 className="mb-3 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Example payload</h3>
                  <div className="relative">
                    <pre className="overflow-x-auto bg-slate-950 p-5 font-mono text-xs leading-relaxed text-emerald-400 ring-1 ring-slate-800 dark:bg-black/40 dark:ring-white/[0.06]">{EXAMPLE_PAYLOAD}</pre>
                    <div className="absolute right-3 top-3"><CopyButton text={EXAMPLE_PAYLOAD} /></div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Signature verification (Node.js)</h3>
                  <pre className="overflow-x-auto bg-slate-950 p-5 font-mono text-xs leading-relaxed text-sky-300 ring-1 ring-slate-800 dark:bg-black/40 dark:ring-white/[0.06]">{`const crypto = require("crypto");

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
