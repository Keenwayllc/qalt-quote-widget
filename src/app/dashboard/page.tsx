import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";
import MetricCard from "@/components/dashboard/MetricCard";
import { 
  FileText, 
  DollarSign, 
  Activity, 
  ChevronRight,
  ArrowUpRight,
  TrendingUp,
  MapPin
} from "lucide-react";
import Link from "next/link";

export default async function DashboardOverview() {
  const company = await getCurrentCompany();

  // Get recent quotes
  let recentQuotes: Awaited<ReturnType<typeof prisma.quoteRequest.findMany>> = [];
  let totalQuotes = 0;
  try {
    [recentQuotes, totalQuotes] = await Promise.all([
      prisma.quoteRequest.findMany({
        where: { companyId: company.id },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.quoteRequest.count({ where: { companyId: company.id } }),
    ]);
  } catch (error) {
    console.error("Dashboard query error:", error instanceof Error ? error.message : String(error));
  }

  return (
    <div className="p-4 lg:p-10 space-y-10 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-wider rounded-md">
              Beta Access
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 font-medium">
            Welcome back, <span className="text-slate-900 font-bold">{company.name}</span>. Here&apos;s your performance.
          </p>
        </div>
        
        <Link 
          href="/dashboard/widget"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
        >
          Customize Widget
          <ArrowUpRight className="ml-2 w-4 h-4" />
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Total Quotes"
          value={totalQuotes}
          description="Cumulative quote requests generated"
          icon={FileText}
          variant="blue"
          trend={{ value: 12, isPositive: true }}
        />
        
        <MetricCard
          title="Base Rate"
          value={`$${company.pricingProfile?.baseRatePerMile.toFixed(2)}`}
          description="Current price per mile"
          icon={DollarSign}
          variant="emerald"
        />

        <MetricCard
          title="Active Status"
          value="Online"
          description="Widget is initialized on your site"
          icon={Activity}
          variant="indigo"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Quotes List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Recent Requests
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            </h2>
            <Link 
              href="/dashboard/quotes" 
              className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
            >
              View all
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
            {recentQuotes.length === 0 ? (
              <div className="p-12 text-center">
                <div className="inline-flex p-4 bg-slate-50 text-slate-400 rounded-full mb-4">
                  <FileText size={32} />
                </div>
                <p className="text-slate-500 font-bold">No requests yet.</p>
                <p className="text-sm text-slate-400 mt-1 max-w-[200px] mx-auto">
                  Embed the widget to start receiving quote requests.
                </p>
                <Link 
                  href="/dashboard/embed" 
                  className="mt-6 inline-block text-blue-600 font-bold text-sm hover:underline"
                >
                  Get Embed Code &rarr;
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentQuotes.map((quote) => (
                  <div key={quote.id} className="group px-6 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 font-black text-xs transition-colors group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-blue-500">
                        {quote.customerName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 tracking-tight leading-none mb-1.5">{quote.customerName}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
                           <span className="flex items-center gap-1">
                             <MapPin size={10} className="text-slate-300" />
                             {quote.pickupZip} &rarr; {quote.dropoffZip}
                           </span>
                           <span className="h-1 w-1 rounded-full bg-slate-200" />
                           <span>{quote.distanceMiles.toFixed(1)} mi</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-slate-900 tracking-tight leading-none mb-1">${quote.estimatedPrice.toFixed(2)}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(quote.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Tips / Sidebar Card */}
        <div className="space-y-6">
          <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-200">
            <TrendingUp size={32} className="mb-4 text-blue-200" />
            <h3 className="text-xl font-black tracking-tight mb-2 leading-tight">Increase Conversion</h3>
            <p className="text-blue-100 text-sm font-medium leading-relaxed mb-6">
              Add a specialized background image to your widget to build trust with your customers.
            </p>
            <Link 
              href="/dashboard/widget"
              className="block w-full text-center py-2.5 bg-white/20 backdrop-blur-md rounded-xl text-sm font-bold hover:bg-white/30 transition-all border border-white/20"
            >
              Update Styles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
