"use client";

import { useEffect, useRef, useState } from "react";
import {
  User, Mail, Save, CheckCircle2, AlertCircle, Send,
  Phone, Globe, MapPin, Building2, Camera, Upload,
} from "lucide-react";

type ProfileData = {
  name: string;
  email: string;
  subscriptionPlan: string;
  logoUrl: string;
  profilePicUrl: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  contactName: string;
};

function ImageUploader({
  label,
  hint,
  value,
  onChange,
  shape,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (url: string) => void;
  shape: "circle" | "square";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    setError("");
    const allowed = ["image/jpeg", "image/png"];
    if (!allowed.includes(file.type)) {
      setError("Only JPEG and PNG files are accepted.");
      return;
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File must be under 100 MB.");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) onChange(data.url);
      else setError(data.error ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-3">{label}</label>
      <div className="flex items-start gap-5">
        {/* Preview */}
        <div
          className={`shrink-0 bg-slate-100 border-2 border-slate-200 overflow-hidden flex items-center justify-center ${
            shape === "circle" ? "w-20 h-20 rounded-full" : "w-20 h-20 rounded-2xl"
          }`}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt={label} className="w-full h-full object-cover" />
          ) : (
            <Camera size={22} className="text-slate-400" />
          )}
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className="flex-1 border-2 border-dashed border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-red-400 hover:bg-red-50/30 transition-all"
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
          <Upload size={20} className="text-slate-400" />
          <p className="text-sm font-semibold text-slate-600 text-center">
            {uploading ? "Uploading…" : "Click or drag & drop"}
          </p>
          <p className="text-xs text-slate-400 text-center">{hint}</p>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-xs text-rose-600 flex items-center gap-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

function Field({
  label, icon: Icon, type = "text", value, onChange, hint, placeholder,
}: {
  label: string;
  icon: React.ElementType;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      <div className="relative">
        <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

export default function SettingsPage() {
  const [data, setData] = useState<ProfileData>({
    name: "", email: "", subscriptionPlan: "",
    logoUrl: "", profilePicUrl: "",
    phone: "", website: "", address: "",
    city: "", state: "", zip: "", contactName: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [testStatus, setTestStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [testMsg, setTestMsg] = useState("");

  useEffect(() => {
    fetch("/api/dashboard/settings")
      .then((r) => r.json())
      .then((d) => {
        setData({
          name: d.name ?? "",
          email: d.email ?? "",
          subscriptionPlan: d.subscriptionPlan ?? "",
          logoUrl: d.logoUrl ?? "",
          profilePicUrl: d.profilePicUrl ?? "",
          phone: d.phone ?? "",
          website: d.website ?? "",
          address: d.address ?? "",
          city: d.city ?? "",
          state: d.state ?? "",
          zip: d.zip ?? "",
          contactName: d.contactName ?? "",
        });
        setLoading(false);
      });
  }, []);

  const set = (key: keyof ProfileData) => (val: string) =>
    setData((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus("idle");
    const res = await fetch("/api/dashboard/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setSaving(false);
    if (result.success) {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("error");
      setErrorMsg(result.error ?? "Something went wrong");
    }
  };

  const sendTestEmail = async () => {
    setTestStatus("sending");
    const res = await fetch("/api/dashboard/test-email", { method: "POST" });
    const d = await res.json();
    if (d.success) { setTestStatus("sent"); setTestMsg(`Test email sent to ${d.sentTo}`); }
    else { setTestStatus("error"); setTestMsg(d.error ?? "Unknown error"); }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[200px]">
        <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-500 mt-1">Manage your company profile, contact info, and notification preferences.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ── Profile Images ──────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <h2 className="text-sm font-black text-slate-500 uppercase tracking-widest">Profile Images</h2>

          <ImageUploader
            label="Company Logo"
            hint="JPEG or PNG · Max 100 MB"
            value={data.logoUrl}
            onChange={set("logoUrl")}
            shape="square"
          />

          <ImageUploader
            label="Contact Profile Picture"
            hint="JPEG or PNG · Max 100 MB"
            value={data.profilePicUrl}
            onChange={set("profilePicUrl")}
            shape="circle"
          />
        </section>

        {/* ── Company Info ────────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <h2 className="text-sm font-black text-slate-500 uppercase tracking-widest">Company Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Company Name" icon={Building2} value={data.name} onChange={set("name")} placeholder="Acme Delivery Co." />
            <Field label="Phone Number" icon={Phone} value={data.phone} onChange={set("phone")} placeholder="+1 (555) 000-0000" type="tel" />
            <Field label="Website" icon={Globe} value={data.website} onChange={set("website")} placeholder="https://yoursite.com" />
            <Field label="Notification Email" icon={Mail} value={data.email} onChange={set("email")} type="email"
              hint="Quote requests are sent here." />
          </div>
        </section>

        {/* ── Contact Person ──────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <h2 className="text-sm font-black text-slate-500 uppercase tracking-widest">Primary Contact</h2>
          <Field label="Contact Name" icon={User} value={data.contactName} onChange={set("contactName")} placeholder="Jane Smith" />
        </section>

        {/* ── Business Address ────────────────────────────── */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <h2 className="text-sm font-black text-slate-500 uppercase tracking-widest">Business Address</h2>

          <Field label="Street Address" icon={MapPin} value={data.address} onChange={set("address")} placeholder="123 Main St" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            <div className="col-span-2 sm:col-span-1">
              <Field label="City" icon={MapPin} value={data.city} onChange={set("city")} placeholder="Chicago" />
            </div>
            <Field label="State" icon={MapPin} value={data.state} onChange={set("state")} placeholder="IL" />
            <Field label="ZIP Code" icon={MapPin} value={data.zip} onChange={set("zip")} placeholder="60601" />
          </div>
        </section>

        {/* ── Status / Save ───────────────────────────────── */}
        {status === "error" && (
          <div className="flex items-center gap-2 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3">
            <AlertCircle size={15} /> {errorMsg}
          </div>
        )}
        {status === "success" && (
          <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
            <CheckCircle2 size={15} /> Settings saved successfully.
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700 disabled:opacity-60 transition-colors shadow-sm shadow-red-200"
        >
          <Save size={15} />
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </form>

      {/* ── Admin Plan Override ─────────────────────────── */}
      {data.email.toLowerCase() === "emmanuel@gokeenway.com" && (
        <div className="mt-6 bg-slate-50 rounded-2xl border border-red-200 shadow-sm p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider">
            Admin Only
          </div>
          <h2 className="text-base font-bold text-slate-900 mb-1">Creator Plan Override</h2>
          <p className="text-sm text-slate-500 mb-4">Test different subscription tiers.</p>
          <div className="flex gap-3">
            {["STARTER", "PRO", "ENTERPRISE"].map((plan) => (
              <label
                key={plan}
                className={`flex-1 cursor-pointer rounded-xl border p-3 flex flex-col items-center gap-1 transition-all ${
                  data.subscriptionPlan === plan
                    ? "border-red-600 bg-red-50 text-red-700"
                    : "border-slate-200 bg-white hover:border-red-300 text-slate-600"
                }`}
              >
                <input
                  type="radio"
                  name="plan"
                  value={plan}
                  checked={data.subscriptionPlan === plan}
                  onChange={() => set("subscriptionPlan")(plan)}
                  className="sr-only"
                />
                <span className="text-sm font-semibold">{plan}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* ── Test Email ──────────────────────────────────── */}
      <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-base font-bold text-slate-900 mb-1">Test Email Notifications</h2>
        <p className="text-sm text-slate-500 mb-4">Send a test email to verify notifications are working.</p>
        <button
          onClick={sendTestEmail}
          disabled={testStatus === "sending"}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white text-sm font-bold rounded-xl hover:bg-slate-900 disabled:opacity-60 transition-colors"
        >
          <Send size={15} />
          {testStatus === "sending" ? "Sending…" : "Send Test Email"}
        </button>
        {testStatus === "sent" && (
          <div className="mt-3 flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">
            <CheckCircle2 size={15} /> {testMsg}
          </div>
        )}
        {testStatus === "error" && (
          <div className="mt-3 flex items-center gap-2 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2">
            <AlertCircle size={15} /> {testMsg}
          </div>
        )}
      </div>
    </div>
  );
}
