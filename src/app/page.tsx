"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
} from "lucide-react";
import TestimonialsCarousel from "@/components/landing/TestimonialsCarousel";

const BANNER_IMAGES = [
  "/images/banner-1.jpg",
  "/images/banner-2.jpg",
];

export default function LandingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <QaltLogo size="md" />
          
          <div className="hidden md:flex items-center gap-10 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
            <Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
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

      <main>
        {/* Hero Section with Banner Background */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Rotating Background Images */}
          {BANNER_IMAGES.map((img, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <Image 
                src={img} 
                alt={`Qalt Banner ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-12000"
              />
            </div>
          ))}


          {/* Content */}
          <div className="relative z-20 max-w-7xl mx-auto px-6 text-center pt-32 pb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-white/20">
              <Zap size={14} className="fill-yellow-400 text-yellow-400" />
              Now in Private Beta
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9] text-white drop-shadow-lg">
              Instant Quotes.<br />
              <span className="text-blue-400">More Leads.</span><br />
              Zero Friction.
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-white/80 mb-12 font-medium leading-relaxed">
              The premium white-label quote widget built specifically for modern logistics and delivery companies. 
              Automate your pricing and capture leads while you sleep.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/register" className="group/btn px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-blue-500 transition-all hover:scale-[1.02] shadow-xl shadow-blue-900/30">
                Get Started for Free
                <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
              <a href="#features" className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all">
                Explore Features
              </a>
            </div>

          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-32 bg-slate-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Built for Reliability & Speed</h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Everything you need to scale your delivery business without the technical overhead.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Calculator className="text-blue-600" />,
                  title: "Smart Pricing Engine",
                  desc: "Configure complex rates based on distance, weight, or service type in seconds."
                },
                {
                  icon: <Code2 className="text-blue-600" />,
                  title: "Copy-Paste Integration",
                  desc: "Add your widget to any website—WordPress, Shopify, Webflow—with a single line of code."
                },
                {
                  icon: <Layout className="text-blue-600" />,
                  title: "Premium White-Label",
                  desc: "Full customization to match your brand. It's your widget, your logo, your colors."
                },
                {
                  icon: <MousePointerClick className="text-blue-600" />,
                  title: "High Conversion",
                  desc: "Designed with a friction-less 3-step flow to turn visitors into confirmed leads."
                },
                {
                  icon: <BarChart3 className="text-blue-600" />,
                  title: "Advanced Analytics",
                  desc: "Track every quote, see where leads drop off, and optimize your pricing dynamically."
                },
                {
                  icon: <ShieldCheck className="text-blue-600" />,
                  title: "Enterprise Reliable",
                  desc: "Built on top-tier infrastructure for 99.9% uptime and lightning-fast loading."
                }
              ].map((feature, i) => (
                <div key={i} className="bg-linear-to-b from-white to-slate-50 p-9 rounded-xl border border-slate-200 hover:shadow-lg hover:shadow-blue-900/5 hover:-translate-y-1 transition-all group">
                  <div className="w-12 h-12 bg-blue-600/10 border border-blue-100 rounded-lg flex items-center justify-center mb-7 group-hover:bg-blue-600/15 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-black mb-3 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-20 tracking-tight text-slate-900">Setting Up Is Instant</h2>
            <div className="flex flex-col md:flex-row items-center gap-12 relative">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-50 -z-10 hidden md:block"></div>
              {[
                { step: "01", title: "Create Account", desc: "Sign up in 30 seconds." },
                { step: "02", title: "Set Rates", desc: "Build your flat or dynamic pricing." },
                { step: "03", title: "Copy & Paste", desc: "Embed the code on your site." }
              ].map((step, i) => (
                <div key={i} className="flex-1 bg-linear-to-br from-white to-slate-50 p-8 rounded-xl border border-slate-200 shadow-sm relative z-10 hover:-translate-y-2 transition-transform duration-500 overflow-hidden text-left">
                  <span className="text-8xl font-black text-slate-200/30 absolute -bottom-4 -right-2 select-none pointer-events-none leading-none z-0">{step.step}</span>
                  <div className="relative z-10">
                    <h3 className="text-lg font-black mb-2 text-slate-900">{step.title}</h3>
                    <p className="text-slate-500 font-medium text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Simple, Transparent Pricing</h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Start free. Upgrade when you&apos;re ready to scale.</p>
            </div>

            <div className="grid md:grid-cols-3 rounded-2xl overflow-hidden shadow-xl max-w-5xl mx-auto border border-slate-200 bg-white">
              {/* Starter */}
              <div className="bg-white p-10 flex flex-col">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-black tracking-tight text-slate-900">Starter</h3>
                  </div>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">Perfect for trying Qalt out.</p>
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

              {/* Pro — premium gradient card */}
              <div className="bg-linear-to-bl from-[#131526] via-[#1a1636] to-[#2d1b54] p-10 flex flex-col relative">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-black tracking-tight text-white">Pro</h3>
                    <span className="px-2 py-0.5 bg-white text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest">Most Popular</span>
                  </div>
                  <p className="text-slate-300 text-sm font-medium leading-relaxed">For growing delivery companies.</p>
                </div>
                <div className="mb-1">
                  <span className="text-5xl font-black text-white">$14</span>
                  <span className="text-slate-300 font-medium text-lg ml-1">/mo</span>
                </div>
                <p className="text-slate-400 text-sm font-medium mb-8">Billed $168 annually · Save $60</p>
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
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-black tracking-tight text-slate-900">Enterprise</h3>
                  </div>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">For high-volume operations.</p>
                </div>
                <div className="mb-1">
                  <span className="text-5xl font-black text-slate-900">$29</span>
                  <span className="text-slate-400 font-medium text-lg ml-1">/mo</span>
                </div>
                <p className="text-slate-500 text-sm font-medium mb-8">Billed $348 annually · Save $120</p>
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

            <div className="text-center mt-10">
              <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                View full feature comparison →
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-32 bg-linear-to-br from-slate-900 via-slate-900 to-blue-950 text-white overflow-hidden relative">
          {/* Background Qalt icon — decorative */}
          <div className="absolute -bottom-40 -right-40 pointer-events-none select-none" aria-hidden="true">
            <QaltIcon size={2000} color="rgba(255,255,255,0.05)" eyeColor="rgba(255,255,255,0.09)" />
          </div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="px-6 mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                Trusted by Businesses Like Yours
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
                Any industry. Any product. If you quote it, Qalt can automate it.
              </p>
            </div>
            
            <TestimonialsCarousel />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-40 relative bg-white overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-blue-700 rounded-2xl mx-auto mb-10 flex items-center justify-center shadow-2xl shadow-blue-500/25 rotate-6">
              <Zap size={40} className="text-white fill-white" />
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">Start Automating<br />Your Quotes Today</h2>
            <p className="text-xl text-slate-500 mb-12 font-medium">Join companies scaling with our premium embeddable quote widget.</p>
            <Link href="/register" className="inline-flex px-12 py-5 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl font-black text-lg hover:from-blue-700 hover:to-blue-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-blue-300">
              Create Your Account
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-6">
              <QaltLogo size="sm" />
              <p className="text-slate-400 font-medium">© 2024 Qalt SaaS. All rights reserved.</p>
            </div>
            <div className="flex gap-10 text-sm font-bold text-slate-400 uppercase tracking-widest">
              <Link href="/login" className="hover:text-blue-600 transition-colors">Privacy</Link>
              <Link href="/login" className="hover:text-blue-600 transition-colors">Terms</Link>
              <Link href="/login" className="hover:text-blue-600 transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </footer>
      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-blue-600 text-white rounded-full shadow-xl shadow-blue-500/25 flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all duration-300 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}
