"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import QaltIcon from "@/components/shared/QaltIcon";
import { CheckCircle2, Minus, ChevronDown, ChevronUp } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

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



const FEATURE_SECTIONS: FeatureSection[] = [
  {
    title: "Quote Widget",
    rows: [
      { name: "Embeddable quote widgets",             starter: "1",      pro: "1",         enterprise: "1"         },
      { name: "Quotes per month",                     starter: "50",     pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Multi-step quote form",                starter: true,     pro: true,        enterprise: true        },
      { name: "Instant price calculation",            starter: true,     pro: true,        enterprise: true        },
      { name: "Lead capture & storage",               starter: true,     pro: true,        enterprise: true        },
      { name: "Custom pricing rules",                 starter: false,    pro: true,        enterprise: true        },
      { name: "Distance-based pricing (Google Maps)", starter: false,    pro: true,        enterprise: true        },
      { name: "Weight & dimension pricing",           starter: false,    pro: true,        enterprise: true        },
    ],
  },
  {
    title: "Branding & Customization",
    rows: [
      { name: "White-label (no Qalt branding)", starter: false, pro: true,  enterprise: true  },
      { name: "Custom colors & fonts",          starter: false, pro: true,  enterprise: true  },
      { name: "Custom logo",                    starter: false, pro: true,  enterprise: true  },
      { name: "Custom domain embed",            starter: true,  pro: true,  enterprise: true  },
      { name: "Custom success messages",        starter: false, pro: true,  enterprise: true  },
      { name: "Fully custom CSS",               starter: false, pro: false, enterprise: true  },
    ],
  },
  {
    title: "Analytics & Reporting",
    rows: [
      { name: "Quote volume dashboard",     starter: false, pro: true,  enterprise: true  },
      { name: "Lead conversion tracking",   starter: false, pro: true,  enterprise: true  },
      { name: "Drop-off funnel analysis",   starter: false, pro: true,  enterprise: true  },
      { name: "Revenue pipeline estimates", starter: false, pro: true,  enterprise: true  },
      { name: "Custom report builder",      starter: false, pro: false, enterprise: true  },
      { name: "Data export (CSV / API)",    starter: false, pro: true,  enterprise: true  },
    ],
  },
  {
    title: "Integrations & Support",
    rows: [
      { name: "Email notifications",       starter: true,  pro: true,  enterprise: true  },
      { name: "Webhook on new quote",      starter: false, pro: true,  enterprise: true  },
      { name: "Email support",             starter: true,  pro: true,  enterprise: true  },
      { name: "Priority support",          starter: false, pro: true,  enterprise: true  },
      { name: "Onboarding call",           starter: false, pro: false, enterprise: true  },
      { name: "Dedicated account manager", starter: false, pro: false, enterprise: true  },
      { name: "SLA & uptime guarantee",    starter: false, pro: false, enterprise: true  },
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

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <QaltIcon size={36} />
            <Image src="/images/qalt.png" alt="Qalt Logo" width={140} height={42} className="h-10 w-auto object-contain -translate-y-[1px]" />
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
          <div className="grid md:grid-cols-3 rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">
            {/* Starter */}
            <div className="bg-white p-10 flex flex-col">
              <div className="mb-8 p-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-black tracking-tight text-slate-900">Starter</h3>
                </div>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">Perfect for trying Qalt. No credit card needed.</p>
              </div>
              <div className="mb-1">
                <span className="text-5xl font-black text-slate-900">Free</span>
              </div>
              <p className="text-slate-500 text-sm font-medium mb-8">Forever · No card required</p>
              <Link href="/register" className="block w-full text-center py-3.5 border-2 border-slate-900 text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-900 hover:text-white active:scale-[0.98] transition-all mb-8">
                Get Started Free
              </Link>
              <ul className="space-y-3 mt-auto">
                {["1 Quote Widget", "50 Quotes/month", "Basic Customization", "Email Support"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-600 font-medium text-sm">
                    <CheckCircle2 size={16} className="text-slate-400 shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro */}
            <div className="bg-linear-to-bl from-[#131526] via-[#1a1636] to-[#2d1b54] p-10 flex flex-col relative">
              <div className="mb-8 p-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-black tracking-tight text-white">Pro</h3>
                  <span className="px-2 py-0.5 bg-white text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest">Most Popular</span>
                </div>
                <p className="text-slate-300 text-sm font-medium leading-relaxed">For growing delivery companies that need scale.</p>
              </div>
              <div className="mb-1 flex items-end gap-2">
                <span className="text-5xl font-black text-white">{annual ? "$14" : "$19"}</span>
                <span className="text-slate-300 font-medium text-lg mb-1">/mo</span>
              </div>
              <p className="text-slate-400 text-sm font-medium mb-8">
                {annual ? "Billed $168 annually · save $60" : "Switch to annual & save $60/yr"}
              </p>
              <Link href="/register" className="block w-full text-center py-3.5 bg-violet-600 text-white rounded-xl font-bold text-sm hover:bg-violet-500 active:scale-[0.98] transition-all mb-8 shadow-lg shadow-violet-900/40">
                Start Free Trial
              </Link>
              <ul className="space-y-3 mt-auto">
                {["Unlimited Quotes", "Full White-Label", "Advanced Customization", "Analytics Dashboard", "Priority Support"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-300 font-medium text-sm">
                    <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Enterprise */}
            <div className="bg-white p-10 flex flex-col relative">
              <div className="mb-8 p-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-black tracking-tight text-slate-900">Enterprise</h3>
                </div>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">For high-volume operations with custom needs.</p>
              </div>
              <div className="mb-1 flex items-end gap-2">
                <span className="text-5xl font-black text-slate-900">{annual ? "$29" : "$39"}</span>
                <span className="text-slate-400 font-medium text-lg mb-1">/mo</span>
              </div>
              <p className="text-slate-500 text-sm font-medium mb-8">
                {annual ? "Billed $348 annually · save $120" : "Billed monthly"}
              </p>
              <Link href="/register" className="block w-full text-center py-3.5 border-2 border-slate-900 text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-900 hover:text-white active:scale-[0.98] transition-all mb-8">
                Contact Sales
              </Link>
              <ul className="space-y-3 mt-auto">
                {["Everything in Pro", "Dedicated Account Manager", "SLA & Uptime Guarantee", "Volume Discounts", "Onboarding Call"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-600 font-medium text-sm">
                    <CheckCircle2 size={16} className="text-slate-400 shrink-0 mt-0.5" />{item}
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

          {/* Feature sections */}
          <div className="divide-y divide-slate-100">
            {FEATURE_SECTIONS.map((section) => (
              <div key={section.title}>
                <div className="px-2 py-3 bg-slate-50">
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">{section.title}</span>
                </div>
                {section.rows.map((row, i) => (
                  <div
                    key={row.name}
                    className={`grid grid-cols-4 gap-4 px-2 py-3.5 items-center border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/40"}`}
                  >
                    <span className="text-sm font-medium text-slate-600">{row.name}</span>
                    <div className="text-center"><FeatureCell value={row.starter} /></div>
                    <div className="text-center"><FeatureCell value={row.pro} /></div>
                    <div className="text-center"><FeatureCell value={row.enterprise} /></div>
                  </div>
                ))}
              </div>
            ))}
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

      {/* FAQ */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-black tracking-tight text-center mb-12">Common Questions</h2>
          <div className="space-y-3">
            {[
              { q: "Can I cancel at any time?",                        a: "Yes. No contracts, no lock-ins. Cancel from your dashboard at any time — your plan stays active until the end of the billing period." },
              { q: "Is there a free trial for Pro?",                   a: "Yes — Pro includes a 14-day free trial. No credit card required to start." },
              { q: "What happens if I exceed my limit on Starter?",    a: "Your widget will keep loading but new quote submissions will be paused until the next billing cycle or until you upgrade." },
              { q: "Can I switch plans at any time?",                  a: "Absolutely. Upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at next renewal." },
            ].map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-6">
            <Link href="/" className="flex items-center gap-1.5">
              <QaltIcon size={36} />
              <Image src="/images/qalt.png" alt="Qalt Logo" width={100} height={30} className="h-8 w-auto object-contain" />
            </Link>
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
