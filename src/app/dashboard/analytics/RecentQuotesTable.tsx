import { formatDistanceToNow } from "date-fns";
import { QuoteRequest } from "@prisma/client";

interface RecentQuotesTableProps {
  quotes: QuoteRequest[];
}

export default function RecentQuotesTable({ quotes }: RecentQuotesTableProps) {
  if (quotes.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 p-12 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">No Recent Quotes</h2>
        <p className="text-slate-500 font-medium">When customers request quotes, they will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Recent Quotes</h2>
        <p className="text-sm text-slate-500 font-medium">The latest quote requests from your widget.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Route</th>
              <th className="px-6 py-4">Est. Price</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {quotes.map((quote) => (
              <tr key={quote.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">{quote.customerName}</div>
                  <div className="text-sm text-slate-500">{quote.customerEmail}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-xs">{quote.pickupZip || "--"}</span>
                    <span className="text-slate-400">→</span>
                    <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-xs">{quote.dropoffZip || "--"}</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{quote.distanceMiles?.toFixed(1) || 0} miles</div>
                </td>
                <td className="px-6 py-4 font-semibold text-slate-900">
                  ${quote.estimatedPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    quote.status === "PENDING" ? "bg-amber-100 text-amber-700" :
                    quote.status === "BOOKED" ? "bg-emerald-100 text-emerald-700" :
                    "bg-slate-100 text-slate-700"
                  }`}>
                    {quote.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 text-right whitespace-nowrap">
                  {formatDistanceToNow(new Date(quote.createdAt), { addSuffix: true })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
