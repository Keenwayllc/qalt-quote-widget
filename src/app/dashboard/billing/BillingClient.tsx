"use client";

import { useState } from "react";
import { Check, Zap, Rocket, ShieldCheck, ExternalLink } from "lucide-react";

type Interval = "monthly" | "annual";

interface PlanConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  monthly: { price: string; detail: string };
  annual: { price: string; detail: string; badge: string };
  features: string[];
}

const PLANS: PlanConfig[] = [
  {
    id: "STARTER",
    name: "Starter",
    description: "Perfect for trying Qalt.",
    icon: Zap,
    monthly: { price: "Free", detail: "Forever · No card required" },
    annual: { price: "Free", detail: "Forever · No card required", badge: "" },
    features: [
      "1 Quote Widget",
      "25 Quotes / month",
      "Widget pauses when limit is reached",
      "Basic Customization",
      "Email Support",
      "Qalt Branding enforced",
    ],
  },
  {
    id: "PRO",
    name: "Pro",
    description: "For growing delivery companies.",
    icon: Rocket,
    monthly: { price: "$19", detail: "/mo · Billed monthly" },
    annual: { price: "$14", detail: "/mo · Billed $168/yr", badge: "Save $60" },
    features: [
      "Unlimited Quotes",
      "Up to 5 Quote Forms",
      "Custom Logo & Background",
      "Full White-label",
      "Advanced Customization",
      "Priority Support",
    ],
  },
  {
    id: "ENTERPRISE",
    name: "Enterprise",
    description: "For high-volume operations, agencies & web designers.",
    icon: ShieldCheck,
    monthly: { price: "$39", detail: "/mo · Billed monthly" },
    annual: { price: "$29", detail: "/mo · Billed $348/yr", badge: "Save $120" },
    features: [
      "Everything in Pro",
      "Unlimited Quote Forms",
      "Team Management (Multi-user)",
      "Advanced Webhooks & API",
      "Success Manager & SLA",
    ],
  },
];

const PLAN_RANK: Record<string, number> = { STARTER: 0, PRO: 1, ENTERPRISE: 2 };

export default function BillingClient({ currentPlan }: { currentPlan: string }) {
  const [loading, setLoading] = useState<string | null>(null);
  const [interval, setInterval] = useState<Interval>("monthly");

  const handleUpgrade = async (planId: string) => {
    setLoading(planId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId, interval }),
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
    <>
      {/* Monthly / Annual toggle */}
      <div className="flex items-center justify-center mb-10">
        <div className="inline-flex items-center bg-slate-100 rounded-xl p-1 gap-1">
          <button
            onClick={() => setInterval("monthly")}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
              interval === "monthly"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setInterval("annual")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${
              interval === "annual"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Annually
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-wide">
              Save 25%
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PLANS.map((plan) => {
          const isCurrentPlan = currentPlan === plan.id;
          const isHigher = PLAN_RANK[plan.id] > PLAN_RANK[currentPlan];
          const isLower = PLAN_RANK[plan.id] < PLAN_RANK[currentPlan];
          const pricing = interval === "annual" ? plan.annual : plan.monthly;

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
            buttonLabel = loading === plan.id ? "Redirecting..." : `Upgrade to ${plan.name}`;
            buttonAction = () => handleUpgrade(plan.id);
          } else if (isOnPaidPlan && isLower && plan.id === "STARTER") {
            buttonLabel = loading === "cancel" ? "Redirecting..." : "Cancel via Portal";
            buttonAction = () => handlePortal("cancel");
          } else {
            buttonLabel = loading === "manage" ? "Redirecting..." : `Switch to ${plan.name}`;
            buttonAction = () => handlePortal("manage");
          }

          return (
            <div
              key={plan.id}
              className={`
                relative flex flex-col p-8 rounded-3xl border-2 transition-all duration-300
                ${isCurrentPlan
                  ? "bg-white border-red-500 shadow-xl scale-[1.02] z-10"
                  : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-lg hover:-translate-y-1"}
              `}
            >
              {isCurrentPlan && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-red-600 text-white text-xs font-bold rounded-full uppercase tracking-widest shadow-lg">
                  Current Plan
                </div>
              )}

              <div className="mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                  plan.id === "STARTER" ? "bg-slate-100 text-slate-600" : "bg-red-100 text-red-600"
                }`}>
                  <plan.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                <p className="text-slate-500 text-sm mt-1">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900">{pricing.price}</span>
                  {interval === "annual" && plan.annual.badge && (
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-wide">
                      {plan.annual.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                  {pricing.detail}
                </p>
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
                    ? "bg-slate-100 text-slate-400 cursor-default"
                    : isCurrentPlan && currentPlan !== "STARTER"
                      ? "bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      : "bg-slate-900 text-white hover:bg-slate-800 shadow-md shadow-slate-200"}
                `}
              >
                {buttonLabel}
                {!buttonDisabled && !loading && <ExternalLink size={14} className="opacity-60" />}
              </button>
            </div>
          );
        })}
      </div>

      <p className="text-center text-sm text-slate-400 font-medium mt-8">
        ✦ We&apos;re constantly shipping new features & improvements to Qalt. If you spot something new, it&apos;s all for you and your customers.
      </p>
    </>
  );
}
