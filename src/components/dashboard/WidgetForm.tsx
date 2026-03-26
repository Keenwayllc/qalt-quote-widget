"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Settings, Save, Eye, Upload, Image as ImageIcon, RotateCcw, ExternalLink, Lock, Sparkles, Info, Globe, Trash2, CheckCircle, XCircle } from "lucide-react";
import { getEntitlements } from "@/lib/plans";
import Link from 'next/link';

import Image from "next/image";

interface WidgetProps {
  company: {
    id: string;
    name: string;
    pricingProfile: Record<string, unknown>;
    widgetSettings: {
      primaryColor: string;
      headerText: string;
      buttonText: string;
      showWeight: boolean;
      showExtras: boolean;
      disclaimerText: string;
      backgroundImageUrl?: string | null;
      logoUrl?: string | null;
      companyNameText?: string | null;
      companyNameFont?: string;
      mapLayout?: string;
      websiteUrl?: string | null;
      paymentsEnabled?: boolean;
    };
  };
}

export default function WidgetSettingsForm({
  initialData,
  companyLogoUrl,
  subscriptionPlan,
  companyId,
  formId,
  stripeConnectAccountId,
}: {
  initialData: WidgetProps['company']['widgetSettings'];
  companyLogoUrl?: string | null;
  subscriptionPlan: string;
  companyId: string;
  formId?: string;
  stripeConnectAccountId?: string | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  
  // Check for connect success/error from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("connect") === "success") {
      setMessage({ type: "success", text: "Stripe account connected successfully!" });
    } else if (urlParams.get("connect") === "error") {
      setMessage({ type: "error", text: "Failed to connect Stripe account." });
    }
  }, []);

  const entitlements = getEntitlements(subscriptionPlan);
  
  const [previewData, setPreviewData] = useState({
    ...initialData,
    backgroundImageUrl: entitlements.isAdvancedCustomizationEnabled ? initialData.backgroundImageUrl : null,
    companyNameText: initialData.companyNameText || null,
    companyNameFont: initialData.companyNameFont || "Inter",
    disclaimerText: entitlements.isAdvancedCustomizationEnabled ? initialData.disclaimerText : "Estimate only. Final price confirmed after booking.",
    mapLayout: initialData.mapLayout || "inline",
    websiteUrl: initialData.websiteUrl || "",
    paymentsEnabled: initialData.paymentsEnabled ?? false,
  });
  // Per-form logo takes priority over company logo
  const [logo, setLogo] = useState(
    entitlements.isAdvancedCustomizationEnabled
      ? (initialData?.logoUrl || companyLogoUrl || "")
      : ""
  );

  // Dynamically load the selected Google Font so the preview renders correctly
  useEffect(() => {
    const font = previewData.companyNameFont || "Inter";
    const id = `gfont-${font.replace(/\s+/g, "-")}`;
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@400;700&display=swap`;
      document.head.appendChild(link);
    }
  }, [previewData.companyNameFont]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'background') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        if (type === 'logo') {
          setLogo(data.url);
        } else {
          setPreviewData(prev => ({ ...prev, backgroundImageUrl: data.url }));
        }
      } else {
        setErrorStatus(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setErrorStatus("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    setErrorStatus(null);

    try {
      const widgetPayload = { ...previewData, formId: formId ?? null, logoUrl: logo || null };

      const requests: Promise<Response>[] = [
        fetch("/api/dashboard/widget", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(widgetPayload),
        }),
      ];

      // Only update company logo when not editing a specific form
      if (!formId) {
        requests.push(
          fetch("/api/dashboard/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ logoUrl: logo }),
          })
        );
      }

      const [resWidget, resProfile] = await Promise.all(requests);

      const data = await resWidget.json();

      if (resWidget.ok && (!resProfile || resProfile.ok)) {
        setMessage({ type: "success", text: "Widget settings updated!" });
        router.refresh();
      } else {
        setErrorStatus(data.error || "Failed to update settings.");
      }
    } catch {
      setErrorStatus("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setPreviewData(prev => ({ ...prev, [name]: val }));
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-12">
      <div className="flex-1">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Widget Appearance</h1>
          <p className="text-slate-500">Customize how your quote calculator looks on your website.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Settings className="text-blue-600" size={20} />
              Appearance & Branding
            </h2>

            {!entitlements.isAdvancedCustomizationEnabled && (
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-4 mb-6">
                <div className="p-2 bg-amber-100 rounded-lg shrink-0">
                   <Sparkles className="text-amber-600" size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-amber-900 leading-none mb-1">Unlock Pro Features</h3>
                  <p className="text-xs text-amber-700 leading-relaxed mb-2">
                    The Starter plan generates broad estimates based on ZIP code ranges. Upgrade to <strong>Pro</strong> for <strong className="text-amber-900">exact address-to-address pricing</strong> powered by Google Maps routing, plus custom logos, backgrounds, and white-labeling!
                  </p>
                  <Link href="/dashboard/billing" className="text-xs font-bold text-amber-900 underline inline-block">View Plans</Link>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Uploads */}
              <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-white border border-slate-300 rounded-lg shadow-sm">
                {/* Company Logo */}
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    Company Logo
                    {!entitlements.isAdvancedCustomizationEnabled && <Lock size={12} className="text-amber-500" />}
                  </label>
                  <div className="flex items-center gap-3">
                    {/* Thumbnail with trash overlay */}
                    <div className="relative w-14 h-14 shrink-0 group/thumb">
                      {logo ? (
                        <>
                          <Image src={logo} alt="Logo" fill className="object-contain bg-white rounded-xl border border-slate-200" unoptimized />
                          {entitlements.isAdvancedCustomizationEnabled && (
                            <button
                              type="button"
                              onClick={() => setLogo("")}
                              title="Remove logo"
                              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 group-hover/thumb:opacity-100 transition-opacity"
                            >
                              <Trash2 size={16} className="text-white" />
                            </button>
                          )}
                        </>
                      ) : (
                        <div className="w-14 h-14 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center">
                          <ImageIcon size={20} className="text-slate-300" />
                        </div>
                      )}
                    </div>
                    {/* Upload button */}
                    {!entitlements.isAdvancedCustomizationEnabled ? (
                      <button type="button" disabled className="px-4 py-2 bg-slate-50 border border-slate-200 text-sm font-medium text-slate-400 rounded-lg flex items-center gap-2">
                        <Lock size={14} /> Locked
                      </button>
                    ) : (
                      <label className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-sm font-medium text-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">
                        <Upload size={15} />
                        {logo ? "Replace" : "Upload Logo"}
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo')} />
                      </label>
                    )}
                  </div>
                  {logo && entitlements.isAdvancedCustomizationEnabled && (
                    <p className="text-[11px] text-slate-400">Hover the thumbnail to remove</p>
                  )}
                </div>

                {/* Widget Background */}
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    Widget Background
                    {!entitlements.isAdvancedCustomizationEnabled && <Lock size={12} className="text-amber-500" />}
                  </label>
                  <div className="flex items-center gap-3">
                    {/* Thumbnail with trash overlay */}
                    <div className="relative w-20 h-14 shrink-0 group/thumb">
                      {previewData.backgroundImageUrl ? (
                        <>
                          <div className="w-20 h-14 rounded-xl border border-slate-200 bg-cover bg-center" style={{ backgroundImage: `url(${previewData.backgroundImageUrl})` }} />
                          {entitlements.isAdvancedCustomizationEnabled && (
                            <button
                              type="button"
                              onClick={() => setPreviewData(prev => ({ ...prev, backgroundImageUrl: null }))}
                              title="Remove background"
                              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 group-hover/thumb:opacity-100 transition-opacity"
                            >
                              <Trash2 size={16} className="text-white" />
                            </button>
                          )}
                        </>
                      ) : (
                        <div className="w-20 h-14 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center">
                          <ImageIcon size={20} className="text-slate-300" />
                        </div>
                      )}
                    </div>
                    {/* Upload button */}
                    {!entitlements.isAdvancedCustomizationEnabled ? (
                      <button type="button" disabled className="px-4 py-2 bg-slate-50 border border-slate-200 text-sm font-medium text-slate-400 rounded-lg flex items-center gap-2">
                        <Lock size={14} /> Locked
                      </button>
                    ) : (
                      <label className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-sm font-medium text-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">
                        <Upload size={15} />
                        {previewData.backgroundImageUrl ? "Replace" : "Upload Background"}
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'background')} />
                      </label>
                    )}
                  </div>
                  {previewData.backgroundImageUrl && entitlements.isAdvancedCustomizationEnabled && (
                    <p className="text-[11px] text-slate-400">Hover the thumbnail to remove</p>
                  )}
                </div>
              </div>

              {/* Text Branding (Free Plan Option) */}
              <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-white border border-slate-300 rounded-lg shadow-sm">
                <div>
                  <label htmlFor="companyNameText" className="text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                    Company Name (Text Branding)
                  </label>
                  <input
                    id="companyNameText"
                    name="companyNameText"
                    type="text"
                    placeholder="Your Company"
                    value={previewData.companyNameText || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                    style={{ fontFamily: previewData.companyNameFont || "Inter" }}
                  />
                  <p className="text-xs text-slate-400 mt-1">Shown if no logo is uploaded</p>
                </div>
                <div>
                  <label htmlFor="companyNameFont" className="text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                    Branding Font
                  </label>
                  <select
                    id="companyNameFont"
                    name="companyNameFont"
                    value={previewData.companyNameFont || "Inter"}
                    onChange={(e) => setPreviewData(prev => ({ ...prev, companyNameFont: e.target.value }))}
                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                  >
                    <option value="Inter" style={{ fontFamily: 'Inter, sans-serif' }}>Inter (Sans)</option>
                    <option value="Roboto" style={{ fontFamily: 'Roboto, sans-serif' }}>Roboto (Clean)</option>
                    <option value="Playfair Display" style={{ fontFamily: 'Playfair Display, serif' }}>Playfair Display (Serif)</option>
                    <option value="Montserrat" style={{ fontFamily: 'Montserrat, sans-serif' }}>Montserrat (Modern)</option>
                    <option value="Outfit" style={{ fontFamily: 'Outfit, sans-serif' }}>Outfit (Tech)</option>
                    <option value="Source Code Pro" style={{ fontFamily: 'Source Code Pro, monospace' }}>Source Code Pro (Mono)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="primaryColor" className="block text-sm font-medium text-slate-700 mb-1">Primary Brand Color (Hex)</label>
                <div className="flex gap-2">
                  <div 
                    className="relative w-10 h-10 rounded-lg border border-slate-200 shrink-0 overflow-hidden cursor-pointer" 
                    style={{ backgroundColor: previewData.primaryColor }}
                  >
                     <input
                      type="color"
                      name="primaryColor"
                      value={previewData.primaryColor.length === 7 && previewData.primaryColor.startsWith('#') ? previewData.primaryColor : '#3B82F6'}
                      onChange={handleChange}
                      className="absolute inset-[-10px] w-20 h-20 opacity-0 cursor-pointer"
                      title="Pick a color"
                     />
                  </div>
                  <input
                    id="primaryColor"
                    name="primaryColor"
                    type="text"
                    required
                    placeholder="#3B82F6"
                    value={previewData.primaryColor}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm uppercase transition-all shadow-sm"
                    style={{ '--tw-ring-color': previewData.primaryColor } as React.CSSProperties}
                  />
                  <button
                    type="button"
                    onClick={() => setPreviewData((prev) => ({ ...prev, primaryColor: '#3B82F6' }))}
                    className="shrink-0 flex items-center justify-center px-3 bg-white border border-slate-300 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
                    title="Reset to default color"
                  >
                     <RotateCcw size={18} />
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="buttonText" className="block text-sm font-medium text-slate-700 mb-1">Button Text</label>
                <input
                  id="buttonText"
                  name="buttonText"
                  type="text"
                  required
                  value={previewData.buttonText}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="headerText" className="block text-sm font-medium text-slate-700 mb-1">Header Title</label>
              <input
                id="headerText"
                name="headerText"
                type="text"
                required
                value={previewData.headerText}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="mapLayout" className="block text-sm font-medium text-slate-700 mb-1">Map Output Style</label>
              <select
                id="mapLayout"
                name="mapLayout"
                value={previewData.mapLayout}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
              >
                <option value="inline">Inline (Default)</option>
                <option value="side">Side Panel Slide-out</option>
              </select>
            </div>

            {/* Website URL */}
            <div>
              <label htmlFor="websiteUrl" className="text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                <Globe size={15} className="text-slate-400" />
                Your Website URL
                <div className="relative group">
                  <Info size={14} className="text-slate-400 cursor-help" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-slate-900 text-white text-xs rounded-xl p-3.5 shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 leading-relaxed">
                    <p className="font-bold text-white mb-1.5">Why add your website URL?</p>
                    <p className="text-slate-300 mb-2">
                      When a customer finishes submitting a quote, Qalt automatically shows them a <strong className="text-white">&quot;Back to your site&quot;</strong> button — so they&apos;re never left wondering what to do next.
                    </p>
                    <p className="text-slate-300 mb-2">
                      Qalt detects this automatically when your widget is embedded, but adding your URL here acts as a <strong className="text-white">guaranteed fallback</strong> in case the browser blocks automatic detection (e.g. stricter privacy settings).
                    </p>
                    <p className="text-slate-400 text-[11px]">Example: https://yourcompany.com</p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-900" />
                  </div>
                </div>
              </label>
              <input
                id="websiteUrl"
                name="websiteUrl"
                type="url"
                placeholder="https://yourcompany.com"
                value={previewData.websiteUrl || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
              />
              <p className="text-xs text-slate-400 mt-1">Optional but recommended. Customers will see a &quot;Back to [your site]&quot; button after submitting their quote.</p>
            </div>

            <div>
              <label htmlFor="disclaimerText" className="text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                Disclaimer Text
                {!entitlements.isAdvancedCustomizationEnabled && <Lock size={12} className="text-amber-500" />}
              </label>
              <textarea
                id="disclaimerText"
                name="disclaimerText"
                rows={3}
                disabled={!entitlements.isAdvancedCustomizationEnabled}
                value={previewData.disclaimerText}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm disabled:bg-slate-50 disabled:text-slate-400"
              />
              {!entitlements.isAdvancedCustomizationEnabled && (
                <p className="text-[10px] text-amber-600 bg-amber-50 px-2 py-1 rounded w-max mt-2 font-semibold">Custom disclaimers are a Pro feature.</p>
              )}
            </div>

            <div className="flex flex-wrap gap-8">
               <label className="flex items-center gap-3 cursor-pointer">
                 <input
                   name="showWeight"
                   type="checkbox"
                   checked={previewData.showWeight}
                   onChange={handleChange}
                   className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                 />
                 <span className="text-sm font-medium text-slate-700">Show Package Weight field</span>
               </label>
               <label className="flex items-center gap-3 cursor-pointer">
                 <input
                   name="showExtras"
                   type="checkbox"
                   checked={previewData.showExtras}
                   onChange={handleChange}
                   className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                 />
                 <span className="text-sm font-medium text-slate-700">Display Extras (Stairs, etc.)</span>
               </label>
            </div>
          </div>

          {/* Payments Toggle — Enterprise Only */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="text-xl">💳</span>
              Accept Payments
              {!entitlements.isPaymentsEnabled && (
                <span className="ml-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-violet-100 text-violet-700 rounded-full">Enterprise</span>
              )}
            </h2>

            {entitlements.isPaymentsEnabled ? (
              <div className="flex flex-col gap-6">
                <p className="text-sm text-slate-500 leading-relaxed">
                  When enabled, your widget will show a <strong className="text-slate-700">&ldquo;Pay &amp; Book&rdquo;</strong> button after the estimate — your customers pay the quoted amount directly via Stripe before the booking is confirmed.
                </p>

                {/* Stripe Connect Status */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stripeConnectAccountId ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                        {stripeConnectAccountId ? <CheckCircle size={20} /> : <XCircle size={20} />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">Stripe Connection</h4>
                        <p className="text-xs text-slate-500">
                          {stripeConnectAccountId 
                            ? `Connected (ID: ${stripeConnectAccountId.substring(0, 12)}...)` 
                            : "No Stripe account linked."}
                        </p>
                      </div>
                    </div>
                    {stripeConnectAccountId ? (
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider rounded-full border border-emerald-100 italic">
                        <Sparkles size={10} /> Connected
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-wider rounded-full border border-amber-100">
                        Disconnected
                      </span>
                    )}
                  </div>

                  {!stripeConnectAccountId ? (
                    <button
                      type="button"
                      onClick={() => router.push(`/api/stripe/connect?companyId=${companyId}`)}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={16} /> Link Your Stripe Account
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => router.push(`/api/stripe/connect?companyId=${companyId}`)}
                      className="text-xs text-indigo-600 font-semibold hover:underline"
                    >
                      Reconnect or change account
                    </button>
                  )}
                </div>

                <label className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${!stripeConnectAccountId ? 'bg-slate-50/50 border-slate-100 cursor-not-allowed opacity-60' : 'bg-slate-50 border-slate-200 cursor-pointer hover:bg-slate-100'}`}>
                  <div className="relative">
                    <input
                      name="paymentsEnabled"
                      type="checkbox"
                      className="sr-only peer"
                      checked={previewData.paymentsEnabled}
                      disabled={!stripeConnectAccountId}
                      onChange={(e) => setPreviewData({ ...previewData, paymentsEnabled: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-checked:bg-emerald-500 rounded-full transition-colors" />
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Enable Pay &amp; Book</p>
                    <p className="text-xs text-slate-500 mt-0.5">Customers must pay before their booking is confirmed</p>
                  </div>
                  {!stripeConnectAccountId && (
                    <span className="text-[10px] text-amber-600 ml-auto flex items-center gap-1">
                      <Info size={10} /> Link Stripe first
                    </span>
                  )}
                </label>
                {previewData.paymentsEnabled && (
                  <div className="flex items-start gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-xs text-emerald-800">
                    <span>✅</span>
                    <span>Payments are <strong>active</strong>. Stripe will process customer payments and you&apos;ll receive a webhook confirmation on each successful booking.</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-start gap-3 p-4 bg-violet-50 border border-violet-100 rounded-xl">
                <Lock className="text-violet-500 shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-sm font-bold text-violet-900">Upgrade to Enterprise</p>
                  <p className="text-xs text-violet-700 mt-0.5 leading-relaxed">Allow your customers to pay for deliveries directly from the widget — no back-and-forth needed.</p>
                  <Link href="/dashboard/billing" className="inline-block mt-2 text-xs font-bold text-violet-900 underline">View Plans →</Link>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              <Save size={20} />
              {loading ? "Saving..." : "Save Settings"}
            </button>
            <a
              href={`/widget/${companyId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-all"
            >
              <ExternalLink size={18} />
              Preview Widget
            </a>
            
            {message.text && (
              <p className={`text-sm font-semibold ${message.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
                {message.text}
              </p>
            )}
            {errorStatus && (
              <p className="text-sm font-semibold text-red-600">
                {errorStatus}
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Live Preview */}
      <div className="w-full lg:w-96 shrink-0">
        <div className="sticky top-8">
          <div className="mb-4 flex items-center gap-2">
            <Eye className="text-slate-400" size={20} />
            <h2 className="text-lg font-bold text-slate-900">Widget Live Preview</h2>
          </div>
          <div className="bg-white rounded-2xl border-slate-200 shadow-xl overflow-hidden pointer-events-none opacity-80 scale-95 border-dashed border-2">
             <div 
               className="p-6 border-b border-slate-100 flex items-center justify-between bg-cover bg-center relative"
               style={
                 previewData.backgroundImageUrl 
                   ? { backgroundImage: `url(${previewData.backgroundImageUrl})`, minHeight: '100px' } 
                   : { backgroundColor: previewData.primaryColor, minHeight: '100px' }
               }
             >
                {/* Dark overlay if there's a background image to ensure text is readable */}
                {previewData.backgroundImageUrl && (
                  <div className="absolute inset-0 bg-slate-900/40 rounded-t-2xl" />
                )}
               <div className="relative z-10 flex flex-col gap-2">
                 {logo ? (
                   <div className="relative h-8 w-24">
                     <Image src={logo} alt="Logo" fill className="object-contain object-left" unoptimized />
                   </div>
                 ) : (
                   <div 
                     className="text-white font-bold opacity-90 text-lg"
                     style={{ fontFamily: previewData.companyNameFont || 'Inter' }}
                   >
                     {previewData.companyNameText || "Qalt"}
                   </div>
                 )}
                 <h3 className="font-bold text-white text-xl drop-shadow-md">{previewData.headerText}</h3>
               </div>
             </div>
             <div className="p-6 space-y-4">
               <div>
                  <div className="h-8 bg-slate-200 rounded-md w-full mb-2" />
                  <div className="h-8 bg-slate-200 rounded-md w-full" />
               </div>
               <div className="py-4 border-t border-slate-100">
                  <div className="w-full h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: previewData.primaryColor }}>
                    {previewData.buttonText}
                  </div>
               </div>
               <p className="text-[10px] text-slate-400 text-center leading-tight">
                 {previewData.disclaimerText}
               </p>
             </div>
          </div>
          <p className="mt-4 text-xs text-slate-400 italic text-center">
            Note: This is a simplified preview. The actual widget will be responsive and interactive.
          </p>
        </div>
      </div>
    </div>
  );
}
