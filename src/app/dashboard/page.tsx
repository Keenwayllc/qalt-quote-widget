import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";

export default async function DashboardOverview() {
  const company = await getCurrentCompany();

  // Get recent quotes
  const recentQuotes = await prisma.quoteRequest.findMany({
    where: { companyId: company.id },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const totalQuotes = await prisma.quoteRequest.count({
    where: { companyId: company.id },
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome back, {company.name}</h1>
      <p className="text-slate-500 mb-8">Here&apos;s an overview of your widget performance.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Quotes Requested</h3>
          <p className="text-4xl font-extrabold text-slate-900">{totalQuotes}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Current Base Rate</h3>
          <p className="text-4xl font-extrabold text-slate-900">${company.pricingProfile?.baseRatePerMile.toFixed(2)} / mi</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Widget Status</h3>
          <p className="text-4xl font-extrabold text-emerald-600">Active</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">Recent Quote Requests</h2>
        </div>
        
        {recentQuotes.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No quotes requested yet. <a href="/dashboard/embed" className="text-blue-600 font-medium hover:underline">Embed your widget</a> to start receiving quotes!
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentQuotes.map((quote) => (
              <div key={quote.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">{quote.customerName}</p>
                  <p className="text-sm text-slate-500">{quote.pickupZip} &rarr; {quote.dropoffZip} ({quote.distanceMiles.toFixed(1)} miles)</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">${quote.estimatedPrice.toFixed(2)}</p>
                  <p className="text-xs text-slate-400">{new Date(quote.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
