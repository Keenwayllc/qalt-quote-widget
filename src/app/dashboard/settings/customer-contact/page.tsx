"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Building2, CheckCircle2, Clock3, FileText, Mail, Phone, Save } from "lucide-react";

type Contact = {
  department: string;
  email: string;
  phone: string;
  hours: string;
  website: string;
};

const EMPTY: Contact = { department: "", email: "", phone: "", hours: "", website: "" };

export default function CustomerContactSettingsPage() {
  const [contact, setContact] = useState<Contact>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/dashboard/customer-contact")
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || "Could not load settings");
        setContact({
          department: data.department ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
          hours: data.hours ?? "",
          website: data.website ?? "",
        });
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Could not load settings"))
      .finally(() => setLoading(false));
  }, []);

  const set = (key: keyof Contact) => (value: string) => {
    setSaved(false);
    setContact((prev) => ({ ...prev, [key]: value }));
  };

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      const res = await fetch("/api/dashboard/customer-contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          department: contact.department,
          email: contact.email,
          phone: contact.phone,
          hours: contact.hours,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save settings");
      setContact((prev) => ({
        ...prev,
        department: data.contact.department ?? "",
        email: data.contact.email ?? "",
        phone: data.contact.phone ?? "",
        hours: data.contact.hours ?? "",
        website: data.contact.website ?? prev.website,
      }));
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save settings");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="grid min-h-[280px] place-items-center"><div className="h-6 w-6 animate-spin rounded-full border-2 border-red-600 border-t-transparent" /></div>;
  }

  const hasPublicContact = contact.department || contact.email || contact.phone || contact.hours;

  return (
    <div className="max-w-4xl p-4 sm:p-8">
      <Link href="/dashboard/settings" className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
        <ArrowLeft size={16} /> Account Settings
      </Link>

      <div className="mb-8">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">Customer-facing details</div>
        <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white">Customer Contact</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          Choose the contact details your customers can see and use. Your Internal Notification Email in Account Settings remains private unless you intentionally use the same address here.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 dark:border-white/[0.07] dark:bg-white/[0.03]">
        <div className="flex items-start gap-3">
          <FileText size={18} className="mt-0.5 shrink-0 text-red-600" />
          <div>
            <div className="text-sm font-black text-slate-900 dark:text-white">Where this contact appears</div>
            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Qalt uses these customer-facing details on the secure quote portal, quote emails, paid invoice emails, Quote PDFs, and Paid Invoice PDFs. Customer replies to Qalt quote and invoice emails go to the customer-facing email you enter here.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <form onSubmit={save} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/[0.07] dark:bg-[#151515] sm:p-7">
          <div>
            <h2 className="text-base font-black text-slate-900 dark:text-white">Default customer contact</h2>
            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">This is the contact identity customers see across quote and payment communications. You can change it at any time.</p>
          </div>

          <Field icon={Building2} label="Department or team" value={contact.department} onChange={set("department")} placeholder="Quotes & Customer Service" />
          <Field icon={Mail} label="Customer-facing email" value={contact.email} onChange={set("email")} placeholder="quotes@yourcompany.com" type="email" hint="Shown to customers on quotes, emails, invoices, and PDFs. Customer replies are sent here." />
          <Field icon={Phone} label="Customer-facing phone" value={contact.phone} onChange={set("phone")} placeholder="(555) 555-0123" type="tel" />
          <Field icon={Clock3} label="Support hours" value={contact.hours} onChange={set("hours")} placeholder="Mon-Fri, 8 AM-6 PM" />

          {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">{error}</div>}
          {saved && <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"><CheckCircle2 size={16} /> Customer contact saved.</div>}

          <button type="submit" disabled={saving} className="inline-flex h-11 items-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-black text-white transition hover:bg-red-700 disabled:opacity-50">
            <Save size={16} /> {saving ? "Saving..." : "Save customer contact"}
          </button>
        </form>

        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/[0.07] dark:bg-[#151515]">
          <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Customer preview</div>
          <div className="mt-5 rounded-2xl border border-slate-200 p-5 dark:border-white/[0.08]">
            <div className="text-sm font-black text-slate-900 dark:text-white">Need help?</div>
            <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">Contact your delivery provider about this quote.</p>
            {hasPublicContact ? (
              <div className="mt-4 space-y-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                {contact.department && <div>{contact.department}</div>}
                {contact.email && <div>{contact.email}</div>}
                {contact.phone && <div>{contact.phone}</div>}
                {contact.hours && <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{contact.hours}</div>}
                {contact.website && <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{contact.website}</div>}
              </div>
            ) : (
              <p className="mt-4 text-xs font-semibold leading-5 text-slate-500 dark:text-slate-400">Add a customer-facing contact so customers know who to reach with questions about their quote.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange, placeholder, type = "text", hint }: { icon: React.ElementType; label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string; hint?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold text-slate-700 dark:text-slate-300">{label}</label>
      <div className="relative">
        <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:font-medium placeholder:text-slate-400 focus:border-red-400 focus:ring-4 focus:ring-red-500/10 dark:border-white/[0.08] dark:bg-[#1d1d1d] dark:text-white" />
      </div>
      {hint && <p className="mt-1.5 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}