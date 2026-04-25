"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";

export default function DeleteAccountButton() {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (confirm !== "DELETE") return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/dashboard/account", { method: "DELETE" });
      if (res.ok) {
        window.location.href = "/?accountDeleted=1";
      } else {
        const d = await res.json();
        setError(d.error || "Something went wrong.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="shrink-0 px-4 py-2 text-xs font-black text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-all whitespace-nowrap"
      >
        Close Account
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-[#141414] rounded-2xl shadow-2xl dark:shadow-black/60 border dark:border-white/6 overflow-hidden">
            <div className="bg-red-600 px-6 py-5 flex items-center gap-3">
              <Trash2 size={20} className="text-white" />
              <h2 className="text-white font-black text-base">Close your account</h2>
            </div>
            <div className="px-6 py-6 space-y-5">
              <p className="text-slate-600 dark:text-zinc-300 text-sm leading-relaxed">
                This will <strong className="text-slate-900 dark:text-white">permanently delete</strong> your account, all quotes, widget settings, and cancel your subscription. There is no undo.
              </p>
              <div>
                <label className="text-xs font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest block mb-2">
                  Type <span className="text-red-600">DELETE</span> to confirm
                </label>
                <input
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="DELETE"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-white/6 rounded-xl text-sm font-bold bg-white dark:bg-[#1c1c1c] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400"
                />
              </div>
              {error && <p className="text-xs font-bold text-red-600">{error}</p>}
              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => { setOpen(false); setConfirm(""); setError(""); }}
                  className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-white/6 text-sm font-bold text-slate-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={confirm !== "DELETE" || loading}
                  className="flex-1 py-3 rounded-xl bg-red-600 text-white text-sm font-black hover:bg-red-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? <><Loader2 size={14} className="animate-spin" /> Deleting...</> : "Delete Everything"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
