"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Calculator,
  Check,
  CheckCircle2,
  Code2,
  CreditCard,
  ExternalLink,
  FileText,
  LayoutDashboard,
  MapPin,
  Palette,
  Route,
} from "lucide-react";
import PublicNav from "@/components/shared/PublicNav";
import SupportModal from "@/components/shared/SupportModal";
import HeroDashboardMockup from "@/components/landing/HeroDashboardMockup";
import HowItWorksAnimation from "@/components/landing/HowItWorksAnimation";
import MarketingDemoDiversity from "@/components/shared/MarketingDemoDiversity";
import { featuredInsight } from "@/lib/featuredInsight";
import { TrustBadgeGrid } from "@/components/shared/TrustBadges";
import MarketingFooter from "@/components/shared/MarketingFooter";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.06, ease: "easeOut" as const },
  }),
};

const features = [
  {
    icon: Calculator,
    title: "Your pricing rules",
    description: "Configure mileage, minimums, service levels, weight, items, vehicles, after-hours fees, and add-ons.",
  },
  {
    icon: MapPin,
    title: "Instant route pricing",
    description: "Customers enter pickup and delivery addresses and Qalt calculates the route and quote in the moment.",
  },
  {
    icon: Palette,
    title: "Your brand, not ours",
    description: "Use your logo, colors, and branded quote experience. Pro and Enterprise can remove Qalt branding, and Enterprise can style the form to match your website.",
  },
  {
    icon: FileText,
    title: "Quote-only when you want it",
    description: "Use Qalt as a quote and lead-capture tool. Online payment is optional, so your existing workflow can stay intact.",
  },
  {
    icon: CreditCard,
    title: "Pay & Book when you need it",
    description: "Enterprise can add Stripe checkout so customers can move from price to payment without leaving the quote flow.",
  },
  {
    icon: LayoutDashboard,
    title: "Operations after the quote",
    description: "Pro and Enterprise include the Ops Console for jobs, stops, readiness checks, exceptions, and quote follow-up.",
  },
];

const useCases = [
  ["Courier & messenger", "Same-day, rush, scheduled, and local delivery quoting."],
  ["Final-mile delivery", "Price larger jobs with vehicle, weight, item, and service rules."],
  ["Medical & pharmacy", "Create clear pricing for time-sensitive delivery requests."],
  ["Furniture & oversized", "Account for size, stairs, inside delivery, and specialty handling."],
  ["Floral & local retail", "Give customers a delivery price without waiting for a callback."],
  ["Fleet operators", "Enterprise supports vehicle-based and multi-vehicle quoting."],
];

const plans = [
  {
    name: "Starter",
    price: "Free",
    note: "Free forever",
    description: "Launch your first instant quote form.",
    items: ["1 quote widget", "50 quotes / month", "Instant quote calculator", "Lead capture & storage"],
    cta: "Start Free",
    href: "/register",
    dark: false,
  },
  {
    name: "Pro",
    price: "$39",
    suffix: "/mo",
    note: "$29/mo billed annually",
    description: "For delivery companies ready to automate quoting.",
    items: ["Unlimited quotes", "Up to 5 quote forms", "White-label branding", "Ops Console + analytics"],
    cta: "Try Pro",
    href: "/register",
    dark: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    suffix: "/mo",
    note: "$79/mo billed annually",
    description: "For operators that want payments and deeper control.",
    items: ["Everything in Pro", "Stripe payments", "Website-matching form design", "Vehicle & fleet quoting", "Unlimited forms + webhooks"],
    cta: "Explore Enterprise",
    href: "/pricing",
    dark: false,
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.14em] text-red-600">{children}</p>
  );
}

export default function LandingPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-950 selection:bg-red-100 selection:text-red-900">
      {/* Mounted here, not only in the layout, so it rewrites demo text after
          this page hydrates (see MarketingDemoDiversity). */}
      <MarketingDemoDiversity routes={["/"]} />
      <PublicNav />

      <main>
        <section className="relative overflow-hidden bg-[#f4f2ec] pt-24 sm:pt-28 lg:pt-32">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-x-0 top-0 h-px bg-slate-950/[0.08]" />
            <div className="absolute -right-24 top-12 h-72 w-72 rounded-full bg-red-600/[0.055] blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 sm:px-8 sm:pb-24 lg:grid-cols-[0.84fr_1.16fr] lg:gap-16 lg:px-10 lg:pb-28">
            <div className="text-center lg:text-left">
              <div className="q-rise mb-7 flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500 lg:justify-start">
                <span className="h-2 w-2 bg-red-600" />
                Built for courier, delivery and final-mile operators
              </div>

              <h1
                style={{ "--d": "60ms" } as React.CSSProperties}
                className="q-reveal text-[clamp(3.35rem,7vw,6.55rem)] font-black leading-[0.86] tracking-[-0.065em] text-slate-950"
              >
                Instant delivery quotes.
                <span className="block text-slate-400">Built for logistics.</span>
              </h1>

              <p
                style={{ "--d": "140ms" } as React.CSSProperties}
                className="q-rise mx-auto mt-8 max-w-xl text-base font-medium leading-7 text-slate-600 sm:text-lg lg:mx-0"
              >
                Qalt gives delivery companies a branded quote experience for pricing, service areas, vehicles, fees and payments, without replacing the systems already running the operation.
              </p>

              <div
                style={{ "--d": "220ms" } as React.CSSProperties}
                className="q-rise mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
              >
                <Link
                  href="/register"
                  className="group inline-flex w-full items-center justify-center gap-2 bg-red-600 px-7 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-red-700 sm:w-auto"
                >
                  Get Started
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex w-full items-center justify-center gap-2 border border-slate-950/15 bg-white/55 px-7 py-4 text-sm font-black text-slate-900 transition hover:border-slate-950/30 hover:bg-white sm:w-auto"
                >
                  View Live Demo
                </Link>
              </div>

              <div
                style={{ "--d": "320ms" } as React.CSSProperties}
                className="q-rise mt-7 grid max-w-xl grid-cols-1 gap-px overflow-hidden border border-slate-950/10 bg-slate-950/10 text-left md:grid-cols-3"
              >
                {[
                  ["01", "Your rates", "Mileage, minimums, service levels and fees."],
                  ["02", "Your coverage", "ZIP codes, map areas and geo-fenced quoting."],
                  ["03", "Your brand", "Logo, colors, vehicle choices and customer flow."],
                ].map(([number, title, description]) => (
                  <div key={number} className="bg-[#f4f2ec] p-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-red-600">{number}</p>
                    <p className="mt-2 text-sm font-black text-slate-950">{title}</p>
                    <p className="mt-1 text-xs font-medium leading-5 text-slate-500">{description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{ "--d": "160ms" } as React.CSSProperties}
              className="q-slide-in relative mx-auto w-full max-w-[760px]"
            >
              <HeroDashboardMockup />
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-24 bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={reveal}
              className="mx-auto max-w-3xl text-center"
            >
              <SectionLabel>Front-end quoting</SectionLabel>
              <h2 className="mt-5 text-4xl font-black leading-[0.96] tracking-[-0.055em] text-slate-950 sm:text-6xl">
                Better software at the part your customer sees first.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-7 text-slate-500 sm:text-lg">
                Qalt turns your website from a contact form into a working delivery quote experience, while your dispatch and operations stack stays in place.
              </p>
            </motion.div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={reveal}
                    custom={index}
                    className="border border-slate-200 bg-white p-7 transition-colors hover:border-slate-400"
                  >
                    <Icon size={20} className="text-red-600" />
                    <h3 className="mt-5 text-lg font-black tracking-tight text-slate-950">{feature.title}</h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-slate-500">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-24 overflow-hidden bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <HowItWorksAnimation />
          </div>
        </section>

        <section className="overflow-hidden bg-[#0b0b0c] py-24 text-white sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-red-400">Built around your workflow</p>
                <h2 className="mt-6 text-4xl font-black leading-[1.02] tracking-[-0.045em] sm:text-5xl">
                  Start with quoting. Add booking and payment later, if ever.
                </h2>
                <p className="mt-5 max-w-xl text-base font-medium leading-7 text-slate-400 sm:text-lg">
                  You keep your dispatch system and your current way of getting paid. Qalt handles the first thing a customer asks for, which is a price.
                </p>
                <Link href="/what-qalt-does" className="mt-8 inline-flex items-center gap-2 text-sm font-black text-white hover:text-red-400">
                  See exactly what Qalt does <ArrowRight size={15} />
                </Link>
              </motion.div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  [Calculator, "Quote only", "Give instant estimates and capture the lead. Keep booking and payment manual."],
                  [Code2, "Embed anywhere", "Add the quote experience to your existing site with a simple embed."],
                  [CreditCard, "Add payments", "Enterprise can connect Stripe when you want customers to pay at booking."],
                  [Route, "Keep the job moving", "Carry quote, route, stops, and readiness context into the Ops Console."],
                ].map(([Icon, title, description], index) => {
                  const ItemIcon = Icon as typeof Calculator;
                  return (
                    <motion.div
                      key={title as string}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={reveal}
                      custom={index}
                      className="rounded-2xl border border-white/[0.09] bg-white/[0.045] p-6"
                    >
                      <ItemIcon size={19} className="text-red-500" />
                      <h3 className="mt-5 text-lg font-black">{title as string}</h3>
                      <p className="mt-2 text-sm font-medium leading-6 text-slate-400">{description as string}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="use-cases" className="scroll-mt-24 bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} className="max-w-3xl">
              <SectionLabel>Built for transportation</SectionLabel>
              <h2 className="mt-5 text-4xl font-black leading-[0.96] tracking-[-0.055em] sm:text-6xl">
                Software people understand. Logistics people recognize.
              </h2>
              <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-500 sm:text-lg">
                A one-van courier and a fleet running box trucks price jobs differently. The form follows the rules you set, not a template.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
              {useCases.map(([title, description], index) => (
                <motion.div
                  key={title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={reveal}
                  custom={index}
                  className="bg-white p-7 sm:p-8"
                >
                  <h3 className="text-lg font-black tracking-tight">{title}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-500">{description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <motion.a
              href={featuredInsight.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${featuredInsight.title} (opens on LinkedIn in a new tab)`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={reveal}
              className="group grid gap-9 overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.045] p-7 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.065] sm:p-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:p-12"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-red-400">From our founder</p>
                <p className="mt-3 text-sm font-medium text-white/50">
                  {featuredInsight.source} · {featuredInsight.author}
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-black leading-[1.08] tracking-[-0.04em] text-white sm:text-4xl">
                  {featuredInsight.title}
                </h2>
                <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-slate-400">
                  {featuredInsight.description}
                </p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-black text-white transition-colors group-hover:text-red-400">
                  Read on LinkedIn
                  <ExternalLink size={15} aria-hidden="true" />
                </span>
              </div>
            </motion.a>
          </div>
        </section>

        <section id="security" className="scroll-mt-24 bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <SectionLabel>Security</SectionLabel>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] sm:text-5xl">Safe for you and your customers.</h2>
                <p className="mt-5 text-base font-medium leading-7 text-slate-500 sm:text-lg">
                  Your customers type addresses and phone numbers into your form, and sometimes a card. Here is how that data is protected.
                </p>
              </div>
              <Link href="/security" className="inline-flex items-center gap-2 text-sm font-black text-red-600 hover:text-red-700">
                How Qalt handles security <ArrowRight size={15} />
              </Link>
            </div>
            <div className="mt-10">
              <TrustBadgeGrid />
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-[#f7f8fa] py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} className="text-center">
              <SectionLabel>Pricing</SectionLabel>
              <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] sm:text-5xl">Start free. Pay when it&apos;s earning you jobs.</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-7 text-slate-500 sm:text-lg">
                Start with the free Starter plan. Upgrade when you need more forms, branding, operations, payments, or fleet quoting.
              </p>
            </motion.div>

            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={reveal}
                  custom={index}
                  className={`relative flex flex-col rounded-2xl border p-7 sm:p-8 ${plan.dark ? "border-slate-900 bg-slate-950 text-white shadow-2xl shadow-slate-300/50" : "border-slate-200 bg-white text-slate-950"}`}
                >
                  {plan.dark && (
                    <span className="absolute right-5 top-5 rounded-full bg-red-600 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-white">
                      Most popular
                    </span>
                  )}
                  <h3 className="text-xl font-black">{plan.name}</h3>
                  <p className={`mt-2 min-h-12 text-sm font-medium leading-6 ${plan.dark ? "text-slate-400" : "text-slate-500"}`}>{plan.description}</p>
                  <div className="mt-7 flex items-end gap-1.5">
                    <span className="text-5xl font-black tracking-[-0.05em]">{plan.price}</span>
                    {plan.suffix && <span className={`mb-1 text-sm font-bold ${plan.dark ? "text-slate-400" : "text-slate-400"}`}>{plan.suffix}</span>}
                  </div>
                  <p className={`mt-1 text-xs font-semibold ${plan.dark ? "text-slate-500" : "text-slate-400"}`}>{plan.note}</p>

                  <div className={`my-7 border-t ${plan.dark ? "border-white/10" : "border-slate-100"}`} />
                  <ul className="space-y-3">
                    {plan.items.map((item) => (
                      <li key={item} className={`flex items-start gap-2.5 text-sm font-semibold ${plan.dark ? "text-slate-300" : "text-slate-600"}`}>
                        <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${plan.dark ? "text-red-500" : "text-slate-400"}`} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.href}
                    className={`mt-8 inline-flex items-center justify-center rounded-xl px-5 py-3.5 text-sm font-black transition hover:-translate-y-0.5 ${plan.dark ? "bg-red-600 text-white hover:bg-red-500" : "bg-slate-950 text-white hover:bg-slate-800"}`}
                  >
                    {plan.cta}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-black text-red-600 hover:text-red-700">
                Compare every feature and plan <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
              <h2 className="mx-auto max-w-4xl text-4xl font-black leading-[1] tracking-[-0.05em] sm:text-6xl">
                Your customers are already asking for a price.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-7 text-slate-500 sm:text-lg">
                Create your first Qalt form, use your own pricing, and see how instant quoting fits your delivery business.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/register" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-sm font-black text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5 hover:bg-red-700 sm:w-auto">
                  Start Free <ArrowRight size={16} />
                </Link>
                <Link href="/demo" className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-8 py-4 text-sm font-black text-slate-700 transition hover:bg-slate-50 sm:w-auto">
                  View Live Demo
                </Link>
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-400">No card required · Free Starter plan available</p>
            </motion.div>
          </div>
        </section>
      </main>

      <MarketingFooter />

      <SupportModal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} />

      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 grid h-11 w-11 place-items-center rounded-full bg-slate-950 text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-red-600"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
