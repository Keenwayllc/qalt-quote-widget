"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import QaltLogo from "@/components/shared/QaltLogo";
import QaltIcon from "@/components/shared/QaltIcon";
import {
  Calculator,
  ArrowRight,
  ArrowUp,
  Zap,
  ShieldCheck,
  MousePointerClick,
  Layout,
  BarChart3,
  Code2,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";
import HowItWorksAnimation from "@/components/landing/HowItWorksAnimation";
import AnalyticsAnimation from "@/components/landing/AnalyticsAnimation";
import SupportModal from "@/components/shared/SupportModal";

const BANNER_IMAGES = [
  {
    src: "/images/banner-1.jpg",
    headline: <>Instant delivery quotes<br /><span className="text-blue-400">on your website.</span></>,
    sub: "Qalt gives delivery companies a white-label quote widget that prices jobs fast, captures leads, and cuts down manual quoting.",
  },
  {
    src: "/images/banner-2.jpg",
    headline: <>Your brand. Your prices.<br /><span className="text-blue-400">On autopilot.</span></>,
    sub: "Set your pricing rules once and let your site handle the rest — no more back-and-forth quotes over the phone.",
  },
  {
    src: "/images/company owner.jpeg",
    headline: <>Built for businesses<br /><span className="text-emerald-400">small and large.</span></>,
    sub: "From solo couriers to enterprise fleets — Qalt scales with your operation so you can focus on delivering, not quoting.",
  },
];

// Reusable fade-up animation for scroll-triggered sections
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.08 },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
};

export default function LandingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 500], [0, 80]);
  const navBg = useTransform(scrollY, [0, 80], ["rgba(255,255,255,0.8)", "rgba(255,255,255,0.97)"]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BANNER_IMAGES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <motion.nav
        style={{ backgroundColor: navBg }}
        className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <QaltLogo size="xl" />

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-10 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <button onClick={() => scrollTo("features")} className="hover:text-blue-600 transition-colors">Features</button>
            <button onClick={() => scrollTo("how-it-works")} className="hover:text-blue-600 transition-colors">How it Works</button>
            <button onClick={() => scrollTo("use-cases")} className="hover:text-blue-600 transition-colors">Use Cases</button>
            <Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="hidden sm:block px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-all hover:bg-slate-50 rounded-xl"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95 transition-all"
            >
              Get Started
            </Link>
            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden bg-white border-t border-slate-100 shadow-lg overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
                <button onClick={() => scrollTo("features")} className="block w-full text-left px-4 py-3 text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                  Features
                </button>
                <button onClick={() => scrollTo("how-it-works")} className="block w-full text-left px-4 py-3 text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                  How it Works
                </button>
                <button onClick={() => scrollTo("use-cases")} className="block w-full text-left px-4 py-3 text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                  Use Cases
                </button>
                <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                  Pricing
                </Link>
                <div className="pt-2 pb-1 border-t border-slate-100">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors">
                    Log in
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Rotating Background Images with parallax */}
          <motion.div
            style={{ y: heroParallax }}
            className="absolute inset-0 scale-110"
          >
            {BANNER_IMAGES.map((banner, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
              >
                <Image
                  src={banner.src}
                  alt={`Qalt Banner ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover object-top"
                />
              </div>
            ))}
          </motion.div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50 z-10" />

          {/* Slide indicator dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {BANNER_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`rounded-full transition-all duration-500 ${
                  index === currentImageIndex
                    ? "w-6 h-2 bg-white"
                    : "w-2 h-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          {/* Content — per-slide text crossfades */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 text-center pt-28 sm:pt-36 pb-28 sm:pb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-xs font-black uppercase tracking-widest mb-6 sm:mb-8 border border-white/20"
            >
              <Zap size={14} className="fill-yellow-400 text-yellow-400" />
              Start free. No card required.
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.h1
                key={`headline-${currentImageIndex}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight mb-6 sm:mb-8 leading-[0.9] text-white drop-shadow-lg"
              >
                {BANNER_IMAGES[currentImageIndex].headline}
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${currentImageIndex}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
                className="max-w-2xl mx-auto text-base sm:text-xl text-white/80 mb-10 sm:mb-12 font-medium leading-relaxed px-2"
              >
                {BANNER_IMAGES[currentImageIndex].sub}
              </motion.p>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            >
              <Link href="/register" className="group/btn w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-500 transition-all hover:scale-[1.03] active:scale-[0.98] shadow-xl shadow-blue-900/30">
                Get Started Free
                <ArrowRight className="group-hover/btn:translate-x-1.5 transition-transform" />
              </Link>
              <Link href="/pricing" className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-center">
                View Pricing
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="text-sm text-white/50 font-medium"
            >
              No card required. Set up in minutes.
            </motion.p>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 sm:py-32 bg-slate-50 relative overflow-hidden scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="text-center mb-16 sm:mb-24"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 mb-6">
                Built for delivery companies
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6">Set your pricing once. Let your site quote for you.</h2>
              <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto font-medium">Qalt helps you price deliveries faster, capture more quote requests, and keep your brand front and center.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: <Calculator className="text-blue-600" />,
                  title: "Smart Pricing Rules",
                  desc: "Set rates by distance, weight, dimensions, service type, and more. Quote accurately without manual back and forth."
                },
                {
                  icon: <Code2 className="text-blue-600" />,
                  title: "Fast Embed",
                  desc: "Add Qalt to WordPress, Shopify, Webflow, or any site with a simple embed. Go live fast without a custom build."
                },
                {
                  icon: <Layout className="text-blue-600" />,
                  title: "Full White-Label",
                  desc: "Use your logo, colors, and branding across the quote flow. Customers stay in your brand from quote to submission."
                },
                {
                  icon: <MousePointerClick className="text-blue-600" />,
                  title: "Built to Capture Leads",
                  desc: "Guide customers through a simple quote flow that collects the details you need. Turn site traffic into real quote requests."
                },
                {
                  icon: <BarChart3 className="text-blue-600" />,
                  title: "Quote Analytics",
                  desc: "See quote volume, conversion trends, and where leads drop off. Improve pricing and spot lost opportunities."
                },
                {
                  icon: <ShieldCheck className="text-blue-600" />,
                  title: "Flexible for Real Delivery Workflows",
                  desc: "Handle local delivery, scheduled jobs, special handling, and more. Fits how delivery businesses price in the real world."
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  custom={i}
                  variants={fadeUp}
                  className="bg-linear-to-b from-white to-slate-50 p-7 sm:p-9 rounded-xl border border-slate-200 hover:shadow-lg hover:shadow-blue-900/5 hover:-translate-y-1.5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-blue-600/10 border border-blue-100 rounded-lg flex items-center justify-center mb-6 sm:mb-7 group-hover:bg-blue-600/15 group-hover:scale-110 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-black mb-3 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works — Animated Section */}
        <section id="how-it-works" className="py-24 sm:py-40 bg-white relative overflow-hidden scroll-mt-20">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-[100px] -z-10" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="max-w-7xl mx-auto px-4 sm:px-6"
          >
            <HowItWorksAnimation />
          </motion.div>
        </section>

        {/* Analytics Section — dark background */}
        <section className="py-24 sm:py-40 bg-slate-950 relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] -z-10" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="max-w-7xl mx-auto px-4 sm:px-6"
          >
            <AnalyticsAnimation />
          </motion.div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 sm:py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="text-center mb-14 sm:mb-20"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6">Simple pricing for teams of any size</h2>
              <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto font-medium">Start free. Upgrade when you need more quote volume, more forms, and more control.</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={1}
              className="grid grid-cols-1 md:grid-cols-3 rounded-2xl overflow-hidden shadow-xl max-w-5xl mx-auto border border-slate-200 bg-white"
            >
              {/* Starter */}
              <div className="bg-white p-8 sm:p-10 flex flex-col rounded-2xl relative shadow-sm border border-slate-200">
                <div className="h-[240px]">
                  <div className="mb-8 p-0">
                    <h3 className="text-2xl font-black mb-2">Starter</h3>
                    <p className="text-slate-500 text-sm font-medium">Perfect for launching your first quote widget.</p>
                  </div>
                  <div className="mb-0 flex items-end gap-1">
                    <span className="text-5xl font-black">Free</span>
                  </div>
                  <p className="text-slate-400 text-sm font-medium">Free forever</p>
                </div>
                <Link href="/register" className="block w-full text-center py-4 bg-slate-900 text-white rounded-xl font-bold text-sm hover:opacity-90 hover:-translate-y-0.5 active:scale-95 transition-all mb-8">
                  Get Started Free
                </Link>
                <ul className="space-y-3 mt-auto">
                  {["1 Quote Widget", "25 Quotes/month", "Basic Customization", "Email Support"].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-600 font-medium text-sm">
                      <CheckCircle2 size={16} className="text-slate-400 shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro */}
              <div className="bg-slate-900 p-8 sm:p-10 flex flex-col rounded-2xl relative shadow-2xl z-10">
                <div className="h-[240px]">
                  <div className="mb-8 p-0">
                    <h3 className="text-2xl font-black text-white mb-2">Pro</h3>
                    <p className="text-slate-400 text-sm font-medium">For growing delivery companies that need more volume.</p>
                  </div>
                  <div className="mb-0 flex items-end gap-1">
                    <span className="text-5xl font-black text-white">$14</span>
                    <span className="text-slate-400 font-medium text-lg mb-1">/mo</span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">Billed annually</p>
                </div>
                <Link href="/register" className="block w-full text-center py-4 bg-violet-600 text-white rounded-xl font-bold text-sm hover:bg-violet-500 hover:-translate-y-0.5 active:scale-95 transition-all mb-8 shadow-lg shadow-violet-900/20">
                  Upgrade to Pro
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
              <div className="bg-white p-8 sm:p-10 flex flex-col rounded-2xl relative shadow-sm border border-slate-200">
                <div className="h-[240px]">
                  <div className="mb-8 p-0">
                    <h3 className="text-2xl font-black mb-2">Enterprise</h3>
                    <p className="text-slate-500 text-sm font-medium">For high-volume operators that need more control.</p>
                  </div>
                  <div className="mb-0 flex items-end gap-1">
                    <span className="text-5xl font-black">$29</span>
                    <span className="text-slate-400 font-medium text-lg mb-1">/mo</span>
                  </div>
                  <p className="text-slate-400 text-sm font-medium">Billed annually</p>
                </div>
                <Link href="/register" className="block w-full text-center py-4 bg-slate-900 text-white rounded-xl font-bold text-sm hover:opacity-90 hover:-translate-y-0.5 active:scale-95 transition-all mb-8">
                  Upgrade to Enterprise
                </Link>
                <ul className="space-y-3 mt-auto">
                  {["Everything in Pro", "Unlimited Quote Forms", "Team Management (Multi-user)", "Advanced Webhooks & API", "Success Manager & SLA"].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-600 font-medium text-sm">
                      <CheckCircle2 size={16} className="text-slate-400 shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={2}
              className="text-center mt-10"
            >
              <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                View full feature comparison →
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Use Cases */}
        <section id="use-cases" className="py-20 sm:py-32 bg-linear-to-br from-slate-900 via-slate-900 to-blue-950 text-white overflow-hidden relative scroll-mt-20">
          <div className="absolute -bottom-40 -right-40 pointer-events-none select-none" aria-hidden="true">
            <QaltIcon size={2000} color="rgba(255,255,255,0.05)" eyeColor="rgba(255,255,255,0.09)" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="mb-12 sm:mb-16 text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white/70 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 mb-6">
                Built for teams that deliver
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                Made for businesses that need fast, accurate delivery quotes
              </h2>
              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-medium">
                Qalt works well for teams that price deliveries every day and want a faster way to capture quote requests online.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {[
                { title: "Courier companies", desc: "Instant quotes for local and same-day jobs." },
                { title: "Pharmacies and medical delivery", desc: "Clear pricing for time-sensitive deliveries." },
                { title: "Furniture and large-item delivery", desc: "Price by distance, size, and service needs." },
                { title: "Floral, bakery, and local retail", desc: "Add premium delivery without manual quote calls." },
                { title: "Auto parts and suppliers", desc: "Turn your website into a lead capture tool." },
                { title: "Agencies and web designers", desc: "Add branded quote tools for client sites." },
              ].map((useCase, i) => (
                <motion.div
                  key={useCase.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  custom={i}
                  variants={fadeUp}
                  className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <h3 className="text-lg font-black text-white mb-2">{useCase.title}</h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed">{useCase.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 sm:py-40 relative bg-white overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, rotate: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, rotate: 6, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-blue-500 to-blue-700 rounded-2xl mx-auto mb-8 sm:mb-10 flex items-center justify-center shadow-2xl shadow-blue-500/25"
            >
              <Zap size={36} className="text-white fill-white" />
            </motion.div>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 sm:mb-8 tracking-tighter leading-[0.9]"
            >
              Put instant delivery quotes<br />on your site
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
              className="text-lg sm:text-xl text-slate-500 mb-10 sm:mb-12 font-medium"
            >
              Start with the free plan and see how Qalt fits your workflow.
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4"
            >
              <Link href="/register" className="inline-flex px-8 sm:px-12 py-4 sm:py-5 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl font-black text-base sm:text-lg hover:from-blue-700 hover:to-blue-800 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl shadow-blue-300">
                Get Started Free
              </Link>
              <Link href="/pricing" className="inline-flex px-8 sm:px-10 py-4 sm:py-5 border-2 border-slate-200 text-slate-700 rounded-xl font-bold text-base sm:text-lg hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98] transition-all">
                View Pricing
              </Link>
            </motion.div>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
              variants={fadeUp}
              className="text-sm text-slate-400 font-medium"
            >
              No card required.
            </motion.p>
          </div>
        </section>
      </main>

      <footer className="py-14 sm:py-20 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
            <div className="flex flex-col items-center md:items-start gap-4 sm:gap-6">
              <QaltLogo size="xl" />
              <p className="text-slate-400 font-medium text-sm">© 2025 Qalt. All rights reserved.</p>
            </div>
            <div className="flex gap-8 sm:gap-10 text-sm font-bold text-slate-400 uppercase tracking-widest">
              <Link href="/legal/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
              <Link href="/legal/terms" className="hover:text-blue-600 transition-colors">Terms</Link>
              <button onClick={() => setIsSupportModalOpen(true)} className="hover:text-blue-600 transition-colors">Support</button>
            </div>
          </div>
        </div>
      </footer>

      <SupportModal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-11 h-11 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-full shadow-xl shadow-blue-500/25 flex items-center justify-center hover:bg-blue-700 hover:scale-110 active:scale-95 transition-all duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
