"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getEntitlements } from "@/lib/plans";
import QaltIcon from "@/components/shared/QaltIcon";
import { MapPin, CheckCircle, ArrowRight, User, Mail, Phone, Truck, Sparkles, Weight, Hash, Footprints, Home, Clock, Box, Navigation } from "lucide-react";
import { useJsApiLoader } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";
import RouteMapDisplay from "./RouteMapDisplay";

interface WidgetProps {
  company: {
    id: string;
    name: string;
    logoUrl?: string | null;
    subscriptionPlan: string;
    pricingProfile: Record<string, unknown>;
    widgetSettings: {
      primaryColor: string;
      headerText: string;
      buttonText: string;
      showWeight: boolean;
      showItemCount: boolean;
      showExtras: boolean;
      disclaimerText: string;
      backgroundImageUrl?: string | null;
      companyNameText?: string | null;
      companyNameFont?: string;
      mapLayout?: string;
    };
  };
}

interface FormData {
  pickupAddress: string;
  dropoffAddress: string;
  pickupZip: string;
  dropoffZip: string;
  hasStairs: boolean;
  needsInsideDelivery: boolean;
  pickupDate: string;
  pickupTime: string;
  selectedLargeItems: string[];
  packageWeight: string;
  itemCount: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

const LIBRARIES: ("places" | "geometry" | "drawing" | "visualization")[] = ["places"];

// Sub-component for Google Autocomplete to avoid race conditions
const AutocompleteInput = ({
  label,
  placeholder,
  value,
  onAddressSelect,
  onClear,
  isLoaded,
  icon: Icon
}: {
  label: string,
  placeholder: string,
  value: string,
  onAddressSelect: (address: string, zip: string) => void,
  onClear: () => void,
  isLoaded: boolean,
  icon: React.ComponentType<{ size?: number; className?: string }>
}) => {
  const {
    ready,
    value: inputValue,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { types: ["address"] },
    debounce: 300,
    initOnMount: isLoaded,
    defaultValue: value,
  });

  return (
    <div className="relative">
      <label className="text-[11px] uppercase font-extrabold text-slate-400 tracking-[0.15em] flex items-center gap-1.5 mb-2 ml-1">
        <Icon size={11} className="text-slate-400" /> {label}
      </label>
      <div className="relative group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder={placeholder}
          className="w-full px-4 py-3.5 pr-10 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:border-transparent outline-none transition-all duration-200"
        />
        {inputValue && (
          <button
            type="button"
            onClick={() => {
              setValue("", false);
              clearSuggestions();
              onClear();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-slate-200 hover:bg-slate-300 text-slate-500 rounded-full transition-colors"
          >
            <span className="text-xs font-bold">✕</span>
          </button>
        )}
      </div>
      {status === "OK" && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
          {data.map((suggestion) => (
            <div
              key={suggestion.place_id}
              onClick={async () => {
                setValue(suggestion.description, false);
                clearSuggestions();
                const results = await getGeocode({ address: suggestion.description });
                const zipCode = results[0].address_components.find(c => c.types.includes("postal_code"))?.long_name || "";
                onAddressSelect(suggestion.description, zipCode);
              }}
              className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0"
            >
              {suggestion.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function QuoteWidgetForm({ company }: WidgetProps) {
  const entitlements = getEntitlements(company.subscriptionPlan);

  const widgetSettings = {
    ...(company.widgetSettings || {
      primaryColor: "#3B82F6",
      headerText: "Delivery Quote Calculator",
      buttonText: "Get Instant Quote",
      showWeight: false,
      showItemCount: true,
      showExtras: true,
      disclaimerText: "Estimate only. Final price confirmed after booking.",
      mapLayout: "inline",
    }),
    // Strictly override if plan doesn't allow it
    ...(!entitlements.isAdvancedCustomizationEnabled ? {
      backgroundImageUrl: null,
    } : {}),
  };

  const pricingProfile = company.pricingProfile as {
    afterHoursFee?: number;
    largeItemsEnabled?: boolean;
    largeItemCategories?: Array<{ name: string; price: number }>;
  };
  const largeItemsEnabled = pricingProfile?.largeItemsEnabled ?? false;
  const largeItemCategories: Array<{ name: string; price: number }> = Array.isArray(
    pricingProfile?.largeItemCategories
  )
    ? (pricingProfile.largeItemCategories as Array<{ name: string; price: number }>)
    : [];

  useEffect(() => {
    const font = widgetSettings.companyNameFont || "Inter";
    if (font === "Inter") return; // Inter is already loaded by default usually
    const id = `gfont-${font.replace(/\s+/g, "-")}`;
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}:wght@400;700;800&display=swap`;
      document.head.appendChild(link);
    }
  }, [widgetSettings.companyNameFont]);

  const showWhiteLabel = entitlements.isWhiteLabelEnabled;
  const logoUrlToUse = entitlements.isAdvancedCustomizationEnabled ? company.logoUrl : null;

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    duration: string;
    originCity: string;
    destinationCity: string;
  } | null>(null);
  const [error, setError] = useState("");

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: LIBRARIES
  });

  const [formData, setFormData] = useState<FormData>({
    pickupAddress: "",
    dropoffAddress: "",
    pickupZip: "",
    dropoffZip: "",
    hasStairs: false,
    needsInsideDelivery: false,
    pickupDate: "",
    pickupTime: "",
    selectedLargeItems: [] as string[],
    packageWeight: "",
    itemCount: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
  });

  /* Address Clear functionality */
  const clearPickup = () => {
    setFormData(prev => ({ ...prev, pickupAddress: "", pickupZip: "" }));
  };

  const clearDropoff = () => {
    setFormData(prev => ({ ...prev, dropoffAddress: "", dropoffZip: "" }));
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const toggleLargeItem = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedLargeItems: prev.selectedLargeItems.includes(name)
        ? prev.selectedLargeItems.filter((i) => i !== name)
        : [...prev.selectedLargeItems, name],
    }));
  };

  // Calculate driving distance client-side using the already-loaded Google Maps JS API
  const calculateClientDistance = (origin: string, destination: string): Promise<number | null> => {
    return new Promise((resolve) => {
      if (!isLoaded || !window.google?.maps) {
        resolve(null);
        return;
      }
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
        },
        (response, status) => {
          if (
            status === "OK" &&
            response?.rows[0]?.elements[0]?.status === "OK"
          ) {
            const meters = response.rows[0].elements[0].distance.value;
            resolve(meters * 0.000621371); // meters → miles
          } else {
            resolve(null);
          }
        }
      );
    });
  };

  // Pricing Calculator Logic
  const getEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const origin = formData.pickupAddress || formData.pickupZip;
      const destination = formData.dropoffAddress || formData.dropoffZip;

      // Calculate distance client-side first
      const clientDistance = await calculateClientDistance(origin, destination);

      const res = await fetch(`/api/widget/${company.id}/estimate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: formData.pickupAddress,
          destination: formData.dropoffAddress,
          pickupZip: formData.pickupZip,
          dropoffZip: formData.dropoffZip,
          clientDistance: clientDistance,
          extras: {
            hasStairs: formData.hasStairs,
            needsInsideDelivery: formData.needsInsideDelivery,
            pickupDateTime: formData.pickupDate && formData.pickupTime
              ? `${formData.pickupDate}T${formData.pickupTime}`
              : undefined,
            selectedLargeItems: formData.selectedLargeItems,
            packageWeight: parseFloat(formData.packageWeight) || 0,
            itemCount: parseInt(formData.itemCount) || 0,
          },
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setEstimate(data.estimate);
        setDistance(data.distance);
        setStep(2);
      } else {
        setError(data.error || "Could not calculate estimate. Please check your addresses.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const submitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/widget/${company.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          estimatedPrice: estimate,
          distanceMiles: distance,
          pickupDateTime: formData.pickupDate && formData.pickupTime
            ? `${formData.pickupDate}T${formData.pickupTime}`
            : undefined,
          selectedLargeItems: formData.selectedLargeItems,
        }),
      });

      if (res.ok) {
        setStep(3);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to submit request.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const primaryColor = (widgetSettings.primaryColor && widgetSettings.primaryColor.length >= 4) ? widgetSettings.primaryColor : "#3B82F6";

  return (
    <div className={`w-full transition-all duration-700 ease-in-out font-sans flex items-start justify-center mx-auto relative ${step === 2 && widgetSettings.mapLayout === 'side' ? 'max-w-5xl' : 'max-w-md'}`} style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
      <div className="w-full transition-all duration-700 ease-in-out relative z-10 rounded-[32px] overflow-hidden shadow-[0_30px_100px_-15px_rgba(0,0,0,0.2)] bg-white flex flex-col md:flex-row">
        
        {/* Left Side: Form & Content */}
        <div className={`w-full transition-all duration-700 ${step === 2 && widgetSettings.mapLayout === 'side' ? 'md:w-[440px]' : 'md:w-full'} flex flex-col shrink-0`}>
          {/* Header */}
          <div
            className="relative px-8 pt-8 pb-10 overflow-hidden bg-cover bg-center"
            style={
              widgetSettings.backgroundImageUrl
                ? { backgroundImage: `url(${widgetSettings.backgroundImageUrl})` }
                : { backgroundColor: primaryColor }
            }
          >
            {!widgetSettings.backgroundImageUrl && (
              <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent mix-blend-overlay"></div>
            )}
            {widgetSettings.backgroundImageUrl && (
              <div className="absolute inset-0 bg-slate-900/40" />
            )}
            {!widgetSettings.backgroundImageUrl && (
              <>
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10" style={{ background: 'white' }}></div>
                <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-10" style={{ background: 'white' }}></div>
              </>
            )}

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                {logoUrlToUse ? (
                  <div className="relative h-10 w-24">
                    <Image src={logoUrlToUse} alt={company.name} fill className="object-contain object-left rounded-lg bg-white/10 p-1 backdrop-blur-sm" unoptimized />
                  </div>
                ) : (
                  <div className="p-2.5 bg-white/15 rounded-2xl backdrop-blur-md ring-1 ring-white/20">
                    <Truck size={22} className="text-white" />
                  </div>
                )}
                <h2 className="text-xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">{widgetSettings.headerText}</h2>
              </div>
              {!logoUrlToUse && (
                <p
                  className="text-white/90 text-sm font-medium pl-1"
                  style={{ fontFamily: widgetSettings.companyNameFont || "Inter" }}
                >
                  {widgetSettings.companyNameText || company.name}
                </p>
              )}
            </div>

            {/* Step indicator */}
            <div className="relative z-10 flex items-center gap-2 mt-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                    step >= s ? 'bg-white text-slate-800 shadow-lg' : 'bg-white/15 text-white/50 ring-1 ring-white/20'
                  }`}>
                    {step > s ? <CheckCircle size={14} /> : s}
                  </div>
                  {s < 3 && (
                    <div className={`w-12 h-0.5 rounded-full transition-all duration-500 ${step > s ? 'bg-white/60' : 'bg-white/15'}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="bg-white px-8 py-8 flex-1">

            {/* Step 1 */}
            {step === 1 && (
              <form onSubmit={getEstimate} className="space-y-5">
                <div className="space-y-4">
                  <AutocompleteInput
                    label="Pickup Address"
                    placeholder="Enter pickup address"
                    value={formData.pickupAddress}
                    isLoaded={isLoaded}
                    icon={MapPin}
                    onAddressSelect={(address, zip) => setFormData(prev => ({ ...prev, pickupAddress: address, pickupZip: zip }))}
                    onClear={clearPickup}
                  />

                  <AutocompleteInput
                    label="Dropoff Address"
                    placeholder="Enter dropoff address"
                    value={formData.dropoffAddress}
                    isLoaded={isLoaded}
                    icon={MapPin}
                    onAddressSelect={(address, zip) => setFormData(prev => ({ ...prev, dropoffAddress: address, dropoffZip: zip }))}
                    onClear={clearDropoff}
                  />
                </div>

                {/* Route connector */}
                <div className="flex items-center justify-center -my-1">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                    <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                    <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                    <Truck size={16} className="text-slate-300 mx-1" />
                    <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                    <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                  </div>
                </div>

                {/* Pickup Date & Time */}
                <div>
                  <p className="text-[11px] uppercase font-extrabold text-slate-400 tracking-[0.15em] flex items-center gap-1.5 mb-2 ml-1">
                    <Clock size={11} className="text-slate-400" /> Pickup Date &amp; Time
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-semibold text-slate-800 focus:ring-2 focus:border-transparent outline-none transition-all duration-200"
                    />
                    <input
                      type="time"
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-semibold text-slate-800 focus:ring-2 focus:border-transparent outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Weight & Item Count */}
                <div className="grid grid-cols-2 gap-4">
                  {widgetSettings.showWeight && (
                    <div>
                      <label className="text-[11px] uppercase font-extrabold text-slate-400 tracking-[0.15em] flex items-center gap-1.5 mb-2 ml-1">
                        <Weight size={11} /> Weight (lbs)
                      </label>
                      <input
                        type="number"
                        name="packageWeight"
                        placeholder="0"
                        value={formData.packageWeight}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  )}
                  {widgetSettings.showItemCount && (
                    <div>
                      <label className="text-[11px] uppercase font-extrabold text-slate-400 tracking-[0.15em] flex items-center gap-1.5 mb-2 ml-1">
                        <Hash size={11} /> Items
                      </label>
                      <input
                        type="number"
                        name="itemCount"
                        placeholder="1"
                        min="1"
                        value={formData.itemCount}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  )}
                </div>

                {widgetSettings.showExtras && (
                  <div className="space-y-3">
                    <p className="text-[11px] uppercase font-extrabold text-slate-400 tracking-[0.15em] ml-1">Add-ons</p>
                    <div className="grid grid-cols-2 gap-2.5">
                      {(['hasStairs', 'needsInsideDelivery'] as const).map((id) => {
                        const config: Record<string, { label: string; icon: React.ReactNode }> = {
                          hasStairs: { label: 'Stairs', icon: <Footprints size={15} /> },
                          needsInsideDelivery: { label: 'Inside', icon: <Home size={15} /> },
                        };
                        return (
                          <label
                            key={id}
                            className={`
                              relative flex items-center gap-2.5 px-4 py-3 border rounded-xl cursor-pointer transition-all duration-200 select-none overflow-hidden
                              ${formData[id]
                                ? 'border-transparent shadow-md scale-[1.02]'
                                : 'bg-slate-50 border-slate-300 hover:border-slate-400 hover:bg-white'}
                            `}
                            style={formData[id] ? { borderColor: primaryColor } : {}}
                          >
                            {formData[id] && (
                              <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundColor: primaryColor }}></div>
                            )}
                            <input
                              type="checkbox"
                              name={id}
                              checked={formData[id]}
                              onChange={handleInputChange}
                              className="hidden"
                            />
                            <span className={`${formData[id] ? 'text-slate-700' : 'text-slate-400'} transition-colors`}>{config[id].icon}</span>
                            <span className={`text-[12px] font-bold ${formData[id] ? 'text-slate-800' : 'text-slate-500'}`}>
                              {config[id].label}
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    {largeItemsEnabled && largeItemCategories.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-[11px] uppercase font-extrabold text-slate-400 tracking-[0.15em] ml-1 flex items-center gap-1.5">
                          <Box size={11} /> Special Items
                        </p>
                        <div className="grid grid-cols-2 gap-2.5">
                          {largeItemCategories.map((cat) => {
                            const selected = formData.selectedLargeItems.includes(cat.name);
                            return (
                              <button
                                key={cat.name}
                                type="button"
                                onClick={() => toggleLargeItem(cat.name)}
                                className={`relative flex items-center justify-between gap-2 px-4 py-3 border rounded-xl cursor-pointer transition-all duration-200 select-none overflow-hidden text-left ${
                                  selected
                                    ? "border-transparent shadow-md scale-[1.02]"
                                    : "bg-slate-50 border-slate-300 hover:border-slate-400 hover:bg-white"
                                }`}
                                style={selected ? { borderColor: primaryColor } : {}}
                              >
                                {selected && (
                                  <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundColor: primaryColor }} />
                                )}
                                <span className={`text-[12px] font-bold relative ${selected ? "text-slate-800" : "text-slate-500"}`}>
                                  {cat.name}
                                </span>
                                <span className={`text-[11px] font-bold relative shrink-0 ${selected ? "text-slate-600" : "text-slate-400"}`}>
                                  +${cat.price.toFixed(2)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {error && (
                  <div className="text-xs text-red-600 font-semibold bg-red-50 p-4 rounded-2xl border border-red-100 flex items-start gap-2">
                    <span className="shrink-0 mt-0.5">⚠️</span> {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl text-white font-bold text-sm shadow-lg active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-50 relative overflow-hidden group"
                  style={{ backgroundColor: primaryColor }}
                >
                  <div className="absolute inset-0 opacity-20" style={{ boxShadow: `inset 0 -4px 12px rgba(0,0,0,0.2)` }}></div>
                  <span className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent"></span>
                  <span className="relative flex items-center gap-2.5">
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Calculating...
                      </>
                    ) : (
                      <>
                        {widgetSettings.buttonText}
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <form onSubmit={submitQuote} className="space-y-6">
                <div className="relative bg-linear-to-br from-emerald-50 to-teal-50/50 border border-emerald-100/80 rounded-[20px] p-6 text-center overflow-hidden">
                  <div className="absolute top-2 right-3">
                    <Sparkles size={16} className="text-emerald-400/50" />
                  </div>
                  <p className="text-[10px] uppercase font-extrabold text-emerald-600/80 tracking-[0.2em] mb-2">Your Estimated Rate</p>
                  <div className="flex flex-col items-center">
                    <p className="text-5xl font-black text-emerald-700 tracking-tight">${estimate?.toFixed(2)}</p>
                    <p className="text-[12px] text-emerald-600/60 mt-2 font-semibold flex items-center gap-1.5">
                      <Navigation size={12} /> {distance?.toFixed(1)} miles calculated route
                    </p>
                  </div>

                  {/* Inline map — only for "inline" layout. "side" layout uses the side panel instead (one instance only to avoid double API calls) */}
                  {widgetSettings.mapLayout !== 'side' && isLoaded && formData.pickupAddress && formData.dropoffAddress && (
                    <div className="mt-6 h-32 w-full rounded-2xl overflow-hidden border border-emerald-100 shadow-inner group">
                      <RouteMapDisplay
                        pickupAddress={formData.pickupAddress}
                        dropoffAddress={formData.dropoffAddress}
                        isLoaded={isLoaded}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] uppercase font-extrabold text-slate-400 tracking-[0.15em] flex items-center gap-1.5 mb-2 ml-1">
                      <User size={11} /> Full Name
                    </label>
                    <input type="text" name="customerName" required placeholder="John Doe" value={formData.customerName} onChange={handleInputChange}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase font-extrabold text-slate-400 tracking-[0.15em] flex items-center gap-1.5 mb-2 ml-1">
                      <Mail size={11} /> Email
                    </label>
                    <input type="email" name="customerEmail" required placeholder="john@example.com" value={formData.customerEmail} onChange={handleInputChange}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase font-extrabold text-slate-400 tracking-[0.15em] flex items-center gap-1.5 mb-2 ml-1">
                      <Phone size={11} /> Phone
                    </label>
                    <input type="tel" name="customerPhone" required placeholder="(555) 000-0000" value={formData.customerPhone} onChange={handleInputChange}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all" />
                  </div>
                </div>

                {error && (
                  <div className="text-xs text-red-600 font-semibold bg-red-50 p-4 rounded-2xl border border-red-100 flex items-start gap-2">
                    <span className="shrink-0 mt-0.5">⚠️</span> {error}
                  </div>
                )}

                <div className="space-y-3 pt-1">
                  <button type="submit" disabled={loading}
                    className="w-full py-4 rounded-2xl text-white font-bold text-sm shadow-lg active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-50 relative overflow-hidden group bg-emerald-600"
                    style={{ boxShadow: '0 8px 24px -4px rgba(16,185,129,0.35)' }}>
                    <span className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent"></span>
                    <span className="relative flex items-center gap-2">
                      {loading ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>Submitting...</>
                      ) : (
                        <>Book Shipment<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                      )}
                    </span>
                  </button>
                  <button type="button" onClick={() => setStep(1)}
                    className="w-full py-3 text-slate-400 font-bold text-[11px] uppercase tracking-[0.15em] hover:text-slate-600 transition-all">
                    ← Edit Details
                  </button>
                </div>
              </form>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="py-8 text-center space-y-5">
                <div className="w-20 h-20 bg-linear-to-br from-emerald-100 to-teal-100 text-emerald-600 rounded-[20px] flex items-center justify-center mx-auto shadow-lg shadow-emerald-100">
                  <CheckCircle size={36} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">You&apos;re All Set!</h3>
                  <p className="text-sm text-slate-500 mt-3 leading-relaxed px-2 font-medium">
                    Thanks, <strong className="text-slate-700">{formData.customerName}</strong>. {widgetSettings.companyNameText || company.name} will reach out shortly about your <strong className="text-emerald-600">${estimate?.toFixed(2)}</strong> delivery quote.
                  </p>
                </div>
                <button
                  onClick={() => { setStep(1); setFormData(prev => ({ ...prev, pickupZip: "", dropoffZip: "", customerName: "", customerEmail: "", customerPhone: "", packageWeight: "", itemCount: "" })); }}
                  className="mt-4 font-bold text-sm flex items-center gap-2 mx-auto px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105"
                  style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}>
                  Start New Quote <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-5 bg-slate-50/80 border-t border-slate-100/80">
            <p className="text-[10px] text-slate-400 text-center leading-relaxed font-medium">{widgetSettings.disclaimerText}</p>
            {!showWhiteLabel && (
              <a href="https://qalt.site" target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-2.5 opacity-40 hover:opacity-70 transition-opacity">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em]">Powered by</span>
                <div className="flex items-center gap-1.5 scale-75 opacity-70 transform origin-right">
                  <QaltIcon size={20} />
                  <Image src="/images/qalt.png" alt="Qalt Logo" width={80} height={24} className="h-6 w-auto object-contain" />
                </div>
              </a>
            )}
          </div>
        </div>

        {/* Integrated Side Map & Info Area */}
        {step === 2 && widgetSettings.mapLayout === 'side' && (
          <div className="hidden md:flex flex-col flex-1 min-h-[500px] animate-in slide-in-from-left-4 fade-in duration-700 bg-slate-50 relative border-l border-slate-100">
            {/* Top: Map Area — absolute inset-0 wrapper ensures height:100% resolves for GoogleMap */}
            <div className="relative flex-1 min-h-[320px]">
              <div className="absolute inset-0">
                <RouteMapDisplay
                  pickupAddress={formData.pickupAddress}
                  dropoffAddress={formData.dropoffAddress}
                  isLoaded={isLoaded}
                  onRouteInfo={(info) => setRouteInfo(info)}
                />
              </div>

              {/* Overlay badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/20 text-[10px] uppercase font-black text-slate-800 tracking-[0.15em] flex items-center gap-2 z-10">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                Route Overview
              </div>
            </div>

            {/* Bottom: Info Section */}
            <div className="bg-white p-5 border-t border-slate-100 relative z-10space-y-4">
              {/* Route stats row */}
              <div className="grid grid-cols-2 gap-3 pb-4 border-b border-slate-100">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Navigation size={9} /> Distance
                  </span>
                  <p className="text-sm font-black text-slate-900 tracking-tight">{routeInfo?.distance || `${distance?.toFixed(1)} mi`}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <Clock size={9} /> Drive Time
                  </span>
                  <p className="text-sm font-black text-slate-900 tracking-tight">{routeInfo?.duration || "—"}</p>
                </div>
              </div>

              {/* Shipment Details — all customer inputs */}
              <div className="pt-3 space-y-2">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] mb-3">Shipment Details</p>

                {/* Addresses */}
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <MapPin size={10} className="text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">From</p>
                    <p className="text-[11px] font-extrabold text-slate-700 leading-tight">{formData.pickupAddress}</p>
                  </div>
                </div>
                <div className="ml-[9px] w-px h-3 bg-slate-200"></div>
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <MapPin size={10} className="text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">To</p>
                    <p className="text-[11px] font-extrabold text-slate-700 leading-tight">{formData.dropoffAddress}</p>
                  </div>
                </div>

                {/* Date & Time */}
                {formData.pickupDate && (
                  <div className="flex items-center gap-2.5 pt-1">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Clock size={10} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Pickup Date &amp; Time</p>
                      <p className="text-[11px] font-extrabold text-slate-700">
                        {new Date(formData.pickupDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                        {formData.pickupTime && ` · ${formData.pickupTime}`}
                      </p>
                    </div>
                  </div>
                )}

                {/* Weight & Item Count */}
                {(formData.packageWeight || formData.itemCount) && (
                  <div className="flex items-center gap-3 pt-1">
                    {formData.packageWeight && (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                          <Weight size={10} className="text-slate-500" />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Weight</p>
                          <p className="text-[11px] font-extrabold text-slate-700">{formData.packageWeight} lbs</p>
                        </div>
                      </div>
                    )}
                    {formData.itemCount && (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                          <Hash size={10} className="text-slate-500" />
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Items</p>
                          <p className="text-[11px] font-extrabold text-slate-700">{formData.itemCount}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Add-ons & Large Items */}
                {(formData.hasStairs || formData.needsInsideDelivery || formData.selectedLargeItems.length > 0) && (
                  <div className="pt-1">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Add-ons</p>
                    <div className="flex flex-wrap gap-1.5">
                      {formData.hasStairs && (
                        <span className="text-[10px] font-bold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg border border-amber-100">Stairs</span>
                      )}
                      {formData.needsInsideDelivery && (
                        <span className="text-[10px] font-bold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">Inside Delivery</span>
                      )}
                      {formData.selectedLargeItems.map((item) => (
                        <span key={item} className="text-[10px] font-bold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg border border-slate-200">{item}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
