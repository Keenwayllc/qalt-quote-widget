"use client";

import { useState } from "react";
import {
  DollarSign,
  Weight,
  HelpCircle,
  Clock,
  Box,
  Plus,
  Trash2,
  SlidersHorizontal,
  Check,
  Save,
} from "lucide-react";
import type { PlanEntitlements } from "@/lib/plans";

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

interface WidgetSettingsSnapshot {
  id: string;
  showWeight: boolean;
  showExtras: boolean;
  showVehicles: boolean;
  pricePerVehicle: number;
  showAwb: boolean;
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

const inputClass =
  "w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 placeholder:text-slate-400 transition-all shadow-sm";

// ── Tooltip ──────────────────────────────────────────────────────────────────

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
        className="text-slate-400 hover:text-red-500 transition-colors focus:outline-none"
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

// ── Per-section save status ───────────────────────────────────────────────────

type SectionStatus = "idle" | "saving" | "success" | "error";

function UpdateButton({ status }: { status: SectionStatus }) {
  return (
    <button
      type="submit"
      disabled={status === "saving"}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all disabled:opacity-60 ${
        status === "success"
          ? "bg-emerald-600 text-white shadow"
          : status === "error"
          ? "bg-red-50 text-red-600 border border-red-300"
          : "bg-red-600 text-white hover:bg-red-700 shadow-sm"
      }`}
    >
      {status === "saving" ? (
        "Saving…"
      ) : status === "success" ? (
        <>
          <Check size={15} />
          Saved
        </>
      ) : status === "error" ? (
        "Failed — retry"
      ) : (
        <>
          <Save size={15} />
          Update
        </>
      )}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function PricingPage({
  initialData,
  formId,
  widgetSettings,
  entitlements,
}: {
  initialData: PricingProfile | null;
  formId?: string;
  widgetSettings?: WidgetSettingsSnapshot | null;
  entitlements?: PlanEntitlements;
}) {
  const vehicleEnabled = entitlements?.isVehicleQuotingEnabled ?? false;

  // ── Core Rates state ─────────────────────────────────────────────────────
  const [baseRate, setBaseRate] = useState(
    String(initialData?.baseRatePerMile ?? 2.5)
  );
  const [minCharge, setMinCharge] = useState(
    String(initialData?.minimumCharge ?? 35)
  );
  const [useMinCharge, setUseMinCharge] = useState(
    initialData?.useMinimumCharge ?? true
  );
  const [minMiles, setMinMiles] = useState(
    String(initialData?.minMilesThreshold ?? 0)
  );
  const [coreStatus, setCoreStatus] = useState<SectionStatus>("idle");

  // ── Per-Unit Fees state ──────────────────────────────────────────────────
  const [weightFee, setWeightFee] = useState(
    String(initialData?.weightFee ?? 0)
  );
  const [itemCountFee, setItemCountFee] = useState(
    String(initialData?.itemCountFee ?? 0)
  );
  const [perUnitStatus, setPerUnitStatus] = useState<SectionStatus>("idle");

  // ── Optional Flat Fees state ─────────────────────────────────────────────
  const [stairsFee, setStairsFee] = useState(
    String(initialData?.stairsFee ?? 0)
  );
  const [insideDeliveryFee, setInsideDeliveryFee] = useState(
    String(initialData?.insideDeliveryFee ?? 0)
  );
  const [flatFeesStatus, setFlatFeesStatus] = useState<SectionStatus>("idle");

  // ── After-Hours state ────────────────────────────────────────────────────
  const [afterHoursFee, setAfterHoursFee] = useState(
    String(initialData?.afterHoursFee ?? 0)
  );
  const [businessHoursStart, setBusinessHoursStart] = useState(
    initialData?.businessHoursStart ?? "08:00"
  );
  const [businessHoursEnd, setBusinessHoursEnd] = useState(
    initialData?.businessHoursEnd ?? "18:00"
  );
  const [businessDays, setBusinessDays] = useState<string[]>(
    (initialData?.businessDays ?? "1,2,3,4,5").split(",").filter(Boolean)
  );
  const [afterHoursStatus, setAfterHoursStatus] =
    useState<SectionStatus>("idle");

  // ── Large Items state ────────────────────────────────────────────────────
  const [largeItemsEnabled, setLargeItemsEnabled] = useState(
    initialData?.largeItemsEnabled ?? false
  );
  const [largeItemCategories, setLargeItemCategories] = useState<
    LargeItemCategory[]
  >(
    Array.isArray(initialData?.largeItemCategories)
      ? (initialData!.largeItemCategories as LargeItemCategory[])
      : []
  );
  const [largeItemsStatus, setLargeItemsStatus] =
    useState<SectionStatus>("idle");

  // ── Form Fields state (widget settings) ─────────────────────────────────
  const [showWeight, setShowWeight] = useState(
    widgetSettings?.showWeight ?? false
  );
  const [showExtras, setShowExtras] = useState(
    widgetSettings?.showExtras ?? true
  );
  const [showVehicles, setShowVehicles] = useState(
    widgetSettings?.showVehicles ?? false
  );
  const [pricePerVehicle, setPricePerVehicle] = useState(
    widgetSettings?.pricePerVehicle ? String(widgetSettings.pricePerVehicle) : ""
  );
  const [showAwb, setShowAwb] = useState(widgetSettings?.showAwb ?? false);
  const [formFieldsStatus, setFormFieldsStatus] =
    useState<SectionStatus>("idle");

  // ── Shared helpers ───────────────────────────────────────────────────────

  const patchPricing = async (
    fields: Record<string, unknown>,
    setStatus: (s: SectionStatus) => void
  ) => {
    setStatus("saving");
    try {
      const res = await fetch("/api/dashboard/pricing", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, formId: formId ?? null }),
      });
      if (res.ok) {
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const patchWidget = async (
    fields: Record<string, unknown>,
    setStatus: (s: SectionStatus) => void
  ) => {
    if (!widgetSettings?.id) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }
    setStatus("saving");
    try {
      const res = await fetch("/api/dashboard/widget", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId: widgetSettings.id, ...fields }),
      });
      if (res.ok) {
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const toggleDay = (day: string) =>
    setBusinessDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );

  const addCategory = () =>
    setLargeItemCategories((prev) => [...prev, { name: "", price: 0 }]);

  const removeCategory = (index: number) =>
    setLargeItemCategories((prev) => prev.filter((_, i) => i !== index));

  const updateCategory = (
    index: number,
    field: "name" | "price",
    value: string
  ) =>
    setLargeItemCategories((prev) =>
      prev.map((cat, i) =>
        i === index
          ? {
              ...cat,
              [field]: field === "price" ? parseFloat(value) || 0 : value,
            }
          : cat
      )
    );

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Pricing Configuration
        </h1>
        <p className="text-slate-500">
          Define your delivery rates and extra charges. Use the{" "}
          <strong>Update</strong> button on each section to save changes.
        </p>
      </div>

      <div className="space-y-8">
        {/* ── Core Rates ─────────────────────────────────────────────────── */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            patchPricing(
              {
                baseRatePerMile: parseFloat(baseRate) || 0,
                minimumCharge: parseFloat(minCharge) || 0,
                useMinimumCharge: useMinCharge,
                minMilesThreshold: parseFloat(minMiles) || 0,
              },
              setCoreStatus
            );
          }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
        >
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <DollarSign className="text-red-600" size={20} />
            Core Rates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <FieldLabel
                label="Base Rate per Mile ($)"
                tooltip="The price you charge per mile of travel. Multiplied by the trip distance to calculate the base quote. Example: $2.50/mi × 10 miles = $25."
              />
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={baseRate}
                onChange={(e) => setBaseRate(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <FieldLabel
                label="Free Miles Threshold (Distance)"
                tooltip="Miles excluded from billing at the start of every trip. Example: set to 2 means the first 2 miles are free. Set to 0 to bill from the very first mile."
              />
              <input
                type="number"
                step="0.1"
                min="0"
                required
                value={minMiles}
                onChange={(e) => setMinMiles(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <FieldLabel
                label="Minimum Job Charge ($)"
                tooltip="The lowest amount you will ever charge for any job, regardless of distance. Requires Apply Minimum Charge to be ON."
              />
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={minCharge}
                onChange={(e) => setMinCharge(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex items-start gap-3 pt-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={useMinCharge}
                  onChange={(e) => setUseMinCharge(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600" />
                <span className="ml-3 text-sm font-medium text-slate-700">
                  Apply Minimum Charge
                </span>
              </label>
              <Tooltip text="When ON, no quote will go below your minimum. Turn OFF for pure distance-based pricing with no floor." />
            </div>
          </div>
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <UpdateButton status={coreStatus} />
          </div>
        </form>

        {/* ── Per-Unit Fees ───────────────────────────────────────────────── */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            patchPricing(
              {
                weightFee: parseFloat(weightFee) || 0,
                itemCountFee: parseFloat(itemCountFee) || 0,
              },
              setPerUnitStatus
            );
          }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
        >
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Weight className="text-red-600" size={20} />
            Per-Unit Fees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <FieldLabel
                label="Weight Fee ($ per lb)"
                tooltip="Extra charge per pound. Multiplied by the weight the customer enters. Example: $0.10/lb × 50 lbs = $5 added to the quote."
              />
              <input
                type="number"
                step="0.01"
                min="0"
                value={weightFee}
                onChange={(e) => setWeightFee(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <FieldLabel
                label="Item Count Fee ($ per item)"
                tooltip="Extra charge per item in the shipment. Example: $2/item × 3 items = $6 added to the quote. Set to 0 to ignore item count."
              />
              <input
                type="number"
                step="0.01"
                min="0"
                value={itemCountFee}
                onChange={(e) => setItemCountFee(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <UpdateButton status={perUnitStatus} />
          </div>
        </form>

        {/* ── Optional Flat Fees ──────────────────────────────────────────── */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            patchPricing(
              {
                stairsFee: parseFloat(stairsFee) || 0,
                insideDeliveryFee: parseFloat(insideDeliveryFee) || 0,
              },
              setFlatFeesStatus
            );
          }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
        >
          <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
            <DollarSign className="text-red-600" size={20} />
            Optional Flat Fees
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Flat fees added when a customer selects the matching option in your
            widget. Set to 0 to not charge for that option.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <FieldLabel
                label="Stairs Fee (Flat $)"
                tooltip="Added when the customer indicates the pickup or dropoff requires navigating stairs. Example: $15 flat added if stairs are selected."
              />
              <input
                type="number"
                step="0.01"
                min="0"
                value={stairsFee}
                onChange={(e) => setStairsFee(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <FieldLabel
                label="Inside Delivery Fee (Flat $)"
                tooltip="Added when the customer requests delivery inside the building rather than curbside. Accounts for the extra time and effort."
              />
              <input
                type="number"
                step="0.01"
                min="0"
                value={insideDeliveryFee}
                onChange={(e) => setInsideDeliveryFee(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <UpdateButton status={flatFeesStatus} />
          </div>
        </form>

        {/* ── After-Hours Delivery ────────────────────────────────────────── */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            patchPricing(
              {
                afterHoursFee: parseFloat(afterHoursFee) || 0,
                businessHoursStart,
                businessHoursEnd,
                businessDays: [...businessDays].sort().join(","),
              },
              setAfterHoursStatus
            );
          }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
        >
          <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
            <Clock className="text-red-600" size={20} />
            After-Hours Delivery
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Customers select a pickup date and time in your widget. The
            after-hours fee is applied automatically when their chosen time falls
            outside your business hours.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <FieldLabel
                label="After-Hours Fee (Flat $)"
                tooltip="Automatically added when the customer picks a time outside your business hours or on a non-operating day. Set to 0 to not charge extra for after-hours."
              />
              <input
                type="number"
                step="0.01"
                min="0"
                value={afterHoursFee}
                onChange={(e) => setAfterHoursFee(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div className="border-t border-slate-100 pt-6 mb-6">
            <p className="text-sm font-semibold text-slate-700 mb-4 flex items-center">
              Your Business Hours
              <Tooltip text="Define your normal operating hours. Any pickup time outside this window will automatically trigger the after-hours fee." />
            </p>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">
                  Opens at
                </label>
                <input
                  type="time"
                  value={businessHoursStart}
                  onChange={(e) => setBusinessHoursStart(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">
                  Closes at
                </label>
                <input
                  type="time"
                  value={businessHoursEnd}
                  onChange={(e) => setBusinessHoursEnd(e.target.value)}
                  className={inputClass}
                />
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
                        ? "bg-red-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <UpdateButton status={afterHoursStatus} />
          </div>
        </form>

        {/* ── Large Item Categories ───────────────────────────────────────── */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            patchPricing(
              {
                largeItemsEnabled,
                largeItemCategories: largeItemCategories.filter((c) =>
                  c.name.trim()
                ),
              },
              setLargeItemsStatus
            );
          }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
        >
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Box className="text-red-600" size={20} />
              Large Item Categories
            </h2>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={largeItemsEnabled}
                onChange={(e) => setLargeItemsEnabled(e.target.checked)}
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600" />
              <span className="ml-3 text-sm font-medium text-slate-700">
                Enable
              </span>
              <Tooltip text="When enabled, customers can select specific item types in your widget. Each selected item adds its fee to the quote. Disable to hide this section from your widget." />
            </label>
          </div>
          <p className="text-sm text-slate-500 mb-6">
            Define item types and their flat fees (e.g. Pallet, Furniture,
            Appliance). Customers can select one or more and each adds its fee
            to the quote.
          </p>
          {largeItemsEnabled ? (
            <div className="space-y-3 mb-6">
              {largeItemCategories.length === 0 && (
                <p className="text-sm text-slate-400 italic py-2">
                  No item types added yet. Click Add Item Type to get started.
                </p>
              )}
              {largeItemCategories.map((cat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Item name (e.g. Pallet, Furniture)"
                      value={cat.name}
                      onChange={(e) =>
                        updateCategory(index, "name", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                  <div className="w-32 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={cat.price === 0 ? "" : cat.price}
                      onChange={(e) =>
                        updateCategory(index, "price", e.target.value)
                      }
                      className="w-full pl-6 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCategory(index)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addCategory}
                className="mt-2 flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
              >
                <Plus size={16} />
                Add Item Type
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 py-3 px-4 bg-slate-50 rounded-lg border border-slate-100 mb-6">
              <Box size={16} className="text-slate-300" />
              <p className="text-sm text-slate-400">
                Toggle Enable above to configure large item types for your
                widget.
              </p>
            </div>
          )}
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <UpdateButton status={largeItemsStatus} />
          </div>
        </form>

        {/* ── Form Fields ─────────────────────────────────────────────────── */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            patchWidget(
              {
                showWeight,
                showExtras,
                showVehicles: vehicleEnabled ? showVehicles : false,
                pricePerVehicle: vehicleEnabled
                  ? parseFloat(pricePerVehicle) || 0
                  : 0,
                showAwb: vehicleEnabled ? showAwb : false,
              },
              setFormFieldsStatus
            );
          }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-6"
        >
          <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
            <SlidersHorizontal className="text-red-600" size={20} />
            Form Fields
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Choose which extra fields appear in your quote form. Each field adds
            more data to the quote and affects pricing where applicable.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-4 mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showWeight}
                onChange={(e) => setShowWeight(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm font-medium text-slate-700">
                Show Package Weight field
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showExtras}
                onChange={(e) => setShowExtras(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm font-medium text-slate-700">
                Display Extras (Stairs, Inside Delivery)
              </span>
            </label>
            <label
              className={`flex items-center gap-3 ${
                vehicleEnabled
                  ? "cursor-pointer"
                  : "cursor-not-allowed opacity-50"
              }`}
            >
              <input
                type="checkbox"
                checked={showVehicles}
                onChange={(e) => setShowVehicles(e.target.checked)}
                disabled={!vehicleEnabled}
                className="w-5 h-5 rounded border-slate-300 text-red-600 focus:ring-red-500 disabled:opacity-50"
              />
              <span className="text-sm font-medium text-slate-700">
                Number of Vehicles
                {!vehicleEnabled && (
                  <span className="ml-2 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-red-100 text-red-700 rounded-full">
                    Enterprise
                  </span>
                )}
              </span>
            </label>
            <label
              className={`flex items-center gap-3 ${
                vehicleEnabled
                  ? "cursor-pointer"
                  : "cursor-not-allowed opacity-50"
              }`}
            >
              <input
                type="checkbox"
                checked={showAwb}
                onChange={(e) => setShowAwb(e.target.checked)}
                disabled={!vehicleEnabled}
                className="w-5 h-5 rounded border-slate-300 text-red-600 focus:ring-red-500 disabled:opacity-50"
              />
              <span className="text-sm font-medium text-slate-700">
                AWB Number (Airport Pickup)
                {!vehicleEnabled && (
                  <span className="ml-2 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-red-100 text-red-700 rounded-full">
                    Enterprise
                  </span>
                )}
              </span>
            </label>
          </div>
          {showVehicles && vehicleEnabled && (
            <div className="mb-6 pt-5 border-t border-slate-100">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Price Per Vehicle ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={pricePerVehicle}
                onChange={(e) => setPricePerVehicle(e.target.value)}
                placeholder="e.g. 50.00"
                className="w-40 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
              />
              <p className="text-xs text-slate-500 mt-1">
                Flat fee added per vehicle the customer selects in the widget.
              </p>
            </div>
          )}
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <UpdateButton status={formFieldsStatus} />
          </div>
        </form>
      </div>
    </div>
  );
}
