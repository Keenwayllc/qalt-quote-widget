"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bot,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  KeyRound,
  Link2,
  Loader2,
  Lock,
  PlugZap,
  Plus,
  RefreshCcw,
  ShieldCheck,
  Trash2,
  Webhook,
} from "lucide-react";

interface Connection {
  id: string;
  name: string;
  provider: string;
  tokenPrefix: string;
  scopes: string[];
  createdAt: string;
  lastUsedAt: string | null;
  revokedAt: string | null;
}

interface ActivityItem {
  id: string;
  connectionId: string | null;
  action: string;
  resource: string | null;
  createdAt: string;
}

interface WebhookRow {
  id: string;
  url: string;
  events: string[];
  enabled: boolean;
  createdAt: string;
}

interface PlatformGuide {
  name: string;
  provider: string;
  method: string;
  badge: string;
  summary: string;
  steps: string[];
  usesMcp: boolean;
  note?: string;
}

const AI_PLATFORMS: PlatformGuide[] = [
  {
    name: "ChatGPT",
    provider: "CHATGPT",
    method: "Remote MCP",
    badge: "MCP",
    summary: "Use Qalt's remote MCP server so ChatGPT can call approved Qalt tools.",
    steps: [
      "Create a ChatGPT connection in Qalt and copy the token when it appears.",
      "In ChatGPT, add a custom app or MCP connector and enter the Qalt MCP server URL.",
      "Configure the connection to send the Qalt token as a Bearer authorization token.",
      "After ChatGPT discovers the tools, ask it to list quotes or summarize quote analytics.",
    ],
    usesMcp: true,
    note: "For a public one-click Qalt app, OAuth will replace manual token entry.",
  },
  {
    name: "Claude",
    provider: "CLAUDE",
    method: "Remote MCP",
    badge: "MCP",
    summary: "Claude can use Qalt through a remote MCP connector with approved read-only tools.",
    steps: [
      "Create a Claude connection in Qalt and copy the one-time token.",
      "In Claude, open Settings and add a custom connector / remote MCP server.",
      "Use the Qalt MCP URL and the Qalt token for authorization.",
      "Confirm Claude can see list_quotes, get_quote, and analytics_summary before using it with live work.",
    ],
    usesMcp: true,
    note: "OAuth is the preferred long-term public connector experience.",
  },
  {
    name: "Manus",
    provider: "MANUS",
    method: "MCP connector",
    badge: "MCP",
    summary: "Connect Manus to Qalt as an MCP-backed connector for merchant-scoped quote workflows.",
    steps: [
      "Create a Manus connection in Qalt and copy the token.",
      "In Manus connectors, add a custom MCP or API connection.",
      "Use the Qalt MCP URL and Bearer token.",
      "Test with a read-only task such as showing today's recent quotes.",
    ],
    usesMcp: true,
    note: "Keep the connection read-only until write-action permissions are released.",
  },
  {
    name: "Perplexity",
    provider: "PERPLEXITY",
    method: "Qalt API + tools",
    badge: "API",
    summary: "Use Perplexity function tools that call Qalt's secure REST API on the merchant's behalf.",
    steps: [
      "Create a Perplexity connection in Qalt and copy the token.",
      "In your Perplexity Agent API integration, define functions such as qalt_list_quotes and qalt_analytics_summary.",
      "When Perplexity requests a function, your backend calls the matching Qalt API endpoint with the Bearer token.",
      "Return the Qalt response to Perplexity so it can answer the merchant.",
    ],
    usesMcp: false,
    note: "This is an API tool-calling path, not a claim of native Qalt MCP support inside Perplexity.",
  },
  {
    name: "Qwen",
    provider: "QWEN",
    method: "MCP / API compatibility",
    badge: "MCP + API",
    summary: "Qwen can use Qalt through a compatible MCP transport or the Qalt REST API.",
    steps: [
      "Create a Qwen connection in Qalt and copy the token.",
      "If your Qwen client supports Qalt's remote HTTP MCP transport, use the Qalt MCP URL and Bearer token.",
      "If the Qwen environment requires a different MCP transport, use the Qalt REST API until that transport is enabled.",
      "Start with list/read operations only and verify the connection in Qalt's activity log.",
    ],
    usesMcp: true,
    note: "Qalt will only label a Qwen transport as native after that exact client flow is tested end to end.",
  },
  {
    name: "DeepSeek",
    provider: "DEEPSEEK",
    method: "Qalt API + function calling",
    badge: "API",
    summary: "Use DeepSeek function calling while your application securely executes the Qalt API request.",
    steps: [
      "Create a DeepSeek connection in Qalt and copy the token.",
      "Define Qalt functions in your DeepSeek application, such as qalt_list_quotes and qalt_get_quote.",
      "When DeepSeek selects a function, your backend calls Qalt's REST API with the Bearer token.",
      "Pass the Qalt result back to DeepSeek for the final response.",
    ],
    usesMcp: false,
    note: "The Qalt token belongs on your server, not in a browser or public prompt.",
  },
];

function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      className="inline-flex items-center gap-1.5 text-xs font-black text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copied" : label}
    </button>
  );
}

export default function IntegrationsPage() {
  const [loading, setLoading] = useState(true);
  const [enterpriseEnabled, setEnterpriseEnabled] = useState(false);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [mcpUrl, setMcpUrl] = useState("");
  const [apiBase, setApiBase] = useState("");
  const [provider, setProvider] = useState("CHATGPT");
  const [connectionName, setConnectionName] = useState("My AI connection");
  const [creating, setCreating] = useState(false);
  const [newToken, setNewToken] = useState<string | null>(null);
  const [newTokenName, setNewTokenName] = useState("");
  const [openGuide, setOpenGuide] = useState<string | null>("CHATGPT");
  const [error, setError] = useState("");

  const [webhooks, setWebhooks] = useState<WebhookRow[]>([]);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [addingWebhook, setAddingWebhook] = useState(false);

  const activeConnections = useMemo(() => connections.filter((item) => !item.revokedAt), [connections]);

  async function loadIntegrations() {
    setLoading(true);
    try {
      const [integrationRes, webhookRes] = await Promise.all([
        fetch("/api/dashboard/integrations"),
        fetch("/api/dashboard/webhooks"),
      ]);
      const integrationData = await integrationRes.json();
      if (integrationRes.ok) {
        setEnterpriseEnabled(!!integrationData.enterpriseEnabled);
        setConnections(integrationData.connections ?? []);
        setActivity(integrationData.activity ?? []);
        setMcpUrl(integrationData.endpoints?.mcp ?? "");
        setApiBase(integrationData.endpoints?.apiBase ?? "");
      }
      if (webhookRes.ok) {
        const webhookData = await webhookRes.json();
        setWebhooks(webhookData.webhooks ?? []);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadIntegrations();
  }, []);

  async function createConnection(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setError("");
    setNewToken(null);
    try {
      const res = await fetch("/api/dashboard/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: connectionName,
          provider,
          scopes: ["quotes:read", "analytics:read"],
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Qalt could not create the connection.");
        return;
      }
      setNewToken(data.token);
      setNewTokenName(data.connection.name);
      setMcpUrl(data.endpoints?.mcp ?? mcpUrl);
      setApiBase(data.endpoints?.apiBase ?? apiBase);
      await loadIntegrations();
    } finally {
      setCreating(false);
    }
  }

  async function revokeConnection(id: string) {
    if (!confirm("Revoke this connection? The existing token will stop working immediately.")) return;
    const res = await fetch(`/api/dashboard/integrations/${id}`, { method: "DELETE" });
    if (res.ok) await loadIntegrations();
  }

  async function addWebhook(e: React.FormEvent) {
    e.preventDefault();
    if (!webhookUrl.trim()) return;
    setAddingWebhook(true);
    setError("");
    try {
      const res = await fetch("/api/dashboard/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: webhookUrl.trim(),
          events: ["quote.created", "quote.status_changed"],
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Qalt could not add the webhook.");
        return;
      }
      setWebhookUrl("");
      await loadIntegrations();
    } finally {
      setAddingWebhook(false);
    }
  }

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
      <section className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/30 flex items-center justify-center shrink-0">
            <PlugZap size={22} className="text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Integrations & AI Connections</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Connect Qalt to AI assistants and business systems without giving them direct database access. Qalt controls permissions, keeps every connection merchant-scoped, and records important activity.
            </p>
          </div>
        </div>
        <button onClick={loadIntegrations} className="p-2.5 border border-slate-200 dark:border-white/[0.08] text-slate-500 hover:text-red-600 transition-colors" title="Refresh">
          <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
        </button>
      </section>

      <section className="bg-white dark:bg-[#141414] border border-slate-200/70 dark:border-white/[0.07] p-7 shadow-lg shadow-slate-200/30 dark:shadow-none">
        <div className="flex items-start gap-3 mb-6">
          <ShieldCheck size={21} className="text-emerald-600 dark:text-emerald-400 mt-0.5" />
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Secure Qalt connection center</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Live connections are read-only in this phase. Connected tools can view approved quotes and analytics, but they cannot change pricing, send money, delete data, or perform payment actions.
            </p>
          </div>
        </div>

        {!enterpriseEnabled ? (
          <div className="border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.025] p-6">
            <div className="flex items-start gap-3">
              <Lock size={18} className="text-slate-500 mt-0.5" />
              <div>
                <p className="font-black text-slate-900 dark:text-white">Secure external connections are an Enterprise feature</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Upgrade to create revocable Qalt integration credentials and connect external AI or business systems.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6">
            <form onSubmit={createConnection} className="border border-slate-200 dark:border-white/[0.07] bg-slate-50/60 dark:bg-white/[0.02] p-6 space-y-5">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">New secure connection</p>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">Create a Qalt access token</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">This token is the working connection method today. OAuth sign-in will replace manual token entry for supported public connectors later.</p>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 dark:text-slate-400 mb-2">Platform</label>
                <select
                  value={provider}
                  onChange={(e) => {
                    setProvider(e.target.value);
                    setOpenGuide(e.target.value);
                    const selected = AI_PLATFORMS.find((item) => item.provider === e.target.value);
                    if (selected) setConnectionName(`My ${selected.name} connection`);
                  }}
                  className="w-full border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#141414] px-3 py-3 text-sm text-slate-800 dark:text-white"
                >
                  {AI_PLATFORMS.map((item) => <option key={item.provider} value={item.provider}>{item.name}</option>)}
                  <option value="CUSTOM">Other / custom integration</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 dark:text-slate-400 mb-2">Connection name</label>
                <input value={connectionName} onChange={(e) => setConnectionName(e.target.value)} maxLength={80} className="w-full border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#141414] px-3 py-3 text-sm text-slate-800 dark:text-white" placeholder="Office ChatGPT" />
              </div>
              <div className="border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#141414] p-4">
                <p className="text-xs font-black text-slate-700 dark:text-slate-200">Permissions for this phase</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">quotes:read</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">analytics:read</span>
                </div>
              </div>
              <button disabled={creating} className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white font-black px-5 py-3 text-sm transition-colors">
                {creating ? <Loader2 size={15} className="animate-spin" /> : <KeyRound size={15} />}
                {creating ? "Creating secure connection…" : "Create Secure Connection"}
              </button>
            </form>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Active connections</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Revoke a connection anytime to stop its token immediately.</p>
                </div>
                <span className="text-xs font-black text-slate-500">{activeConnections.length} active</span>
              </div>
              {loading ? (
                <div className="py-10 flex justify-center"><Loader2 className="animate-spin text-slate-400" /></div>
              ) : activeConnections.length === 0 ? (
                <div className="border border-dashed border-slate-200 dark:border-white/[0.08] p-8 text-center text-sm text-slate-400">No secure AI connections yet.</div>
              ) : activeConnections.map((item) => (
                <div key={item.id} className="border border-slate-200 dark:border-white/[0.07] p-5 bg-white dark:bg-[#141414]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-black text-slate-900 dark:text-white">{item.name}</p>
                        <span className="text-[10px] font-black uppercase tracking-wide px-2 py-0.5 bg-slate-100 dark:bg-white/5 text-slate-500">{item.provider}</span>
                      </div>
                      <p className="font-mono text-xs text-slate-400 mt-2">{item.tokenPrefix}</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {item.scopes.map((scope) => <span key={scope} className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-white/5 text-slate-500">{scope}</span>)}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Last used: {item.lastUsedAt ? new Date(item.lastUsedAt).toLocaleString() : "Not used yet"}</p>
                    </div>
                    <button onClick={() => revokeConnection(item.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors" title="Revoke connection"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {newToken && (
          <div className="mt-6 border-2 border-amber-300 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10 p-6">
            <div className="flex items-start gap-3">
              <KeyRound size={20} className="text-amber-700 dark:text-amber-300 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="font-black text-amber-900 dark:text-amber-200">Copy the token for {newTokenName} now</p>
                <p className="text-xs text-amber-800/80 dark:text-amber-200/70 mt-1">Qalt stores only a secure hash. This full token will not be shown again.</p>
                <div className="mt-4 bg-white dark:bg-[#0f0f0f] border border-amber-200 dark:border-amber-500/30 p-3 flex items-center gap-3">
                  <code className="text-xs text-slate-700 dark:text-slate-200 break-all flex-1">{newToken}</code>
                  <CopyButton value={newToken} />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="bg-white dark:bg-[#141414] border border-slate-200/70 dark:border-white/[0.07] p-7 shadow-lg shadow-slate-200/30 dark:shadow-none">
        <div className="flex items-start gap-3 mb-6">
          <Bot size={20} className="text-red-600 dark:text-red-400 mt-0.5" />
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Connect your AI platform</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
              Pick the AI your team uses and follow Qalt's setup steps. MCP platforms use the Qalt MCP server. Function-calling platforms use the Qalt API.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="border border-slate-200 dark:border-white/[0.07] p-5">
            <div className="flex items-center gap-2 mb-2"><Link2 size={16} className="text-red-600" /><p className="font-black text-slate-900 dark:text-white">Qalt MCP server</p></div>
            <code className="text-xs text-slate-500 dark:text-slate-300 break-all">{mcpUrl || "Loading…"}</code>
            <p className="text-xs text-slate-400 mt-2">Authentication: Authorization: Bearer YOUR_QALT_TOKEN</p>
            {mcpUrl && <div className="mt-3"><CopyButton value={mcpUrl} label="Copy MCP URL" /></div>}
          </div>
          <div className="border border-slate-200 dark:border-white/[0.07] p-5">
            <div className="flex items-center gap-2 mb-2"><PlugZap size={16} className="text-red-600" /><p className="font-black text-slate-900 dark:text-white">Qalt API base</p></div>
            <code className="text-xs text-slate-500 dark:text-slate-300 break-all">{apiBase || "Loading…"}</code>
            <p className="text-xs text-slate-400 mt-2">Use the same Bearer token from the secure connection above.</p>
            {apiBase && <div className="mt-3"><CopyButton value={apiBase} label="Copy API URL" /></div>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {["list_quotes", "get_quote", "analytics_summary"].map((tool) => (
            <div key={tool} className="border border-slate-200 dark:border-white/[0.07] bg-slate-50/60 dark:bg-white/[0.02] p-4">
              <code className="text-xs font-black text-slate-800 dark:text-slate-200">{tool}</code>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Live read-only Qalt tool</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {AI_PLATFORMS.map((item) => {
            const isOpen = openGuide === item.provider;
            return (
              <div key={item.provider} className="border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#141414]">
                <button
                  type="button"
                  onClick={() => setOpenGuide(isOpen ? null : item.provider)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-slate-50 dark:hover:bg-white/[0.025] transition-colors"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-black text-slate-900 dark:text-white">{item.name}</p>
                      <span className="text-[10px] font-black uppercase tracking-wide px-2 py-0.5 bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300">{item.badge}</span>
                      <span className="text-[10px] font-black uppercase tracking-wide text-slate-400">{item.method}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{item.summary}</p>
                  </div>
                  {isOpen ? <ChevronUp size={17} className="text-slate-400 shrink-0" /> : <ChevronDown size={17} className="text-slate-400 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 dark:border-white/[0.06] p-5">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">How to connect</p>
                    <ol className="space-y-3">
                      {item.steps.map((step, index) => (
                        <li key={step} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          <span className="w-6 h-6 shrink-0 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-[11px] font-black text-slate-500">{index + 1}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {item.usesMcp && mcpUrl && <CopyButton value={mcpUrl} label="Copy MCP URL" />}
                      {!item.usesMcp && apiBase && <CopyButton value={apiBase} label="Copy API URL" />}
                      <button
                        type="button"
                        onClick={() => {
                          setProvider(item.provider);
                          setConnectionName(`My ${item.name} connection`);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="text-xs font-black text-red-600 hover:text-red-500"
                      >
                        Create {item.name} connection
                      </button>
                    </div>
                    {item.note && <p className="mt-4 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 p-3">{item.note}</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.025] p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck size={18} className="text-emerald-600 dark:text-emerald-400 mt-0.5" />
            <div>
              <p className="text-sm font-black text-slate-900 dark:text-white">OAuth is the next authentication upgrade</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Qalt's current bearer-token flow is live and revocable. A future OAuth + PKCE consent flow will let supported assistants show a simple “Sign in to Qalt” experience without merchants manually copying secrets.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-[#141414] border border-slate-200/70 dark:border-white/[0.07] p-7 shadow-lg shadow-slate-200/30 dark:shadow-none">
        <div className="flex items-start gap-3 mb-5">
          <Webhook size={20} className="text-red-600 dark:text-red-400 mt-0.5" />
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Webhooks</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Webhooks push Qalt events to another business system automatically.</p>
          </div>
        </div>

        {enterpriseEnabled ? (
          <>
            <form onSubmit={addWebhook} className="flex flex-col sm:flex-row gap-3">
              <input value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} type="url" placeholder="https://your-system.com/qalt/webhook" className="flex-1 border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#141414] px-3 py-3 text-sm text-slate-800 dark:text-white" />
              <button disabled={addingWebhook} className="inline-flex justify-center items-center gap-2 bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white font-black px-5 py-3 text-sm">
                {addingWebhook ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Add Webhook
              </button>
            </form>
            <div className="mt-4 space-y-2">
              {webhooks.length === 0 ? <p className="text-sm text-slate-400 py-4">No webhooks connected yet.</p> : webhooks.map((hook) => (
                <div key={hook.id} className="border border-slate-200 dark:border-white/[0.07] p-4 flex items-center justify-between gap-4">
                  <div className="min-w-0"><p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{hook.url}</p><p className="text-xs text-slate-400 mt-1">{hook.events.join(" · ")}</p></div>
                  <span className="text-[10px] font-black uppercase tracking-wide text-emerald-600 dark:text-emerald-400">{hook.enabled ? "Active" : "Paused"}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.025] p-5 text-sm text-slate-500 dark:text-slate-400">Webhooks are available on Enterprise.</div>
        )}
      </section>

      <section className="bg-white dark:bg-[#141414] border border-slate-200/70 dark:border-white/[0.07] p-7 shadow-lg shadow-slate-200/30 dark:shadow-none">
        <div className="flex items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Integration activity</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Recent connection creation, revocation, API reads, and MCP tool calls.</p>
          </div>
          <ShieldCheck size={19} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        {activity.length === 0 ? (
          <p className="text-sm text-slate-400 py-4">No integration activity yet.</p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-white/[0.06]">
            {activity.map((item) => (
              <div key={item.id} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div><p className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.action}</p><p className="text-xs text-slate-400">{item.resource || "Qalt integration"}</p></div>
                <p className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {error && <div className="fixed bottom-6 right-6 max-w-sm bg-red-600 text-white px-5 py-4 shadow-2xl text-sm font-bold">{error}</div>}
    </div>
  );
}
