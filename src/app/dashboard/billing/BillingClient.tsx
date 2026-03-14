"use client";

import { useState } from "react";
import { Check, Zap, Rocket, ShieldCheck, ExternalLink } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: string;
  priceDetail: string;
  description: string;
  icon: React.ElementType;
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
      "25 Quotes / month",
      "Widget pauses when limit is reached",
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

const PLAN_RANK: Record<string, number> = { STARTER: 0, PRO: 1, ENTERPRISE: 2 };

export default function BillingClient({ currentPlan }: { currentPlan: string }) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpgrade = async (planId: string) => {
    setLoading(planId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  const handlePortal = async (loadingKey: string) => {
    setLoading(loadingKey);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  const isOnPaidPlan = currentPlan !== "STARTER";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {PLANS.map((plan) => {
        const isCurrentPlan = currentPlan === plan.id;
        const isHigher = PLAN_RANK[plan.id] > PLAN_RANK[currentPlan];
        const isLower = PLAN_RANK[plan.id] < PLAN_RANK[currentPlan];

        let buttonLabel: string;
        let buttonAction: (() => void) | null = null;
        let buttonDisabled = false;

        if (isCurrentPlan) {
          if (currentPlan === "STARTER") {
            buttonLabel = "Current Plan";
            buttonDisabled = true;
          } else {
            buttonLabel = loading === "manage" ? "Redirecting..." : "Manage Subscription";
            buttonAction = () => handlePortal("manage");
          }
        } else if (!isOnPaidPlan && isHigher) {
          // STARTER → PRO or ENTERPRISE: go to Stripe Checkout
          buttonLabel = loading === plan.id ? "Redirecting..." : `Upgrade to ${plan.name}`;
          buttonAction = () => handleUpgrade(plan.id);
        } else if (isOnPaidPlan && isLower && plan.id === "STARTER") {
          // On paid plan, showing STARTER → portal to cancel
          buttonLabel = loading === "cancel" ? "Redirecting..." : "Cancel via Portal";
          buttonAction = () => handlePortal("cancel");
        } else {
          // On paid plan, switching between paid tiers → portal handles it
          buttonLabel = loading === "manage" ? "Redirecting..." : `Switch to ${plan.name}`;
          buttonAction = () => handlePortal("manage");
        }

        return (
          <div
            key={plan.id}
            className={`
              relative flex flex-col p-8 rounded-3xl border-2 transition-all duration-300
              ${isCurrentPlan
                ? 'bg-white border-blue-500 shadow-xl scale-[1.02] z-10'
                : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-lg hover:-translate-y-1'}
            `}
          >
            {isCurrentPlan && (
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
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                    <Check size={12} className="text-emerald-600" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-slate-600 font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => buttonAction?.()}
              disabled={loading !== null || buttonDisabled}
              className={`
                w-full py-4 rounded-xl font-bold text-sm transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100
                flex items-center justify-center gap-2
                ${buttonDisabled
                  ? 'bg-slate-100 text-slate-400 cursor-default'
                  : isCurrentPlan && currentPlan !== "STARTER"
                    ? 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md shadow-slate-200'}
              `}
            >
              {buttonLabel}
              {!buttonDisabled && !loading && <ExternalLink size={14} className="opacity-60" />}
            </button>
          </div>
        );
      })}
    </div>
  );
}
