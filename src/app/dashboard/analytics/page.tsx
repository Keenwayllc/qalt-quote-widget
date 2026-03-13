import { getCurrentCompany } from "@/lib/session";
import { getEntitlements } from "@/lib/plans";
import Link from "next/link";
import { 
  BarChart3, 
  Lock, 
  ArrowUpRight, 
  Zap, 
  Target, 
  Users, 
  TrendingUp 
} from "lucide-react";

export default async function AnalyticsPage() {
  const company = await getCurrentCompany();
  const entitlements = getEntitlements(company.subscriptionPlan);

  if (!entitlements.isAnalyticsDashboardEnabled) {
    return (
      <div className="p-4 lg:p-10 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-2xl shadow-slate-200/40 overflow-hidden relative min-h-[600px] flex flex-col items-center justify-center text-center px-6">
          {/* Decorative background elements */}
          <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-blue-500 to-indigo-600" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />

          <div className="relative z-10 max-w-md">
            <div className="inline-flex p-6 bg-amber-50 rounded-full mb-8 relative">
              <BarChart3 size={48} className="text-amber-500" />
              <div className="absolute -top-1 -right-1 bg-white p-1.5 rounded-full shadow-md">
                <Lock size={20} className="text-slate-900 fill-slate-900" />
              </div>
            </div>

            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-4">
              Analytics is a Pro Feature
            </h1>
            <p className="text-slate-500 font-medium leading-relaxed mb-10">
              Unlock deep insights into your widget performance, customer behavior, and conversion rates. Upgrade to the Pro plan to start tracking data today.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left">
              {[
                { icon: Zap, text: "Real-time tracking" },
                { icon: Target, text: "Conversion optimization" },
                { icon: Users, text: "Visitor demographics" },
                { icon: TrendingUp, text: "Revenue forecasting" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <item.icon size={18} className="text-blue-600" />
                  <span className="text-sm font-bold text-slate-700">{item.text}</span>
                </div>
              ))}
            </div>

            <Link 
              href="/dashboard/billing"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 hover:scale-[1.02] transition-all shadow-xl shadow-blue-200 group"
            >
              Upgrade to Pro
              <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Locked Dashboard Mockup Overlay */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] pointer-events-none -z-10 opacity-20 transform scale-105 select-none">
             {/* Mocking some dashboard elements */}
             <div className="p-10 flex flex-col gap-10">
                <div className="h-40 w-full bg-slate-100 rounded-3xl" />
                <div className="grid grid-cols-3 gap-6">
                   <div className="h-32 bg-slate-100 rounded-3xl" />
                   <div className="h-32 bg-slate-100 rounded-3xl" />
                   <div className="h-32 bg-slate-100 rounded-3xl" />
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-10 space-y-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Analytics Overview
          </h1>
          <p className="text-slate-500 font-medium">
             Track your conversion performance and visitor trends.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 p-12 text-center h-[500px] flex flex-col items-center justify-center">
         <div className="inline-flex p-4 bg-blue-50 text-blue-600 rounded-full mb-6">
            <TrendingUp size={32} />
         </div>
         <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Populating Data...</h2>
         <p className="text-slate-500 font-medium max-w-sm mx-auto">
           We&apos;re currently collecting data for your widget. Check back in a few hours to see your conversion analytics.
         </p>
      </div>
    </div>
  );
}
