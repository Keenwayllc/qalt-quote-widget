import Link from "next/link";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import PublicNav from "@/components/shared/PublicNav";
import QaltLogo from "@/components/shared/QaltLogo";
import DemoLeadForm from "@/components/landing/DemoLeadForm";
import QuoteWidgetForm from "@/components/widget/QuoteWidgetForm";
import {
  ArrowRight, Zap, Globe, ReceiptText, CreditCard, ClipboardCheck,
  SlidersHorizontal, PackageCheck, Check, X, Mail,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Live Demo · Qalt — Turn website visitors into paid delivery bookings",
  description:
    "Try Qalt like a real customer. Delivery companies add an instant quote and booking form to their website so customers see transparent pricing, book the job, and move toward payment without calling.",
};

// Points ONLY at a dedicated demo merchant configured via env, and only if that
// company actually exists with a widget. It must NEVER fall back to a real
// customer's widget — a missing OR invalid id just shows the neutral placeholder.
// Returns the full company (pricing + widget settings) so the widget can render
// inline on this page, exactly like the standalone /widget/[id] embed does — no
// iframe, so the route map and address autocomplete load as normal in-page elements.
async function resolveDemoCompany() {
  const id = (process.env.DEMO_COMPANY_ID || process.env.NEXT_PUBLIC_DEMO_COMPANY_ID)?.trim();
  if (!id) return null;
  const company = await prisma.company.findUnique({
    where: { id },
    include: { pricingProfiles: true, widgetSettings: true },
  });
  if (!company || company.widgetSettings.length === 0) return null;

  const widgetSettings = company.widgetSettings[0];
  const pricingProfile = company.pricingProfiles.find((p) => p.widgetSettingsId === null);
  return { ...company, widgetSettings, pricingProfile };
}

const VALUE_STRIP: { icon: React.ComponentType<{ size?: number; className?: string }>; label: string }[] = [
  { icon: Zap, label: "Instant Quotes" },
  { icon: ClipboardCheck, label: "Booking Intake" },
  { icon: ReceiptText, label: "Transparent Pricing" },
  { icon: CreditCard, label: "Online Payment Ready" },
];

const OUTCOMES: { icon: React.ComponentType<{ size?: number; className?: string }>; title: string; body: string }[] = [
  { icon: Zap, title: "Quote instantly", body: "Customers see a delivery price without calling or waiting for a response." },
  { icon: SlidersHorizontal, title: "Use your pricing", body: "Qalt uses your mileage, weight, item, vehicle, stairs, inside delivery, after-hours, and large-item rules." },
  { icon: ReceiptText, title: "Show the breakdown", body: "Customers see where the price comes from, which builds trust and cuts the back-and-forth." },
  { icon: PackageCheck, title: "Capture the booking", body: "Qalt collects customer and delivery details before you follow up." },
  { icon: Globe, title: "Add it to your website", body: "Embed Qalt with one snippet instead of rebuilding your site." },
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
  "Customer submits the booking",
  "You receive a complete lead",
  "Payment flow on supported plans",
];

const PRICING_RULES = [
  "Mileage", "Weight", "Item count", "Stairs", "Inside delivery",
  "After-hours fees", "Vehicle pricing", "Large-item categories",
];

export default async function DemoPage() {
  const demoCompany = await resolveDemoCompany();

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-red-100 selection:text-red-900">
      <PublicNav />

      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-[#080B14] pt-28 sm:pt-36 pb-20 sm:pb-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d0f1a] via-[#0d0813] to-[#130810]" />
          <div className="absolute bottom-0 left-0 w-[55%] h-[55%] bg-red-700/20 blur-[120px] rounded-full" />
          <div className="absolute top-0 right-0 w-[45%] h-[45%] bg-amber-600/10 blur-[100px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md text-white/80 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-white/10">
            <Zap size={13} className="fill-yellow-400 text-yellow-400" /> Live demo
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-6">
            Turn website visitors into
            <br />
            <span className="text-red-400">paid delivery bookings.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/55 mb-10 font-medium leading-relaxed max-w-2xl mx-auto">
            Qalt gives delivery companies an instant quote and booking form they can add to their website.
            Customers enter delivery details, see transparent pricing, book the job, and move into payment without waiting for a callback.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#live-demo"
              className="group/btn w-full sm:w-auto px-8 py-4 bg-red-600 text-white font-black rounded-none flex items-center justify-center gap-3 hover:bg-red-500 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-red-900/40 text-sm tracking-wide"
            >
              Try the Live Demo
              <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform" />
            </a>
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white/80 font-black rounded-none hover:bg-white/10 hover:border-white/20 transition-all text-center text-sm tracking-wide"
            >
              Create Your Qalt Account
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Value strip */}
      <section className="border-b border-slate-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {VALUE_STRIP.map((v) => (
            <div key={v.label} className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <v.icon size={17} />
              </div>
              <span className="text-sm font-black text-slate-800 tracking-tight">{v.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Live demo */}
      <section id="live-demo" className="scroll-mt-24 max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-24">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight mb-4">
            Try Qalt like a real customer
          </h2>
          <p className="text-slate-500 font-medium text-base sm:text-lg leading-relaxed">
            Enter a pickup and dropoff, add shipment details, and see how Qalt calculates a delivery quote using real merchant pricing rules.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] border border-slate-200 bg-white">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 border-b border-slate-200">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="ml-2 flex-1 max-w-[240px] px-3 py-1 rounded-md bg-white border border-slate-200 text-[11px] text-slate-400 font-semibold truncate">
                yourdeliverycompany.com
              </div>
            </div>
            {demoCompany ? (
              // Rendered inline (not iframed) so the route map and address
              // autocomplete load as normal in-page elements.
              <div className="bg-slate-100 px-4 py-8 sm:px-6 sm:py-10">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <QuoteWidgetForm company={demoCompany as any} />
              </div>
            ) : (
              <div className="h-[420px] flex flex-col items-center justify-center text-center px-8 bg-slate-50 gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
                  <Zap size={22} />
                </div>
                <p className="text-sm font-bold text-slate-700">Live demo coming online</p>
                <p className="text-xs text-slate-400 font-medium max-w-xs">The interactive quote and booking widget will appear here.</p>
              </div>
            )}
          </div>
          <p className="mt-3 text-center text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
            This is exactly what your customers would use
          </p>
        </div>
      </section>

      {/* 4. Sell the outcome */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-black uppercase tracking-widest text-red-600 mb-4">What you get</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              Your customers get answers faster. You get better leads.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {OUTCOMES.map((o) => (
              <div key={o.title} className="flex gap-4">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-white border border-slate-200 text-red-600 flex items-center justify-center shadow-sm">
                  <o.icon size={20} />
                </div>
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
          <div className="rounded-3xl border border-slate-200 bg-white p-8">
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
          <div className="rounded-3xl border-2 border-red-100 bg-red-50/40 p-8">
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
      <section className="bg-[#080B14] relative overflow-hidden">
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
      <footer className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <QaltLogo size="sm" />
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-bold text-slate-500">
            <Link href="/pricing" className="hover:text-red-600 transition-colors">Pricing</Link>
            <Link href="/partners" className="hover:text-red-600 transition-colors">Partners</Link>
            <Link href="/register" className="hover:text-red-600 transition-colors">Get Started Free</Link>
            <Link href="/login" className="hover:text-red-600 transition-colors">Log In</Link>
          </nav>
          <p className="text-slate-400 font-medium text-sm">© 2026 Qalt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
