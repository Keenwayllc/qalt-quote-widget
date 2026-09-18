"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  BarChart3,
  Calculator,
  Check,
  CheckCircle2,
  Code2,
  CreditCard,
  FileText,
  Gauge,
  LayoutDashboard,
  MapPin,
  Palette,
  Route,
  ShieldCheck,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react";
import PublicNav from "@/components/shared/PublicNav";
import QaltLogo from "@/components/shared/QaltLogo";
import SupportModal from "@/components/shared/SupportModal";
import HeroDashboardMockup from "@/components/landing/HeroDashboardMockup";
import HowItWorksAnimation from "@/components/landing/HowItWorksAnimation";

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
    description: "Use your logo, colors, and branded quote experience. Pro and Enterprise can remove Qalt branding.",
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
    items: ["Everything in Pro", "Stripe payments", "Vehicle & fleet quoting", "Unlimited forms + webhooks"],
    cta: "Explore Enterprise",
    href: "/pricing",
    dark: false,
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-red-700">
      <Sparkles size={11} />
      {children}
    </div>
  );
}

export default function LandingPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-950 selection:bg-red-100 selection:text-red-900">
      <PublicNav />

      <main>
        <section className="relative overflow-hidden bg-[#08090c] pt-28 sm:pt-32">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-red-700/20 blur-[130px]" />
            <div className="absolute right-[-12%] top-[8%] h-[560px] w-[560px] rounded-full bg-violet-900/15 blur-[150px]" />
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.7) 1px,transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />
          </div>

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 sm:px-8 sm:pb-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-10">
            <div className="text-center lg:text-left">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-[11px] font-bold text-white/70"
              >
                <Zap size={13} className="fill-red-500 text-red-500" />
                Built for courier, delivery & final-mile companies
              </motion.div>

              <motion.h1
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="text-[clamp(3rem,6.4vw,5.7rem)] font-black leading-[0.92] tracking-[-0.055em] text-white"
              >
                Stop making customers
                <span className="block text-red-500">wait for a quote.</span>
              </motion.h1>

              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="mx-auto mt-7 max-w-xl text-base font-medium leading-7 text-white/58 sm:text-lg lg:mx-0"
              >
                Put an instant delivery quote form on your website using your rates, services, vehicles, fees, and branding. Use Qalt for quotes only, or add booking and payment when your workflow is ready.
              </motion.p>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18 }}
                className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
              >
                <Link
                  href="/register"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-7 py-4 text-sm font-black text-white shadow-[0_18px_45px_-18px_rgba(220,38,38,.85)] transition hover:-translate-y-0.5 hover:bg-red-500 sm:w-auto"
                >
                  Start Free
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-7 py-4 text-sm font-bold text-white transition hover:bg-white/[0.1] sm:w-auto"
                >
                  See the Live Demo
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-white/42 lg:justify-start"
              >
                {["No card required", "Free plan available", "14-day Pro trial", "Payments optional"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <Check size={12} className="text-emerald-400" />
                    {item}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 30, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.14, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-[720px]"
            >
              <div className="absolute -inset-8 rounded-[40px] bg-red-600/10 blur-3xl" />
              <div className="relative">
                <HeroDashboardMockup />
              </div>
            </motion.div>
          </div>

          <div className="relative border-y border-white/[0.08] bg-white/[0.035]">
            <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-white/[0.08] px-5 sm:grid-cols-4 sm:divide-y-0 sm:px-8 lg:px-10">
              {[
                ["Instant", "customer pricing"],
                ["Your rules", "control the quote"],
                ["White-label", "on paid plans"],
                ["Optional", "online payments"],
              ].map(([top, bottom]) => (
                <div key={top} className="px-4 py-5 text-center">
                  <div className="text-sm font-black text-white">{top}</div>
                  <div className="mt-1 text-[11px] font-medium text-white/38">{bottom}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-24 bg-[#f7f8fa] py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={reveal}
              className="mx-auto max-w-3xl text-center"
            >
              <SectionLabel>One quote flow, your business rules</SectionLabel>
              <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
                Replace the “we’ll get back to you” form.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-7 text-slate-500 sm:text-lg">
                Qalt turns a basic inquiry form into a pricing experience your customers can actually use, without forcing you to change how you run the rest of your business.
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
                    className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_16px_45px_-38px_rgba(15,23,42,.5)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_60px_-36px_rgba(15,23,42,.38)]"
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-xl border border-red-100 bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                      <Icon size={19} />
                    </div>
                    <h3 className="mt-6 text-lg font-black tracking-tight text-slate-950">{feature.title}</h3>
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

        <section className="overflow-hidden bg-slate-950 py-24 text-white sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-white/60">
                  <Gauge size={12} />
                  Built around your workflow
                </div>
                <h2 className="mt-6 text-4xl font-black leading-[1.02] tracking-[-0.045em] sm:text-5xl">
                  Start with quoting.
                  <span className="block text-red-500">Add more only when you want it.</span>
                </h2>
                <p className="mt-5 max-w-xl text-base font-medium leading-7 text-slate-400 sm:text-lg">
                  Qalt does not require you to replace your dispatch system or accept payments online. Start with the part customers feel first: getting a price quickly.
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
              <SectionLabel>Made for delivery businesses</SectionLabel>
              <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] sm:text-5xl">
                If you price a delivery, Qalt can help automate the quote.
              </h2>
              <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-500 sm:text-lg">
                From a local courier with one vehicle to a fleet handling larger jobs, the quote form can reflect the services you actually sell.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
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
                  <Truck size={19} className="text-red-600" />
                  <h3 className="mt-5 text-lg font-black tracking-tight">{title}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-500">{description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-[#f7f8fa] py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} className="text-center">
              <SectionLabel>Simple plans</SectionLabel>
              <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] sm:text-5xl">Start free. Grow when Qalt proves useful.</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-7 text-slate-500 sm:text-lg">
                Start with the free plan and a 14-day Pro trial. Upgrade when you need more forms, branding, operations, payments, or fleet quoting.
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
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-red-600 text-white shadow-xl shadow-red-200">
                <Zap size={24} className="fill-white" />
              </div>
              <h2 className="mx-auto mt-7 max-w-4xl text-4xl font-black leading-[1] tracking-[-0.05em] sm:text-6xl">
                Your customers already want a price.
                <span className="block text-red-600">Give it to them now.</span>
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
              <p className="mt-4 text-xs font-semibold text-slate-400">No card required · Free plan available · 14-day Pro trial</p>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 bg-white py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_.7fr_.7fr_.7fr]">
            <div>
              <QaltLogo size="md" />
              <p className="mt-4 max-w-xs text-sm font-medium leading-6 text-slate-500">
                Instant delivery quotes using your rates, your services, and your brand.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Product</p>
              <div className="mt-4 space-y-3 text-sm font-semibold text-slate-600">
                <Link className="block hover:text-red-600" href="/demo">Live Demo</Link>
                <Link className="block hover:text-red-600" href="/what-qalt-does">What Qalt Does</Link>
                <Link className="block hover:text-red-600" href="/compare">Compare</Link>
                <Link className="block hover:text-red-600" href="/pricing">Pricing</Link>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Company</p>
              <div className="mt-4 space-y-3 text-sm font-semibold text-slate-600">
                <Link className="block hover:text-red-600" href="/blog">Blog</Link>
                <button className="block hover:text-red-600" onClick={() => setIsSupportModalOpen(true)}>Support</button>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Account</p>
              <div className="mt-4 space-y-3 text-sm font-semibold text-slate-600">
                <Link className="block hover:text-red-600" href="/register">Start Free</Link>
                <Link className="block hover:text-red-600" href="/login">Log In</Link>
                <Link className="block hover:text-red-600" href="/legal/privacy">Privacy</Link>
                <Link className="block hover:text-red-600" href="/legal/terms">Terms</Link>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-100 pt-7 text-xs font-medium text-slate-400">
            © 2026 Qalt Systems. All rights reserved.
          </div>
        </div>
      </footer>

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
