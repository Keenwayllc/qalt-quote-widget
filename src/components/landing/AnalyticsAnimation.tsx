"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { AreaChart, TrendingUp, Users, DollarSign, Activity, Calendar, MapPin, ChevronRight } from "lucide-react";

export default function AnalyticsAnimation() {
  const [currentStep, setCurrentStep] = useState(0);

  // Animation cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 3);
    }, 4500); // 4.5s per step
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto mt-24">
      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* LEFT: Text Content */}
        <div className="space-y-6 lg:order-1 order-2">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold"
            >
                <AreaChart size={14} />
                <span>Know what your quotes are doing</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Track quote activity and spot <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-500">what drives bookings.</span>
            </h2>

            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                See quote volume, average order value, lead flow, and dropoff points so you can improve pricing and close more jobs.
            </p>

            <ul className="space-y-3 pt-4">
                {[
                    { icon: TrendingUp, text: "Monitor quote volume" },
                    { icon: DollarSign, text: "Track average quote value" },
                    { icon: Activity, text: "See where leads drop off" },
                ].map((item, i) => (
                    <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 text-slate-300 font-medium"
                    >
                        <div className="p-1.5 rounded bg-blue-500/10 text-blue-400">
                            <item.icon size={16} />
                        </div>
                        {item.text}
                    </motion.li>
                ))}
            </ul>
        </div>

        {/* RIGHT: Mock Dashboard Animation */}
        <div className="relative pl-0 lg:pl-10 lg:order-2 order-1">
          {/* Background glow */}
          <div className="absolute -inset-4 bg-linear-to-tr from-blue-500/10 via-indigo-500/5 to-purple-500/10 rounded-[2.5rem] blur-2xl" />
          
          <div className="relative bg-slate-900 rounded-4xl border border-white/10 shadow-2xl shadow-indigo-900/40 overflow-hidden h-[450px] sm:h-[500px] lg:h-auto lg:aspect-4/3">
            {/* Mock Browser Header */}
            <div className="h-8 border-b border-white/5 bg-white/5 flex items-center px-4 gap-1.5 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-600/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-600/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-600/50" />
              <div className="ml-4 px-3 py-1 rounded bg-black/20 border border-white/5 text-[9px] text-white/40 font-mono tracking-wider">dashboard / analytics</div>
            </div>

            {/* Dashboard Content */}
            <div className="p-5 flex flex-col h-[calc(100%-2rem)]">
                
                {/* Step Indicators */}
                <div className="flex gap-2 mb-6">
                    {[0, 1, 2].map(step => (
                        <div key={step} className="h-1 flex-1 bg-white/5 overflow-hidden rounded-full">
                            <motion.div 
                                className="h-full bg-indigo-500"
                                initial={{ width: "0%" }}
                                animate={{ width: currentStep === step ? "100%" : currentStep > step ? "100%" : "0%" }}
                                transition={{ duration: currentStep === step ? 4.5 : 0.2, ease: "linear" }}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex-1 relative">
                    <AnimatePresence mode="wait">
                        
                        {/* STEP 0: KPIs */}
                        {currentStep === 0 && (
                            <motion.div
                                key="step-0"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="h-full flex flex-col justify-center space-y-4"
                            >
                                <div className="text-[10px] uppercase font-black tracking-widest text-indigo-400 mb-2">Key Metrics</div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <Users className="text-blue-400 mb-2" size={16} />
                                        <div className="text-[10px] text-white/50 font-medium">Total Quotes</div>
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ type: "spring", delay: 0.2 }}
                                            className="text-2xl font-black text-white"
                                        >
                                            142
                                        </motion.div>
                                    </div>
                                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <Activity className="text-emerald-400 mb-2" size={16} />
                                        <div className="text-[10px] text-white/50 font-medium">Conversion Rate</div>
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ type: "spring", delay: 0.4 }}
                                            className="text-2xl font-black text-white"
                                        >
                                            38.5%
                                        </motion.div>
                                    </div>
                                </div>
                                <div className="p-3 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <DollarSign className="text-purple-400 mb-2" size={16} />
                                    <div className="text-[10px] text-white/50 font-medium">Pipeline Value</div>
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", delay: 0.6 }}
                                        className="text-3xl font-black text-white"
                                    >
                                        $84,500<span className="text-white/30 text-lg">.00</span>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 1: Chart Drawing */}
                        {currentStep === 1 && (
                            <motion.div
                                key="step-1"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="h-full flex flex-col justify-center"
                            >
                                <div className="text-[10px] uppercase font-black tracking-widest text-indigo-400 mb-4">Volume Trends (30 Days)</div>
                                <div className="relative h-40 w-full border-l border-b border-white/10 flex items-end justify-between px-2 pt-4">
                                    {/* Mock Bars */}
                                    {[20, 35, 25, 60, 40, 80, 50, 70].map((height, i) => (
                                        <div key={i} className="w-8 relative flex justify-center group cursor-pointer">
                                            <motion.div 
                                                initial={{ height: 0 }}
                                                animate={{ height: `${height}%` }}
                                                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                                                className="w-4 bg-indigo-500/50 border border-indigo-400/50 rounded-t-sm group-hover:bg-indigo-400 transition-colors"
                                            />
                                        </div>
                                    ))}
                                    {/* Mock Animated Line */}
                                    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                                        <defs>
                                            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#818cf8" />
                                                <stop offset="100%" stopColor="#6366f1" />
                                            </linearGradient>
                                            <filter id="glow">
                                                <feGaussianBlur stdDeviation="1.5" result="blur" />
                                                <feMerge>
                                                    <feMergeNode in="blur" />
                                                    <feMergeNode in="SourceGraphic" />
                                                </feMerge>
                                            </filter>
                                        </defs>
                                        {/* Glow layer */}
                                        <motion.path
                                            d="M 5 80 Q 15 65, 25 75 T 45 40 T 65 20 T 95 30"
                                            fill="none"
                                            stroke="#6366f1"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            opacity={0.3}
                                            filter="url(#glow)"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 2, ease: "easeInOut" }}
                                        />
                                        {/* Main line */}
                                        <motion.path
                                            d="M 5 80 Q 15 65, 25 75 T 45 40 T 65 20 T 95 30"
                                            fill="none"
                                            stroke="url(#lineGrad)"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 2, ease: "easeInOut" }}
                                        />
                                    </svg>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: Recent Quotes Populating */}
                        {currentStep === 2 && (
                            <motion.div
                                key="step-2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="h-full flex flex-col justify-center gap-3"
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <div className="text-[10px] uppercase font-black tracking-widest text-indigo-400">Recent Quotes</div>
                                    <div className="text-[8px] font-bold text-white/40 bg-white/5 px-2 py-0.5 rounded">LIVE</div>
                                </div>

                                {[
                                    { name: "Sarah L.", pickup: "78901", dropoff: "90210", amount: "3,875.00", distance: "1,550", date: "Today" },
                                    { name: "John D.", pickup: "33101", dropoff: "10001", amount: "1,250.00", distance: "850", date: "Yesterday" },
                                ].map((row, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.3, type: "spring" }}
                                        className="bg-white/5 rounded-2xl border border-white/10 p-3.5"
                                    >
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-xl bg-white/10 flex items-center justify-center text-white font-black text-xs shrink-0">
                                                    {row.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-white tracking-tight leading-none mb-1">
                                                        {row.name}
                                                    </p>
                                                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/40 uppercase tracking-tighter">
                                                        <Calendar size={9} />
                                                        {row.date}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className="text-sm font-black text-white tracking-tighter leading-none">${row.amount}</p>
                                                <p className="text-[8px] font-black text-emerald-400 uppercase tracking-widest mt-0.5">estimated</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-[10px] font-bold text-white/70">
                                            <MapPin size={10} className="text-indigo-400 shrink-0" />
                                            <span>{row.pickup}</span>
                                            <ChevronRight size={10} className="text-white/30" />
                                            <span>{row.dropoff}</span>
                                            <span className="ml-auto text-[9px] text-white/40 font-bold">{row.distance} mi</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
