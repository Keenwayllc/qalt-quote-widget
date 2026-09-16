"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CreditCard,
  DollarSign,
  ExternalLink,
  Loader2,
  MapPin,
  Palette,
  Rocket,
} from "lucide-react";

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
  pricing: {
    baseRatePerMile: number;
    minimumCharge: number;
    useMinimumCharge: boolean;
  } | null;
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

const steps = [
  { label: "Company", icon: Building2 },
  { label: "Service area", icon: MapPin },
  { label: "Pricing", icon: DollarSign },
  { label: "Branding", icon: Palette },
  { label: "Payments", icon: CreditCard },
  { label: "Publish", icon: Rocket },
];

const businessTypes = [
  "Courier / Same-day",
  "Furniture delivery",
  "Appliance delivery",
  "Medical delivery",
  "Final-mile delivery",
  "Freight / Cargo",
  "Moving / Labor",
  "Other",
];

export default function OnboardingPage() {
  const [data, setData] = useState<SetupData | null>(null);
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [zipText, setZipText] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/dashboard/onboarding")
      .then(async (res) => {
        if (!res.ok) throw new Error("Unable to load setup");
        return res.json();
      })
      .then((payload: SetupData) => {
        if (!active) return;
        setData(payload);
        setStep(Math.max(1, Math.min(6, payload.company.onboardingStep || 1)));
        setZipText(payload.widget?.serviceZips?.join(", ") ?? "");
      })
      .catch(() => active && setError("We could not load your setup. Refresh and try again."));
    return () => {
      active = false;
    };
  }, []);

  const progress = useMemo(() => Math.round((step / 6) * 100), [step]);

  if (!data) {
    return (
      <div className="min-h-[70vh] grid place-items-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-7 w-7 animate-spin text-red-600" />
          <p className="mt-3 text-sm font-semibold text-slate-500">Loading your setup...</p>
          {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
        </div>
      </div>
    );
  }

  const updateCompany = (key: keyof SetupData["company"], value: string) => {
    setData((current) => current ? { ...current, company: { ...current.company, [key]: value } } : current);
  };

  const updatePricing = (key: "baseRatePerMile" | "minimumCharge", value: string) => {
    const number = Number(value);
    setData((current) => current && current.pricing
      ? { ...current, pricing: { ...current.pricing, [key]: Number.isFinite(number) ? number : 0 } }
      : current);
  };

  const updateWidget = (key: "primaryColor" | "buttonText" | "headerText" | "companyNameText", value: string) => {
    setData((current) => current && current.widget
      ? { ...current, widget: { ...current.widget, [key]: value } }
      : current);
  };

  const parsedZips = zipText
    .split(/[\s,]+/)
    .map((value) => value.trim())
    .filter(Boolean);

  async function save(targetStep: number, complete = false) {
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
      if (!res.ok) throw new Error("save failed");
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

  const next = () => save(Math.min(6, step + 1));
  const back = () => save(Math.max(1, step - 1));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-[11px] font-black uppercase tracking-[0.18em] text-red-600">Qalt setup</div>
          <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:text-4xl">Launch your quote flow</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">Set your business, service area, pricing, brand, payments, and publish settings in one guided flow.</p>
        </div>
        <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white">Finish later</Link>
      </div>

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#111111]">
        <div className="mb-3 flex items-center justify-between text-xs font-bold text-slate-500">
          <span>Step {step} of 6</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
          <div className="h-full rounded-full bg-red-600 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {steps.map((item, index) => {
            const number = index + 1;
            const done = number < step;
            const active = number === step;
            return (
              <button key={item.label} type="button" onClick={() => number <= step && setStep(number)} className={`rounded-xl px-2 py-3 text-center transition ${active ? "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300" : "text-slate-400"}`}>
                <div className={`mx-auto mb-1 grid h-7 w-7 place-items-center rounded-full ${done ? "bg-emerald-100 text-emerald-700" : active ? "bg-red-600 text-white" : "bg-slate-100 dark:bg-white/10"}`}>
                  {done ? <Check size={14} /> : <item.icon size={14} />}
                </div>
                <span className="text-[10px] font-black">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#111111] sm:p-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">Your delivery business</h2>
              <p className="mt-2 text-sm font-medium text-slate-500">Qalt uses this information across your merchant account and customer experience.</p>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field label="Company name"><input value={data.company.name} onChange={(e) => updateCompany("name", e.target.value)} className={inputClass} /></Field>
                <Field label="Business type"><select value={data.company.businessType ?? ""} onChange={(e) => updateCompany("businessType", e.target.value)} className={inputClass}><option value="">Select type</option>{businessTypes.map((type) => <option key={type}>{type}</option>)}</select></Field>
                <Field label="Phone"><input value={data.company.phone ?? ""} onChange={(e) => updateCompany("phone", e.target.value)} className={inputClass} placeholder="(555) 555-0123" /></Field>
                <Field label="Website"><input value={data.company.website ?? ""} onChange={(e) => updateCompany("website", e.target.value)} className={inputClass} placeholder="https://yourcompany.com" /></Field>
                <Field label="City"><input value={data.company.city ?? ""} onChange={(e) => updateCompany("city", e.target.value)} className={inputClass} /></Field>
                <div className="grid grid-cols-2 gap-3"><Field label="State"><input value={data.company.state ?? ""} onChange={(e) => updateCompany("state", e.target.value)} className={inputClass} /></Field><Field label="ZIP"><input value={data.company.zip ?? ""} onChange={(e) => updateCompany("zip", e.target.value)} className={inputClass} /></Field></div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">Where do you deliver?</h2>
              <p className="mt-2 text-sm font-medium text-slate-500">Add ZIP codes to keep instant quotes inside your normal service area. Leave this blank if you serve any route.</p>
              <Field label="Service ZIP codes" className="mt-7"><textarea value={zipText} onChange={(e) => setZipText(e.target.value)} rows={7} className={inputClass} placeholder="90012, 91401, 91505" /></Field>
              <p className="mt-3 text-xs font-semibold text-slate-400">Separate ZIP codes with commas or spaces. {parsedZips.length} valid entr{parsedZips.length === 1 ? "y" : "ies"} detected.</p>
            </div>
          )}

          {step === 3 && data.pricing && (
            <div>
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">Set your starting price</h2>
              <p className="mt-2 text-sm font-medium text-slate-500">These values update the pricing profile your default quote form uses.</p>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field label="Rate per mile"><div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span><input type="number" min="0" step="0.01" value={data.pricing.baseRatePerMile} onChange={(e) => updatePricing("baseRatePerMile", e.target.value)} className={`${inputClass} pl-8`} /></div></Field>
                <Field label="Minimum job charge"><div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span><input type="number" min="0" step="0.01" value={data.pricing.minimumCharge} onChange={(e) => updatePricing("minimumCharge", e.target.value)} className={`${inputClass} pl-8`} /></div></Field>
              </div>
              <Link href="/dashboard/pricing" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-red-600">Open advanced pricing <ExternalLink size={14} /></Link>
            </div>
          )}

          {step === 4 && data.widget && (
            <div>
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">Make the quote form yours</h2>
              <p className="mt-2 text-sm font-medium text-slate-500">Start with the core brand controls. You still have full appearance settings after setup.</p>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Field label="Brand color"><div className="flex gap-3"><input type="color" value={data.widget.primaryColor} onChange={(e) => updateWidget("primaryColor", e.target.value)} className="h-12 w-14 rounded-xl border border-slate-200 bg-white p-1" /><input value={data.widget.primaryColor} onChange={(e) => updateWidget("primaryColor", e.target.value)} className={inputClass} /></div></Field>
                <Field label="Company name on form"><input value={data.widget.companyNameText ?? data.company.name} onChange={(e) => updateWidget("companyNameText", e.target.value)} className={inputClass} /></Field>
                <Field label="Form heading"><input value={data.widget.headerText} onChange={(e) => updateWidget("headerText", e.target.value)} className={inputClass} /></Field>
                <Field label="Quote button"><input value={data.widget.buttonText} onChange={(e) => updateWidget("buttonText", e.target.value)} className={inputClass} /></Field>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">Payments</h2>
              <p className="mt-2 text-sm font-medium text-slate-500">Choose when you want to finish payment setup. Your quote form works without collecting payment.</p>
              <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-start gap-4">
                  <div className={`grid h-11 w-11 place-items-center rounded-2xl ${data.company.stripeConnectAccountId ? "bg-emerald-100 text-emerald-700" : "bg-white text-slate-500 dark:bg-white/10"}`}><CreditCard size={20} /></div>
                  <div className="flex-1">
                    <h3 className="font-black text-slate-900 dark:text-white">{data.company.stripeConnectAccountId ? "Payment account connected" : "Connect payments when you are ready"}</h3>
                    <p className="mt-1 text-sm font-medium leading-6 text-slate-500">Qalt keeps payment setup separate from pricing so you do not have to block launch on Stripe configuration.</p>
                    <Link href="/dashboard/settings" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-red-600">Open account settings <ExternalLink size={14} /></Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 6 && data.widget && (
            <div>
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">Ready to publish</h2>
              <p className="mt-2 text-sm font-medium text-slate-500">Your default quote flow is ready for a final check.</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <Summary label="Business" value={data.company.name} />
                <Summary label="Service area" value={parsedZips.length ? `${parsedZips.length} ZIP codes` : "No ZIP restriction"} />
                <Summary label="Rate" value={`$${(data.pricing?.baseRatePerMile ?? 0).toFixed(2)} / mile`} />
                <Summary label="Minimum" value={`$${(data.pricing?.minimumCharge ?? 0).toFixed(2)}`} />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`/widget/${data.widget.id}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5">Preview form <ExternalLink size={15} /></a>
                <Link href="/dashboard/embed" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5">Get embed code <ExternalLink size={15} /></Link>
              </div>
            </div>
          )}

          {error && <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{error}</div>}

          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6 dark:border-white/10">
            <button type="button" disabled={step === 1 || saving} onClick={back} className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-black text-slate-500 hover:bg-slate-50 disabled:opacity-30 dark:hover:bg-white/5"><ArrowLeft size={16} /> Back</button>
            {step < 6 ? (
              <button type="button" disabled={saving || (step === 1 && !data.company.name.trim())} onClick={next} className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white hover:bg-red-700 disabled:opacity-50">{saving ? <Loader2 size={16} className="animate-spin" /> : null} Save & continue <ArrowRight size={16} /></button>
            ) : (
              <button type="button" disabled={saving} onClick={() => save(6, true)} className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white hover:bg-red-700 disabled:opacity-50">{saving ? <Loader2 size={16} className="animate-spin" /> : <Rocket size={16} />} Finish setup</button>
            )}
          </div>
        </section>

        <aside className="rounded-3xl bg-[#17191e] p-6 text-white shadow-sm">
          <div className="text-[10px] font-black uppercase tracking-[0.18em] text-red-300">Live preview</div>
          <h3 className="mt-2 text-xl font-black">Your quote experience</h3>
          <div className="mt-5 rounded-2xl bg-white p-4 text-slate-900 shadow-xl">
            <div className="text-xs font-black" style={{ color: data.widget?.primaryColor ?? "#df1731" }}>{data.widget?.companyNameText || data.company.name}</div>
            <div className="mt-1 text-lg font-black">{data.widget?.headerText ?? "Delivery Quote Calculator"}</div>
            <div className="mt-4 space-y-2">
              <div className="h-10 rounded-xl border border-slate-200 bg-slate-50" />
              <div className="h-10 rounded-xl border border-slate-200 bg-slate-50" />
              <button type="button" className="mt-2 h-11 w-full rounded-xl text-sm font-black text-white" style={{ backgroundColor: data.widget?.primaryColor ?? "#df1731" }}>{data.widget?.buttonText ?? "Get Instant Quote"}</button>
            </div>
          </div>
          <div className="mt-6 space-y-3 text-sm font-semibold text-white/70">
            <div className="flex items-center gap-2"><Check size={15} className="text-emerald-400" /> Uses your real pricing profile</div>
            <div className="flex items-center gap-2"><Check size={15} className="text-emerald-400" /> Saves directly to your merchant settings</div>
            <div className="flex items-center gap-2"><Check size={15} className="text-emerald-400" /> Resume setup from any step</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

const inputClass = "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-900/5 dark:border-white/10 dark:bg-white/5 dark:text-white";

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return <label className={`block ${className}`}><span className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-200">{label}</span>{children}</label>;
}

function Summary({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5"><div className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</div><div className="mt-1 text-sm font-black text-slate-900 dark:text-white">{value}</div></div>;
}
