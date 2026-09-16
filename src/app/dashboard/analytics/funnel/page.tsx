import Link from "next/link";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { getCurrentCompany } from "@/lib/session";
import { getFunnelMetrics } from "@/lib/growth-engine";

function pct(v: number) { return `${v.toFixed(1)}%`; }
function money(v: number) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v); }

export default async function FunnelPage() {
  const company = await getCurrentCompany();
  const m = await getFunnelMetrics(company.id, 30);
  const steps = [
    ["Quote starts", m.starts], ["Completed quotes", m.quotes], ["Booked / accepted", m.booked], ["Paid", m.paid]
  ] as const;
  return <div className="mx-auto max-w-7xl space-y-7 p-4 lg:p-10">
    <div><Link href="/dashboard/analytics" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500"><ArrowLeft size={16}/>Analytics</Link><p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-red-600">Phase 31</p><h1 className="mt-1 text-3xl font-black text-slate-950 dark:text-white">Quote Funnel Analytics</h1><p className="mt-2 text-sm font-medium text-slate-500">Last 30 days. See where quote traffic converts and where it drops off.</p></div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{steps.map(([label,value],i)=><div key={label} className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#111]"><div className="text-xs font-black uppercase tracking-wider text-slate-400">{label}</div><div className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{value}</div>{i<steps.length-1 && <div className="mt-2 text-xs font-bold text-slate-400">{m.starts ? pct((value/m.starts)*100) : "0%"} of starts</div>}</div>)}</div>
    <div className="grid gap-4 md:grid-cols-3"><div className="rounded-3xl bg-slate-950 p-6 text-white"><TrendingUp size={22}/><div className="mt-5 text-xs font-black uppercase tracking-wider text-white/50">Start → quote</div><div className="mt-1 text-3xl font-black">{pct(m.quoteConversion)}</div></div><div className="rounded-3xl bg-slate-950 p-6 text-white"><TrendingUp size={22}/><div className="mt-5 text-xs font-black uppercase tracking-wider text-white/50">Quote → booking</div><div className="mt-1 text-3xl font-black">{pct(m.bookingConversion)}</div></div><div className="rounded-3xl bg-emerald-600 p-6 text-white"><div className="text-xs font-black uppercase tracking-wider text-white/70">Booked / paid value</div><div className="mt-5 text-3xl font-black">{money(m.revenue)}</div><div className="mt-2 text-xs font-bold text-white/70">{m.abandoned} abandoned lead{m.abandoned===1?"":"s"}</div></div></div>
  </div>;
}
