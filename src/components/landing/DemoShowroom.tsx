"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";
import Link from "next/link";
import QuoteWidgetForm from "@/components/widget/QuoteWidgetForm";

type DemoCompany = ComponentProps<typeof QuoteWidgetForm>["company"];
const TEMPLATES = [
  { style: "standard", name: "Standard", detail: "Guided route, shipment and contact details." },
  { style: "extended", name: "Extended", detail: "Delivery details plus your own questions." },
  { style: "quick", name: "Vehicle Options", detail: "Visual vehicle choices and instant pricing." },
] as const;

export default function DemoShowroom({ companies, fullSize = false }: { companies: DemoCompany[]; fullSize?: boolean }) {
  const [selectedId, setSelectedId] = useState(() => companies.find(c => c.widgetSettings.formStyle === "quick")?.formId ?? companies[0]?.formId);
  const [color, setColor] = useState("#dc2626");
  const [mapLayout, setMapLayout] = useState("side");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoError, setLogoError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const selected = companies.find(c => c.formId === selectedId) ?? companies[0];

  useEffect(() => {
    if (!logoUrl) return;
    return () => URL.revokeObjectURL(logoUrl);
  }, [logoUrl]);

  function previewLogo(file?: File) {
    setLogoError("");
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 2 * 1024 * 1024) {
      setLogoError("Choose a PNG, JPG or WebP image up to 2 MB.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setLogoUrl(URL.createObjectURL(file));
  }

  if (!selected) return null;
  const previewCompany: DemoCompany = {
    ...selected,
    logoBackdrop: logoUrl ? "light" : selected.logoBackdrop,
    logoUrl: logoUrl ?? selected.logoUrl,
    widgetSettings: {
      ...selected.widgetSettings,
      logoUrl: logoUrl ?? selected.widgetSettings.logoUrl,
      primaryColor: color,
      mapLayout,
    },
  };

  return (
    <div className="w-full min-w-0">
      <div className="mb-8 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-red-600">Your form, your brand</p>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-950">Try all three Qalt templates</h3>
            <p className="mt-1 text-sm text-slate-500">These are the same forms you configure in the dashboard.</p>
          </div>
          {!fullSize && <Link href="/demo/try" className="inline-flex items-center rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">Open full-size demo</Link>}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3" aria-label="Form templates">
          {TEMPLATES.map(template => {
            const company = companies.find(c => c.widgetSettings.formStyle === template.style);
            if (!company) return null;
            const active = selected.formId === company.formId;
            return <button key={template.style} type="button" aria-pressed={active} onClick={() => setSelectedId(company.formId)} className={`rounded-lg border p-4 text-left transition-colors ${active ? "border-red-600 bg-red-50" : "border-slate-200 bg-white hover:border-slate-400"}`}>
              <span className="block text-sm font-bold text-slate-900">{template.name}</span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">{template.detail}</span>
            </button>;
          })}
        </div>
        <div className="mt-5 flex flex-wrap items-end gap-5 border-t border-slate-100 pt-5">
          <div>
            <label htmlFor="demo-logo" className="block text-xs font-semibold text-slate-700">Preview your logo</label>
            <input ref={inputRef} id="demo-logo" type="file" accept="image/png,image/jpeg,image/webp" onChange={e => previewLogo(e.target.files?.[0])} className="mt-2 max-w-full text-xs text-slate-600 file:mr-3 file:rounded-md file:border file:border-slate-200 file:bg-white file:px-3 file:py-2 file:font-semibold file:text-slate-800" />
            {logoUrl && <button type="button" onClick={() => { setLogoUrl(null); if (inputRef.current) inputRef.current.value = ""; }} className="mt-2 block text-xs font-semibold text-slate-600 underline">Remove preview logo</button>}
          </div>
          <label className="text-xs font-semibold text-slate-700">Brand color<input aria-label="Brand color" type="color" value={color} onChange={e => setColor(e.target.value)} className="mt-2 block h-9 w-14 cursor-pointer rounded-md border border-slate-200 bg-white p-1" /></label>
          <label htmlFor="demo-map-layout" className="text-xs font-semibold text-slate-700">Route map<select id="demo-map-layout" value={mapLayout} onChange={e => setMapLayout(e.target.value)} className="mt-2 block rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900"><option value="side">Expanding side panel</option><option value="inline">Inline map</option></select></label>
        </div>
        {logoError && <p role="alert" className="mt-3 text-sm text-red-600">{logoError}</p>}
        <p className="mt-4 text-xs leading-5 text-slate-500">Your logo stays in this browser and is not uploaded or saved. The map appears after a valid route is priced. On phones, the side map stacks below the form. Each template keeps its own sample quote.</p>
      </div>
      <QuoteWidgetForm key={selected.formId} company={previewCompany} demoMode />
    </div>
  );
}
