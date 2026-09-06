"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Rocket, ShieldCheck, ExternalLink, Sparkles } from "lucide-react";

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
    description: "For trying Qalt or launching your first quote widget.",
    icon: Zap,
    monthly: { price: "Free", detail: "Forever · No card required" },
    annual: { price: "Free", detail: "Forever · No card required", badge: "" },
    features: [
      "1 Quote Widget",
      "50 Quotes / month",
      "Instant quote calculator",
      "Lead capture & storage",
      "Email notifications",
      "Email support",
      "Qalt branding",
    ],
  },
  {
    id: "PRO",
    name: "Pro",
    description: "Everything to run your quoting, look professional, and capture unlimited leads.",
    icon: Rocket,
    monthly: { price: "$39", detail: "/mo · Billed monthly" },
    annual: { price: "$29", detail: "/mo · Billed $348/yr", badge: "Save $120" },
    features: [
      "Unlimited quotes",
      "Up to 5 quote forms",
      "Full Ops Console — Jobs, Stops, Readiness, Exceptions",
      "White-label — no Qalt branding",
      "Custom colors, fonts & logo",
      "Analytics dashboard",
      "Priority support",
    ],
  },
  {
    id: "ENTERPRISE",
    name: "Enterprise",
    description: "For operators who want to get paid through their widget and scale.",
    icon: ShieldCheck,
    monthly: { price: "$99", detail: "/mo · Billed monthly" },
    annual: { price: "$79", detail: "/mo · Billed $948/yr", badge: "Save $240" },
    features: [
      "Everything in Pro",
      "Accept payments in your widget",
      "Multi-vehicle & fleet quoting",
      "Unlimited quote forms",
      "Custom CSS & domain embed",
      "Advanced webhooks",
      "Dedicated priority support",
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
    <section>
      <div className="mb-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-red-600 dark:text-red-400">
            <Sparkles size={12} /> Choose your Qalt plan
          </div>
          <h2 className="text-2xl font-[800] tracking-[-0.035em] text-slate-900 dark:text-white sm:text-3xl">Plans that grow with your operation</h2>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500 dark:text-zinc-400">
            The plan names, prices, and feature positioning match Qalt&apos;s public pricing experience so customers see the same product story before and after they sign in.
          </p>
        </div>

        <div className="relative inline-flex items-center rounded-full border border-slate-200 bg-slate-100 p-1 dark:border-white/8 dark:bg-white/5">
          {(["monthly", "annual"] as const).map((value) => {
            const active = interval === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setInterval(value)}
                className={`relative z-10 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black transition-colors ${active ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-zinc-400"}`}
              >
                {active && (
                  <motion.span
                    layoutId="billing-interval-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#1c1c1c]"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                {value === "monthly" ? "Monthly" : "Annually"}
                {value === "annual" && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                    Save up to 25%
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {PLANS.map((plan, index) => {
          const isCurrentPlan = currentPlan === plan.id;
          const isHigher = PLAN_RANK[plan.id] > PLAN_RANK[currentPlan];
          const isLower = PLAN_RANK[plan.id] < PLAN_RANK[currentPlan];
          const pricing = interval === "annual" ? plan.annual : plan.monthly;
          const isPro = plan.id === "PRO";

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
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5 }}
              className={`relative flex min-h-[590px] flex-col overflow-hidden rounded-[24px] border p-6 transition-shadow sm:p-7 ${
                isPro
                  ? "border-white/10 bg-[#0b0d14] text-white shadow-[0_28px_60px_-36px_rgba(8,11,20,.9)]"
                  : "border-slate-200 bg-white text-slate-900 shadow-[0_20px_50px_-40px_rgba(34,37,43,.45)] dark:border-white/8 dark:bg-[#141414] dark:text-white"
              } ${isCurrentPlan ? "ring-2 ring-red-500/80 ring-offset-2 ring-offset-white dark:ring-offset-[#0a0a0a]" : ""}`}
            >
              {isPro && (
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -left-20 bottom-[-20%] h-48 w-48 rounded-full bg-red-600/20 blur-[70px]" />
                  <div className="absolute -right-16 top-[-12%] h-40 w-40 rounded-full bg-amber-500/10 blur-[65px]" />
                </div>
              )}

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-[14px] border ${isPro ? "border-white/10 bg-white/5 text-red-400" : "border-slate-200 bg-slate-50 text-slate-500 dark:border-white/8 dark:bg-white/5 dark:text-zinc-400"}`}>
                    <plan.icon size={21} />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {isPro && (
                      <span className="rounded-full bg-white px-3 py-1 text-[9px] font-black uppercase tracking-[0.13em] text-slate-900">Most Popular</span>
                    )}
                    {isCurrentPlan && (
                      <span className="rounded-full bg-red-600 px-3 py-1 text-[9px] font-black uppercase tracking-[0.13em] text-white shadow-sm">Current Plan</span>
                    )}
                  </div>
                </div>

                <h3 className={`text-2xl font-[800] tracking-[-0.035em] ${isPro ? "text-white" : "text-slate-900 dark:text-white"}`}>{plan.name}</h3>
                <p className={`mt-2 min-h-[54px] text-sm font-medium leading-6 ${isPro ? "text-white/50" : "text-slate-500 dark:text-zinc-400"}`}>{plan.description}</p>

                <div className="my-7 border-y border-slate-200/80 py-6 dark:border-white/8" style={isPro ? { borderColor: "rgba(255,255,255,.10)" } : undefined}>
                  <div className="flex flex-wrap items-end gap-2">
                    <motion.span
                      key={`${plan.id}-${interval}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-5xl font-[850] tracking-[-0.055em] ${isPro ? "text-white" : "text-slate-900 dark:text-white"}`}
                    >
                      {pricing.price}
                    </motion.span>
                    {pricing.price !== "Free" && <span className={`mb-1 text-sm font-semibold ${isPro ? "text-white/40" : "text-slate-400 dark:text-zinc-500"}`}>/mo</span>}
                    {interval === "annual" && plan.annual.badge && (
                      <span className="mb-1 rounded-full bg-emerald-100 px-2 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                        {plan.annual.badge}
                      </span>
                    )}
                  </div>
                  <p className={`mt-2 text-xs font-semibold ${isPro ? "text-white/35" : "text-slate-400 dark:text-zinc-500"}`}>{pricing.detail}</p>
                </div>

                <ul className="mb-8 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${isPro ? "bg-red-500/15" : "bg-emerald-50 dark:bg-emerald-500/12"}`}>
                        <Check size={12} strokeWidth={3} className={isPro ? "text-red-400" : "text-emerald-600 dark:text-emerald-400"} />
                      </span>
                      <span className={`text-sm font-medium leading-5 ${isPro ? "text-white/68" : "text-slate-600 dark:text-zinc-300"}`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => buttonAction?.()}
                  disabled={loading !== null || buttonDisabled}
                  className={`mt-auto flex w-full items-center justify-center gap-2 rounded-[14px] px-5 py-3.5 text-sm font-black transition-all active:scale-[0.985] disabled:cursor-default disabled:opacity-50 disabled:active:scale-100 ${
                    buttonDisabled
                      ? isPro
                        ? "bg-white/8 text-white/35"
                        : "bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-zinc-600"
                      : isPro
                        ? "bg-red-600 text-white shadow-[0_12px_28px_-18px_rgba(220,38,38,.85)] hover:bg-red-500"
                        : isCurrentPlan && currentPlan !== "STARTER"
                          ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/8"
                          : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                  }`}
                >
                  {buttonLabel}
                  {!buttonDisabled && loading === null && <ExternalLink size={14} className="opacity-55" />}
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs font-medium text-slate-400 dark:text-zinc-600">
        No hidden setup fees. Upgrade, downgrade, or manage your subscription anytime.
      </p>
    </section>
  );
}
