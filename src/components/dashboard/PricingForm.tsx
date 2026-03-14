"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DollarSign, Save, Weight, HelpCircle } from "lucide-react";

interface PricingProfile {
  baseRatePerMile: number;
  minimumCharge: number;
  useMinimumCharge: boolean;
  minMilesThreshold: number;
  weightFee: number;
  itemCountFee: number;
  stairsFee: number;
  insideDeliveryFee: number;
  afterHoursFee: number;
  largeItemFee: number;
}

function Tooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex items-center ml-1.5">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="text-slate-400 hover:text-blue-500 transition-colors focus:outline-none"
        aria-label="More info"
      >
        <HelpCircle size={14} />
      </button>
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-900 text-white text-xs font-medium rounded-lg px-3 py-2 shadow-xl z-50 leading-relaxed pointer-events-none">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </span>
  );
}

function FieldLabel({ label, tooltip }: { label: string; tooltip: string }) {
  return (
    <label className="flex items-center text-sm font-medium text-slate-700 mb-1">
      {label}
      <Tooltip text={tooltip} />
    </label>
  );
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
      useMinimumCharge: formData.get("useMinimumCharge") === "on",
      minMilesThreshold: parseFloat(formData.get("minMilesThreshold") as string),
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
              <FieldLabel
                label="Base Rate per Mile ($)"
                tooltip="The price you charge per mile of travel. This is multiplied by the trip distance to calculate the base quote. Example: $2.50/mi × 10 miles = $25."
              />
              <input
                name="baseRatePerMile"
                type="number"
                step="0.01"
                required
                defaultValue={initialData?.baseRatePerMile}
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 transition-all shadow-sm"
              />
            </div>
            <div>
              <FieldLabel
                label="Free Miles Threshold (Distance)"
                tooltip="Miles excluded from billing at the start of every trip. Example: set to 2 means the first 2 miles are free — billing only starts from mile 3 onward. Set to 0 to bill from the very first mile."
              />
              <input
                name="minMilesThreshold"
                type="number"
                step="0.1"
                required
                defaultValue={initialData?.minMilesThreshold ?? 0}
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 transition-all shadow-sm"
              />
            </div>
            <div>
              <FieldLabel
                label="Minimum Job Charge ($)"
                tooltip="The lowest amount you'll ever charge for any job, regardless of distance. Short trips that calculate below this amount will automatically be bumped up to this value. Requires 'Apply Minimum Charge' to be ON."
              />
              <input
                name="minimumCharge"
                type="number"
                step="0.01"
                required
                defaultValue={initialData?.minimumCharge}
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 transition-all shadow-sm"
              />
            </div>
            <div className="flex items-start gap-3 pt-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="useMinimumCharge"
                  defaultChecked={initialData?.useMinimumCharge ?? true}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-slate-700">Apply Minimum Charge</span>
              </label>
              <Tooltip text="Toggle whether the minimum charge floor is enforced. When ON, no quote will go below your minimum. Turn OFF to let the quote calculate purely by distance with no floor — useful for high-volume, short-distance routes." />
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
              <FieldLabel
                label="Weight Fee ($ per lb)"
                tooltip="An extra charge added based on how heavy the package is. Multiplied by the weight the customer enters. Example: $0.10/lb × 50 lbs = $5 added to the quote. Set to 0 to not charge by weight."
              />
              <input
                name="weightFee"
                type="number"
                step="0.01"
                defaultValue={initialData?.weightFee ?? 0}
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 transition-all shadow-sm"
              />
            </div>
            <div>
              <FieldLabel
                label="Item Count Fee ($ per item)"
                tooltip="An extra charge per individual item in the shipment. Multiplied by the number of items the customer enters. Example: $2/item × 3 items = $6 added to the quote. Set to 0 to ignore item count."
              />
              <input
                name="itemCountFee"
                type="number"
                step="0.01"
                defaultValue={initialData?.itemCountFee ?? 0}
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Extra Fees */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <DollarSign className="text-blue-600" size={20} />
            Optional Extra Fees
          </h2>
          <p className="text-sm text-slate-500 -mt-2 mb-6">These are flat fees added to the quote when a customer selects the matching option in your widget. Set to 0 to not charge for that option.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FieldLabel
                label="Stairs Fee (Flat $)"
                tooltip="Added when the customer indicates the pickup or dropoff requires navigating stairs. Covers the extra labor and effort for stair carries. Example: $15 flat added if stairs are selected."
              />
              <input
                name="stairsFee"
                type="number"
                step="0.01"
                defaultValue={initialData?.stairsFee}
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 transition-all shadow-sm"
              />
            </div>
            <div>
              <FieldLabel
                label="Inside Delivery Fee (Flat $)"
                tooltip="Added when the customer requests delivery inside the building rather than curbside or doorstep drop-off. Accounts for the extra time and effort of bringing items inside."
              />
              <input
                name="insideDeliveryFee"
                type="number"
                step="0.01"
                defaultValue={initialData?.insideDeliveryFee}
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 transition-all shadow-sm"
              />
            </div>
            <div>
              <FieldLabel
                label="After-Hours Fee (Flat $)"
                tooltip="Added when the customer needs delivery outside your standard business hours — evenings, weekends, or holidays. Compensates your team for non-standard scheduling."
              />
              <input
                name="afterHoursFee"
                type="number"
                step="0.01"
                defaultValue={initialData?.afterHoursFee}
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 transition-all shadow-sm"
              />
            </div>
            <div>
              <FieldLabel
                label="Large Item Fee (Flat $)"
                tooltip="Added for oversized or extra-heavy items that require special handling, additional equipment, or more than one person to move safely. Example: furniture, appliances, or pallets."
              />
              <input
                name="largeItemFee"
                type="number"
                step="0.01"
                defaultValue={initialData?.largeItemFee}
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 transition-all shadow-sm"
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
