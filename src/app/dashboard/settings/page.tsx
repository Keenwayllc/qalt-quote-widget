"use client";

import { useEffect, useState } from "react";
import { User, Mail, Save, CheckCircle2, AlertCircle, Send } from "lucide-react";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [testStatus, setTestStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [testMsg, setTestMsg] = useState("");

  useEffect(() => {
    fetch("/api/dashboard/settings")
      .then((r) => r.json())
      .then((data) => {
        setName(data.name ?? "");
        setEmail(data.email ?? "");
        setSubscriptionPlan(data.subscriptionPlan ?? "");
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus("idle");

    const res = await fetch("/api/dashboard/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subscriptionPlan }),
    });

    const data = await res.json();
    setSaving(false);

    if (data.success) {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("error");
      setErrorMsg(data.error ?? "Something went wrong");
    }
  };

  const sendTestEmail = async () => {
    setTestStatus("sending");
    setTestMsg("");
    const res = await fetch("/api/dashboard/test-email", { method: "POST" });
    const data = await res.json();
    if (data.success) {
      setTestStatus("sent");
      setTestMsg(`Test email sent to ${data.sentTo}`);
    } else {
      setTestStatus("error");
      setTestMsg(data.error ?? "Unknown error");
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[200px]">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-500 mt-1">
          Manage your company name and email. Quote notifications are sent to your email address.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Company Name
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Notification Email
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <p className="mt-1.5 text-xs text-slate-400">
            New quote requests will be emailed to this address.
          </p>
        </div>

        {status === "error" && (
          <div className="flex items-center gap-2 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
            <AlertCircle size={15} />
            {errorMsg}
          </div>
        )}

        {status === "success" && (
          <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
            <CheckCircle2 size={15} />
            Settings saved successfully.
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors"
        >
          <Save size={15} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {/* Admin Panel Selector */}
      {email.toLowerCase() === "emmanuel@gokeenway.com" && (
        <div className="mt-6 bg-slate-50 rounded-xl border border-blue-200 shadow-sm p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider">
            Admin Only
          </div>
          <h2 className="text-base font-bold text-slate-900 mb-1">Creator Plan Override</h2>
          <p className="text-sm text-slate-500 mb-4">
            Test different subscription tiers below. Select a plan and click "Save Changes" above to apply.
          </p>
          <div className="flex gap-3">
            {["STARTER", "PRO", "ENTERPRISE"].map(plan => (
              <label 
                key={plan}
                className={`flex-1 cursor-pointer rounded-lg border p-3 flex flex-col items-center gap-1 transition-all ${subscriptionPlan === plan ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white hover:border-blue-300 text-slate-600'}`}
              >
                <input 
                  type="radio" 
                  name="plan" 
                  value={plan} 
                  checked={subscriptionPlan === plan}
                  onChange={() => setSubscriptionPlan(plan)}
                  className="sr-only" 
                />
                <span className="text-sm font-semibold">{plan}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Test Email Section */}
      <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-base font-bold text-slate-900 mb-1">Test Email Notifications</h2>
        <p className="text-sm text-slate-500 mb-4">
          Send a test email to your account address to verify notifications are working.
        </p>

        <button
          onClick={sendTestEmail}
          disabled={testStatus === "sending"}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white text-sm font-semibold rounded-lg hover:bg-slate-900 disabled:opacity-60 transition-colors"
        >
          <Send size={15} />
          {testStatus === "sending" ? "Sending..." : "Send Test Email"}
        </button>

        {testStatus === "sent" && (
          <div className="mt-3 flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
            <CheckCircle2 size={15} />
            {testMsg}
          </div>
        )}

        {testStatus === "error" && (
          <div className="mt-3 flex items-start gap-2 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span className="font-mono break-all">{testMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
}
