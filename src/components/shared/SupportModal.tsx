"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll when open
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

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setFormState("idle");
    setErrorMessage("");
  };

  const handleClose = () => {
    onClose();
    // Delay reset so animation completes first
    setTimeout(resetForm, 300);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) handleClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();

      if (!res.ok) {
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

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl shadow-slate-900/20 border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2
              id="support-modal-title"
              className="text-lg font-black text-slate-900 tracking-tight"
            >
              Tech Support
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-0.5">
              We&apos;ll get back to you as soon as possible.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Close support modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {formState === "success" ? (
            <div className="flex flex-col items-center text-center py-8 gap-4">
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center">
                <CheckCircle2 size={32} className="text-emerald-500" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  Your support request has been sent to{" "}
                  <span className="text-blue-600 font-bold">support@qalt.site</span>.
                  <br />
                  We&apos;ll be in touch shortly.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="mt-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="support-name"
                    className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5"
                  >
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    id="support-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="support-email"
                    className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5"
                  >
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="support-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="support-subject"
                  className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5"
                >
                  Subject <span className="text-red-400">*</span>
                </label>
                <input
                  id="support-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder="Brief description of your issue"
                  className="w-full px-4 py-2.5 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label
                  htmlFor="support-message"
                  className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5"
                >
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="support-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  placeholder="Describe your issue in detail…"
                  className="w-full px-4 py-2.5 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                />
              </div>

              {formState === "error" && (
                <div className="flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
                  <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600 font-medium">{errorMessage}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <p className="text-xs text-slate-400 font-medium">
                  Sends to{" "}
                  <span className="text-slate-600 font-bold">support@qalt.site</span>
                </p>
                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-200"
                >
                  {formState === "submitting" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
