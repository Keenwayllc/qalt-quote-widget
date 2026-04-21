import { getCurrentCompany } from "@/lib/session";
import { getEntitlements } from "@/lib/plans";
import prisma from "@/lib/prisma";
import BillingClient from "./BillingClient";
import SuccessBanner from "./SuccessBanner";
import Link from "next/link";
import { Zap, Clock } from "lucide-react";

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; expired?: string }>;
}) {
  const [company, params] = await Promise.all([getCurrentCompany(), searchParams]);
  const showSuccess = params.success === "1";
  const trialExpired = params.expired === "1";

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthlyQuotes = await prisma.quoteRequest.count({
    where: { companyId: company.id, createdAt: { gte: monthStart } },
  });

  const entitlements = getEntitlements(company.subscriptionPlan);
  const limit = entitlements.maxQuotesPerMonth;
  const isUnlimited = limit === "unlimited";
  const isStarter = company.subscriptionPlan === "STARTER";

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Subscription</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your plan and feature access.</p>
      </div>

      {showSuccess && <SuccessBanner plan={company.subscriptionPlan} />}

      {/* ── Trial Expired Hard Paywall ─────────────────────────────────────── */}
      {trialExpired && (
        <div className="mb-8 bg-slate-900 dark:bg-[#1e1e1e] rounded-none p-8 border border-red-500/30 dark:border-white/[0.06] shadow-2xl shadow-red-900/20 dark:shadow-none">
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 bg-red-600 rounded-none flex items-center justify-center shrink-0">
              <Clock size={22} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-white font-black text-xl mb-1">Your free trial has ended</h2>
              <p className="text-slate-400 text-sm font-medium mb-4">
                Your 14-day trial is over. Upgrade below to keep your widget live and continue receiving quote requests. Your settings and data are safe.
              </p>
              <a
                href="#pro"
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-none font-black text-sm hover:bg-red-500 transition-all shadow-lg shadow-red-900/30 dark:shadow-none"
              >
                Choose a plan →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── 7-Day Pro Trial Banner (Starter only) ─────────────────────────── */}
      {isStarter && (
        <div className="mb-6 bg-linear-to-r from-red-700 to-[#4f515b] rounded-none p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl shadow-red-200 dark:shadow-none">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-none flex items-center justify-center shrink-0">
              <Zap size={20} className="text-white fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white font-black text-base">Try Pro free for 7 days</span>
                <span className="flex items-center gap-1 px-2 py-0.5 bg-white/20 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                  <Clock size={10} />
                  Limited offer
                </span>
              </div>
              <p className="text-red-100 text-sm font-medium">
                Unlock unlimited quotes, full white-label, analytics, and priority support. No charge for 7 days. Cancel before your trial ends and you will never be charged. You can upgrade, downgrade, or cancel anytime from your{" "}
                <Link href="/dashboard/billing#account-management" className="underline underline-offset-2 hover:text-white transition-colors">billing settings</Link>.
              </p>
            </div>
          </div>
          <a
            href="#pro"
            className="shrink-0 px-6 py-3 bg-white text-red-700 rounded-none font-black text-sm hover:bg-red-50 transition-all shadow-lg dark:shadow-none whitespace-nowrap"
          >
            Start Free Trial →
          </a>
        </div>
      )}

      {/* Current plan summary card */}
      <div className="bg-white dark:bg-[#1e1e1e] rounded-none border border-slate-200 dark:border-white/[0.06] shadow-sm dark:shadow-none p-6 mb-10 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Current Plan</p>
          <div className="flex items-center gap-3 mt-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{company.subscriptionPlan}</h2>
            <span className="px-2 py-0.5 bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400 text-xs font-bold rounded-full border border-red-200 dark:border-red-500/30 uppercase tracking-wide">Active</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Quotes This Month</p>
          {isUnlimited ? (
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{monthlyQuotes} <span className="text-sm text-slate-400 dark:text-slate-500 font-medium">· Unlimited</span></p>
          ) : (
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {monthlyQuotes}
              <span className="text-sm text-slate-400 dark:text-slate-500 font-medium"> / {limit}</span>
            </p>
          )}
        </div>
      </div>

      <div id="pro">
        <BillingClient currentPlan={company.subscriptionPlan} />
      </div>

      <div id="account-management">
        <AccountDangerZone hasPaidPlan={!isStarter} />
      </div>
    </div>
  );
}

function AccountDangerZone({ hasPaidPlan }: { hasPaidPlan: boolean }) {
  return (
    <div className="mt-16 border border-red-200 dark:border-red-500/30 rounded-none overflow-hidden">
      <div className="bg-red-50 dark:bg-red-500/10 px-6 py-4 border-b border-red-200 dark:border-red-500/30">
        <h2 className="text-sm font-black text-red-700 dark:text-red-400 uppercase tracking-widest">Account Management</h2>
      </div>
      <div className="bg-white dark:bg-[#1e1e1e] divide-y divide-slate-100 dark:divide-white/[0.04]">
        {hasPaidPlan && (
          <div className="flex items-start justify-between gap-6 px-6 py-5">
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">Cancel Subscription</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 leading-relaxed">
                Downgrade to the free plan. Your widget stays active with up to 25 quotes per month. Your data is kept.
              </p>
            </div>
            <CancelSubscriptionButton />
          </div>
        )}
        <div className="flex items-start justify-between gap-6 px-6 py-5">
          <div>
            <p className="font-bold text-red-700 dark:text-red-400 text-sm">Close Account</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 leading-relaxed">
              Permanently delete your account, all quotes, widget settings, and cancel any active subscription. This cannot be undone.
            </p>
          </div>
          <DeleteAccountButton />
        </div>
      </div>
    </div>
  );
}

// These must be client components — import them
import CancelSubscriptionButton from "./CancelSubscriptionButton";
import DeleteAccountButton from "./DeleteAccountButton";
