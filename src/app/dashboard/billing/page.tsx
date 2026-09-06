import { getCurrentCompany } from "@/lib/session";
import { getEntitlements } from "@/lib/plans";
import prisma from "@/lib/prisma";
import BillingClient from "./BillingClient";
import SubscriptionOverview from "./SubscriptionOverview";
import SuccessBanner from "./SuccessBanner";
import CancelSubscriptionButton from "./CancelSubscriptionButton";
import DeleteAccountButton from "./DeleteAccountButton";
import Link from "next/link";
import { ArrowRight, Clock, Sparkles, Zap } from "lucide-react";

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
  const isStarter = company.subscriptionPlan === "STARTER";

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-4 pb-20 sm:p-6 lg:p-10">
      <header className="max-w-3xl">
        <div className="mb-3 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-red-600 dark:text-red-400">
          <Sparkles size={12} /> Billing & Subscription
        </div>
        <h1 className="text-3xl font-[800] tracking-[-0.04em] text-slate-900 dark:text-white sm:text-4xl">
          Your Qalt plan, without the guesswork.
        </h1>
        <p className="mt-3 text-sm font-medium leading-6 text-slate-500 dark:text-zinc-400 sm:text-base">
          The same clean plan story customers see on Qalt&apos;s public site now continues inside the Merchant Console. Review usage, compare plans, and manage billing in one place.
        </p>
      </header>

      {showSuccess && <SuccessBanner plan={company.subscriptionPlan} />}

      {trialExpired && (
        <section className="relative overflow-hidden rounded-[24px] border border-red-500/20 bg-[#0b0d14] p-6 text-white shadow-[0_24px_60px_-38px_rgba(8,11,20,.85)] sm:p-7">
          <div className="pointer-events-none absolute -left-16 bottom-[-55%] h-52 w-52 rounded-full bg-red-600/25 blur-[70px]" />
          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-white/10 bg-white/5 text-red-400">
                <Clock size={20} />
              </div>
              <div>
                <h2 className="text-lg font-[800] tracking-[-0.02em]">Your free trial has ended</h2>
                <p className="mt-1 max-w-2xl text-sm font-medium leading-6 text-white/45">
                  Upgrade below to keep your widget live and continue receiving quote requests. Your settings and data remain safe.
                </p>
              </div>
            </div>
            <a
              href="#plans"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[14px] bg-red-600 px-5 py-3 text-sm font-black text-white transition-all hover:bg-red-500 active:scale-[0.985]"
            >
              Choose a plan <ArrowRight size={15} />
            </a>
          </div>
        </section>
      )}

      {isStarter && !trialExpired && (
        <section className="rounded-[22px] border border-red-100 bg-red-50/70 p-5 dark:border-red-500/15 dark:bg-red-500/8 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-red-600 text-white shadow-sm">
                <Zap size={18} className="fill-white" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-sm font-[800] text-slate-900 dark:text-white">Try Pro free for 7 days</h2>
                  <span className="rounded-full border border-red-200 bg-white px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.12em] text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
                    No charge for 7 days
                  </span>
                </div>
                <p className="mt-1 max-w-3xl text-xs font-medium leading-5 text-slate-600 dark:text-zinc-400">
                  Unlock unlimited quotes, white-label branding, analytics, and the full Ops Console. Cancel before the trial ends and you will not be charged. You can manage everything from your{" "}
                  <Link href="/dashboard/billing#account-management" className="font-bold text-red-600 underline underline-offset-2 dark:text-red-400">billing settings</Link>.
                </p>
              </div>
            </div>
            <a
              href="#plans"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[13px] bg-slate-900 px-5 py-3 text-xs font-black text-white transition-all hover:bg-slate-800 active:scale-[0.985] dark:bg-white dark:text-slate-900 dark:hover:bg-zinc-100"
            >
              Start Free Trial <ArrowRight size={14} />
            </a>
          </div>
        </section>
      )}

      <SubscriptionOverview
        plan={company.subscriptionPlan}
        monthlyQuotes={monthlyQuotes}
        limit={limit}
      />

      <div id="plans" className="scroll-mt-24 pt-2">
        <BillingClient currentPlan={company.subscriptionPlan} />
      </div>

      <div id="account-management" className="scroll-mt-24">
        <AccountManagement hasPaidPlan={!isStarter} />
      </div>
    </div>
  );
}

function AccountManagement({ hasPaidPlan }: { hasPaidPlan: boolean }) {
  return (
    <section className="mt-12 overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_18px_44px_-38px_rgba(34,37,43,.5)] dark:border-white/8 dark:bg-[#141414] dark:shadow-none">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-white/8 dark:bg-white/[0.035] sm:px-6">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400 dark:text-zinc-500">Account management</p>
        <h2 className="mt-1 text-lg font-[800] tracking-[-0.02em] text-slate-900 dark:text-white">Subscription controls</h2>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/6">
        {hasPaidPlan && (
          <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-bold text-slate-900 dark:text-white">Cancel subscription</p>
              <p className="mt-1 text-xs font-medium leading-5 text-slate-500 dark:text-zinc-400">
                Downgrade to Starter. Your widget remains active with the free-plan quote limit, and your data is kept.
              </p>
            </div>
            <CancelSubscriptionButton />
          </div>
        )}

        <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-red-700 dark:text-red-400">Close account</p>
            <p className="mt-1 text-xs font-medium leading-5 text-slate-500 dark:text-zinc-400">
              Permanently delete your account, quotes, widget settings, and any active subscription. This cannot be undone.
            </p>
          </div>
          <DeleteAccountButton />
        </div>
      </div>
    </section>
  );
}
