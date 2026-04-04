import { getCurrentCompany } from "@/lib/session";
import { getEntitlements } from "@/lib/plans";
import prisma from "@/lib/prisma";
import BillingClient from "./BillingClient";
import SuccessBanner from "./SuccessBanner";
import { Zap, Clock } from "lucide-react";

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const [company, params] = await Promise.all([getCurrentCompany(), searchParams]);
  const showSuccess = params.success === "1";

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
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Subscription</h1>
        <p className="text-slate-500 mt-1">Manage your plan and feature access.</p>
      </div>

      {showSuccess && <SuccessBanner plan={company.subscriptionPlan} />}

      {/* ── 7-Day Pro Trial Banner (Starter only) ─────────────────────────── */}
      {isStarter && (
        <div className="mb-6 bg-linear-to-r from-red-700 to-[#4f515b] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl shadow-red-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
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
                Unlock unlimited quotes, full white-label, analytics, and priority support — no charge for 7 days. Cancel before your trial ends and you will never be charged. You can upgrade, downgrade, or cancel anytime from your billing settings.
              </p>
            </div>
          </div>
          <a
            href="#pro"
            className="shrink-0 px-6 py-3 bg-white text-red-700 rounded-xl font-black text-sm hover:bg-red-50 transition-all shadow-lg whitespace-nowrap"
          >
            Start Free Trial →
          </a>
        </div>
      )}

      {/* Current plan summary card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-10 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Current Plan</p>
          <div className="flex items-center gap-3 mt-1">
            <h2 className="text-2xl font-bold text-slate-900">{company.subscriptionPlan}</h2>
            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded-full border border-red-200 uppercase tracking-wide">Active</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Quotes This Month</p>
          {isUnlimited ? (
            <p className="text-2xl font-bold text-slate-900 mt-1">{monthlyQuotes} <span className="text-sm text-slate-400 font-medium">· Unlimited</span></p>
          ) : (
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {monthlyQuotes}
              <span className="text-sm text-slate-400 font-medium"> / {limit}</span>
            </p>
          )}
        </div>
      </div>

      <div id="pro">
        <BillingClient currentPlan={company.subscriptionPlan} />
      </div>
    </div>
  );
}
