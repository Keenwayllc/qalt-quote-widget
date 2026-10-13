"use client";

import { useId, useState } from "react";
import { Building2, Clock3, FileText, Mail, Phone } from "lucide-react";

type Contact = { department: string; email: string; phone: string; hours: string; website: string };
const contexts = [
  { id: "portal", label: "Quote portal", placement: "Beside the quote summary in the secure customer portal." },
  { id: "quote-email", label: "Quote email", placement: "Below the secure quote link in the customer email." },
  { id: "invoice-email", label: "Paid invoice email", placement: "Below the invoice link in the payment confirmation email." },
  { id: "quote-pdf", label: "Quote PDF", placement: "In the quote notes section beneath the delivery and pricing details." },
  { id: "invoice-pdf", label: "Paid invoice PDF", placement: "In the payment confirmation section beneath the invoice details." },
] as const;
const examples = { department: "Quotes & Customer Service", email: "quotes@example.com", phone: "(555) 555-0123", hours: "Mon-Fri, 8 AM-6 PM" };

export function CustomerContactPreview({ contact, status }: { contact: Contact; status: "saved" | "draft" | "unavailable" }) {
  const id = useId();
  const [context, setContext] = useState<string>("portal");
  const [showExamples, setShowExamples] = useState(false);
  const selected = contexts.find((item) => item.id === context)!;
  const pdf = context.endsWith("pdf");
  const invoice = context.startsWith("invoice");
  const email = context.endsWith("email");
  const keys = ["department", "email", "phone", "hours"] as const;
  const hasContact = keys.some((key) => contact[key].trim());
  const values = keys.map((key) => ({ key, value: contact[key].trim() || (showExamples ? examples[key] : ""), sample: !contact[key].trim() }));
  const visible = values.filter((item) => item.value);
  const icons = { department: Building2, email: Mail, phone: Phone, hours: Clock3 };

  return (
    <aside aria-labelledby={`${id}-title`} className="min-w-0 h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/[0.07] dark:bg-[#151515] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id={`${id}-title`} className="text-xs font-black uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Customer preview</h2>
        <span role="status" className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${status === "saved" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300" : "bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300"}`}>
          {status === "draft" ? "Draft · unsaved" : status === "saved" ? "Saved contact" : "Settings unavailable"}
        </span>
      </div>
      <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">See how your contact appears to customers. Edits appear here immediately; save to publish them.</p>
      <label htmlFor={`${id}-context`} className="mt-4 block text-xs font-bold text-slate-700 dark:text-slate-300">Preview placement</label>
      <select id={`${id}-context`} value={context} onChange={(event) => setContext(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-white/10 dark:bg-[#1d1d1d] dark:text-white">
        {contexts.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
      </select>
      <label className="mt-3 flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
        <input type="checkbox" checked={showExamples} onChange={(event) => setShowExamples(event.target.checked)} className="h-4 w-4 accent-red-600 focus-visible:outline-2 focus-visible:outline-red-500" /> Show examples for empty fields
      </label>
      {showExamples && <p className="mt-2 text-xs leading-5 text-amber-800 dark:text-amber-300">Example details are for this preview only and will not be saved or sent.</p>}
      <div className={`mt-5 overflow-hidden border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.03] ${pdf ? "rounded-md" : "rounded-2xl"}`}>
        <div className="h-1 bg-red-600" />
        <div className="border-b border-slate-200 px-4 py-3 dark:border-white/10">
          <div className="flex items-center justify-between gap-2 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400"><span>Qalt · illustrative preview</span><FileText size={14} aria-hidden="true" /></div>
          {email && <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">Subject: {invoice ? "Your paid invoice INV-1042" : "Your delivery quote Q-1042"}</p>}
          <h3 className="mt-2 text-base font-black text-slate-900 dark:text-white">{invoice ? "Paid invoice" : "Your delivery quote"}</h3>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300"><span>{invoice ? "INV-1042" : "Q-1042"} · Sample delivery</span><span className="font-bold">$245.00</span></div>
          {invoice && <span className="mt-2 inline-block rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-black text-emerald-800">PAID</span>}
        </div>
        <div className="p-4">
          {email && <><p className="text-xs leading-5 text-slate-600 dark:text-slate-300">Hi Alex, {invoice ? "thank you for your payment. Your paid invoice is ready." : "your delivery quote is ready to review."}</p><span className="mt-3 inline-block rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white">{invoice ? "View paid invoice" : "View quote"}</span></>}
          {pdf && <p className="mb-3 text-[11px] leading-5 text-slate-500 dark:text-slate-400"><strong className="block uppercase">{invoice ? "Payment received" : "Quote notes"}</strong>{invoice ? "Payment received in full for this delivery." : "Based on the route, shipment details and services shown above. Changes may affect the final price."}</p>}
          <div className={`${email ? "mt-4" : ""} rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#1d1d1d]`}>
            <div className="text-xs font-black text-slate-900 dark:text-white">{invoice ? "Questions?" : "Need help?"}</div>
            {context === "portal" && <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">Contact your delivery provider about this quote.</p>}
            {visible.length > 0 ? <div className={`mt-3 space-y-2 ${pdf ? "text-[11px]" : "text-xs"}`}>
              {visible.map(({ key, value, sample }) => { const Icon = icons[key]; return <div key={key} className="flex items-start gap-2"><Icon size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-slate-400" /><span className={`min-w-0 break-words [overflow-wrap:anywhere] ${sample ? "text-slate-500 dark:text-slate-400" : "font-semibold text-slate-700 dark:text-slate-200"}`}>{value}{sample && <span className="ml-1 text-[10px] font-medium">(example)</span>}</span></div>; })}
              {context === "portal" && contact.website.trim() && <p className="break-words [overflow-wrap:anywhere] text-slate-500">{contact.website}</p>}
            </div> : <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">No customer contact details added. {email || context === "invoice-pdf" ? "The contact section is omitted until you add details." : "Customers see a general message to contact their delivery provider."} Turn on examples to explore this placement.</p>}
          </div>
          {email && <p className="mt-3 break-words [overflow-wrap:anywhere] text-[11px] leading-5 text-slate-500 dark:text-slate-400">{contact.email.trim() ? `Customer replies go to ${contact.email.trim()}.` : "Add a customer-facing email to direct customer replies to your team."}</p>}
        </div>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">{selected.placement} Layout is illustrative; delivery and pricing are examples.</p>
      {!hasContact && status === "draft" && <p className="mt-2 text-xs leading-5 text-amber-800 dark:text-amber-300">Saving will remove the customer contact details from future communications.</p>}
    </aside>
  );
}
