"use client";

import { widgetFormUrl, widgetEmbedCode } from "@/lib/widget-embed";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Trash2, Copy, Check, ExternalLink, FormInput, Pencil, X, Settings, DollarSign, Lock, ListChecks } from "lucide-react";
import type { CustomQuestion } from "@/lib/form-questions";
import { getEntitlements } from "@/lib/plans";
import FormOptionsEditor, { type FormFields, type FormTemplate, type VehicleDraft, validateEditorOptions } from "@/components/dashboard/FormOptionsEditor";
import FormSettingsPanel, { type ConfigurableForm } from "@/components/dashboard/FormSettingsPanel";
import "./forms.css";

type QuoteForm = ConfigurableForm;

const DEFAULT_FIELDS: FormFields = { showWeight: false, showItemCount: true, showExtras: true, showAwb: false };
const TEMPLATE_CHOICES: { id: FormTemplate; title: string; description: string }[] = [
  { id: "standard", title: "Standard", description: "Route, schedule, contact details, and the built-in fields you select." },
  { id: "extended", title: "Extended", description: "Everything in Standard, plus your own questions and answer choices." },
  { id: "quick", title: "Vehicle Options", description: "A fast quote with visual vehicle choices before the price breakdown." },
];

function formSummary(form: QuoteForm) {
  if (form.formStyle === "quick") {
    const count = Array.isArray(form.vehicleOptions) ? form.vehicleOptions.length : 0;
    return `${count} vehicle choice${count === 1 ? "" : "s"}`;
  }
  const count = [form.showWeight, form.showItemCount, form.showExtras, form.showAwb].filter(Boolean).length;
  if (form.formStyle === "extended") {
    const questions = Array.isArray(form.customQuestions) ? form.customQuestions.length : 0;
    return `${count} built-in field${count === 1 ? "" : "s"} · ${questions} custom question${questions === 1 ? "" : "s"}`;
  }
  return `${count} built-in field${count === 1 ? "" : "s"}`;
}

export default function FormsPage() {
  const [forms, setForms] = useState<QuoteForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newFormName, setNewFormName] = useState("");
  const [newFormStyle, setNewFormStyle] = useState<FormTemplate>("standard");
  const [newFormFields, setNewFormFields] = useState<FormFields>(DEFAULT_FIELDS);
  const [newFormQuestions, setNewFormQuestions] = useState<CustomQuestion[]>([]);
  const [newFormVehicles, setNewFormVehicles] = useState<VehicleDraft[]>([]);
  const [showNewInput, setShowNewInput] = useState(false);
  const [editingSelectionsId, setEditingSelectionsId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<string>("STARTER");
  const [maxForms, setMaxForms] = useState<number | "unlimited">(1);

  useEffect(() => {
    fetchForms();
  }, []);

  const atLimit = maxForms !== "unlimited" && forms.length >= maxForms;
  const canUseAwb = getEntitlements(plan).isVehicleQuotingEnabled;

  async function fetchForms() {
    try {
      const res = await fetch("/api/dashboard/forms");
      const data = await res.json();
      if (data.forms) setForms(data.forms);
      if (data.plan) setPlan(data.plan);
      if (data.maxForms !== undefined) setMaxForms(data.maxForms);
    } catch {
      setError("Failed to load forms.");
    } finally {
      setLoading(false);
    }
  }

  async function createForm() {
    if (!newFormName.trim()) return;
    const validationError = validateEditorOptions(newFormStyle, newFormQuestions, newFormVehicles);
    if (validationError) { setError(validationError); return; }
    setCreating(true);
    setError(null);
    try {
      const res = await fetch("/api/dashboard/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newFormName.trim(),
          formStyle: newFormStyle,
          fields: newFormFields,
          customQuestions: newFormStyle === "extended" ? newFormQuestions : [],
          vehicleOptions: newFormStyle === "quick"
            ? newFormVehicles.map((vehicle) => ({
                name: vehicle.name,
                fee: Math.max(0, Number(vehicle.fee) || 0),
              }))
            : [],
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create form.");
      } else {
        setForms((prev) => [...prev, data.form]);
        setNewFormName("");
        setNewFormStyle("standard");
        setNewFormFields(DEFAULT_FIELDS);
        setNewFormQuestions([]);
        setNewFormVehicles([]);
        setShowNewInput(false);
      }
    } catch {
      setError("Failed to create form.");
    } finally {
      setCreating(false);
    }
  }

  async function deleteForm(id: string) {
    if (!confirm("Delete this form? This cannot be undone.")) return;
    setError(null);
    const res = await fetch(`/api/dashboard/forms/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to delete form.");
    } else {
      setForms((prev) => prev.filter((f) => f.id !== id));
    }
  }

  async function renameForm(id: string) {
    if (!renameValue.trim()) return;
    setError(null);
    const res = await fetch(`/api/dashboard/forms/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: renameValue.trim() }),
    });
    if (res.ok) {
      setForms((prev) => prev.map((f) => (f.id === id ? { ...f, name: renameValue.trim() } : f)));
      setRenamingId(null);
    } else {
      const data = await res.json();
      setError(data.error || "Failed to rename form.");
    }
  }

  const getEmbedCode = widgetEmbedCode;
  async function copyEmbed(id: string) {
    try {
      await navigator.clipboard.writeText(getEmbedCode(id));
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
      setError("Copy failed. Select the embed code and copy it manually.");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    );
  }

  return (
    <div className="qalt-forms-studio max-w-4xl mx-auto p-4 sm:p-8">
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">My Forms</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-base font-medium">
            Each form has its own embed code and settings.
          </p>
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1">
            {maxForms === "unlimited"
              ? `${forms.length} form${forms.length !== 1 ? "s" : ""} · Unlimited on ${plan}`
              : `${forms.length} of ${maxForms} form${maxForms !== 1 ? "s" : ""} used · ${plan} plan`}
          </p>
        </div>
        {atLimit ? (
          <Link
            href="/dashboard/billing"
            className="flex items-center gap-2 px-5 py-3 bg-red-600 text-white rounded-none text-sm font-black hover:bg-red-500 transition-all shrink-0"
          >
            <Lock size={14} /> Upgrade to Add More
          </Link>
        ) : (
          <button
            onClick={() => setShowNewInput(true)}
            className="flex items-center gap-2 px-5 py-3 bg-slate-900 dark:bg-[#1e1e1e] text-white border border-transparent dark:border-white/10 rounded-none text-sm font-black hover:bg-slate-800 dark:hover:bg-white/5 transition-all shrink-0"
          >
            <Plus size={16} /> New Form
          </button>
        )}
      </header>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-none text-sm text-red-700 dark:text-red-400 font-medium">
          {error}
        </div>
      )}

      {showNewInput && (
        <div className="mb-6 bg-white dark:bg-[#1e1e1e] rounded-none border border-slate-200 dark:border-white/[0.06] shadow-sm dark:shadow-none p-6 space-y-5">
          <div className="flex items-center gap-3">
            <FormInput size={18} className="text-red-500 shrink-0" />
            <label htmlFor="new-form-name" className="sr-only">Form name</label>
            <input
              id="new-form-name"
              autoFocus
              type="text"
              placeholder="Form name (e.g. Local Delivery Form)"
              value={newFormName}
              onChange={(e) => setNewFormName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createForm()}
              className="flex-1 text-sm font-medium text-slate-900 dark:text-white outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-transparent"
            />
            <button onClick={() => { setShowNewInput(false); setNewFormName(""); setNewFormStyle("standard"); setNewFormFields(DEFAULT_FIELDS); setNewFormQuestions([]); setNewFormVehicles([]); }} aria-label="Close new form setup">
              <X size={16} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300" />
            </button>
          </div>

          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-wider text-slate-400">Choose a template</p>
            <div className="grid gap-3 md:grid-cols-3">
              {TEMPLATE_CHOICES.map((template, index) => (
                <button key={template.id} type="button" aria-pressed={newFormStyle === template.id}
                  onClick={() => { setNewFormStyle(template.id); setError(null); }}
                  className={"min-h-32 border p-4 text-left transition-all " + (newFormStyle === template.id
                    ? "border-red-500 bg-red-50 dark:bg-red-500/10"
                    : "border-slate-200 hover:border-slate-300 dark:border-white/10")}>
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-600 dark:text-red-400">0{index + 1}</span>
                  <span className="mt-2 block text-sm font-black text-slate-900 dark:text-white">{template.title}</span>
                  <span className="mt-1 block text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400">{template.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-wider text-slate-400">Choose what customers see</p>
            <FormOptionsEditor template={newFormStyle} fields={newFormFields} onFieldsChange={setNewFormFields}
              questions={newFormQuestions} onQuestionsChange={setNewFormQuestions}
              vehicles={newFormVehicles} onVehiclesChange={setNewFormVehicles} canUseAwb={canUseAwb} />
          </div>
          <div className="flex justify-end">
            <button
              onClick={createForm}
              disabled={creating || !newFormName.trim() || (newFormStyle === "quick" && newFormVehicles.length === 0)}
              className="px-5 py-2.5 bg-red-600 text-white rounded-none text-xs font-black disabled:opacity-50 hover:bg-red-500 transition-all"
            >
              {creating ? "Creating…" : `Create ${TEMPLATE_CHOICES.find((template) => template.id === newFormStyle)?.title} form`}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {forms.map((form, index) => {
          const embedCode = getEmbedCode(form.id);
          const widgetUrl = widgetFormUrl(form.id);
          const isLocked = maxForms !== "unlimited" && index >= maxForms;

          return (
            <div key={form.id} className={`bg-white dark:bg-[#1e1e1e] rounded-none border shadow-sm dark:shadow-none p-6 relative ${isLocked ? "border-amber-200 dark:border-amber-500/30 opacity-60" : "border-slate-200 dark:border-white/[0.06]"}`}>
              {isLocked && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-full">
                  <Lock size={11} className="text-amber-600 dark:text-amber-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-400">Upgrade to unlock</span>
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                {renamingId === form.id ? (
                  <div className="flex items-center gap-2 flex-1 mr-4">
                    <input
                      autoFocus
                      type="text"
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") renameForm(form.id);
                        if (e.key === "Escape") setRenamingId(null);
                      }}
                      className="flex-1 text-base font-bold text-slate-900 dark:text-white bg-transparent border-b border-red-400 outline-none pb-0.5"
                    />
                    <button
                      onClick={() => renameForm(form.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-none text-xs font-black hover:bg-red-500"
                    >
                      Save
                    </button>
                    <button onClick={() => setRenamingId(null)}>
                      <X size={14} className="text-slate-400 dark:text-slate-500" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    <FormInput size={16} className="text-red-500" />
                    <span className="font-bold text-slate-900 dark:text-white">{form.name}</span>
                    <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider border ${form.formStyle === "quick" ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-400" : "border-slate-200 bg-slate-50 text-slate-500 dark:bg-white/5 dark:border-white/10 dark:text-slate-400"}`}>
                      {form.formStyle === "quick" ? "Vehicle Options" : form.formStyle === "extended" ? "Extended" : "Standard"}
                    </span>
                    <button
                      onClick={() => { setRenamingId(form.id); setRenameValue(form.name); }}
                      className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                    >
                      <Pencil size={13} />
                    </button>
                    <span className="basis-full pl-6 text-xs font-medium text-slate-500 dark:text-slate-400">{formSummary(form)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <a
                    href={widgetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    title="Preview"
                  >
                    <ExternalLink size={15} />
                  </a>
                  {forms.length > 1 && (
                    <button
                      onClick={() => deleteForm(form.id)}
                      className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>

              {isLocked ? (
                <div className="mt-2 p-4 bg-amber-50/50 dark:bg-amber-500/5 border border-amber-100 dark:border-amber-500/20 rounded-none text-center">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-2">This form is inactive on your current plan.</p>
                  <Link
                    href="/dashboard/billing"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-none text-xs font-black hover:bg-red-500 transition-all"
                  >
                    Upgrade Plan
                  </Link>
                </div>
              ) : (
                <>
                  <details className="mb-3 rounded-lg border border-slate-200 dark:border-white/10">
                    <summary className="cursor-pointer px-4 py-3 text-xs font-bold text-slate-600 dark:text-slate-300">View embed code</summary>
                    <pre className="overflow-x-auto border-t border-slate-200 bg-slate-900 p-4 text-xs leading-relaxed text-red-300 dark:border-white/10">{embedCode}</pre>
                  </details>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button type="button" onClick={() => setEditingSelectionsId(editingSelectionsId === form.id ? null : form.id)}
                      aria-expanded={editingSelectionsId === form.id}
                      className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-xs font-black text-slate-700 hover:border-red-400 dark:border-white/10 dark:text-slate-200">
                      <ListChecks size={13} /> {editingSelectionsId === form.id ? "Close setup" : form.formStyle === "quick" ? "Choose vehicles" : form.formStyle === "extended" ? "Edit fields & questions" : "Choose fields"}
                    </button>
                    <button
                      onClick={() => copyEmbed(form.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-none text-xs font-black transition-all ${
                        copiedId === form.id
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"
                      }`}
                    >
                      {copiedId === form.id ? <Check size={13} /> : <Copy size={13} />}
                      {copiedId === form.id ? "Copied!" : "Copy Embed Code"}
                    </button>
                    <Link
                      href={`/dashboard/widget?formId=${form.id}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-none text-xs font-black bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-transparent dark:border-red-500/20 hover:bg-red-100 dark:hover:bg-red-500/15 transition-all"
                    >
                      <Settings size={13} /> Edit Appearance
                    </Link>
                    <Link
                      href={`/dashboard/pricing?formId=${form.id}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-none text-xs font-black bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-transparent dark:border-red-500/20 hover:bg-red-100 dark:hover:bg-red-500/15 transition-all"
                    >
                      <DollarSign size={13} /> Edit Pricing
                    </Link>
                  </div>
                  {editingSelectionsId === form.id && (
                    <div className="mt-5">
                      <FormSettingsPanel form={form} canUseAwb={canUseAwb}
                        onSaved={(updated) => setForms((current) => current.map((item) => item.id === updated.id ? updated : item))} />
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}

        {forms.length === 0 && !showNewInput && (
          <div className="bg-white dark:bg-[#1e1e1e] border border-dashed border-slate-200 dark:border-white/[0.06] rounded-none p-12 sm:p-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/30 rounded-none mb-6">
              <FormInput size={28} className="text-red-500" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">No forms yet</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm max-w-sm mx-auto mb-8">
              Create your first quote form and embed it on your website to start capturing delivery leads automatically.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setShowNewInput(true)}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-none text-sm font-black hover:bg-red-500 transition-all shadow-lg dark:shadow-none"
              >
                <Plus size={16} /> Create Your First Form
              </button>
              <Link
                href="/dashboard/embed"
                className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 rounded-none text-sm font-black hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
              >
                <ExternalLink size={14} /> View Embed Guide
              </Link>
            </div>
            <p className="mt-6 text-xs text-slate-400 dark:text-slate-500 font-medium">
              Each form gets its own embed code and pricing rules.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
