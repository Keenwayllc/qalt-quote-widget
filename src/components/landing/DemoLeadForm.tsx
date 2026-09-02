"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";

const INPUT =
  "w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-[15px] font-medium text-slate-900 placeholder:text-slate-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all";
const LABEL = "block text-sm font-bold text-slate-700 mb-1.5";

export default function DemoLeadForm() {
  const [form, setForm] = useState({ companyName: "", contactName: "", email: "", website: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setError(data?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 text-center shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={30} />
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Thanks. We received your request.</h3>
        <p className="text-slate-500 font-medium mt-3 max-w-md mx-auto leading-relaxed">
          We will review your delivery setup and follow up by email.
        </p>
        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Prefer email?</p>
          <a href="mailto:business@qalt.site" className="inline-flex items-center gap-2 text-red-600 font-black hover:text-red-500 transition-colors">
            <Mail size={16} /> business@qalt.site
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="companyName" className={LABEL}>Company name</label>
          <input id="companyName" name="companyName" required value={form.companyName} onChange={update} placeholder="Northline Delivery Co." className={INPUT} />
        </div>
        <div>
          <label htmlFor="contactName" className={LABEL}>Contact name</label>
          <input id="contactName" name="contactName" required value={form.contactName} onChange={update} placeholder="Jordan Reyes" className={INPUT} />
        </div>
        <div>
          <label htmlFor="email" className={LABEL}>Email</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={update} placeholder="you@company.com" className={INPUT} />
        </div>
        <div>
          <label htmlFor="website" className={LABEL}>Website</label>
          <input id="website" name="website" value={form.website} onChange={update} placeholder="yourdeliverycompany.com" className={INPUT} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className={LABEL}>
          Message <span className="font-medium text-slate-400">(optional)</span>
        </label>
        <textarea id="message" name="message" rows={3} value={form.message} onChange={update} placeholder="What does your delivery business do, and how do you price jobs today?" className={`${INPUT} resize-none`} />
      </div>

      {status === "error" && (
        <p className="text-sm font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group/btn w-full px-8 py-4 bg-red-600 text-white font-black rounded-none flex items-center justify-center gap-3 hover:bg-red-500 transition-all active:scale-[0.99] disabled:opacity-60 shadow-xl shadow-red-900/20 text-sm tracking-wide"
      >
        {status === "submitting" ? (
          <><Loader2 size={16} className="animate-spin" /> Sending…</>
        ) : (
          <>Request a Demo <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform" /></>
        )}
      </button>
      <p className="text-center text-xs text-slate-400 font-medium">
        No account, phone number, or payment required.
      </p>
    </form>
  );
}
