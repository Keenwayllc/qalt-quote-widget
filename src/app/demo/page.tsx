import Link from "next/link";
import type { Metadata } from "next";
import { resolveDemoCompanies } from "@/lib/demo-company";
import PublicNav from "@/components/shared/PublicNav";
import DemoLeadForm from "@/components/landing/DemoLeadForm";
import GatedDemo from "@/components/landing/GatedDemo";
import {
  ArrowRight, Check, X, Mail,
} from "lucide-react";
import QuoteOutcomeFAQ from "@/components/shared/QuoteOutcomeFAQ";
import MarketingFooter from "@/components/shared/MarketingFooter";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Live Demo · Qalt",
  alternates: { canonical: "/demo" },
  description:
    "Try a working delivery quote form with sample rates, transparent pricing and request capture. Demo payments are disabled. Keep your existing dispatch software.",
};


const OUTCOMES: { title: string; body: string }[] = [
  { title: "Quote instantly", body: "Customers see a delivery price without calling or waiting for a response." },
  { title: "Use your pricing", body: "Qalt uses your mileage, weight, item, vehicle, stairs, inside delivery, after-hours, and large-item rules." },
  { title: "Show the breakdown", body: "Customers see where the price comes from, which builds trust and cuts the back-and-forth." },
  { title: "Capture the request", body: "Customers submit contact and delivery details so you receive a complete lead or booking request." },
  { title: "Add it to your website", body: "Embed Qalt with one snippet instead of rebuilding your site." },
];

const BEFORE = [
  "Customer calls or emails",
  "Staff asks for addresses",
  "Staff calculates mileage",
  "Staff checks weight and extras",
  "Staff sends a price",
  "Customer waits",
  "Some leads disappear",
];

const WITH = [
  "Customer enters details",
  "Quote calculates instantly",
  "Pricing is transparent",
  "Customer submits a quote or booking request",
  "You receive a complete lead",
  "Optional Stripe payments on Enterprise",
];

const PRICING_RULES = [
  "Mileage", "Weight", "Item count", "Stairs", "Inside delivery",
  "After-hours fees", "Vehicle pricing", "Large-item categories",
];

export default async function DemoPage() {
  const demoCompanies = await resolveDemoCompanies();

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-red-100 selection:text-red-900">
      <PublicNav />

      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-[#f4f2ec] pb-20 pt-28 sm:pb-24 sm:pt-32">
        <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8">
          <p className="mb-6 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500"><span className="h-2 w-2 bg-red-600" />Live demo</p>
          <h1 className="max-w-5xl text-[clamp(3.1rem,7vw,6.2rem)] font-black leading-[0.88] tracking-[-0.06em] text-slate-950">Try the quote flow your customers would use.</h1>
          <p className="mt-8 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg">This working Qalt form uses sample courier rates. Enter a pickup and dropoff to see instant pricing, the breakdown and the request flow. Payments are disabled in the demo.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/demo/try" className="w-full border border-slate-950/15 bg-white px-8 py-4 text-center text-sm font-bold text-slate-900 hover:bg-slate-50 sm:w-auto">Open full-size demo</Link>
            <a href="#live-demo" className="group/btn flex w-full items-center justify-center gap-3 bg-red-600 px-8 py-4 text-sm font-black text-white transition hover:bg-red-700 sm:w-auto">
              Try the Live Demo <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1.5" />
            </a>
            <Link href="/register" className="w-full border border-slate-950/15 bg-white/55 px-8 py-4 text-center text-sm font-black text-slate-900 transition hover:bg-white sm:w-auto">Create Your Qalt Account</Link>
          </div>
        </div>
      </section>

      {/* 3. Live demo — full-width showroom. The widget renders inline (no
           iframe) and is the main visual element. The frame spans the whole
           section so the widget's own wide layout (max-w-5xl side-map view on
           the quote step) has room; nothing is clamped to a narrow column. */}
      <section id="live-demo" className="scroll-mt-24 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight mb-4">
            Try Qalt like a real customer
          </h2>
          <p className="text-slate-500 font-medium text-base sm:text-lg leading-relaxed">
            Choose Standard, Extended, or Vehicle Options, then try the same quote form your customers would use. Preview your branding and watch the route map expand beside the quote.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            ["Standard", "A guided delivery quote with route, shipment, and contact details."],
            ["Extended", "The Standard flow plus custom questions and answer choices."],
            ["Vehicle Options", "Visual vehicle selection with instant pricing and a full breakdown."],
          ].map(([title, description]) => (
            <div key={title} className="border-t-2 border-slate-900 pt-4">
              <h3 className="text-sm font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
            </div>
          ))}
          <p className="text-xs leading-5 text-slate-500 sm:col-span-3">All three templates are available in the dashboard. Pro and Enterprise support custom logos and branding. Enterprise adds payments and advanced appearance settings. This demo uses sample rates, with payments disabled.</p>
        </div>

        <div className="overflow-hidden border border-slate-950/15 bg-white shadow-[0_30px_80px_-45px_rgba(0,0,0,0.35)]">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 border-b border-slate-200">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-300" />
              <span className="w-3 h-3 rounded-full bg-slate-300" />
              <span className="w-3 h-3 rounded-full bg-slate-300" />
            </div>
            <div className="ml-2 flex-1 max-w-[240px] px-3 py-1 rounded-md bg-white border border-slate-200 text-[11px] text-slate-400 font-semibold truncate">
              yourdeliverycompany.com
            </div>
          </div>
          {demoCompanies.length > 0 ? (
            // Gated: the interactive widget (and Google Maps) only mount after a
            // visitor completes the human-verified access form. Until then a
            // static, non-interactive preview is shown. Not iframed, so once
            // unlocked the map and address autocomplete work as in-page elements.
            <GatedDemo companies={demoCompanies} />
          ) : (
            <div className="h-[420px] flex flex-col items-center justify-center text-center px-8 bg-slate-50 gap-3">
              <p className="text-sm font-bold text-slate-700">Live demo coming online</p>
              <p className="text-xs text-slate-400 font-medium max-w-xs">The interactive quote and booking widget will appear here.</p>
            </div>
          )}
        </div>
        <p className="mt-4 text-center text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
          This is exactly what your customers would use
        </p>
      </section>

      {/* 4. Sell the outcome */}
      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-black uppercase tracking-widest text-red-600 mb-4">What you get</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              Your customers get prices faster. You receive complete requests.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {OUTCOMES.map((o, index) => (
              <div key={o.title} className="flex gap-4">
                <span className="shrink-0 pt-0.5 text-xs font-semibold tabular-nums text-slate-400" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-base font-black text-slate-900 mb-1.5">{o.title}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{o.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Qalt — before / after */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight text-center max-w-2xl mx-auto mb-14">
          Stop quoting every delivery by hand.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="border border-slate-200 bg-white p-8">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Before Qalt</p>
            <ul className="space-y-3.5">
              {BEFORE.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-500 font-medium">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                    <X size={12} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* With */}
          <div className="border-2 border-red-100 bg-red-50/40 p-8">
            <p className="text-xs font-black uppercase tracking-widest text-red-600 mb-6">With Qalt</p>
            <ul className="space-y-3.5">
              {WITH.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-800 font-bold">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Credibility */}
      <section className="relative overflow-hidden bg-[#0b0b0c]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[45%] h-[70%] bg-red-700/15 blur-[120px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 py-20 sm:py-24 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-red-400 mb-4">Built for delivery companies</p>
          <p className="text-xl sm:text-2xl font-bold text-white/90 leading-relaxed max-w-2xl mx-auto mb-10">
            Qalt is designed around real delivery pricing workflows, so the quote your customer sees matches how you actually charge.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {PRICING_RULES.map((r) => (
              <span key={r} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-bold">
                {r}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Lead conversion */}
      <section id="request" className="scroll-mt-24 max-w-5xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="lg:pt-4">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight mb-4">
              Want Qalt on your website?
            </h2>
            <p className="text-slate-500 font-medium text-base sm:text-lg leading-relaxed">
              Tell us about your delivery business and we will show you how Qalt could work with your pricing, branding, and services.
            </p>
            <div className="mt-8 hidden lg:flex items-center gap-2 text-sm font-bold text-slate-400">
              <Mail size={16} /> Prefer email?{" "}
              <a href="mailto:business@qalt.site" className="text-red-600 hover:text-red-500 transition-colors">business@qalt.site</a>
            </div>
          </div>
          <DemoLeadForm />
        </div>
      </section>

      {/* 8. Footer CTA */}
      <section className="bg-[#080B14] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[45%] h-[70%] bg-red-700/20 blur-[120px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 py-20 sm:py-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-8 leading-tight max-w-2xl mx-auto">
            Ready to put instant delivery quotes on your website?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/register"
              className="group/btn w-full sm:w-auto px-8 py-4 bg-red-600 text-white font-black rounded-none flex items-center justify-center gap-3 hover:bg-red-500 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-red-900/40 text-sm tracking-wide"
            >
              Create Your Qalt Account
              <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform" />
            </Link>
            <a
              href="mailto:business@qalt.site"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white/80 font-black rounded-none hover:bg-white/10 hover:border-white/20 transition-all text-center text-sm tracking-wide inline-flex items-center justify-center gap-2"
            >
              <Mail size={16} /> Email business@qalt.site
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <QuoteOutcomeFAQ />
      <MarketingFooter />
    </div>
  );
}
