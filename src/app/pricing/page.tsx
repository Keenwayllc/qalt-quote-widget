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
  tooltip?: string;
  starter: FeatureValue;
  pro: FeatureValue;
  enterprise: FeatureValue;
}

interface FeatureSection {
  title: string;
  rows: FeatureRow[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLANS = {
  starter: { monthly: 0, annual: 0 },
  pro: { monthly: 39, annual: 29 },
  enterprise: { monthly: null, annual: null },
};

const FEATURE_SECTIONS: FeatureSection[] = [
  {
    title: "Quote Widget",
    rows: [
      { name: "Embeddable quote widgets", starter: "1", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Quotes per month", starter: "50", pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Multi-step quote form", starter: true, pro: true, enterprise: true },
      { name: "Instant price calculation", starter: true, pro: true, enterprise: true },
      { name: "Lead capture & storage", starter: true, pro: true, enterprise: true },
      { name: "Custom pricing rules", starter: false, pro: true, enterprise: true },
      { name: "Distance-based pricing (Google Maps)", starter: false, pro: true, enterprise: true },
      { name: "Weight & dimension pricing", starter: false, pro: true, enterprise: true },
    ],
  },
  {
    title: "Branding & Customization",
    rows: [
      { name: "White-label (no Qalt branding)", starter: false, pro: true, enterprise: true },
      { name: "Custom colors & fonts", starter: false, pro: true, enterprise: true },
      { name: "Custom logo", starter: false, pro: true, enterprise: true },
      { name: "Custom domain embed", starter: true, pro: true, enterprise: true },
      { name: "Custom success messages", starter: false, pro: true, enterprise: true },
      { name: "Fully custom CSS", starter: false, pro: false, enterprise: true },
    ],
  },
  {
    title: "Analytics & Reporting",
    rows: [
      { name: "Quote volume dashboard", starter: false, pro: true, enterprise: true },
      { name: "Lead conversion tracking", starter: false, pro: true, enterprise: true },
      { name: "Drop-off funnel analysis", starter: false, pro: true, enterprise: true },
      { name: "Revenue pipeline estimates", starter: false, pro: true, enterprise: true },
      { name: "Custom report builder", starter: false, pro: false, enterprise: true },
      { name: "Data export (CSV / API)", starter: false, pro: true, enterprise: true },
    ],
  },
  {
    title: "Integrations",
    rows: [
      { name: "Email notifications", starter: true, pro: true, enterprise: true },
      { name: "Webhook on new quote", starter: false, pro: true, enterprise: true },
      { name: "Zapier integration", starter: false, pro: true, enterprise: true },
      { name: "CRM integration (HubSpot, Salesforce)", starter: false, pro: false, enterprise: true },
      { name: "Custom API access", starter: false, pro: false, enterprise: true },
    ],
  },
  {
    title: "Support",
    rows: [
      { name: "Email support", starter: true, pro: true, enterprise: true },
      { name: "Priority support", starter: false, pro: true, enterprise: true },
      { name: "Onboarding call", starter: false, pro: false, enterprise: true },
      { name: "Dedicated account manager", starter: false, pro: false, enterprise: true },
      { name: "SLA & uptime guarantee", starter: false, pro: false, enterprise: true },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FeatureCell({ value }: { value: FeatureValue }) {
  if (typeof value === "string") {
    return <span className="text-sm font-bold text-slate-700">{value}</span>;
  }
  if (value === true) {
    return <CheckCircle2 size={20} className="text-blue-600 mx-auto" />;
  }
  return <Minus size={18} className="text-slate-300 mx-auto" />;
}

function PriceBadge({ plan, annual }: { plan: Plan; annual: boolean }) {
  const prices = PLANS[plan];
  if (prices.monthly === null) {
    return (
      <div>
        <span className="text-5xl font-black text-slate-900">Custom</span>
      </div>
    );
  }
  const price = annual ? prices.annual! : prices.monthly;
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-5xl font-black">{price === 0 ? "Free" : `$${price}`}</span>
      {price > 0 && <span className="text-slate-400 font-medium">/mo</span>}
    </div>
  );
}

// ─── ROI Calculator ───────────────────────────────────────────────────────────

function ROICalculator() {
  const [visitors, setVisitors] = useState(5000);
  const [currentRate, setCurrentRate] = useState(1);
  const [jobValue, setJobValue] = useState(350);
  const [liftRate, setLiftRate] = useState(40);

  const currentLeads = Math.round((visitors * currentRate) / 100);
  const newLeads = Math.round(currentLeads * (1 + liftRate / 100));
  const extraLeads = newLeads - currentLeads;
  const extraRevenue = extraLeads * jobValue;
  const annualRevenue = extraRevenue * 12;

  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`;

  return (
    <section className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <Calculator size={14} />
            ROI Calculator
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            See Your Revenue Upside
          </h2>
          <p className="text-xl text-slate-500 font-medium max-w-xl mx-auto">
            Drag the sliders to estimate how much additional revenue a Qalt quote widget could generate for your business.
          </p>
        </div>

        <div className="bg-slate-50 rounded-[40px] p-10 md:p-14 border border-slate-100">
          <div className="grid md:grid-cols-2 gap-14">
            {/* Inputs */}
            <div className="space-y-10">
              {/* Monthly visitors */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <Users size={14} /> Monthly Website Visitors
                  </label>
                  <span className="text-sm font-black text-slate-900">{visitors.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={50000}
                  step={500}
                  value={visitors}
                  onChange={(e) => setVisitors(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 rounded-full cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1 font-medium">
                  <span>500</span><span>50,000</span>
                </div>
              </div>

              {/* Current quote rate */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Current Quote Request Rate
                  </label>
                  <span className="text-sm font-black text-slate-900">{currentRate}%</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={10}
                  step={0.5}
                  value={currentRate}
                  onChange={(e) => setCurrentRate(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 rounded-full cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1 font-medium">
                  <span>0.5%</span><span>10%</span>
                </div>
              </div>

              {/* Average job value */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <DollarSign size={14} /> Average Job Value
                  </label>
                  <span className="text-sm font-black text-slate-900">${jobValue}</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={5000}
                  step={50}
                  value={jobValue}
                  onChange={(e) => setJobValue(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 rounded-full cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1 font-medium">
                  <span>$50</span><span>$5,000</span>
                </div>
              </div>

              {/* Conversion lift */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <TrendingUp size={14} /> Expected Conversion Lift with Qalt
                  </label>
                  <span className="text-sm font-black text-slate-900">+{liftRate}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={liftRate}
                  onChange={(e) => setLiftRate(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 rounded-full cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1 font-medium">
                  <span>10%</span><span>100%</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col justify-center gap-6">
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Monthly Leads (Now)</p>
                <p className="text-4xl font-black text-slate-700">{currentLeads.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-3xl p-8 border border-blue-100 shadow-sm ring-2 ring-blue-100">
                <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-2">Monthly Leads with Qalt</p>
                <p className="text-4xl font-black text-blue-600">{newLeads.toLocaleString()}</p>
                <p className="text-sm text-blue-400 font-bold mt-1">+{extraLeads} extra leads/mo</p>
              </div>
              <div className="bg-linear-to-br from-blue-600 to-blue-700 rounded-3xl p-8 shadow-xl shadow-blue-500/20">
                <p className="text-xs font-black uppercase tracking-widest text-blue-200 mb-2">Estimated Annual Revenue Upside</p>
                <p className="text-5xl font-black text-white">{fmt(annualRevenue)}</p>
                <p className="text-sm text-blue-200 font-bold mt-1">{fmt(extraRevenue)} / month extra</p>
              </div>
              <p className="text-xs text-slate-400 font-medium text-center leading-relaxed">
                Estimates assume all additional leads convert at your current rate. Results vary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "Quote Widget": true,
  });

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
            <Link href="/register" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-40 pb-32">
        {/* Header */}
        <div className="text-center mb-16 px-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            Simple, Transparent<br />
            <span className="text-blue-600">Pricing</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-xl mx-auto mb-10">
            Start free. Upgrade as you grow. No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-slate-100 rounded-2xl p-1.5">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${!annual ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${annual ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
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
          <div className="grid md:grid-cols-3 gap-6 items-start">

            {/* Starter */}
            <div className="bg-white border border-slate-200 rounded-[32px] p-10 hover:shadow-lg transition-all">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Starter</h3>
              <PriceBadge plan="starter" annual={annual} />
              <p className="text-slate-500 font-medium mt-3 mb-8">Perfect for trying Qalt out.</p>
              <Link
                href="/register"
                className="block w-full text-center py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 active:scale-[0.98] transition-all"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro — elevated */}
            <div className="bg-blue-600 rounded-[32px] p-10 text-white shadow-2xl shadow-blue-500/25 relative md:-translate-y-4 hover:scale-[1.02] active:scale-[0.98] transition-all">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-yellow-400 text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                Most Popular
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-200 mb-6">Pro</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black">
                  {annual ? "$29" : "$39"}
                </span>
                <span className="text-blue-200 font-medium">/mo</span>
              </div>
              {annual && (
                <p className="text-blue-200 text-xs font-bold mt-1">Billed $348/year</p>
              )}
              <p className="text-blue-100 font-medium mt-3 mb-8">For growing delivery companies.</p>
              <Link
                href="/register"
                className="block w-full text-center py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-blue-50 active:scale-[0.98] transition-all"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-white border border-slate-200 rounded-[32px] p-10 hover:shadow-lg transition-all">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Enterprise</h3>
              <PriceBadge plan="enterprise" annual={annual} />
              <p className="text-slate-500 font-medium mt-3 mb-8">For high-volume operations.</p>
              <Link
                href="/register"
                className="block w-full text-center py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 active:scale-[0.98] transition-all"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-black tracking-tight text-center mb-12">Compare All Features</h2>

          {/* Table header */}
          <div className="grid grid-cols-4 gap-4 pb-4 border-b border-slate-200 mb-2">
            <div />
            {(["Starter", "Pro", "Enterprise"] as const).map((label, i) => (
              <div key={label} className="text-center">
                <span className={`text-xs font-black uppercase tracking-widest ${i === 1 ? "text-blue-600" : "text-slate-400"}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Accordion sections */}
          <div className="space-y-2">
            {FEATURE_SECTIONS.map((section) => {
              const isOpen = openSections[section.title] ?? false;
              return (
                <div key={section.title} className="border border-slate-100 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between px-6 py-5 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                  >
                    <span className="text-sm font-black uppercase tracking-widest text-slate-700">{section.title}</span>
                    {isOpen
                      ? <ChevronUp size={18} className="text-slate-400" />
                      : <ChevronDown size={18} className="text-slate-400" />
                    }
                  </button>

                  {isOpen && (
                    <div>
                      {section.rows.map((row, i) => (
                        <div
                          key={row.name}
                          className={`grid grid-cols-4 gap-4 px-6 py-4 items-center ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
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
          <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
            <div />
            <Link href="/register" className="text-center py-3.5 bg-slate-100 text-slate-700 rounded-2xl font-bold text-sm hover:bg-slate-200 active:scale-[0.98] transition-all">
              Get Started
            </Link>
            <Link href="/register" className="text-center py-3.5 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-200">
              Start Free Trial
            </Link>
            <Link href="/register" className="text-center py-3.5 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 active:scale-[0.98] transition-all">
              Contact Sales
            </Link>
          </div>
        </div>
      </main>

      {/* ROI Calculator */}
      <ROICalculator />

      {/* FAQ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-black tracking-tight text-center mb-12">Common Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I cancel at any time?",
                a: "Yes. No contracts, no lock-ins. Cancel from your dashboard at any time — your plan stays active until the end of the billing period.",
              },
              {
                q: "Is there a free trial for Pro?",
                a: "Yes — Pro includes a 14-day free trial. No credit card required to start.",
              },
              {
                q: "What happens if I exceed my quote limit on Starter?",
                a: "Your widget will continue to load, but new quote submissions will be paused until the next billing cycle or until you upgrade.",
              },
              {
                q: "Can I switch plans at any time?",
                a: "Absolutely. Upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at the next renewal.",
              },
              {
                q: "Do you offer discounts for startups or non-profits?",
                a: "Yes — reach out to our team and we'll work something out.",
              },
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

// ─── FAQ accordion item ────────────────────────────────────────────────────────

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-8 py-6 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-bold text-slate-800">{question}</span>
        {open ? <ChevronUp size={18} className="text-slate-400 shrink-0" /> : <ChevronDown size={18} className="text-slate-400 shrink-0" />}
      </button>
      {open && (
        <div className="px-8 pb-6 text-slate-500 font-medium leading-relaxed text-sm border-t border-slate-50">
          {answer}
        </div>
      )}
    </div>
  );
}
