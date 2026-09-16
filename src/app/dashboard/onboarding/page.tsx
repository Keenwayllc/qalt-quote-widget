"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, CreditCard, ExternalLink, Loader2, Rocket } from "lucide-react";

type SetupData = {
  company: {
    name: string;
    email: string;
    phone: string | null;
    website: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    timezone: string;
    businessType: string | null;
    onboardingStep: number;
    onboardingCompletedAt: string | null;
    stripeConnectAccountId: string | null;
    subscriptionPlan: string;
  };
  pricing: { baseRatePerMile: number; minimumCharge: number; useMinimumCharge: boolean } | null;
  widget: {
    id: string;
    primaryColor: string;
    buttonText: string;
    headerText: string;
    companyNameText: string | null;
    geoFencingEnabled: boolean;
    serviceZips: string[];
    paymentsEnabled: boolean;
  } | null;
};

const labels = ["Company", "Service area", "Pricing", "Branding", "Payments", "Publish"];
const businessTypes = ["Courier / Same-day", "Furniture delivery", "Appliance delivery", "Medical delivery", "Final-mile delivery", "Freight / Cargo", "Moving / Labor", "Other"];
const inputClass = "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-900/5 dark:border-white/10 dark:bg-white/5 dark:text-white";

export default function OnboardingPage() {
  const [data, setData] = useState<SetupData | null>(null);
  const [step, setStep] = useState(1);
  const [zipText, setZipText] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/dashboard/onboarding")
      .then(async (res) => {
        if (!res.ok) throw new Error();
        return res.json() as Promise<SetupData>;
      })
      .then((payload) => {
        setData(payload);
        setStep(Math.max(1, Math.min(6, payload.company.onboardingStep || 1)));
        setZipText(payload.widget?.serviceZips.join(", ") ?? "");
      })
      .catch(() => setError("We could not load your setup. Refresh and try again."));
  }, []);

  const parsedZips = useMemo(() => zipText.split(/[\s,]+/).map((value) => value.trim()).filter((value) => /^\d{5}(-\d{4})?$/.test(value)), [zipText]);

  if (!data) {
    return <div className="grid min-h-[70vh] place-items-center"><div className="text-center"><Loader2 className="mx-auto h-7 w-7 animate-spin text-red-600" /><p className="mt-3 text-sm font-semibold text-slate-500">Loading your setup...</p>{error && <p className="mt-2 text-sm text-rose-600">{error}</p>}</div></div>;
  }

  const updateCompany = (key: keyof SetupData["company"], value: string) => setData((current) => current ? { ...current, company: { ...current.company, [key]: value } } : current);
  const updatePricing = (key: "baseRatePerMile" | "minimumCharge", value: string) => setData((current) => current?.pricing ? { ...current, pricing: { ...current.pricing, [key]: Number(value) || 0 } } : current);
  const updateWidget = (key: "primaryColor" | "buttonText" | "headerText" | "companyNameText", value: string) => setData((current) => current?.widget ? { ...current, widget: { ...current.widget, [key]: value } } : current);

  async function save(targetStep: number, complete = false) {
    if (!data) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/dashboard/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: targetStep,
          complete,
          company: {
            name: data.company.name,
            phone: data.company.phone,
            website: data.company.website,
            city: data.company.city,
            state: data.company.state,
            zip: data.company.zip,
            timezone: data.company.timezone,
            businessType: data.company.businessType,
          },
          pricing: data.pricing,
          widget: data.widget ? {
            primaryColor: data.widget.primaryColor,
            buttonText: data.widget.buttonText,
            headerText: data.widget.headerText,
            companyNameText: data.widget.companyNameText,
            serviceZips: parsedZips,
          } : undefined,
        }),
      });
      if (!res.ok) throw new Error();
      if (complete) {
        window.location.href = "/dashboard?setup=complete";
        return;
      }
      setStep(targetStep);
    } catch {
      setError("Your changes were not saved. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><div className="text-[11px] font-black uppercase tracking-[0.18em] text-red-600">Qalt setup</div><h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white">Launch your quote flow</h1><p className="mt-2 text-sm font-medium text-slate-500">Finish the essentials, then publish your first form.</p></div>
        <Link href="/dashboard" className="text-sm font-bold text-slate-500">Finish later</Link>
      </div>

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#111111]">
        <div className="mb-3 flex justify-between text-xs font-bold text-slate-500"><span>Step {step} of 6</span><span>{Math.round((step / 6) * 100)}%</span></div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10"><div className="h-full bg-red-600 transition-all" style={{ width: `${(step / 6) * 100}%` }} /></div>
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">{labels.map((label, index) => { const n = index + 1; return <button key={label} type="button" onClick={() => n <= step && setStep(n)} className={`rounded-xl px-2 py-2 text-[10px] font-black ${n === step ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300" : "text-slate-400"}`}>{n < step ? <Check size={13} className="mx-auto mb-1 text-emerald-600" /> : <span className="mb-1 block">{n}</span>}{label}</button>; })}</div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_330px]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#111111] sm:p-8">
          {step === 1 && <Step title="Your delivery business" text="Use the business details customers should recognize."><div className="grid gap-5 sm:grid-cols-2"><Field label="Company name"><input className={inputClass} value={data.company.name} onChange={(e) => updateCompany("name", e.target.value)} /></Field><Field label="Business type"><select className={inputClass} value={data.company.businessType ?? ""} onChange={(e) => updateCompany("businessType", e.target.value)}><option value="">Select type</option>{businessTypes.map((type) => <option key={type}>{type}</option>)}</select></Field><Field label="Phone"><input className={inputClass} value={data.company.phone ?? ""} onChange={(e) => updateCompany("phone", e.target.value)} /></Field><Field label="Website"><input className={inputClass} value={data.company.website ?? ""} onChange={(e) => updateCompany("website", e.target.value)} placeholder="https://yourcompany.com" /></Field><Field label="City"><input className={inputClass} value={data.company.city ?? ""} onChange={(e) => updateCompany("city", e.target.value)} /></Field><div className="grid grid-cols-2 gap-3"><Field label="State"><input className={inputClass} value={data.company.state ?? ""} onChange={(e) => updateCompany("state", e.target.value)} /></Field><Field label="ZIP"><input className={inputClass} value={data.company.zip ?? ""} onChange={(e) => updateCompany("zip", e.target.value)} /></Field></div></div></Step>}

          {step === 2 && <Step title="Where do you deliver?" text="Add service ZIP codes. Leave the field blank when you do not want a ZIP restriction."><Field label="Service ZIP codes"><textarea rows={7} className={`${inputClass} h-auto py-3`} value={zipText} onChange={(e) => setZipText(e.target.value)} placeholder="90012, 91401, 91505" /></Field><p className="mt-3 text-xs font-semibold text-slate-400">{parsedZips.length} valid ZIP {parsedZips.length === 1 ? "entry" : "entries"}</p></Step>}

          {step === 3 && data.pricing && <Step title="Set your starting price" text="These values update the pricing profile used by your default form."><div className="grid gap-5 sm:grid-cols-2"><Field label="Rate per mile"><input type="number" min="0" step="0.01" className={inputClass} value={data.pricing.baseRatePerMile} onChange={(e) => updatePricing("baseRatePerMile", e.target.value)} /></Field><Field label="Minimum job charge"><input type="number" min="0" step="0.01" className={inputClass} value={data.pricing.minimumCharge} onChange={(e) => updatePricing("minimumCharge", e.target.value)} /></Field></div><Link href="/dashboard/pricing" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-red-600">Advanced pricing <ExternalLink size={14} /></Link></Step>}

          {step === 4 && data.widget && <Step title="Make the quote form yours" text="Set the core brand details now. Full appearance controls stay available after setup."><div className="grid gap-5 sm:grid-cols-2"><Field label="Brand color"><div className="flex gap-3"><input type="color" className="h-12 w-14 rounded-xl border border-slate-200 p-1" value={data.widget.primaryColor} onChange={(e) => updateWidget("primaryColor", e.target.value)} /><input className={inputClass} value={data.widget.primaryColor} onChange={(e) => updateWidget("primaryColor", e.target.value)} /></div></Field><Field label="Company name on form"><input className={inputClass} value={data.widget.companyNameText ?? data.company.name} onChange={(e) => updateWidget("companyNameText", e.target.value)} /></Field><Field label="Form heading"><input className={inputClass} value={data.widget.headerText} onChange={(e) => updateWidget("headerText", e.target.value)} /></Field><Field label="Quote button"><input className={inputClass} value={data.widget.buttonText} onChange={(e) => updateWidget("buttonText", e.target.value)} /></Field></div></Step>}

          {step === 5 && <Step title="Payments" text="Your quote form works before payment setup is finished."><div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5"><div className="flex gap-4"><div className={`grid h-11 w-11 place-items-center rounded-xl ${data.company.stripeConnectAccountId ? "bg-emerald-100 text-emerald-700" : "bg-white text-slate-500"}`}><CreditCard size={20} /></div><div><div className="font-black text-slate-900 dark:text-white">{data.company.stripeConnectAccountId ? "Payment account connected" : "Connect payments when ready"}</div><p className="mt-1 text-sm font-medium text-slate-500">Manage Stripe and account settings from your dashboard.</p><Link href="/dashboard/settings" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-red-600">Account settings <ExternalLink size={14} /></Link></div></div></div></Step>}

          {step === 6 && data.widget && <Step title="Ready to publish" text="Review the essentials, preview the form, then finish setup."><div className="grid gap-3 sm:grid-cols-2"><Summary label="Business" value={data.company.name} /><Summary label="Service area" value={parsedZips.length ? `${parsedZips.length} ZIP codes` : "No ZIP restriction"} /><Summary label="Rate" value={`$${(data.pricing?.baseRatePerMile ?? 0).toFixed(2)} / mile`} /><Summary label="Minimum" value={`$${(data.pricing?.minimumCharge ?? 0).toFixed(2)}`} /></div><div className="mt-5 flex flex-wrap gap-3"><a href={`/widget/form/${data.widget.id}`} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-black">Preview form</a><Link href="/dashboard/embed" className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-black">Get embed code</Link></div></Step>}

          {error && <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{error}</div>}
          <div className="mt-8 flex justify-between border-t border-slate-100 pt-6 dark:border-white/10"><button type="button" disabled={step === 1 || saving} onClick={() => save(Math.max(1, step - 1))} className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-black text-slate-500 disabled:opacity-30"><ArrowLeft size={16} /> Back</button>{step < 6 ? <button type="button" disabled={saving || (step === 1 && !data.company.name.trim())} onClick={() => save(step + 1)} className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white disabled:opacity-50">{saving && <Loader2 size={16} className="animate-spin" />} Save & continue <ArrowRight size={16} /></button> : <button type="button" disabled={saving} onClick={() => save(6, true)} className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white disabled:opacity-50">{saving ? <Loader2 size={16} className="animate-spin" /> : <Rocket size={16} />} Finish setup</button>}</div>
        </section>

        <aside className="rounded-3xl bg-[#17191e] p-6 text-white"><div className="text-[10px] font-black uppercase tracking-[0.18em] text-red-300">Live preview</div><h3 className="mt-2 text-xl font-black">Your quote experience</h3><div className="mt-5 rounded-2xl bg-white p-4 text-slate-900"><div className="text-xs font-black" style={{ color: data.widget?.primaryColor ?? "#df1731" }}>{data.widget?.companyNameText || data.company.name}</div><div className="mt-1 text-lg font-black">{data.widget?.headerText ?? "Delivery Quote Calculator"}</div><div className="mt-4 space-y-2"><div className="h-10 rounded-xl border bg-slate-50" /><div className="h-10 rounded-xl border bg-slate-50" /><div className="grid h-11 place-items-center rounded-xl text-sm font-black text-white" style={{ backgroundColor: data.widget?.primaryColor ?? "#df1731" }}>{data.widget?.buttonText ?? "Get Instant Quote"}</div></div></div><div className="mt-6 space-y-3 text-sm font-semibold text-white/70"><div className="flex items-center gap-2"><Check size={15} className="text-emerald-400" /> Uses your existing pricing profile</div><div className="flex items-center gap-2"><Check size={15} className="text-emerald-400" /> Saves progress between steps</div><div className="flex items-center gap-2"><Check size={15} className="text-emerald-400" /> Publishes the existing default form</div></div></aside>
      </div>
    </div>
  );
}

function Step({ title, text, children }: { title: string; text: string; children: React.ReactNode }) {
  return <div><h2 className="text-2xl font-black text-slate-950 dark:text-white">{title}</h2><p className="mt-2 mb-7 text-sm font-medium leading-6 text-slate-500">{text}</p>{children}</div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-200">{label}</span>{children}</label>;
}

function Summary({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5"><div className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</div><div className="mt-1 text-sm font-black text-slate-900 dark:text-white">{value}</div></div>;
}
