"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, ImagePlus, Loader2, Send, X } from "lucide-react";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormState = "idle" | "submitting" | "success" | "error";

const PLATFORMS = [
  "General Qalt issue",
  "ChatGPT",
  "Claude",
  "Manus",
  "Perplexity",
  "Qwen",
  "DeepSeek",
  "Other AI / API client",
];

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [exactError, setExactError] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPlatform(PLATFORMS[0]);
    setSubject("");
    setMessage("");
    setExactError("");
    setScreenshot(null);
    setFormState("idle");
    setErrorMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetForm, 300);
  };

  const handleFile = (file?: File) => {
    setErrorMessage("");
    if (!file) {
      setScreenshot(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setScreenshot(null);
      setErrorMessage("Screenshot must be 5 MB or smaller.");
      setFormState("error");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setScreenshot(null);
      setErrorMessage("Screenshot must be a PNG, JPG, or WebP image.");
      setFormState("error");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setScreenshot(file);
    setFormState("idle");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.set("name", name);
      formData.set("email", email);
      formData.set("platform", platform);
      formData.set("subject", subject);
      formData.set("message", message);
      formData.set("exactError", exactError);
      if (screenshot) formData.set("screenshot", screenshot);

      const response = await fetch("/api/support", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        setFormState("error");
      } else {
        setFormState("success");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setFormState("error");
    }
  };

  if (!isOpen) return null;

  const fieldClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-red-500";
  const labelClass = "mb-1.5 block text-xs font-black uppercase tracking-widest text-slate-500";

  return (
    <div
      ref={overlayRef}
      onClick={(event) => event.target === overlayRef.current && handleClose()}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-modal-title"
    >
      <div className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 id="support-modal-title" className="text-lg font-black tracking-tight text-slate-900">Contact Qalt Support</h2>
            <p className="mt-0.5 text-sm font-medium text-slate-500">Tell us what happened and include a screenshot if it helps.</p>
          </div>
          <button onClick={handleClose} className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Close support modal">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6">
          {formState === "success" ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50">
                <CheckCircle2 size={32} className="text-emerald-500" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-black text-slate-900">Support request sent</h3>
                <p className="max-w-md text-sm font-medium leading-relaxed text-slate-500">We received the details{ screenshot ? " and screenshot" : "" }. Our support team can use them to trace the Qalt connection or app issue.</p>
              </div>
              <button onClick={handleClose} className="mt-2 rounded-xl bg-red-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-red-700">Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="support-name" className={labelClass}>Name *</label>
                  <input ref={firstInputRef} id="support-name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={120} placeholder="Your name" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="support-email" className={labelClass}>Email *</label>
                  <input id="support-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={254} placeholder="you@company.com" className={fieldClass} />
                </div>
              </div>

              <div>
                <label htmlFor="support-platform" className={labelClass}>Where did the problem happen?</label>
                <select id="support-platform" value={platform} onChange={(e) => setPlatform(e.target.value)} className={fieldClass}>
                  {PLATFORMS.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="support-subject" className={labelClass}>Subject *</label>
                <input id="support-subject" value={subject} onChange={(e) => setSubject(e.target.value)} required maxLength={160} placeholder="Example: Claude cannot list my recent quotes" className={fieldClass} />
              </div>

              <div>
                <label htmlFor="support-message" className={labelClass}>What were you trying to do, and what happened? *</label>
                <textarea id="support-message" value={message} onChange={(e) => setMessage(e.target.value)} required maxLength={6000} rows={5} placeholder="Tell us the steps you took, what you expected, and what happened instead." className={`${fieldClass} resize-y`} />
              </div>

              <div>
                <label htmlFor="support-error" className={labelClass}>Exact error message <span className="font-medium normal-case tracking-normal text-slate-400">(optional)</span></label>
                <textarea id="support-error" value={exactError} onChange={(e) => setExactError(e.target.value)} maxLength={2000} rows={3} placeholder="Paste the exact error text here if you have it." className={`${fieldClass} resize-y font-mono text-xs`} />
              </div>

              <div>
                <span className={labelClass}>Screenshot <span className="font-medium normal-case tracking-normal text-slate-400">(optional)</span></span>
                <input ref={fileInputRef} id="support-screenshot" type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={(e) => handleFile(e.target.files?.[0])} />
                <label htmlFor="support-screenshot" className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 transition hover:border-red-300 hover:bg-red-50/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm"><ImagePlus size={19} /></div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-700">{screenshot ? screenshot.name : "Upload a screenshot"}</p>
                    <p className="mt-0.5 text-xs font-medium text-slate-400">PNG, JPG, or WebP. Maximum 5 MB.</p>
                  </div>
                  {screenshot ? <span className="text-xs font-bold text-emerald-600">Attached</span> : null}
                </label>
                <p className="mt-2 text-xs font-medium text-slate-400">Please do not include passwords, API keys, access tokens, or other secrets in screenshots.</p>
              </div>

              {formState === "error" && errorMessage ? (
                <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                  <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
                  <p className="text-sm font-medium text-red-600">{errorMessage}</p>
                </div>
              ) : null}

              <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs font-medium text-slate-400">Sent securely to <span className="font-bold text-slate-600">support@qalt.site</span>. Screenshots are attached to the support email.</p>
                <button type="submit" disabled={formState === "submitting"} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60">
                  {formState === "submitting" ? <><Loader2 size={15} className="animate-spin" /> Sending...</> : <><Send size={15} /> Send Support Request</>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
