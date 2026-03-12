"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-10 max-w-md w-full mx-4 text-center">
        <div className="inline-flex p-4 bg-red-50 rounded-full mb-4">
          <AlertCircle className="text-red-500" size={32} />
        </div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight mb-2">
          Something went wrong
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          An error occurred while loading your dashboard. This is usually a temporary issue.
        </p>
        {error.digest && (
          <p className="text-xs text-slate-400 font-mono mb-4">Error ID: {error.digest}</p>
        )}
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
        >
          <RefreshCw size={16} />
          Try again
        </button>
      </div>
    </div>
  );
}
