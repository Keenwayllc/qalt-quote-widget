"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Trash2, Copy, Check, ExternalLink, FormInput, Pencil, X, Settings, DollarSign } from "lucide-react";

interface QuoteForm {
  id: string;
  name: string;
}

export default function FormsPage() {
  const [forms, setForms] = useState<QuoteForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newFormName, setNewFormName] = useState("");
  const [showNewInput, setShowNewInput] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchForms();
  }, []);

  async function fetchForms() {
    try {
      const res = await fetch("/api/dashboard/forms");
      const data = await res.json();
      if (data.forms) setForms(data.forms);
    } catch {
      setError("Failed to load forms.");
    } finally {
      setLoading(false);
    }
  }

  async function createForm() {
    if (!newFormName.trim()) return;
    setCreating(true);
    setError(null);
    try {
      const res = await fetch("/api/dashboard/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newFormName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create form.");
      } else {
        setForms((prev) => [...prev, data.form]);
        setNewFormName("");
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

  function getEmbedCode(formId: string) {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://qalt.site";
    return `<iframe\n  src="${origin}/widget/form/${formId}"\n  width="100%"\n  height="700px"\n  frameborder="0"\n  style="border-radius: 24px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);"\n></iframe>`;
  }

  function copyEmbed(id: string) {
    navigator.clipboard.writeText(getEmbedCode(id));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">My Forms</h1>
          <p className="text-slate-500 mt-2 text-base font-medium">
            Each form has its own embed code and settings.
          </p>
        </div>
        <button
          onClick={() => setShowNewInput(true)}
          className="flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-700 transition-all shrink-0"
        >
          <Plus size={16} /> New Form
        </button>
      </header>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
          {error}
        </div>
      )}

      {showNewInput && (
        <div className="mb-6 bg-white rounded-2xl border border-slate-200 p-6 flex items-center gap-3">
          <FormInput size={18} className="text-blue-500 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Form name (e.g. Local Delivery Form)"
            value={newFormName}
            onChange={(e) => setNewFormName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createForm()}
            className="flex-1 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
          />
          <button
            onClick={createForm}
            disabled={creating || !newFormName.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold disabled:opacity-50 hover:bg-blue-500 transition-all"
          >
            {creating ? "Creating…" : "Create"}
          </button>
          <button onClick={() => { setShowNewInput(false); setNewFormName(""); }}>
            <X size={16} className="text-slate-400 hover:text-slate-600" />
          </button>
        </div>
      )}

      <div className="space-y-4">
        {forms.map((form) => {
          const embedCode = getEmbedCode(form.id);
          const widgetUrl = typeof window !== "undefined"
            ? `${window.location.origin}/widget/form/${form.id}`
            : `/widget/form/${form.id}`;

          return (
            <div key={form.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
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
                      className="flex-1 text-base font-bold text-slate-900 border-b border-blue-400 outline-none pb-0.5"
                    />
                    <button
                      onClick={() => renameForm(form.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-500"
                    >
                      Save
                    </button>
                    <button onClick={() => setRenamingId(null)}>
                      <X size={14} className="text-slate-400" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <FormInput size={16} className="text-blue-500" />
                    <span className="font-bold text-slate-900">{form.name}</span>
                    <button
                      onClick={() => { setRenamingId(form.id); setRenameValue(form.name); }}
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <Pencil size={13} />
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <a
                    href={widgetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                    title="Preview"
                  >
                    <ExternalLink size={15} />
                  </a>
                  {forms.length > 1 && (
                    <button
                      onClick={() => deleteForm(form.id)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-slate-900 rounded-xl p-4 text-xs font-mono text-blue-300 leading-relaxed overflow-x-auto mb-3">
                {embedCode}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => copyEmbed(form.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    copiedId === form.id
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {copiedId === form.id ? <Check size={13} /> : <Copy size={13} />}
                  {copiedId === form.id ? "Copied!" : "Copy Embed Code"}
                </button>
                <Link
                  href={`/dashboard/widget?formId=${form.id}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all"
                >
                  <Settings size={13} /> Edit Appearance
                </Link>
                <Link
                  href={`/dashboard/pricing?formId=${form.id}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-violet-50 text-violet-700 hover:bg-violet-100 transition-all"
                >
                  <DollarSign size={13} /> Edit Pricing
                </Link>
              </div>
            </div>
          );
        })}

        {forms.length === 0 && !showNewInput && (
          <div className="text-center py-16 text-slate-400">
            <FormInput size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium">No forms yet. Create your first one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
