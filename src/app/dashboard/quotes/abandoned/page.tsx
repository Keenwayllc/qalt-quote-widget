import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Clock3, DollarSign } from "lucide-react";
import { getCurrentCompany } from "@/lib/session";
import AbandonedQuoteActions from "./AbandonedQuoteActions";
import { listOpenAbandonedQuotes } from "@/lib/abandoned-quotes";

function money(value: number | null) {
  if (value == null) return "Not priced yet";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function age(date: Date) {
  const minutes = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 60000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default async function AbandonedQuotesPage() {
  const company = await getCurrentCompany();
  const leads = await listOpenAbandonedQuotes(company.id);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 lg:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/dashboard/quotes" className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white">
            <ArrowLeft size={16} /> Back to Quotes
          </Link>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-red-600 dark:text-red-400">Recovery</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">Abandoned Quotes</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500 dark:text-slate-400">
            Customers who entered contact information but left before completing their booking.
          </p>
        </div>
        <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm dark:border-white/10 dark:bg-[#171717] dark:text-zinc-200">
          {leads.length} recoverable lead{leads.length === 1 ? "" : "s"}
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-white/10 dark:bg-[#111111]">
          <h2 className="text-xl font-black text-slate-900 dark:text-white">No abandoned quotes yet</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm font-medium text-slate-500">When a customer shares an email or phone number and leaves before booking, the recovery lead will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {leads.map((lead) => (
            <article key={lead.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#111111] sm:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-black text-slate-950 dark:text-white">{lead.customerName || lead.customerEmail || lead.customerPhone || "Potential customer"}</h2>
                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">{lead.stage}</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {lead.customerEmail && <a href={`mailto:${lead.customerEmail}`} className="inline-flex items-center gap-1.5 hover:text-red-600"><Mail size={14} />{lead.customerEmail}</a>}
                    {lead.customerPhone && <a href={`tel:${lead.customerPhone}`} className="inline-flex items-center gap-1.5 hover:text-red-600"><Phone size={14} />{lead.customerPhone}</a>}
                    <span className="inline-flex items-center gap-1.5"><Clock3 size={14} />Last active {age(lead.lastActivityAt)}</span>
                  </div>

                  {(lead.pickupAddress || lead.dropoffAddress || lead.pickupZip || lead.dropoffZip) && (
                    <div className="mt-4 flex items-start gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 dark:bg-white/5 dark:text-zinc-300">
                      <MapPin size={16} className="mt-0.5 shrink-0 text-red-500" />
                      <span className="truncate">{lead.pickupAddress || lead.pickupZip || "Pickup"} → {lead.dropoffAddress || lead.dropoffZip || "Dropoff"}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 lg:text-right">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Potential value</div>
                    <div className="mt-1 flex items-center gap-1 text-xl font-black text-slate-950 dark:text-white lg:justify-end"><DollarSign size={17} className="text-emerald-500" />{money(lead.estimatedPrice).replace("$", "")}</div>
                    {lead.distanceMiles != null && <div className="mt-1 text-xs font-bold text-slate-400">{lead.distanceMiles.toFixed(1)} miles</div>}
                    <AbandonedQuoteActions id={lead.id} email={lead.customerEmail} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
