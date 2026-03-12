"use client";

import { useState } from "react";
import { Check, Zap, Rocket, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

interface Plan {
  id: string;
  name: string;
  price: string;
  priceDetail: string;
  description: string;
  icon: any;
  features: string[];
  color: string;
}

const PLANS: Plan[] = [
  {
    id: "STARTER",
    name: "Starter",
    price: "Free",
    priceDetail: "Forever · No card required",
    description: "Perfect for trying Qalt.",
    icon: Zap,
    color: "slate",
    features: [
      "1 Quote Widget",
      "50 Quotes / month",
      "Basic Customization",
      "Email Support",
      "Qalt Branding enforced"
    ]
  },
  {
    id: "PRO",
    name: "Pro",
    price: "$19",
    priceDetail: "/mo · Billed monthly",
    description: "For growing delivery companies.",
    icon: Rocket,
    color: "blue",
    features: [
      "Unlimited Quotes",
      "Custom Logo & Background",
      "Full White-label",
      "Advanced Customization",
      "Priority Support"
    ]
  },
  {
    id: "ENTERPRISE",
    name: "Enterprise",
    price: "$39",
    priceDetail: "/mo · Billed monthly",
    description: "For high-volume operations.",
    icon: ShieldCheck,
    color: "indigo",
    features: [
      "Everything in Pro",
      "Dedicated Account Manager",
      "SLA & Uptime Guarantee",
      "Volume Discounts",
      "Onboarding Call"
    ]
  }
];

export default function BillingClient({ currentPlan }: { currentPlan: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpdatePlan = async (planId: string) => {
    if (planId === currentPlan) return;
    
    setLoading(planId);
    try {
      const res = await fetch("/api/dashboard/subscription", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {PLANS.map((plan) => (
        <div 
          key={plan.id}
          className={`
            relative flex flex-col p-8 rounded-3xl border-2 transition-all duration-300
            ${currentPlan === plan.id 
              ? 'bg-white border-blue-500 shadow-xl scale-[1.02] z-10' 
              : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-lg hover:-translate-y-1'}
          `}
        >
          {currentPlan === plan.id && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-widest shadow-lg">
              Current Plan
            </div>
          )}

          <div className="mb-6">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
              plan.id === "STARTER" ? "bg-slate-100 text-slate-600" : 
              plan.id === "PRO" ? "bg-blue-100 text-blue-600" : "bg-indigo-100 text-indigo-600"
            }`}>
              <plan.icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
            <p className="text-slate-500 text-sm mt-1">{plan.description}</p>
          </div>

          <div className="mb-8">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900">{plan.price}</span>
            </div>
            <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">{plan.priceDetail}</p>
          </div>

          <ul className="space-y-4 mb-10 flex-1">
            {plan.featureList?.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Check size={12} className="text-emerald-600" strokeWidth={3} />
                </div>
                <span className="text-sm text-slate-600 font-medium">{feature}</span>
              </li>
            )) || plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Check size={12} className="text-emerald-600" strokeWidth={3} />
                </div>
                <span className="text-sm text-slate-600 font-medium">{feature}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => handleUpdatePlan(plan.id)}
            disabled={loading !== null || currentPlan === plan.id}
            className={`
              w-full py-4 rounded-xl font-bold text-sm transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100
              ${currentPlan === plan.id 
                ? 'bg-slate-100 text-slate-400 cursor-default' 
                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md shadow-slate-200'}
            `}
          >
            {loading === plan.id ? "Updating..." : currentPlan === plan.id ? "Already Active" : `Switch to ${plan.name}`}
          </button>
        </div>
      ))}
    </div>
  );
}
