import { getCurrentCompany } from "@/lib/session";
import { getEntitlements } from "@/lib/plans";
import prisma from "@/lib/prisma";
import BillingClient from "./BillingClient";
import SuccessBanner from "./SuccessBanner";

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

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Subscription</h1>
        <p className="text-slate-500 mt-1">Manage your plan and feature access.</p>
      </div>

      {showSuccess && <SuccessBanner plan={company.subscriptionPlan} />}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-10 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Current Plan</p>
          <div className="flex items-center gap-3 mt-1">
            <h2 className="text-2xl font-bold text-slate-900">{company.subscriptionPlan}</h2>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full border border-blue-200 uppercase tracking-wide">Active</span>
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

      <BillingClient currentPlan={company.subscriptionPlan} />
    </div>
  );
}
