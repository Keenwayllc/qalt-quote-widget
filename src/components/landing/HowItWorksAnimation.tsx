"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MapPin, ArrowRight, Zap, CheckCircle2, ShieldCheck, Calculator, CreditCard, Send } from "lucide-react";
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

      {/* Right: The Animated Mock Widget */}
      <div className="relative">
        {/* Background glow */}
        <div className="absolute -inset-4 bg-linear-to-tr from-blue-500/10 via-emerald-500/5 to-violet-500/10 rounded-[2.5rem] blur-2xl" />
        
        <div className="relative bg-slate-900 rounded-[2rem] border border-white/10 shadow-2xl shadow-blue-900/40 overflow-hidden aspect-[4/5] sm:aspect-square lg:aspect-[4/4.5]">
          {/* Mock Browser Header */}
          <div className="h-10 border-b border-white/5 bg-white/5 flex items-center px-4 gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="mx-auto w-32 h-4 bg-white/5 rounded-full" />
          </div>

          <div className="p-6 sm:p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <QaltIcon size={32} color="white" />
                <div className="h-4 w-12 bg-white/10 rounded" />
              </div>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className={`h-1 w-6 rounded-full ${i <= currentStep ? 'bg-blue-500' : 'bg-white/10'} transition-colors duration-500`} />
                ))}
              </div>
            </div>

            <div className="flex-1 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div 
                    key="step-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Pickup Address</div>
                        <div className="w-full p-4 bg-white/5 border border-white/10 rounded-xl relative">
                            <motion.span 
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className="block h-4 bg-white/5 whitespace-nowrap overflow-hidden text-white font-bold text-sm"
                            >
                                123 Logistics Way, New York, NY
                            </motion.span>
                            <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Delivery Address</div>
                        <div className="w-full p-4 bg-white/5 border border-white/10 rounded-xl relative">
                            <motion.span 
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.5, delay: 1.5 }}
                                className="block h-4 bg-white/5 whitespace-nowrap overflow-hidden text-white font-bold text-sm"
                            >
                                456 Delivery Ave, Los Angeles, CA
                            </motion.span>
                            <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div className="text-[8px] font-black uppercase tracking-widest text-white/40 mb-1">Weight</div>
                            <div className="text-white font-bold">120 lbs</div>
                        </div>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div className="text-[8px] font-black uppercase tracking-widest text-white/40 mb-1">Service</div>
                            <div className="text-white font-bold">Standard</div>
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
                    className="flex flex-col items-center justify-center h-full text-center space-y-6 pb-12"
                  >
                    <div className="space-y-2">
                        <div className="text-[10px] font-black uppercase tracking-widest text-blue-400">Calculation Complete</div>
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-6xl sm:text-7xl font-black text-white tracking-tighter"
                        >
                            $1,420<span className="text-white/40 text-2xl font-black">.00</span>
                        </motion.div>
                        <div className="text-white/40 text-xs font-medium">Estimated for 2,450 miles</div>
                    </div>
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl w-full">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="text-emerald-500" size={20} />
                            <div className="text-left">
                                <div className="text-[10px] font-black text-white uppercase tracking-wider">Plan Enforcement Active</div>
                                <div className="text-[10px] text-emerald-500/70 font-medium">Enterprise rate applied</div>
                            </div>
                        </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div 
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 text-center space-y-4">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-blue-500/40">
                            <CheckCircle2 className="text-white" size={32} />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-xl font-black text-white">Booking Requested!</h4>
                            <p className="text-white/40 text-sm font-medium leading-relaxed">
                                Confirmation email has been sent to the customer and your team.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Lead Captured</div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-violet-500" />
                                <div>
                                    <div className="text-xs font-black text-white">John Doe Logistics</div>
                                    <div className="text-[10px] text-white/40 font-medium">john@example.com</div>
                                </div>
                            </div>
                            <div className="px-2 py-1 bg-white/10 rounded text-[8px] font-black text-white uppercase">New Lead</div>
                        </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-14 w-full bg-linear-to-r from-blue-600 to-blue-700 rounded-2xl mt-8 flex items-center justify-center gap-3 shadow-xl shadow-blue-900/40 opacity-80">
                <div className="h-4 w-24 bg-white/20 rounded-full" />
                <ArrowRight className="text-white/40" size={18} />
            </div>
          </div>
        </div>

        {/* Floating cards for "Premium" feel */}
        <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-6 h-20 w-40 bg-white shadow-2xl rounded-2xl border border-slate-100 p-4 hidden sm:flex items-center gap-3 z-30"
        >
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <CreditCard className="text-emerald-600" size={20} />
            </div>
            <div>
                <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Payment Status</div>
                <div className="text-xs font-black text-slate-900">Success</div>
            </div>
        </motion.div>

        <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -left-10 h-24 w-48 bg-white shadow-2xl rounded-2xl border border-slate-100 p-4 hidden sm:flex items-center gap-3 z-30"
        >
            <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                <ShieldCheck className="text-violet-600" size={20} />
            </div>
            <div>
                <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Company Status</div>
                <div className="text-xs font-black text-slate-900">Verified & Secure</div>
            </div>
        </motion.div>
      </div>
    </div>
  );
}
