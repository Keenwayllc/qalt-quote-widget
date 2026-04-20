"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import QaltLogo from "@/components/shared/QaltLogo";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PublicNav from "@/components/shared/PublicNav";
import HowItWorksAnimation from "@/components/landing/HowItWorksAnimation";
import AnalyticsAnimation from "@/components/landing/AnalyticsAnimation";
import TestimonialsCarousel from "@/components/landing/TestimonialsCarousel";
import SupportModal from "@/components/shared/SupportModal";

const BANNER_IMAGES = [
  {
    src: "/images/hero_banner_dark_ui.png",
    headline: <>Quote, book, and get paid<br /><span className="text-red-400">right on your site.</span></>,
    sub: "Qalt is a white-label tool for delivery companies. Embed it on your site so customers can get an instant price, book their delivery, and pay. No lifting a finger required.",
  },
  {
    src: "/images/hero_banner_van_wide.png",
    headline: <>Your rates. Your brand.<br /><span className="text-red-400">Zero phone tag.</span></>,
    sub: "Set your pricing rules once and Qalt handles the rest: instant quotes, online booking, and payment collection for your delivery business.",
  },
  {
    src: "/images/hero_banner_network_wide.png",
    headline: <>Built for delivery companies<br /><span className="text-emerald-400">big and small.</span></>,
    sub: "From solo couriers to multi-vehicle fleets, Qalt gives your business a professional quote and booking widget so you can focus on delivering, not quoting.",
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

const SLIDE_DURATION = 8000;

export default function LandingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 500], [0, 80]);

  // Mouse parallax
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseX = useSpring(rawMouseX, { stiffness: 60, damping: 20 });
  const mouseY = useSpring(rawMouseY, { stiffness: 60, damping: 20 });
  const bgX = useTransform(mouseX, [-1, 1], [-18, 18]);
  const bgY = useTransform(mouseY, [-1, 1], [-10, 10]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawMouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    rawMouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }, [rawMouseX, rawMouseY]);

  const startSlideTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BANNER_IMAGES.length);
    }, SLIDE_DURATION);
  }, []);

  useEffect(() => {
    startSlideTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startSlideTimer]);

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
    startSlideTimer();
  };

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-red-100 selection:text-red-900">
      {/* Navigation */}
      <PublicNav />

      <main>
        {/* Hero Section */}
        <section
          ref={heroRef}
          onMouseMove={handleMouseMove}
          className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden"
        >
          {/* Rotating Background Images — mouse parallax + scroll parallax */}
          <motion.div
            style={{ y: heroParallax, x: bgX, translateY: bgY }}
            className="absolute inset-0 scale-110"
          >
            {BANNER_IMAGES.map((banner, index) => (
              <motion.div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={index === currentImageIndex ? { scale: 1.06 } : { scale: 1 }}
                  transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                >
                  <Image
                    src={banner.src}
                    alt={`Qalt Banner ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-cover object-top"
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Ambient floating orbs — z-15 puts them above dark overlay (z-10) but below content (z-20) */}
          <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-red-500/20 blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl"
            />
            <motion.div
              animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
              className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full bg-white/10 blur-2xl"
            />
          </div>

          {/* Dark overlay */}
          <div className={`absolute inset-0 z-10 transition-all duration-1000 ${currentImageIndex === 2 ? 'bg-black/20' : 'bg-black/50'}`} />

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 z-10 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />

          {/* Auto-progress bar */}
          <div className="absolute top-0 left-0 right-0 z-30 h-[4px] bg-white/10">
            <motion.div
              key={`progress-${currentImageIndex}`}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
              className="h-full bg-red-500"
            />
          </div>

          {/* Left arrow */}
          <button
            onClick={() => goToSlide((currentImageIndex - 1 + BANNER_IMAGES.length) % BANNER_IMAGES.length)}
            aria-label="Previous slide"
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 active:scale-95 transition-all opacity-60 hover:opacity-100"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right arrow */}
          <button
            onClick={() => goToSlide((currentImageIndex + 1) % BANNER_IMAGES.length)}
            aria-label="Next slide"
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 active:scale-95 transition-all opacity-60 hover:opacity-100"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slide indicator dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
            {BANNER_IMAGES.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-500 ${
                  index === currentImageIndex
                    ? "w-8 h-1.5 bg-white"
                    : "w-4 h-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          {/* Content — per-slide text crossfades */}
          <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 text-center pt-28 sm:pt-36 pb-28 sm:pb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-xs font-black uppercase tracking-widest mb-6 sm:mb-8 border border-white/20"
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Zap size={14} className="fill-yellow-400 text-yellow-400" />
              </motion.span>
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
              <Link href="/register" className="group/btn w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-red-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-red-500 transition-all hover:scale-[1.03] active:scale-[0.98] shadow-xl shadow-red-900/30">
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

        {/* Trust Bar */}
        <section className="py-5 bg-white border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-bold text-slate-400 tracking-wide">
              {["No card required", "Cancel anytime", "5-minute setup", "Free plan forever", "White-label ready"].map((item, i) => (
                <span key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-red-500 shrink-0" />
                  {item}
                </span>
              ))}
            </div>
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
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black tracking-wide border border-red-100 mb-6">
                Built for delivery companies
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6">Quote the job. Run the job. All in one place.</h2>
              <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto font-medium">Qalt is a widget you embed on your delivery company&apos;s website, plus an Ops Console that takes over the moment the customer says yes. Quote, book, verify, dispatch.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: <Calculator className="text-red-600" />,
                  title: "Smart Pricing Rules",
                  desc: "Set rates by distance, weight, dimensions, service type, and more. Quote accurately without manual back and forth."
                },
                {
                  icon: <Code2 className="text-red-600" />,
                  title: "Fast Embed",
                  desc: "Add Qalt to WordPress, Shopify, Webflow, or any site with a simple embed. Go live fast without a custom build."
                },
                {
                  icon: <Layout className="text-red-600" />,
                  title: "Full White-Label",
                  desc: "Use your logo, colors, and branding across the quote flow. Customers stay in your brand from quote to submission."
                },
                {
                  icon: <MousePointerClick className="text-red-600" />,
                  title: "Quote, Book & Collect Payment",
                  desc: "Customers get an instant price, book the delivery, and pay online. Your business gets a confirmed job with no phone calls or emails."
                },
                {
                  icon: <BarChart3 className="text-red-600" />,
                  title: "Quote Analytics",
                  desc: "See quote volume, conversion trends, and where leads drop off. Improve pricing and spot lost opportunities."
                },
                {
                  icon: <ShieldCheck className="text-red-600" />,
                  title: "Ops Console",
                  desc: "Run the job after the quote is confirmed. Manage jobs, stops, readiness, and issues in one place."
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  custom={i}
                  variants={fadeUp}
                  className="bg-linear-to-b from-white to-slate-50 p-7 sm:p-9 rounded-xl border border-slate-200 hover:shadow-lg hover:shadow-red-900/5 hover:-translate-y-1.5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-red-600/10 border border-red-100 rounded-lg flex items-center justify-center mb-6 sm:mb-7 group-hover:bg-red-600/15 group-hover:scale-110 transition-all duration-300">
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
          <div className="hidden md:block absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-50/50 rounded-full blur-[120px] -z-10" />
          <div className="hidden md:block absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-[100px] -z-10" />
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
          <div className="hidden md:block absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px] -z-10" />
          <div className="hidden md:block absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[100px] -z-10" />
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

        {/* ROI Callout Strip */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="rounded-3xl bg-linear-to-br from-red-700 via-red-600 to-[#4f515b] p-10 sm:p-16 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 text-white/90 rounded-full text-[10px] font-black tracking-wide border border-white/20 mb-6">
                  Real ROI
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
                  One booked job pays for<br className="hidden sm:block" /> a full month.
                </h2>
                <p className="text-lg sm:text-xl text-red-100 max-w-2xl mx-auto font-medium mb-10">
                  The Pro plan is $14/mo. A single delivery booking worth $50–$200 covers it entirely. Every lead after that is pure profit. No manual quoting required.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/register" className="px-8 py-4 bg-white text-red-700 rounded-xl font-black text-sm hover:bg-red-50 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl">
                    Start Free Today
                  </Link>
                  <Link href="/pricing" className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-bold text-sm hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    See Pricing →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
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
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-black text-white">Pro</h3>
                      <span className="px-2 py-0.5 bg-white/10 text-white/80 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">Most Popular</span>
                    </div>
                    <p className="text-slate-400 text-sm font-medium">For delivery companies running daily jobs with the full Ops Console.</p>
                  </div>
                  <div className="mb-1 flex items-end gap-1">
                    <span className="text-5xl font-black text-white">$19</span>
                    <span className="text-slate-400 font-medium text-lg mb-1">/mo</span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">$14/mo billed annually · <Link href="/pricing" className="text-red-400 hover:text-red-300 underline underline-offset-2">save 25%</Link></p>
                </div>
                <Link href="/register" className="block w-full text-center py-4 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 hover:-translate-y-0.5 active:scale-95 transition-all mb-8 shadow-lg shadow-red-900/20">
                  Upgrade to Pro
                </Link>
                <ul className="space-y-3 mt-auto">
                  {["Unlimited Quotes", "Up to 5 Quote Forms", "Ops Console (Jobs, Stops, Readiness, Exceptions)", "Full White-Label", "Analytics Dashboard", "Priority Support"].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-300 font-medium text-sm">
                      <CheckCircle2 size={16} className="text-red-400 shrink-0 mt-0.5" />{item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Enterprise */}
              <div className="bg-white p-8 sm:p-10 flex flex-col rounded-2xl relative shadow-sm border border-slate-200">
                <div className="h-[240px]">
                  <div className="mb-8 p-0">
                    <h3 className="text-2xl font-black mb-2">Enterprise</h3>
                    <p className="text-slate-500 text-sm font-medium">For high-volume operators, agencies, and teams that need more control.</p>
                  </div>
                  <div className="mb-0 flex items-end gap-1">
                    <span className="text-5xl font-black">$39</span>
                    <span className="text-slate-400 font-medium text-lg mb-1">/mo</span>
                  </div>
                  <p className="text-slate-400 text-sm font-medium">$29/mo billed annually · <Link href="/pricing" className="text-red-600 hover:text-red-700 underline underline-offset-2">save 25%</Link></p>
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
              <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-colors">
                View full feature comparison →
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 sm:py-32 bg-slate-950 overflow-hidden relative">
          <div className="hidden md:block absolute top-0 left-1/3 w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[120px] -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="text-center mb-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white/70 rounded-full text-[10px] font-black tracking-wide border border-white/10 mb-6">
                What merchants say
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
                Delivery businesses love Qalt
              </h2>
              <p className="text-lg text-slate-400 max-w-xl mx-auto font-medium">
                From solo couriers to multi-vehicle fleets. Here&apos;s what they&apos;re saying.
              </p>
            </motion.div>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeIn}
          >
            <TestimonialsCarousel />
          </motion.div>
        </section>

        {/* Use Cases */}
        <section id="use-cases" className="py-20 sm:py-32 bg-linear-to-br from-slate-900 via-slate-900 to-slate-900 text-white overflow-hidden relative scroll-mt-20">
          <div className="absolute -bottom-40 -right-40 pointer-events-none select-none opacity-5" aria-hidden="true">
            <img src="/images/qalt-icon.svg" alt="" width={400} height={400} className="w-[400px] h-[400px] object-contain brightness-0 invert" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="mb-12 sm:mb-16 text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white/70 rounded-full text-[10px] font-black tracking-wide border border-white/10 mb-6">
                Built for teams that deliver
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                The quote &amp; booking widget for your delivery business
              </h2>
              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-medium">
                Qalt is not a delivery service. It&apos;s the tool your delivery company embeds on your own website so customers can price, book, and pay for your services instantly.
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
              className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-red-600 to-[#4f515b] rounded-2xl mx-auto mb-8 sm:mb-10 flex items-center justify-center shadow-2xl shadow-red-500/25"
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
              Quotes. Bookings. Payments.<br />All on your site.
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
              <Link href="/register" className="inline-flex px-8 sm:px-12 py-4 sm:py-5 bg-red-600 text-white rounded-xl font-black text-base sm:text-lg hover:bg-red-700 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl shadow-red-300">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <QaltLogo size="md" />
              <p className="text-red-600 font-black text-sm mt-3">Your rates. Embedded. Anywhere.</p>
              <p className="text-slate-400 font-medium text-sm mt-2 max-w-[220px] leading-relaxed">
                Instant delivery quotes for your website. No manual quoting required.
              </p>
            </div>
            {/* Product */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Product</p>
              <ul className="space-y-3 text-sm font-medium text-slate-500">
                <li><button onClick={() => scrollTo("features")} className="hover:text-red-600 transition-colors">Features</button></li>
                <li><Link href="/pricing" className="hover:text-red-600 transition-colors">Pricing</Link></li>
                <li><button onClick={() => scrollTo("how-it-works")} className="hover:text-red-600 transition-colors">How it Works</button></li>
                <li><button onClick={() => scrollTo("use-cases")} className="hover:text-red-600 transition-colors">Use Cases</button></li>
                <li><Link href="/partners" className="hover:text-red-600 transition-colors">Partners</Link></li>
                <li><Link href="/blog" className="hover:text-red-600 transition-colors">Blog</Link></li>
              </ul>
            </div>
            {/* Account */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Account</p>
              <ul className="space-y-3 text-sm font-medium text-slate-500">
                <li><Link href="/register" className="hover:text-red-600 transition-colors">Get Started Free</Link></li>
                <li><Link href="/login" className="hover:text-red-600 transition-colors">Log In</Link></li>
              </ul>
            </div>
            {/* Legal */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Legal</p>
              <ul className="space-y-3 text-sm font-medium text-slate-500">
                <li><Link href="/legal/privacy" className="hover:text-red-600 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/legal/terms" className="hover:text-red-600 transition-colors">Terms of Service</Link></li>
                <li><button onClick={() => setIsSupportModalOpen(true)} className="hover:text-red-600 transition-colors">Support</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100">
            <p className="text-slate-400 font-medium text-sm text-center md:text-left">© 2026 Qalt. All rights reserved.</p>
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
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-11 h-11 sm:w-12 sm:h-12 bg-red-600 text-white rounded-full shadow-xl shadow-red-500/25 flex items-center justify-center hover:bg-red-700 hover:scale-110 active:scale-95 transition-all duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
