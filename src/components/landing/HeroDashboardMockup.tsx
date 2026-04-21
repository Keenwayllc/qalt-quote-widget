"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, DollarSign, Zap, CheckCircle2, Clock, TrendingUp, Package, Truck, Weight } from "lucide-react";
import Image from "next/image";

const SCREENS = [
  {
    id: "overview",
    label: "Dashboard",
    content: <OverviewScreen />,
  },
  {
    id: "analytics",
    label: "Analytics",
    content: <AnalyticsScreen />,
  },
  {
    id: "route",
    label: "Route & Book",
    content: <RouteQuoteScreen />,
  },
];

function OverviewScreen() {
  return (
    <div className="p-4 space-y-3 h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[8px] font-black uppercase tracking-widest text-red-500 bg-red-500/10 px-2 py-0.5 rounded-sm">Enterprise Plan</span>
          </div>
          <h2 className="text-sm font-black text-slate-900">Dashboard</h2>
          <p className="text-[9px] text-slate-500">Welcome back, <span className="font-bold text-slate-700">Your Company</span>. Here's your performance.</p>
        </div>
        <div className="px-3 py-1.5 bg-slate-900 text-white text-[8px] font-black rounded-sm">Customize Widget ↗</div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: <Package size={10} className="text-red-500" />, label: "TOTAL QUOTES", value: "18", badge: "+12%", badgeColor: "text-emerald-600 bg-emerald-50" },
          { icon: <DollarSign size={10} className="text-emerald-500" />, label: "BASE RATE", value: "$3.00", sub: "per mile" },
          { icon: <Zap size={10} className="text-blue-500" />, label: "ACTIVE STATUS", value: "Online", sub: "Widget live" },
        ].map((card, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-sm p-2 relative">
            <div className="flex items-center justify-between mb-1">
              <div className="w-5 h-5 bg-slate-50 rounded-sm flex items-center justify-center">{card.icon}</div>
              {card.badge && <span className={`text-[7px] font-black px-1.5 py-0.5 rounded-full ${card.badgeColor}`}>{card.badge}</span>}
            </div>
            <p className="text-[7px] font-black text-slate-400 uppercase tracking-wider">{card.label}</p>
            <p className="text-sm font-black text-slate-900 leading-tight">{card.value}</p>
            {card.sub && <p className="text-[7px] text-slate-400">{card.sub}</p>}
          </div>
        ))}
      </div>

      {/* Unlimited quotes banner */}
      <div className="flex items-center gap-2 bg-white border border-slate-100 rounded-sm px-3 py-2">
        <CheckCircle2 size={10} className="text-emerald-500 shrink-0" />
        <div>
          <p className="text-[8px] font-black text-slate-800">Unlimited Quotes</p>
          <p className="text-[7px] text-slate-400">1 sent this month · No limit on Enterprise</p>
        </div>
      </div>

      {/* Active Jobs */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1">
            <Package size={9} className="text-amber-500" />
            <p className="text-[8px] font-black text-slate-700 uppercase tracking-wider">Active Jobs</p>
          </div>
          <span className="text-[7px] font-bold text-red-500">View all →</span>
        </div>
        <div className="bg-white border border-slate-100 rounded-sm p-2 flex items-center gap-2">
          <div className="w-6 h-6 bg-amber-50 rounded-sm flex items-center justify-center">
            <Clock size={9} className="text-amber-500" />
          </div>
          <div>
            <p className="text-[7px] font-black text-slate-400">#18NL2K</p>
            <p className="text-[9px] font-bold text-slate-800">Test Warehouse A</p>
            <p className="text-[7px] text-slate-400">Apr 18</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsScreen() {
  return (
    <div className="p-4 space-y-3 h-full overflow-hidden">
      {/* Header */}
      <div className="mb-1">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[7px] font-black uppercase tracking-widest text-red-500 bg-red-500/10 px-2 py-0.5 rounded-sm">⚡ QALT · SMART QUOTES</span>
        </div>
        <h2 className="text-sm font-black text-slate-900">Analytics Overview</h2>
        <p className="text-[8px] text-slate-500">Instant insights for your logistics pipeline. <span className="font-bold text-slate-700">Your rates. Embedded. Anywhere.</span></p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: <Users size={9} className="text-red-500" />, label: "TOTAL LEADS", value: "11", sub: "0 today" },
          { icon: <DollarSign size={9} className="text-emerald-500" />, label: "PIPELINE VALUE", value: "$7,275", sub: "$0 today" },
          { icon: <TrendingUp size={9} className="text-blue-500" />, label: "AVG. DEAL SIZE", value: "$661", sub: "Lifetime avg" },
        ].map((card, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-sm p-2">
            <div className="w-5 h-5 bg-slate-50 rounded-sm flex items-center justify-center mb-1">{card.icon}</div>
            <p className="text-[7px] font-black text-slate-400 uppercase tracking-wider">{card.label}</p>
            <p className="text-sm font-black text-slate-900 leading-tight">{card.value}</p>
            <p className="text-[7px] text-slate-400">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white border border-slate-100 rounded-sm p-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-[9px] font-black text-slate-800">Lead Velocity</p>
            <p className="text-[7px] text-slate-400">Quote volume over the last 30 days.</p>
          </div>
          <span className="flex items-center gap-1 text-[7px] font-bold text-red-500">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            REAL-TIME
          </span>
        </div>
        {/* Mini bar chart */}
        <div className="flex items-end gap-1 h-10">
          {[1, 2, 7, 3, 1, 4, 2, 1, 3, 2, 1, 2, 3, 1, 2].map((h, i) => (
            <div key={i} className="flex-1 bg-blue-500/20 rounded-sm" style={{ height: `${(h / 7) * 100}%` }} />
          ))}
        </div>
      </div>

      {/* Insights card */}
      <div className="bg-slate-900 rounded-sm p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-5 h-5 bg-red-600 rounded-sm flex items-center justify-center">
            <Zap size={9} className="text-white fill-white" />
          </div>
          <p className="text-[9px] font-black text-white">Qalt Insights</p>
        </div>
        <div className="space-y-1.5">
          <div>
            <p className="text-[7px] font-black text-slate-400 uppercase tracking-wider">BUSIEST TIME</p>
            <p className="text-[8px] font-black text-red-400">Thursdays @ 3AM</p>
          </div>
          <div>
            <p className="text-[7px] font-black text-slate-400 uppercase tracking-wider">TOP REGION</p>
            <p className="text-[8px] font-black text-emerald-400">916</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RouteQuoteScreen() {
  return (
    <div className="flex h-full overflow-hidden">
      {/* Left — quote form */}
      <div className="w-[45%] border-r border-slate-100 flex flex-col overflow-hidden shrink-0">
        {/* Widget hero banner — real highway photo */}
        <div className="relative h-20 shrink-0 overflow-hidden">
          <Image
            src="/images/hero_banner_van_wide.png"
            alt="Delivery Quote Calculator"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center px-3 gap-2 z-10">
            <p className="text-[10px] font-black text-white drop-shadow">Delivery Quote Calculator</p>
          </div>
          {/* Step indicators */}
          <div className="absolute bottom-2 left-3 flex items-center gap-1.5 z-10">
            <div className="w-4 h-4 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
              <CheckCircle2 size={8} className="text-white" />
            </div>
            <div className="w-10 h-px bg-white/30" />
            <div className="w-4 h-4 rounded-full bg-white text-slate-900 flex items-center justify-center text-[7px] font-black">2</div>
          </div>
        </div>

        {/* Estimated rate */}
        <div className="px-3 py-2 bg-emerald-50 border-b border-emerald-100 text-center shrink-0">
          <p className="text-[7px] font-black text-emerald-700 uppercase tracking-widest mb-0.5">Your Estimated Rate</p>
          <p className="text-xl font-black text-emerald-600 leading-none">$5,724.42</p>
          <p className="text-[7px] text-emerald-500 mt-0.5 flex items-center justify-center gap-1">
            <CheckCircle2 size={7} /> 550.1 miles
          </p>
        </div>

        {/* Contact form */}
        <div className="flex-1 px-3 py-2 space-y-2 overflow-hidden">
          {[
            { label: "FULL NAME", placeholder: "John Doe" },
            { label: "EMAIL", placeholder: "john@example.com" },
            { label: "PHONE", placeholder: "(555) 000-0000" },
          ].map((f, i) => (
            <div key={i}>
              <p className="text-[6px] font-black text-slate-400 uppercase tracking-wider mb-0.5">{f.label}</p>
              <div className="border border-slate-200 rounded-sm px-2 py-1.5 bg-white">
                <p className="text-[8px] text-slate-400">{f.placeholder}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="px-3 pb-3 shrink-0">
          <div className="bg-emerald-600 text-white text-[8px] font-black py-2 rounded-sm flex items-center justify-center gap-1.5">
            Pay &amp; Book <span>→</span>
          </div>
          <p className="text-[6px] text-slate-400 text-center mt-1.5">Estimate only. Final price confirmed at booking.</p>
        </div>
      </div>

      {/* Right — route overview */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Map placeholder */}
        <div className="relative flex-1 bg-[#e8ecf0] overflow-hidden">
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-white border border-slate-200 rounded-sm px-2 py-1 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <p className="text-[7px] font-bold text-slate-700">Route Overview</p>
          </div>
          {/* Simplified map grid */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "linear-gradient(rgba(0,0,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.2) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          {/* Route line */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="none">
            <path d="M 40 30 Q 80 50 100 70 Q 130 90 170 95" stroke="#22c55e" strokeWidth="2" fill="none" strokeDasharray="4 2" />
          </svg>
          {/* Pin A */}
          <div className="absolute top-[22%] left-[18%] w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[7px] font-black shadow-md">A</div>
          {/* Pin B */}
          <div className="absolute top-[72%] right-[12%] w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white text-[7px] font-black shadow-md">B</div>
        </div>

        {/* Route stats */}
        <div className="px-3 py-2 border-t border-slate-100 bg-white shrink-0">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <p className="text-[6px] font-black text-slate-400 uppercase tracking-wider">Distance</p>
              <p className="text-[9px] font-black text-slate-800">550 mi</p>
            </div>
            <div>
              <p className="text-[6px] font-black text-slate-400 uppercase tracking-wider">Drive Time</p>
              <p className="text-[9px] font-black text-slate-800">8h 31 mins</p>
            </div>
          </div>
          <p className="text-[6px] font-black text-slate-400 uppercase tracking-wider mb-1">Shipment Details</p>
          <div className="space-y-1">
            <div className="flex items-start gap-1.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[5px] font-black text-white">A</span>
              </div>
              <p className="text-[7px] text-slate-600 leading-tight">San Francisco Bay Trail,<br />San Mateo, CA</p>
            </div>
            <div className="flex items-start gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[5px] font-black text-white">B</span>
              </div>
              <p className="text-[7px] text-slate-600 leading-tight">Blue Diamond Road,<br />Las Vegas, NV</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Weight size={7} className="text-slate-400" />
              <p className="text-[7px] text-slate-500">185 lbs · 2 items</p>
            </div>
            <span className="text-[7px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-sm">Inside Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function HeroDashboardMockup() {
  const [activeScreen, setActiveScreen] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % SCREENS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-[520px] select-none">
      {/* Glow behind mockup */}
      <div className="absolute -inset-4 bg-red-600/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-red-500/15 blur-2xl pointer-events-none" />

      {/* Browser chrome */}
      <div className="relative bg-[#1a1a2e] rounded-xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10">
        {/* Top bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#12121f] border-b border-white/[0.06]">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          {/* URL bar */}
          <div className="flex-1 mx-3 bg-white/[0.06] border border-white/[0.08] rounded-md px-3 py-1 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500/60 shrink-0" />
            <span className="text-[10px] text-white/40 font-mono truncate">app.qalt.site/dashboard</span>
          </div>
          {/* Tab labels */}
          <div className="hidden sm:flex items-center gap-1">
            {SCREENS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveScreen(i)}
                className={`text-[8px] px-2 py-0.5 rounded font-bold transition-all ${
                  i === activeScreen
                    ? "bg-white/10 text-white"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar + content */}
        <div className="flex bg-[#f8f9fb]" style={{ height: "380px" }}>
          {/* Mini sidebar */}
          <div className="w-28 bg-white border-r border-slate-100 flex flex-col py-3 shrink-0">
            <div className="px-3 mb-3">
              <Image src="/images/qalt-logo-main-2026.png" alt="Qalt" width={56} height={20} className="object-contain" />
            </div>
            <p className="text-[6px] font-black text-slate-400 uppercase tracking-widest px-3 mb-1">Merchant Console</p>
            {[
              { label: "Overview", active: activeScreen === 0 },
              { label: "Analytics", active: activeScreen === 1 },
              { label: "Pricing Settings", active: false },
              { label: "My Forms", active: false },
              { label: "Webhooks", active: false },
              { label: "Widget Appearance", active: false },
              { label: "Quotes", active: false, badge: "18" },
              { label: "Subscription", active: false },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-3 py-1 mx-1 rounded-sm text-[7px] font-bold cursor-default ${
                  item.active ? "bg-red-600 text-white" : "text-slate-500"
                }`}
              >
                {item.label}
                {item.badge && (
                  <span className="bg-red-500 text-white text-[6px] font-black rounded-full w-3.5 h-3.5 flex items-center justify-center">{item.badge}</span>
                )}
              </div>
            ))}
            <div className="mt-auto px-3 pt-3 border-t border-slate-100 mx-1">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 bg-red-100 rounded-sm flex items-center justify-center">
                  <Zap size={7} className="text-red-600 fill-red-600" />
                </div>
                <div>
                  <p className="text-[6px] font-black text-slate-700">Pro Plan</p>
                  <p className="text-[5px] text-slate-400">qalt.site</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 overflow-hidden bg-[#f8f9fb] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScreen}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0"
              >
                {SCREENS[activeScreen].content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-[2px] bg-white/5">
          <motion.div
            key={activeScreen}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-full bg-red-500"
          />
        </div>
      </div>

      {/* Floating metric pill */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-4 -left-6 bg-white border border-slate-100 shadow-xl shadow-black/10 rounded-xl px-3 py-2 flex items-center gap-2"
      >
        <div className="w-6 h-6 bg-emerald-50 rounded-full flex items-center justify-center">
          <TrendingUp size={11} className="text-emerald-600" />
        </div>
        <div>
          <p className="text-[8px] font-black text-slate-900">$7,275</p>
          <p className="text-[7px] text-slate-400">Pipeline Value</p>
        </div>
      </motion.div>

      {/* Floating notification pill */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute -top-3 -right-4 bg-white border border-slate-100 shadow-xl shadow-black/10 rounded-xl px-3 py-2 flex items-center gap-2"
      >
        <div className="w-6 h-6 bg-red-50 rounded-full flex items-center justify-center">
          <Package size={11} className="text-red-600" />
        </div>
        <div>
          <p className="text-[8px] font-black text-slate-900">New quote request</p>
          <p className="text-[7px] text-slate-400">$127 · Los Angeles, CA</p>
        </div>
      </motion.div>
    </div>
  );
}
