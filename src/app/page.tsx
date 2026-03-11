"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/qalt-logo.png" alt="Qalt" width={240} height={72} className="h-14 w-auto" />
          </Link>
          
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
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[12000ms]"
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
                <div key={i} className="bg-white p-10 rounded-[32px] border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
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
                <div key={i} className="flex-1 bg-white p-8 rounded-3xl border border-slate-50 shadow-sm relative z-10 hover:-translate-y-2 transition-transform duration-500">
                  <span className="text-6xl font-black text-blue-50/50 absolute top-4 left-4 -z-10">{step.step}</span>
                  <h3 className="text-xl font-black mb-3 text-slate-900">{step.title}</h3>
                  <p className="text-slate-500 font-medium">{step.desc}</p>
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

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free */}
              <div className="bg-white p-10 rounded-[32px] border border-slate-100 hover:shadow-xl transition-all">
                <h3 className="text-lg font-bold uppercase tracking-widest text-slate-400 mb-4">Starter</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-black">$0</span>
                  <span className="text-slate-400 font-medium">/mo</span>
                </div>
                <p className="text-slate-500 font-medium mb-8">Perfect for trying Qalt out.</p>
                <ul className="space-y-4 mb-10">
                  {["1 Quote Widget", "50 Quotes/month", "Basic Customization", "Email Support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                      <CheckCircle2 size={18} className="text-blue-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="block w-full text-center py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-colors">
                  Get Started Free
                </Link>
              </div>

              {/* Pro — highlighted */}
              <div className="bg-blue-600 p-10 rounded-[32px] text-white shadow-2xl shadow-blue-500/20 relative scale-[1.03] hover:scale-105 transition-transform">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-yellow-400 text-slate-900 rounded-full text-xs font-black uppercase tracking-widest">Most Popular</div>
                <h3 className="text-lg font-bold uppercase tracking-widest text-blue-200 mb-4">Pro</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-black">$19</span>
                  <span className="text-blue-200 font-medium">/mo</span>
                </div>
                <p className="text-blue-100 font-medium mb-8">For growing delivery companies.</p>
                <ul className="space-y-4 mb-10">
                  {["Unlimited Widgets", "Unlimited Quotes", "Full White-Label", "Analytics Dashboard", "Priority Support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/90 font-medium">
                      <CheckCircle2 size={18} className="text-yellow-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="block w-full text-center py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-colors">
                  Start Pro Trial
                </Link>
              </div>

              {/* Enterprise */}
              <div className="bg-white p-10 rounded-[32px] border border-slate-100 hover:shadow-xl transition-all">
                <h3 className="text-lg font-bold uppercase tracking-widest text-slate-400 mb-4">Enterprise</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-black">Custom</span>
                </div>
                <p className="text-slate-500 font-medium mb-8">For high-volume operations.</p>
                <ul className="space-y-4 mb-10">
                  {["Everything in Pro", "Custom Integrations", "Dedicated Account Manager", "SLA & Uptime Guarantee", "Volume Discounts"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                      <CheckCircle2 size={18} className="text-blue-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="block w-full text-center py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-colors">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-16 text-center tracking-tight leading-tight">Trusted by Delivery Titans</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-10 bg-white/5 backdrop-blur-md rounded-[32px] border border-white/10 hover:bg-white/10 transition-colors">
                <p className="text-2xl font-medium mb-8 leading-relaxed italic opacity-90">
                  &quot;The conversion rate jump was immediate. We used to lose leads because of manual pricing delay. With Qalt, it&apos;s instant.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center font-bold">JD</div>
                  <div>
                    <div className="font-bold text-lg">John Doe</div>
                    <div className="text-blue-400 text-sm font-bold uppercase tracking-widest">CEO, QuickShip Ltd.</div>
                  </div>
                </div>
              </div>
              <div className="p-10 bg-white/5 backdrop-blur-md rounded-[32px] border border-white/10 hover:bg-white/10 transition-colors translate-y-8 md:translate-y-12">
                <p className="text-2xl font-medium mb-8 leading-relaxed italic opacity-90">
                  &quot;Implementing the Qalt widget was the best tech decision we made this year. Took 5 minutes and works perfectly.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-bold">SS</div>
                  <div>
                    <div className="font-bold text-lg">Sarah Smith</div>
                    <div className="text-green-400 text-sm font-bold uppercase tracking-widest">Founder, Swift Delivery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-40 relative bg-white overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="w-24 h-24 bg-blue-600 rounded-[32px] mx-auto mb-10 flex items-center justify-center shadow-2xl shadow-blue-500/20 rotate-12">
              <Zap size={48} className="text-white fill-white" />
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">Start Automating<br />Your Quotes Today</h2>
            <p className="text-xl text-slate-500 mb-12 font-medium">Join companies scaling with our premium embeddable quote widget.</p>
            <Link href="/register" className="inline-flex px-12 py-6 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 hover:scale-105 transition-all shadow-xl shadow-blue-200">
              Create Your Account
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Image src="/images/qalt-logo.png" alt="Qalt" width={200} height={60} className="h-12 w-auto" />
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
