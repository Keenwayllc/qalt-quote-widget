"use client";

import { useState, useEffect } from "react";
import SupportModal from "@/components/shared/SupportModal";
import { Copy, Check, ExternalLink, Eye, RefreshCw, Monitor, Smartphone, Activity, AlertCircle } from "lucide-react";

type PreviewMode = "desktop" | "mobile";

export default function EmbedCodePage() {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const [previewKey, setPreviewKey] = useState(0); // used to force iframe refresh
  const [quoteCount, setQuoteCount] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"generic" | "wordpress" | "webflow" | "shopify">("generic");

  useEffect(() => {
    async function fetchCompany() {
      try {
        const [widgetRes, countRes] = await Promise.all([
          fetch("/api/dashboard/widget"),
          fetch("/api/dashboard/quote-count"),
        ]);
        const widgetData = await widgetRes.json();
        const countData = await countRes.json();
        if (widgetData.id) setCompanyId(widgetData.id);
        if (typeof countData.count === "number") setQuoteCount(countData.count);
      } catch (err) {
        console.error("Failed to fetch company", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCompany();
  }, []);

  const widgetUrl = companyId
    ? `${typeof window !== "undefined" ? window.location.origin : "https://qalt.site"}/widget/${companyId}`
    : "";

  const embedCode = `<iframe 
  src="${widgetUrl}" 
  width="100%" 
  height="700px" 
  frameborder="0"
  style="border-radius: 24px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);"
></iframe>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        <header className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Add Qalt to Your Website</h1>
          <p className="text-slate-500 mt-3 text-base sm:text-lg font-medium">Capture more leads by embedding your smart calculator anywhere.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            {/* Embed Code Card */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Your Embed Code</h2>
                <button
                  onClick={copyToClipboard}
                  className={`
                    flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95
                    ${copied ? "bg-emerald-500 text-white" : "bg-slate-900 text-white hover:bg-slate-800"}
                  `}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy Snippet"}
                </button>
              </div>

              <div className="relative group">
                <pre className="bg-slate-900 text-slate-300 p-8 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed ring-1 ring-slate-800 shadow-2xl">
                  <code className="text-red-400">
                    {embedCode}
                  </code>
                </pre>
              </div>

              {widgetUrl && (
                <div className="mt-8 flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg text-red-600">
                      <ExternalLink size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Direct Link</p>
                      <p className="text-xs text-slate-500 truncate max-w-[200px] sm:max-w-none">{widgetUrl}</p>
                    </div>
                  </div>
                  <a
                    href={widgetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
                  >
                    Open
                  </a>
                </div>
              )}
            </div>

            {/* ── Live Widget Preview ───────────────────────────────────────────── */}
            {companyId && (
              <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-sm border border-slate-100">
                {/* Preview header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 rounded-lg text-red-600">
                      <Eye size={16} />
                    </div>
                    <div>
                      <h2 className="text-sm font-black text-slate-900">Live Widget Preview</h2>
                      <p className="text-xs text-slate-400 font-medium">This is exactly what your customers will see</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Desktop / Mobile toggle */}
                    <div className="flex items-center bg-slate-100 rounded-xl p-1">
                      <button
                        onClick={() => setPreviewMode("desktop")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          previewMode === "desktop"
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        <Monitor size={13} />
                        Desktop
                      </button>
                      <button
                        onClick={() => setPreviewMode("mobile")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          previewMode === "mobile"
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        <Smartphone size={13} />
                        Mobile
                      </button>
                    </div>
                    {/* Refresh */}
                    <button
                      onClick={() => setPreviewKey((k) => k + 1)}
                      className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                      title="Reload preview"
                    >
                      <RefreshCw size={14} />
                    </button>
                  </div>
                </div>

                {/* Browser chrome mockup */}
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
                  {/* Fake browser bar */}
                  <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex-1 bg-white rounded-lg px-3 py-1.5 text-xs text-slate-400 font-mono truncate border border-slate-200">
                      {widgetUrl}
                    </div>
                  </div>

                  {/* iframe container */}
                  <div
                    className={`bg-slate-50 flex items-start justify-center transition-all duration-300 ${
                      previewMode === "mobile" ? "py-6" : ""
                    }`}
                    style={{ minHeight: previewMode === "desktop" ? "680px" : "780px" }}
                  >
                    <div
                      className={`transition-all duration-300 ${
                        previewMode === "mobile"
                          ? "w-[390px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
                          : "w-full"
                      }`}
                    >
                      <iframe
                        key={previewKey}
                        src={widgetUrl}
                        width="100%"
                        height={previewMode === "desktop" ? "680" : "760"}
                        frameBorder="0"
                        title="Widget Preview"
                        className="block"
                      />
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-center text-xs text-slate-400 font-medium">
                  Changes to your widget appearance will reflect here after saving.{" "}
                  <button
                    onClick={() => setPreviewKey((k) => k + 1)}
                    className="text-red-600 hover:text-red-700 font-bold transition-colors"
                  >
                    Refresh preview →
                  </button>
                </p>
              </div>
            )}

            {/* Installation Guide with platform tabs */}
            <div className="bg-red-50 rounded-[32px] p-8 border border-red-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none scale-150">
                <img src="/images/qalt-icon-400.jpg" alt="" width={120} height={120} className="w-[120px] h-[120px] object-contain" />
              </div>
              <h3 className="text-xl font-black text-red-900 mb-5">Installation Guide</h3>

              {/* Platform tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(["generic", "wordpress", "webflow", "shopify"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                      activeTab === tab
                        ? "bg-red-600 text-white shadow-md"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-red-300"
                    }`}
                  >
                    {tab === "generic" ? "Any Site" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {activeTab === "generic" && (
                <ul className="space-y-5">
                  <li className="flex gap-5"><span className="shrink-0 w-8 h-8 bg-red-600 text-white text-xs font-black rounded-xl flex items-center justify-center shadow-lg shadow-red-200">1</span><div><p className="font-bold text-red-900">Copy the snippet</p><p className="text-sm text-slate-700/60 mt-0.5">Click the Copy button above to grab your unique embed code.</p></div></li>
                  <li className="flex gap-5"><span className="shrink-0 w-8 h-8 bg-red-600 text-white text-xs font-black rounded-xl flex items-center justify-center shadow-lg shadow-red-200">2</span><div><p className="font-bold text-red-900">Paste in your HTML</p><p className="text-sm text-slate-700/60 mt-0.5">Add an HTML block or custom code element wherever you want the widget to appear.</p></div></li>
                  <li className="flex gap-5"><span className="shrink-0 w-8 h-8 bg-red-600 text-white text-xs font-black rounded-xl flex items-center justify-center shadow-lg shadow-red-200">3</span><div><p className="font-bold text-red-900">Publish &amp; go live</p><p className="text-sm text-slate-700/60 mt-0.5">Save and publish. Your widget starts capturing quote requests immediately.</p></div></li>
                </ul>
              )}

              {activeTab === "wordpress" && (
                <ul className="space-y-5">
                  <li className="flex gap-5"><span className="shrink-0 w-8 h-8 bg-red-600 text-white text-xs font-black rounded-xl flex items-center justify-center shadow-lg shadow-red-200">1</span><div><p className="font-bold text-red-900">Open the page editor</p><p className="text-sm text-slate-700/60 mt-0.5">In WordPress admin, go to Pages → Edit the page where you want the widget.</p></div></li>
                  <li className="flex gap-5"><span className="shrink-0 w-8 h-8 bg-red-600 text-white text-xs font-black rounded-xl flex items-center justify-center shadow-lg shadow-red-200">2</span><div><p className="font-bold text-red-900">Add a Custom HTML block</p><p className="text-sm text-slate-700/60 mt-0.5">Click + → search "Custom HTML" → paste your embed code inside the block.</p></div></li>
                  <li className="flex gap-5"><span className="shrink-0 w-8 h-8 bg-red-600 text-white text-xs font-black rounded-xl flex items-center justify-center shadow-lg shadow-red-200">3</span><div><p className="font-bold text-red-900">Update &amp; preview</p><p className="text-sm text-slate-700/60 mt-0.5">Click Update, then Preview. The widget should appear exactly where you placed the block.</p></div></li>
                </ul>
              )}

              {activeTab === "webflow" && (
                <ul className="space-y-5">
                  <li className="flex gap-5"><span className="shrink-0 w-8 h-8 bg-red-600 text-white text-xs font-black rounded-xl flex items-center justify-center shadow-lg shadow-red-200">1</span><div><p className="font-bold text-red-900">Add an Embed element</p><p className="text-sm text-slate-700/60 mt-0.5">In the Webflow Designer, drag an Embed element from the Add panel onto your page.</p></div></li>
                  <li className="flex gap-5"><span className="shrink-0 w-8 h-8 bg-red-600 text-white text-xs font-black rounded-xl flex items-center justify-center shadow-lg shadow-red-200">2</span><div><p className="font-bold text-red-900">Paste your embed code</p><p className="text-sm text-slate-700/60 mt-0.5">Double-click the Embed element, paste your widget code, then click Save &amp; Close.</p></div></li>
                  <li className="flex gap-5"><span className="shrink-0 w-8 h-8 bg-red-600 text-white text-xs font-black rounded-xl flex items-center justify-center shadow-lg shadow-red-200">3</span><div><p className="font-bold text-red-900">Publish your site</p><p className="text-sm text-slate-700/60 mt-0.5">Click Publish → Publish to Selected Domains. Your widget is now live.</p></div></li>
                </ul>
              )}

              {activeTab === "shopify" && (
                <ul className="space-y-5">
                  <li className="flex gap-5"><span className="shrink-0 w-8 h-8 bg-red-600 text-white text-xs font-black rounded-xl flex items-center justify-center shadow-lg shadow-red-200">1</span><div><p className="font-bold text-red-900">Go to Online Store → Pages</p><p className="text-sm text-slate-700/60 mt-0.5">In Shopify admin, navigate to Online Store → Pages and open or create a page.</p></div></li>
                  <li className="flex gap-5"><span className="shrink-0 w-8 h-8 bg-red-600 text-white text-xs font-black rounded-xl flex items-center justify-center shadow-lg shadow-red-200">2</span><div><p className="font-bold text-red-900">Switch to HTML view</p><p className="text-sm text-slate-700/60 mt-0.5">Click the {"<>"} icon in the editor toolbar to switch to HTML mode, then paste your embed code.</p></div></li>
                  <li className="flex gap-5"><span className="shrink-0 w-8 h-8 bg-red-600 text-white text-xs font-black rounded-xl flex items-center justify-center shadow-lg shadow-red-200">3</span><div><p className="font-bold text-red-900">Save &amp; view page</p><p className="text-sm text-slate-700/60 mt-0.5">Click Save, then View Page to confirm the widget is rendering correctly.</p></div></li>
                </ul>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">

            {/* Widget Health Check */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Widget Status</h3>
              {quoteCount > 0 ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                    <Activity size={18} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-sm">Active</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">{quoteCount} quote{quoteCount !== 1 ? "s" : ""} received — widget is live</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                    <AlertCircle size={18} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-sm">Not detected yet</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">Embed the code below and submit a test quote to verify</p>
                  </div>
                </div>
              )}
            </div>

            {/* Need help card */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Need help?</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-8">Not sure where to paste the code? Our team can help you get it installed in minutes.</p>
              <button
                onClick={() => setIsSupportModalOpen(true)}
                className="w-full py-4 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
              >
                Contact Support
              </button>
            </div>

            {/* Quick tip card */}
            <div className="bg-red-600 rounded-[32px] p-7 text-white shadow-xl shadow-red-200">
              <p className="text-xs font-black uppercase tracking-widest text-red-200 mb-3">Pro tip</p>
              <p className="text-sm font-medium text-red-100 leading-relaxed">
                Use the <strong className="text-white">Desktop / Mobile</strong> toggle in the preview to make sure your widget looks great on all screen sizes before embedding.
              </p>
            </div>
          </div>
        </div>
      </div>

      <SupportModal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} />
    </>
  );
}
