"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DollarSign, Save, Weight } from "lucide-react";

interface PricingProfile {
  baseRatePerMile: number;
  minimumCharge: number;
  weightFee: number;
  itemCountFee: number;
  stairsFee: number;
  insideDeliveryFee: number;
  afterHoursFee: number;
  largeItemFee: number;
}

export default function PricingPage({ initialData }: { initialData: PricingProfile }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData(e.currentTarget);
    const data = {
      baseRatePerMile: parseFloat(formData.get("baseRatePerMile") as string),
      minimumCharge: parseFloat(formData.get("minimumCharge") as string),
      weightFee: parseFloat(formData.get("weightFee") as string),
      itemCountFee: parseFloat(formData.get("itemCountFee") as string),
      stairsFee: parseFloat(formData.get("stairsFee") as string),
      insideDeliveryFee: parseFloat(formData.get("insideDeliveryFee") as string),
      afterHoursFee: parseFloat(formData.get("afterHoursFee") as string),
      largeItemFee: parseFloat(formData.get("largeItemFee") as string),
    };

    try {
      const res = await fetch("/api/dashboard/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Pricing rules updated successfully!" });
        router.refresh();
      } else {
        setMessage({ type: "error", text: "Failed to update pricing rules." });
      }
    } catch {
      setMessage({ type: "error", text: "An error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Pricing Configuration</h1>
        <p className="text-slate-500">Define your delivery rates and extra charges. Changes reflect instantly in your widget.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Core Pricing */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <DollarSign className="text-blue-600" size={20} />
            Core Rates
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Base Rate per Mile ($)</label>
              <input
                name="baseRatePerMile"
                type="number"
                step="0.01"
                required
                defaultValue={initialData?.baseRatePerMile}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Minimum Job Charge ($)</label>
              <input
                name="minimumCharge"
                type="number"
                step="0.01"
                required
                defaultValue={initialData?.minimumCharge}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Weight & Item Count Fees */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Weight className="text-blue-600" size={20} />
            Per-Unit Fees
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Weight Fee ($ per lb)</label>
              <input
                name="weightFee"
                type="number"
                step="0.01"
                defaultValue={initialData?.weightFee ?? 0}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
              />
              <p className="text-xs text-slate-400 mt-1">Charged per pound of package weight</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Item Count Fee ($ per item)</label>
              <input
                name="itemCountFee"
                type="number"
                step="0.01"
                defaultValue={initialData?.itemCountFee ?? 0}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
              />
              <p className="text-xs text-slate-400 mt-1">Charged per item in the shipment</p>
            </div>
          </div>
        </div>

        {/* Extra Fees */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <DollarSign className="text-blue-600" size={20} />
            Optional Extra Fees
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Stairs Fee (Flat $)</label>
              <input
                name="stairsFee"
                type="number"
                step="0.01"
                defaultValue={initialData?.stairsFee}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Inside Delivery Fee (Flat $)</label>
              <input
                name="insideDeliveryFee"
                type="number"
                step="0.01"
                defaultValue={initialData?.insideDeliveryFee}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">After-Hours Fee (Flat $)</label>
              <input
                name="afterHoursFee"
                type="number"
                step="0.01"
                defaultValue={initialData?.afterHoursFee}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Large Item Fee (Flat $)</label>
              <input
                name="largeItemFee"
                type="number"
                step="0.01"
                defaultValue={initialData?.largeItemFee}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            <Save size={20} />
            {loading ? "Saving..." : "Save Changes"}
          </button>
          
          {message.text && (
            <p className={`text-sm font-semibold ${message.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
              {message.text}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
