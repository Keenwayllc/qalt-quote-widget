"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MapPin, Zap, CheckCircle2, ShieldCheck, Calculator, Send } from "lucide-react";
import QaltIcon from "@/components/shared/QaltIcon";

const steps = [
  {
    id: "address",
    title: "Step 1: Smart Address Entry",
    description: "Your customers enter their pickup and delivery locations. Qalt validates distances in real-time.",
    icon: <MapPin className="text-blue-500" />,
    color: "blue"
  },
  {
    id: "quote",
    title: "Step 2: Instant Pricing",
    description: "Our engine calculates the cost based on your custom rates, weights, and service types—instantly.",
    icon: <Calculator className="text-emerald-500" />,
    color: "emerald"
  },
  {
    id: "booked",
    title: "Step 3: Automated Booking",
    description: "The lead is captured, a confirmation is sent to the customer, and you get notified immediately.",
    icon: <Send className="text-violet-500" />,
    color: "violet"
  }
];

export default function HowItWorksAnimation() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left: Info Blurb & Steps */}
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
            <Zap size={12} className="fill-blue-600" />
            Designed for Conversion
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
            How Qalt Automates<br />
            <span className="text-blue-600">Your Sales Funnel.</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
            Forget manual quotes and back-and-forth emails. Qalt gives you a premium, 
            frictionless quote engine that converts 3x better than traditional contact forms.
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div 
              key={step.id}
              className={`p-5 rounded-2xl border transition-all duration-500 ${
                idx === currentStep 
                  ? "bg-white border-slate-200 shadow-xl shadow-slate-200/50 scale-[1.02]" 
                  : "bg-transparent border-transparent opacity-40 grayscale"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-${step.color}-50 border border-${step.color}-100`}>
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">{step.title}</h3>
                  <p className="text-sm text-slate-500 font-medium mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: The Animated Mock Widget with Map */}
      <div className="relative lg:col-span-1">
        {/* Background glow */}
        <div className="absolute -inset-4 bg-linear-to-tr from-blue-500/10 via-emerald-500/5 to-violet-500/10 rounded-[2.5rem] blur-2xl" />
        
        <div className="relative bg-slate-900 rounded-[2rem] border border-white/10 shadow-2xl shadow-blue-900/40 overflow-hidden aspect-[4/5] sm:aspect-square lg:aspect-16/11">
          {/* Mock Browser Header */}
          <div className="h-8 sm:h-10 border-b border-white/5 bg-white/5 flex items-center px-4 gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-600/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-600/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-600/50" />
            <div className="mx-auto w-32 h-4 bg-white/5 rounded-full" />
          </div>

          <div className="h-[calc(100%-2.5rem)] flex flex-col sm:flex-row relative">
            
            {/* Left Panel: The Form */}
            <div className="flex-1 p-5 sm:p-6 flex flex-col z-10 sm:max-w-[320px] bg-slate-900 shadow-2xl sm:shadow-none border-b sm:border-b-0 sm:border-r border-white/5">
              <div className="flex items-center justify-between mb-6 shrink-0">
                <div className="flex items-center gap-2">
                  <QaltIcon size={24} color="white" />
                  <div className="h-3 w-10 bg-white/10 rounded" />
                </div>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className={`h-1 w-4 rounded-full ${i <= currentStep ? 'bg-blue-500' : 'bg-white/10'} transition-colors duration-500`} />
                  ))}
                </div>
              </div>

              <div className="flex-1 relative overflow-hidden flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {currentStep === 0 && (
                    <motion.div 
                      key="step-0"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1.5">
                          <div className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Pickup Address</div>
                          <div className="w-full p-3 bg-white/5 border border-white/10 rounded-xl relative">
                              <motion.span 
                                  initial={{ width: 0 }}
                                  animate={{ width: "100%" }}
                                  transition={{ duration: 1.5, delay: 0.2 }}
                                  className="block h-4 bg-white/5 whitespace-nowrap overflow-hidden text-white font-bold text-xs"
                              >
                                  123 Logistics Way, NY
                              </motion.span>
                              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                          </div>
                      </div>
                      <div className="space-y-1.5">
                          <div className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Delivery Address</div>
                          <div className="w-full p-3 bg-white/5 border border-white/10 rounded-xl relative">
                              <motion.span 
                                  initial={{ width: 0 }}
                                  animate={{ width: "100%" }}
                                  transition={{ duration: 1.5, delay: 1 }}
                                  className="block h-4 bg-white/5 whitespace-nowrap overflow-hidden text-white font-bold text-xs"
                              >
                                  456 Delivery Ave, CA
                              </motion.span>
                              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                              <div className="text-[7px] font-black uppercase tracking-widest text-white/40 mb-1">Items</div>
                              <div className="text-white font-bold text-sm">1x Pallet</div>
                          </div>
                          <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                              <div className="text-[7px] font-black uppercase tracking-widest text-white/40 mb-1">Extras</div>
                              <div className="text-white font-bold text-[10px] leading-tight flex flex-col items-start gap-0.5">
                                <span className="bg-white/10 px-1.5 py-0.5 rounded">Inside Delivery</span>
                                <span className="bg-white/10 px-1.5 py-0.5 rounded">Stairs</span>
                              </div>
                          </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 1 && (
                    <motion.div 
                      key="step-1"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      className="flex flex-col justify-center h-full space-y-4"
                    >
                      <div className="space-y-3">
                          <div className="text-[9px] font-black uppercase tracking-widest text-emerald-400 text-center">Calculation Complete</div>
                          
                          {/* Receipt Breakdown */}
                          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                              className="flex justify-between items-center text-xs"
                            >
                              <span className="text-white/60 font-medium tracking-wide">Base Rate (2,450 mi)</span>
                              <span className="text-white font-bold">$6,125.00</span>
                            </motion.div>
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                              className="flex justify-between items-center text-xs"
                            >
                              <span className="text-white/60 font-medium tracking-wide">1x Pallet</span>
                              <span className="text-white font-bold">$150.00</span>
                            </motion.div>
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}
                              className="flex justify-between items-center text-xs"
                            >
                              <span className="text-white/60 font-medium tracking-wide">Inside Delivery + Stairs</span>
                              <span className="text-white font-bold">$75.00</span>
                            </motion.div>
                            
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.8, type: "spring" }}
                              className="pt-3 mt-3 border-t border-white/10 flex justify-between items-end"
                            >
                              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Total Quote</span>
                              <span className="text-2xl font-black text-emerald-400">$6,350<span className="text-emerald-400/50 text-base">.00</span></span>
                            </motion.div>
                          </div>
                      </div>

                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2 }}
                        className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg w-full flex items-center justify-center gap-2"
                      >
                          <ShieldCheck className="text-emerald-500" size={14} />
                          <div className="text-[9px] font-black text-emerald-500 uppercase tracking-wider">Plan Active</div>
                      </motion.div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div 
                      key="step-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-4 text-center space-y-3">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-blue-500/40">
                              <CheckCircle2 className="text-white" size={24} />
                          </div>
                          <div>
                              <h4 className="text-base font-black text-white">Booking Requested!</h4>
                              <p className="text-white/40 text-xs font-medium leading-relaxed mt-1">
                                  Confirmation sent.
                              </p>
                          </div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-linear-to-br from-blue-500 to-violet-500 shrink-0" />
                          <div className="overflow-hidden">
                              <div className="text-xs font-black text-white truncate">John Doe Logistics</div>
                              <div className="text-[9px] text-white/40 font-medium truncate">john@example.com</div>
                          </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="h-10 w-full bg-linear-to-r from-blue-600 to-blue-700 rounded-xl mt-6 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40 shrink-0">
                  <div className="h-2.5 w-16 bg-white/20 rounded-full" />
              </div>
            </div>

            {/* Right Panel: The Animated Map Visual */}
            <div className="flex-1 bg-slate-950 relative overflow-hidden border-l border-white/5 hidden sm:block">
              {/* Subtle grid background to look like a map base */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: "24px 24px"
                }}
              />
              
              {/* Map Layout Elements */}
              <div className="absolute inset-0 p-8 flex items-center justify-center">
                <div className="relative w-full h-full max-w-[300px] max-h-[300px]">
                  
                  {/* Stylized 'Map' shapes in background */}
                  <div className="absolute top-[10%] left-[10%] w-[60%] h-[40%] bg-white/2 rounded-3xl -rotate-6" />
                  <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[30%] bg-white/3 rounded-4xl rotate-12" />

                  {/* Route SVG */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <motion.path
                      d="M 20 20 C 50 20, 40 80, 80 80"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: currentStep >= 1 ? 1 : 0,
                        opacity: currentStep >= 1 ? 1 : 0
                      }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" /> {/* blue-500 */}
                        <stop offset="100%" stopColor="#10b981" /> {/* emerald-500 */}
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Pickup Pin */}
                  <motion.div 
                    className="absolute top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: currentStep >= 0 ? 1 : 0,
                      opacity: currentStep >= 0 ? 1 : 0
                    }}
                    transition={{ type: "spring", delay: 0.6 }}
                  >
                    <div className="bg-blue-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full mb-1 shadow-lg shadow-blue-500/20">NY</div>
                    <div className="w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-500/20 shadow-lg" />
                  </motion.div>

                  {/* Delivery Pin */}
                  <motion.div 
                    className="absolute bottom-[20%] right-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: currentStep >= 0 ? 1 : 0,
                      opacity: currentStep >= 0 ? 1 : 0
                    }}
                    transition={{ type: "spring", delay: 1.4 }}
                  >
                    <div className="w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 shadow-lg relative z-10" />
                    <div className="bg-emerald-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full mt-1 shadow-lg shadow-emerald-500/20">CA</div>
                  </motion.div>
                  
                  {/* Map overlay elements for detail */}
                  <motion.div
                    className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-xs border border-white/10 rounded-lg p-2 flex gap-3"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: currentStep >= 1 ? 0 : 20, opacity: currentStep >= 1 ? 1 : 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    <div>
                      <div className="text-[7px] font-bold text-white/40 uppercase">Distance</div>
                      <div className="text-[10px] font-black text-white">2,450 mi</div>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div>
                      <div className="text-[7px] font-bold text-white/40 uppercase">Time</div>
                      <div className="text-[10px] font-black text-white">36 hrs</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Floating cards */}
        <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 h-16 w-40 bg-white shadow-2xl rounded-2xl border border-slate-100 p-3 hidden lg:flex items-center gap-3 z-30"
        >
            <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                <Calculator className="text-emerald-600" size={16} />
            </div>
            <div>
                <div className="text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Calculation</div>
                <div className="text-[10px] font-black text-slate-900 leading-none">Automated</div>
            </div>
        </motion.div>

        <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -left-6 h-16 w-40 bg-white shadow-2xl rounded-2xl border border-slate-100 p-3 hidden lg:flex items-center gap-3 z-30"
        >
            <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="text-blue-600" size={16} />
            </div>
            <div>
                <div className="text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Route Sync</div>
                <div className="text-[10px] font-black text-slate-900 leading-none">Google Maps API</div>
            </div>
        </motion.div>
      </div>
    </div>
  );
}
