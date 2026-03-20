"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DollarSign, Save, Weight, HelpCircle, Clock, Box, Plus, Trash2 } from "lucide-react";

interface LargeItemCategory {
  name: string;
  price: number;
}

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
  businessHoursStart?: string;
  businessHoursEnd?: string;
  businessDays?: string;
  largeItemFee?: number;
  largeItemsEnabled?: boolean;
  largeItemCategories?: LargeItemCategory[];
}

const DAYS = [
  { label: "Sun", value: "0" },
  { label: "Mon", value: "1" },
  { label: "Tue", value: "2" },
  { label: "Wed", value: "3" },
  { label: "Thu", value: "4" },
  { label: "Fri", value: "5" },
  { label: "Sat", value: "6" },
];

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

export default function PricingPage({ initialData, formId }: { initialData: PricingProfile; formId?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [businessHoursStart, setBusinessHoursStart] = useState(
    initialData?.businessHoursStart ?? "08:00"
  );
  const [businessHoursEnd, setBusinessHoursEnd] = useState(
    initialData?.businessHoursEnd ?? "18:00"
  );
  const [businessDays, setBusinessDays] = useState<string[]>(
    (initialData?.businessDays ?? "1,2,3,4,5").split(",").filter(Boolean)
  );
  const [largeItemsEnabled, setLargeItemsEnabled] = useState(
    initialData?.largeItemsEnabled ?? false
  );
  const [largeItemCategories, setLargeItemCategories] = useState<LargeItemCategory[]>(
    Array.isArray(initialData?.largeItemCategories) ? initialData.largeItemCategories : []
  );

  const toggleDay = (day: string) =>
    setBusinessDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );

  const addCategory = () =>
    setLargeItemCategories((prev) => [...prev, { name: "", price: 0 }]);

  const removeCategory = (index: number) =>
    setLargeItemCategories((prev) => prev.filter((_, i) => i !== index));

  const updateCategory = (index: number, field: "name" | "price", value: string) =>
    setLargeItemCategories((prev) =>
      prev.map((cat, i) =>
        i === index
          ? { ...cat, [field]: field === "price" ? parseFloat(value) || 0 : value }
          : cat
      )
    );

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
      weightFee: parseFloat(formData.get("weightFee") as string) || 0,
      itemCountFee: parseFloat(formData.get("itemCountFee") as string) || 0,
      stairsFee: parseFloat(formData.get("stairsFee") as string) || 0,
      insideDeliveryFee: parseFloat(formData.get("insideDeliveryFee") as string) || 0,
      afterHoursFee: parseFloat(formData.get("afterHoursFee") as string) || 0,
      businessHoursStart,
      businessHoursEnd,
      businessDays: businessDays.sort().join(","),
      largeItemFee: 0,
      largeItemsEnabled,
      largeItemCategories: largeItemCategories.filter((c) => c.name.trim()),
    };
    try {
      const res = await fetch("/api/dashboard/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, formId: formId ?? null }),
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

  const inputClass =
    "w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 transition-all shadow-sm";

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
              <FieldLabel label="Base Rate per Mile ($)" tooltip="The price you charge per mile of travel. Multiplied by the trip distance to calculate the base quote. Example: $2.50/mi x 10 miles = $25." />
              <input name="baseRatePerMile" type="number" step="0.01" required defaultValue={initialData?.baseRatePerMile} className={inputClass} />
            </div>
            <div>
              <FieldLabel label="Free Miles Threshold (Distance)" tooltip="Miles excluded from billing at the start of every trip. Example: set to 2 means the first 2 miles are free. Set to 0 to bill from the very first mile." />
              <input name="minMilesThreshold" type="number" step="0.1" required defaultValue={initialData?.minMilesThreshold ?? 0} className={inputClass} />
            </div>
            <div>
              <FieldLabel label="Minimum Job Charge ($)" tooltip="The lowest amount you will ever charge for any job, regardless of distance. Requires Apply Minimum Charge to be ON." />
              <input name="minimumCharge" type="number" step="0.01" required defaultValue={initialData?.minimumCharge} className={inputClass} />
            </div>
            <div className="flex items-start gap-3 pt-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="useMinimumCharge" defaultChecked={initialData?.useMinimumCharge ?? true} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-slate-700">Apply Minimum Charge</span>
              </label>
              <Tooltip text="When ON, no quote will go below your minimum. Turn OFF for pure distance-based pricing with no floor." />
            </div>
          </div>
        </div>

        {/* Per-Unit Fees */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Weight className="text-blue-600" size={20} />
            Per-Unit Fees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FieldLabel label="Weight Fee ($ per lb)" tooltip="Extra charge per pound. Multiplied by the weight the customer enters. Example: $0.10/lb x 50 lbs = $5 added to the quote." />
              <input name="weightFee" type="number" step="0.01" defaultValue={initialData?.weightFee ?? 0} className={inputClass} />
            </div>
            <div>
              <FieldLabel label="Item Count Fee ($ per item)" tooltip="Extra charge per item in the shipment. Example: $2/item x 3 items = $6 added to the quote. Set to 0 to ignore item count." />
              <input name="itemCountFee" type="number" step="0.01" defaultValue={initialData?.itemCountFee ?? 0} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Optional Flat Fees */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
            <DollarSign className="text-blue-600" size={20} />
            Optional Flat Fees
          </h2>
          <p className="text-sm text-slate-500 mb-6">Flat fees added when a customer selects the matching option in your widget. Set to 0 to not charge for that option.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FieldLabel label="Stairs Fee (Flat $)" tooltip="Added when the customer indicates the pickup or dropoff requires navigating stairs. Example: $15 flat added if stairs are selected." />
              <input name="stairsFee" type="number" step="0.01" defaultValue={initialData?.stairsFee} className={inputClass} />
            </div>
            <div>
              <FieldLabel label="Inside Delivery Fee (Flat $)" tooltip="Added when the customer requests delivery inside the building rather than curbside. Accounts for the extra time and effort." />
              <input name="insideDeliveryFee" type="number" step="0.01" defaultValue={initialData?.insideDeliveryFee} className={inputClass} />
            </div>
          </div>
        </div>

        {/* After-Hours Delivery */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Clock className="text-blue-600" size={20} />
            After-Hours Delivery
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Customers select a pickup date and time in your widget. The after-hours fee is applied automatically when their chosen time falls outside your business hours.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <FieldLabel label="After-Hours Fee (Flat $)" tooltip="Automatically added when the customer picks a time outside your business hours or on a non-operating day. Set to 0 to not charge extra for after-hours." />
              <input name="afterHoursFee" type="number" step="0.01" defaultValue={initialData?.afterHoursFee ?? 0} className={inputClass} />
            </div>
          </div>
          <div className="border-t border-slate-100 pt-6">
            <p className="text-sm font-semibold text-slate-700 mb-4 flex items-center">
              Your Business Hours
              <Tooltip text="Define your normal operating hours. Any pickup time outside this window will automatically trigger the after-hours fee." />
            </p>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Opens at</label>
                <input type="time" value={businessHoursStart} onChange={(e) => setBusinessHoursStart(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Closes at</label>
                <input type="time" value={businessHoursEnd} onChange={(e) => setBusinessHoursEnd(e.target.value)} className={inputClass} />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-2.5">
                Operating Days
                <Tooltip text="Select each day you operate normally. Any day not selected is treated as after-hours regardless of time." />
              </label>
              <div className="flex flex-wrap gap-2">
                {DAYS.map((day) => (
                  <button
                    key={day.value}
                    type="button"
                    onClick={() => toggleDay(day.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      businessDays.includes(day.value)
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Large Item Categories */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Box className="text-blue-600" size={20} />
              Large Item Categories
            </h2>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
              <input type="checkbox" className="sr-only peer" checked={largeItemsEnabled} onChange={(e) => setLargeItemsEnabled(e.target.checked)} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-slate-700">Enable</span>
              <Tooltip text="When enabled, customers can select specific item types in your widget. Each selected item adds its fee to the quote. Disable to hide this section from your widget." />
            </label>
          </div>
          <p className="text-sm text-slate-500 mb-6">
            Define item types and their flat fees (e.g. Pallet, Furniture, Appliance). Customers can select one or more and each adds its fee to the quote.
          </p>
          {largeItemsEnabled ? (
            <div className="space-y-3">
              {largeItemCategories.length === 0 && (
                <p className="text-sm text-slate-400 italic py-2">No item types added yet. Click Add Item Type to get started.</p>
              )}
              {largeItemCategories.map((cat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Item name (e.g. Pallet, Furniture)"
                      value={cat.name}
                      onChange={(e) => updateCategory(index, "name", e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                  <div className="w-32 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={cat.price === 0 ? "" : cat.price}
                      onChange={(e) => updateCategory(index, "price", e.target.value)}
                      className="w-full pl-6 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                  <button type="button" onClick={() => removeCategory(index)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" aria-label="Remove item">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addCategory} className="mt-2 flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                <Plus size={16} />
                Add Item Type
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 py-3 px-4 bg-slate-50 rounded-lg border border-slate-100">
              <Box size={16} className="text-slate-300" />
              <p className="text-sm text-slate-400">Toggle Enable above to configure large item types for your widget.</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button type="submit" disabled={loading} className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50">
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
