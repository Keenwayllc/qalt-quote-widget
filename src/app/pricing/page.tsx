"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Minus, ChevronDown, ChevronUp, Calculator, TrendingUp, Users, DollarSign } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Plan = "starter" | "pro" | "enterprise";
type FeatureValue = boolean | string;

interface FeatureRow {
  name: string;
  starter: FeatureValue;
  pro: FeatureValue;
  enterprise: FeatureValue;
}

interface FeatureSection {
  title: string;
  rows: FeatureRow[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLANS: Record<Plan, { monthly: number; annual: number }> = {
  starter: { monthly: 0, annual: 0 },
  pro:     { monthly: 39, annual: 29 },
  enterprise: { monthly: 99, annual: 79 },
};

const FEATURE_SECTIONS: FeatureSection[] = [
  {
    title: "Quote Widget",
    rows: [
      { name: "Embeddable quote widgets",              starter: "1",          pro: "Unlimited",  enterprise: "Unlimited"  },
      { name: "Quotes per month",                      starter: "50",         pro: "Unlimited",  enterprise: "Unlimited"  },
      { name: "Multi-step quote form",                 starter: true,         pro: true,         enterprise: true         },
      { name: "Instant price calculation",             starter: true,         pro: true,         enterprise: true         },
      { name: "Lead capture & storage",                starter: true,         pro: true,         enterprise: true         },
      { name: "Custom pricing rules",                  starter: false,        pro: true,         enterprise: true         },
      { name: "Distance-based pricing (Google Maps)",  starter: false,        pro: true,         enterprise: true         },
      { name: "Weight & dimension pricing",            starter: false,        pro: true,         enterprise: true         },
    ],
  },
  {
    title: "Branding & Customization",
    rows: [
      { name: "White-label (no Qalt branding)",  starter: false, pro: true,  enterprise: true  },
      { name: "Custom colors & fonts",            starter: false, pro: true,  enterprise: true  },
      { name: "Custom logo",                      starter: false, pro: true,  enterprise: true  },
      { name: "Custom domain embed",              starter: true,  pro: true,  enterprise: true  },
      { name: "Custom success messages",          starter: false, pro: true,  enterprise: true  },
      { name: "Fully custom CSS",                 starter: false, pro: false, enterprise: true  },
    ],
  },
  {
    title: "Analytics & Reporting",
    rows: [
      { name: "Quote volume dashboard",       starter: false, pro: true,  enterprise: true  },
      { name: "Lead conversion tracking",     starter: false, pro: true,  enterprise: true  },
      { name: "Drop-off funnel analysis",     starter: false, pro: true,  enterprise: true  },
      { name: "Revenue pipeline estimates",   starter: false, pro: true,  enterprise: true  },
      { name: "Custom report builder",        starter: false, pro: false, enterprise: true  },
      { name: "Data export (CSV / API)",      starter: false, pro: true,  enterprise: true  },
    ],
  },
  {
    title: "Integrations",
    rows: [
      { name: "Email notifications",   starter: true,  pro: true,  enterprise: true  },
      { name: "Webhook on new quote",  starter: false, pro: true,  enterprise: true  },
    ],
  },
  {
    title: "Support",
    rows: [
      { name: "Email support",                 starter: true,  pro: true,  enterprise: true  },
      { name: "Priority support",              starter: false, pro: true,  enterprise: true  },
      { name: "Onboarding call",               starter: false, pro: false, enterprise: true  },
      { name: "Dedicated account manager",     starter: false, pro: false, enterprise: true  },
      { name: "SLA & uptime guarantee",        starter: false, pro: false, enterprise: true  },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FeatureCell({ value }: { value: FeatureValue }) {
  if (typeof value === "string") {
    return <span className="text-sm font-bold text-slate-700">{value}</span>;
  }
  if (value === true) {
    return <CheckCircle2 size={18} className="text-blue-600 mx-auto" />;
  }
  return <Minus size={16} className="text-slate-300 mx-auto" />;
}

// ─── ROI Calculator ───────────────────────────────────────────────────────────

function ROICalculator() {
  const [visitors, setVisitors]       = useState(5000);
  const [currentRate, setCurrentRate] = useState(1);
  const [jobValue, setJobValue]       = useState(350);
  const [liftRate, setLiftRate]       = useState(40);

  const currentLeads  = Math.round((visitors * currentRate) / 100);
  const newLeads      = Math.round(currentLeads * (1 + liftRate / 100));
  const extraLeads    = newLeads - currentLeads;
  const extraRevenue  = extraLeads * jobValue;
  const annualRevenue = extraRevenue * 12;

  const fmt = (n: number) => n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`;

  return (
    <section className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-blue-100">
            <Calculator size={13} />
            ROI Calculator
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">See Your Revenue Upside</h2>
          <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">
            Drag the sliders to estimate how much additional revenue a Qalt quote widget could generate.
          </p>
        </div>

        {/* Calculator panel — sharp, gradient border effect */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 via-slate-100 to-slate-50 pointer-events-none" />
          <div className="relative bg-white/90 border border-slate-200 rounded-2xl p-10 md:p-14">
            <div className="grid md:grid-cols-2 gap-14">

              {/* Sliders */}
              <div className="space-y-10">
                {[
                  { label: "Monthly Website Visitors", icon: <Users size={13} />, value: visitors, set: setVisitors, min: 500, max: 50000, step: 500, fmt: (v: number) => v.toLocaleString(), minLabel: "500", maxLabel: "50k" },
                  { label: "Current Quote Request Rate", icon: null, value: currentRate, set: setCurrentRate, min: 0.5, max: 10, step: 0.5, fmt: (v: number) => `${v}%`, minLabel: "0.5%", maxLabel: "10%" },
                  { label: "Average Job Value", icon: <DollarSign size={13} />, value: jobValue, set: setJobValue, min: 50, max: 5000, step: 50, fmt: (v: number) => `$${v}`, minLabel: "$50", maxLabel: "$5,000" },
                  { label: "Expected Conversion Lift with Qalt", icon: <TrendingUp size={13} />, value: liftRate, set: setLiftRate, min: 10, max: 100, step: 5, fmt: (v: number) => `+${v}%`, minLabel: "10%", maxLabel: "100%" },
                ].map(({ label, icon, value, set, min, max, step, fmt: fmtVal, minLabel, maxLabel }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-3">
                      <label className="text-[11px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                        {icon}{label}
                      </label>
                      <span className="text-sm font-black text-slate-900">{fmtVal(value)}</span>
                    </div>
                    <input
                      type="range" min={min} max={max} step={step} value={value}
                      onChange={(e) => set(Number(e.target.value))}
                      className="w-full accent-blue-600 h-1.5 rounded-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-medium">
                      <span>{minLabel}</span><span>{maxLabel}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Results */}
              <div className="flex flex-col justify-center gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-7">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Monthly Leads Today</p>
                  <p className="text-4xl font-black text-slate-700">{currentLeads.toLocaleString()}</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-7">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2">Monthly Leads with Qalt</p>
                  <p className="text-4xl font-black text-blue-700">{newLeads.toLocaleString()}</p>
                  <p className="text-sm text-blue-500 font-bold mt-1">+{extraLeads} extra leads/mo</p>
                </div>

                <div className="bg-linear-to-br from-blue-700 via-blue-600 to-blue-500 rounded-xl p-7 shadow-lg shadow-blue-600/20">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-2">Estimated Annual Revenue Upside</p>
                  <p className="text-5xl font-black text-white">{fmt(annualRevenue)}</p>
                  <p className="text-sm text-blue-200 font-bold mt-1">{fmt(extraRevenue)} / month extra</p>
                </div>

                <p className="text-xs text-slate-400 font-medium text-center leading-relaxed px-4">
                  Estimates assume additional leads convert at your current rate. Results vary.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-8 py-5 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-bold text-slate-800">{question}</span>
        {open
          ? <ChevronUp size={17} className="text-slate-400 shrink-0" />
          : <ChevronDown size={17} className="text-slate-400 shrink-0" />
        }
      </button>
      {open && (
        <div className="px-8 pb-5 text-slate-500 font-medium leading-relaxed text-sm border-t border-slate-100">
          {answer}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ "Quote Widget": true });

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/">
            <Image src="/images/qalt-dark.png" alt="Qalt" width={220} height={66} className="h-16 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-10 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <Link href="/#features" className="hover:text-blue-600 transition-colors">Features</Link>
            <Link href="/pricing" className="text-blue-600">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
              Log in
            </Link>
            <Link href="/register" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-40 pb-32">

        {/* Header */}
        <div className="text-center mb-16 px-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-5">
            Simple, Transparent<br />
            <span className="text-blue-600">Pricing</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-xl mx-auto mb-10">
            Start free. Upgrade as you grow. No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-slate-100 border border-slate-200 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`px-6 py-2.5 rounded-md text-sm font-black transition-all ${!annual ? "bg-white shadow-sm text-slate-900 border border-slate-200" : "text-slate-500 hover:text-slate-700"}`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`px-6 py-2.5 rounded-md text-sm font-black transition-all flex items-center gap-2 ${annual ? "bg-white shadow-sm text-slate-900 border border-slate-200" : "text-slate-500 hover:text-slate-700"}`}
            >
              Annually
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* Tier Cards */}
        <div className="max-w-5xl mx-auto px-6 mb-24">
          <div className="grid md:grid-cols-3 gap-6 items-stretch">

            {/* Starter */}
            <div className="bg-linear-to-br from-sky-50 via-white to-blue-50 border border-blue-100 rounded-2xl p-10 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="mb-8 pb-8 border-b border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Starter</h3>
                </div>
                <p className="text-slate-600 text-sm font-medium leading-snug">Perfect for trying Qalt. No credit card needed.</p>
              </div>
              {/* Price */}
              <div className="mb-1">
                <span className="text-6xl font-black text-slate-900 tracking-tight">Free</span>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">Forever · No card required</p>
              {/* CTA */}
              <Link href="/register" className="block w-full text-center py-3.5 border-2 border-slate-800 text-slate-800 rounded-xl font-bold text-sm hover:bg-slate-900 hover:text-white active:scale-[0.98] transition-all mb-8">
                Get Started Free
              </Link>
              {/* Features */}
              <ul className="space-y-3.5 mt-auto">
                {["1 Quote Widget", "50 Quotes/month", "Basic Customization", "Email Support"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                    <CheckCircle2 size={15} className="text-blue-400 shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro — elevated dark card */}
            <div className="bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-10 flex flex-col shadow-2xl shadow-blue-950/40 relative md:-translate-y-4 border border-blue-900/40">
              {/* Most Popular badge */}
              <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-blue-500 via-blue-400 to-blue-600 rounded-t-2xl" />
              {/* Header */}
              <div className="mb-8 pb-8 border-b border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <h3 className="text-sm font-black uppercase tracking-widest text-blue-300">Pro</h3>
                  <span className="ml-auto px-2.5 py-0.5 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-full text-[10px] font-black uppercase tracking-widest">Most Popular</span>
                </div>
                <p className="text-slate-400 text-sm font-medium leading-snug">For growing delivery companies that need scale.</p>
              </div>
              {/* Price */}
              <div className="mb-1 flex items-end gap-2">
                <span className="text-6xl font-black text-white tracking-tight">{annual ? "$29" : "$39"}</span>
                <span className="text-slate-400 font-medium text-lg mb-2">/mo</span>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-8">
                {annual ? "Billed $348 annually · save $120" : "Switch to annual & save $120/yr"}
              </p>
              {/* CTA */}
              <Link href="/register" className="block w-full text-center py-3.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-500 active:scale-[0.98] transition-all mb-8 shadow-lg shadow-blue-900/60">
                Start Free Trial
              </Link>
              {/* Features */}
              <ul className="space-y-3.5 mt-auto">
                {["Unlimited Widgets", "Unlimited Quotes", "Full White-Label", "Analytics Dashboard", "Priority Support"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300 font-medium text-sm">
                    <CheckCircle2 size={15} className="text-blue-400 shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Enterprise */}
            <div className="bg-linear-to-br from-slate-800 via-slate-900 to-slate-800 border border-slate-700/60 rounded-2xl p-10 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="mb-8 pb-8 border-b border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Enterprise</h3>
                </div>
                <p className="text-slate-400 text-sm font-medium leading-snug">For high-volume operations with custom needs.</p>
              </div>
              {/* Price */}
              <div className="mb-1 flex items-end gap-2">
                <span className="text-6xl font-black text-white tracking-tight">{annual ? "$79" : "$99"}</span>
                <span className="text-slate-500 font-medium text-lg mb-2">/mo</span>
              </div>
              <p className="text-slate-600 text-xs font-bold uppercase tracking-widest mb-8">
                {annual ? "Billed $948 annually" : "Billed monthly"}
              </p>
              {/* CTA */}
              <Link href="/register" className="block w-full text-center py-3.5 border-2 border-slate-500 text-slate-200 rounded-xl font-bold text-sm hover:border-white hover:text-white active:scale-[0.98] transition-all mb-8">
                Contact Sales
              </Link>
              {/* Features */}
              <ul className="space-y-3.5 mt-auto">
                {["Everything in Pro", "Dedicated Account Manager", "SLA & Uptime Guarantee", "Volume Discounts", "Onboarding Call"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-400 font-medium text-sm">
                    <CheckCircle2 size={15} className="text-amber-400/70 shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-black tracking-tight text-center mb-12">Compare All Features</h2>

          {/* Header row */}
          <div className="grid grid-cols-4 gap-4 pb-4 border-b-2 border-slate-200 mb-1">
            <div />
            {(["Starter", "Pro", "Enterprise"] as const).map((label, i) => (
              <div key={label} className="text-center">
                <span className={`text-[11px] font-black uppercase tracking-widest ${i === 1 ? "text-blue-600" : i === 2 ? "text-slate-600" : "text-slate-400"}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Accordion sections */}
          <div className="space-y-1.5">
            {FEATURE_SECTIONS.map((section) => {
              const isOpen = openSections[section.title] ?? false;
              return (
                <div key={section.title} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between px-6 py-4 bg-linear-to-r from-slate-50 to-white hover:from-slate-100 transition-colors text-left"
                  >
                    <span className="text-xs font-black uppercase tracking-widest text-slate-700">{section.title}</span>
                    {isOpen
                      ? <ChevronUp size={16} className="text-slate-400" />
                      : <ChevronDown size={16} className="text-slate-400" />
                    }
                  </button>
                  {isOpen && (
                    <div>
                      {section.rows.map((row, i) => (
                        <div
                          key={row.name}
                          className={`grid grid-cols-4 gap-4 px-6 py-3.5 items-center border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}
                        >
                          <span className="text-sm font-medium text-slate-600">{row.name}</span>
                          <div className="text-center"><FeatureCell value={row.starter} /></div>
                          <div className="text-center"><FeatureCell value={row.pro} /></div>
                          <div className="text-center"><FeatureCell value={row.enterprise} /></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA row */}
          <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-200">
            <div />
            <Link href="/register" className="text-center py-3 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg font-bold text-sm hover:bg-slate-200 active:scale-[0.98] transition-all">
              Get Started
            </Link>
            <Link href="/register" className="text-center py-3 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md shadow-blue-200">
              Start Free Trial
            </Link>
            <Link href="/register" className="text-center py-3 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-slate-800 active:scale-[0.98] transition-all">
              Contact Sales
            </Link>
          </div>
        </div>
      </main>

      {/* ROI Calculator */}
      <ROICalculator />

      {/* FAQ */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-black tracking-tight text-center mb-12">Common Questions</h2>
          <div className="space-y-3">
            {[
              { q: "Can I cancel at any time?", a: "Yes. No contracts, no lock-ins. Cancel from your dashboard at any time — your plan stays active until the end of the billing period." },
              { q: "Is there a free trial for Pro?", a: "Yes — Pro includes a 14-day free trial. No credit card required to start." },
              { q: "What happens if I exceed my quote limit on Starter?", a: "Your widget will continue to load, but new quote submissions will be paused until the next billing cycle or until you upgrade." },
              { q: "Can I switch plans at any time?", a: "Absolutely. Upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at the next renewal." },
              { q: "Do you offer discounts for startups or non-profits?", a: "Yes — reach out to our team and we'll work something out." },
            ].map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Image src="/images/qalt-dark.png" alt="Qalt" width={200} height={60} className="h-14 w-auto" />
            <p className="text-slate-400 font-medium">© 2024 Qalt SaaS. All rights reserved.</p>
          </div>
          <div className="flex gap-10 text-sm font-bold text-slate-400 uppercase tracking-widest">
            <Link href="/login" className="hover:text-blue-600 transition-colors">Privacy</Link>
            <Link href="/login" className="hover:text-blue-600 transition-colors">Terms</Link>
            <Link href="/login" className="hover:text-blue-600 transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
