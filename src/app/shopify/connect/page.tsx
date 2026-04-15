"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import QaltLogo from "@/components/shared/QaltLogo";
import { CheckCircle2, ShoppingBag, Loader2, ArrowRight } from "lucide-react";

function ShopifyConnectInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const shop = searchParams.get("shop") ?? "";

  const [step, setStep] = useState<"connect" | "loading" | "done" | "error">("connect");
  const [errorMsg, setErrorMsg] = useState("");

  // If user is already logged in, auto-connect
  useEffect(() => {
    if (!shop) return;
    // Check auth status silently
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data?.company) {
          handleConnect();
        }
      })
      .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop]);

  const handleConnect = async () => {
    setStep("loading");
    try {
      const res = await fetch("/api/shopify/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shop }),
      });
      if (res.ok) {
        setStep("done");
      } else {
        const d = await res.json();
        if (res.status === 401) {
          // Not logged in — send to login then back here
          router.push(`/login?redirect=/shopify/connect?shop=${shop}`);
        } else {
          setErrorMsg(d.error || "Something went wrong");
          setStep("error");
        }
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStep("error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 px-8 py-6 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <ShoppingBag size={22} className="text-emerald-400" />
            <span className="text-white/60 font-bold text-sm">+</span>
            <QaltLogo className="h-6 w-auto brightness-0 invert" />
          </div>
        </div>

        <div className="px-8 py-8">
          {step === "connect" && (
            <>
              <h1 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
                Connect Qalt to your Shopify store
              </h1>
              <p className="text-slate-500 font-medium text-sm mb-2">
                Store: <span className="font-black text-slate-700">{shop}</span>
              </p>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Log in to your Qalt account to link it. Your delivery quote widget will be added to your Shopify storefront automatically.
              </p>
              <button
                onClick={handleConnect}
                className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-sm hover:bg-red-500 transition-all flex items-center justify-center gap-2"
              >
                Connect my Qalt account
                <ArrowRight size={16} />
              </button>
              <p className="text-center text-xs text-slate-400 mt-4 font-medium">
                Don&apos;t have a Qalt account?{" "}
                <Link href="/register" className="text-red-600 font-bold hover:underline">
                  Sign up free
                </Link>
              </p>
            </>
          )}

          {step === "loading" && (
            <div className="flex flex-col items-center py-8 gap-4">
              <Loader2 size={36} className="text-red-500 animate-spin" />
              <p className="text-slate-600 font-bold text-sm">Connecting your store...</p>
            </div>
          )}

          {step === "done" && (
            <div className="flex flex-col items-center py-6 gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
                <CheckCircle2 size={32} className="text-emerald-500" />
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">All set!</h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                Your Qalt delivery quote widget is now live on <strong className="text-slate-700">{shop}</strong>. Customers will see a &ldquo;Get a Delivery Quote&rdquo; button on your storefront.
              </p>
              <Link
                href="/dashboard"
                className="mt-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all"
              >
                Go to Qalt Dashboard
              </Link>
            </div>
          )}

          {step === "error" && (
            <div className="flex flex-col items-center py-6 gap-4 text-center">
              <p className="text-red-600 font-bold text-sm">{errorMsg}</p>
              <button
                onClick={() => setStep("connect")}
                className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-500 transition-all"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-6 font-medium">
        Powered by{" "}
        <Link href="/" className="text-slate-600 font-bold hover:underline">
          Qalt
        </Link>
      </p>
    </div>
  );
}

export default function ShopifyConnectPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><Loader2 className="animate-spin text-red-500" size={32} /></div>}>
      <ShopifyConnectInner />
    </Suspense>
  );
}
