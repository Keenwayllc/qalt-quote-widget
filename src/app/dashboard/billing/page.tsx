import { getCurrentCompany } from "@/lib/session";
import BillingClient from "./BillingClient";

export default async function BillingPage() {
  const company = await getCurrentCompany();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Subscription</h1>
        <p className="text-slate-500 mt-1">Manage your plan and feature access.</p>
      </div>

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
          <p className="text-2xl font-bold text-slate-900 mt-1">Check Statistics</p>
        </div>
      </div>

      <BillingClient currentPlan={company.subscriptionPlan} />
    </div>
  );
}
