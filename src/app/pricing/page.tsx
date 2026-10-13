"use client";

import { useState, useEffect, useId } from "react";
import Link from "next/link";
import PublicNav from "@/components/shared/PublicNav";
import SupportModal from "@/components/shared/SupportModal";
import { motion, useReducedMotion } from "framer-motion";
import { billingDisplay } from "@/lib/billing-display";
import { PLANS } from "@/lib/plans";
import { QUOTE_OUTCOME_FAQS } from "@/lib/quote-outcomes";
import { TrustBadgeStrip } from "@/components/shared/TrustBadges";
import { Check, Minus, ChevronDown, ChevronUp, ArrowUp } from "lucide-react";
import MarketingFooter from "@/components/shared/MarketingFooter";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
};

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
      { name: "Quote Forms (unique embed codes)",       starter: String(PLANS.STARTER.maxForms), pro: String(PLANS.PRO.maxForms), enterprise: "Unlimited" },
      { name: "Submitted requests per month",                      starter: String(PLANS.STARTER.maxQuotesPerMonth), pro: "Unlimited", enterprise: "Unlimited" },
      { name: "Multi-step quote form",                 starter: true,     pro: true,        enterprise: true        },
      { name: "Instant price calculation",             starter: true,     pro: true,        enterprise: true        },
      { name: "Lead capture & storage",                starter: true,     pro: true,        enterprise: true        },
      { name: "Custom pricing rules",                  starter: false,    pro: true,        enterprise: true        },
      { name: "Distance-based pricing (Google Maps)",  starter: false,    pro: true,        enterprise: true        },
      { name: "Weight & dimension pricing",            starter: false,    pro: true,        enterprise: true        },
      { name: "Multi-vehicle & fleet quoting",         starter: false,    pro: false,       enterprise: true        },
    ],
  },
  {
    title: "Payments & Checkout",
    rows: [
      { name: "Accept payment in your widget (Stripe)", starter: false, pro: false, enterprise: true },
      { name: "Collect the full quoted amount", starter: false, pro: false, enterprise: true },
    ],
  },
  {
    title: "Ops Console",
    rows: [
      { name: "Job Dashboard",          starter: false, pro: true, enterprise: true },
      { name: "Saved Stop Notes",       starter: false, pro: true, enterprise: true },
      { name: "Delivery Readiness",     starter: false, pro: true, enterprise: true },
      { name: "Exception Logging",      starter: false, pro: true, enterprise: true },
      { name: "Job audit trail",        starter: false, pro: true, enterprise: true },
    ],
  },
  {
    title: "Branding & Customization",
    rows: [
      { name: "White-label (no Qalt branding)", starter: false, pro: true,  enterprise: true  },
      { name: "Custom colors & fonts",          starter: false, pro: true,  enterprise: true  },
      { name: "Custom logo",                    starter: false, pro: true,  enterprise: true  },
      { name: "Custom success messages",        starter: false, pro: true,  enterprise: true  },
      { name: "Website-matching form design",   starter: false, pro: false, enterprise: true  },
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
    ],
  },
  {
    title: "Integrations & Support",
    rows: [
      { name: "Email notifications",   starter: true,  pro: true,  enterprise: true             },
      { name: "Advanced webhooks",     starter: false, pro: false, enterprise: true             },
      { name: "Read-only quote & analytics API", starter: false, pro: false, enterprise: "Scoped access" },
      { name: "Account users (multi-user not available)", starter: "1", pro: "1", enterprise: "1" },
      { name: "Email support",         starter: true,  pro: true,  enterprise: true             },
      { name: "Priority support",      starter: false, pro: true,  enterprise: true             },
      { name: "Dedicated support",     starter: false, pro: false, enterprise: true             },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FeatureCell({ value }: { value: FeatureValue }) {
  if (typeof value === "string") {
    if (value === "Coming Soon") {
      return <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400 italic">Soon</span>;
    }
    return <span className="text-sm font-bold text-slate-700">{value}</span>;
  }
  if (value === true) {
    return <><Check size={18} aria-hidden="true" className="text-red-600 mx-auto" /><span className="sr-only">Included</span></>;
  }
  return <><Minus size={16} aria-hidden="true" className="text-slate-300 mx-auto" /><span className="sr-only">Not included</span></>;
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const answerId = useId();
  return (
    <div className="bg-white border border-slate-200 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={answerId}
        className="w-full flex items-center justify-between px-8 py-5 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-bold text-slate-800">{question}</span>
        {open
          ? <ChevronUp size={17} className="text-slate-400 shrink-0" />
          : <ChevronDown size={17} className="text-slate-400 shrink-0" />
        }
      </button>
      <div id={answerId} hidden={!open} className="px-8 pb-5 text-slate-500 font-medium leading-relaxed text-sm border-t border-slate-100">
          {answer}
        </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const reduceMotion = useReducedMotion();
  const [showScroll, setShowScroll] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-950">

      <PublicNav />

      <main className="pb-32 pt-16">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-16 bg-[#f4f2ec] px-6 py-20 text-center sm:py-24"
        >
          <div className="mx-auto max-w-5xl">
            <p className="mb-6 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Plans built around your quoting workflow</p>
            <h1 className="text-[clamp(3.1rem,7vw,6.2rem)] font-black leading-[0.88] tracking-[-0.06em] text-slate-950">Start free. Scale when the workflow earns it.</h1>
            <p className="mx-auto mt-8 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:text-lg">Choose the quote volume, branding, pricing controls and payment options your delivery website needs. Keep your existing dispatch workflow.</p>
          </div>

          {/* Billing Toggle */}
          <div className="inline-flex items-center border border-slate-300 bg-white/60 p-1">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              aria-pressed={!annual}
              className={`px-6 py-2.5 text-sm font-black transition-all ${!annual ? "bg-white shadow-sm text-slate-900 border border-slate-200" : "text-slate-500 hover:text-slate-700"}`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              aria-pressed={annual}
              className={`px-6 py-2.5 text-sm font-black transition-all flex items-center gap-2 ${annual ? "bg-white shadow-sm text-slate-900 border border-slate-200" : "text-slate-500 hover:text-slate-700"}`}
            >
              Annually
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                Save up to 25%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Tier Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          custom={1}
          className="max-w-5xl mx-auto px-6 mb-24"
        >
          <div className="grid overflow-hidden border border-slate-200 bg-white lg:grid-cols-3">
            {/* Starter */}
            <div className="bg-white p-10 flex flex-col">
              <div className="min-h-[280px]">
                <div className="mb-8 p-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-black tracking-tight text-slate-900">Starter</h3>
                  </div>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">For trying Qalt or launching your first quote widget.</p>
                </div>
                <div className="mb-1">
                  <span className="text-5xl font-black text-slate-900">Free</span>
                </div>
                <p className="text-slate-500 text-sm font-medium mb-8">Free forever. No card required.</p>
              </div>
              <Link href="/register" className="block w-full text-center py-4 bg-slate-900 text-white font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all mb-8">
                Get Started Free
              </Link>
              <ul className="space-y-3">
                {["1 Quote Widget", `${PLANS.STARTER.maxQuotesPerMonth} requests / month`, "Instant quote calculator", "Lead capture & storage", "Email notifications", "Email support"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-600 font-medium text-sm">
                    <Check size={16} className="text-slate-400 shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro */}
            <div className="bg-[#0b0b0c] p-10 flex flex-col relative">
              <div className="min-h-[280px]">
                <div className="mb-8 p-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-black tracking-tight text-white">Pro</h3>
                    <span className="px-2 py-0.5 bg-white text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest">Custom Branding</span>
                  </div>
                  <p className="text-slate-300 text-sm font-medium leading-relaxed">For delivery companies needing unlimited quotes, custom pricing and their own branding.</p>
                </div>
                <div className="mb-1 flex items-end gap-2">
                  <span className="text-5xl font-black text-white">{billingDisplay("PRO", annual).price}</span>
                  <span className="text-slate-300 font-medium text-lg mb-1">/mo</span>
                </div>
                <p className="text-slate-400 text-sm font-medium mb-8">
                  {billingDisplay("PRO", annual).detail}
                </p>
              </div>
              <Link href="/register" className="block w-full text-center py-4 bg-red-600 text-white font-bold text-sm hover:bg-red-700 active:scale-[0.98] transition-all mb-8">
                Upgrade to Pro
              </Link>
              <ul className="space-y-3">
                {["Unlimited quotes", "Up to 5 quote forms", "Full Ops Console (Jobs, Stops, Readiness)", "White-label (no Qalt branding)", "Custom colors, fonts & logo", "Analytics dashboard", "Priority support"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-300 font-medium text-sm">
                    <Check size={16} className="text-red-400 shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Enterprise */}
            <div className="bg-white p-10 flex flex-col relative">
              <div className="min-h-[280px]">
                <div className="mb-8 p-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-black tracking-tight text-slate-900">Enterprise</h3>
                  </div>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">For operators who want to get paid through their widget and scale.</p>
                </div>
                <div className="mb-1 flex items-end gap-2">
                  <span className="text-5xl font-black text-slate-900">{billingDisplay("ENTERPRISE", annual).price}</span>
                  <span className="text-slate-400 font-medium text-lg mb-1">/mo</span>
                </div>
                <p className="text-slate-500 text-sm font-medium mb-8">
                  {billingDisplay("ENTERPRISE", annual).detail}
                </p>
              </div>
              <Link href="/register" className="block w-full text-center py-4 bg-slate-900 text-white font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all mb-8">
                Upgrade to Enterprise
              </Link>
              <ul className="space-y-3">
                {[
                  { t: "Everything in Pro", hl: false },
                  { t: "Accept payments in your widget", hl: true },
                  { t: "Website-matching form design", hl: false },
                  { t: "Multi-vehicle & fleet quoting", hl: false },
                  { t: "Unlimited quote forms", hl: false },
                  { t: "Custom CSS & domain embed", hl: false },
                  { t: "Advanced webhooks", hl: false },
                  { t: "Dedicated priority support", hl: false },
                ].map((item) => (
                  <li key={item.t} className={`flex items-start gap-3 text-sm ${item.hl ? "text-slate-900 font-bold" : "text-slate-600 font-medium"}`}>
                    <Check size={16} className={`shrink-0 mt-0.5 ${item.hl ? "text-red-600" : "text-slate-400"}`} />{item.t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm leading-6 text-slate-600">New accounts start with a 14-day Pro trial, no card required. After the trial, Starter remains available unless you subscribe. Annual prices show a monthly equivalent, charged as one yearly payment in USD.</p>
          <TrustBadgeStrip keys={["https", "stripe", "passwords", "tenant"]} className="mt-8 justify-center" />
        </motion.div>

        <section aria-labelledby="plan-fit-heading" className="mx-auto mb-20 max-w-5xl px-6">
          <h2 id="plan-fit-heading" className="text-3xl font-black tracking-tight">Which plan fits my business?</h2>
          <dl className="mt-7 grid gap-6 border-t border-slate-200 pt-7 lg:grid-cols-3">
            {[
              ["Starter", "Try one quote widget with 50 quotes per month and lead capture. No card required."],
              ["Pro", "Use your logo and pricing rules across up to five forms, with unlimited quotes, analytics and the Ops Console."],
              ["Enterprise", "Add vehicle and fleet quoting, unlimited forms, website-matching design, webhooks and optional Stripe payments."],
            ].map(([name, description]) => (
              <div key={name}>
                <dt className="text-lg font-black">{name}</dt>
                <dd className="mt-2 text-sm font-medium leading-6 text-slate-500">{description}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm leading-6 text-slate-500">Payments require Enterprise, a connected Stripe account and payments enabled on your form. Quoting and lead capture work without taking payment.</p>
        </section>

        {/* Feature Comparison Table */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeIn}
          className="mx-auto max-w-5xl px-4 sm:px-6"
        >
          <h2 className="text-3xl font-black tracking-tight text-center mb-4">Compare All Features</h2>
          <p className="text-center text-slate-500 font-medium mb-12">See what is included at each stage as your quoting workflow grows.</p>

          <div className="relative w-full max-w-full overflow-x-auto pb-2">
            <div className="min-w-[720px]" role="table" aria-label="Qalt plan feature comparison">
          {/* Header row */}
          <div role="row" className="mb-1 grid grid-cols-4 gap-4 border-b-2 border-slate-200 pb-4">
            <div role="columnheader"><span className="sr-only">Feature</span></div>
            {(["Starter", "Pro", "Enterprise"] as const).map((label, i) => (
              <div role="columnheader" key={label} className="text-center">
                <span className={`text-[11px] font-black uppercase tracking-widest ${i === 1 ? "text-red-600" : i === 2 ? "text-slate-600" : "text-slate-400"}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Feature sections */}
          <div className="divide-y divide-slate-100">
            {FEATURE_SECTIONS.map((section) => (
              <div role="rowgroup" key={section.title}>
                <div role="row" className="px-2 py-3 bg-slate-50"><div role="columnheader" aria-colspan={4}>
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">{section.title}</span>
                </div></div>
                {section.rows.map((row, i) => (
                  <div
                    key={row.name}
                    role="row"
                    className={`grid grid-cols-4 gap-4 px-2 py-3.5 items-center border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/40"}`}
                  >
                    <span role="rowheader" className="text-sm font-medium text-slate-600">{row.name}</span>
                    <div role="cell" className="text-center"><FeatureCell value={row.starter} /></div>
                    <div role="cell" className="text-center"><FeatureCell value={row.pro} /></div>
                    <div role="cell" className="text-center"><FeatureCell value={row.enterprise} /></div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          </div>
          {/* CTA row */}
          <div className="mt-8 grid min-w-[720px] grid-cols-4 gap-4 border-t border-slate-200 pt-8">
            <div />
            <Link href="/register" className="text-center py-4 bg-slate-100 border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-200 active:scale-[0.98] transition-all">
              Get Started
            </Link>
            <Link href="/register" className="text-center py-4 bg-red-600 text-white font-bold text-sm hover:bg-red-700 active:scale-[0.98] transition-all">
              Upgrade to Pro
            </Link>
            <Link href="/register" className="text-center py-4 bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 active:scale-[0.98] transition-all">
              Upgrade to Enterprise
            </Link>
          </div>
          </div>
        </motion.div>

      </main>

      {/* ROI Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="border-t border-slate-200 bg-white py-20"
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6">Spend less time answering routine quote requests</h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
            Give customers consistent pricing from your configured rules and capture inquiries outside office hours. Keep your dispatch workflow. Add payment at booking on Enterprise when it fits your business.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              "Cut down manual quote calls",
              "Capture leads 24/7",
              "Help customers price jobs faster",
            ].map((item) => (
              <div key={item} className="inline-flex items-center gap-2.5 whitespace-nowrap">
                <Check size={16} className="text-red-600 shrink-0" />
                <span className="text-sm font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="border-t border-slate-200 bg-[#f4f2ec] py-24"
      >
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-black tracking-tight text-center mb-12">Common Questions</h2>
          <div className="space-y-3">
            {[
              { q: "What's the difference between Pro and Enterprise?", a: "Pro gives you everything to quote and capture unlimited leads with your own branding: unlimited quotes, up to 5 forms, the full Ops Console, white-label, and analytics. Enterprise adds the ability to accept payment in your widget, website-matching form design (your colors, fonts, shapes and light or dark mode), multi-vehicle and fleet quoting, custom CSS and domain embedding, and webhooks, for operators who want customers to pay through Qalt." },
              ...QUOTE_OUTCOME_FAQS.map(({ question, answer }) => ({ q: question, a: answer })),
              { q: "How does the free trial work?", a: "Registration starts a 14-day Pro trial without a card. If you do not subscribe, the account returns to Starter after the trial. Pro subscription checkout offers a separate 7-day trial with a card required, followed by the selected monthly or annual charge. Review Stripe Checkout before subscribing. Enterprise checkout has no trial." },
              { q: "Is the Ops Console included in Pro?", a: "Yes. Every Pro plan includes the full Ops Console (Jobs, Saved Stop Notes, Delivery Readiness, and Exception Logging) at no extra cost." },
              { q: "What happens if I exceed my limit on the free plan?", a: "Starter counts saved quote requests across your account, not calculations or displayed estimates. The allowance resets on the 1st at 00:00 UTC. At the limit, new submissions are blocked until the reset or an upgrade. Existing requests remain in the dashboard. Pro and Enterprise allow unlimited requests." },
              { q: "Can I cancel or switch plans at any time?", a: "Open Billing in your dashboard to manage a paid subscription through Stripe. Review the effective date and any charges in the portal before confirming. When a subscription ends, the account returns to Starter and its limits. Cancelling a subscription does not delete your account. Refunds are not automatic." },
              { q: "Do I need to replace my dispatch software?", a: "No. Qalt adds customer-facing pricing and lead capture to your website. You keep the systems already running your operation. This does not imply a direct integration with your dispatch software." },
              { q: "Do I need code to use Qalt?", a: "No custom build is required. Qalt is designed to be embedded on your site quickly with a simple snippet." },
              { q: "Can I remove Qalt branding?", a: "Yes. White-label, with no Qalt branding, is included on Pro and Enterprise." },
            ].map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="py-24 bg-white border-t border-slate-100"
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6">Start free and put Qalt on your site</h2>
          <p className="text-lg text-slate-500 font-medium mb-10">
            Launch your first quote widget, test your workflow, and upgrade when you need more.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <Link href="/register" className="px-10 py-4 bg-red-600 text-white font-bold text-base hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-red-200">
              Get Started Free
            </Link>
            <Link href="/register" className="px-10 py-4 bg-slate-900 text-white font-bold text-base hover:opacity-90 active:scale-[0.98] transition-all shadow-xl shadow-slate-200">
              Upgrade to Enterprise
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Scroll to top */}
      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-11 h-11 bg-slate-900 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-red-600 transition-all hover:-translate-y-0.5 active:scale-95"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* Footer */}
      <MarketingFooter />

      {/* Support Modal */}
      <SupportModal variant="contact" isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} />
    </div>
  );
}
