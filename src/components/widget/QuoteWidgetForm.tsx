"use client";

import { safeWidgetUrl } from "@/lib/widget-urls";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { getEntitlements } from "@/lib/plans";
import { MapPin, CheckCircle, ArrowRight, ArrowLeft, User, Mail, Phone, Truck, Sparkles, Weight, Hash, Footprints, Home, Clock, Box, Navigation, Check, Lock, ShieldCheck, Plus, Trash2 } from "lucide-react";
import { useJsApiLoader } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ZipAreaMap from "./ZipAreaMap";
import RouteMapDisplay from "./RouteMapDisplay";
import PickupDateTime from "./PickupDateTime";
import ServiceSelector, { type ServiceOption } from "./ServiceSelector";
import VehicleSelector, { type VehicleOption as VehicleTypeOption } from "./VehicleSelector";
import VehicleArtwork from "./VehicleArtwork";
import CustomerCustomQuestions, { type AnswerValues } from "./CustomerCustomQuestions";
import { normalizeCustomQuestions, validateCustomAnswers, visibleCustomQuestions } from "@/lib/form-questions";
import { DEFAULT_QUICK_SUBTITLE } from "@/lib/quick-subtitle";
import { MAX_INTERMEDIATE_STOPS } from "@/lib/route-stops";
import MerchantLogo from "@/components/shared/MerchantLogo";
import { readableForeground, widgetBrandVariables } from "@/lib/color";
import { normalizeLogoBackdrop } from "@/lib/logo-plate";

interface WidgetProps {
  company: {
    id: string;
    name: string;
    logoUrl?: string | null;
    logoBackdrop?: string | null;
    formId?: string | null;
    subscriptionPlan: string;
    pricingProfile?: Record<string, unknown>;
    widgetSettings: {
      id: string;
      formStyle?: "standard" | "extended" | "quick";
      customQuestions?: unknown;
      primaryColor: string;
      headerText: string;
      quickSubtitleText: string;
      buttonText: string;
      showWeight: boolean;
      showItemCount: boolean;
      showExtras: boolean;
      insideDeliveryLabel?: string;
      addon3Label?: string;
      disclaimerText: string;
      backgroundImageUrl?: string | null;
      logoUrl?: string | null;
      companyNameText?: string | null;
      companyNameFont?: string;
      mapLayout?: string;
      websiteUrl?: string | null;
      paymentsEnabled?: boolean;
      showVehicles?: boolean;
      pricePerVehicle?: number;
      vehicleOptions?: VehicleTypeOption[];
      showAwb?: boolean;
      geoFencingEnabled?: boolean;
      serviceZips?: string[];
    };
  };
  demoMode?: boolean;
}

interface FormData {
  pickupAddress: string;
  dropoffAddress: string;
  intermediateStops: Array<{ address: string; zip: string }>;
  pickupZip: string;
  dropoffZip: string;
  serviceType: string;
  hasStairs: boolean;
  stairsFlights: string;
  needsInsideDelivery: boolean;
  needsAddon3: boolean;
  pickupDate: string;
  pickupTime: string;
  selectedLargeItems: string[];
  packageWeight: string;
  itemCount: string;
  vehicleCount: string;
  vehicleType: string;
  awbNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customAnswers: AnswerValues;
}

interface QuoteBreakdown {
  total: number;
  lineItems: { key: string; label: string; amount: number; detail?: string }[];
  distanceMiles: number;
  freeMiles: number;
  billableMiles: number;
  minimumApplied: boolean;
}

const LIBRARIES: ("places" | "geometry" | "drawing" | "visualization")[] = ["places"];
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const draftKey = (scopeId: string) => `qalt-draft-${scopeId}`;
const DRAFT_TTL_MS = 1000 * 60 * 60 * 24;
const CLIENT_DISTANCE_TIMEOUT_MS = 2500;

const EMPTY_FORM: FormData = {
  pickupAddress: "",
  dropoffAddress: "",
  intermediateStops: [],
  pickupZip: "",
  dropoffZip: "",
  serviceType: "",
  hasStairs: false,
  stairsFlights: "1",
  needsInsideDelivery: false,
  needsAddon3: false,
  pickupDate: "",
  pickupTime: "",
  selectedLargeItems: [],
  packageWeight: "",
  itemCount: "",
  vehicleCount: "",
  vehicleType: "",
  awbNumber: "",
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  customAnswers: {},
};

const LABEL_CLASS = "text-xs font-semibold text-slate-500 flex items-center gap-1.5 mb-2 ml-0.5";
const INPUT_CLASS = "w-full px-4 py-3.5 bg-slate-50/70 border border-slate-200 rounded-2xl text-[15px] font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-medium focus:bg-white focus:ring-2 focus:ring-[color:var(--ring)] focus:border-transparent outline-none transition-all duration-200";
const EASE = [0.22, 1, 0.36, 1] as const;

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}

function useCountUp(target: number | null, durationMs = 650): number {
  const reduce = useReducedMotion();
  const [value, setValue] = useState<number>(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (target == null || reduce) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 5);
      setValue(target * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, durationMs, reduce]);

  if (reduce) return target ?? 0;
  return value;
}

const AutocompleteInput = ({
  label,
  placeholder,
  value,
  onAddressSelect,
  onClear,
  isLoaded,
  icon: Icon
}: {
  label: string;
  placeholder: string;
  value: string;
  onAddressSelect: (address: string, zip: string) => void;
  onClear: () => void;
  isLoaded: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>
}) => {
  const {
    ready,
    init,
    value: inputValue,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { types: ["address"] },
    debounce: 300,
    initOnMount: false,
    defaultValue: value,
  });

  const [addressError, setAddressError] = useState("");
  useEffect(() => { if (isLoaded) init(); }, [isLoaded, init]);
  useEffect(() => {
    setValue(value, false);
  }, [value, setValue]);

  return (
    <div className="relative">
      <label className={LABEL_CLASS}>
        <Icon size={12} className="text-slate-400" /> {label}
      </label>
      <div className="relative group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          aria-label={label || placeholder}
          placeholder={placeholder}
          className={`${INPUT_CLASS} pr-10`}
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
      {addressError && <p role="alert" className="mt-1 text-xs text-red-600">{addressError}</p>}
      {status === "OK" && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2">
          {data.map((suggestion) => (
            <div
              key={suggestion.place_id}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.currentTarget.click(); } }}
              onClick={async () => {
                setValue(suggestion.description, false);
                clearSuggestions();
                try {
                  const results = await getGeocode({ address: suggestion.description });
                  const zipCode = results[0]?.address_components.find(c => c.types.includes("postal_code"))?.long_name || "";
                  if (!zipCode) throw new Error("Missing postal code");
                  setAddressError("");
                  onAddressSelect(suggestion.description, zipCode);
                } catch {
                  onClear();
                  setAddressError("Unable to verify this address. Choose another suggestion or try again.");
                }
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

export default function QuoteWidgetForm({ company, demoMode = false }: WidgetProps) {
  const entitlements = getEntitlements(company.subscriptionPlan);
  const [hydrated, setHydrated] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const reduce = !hydrated || prefersReducedMotion;

  const widgetSettings = {
    ...(company.widgetSettings || {
      primaryColor: "#1E40AF",
      headerText: "Delivery Quote Calculator",
      quickSubtitleText: DEFAULT_QUICK_SUBTITLE,
      buttonText: "Get Instant Quote",
      showWeight: false,
      showItemCount: true,
      showExtras: true,
      disclaimerText: "Estimate only. Final price confirmed after booking.",
      mapLayout: "inline",
      websiteUrl: null,
    }),
    ...(!entitlements.isAdvancedCustomizationEnabled ? {
      backgroundImageUrl: null,
    } : {}),
  };

  const pricingProfile = company.pricingProfile as {
    afterHoursFee?: number;
    addon3Fee?: number;
    largeItemsEnabled?: boolean;
    largeItemCategories?: Array<{ name: string; price: number }>;
    serviceOptions?: ServiceOption[];
    businessHoursStart?: string;
    businessHoursEnd?: string;
    businessDays?: string;
  };
  const largeItemsEnabled = pricingProfile?.largeItemsEnabled ?? false;
  const largeItemCategories: Array<{ name: string; price: number }> = Array.isArray(
    pricingProfile?.largeItemCategories
  )
    ? (pricingProfile.largeItemCategories as Array<{ name: string; price: number }>)
    : [];
  const serviceOptions: ServiceOption[] = Array.isArray(pricingProfile?.serviceOptions)
    ? pricingProfile.serviceOptions.filter((option) => option && typeof option.name === "string" && Number(option.fee) >= 0)
    : [];
  const vehicleOptions: VehicleTypeOption[] = Array.isArray(widgetSettings.vehicleOptions)
    ? widgetSettings.vehicleOptions.filter((option) => option && typeof option.name === "string" && Number(option.fee) >= 0)
    : [];
  const quickMode = widgetSettings.formStyle === "quick";
  const customQuestions = widgetSettings.formStyle === "extended"
    ? normalizeCustomQuestions(widgetSettings.customQuestions)
    : [];

  useEffect(() => {
    const font = widgetSettings.companyNameFont || "Inter";
    if (font === "Inter") return;
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
  const logoUrlToUse = entitlements.isAdvancedCustomizationEnabled
    ? (company.widgetSettings.logoUrl || company.logoUrl)
    : null;

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [quickPriceUpdating, setQuickPriceUpdating] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [parentUrl, setParentUrl] = useState<string | null>(null);
  const stepRef = useRef(step);
  const estimateRequestRef = useRef(0);
  stepRef.current = step;

  useEffect(() => {
    const BLOCKED_DOMAINS = ["stripe.com", "checkout.stripe.com", "qalt.site", "localhost"];
    const isBlockedUrl = (url: string): boolean => {
      try {
        if (!safeWidgetUrl(url)) return true;
        const hostname = new URL(url).hostname.toLowerCase();
        return BLOCKED_DOMAINS.some((blocked) => hostname === blocked || hostname.endsWith("." + blocked));
      } catch {
        return true;
      }
    };

    try {
      if (safeWidgetUrl(widgetSettings.websiteUrl)) {
        setParentUrl(safeWidgetUrl(widgetSettings.websiteUrl));
      } else if (document.referrer && !isBlockedUrl(document.referrer)) {
        setParentUrl(document.referrer);
      }
    } catch {
      setParentUrl(safeWidgetUrl(widgetSettings.websiteUrl));
    }
  }, [widgetSettings.websiteUrl]);

  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  type ComparedService = { name: string; total: number; breakdown: QuoteBreakdown };
  const [comparison, setComparison] = useState<{ fingerprint: string; options: ComparedService[] } | null>(null);
  const quoteFingerprint = JSON.stringify({
    pickup: formData.pickupAddress, dropoff: formData.dropoffAddress, stops: formData.intermediateStops,
    vehicle: formData.vehicleType, count: formData.vehicleCount, weight: formData.packageWeight, items: formData.itemCount,
    stairs: formData.hasStairs, flights: formData.stairsFlights, inside: formData.needsInsideDelivery, addon: formData.needsAddon3,
    date: formData.pickupDate, time: formData.pickupTime, largeItems: formData.selectedLargeItems,
    answers: formData.customAnswers,
  });
  const comparisonOptions = comparison?.fingerprint === quoteFingerprint ? comparison.options : [];
  const [estimate, setEstimate] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [durationMinutes, setDurationMinutes] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<QuoteBreakdown | null>(null);
  const selectService = (serviceType: string) => {
    setFormData((previous) => ({ ...previous, serviceType }));
    const selected = comparisonOptions.find((option) => option.name === serviceType);
    if (selected) { setEstimate(selected.total); setBreakdown(selected.breakdown); }
  };
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    duration: string;
    originCity: string;
    destinationCity: string;
  } | null>(null);
  const [error, setError] = useState("");
  const [quoteReceipt, setQuoteReceipt] = useState<{ id: string; emailSent: boolean; deliveryWindow: string | null } | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: LIBRARIES
  });

  const draftScope = company.formId || company.id;

  useIsoLayoutEffect(() => {
    try {
      const raw = sessionStorage.getItem(draftKey(draftScope));
      if (raw) {
        const d = JSON.parse(raw);
        const fresh = !d?.savedAt || Date.now() - d.savedAt < DRAFT_TTL_MS;
        if (d && fresh) {
          if (d.formData) setFormData({ ...EMPTY_FORM, ...d.formData });
          if (typeof d.estimate === "number") setEstimate(d.estimate);
          if (typeof d.distance === "number") setDistance(d.distance);
          if (typeof d.durationMinutes === "number") setDurationMinutes(d.durationMinutes);
          if (d.breakdown) setBreakdown(d.breakdown);
          if (d.routeInfo) setRouteInfo(d.routeInfo);
          let s = typeof d.step === "number" ? d.step : 1;
          let sum = Boolean(d.showSummary);
          if (s >= 3) { s = 2; sum = false; }
          setStep(s);
          setShowSummary(sum);
        } else {
          sessionStorage.removeItem(draftKey(draftScope));
        }
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (step === 3) {
        sessionStorage.removeItem(draftKey(draftScope));
        return;
      }
      const started = step > 1 || Boolean(formData.pickupAddress || formData.dropoffAddress);
      if (!started) return;
      sessionStorage.setItem(
        draftKey(draftScope),
        JSON.stringify({ savedAt: Date.now(), step, showSummary, formData, estimate, distance, durationMinutes, breakdown, routeInfo })
      );
    } catch {}
  }, [hydrated, step, showSummary, formData, estimate, distance, durationMinutes, breakdown, routeInfo, draftScope]);

  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted && stepRef.current >= 3) {
        setStep(2);
        setShowSummary(false);
      }
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  const clearPickup = () => setFormData(prev => ({ ...prev, pickupAddress: "", pickupZip: "" }));
  const clearDropoff = () => setFormData(prev => ({ ...prev, dropoffAddress: "", dropoffZip: "" }));
  const addIntermediateStop = () => {
    setFormData((prev) => ({
      ...prev,
      intermediateStops: [...prev.intermediateStops, { address: "", zip: "" }],
    }));
  };
  const updateIntermediateStop = (index: number, address: string, zip: string) => {
    setFormData((prev) => ({
      ...prev,
      intermediateStops: prev.intermediateStops.map((stop, stopIndex) =>
        stopIndex === index ? { address, zip } : stop
      ),
    }));
  };
  const removeIntermediateStop = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      intermediateStops: prev.intermediateStops.filter((_, stopIndex) => stopIndex !== index),
    }));
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

  const calculateClientDistance = async (locations: string[]): Promise<number | null> => {
    if (locations.length < 2) return null;
    const legs = await Promise.all(locations.slice(0, -1).map((origin, index) => new Promise<number | null>((resolve) => {
      const destination = locations[index + 1];
      if (!isLoaded || !window.google?.maps) {
        resolve(null);
        return;
      }

      let settled = false;
      const finish = (value: number | null) => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeoutId);
        resolve(value);
      };

      const timeoutId = window.setTimeout(() => finish(null), CLIENT_DISTANCE_TIMEOUT_MS);

      try {
        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin],
            destinations: [destination],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
          },
          (response, status) => {
            if (status === "OK" && response?.rows[0]?.elements[0]?.status === "OK") {
              finish(response.rows[0].elements[0].distance.value * 0.000621371);
            } else {
              finish(null);
            }
          }
        );
      } catch {
        finish(null);
      }
    })));
    if (legs.some((leg) => leg === null)) return null;
    return (legs as number[]).reduce((total, leg) => total + leg, 0);
  };

  const fetchEstimate = async ({
    vehicleType = formData.vehicleType,
    serviceType = formData.serviceType,
    advance = true,
    quickRefresh = false,
  }: {
    vehicleType?: string;
    serviceType?: string;
    advance?: boolean;
    quickRefresh?: boolean;
  } = {}) => {
    const requestId = ++estimateRequestRef.current;
    if (quickRefresh) setQuickPriceUpdating(true);
    else setLoading(true);
    setError("");

    try {
      if (serviceOptions.length === 1 && !serviceType) {
        setError("Please select a delivery service.");
        return false;
      }
      if (widgetSettings.showVehicles && vehicleOptions.length > 0 && (quickMode || (parseInt(formData.vehicleCount) || 0) > 0) && !vehicleType) {
        setError("Please select a vehicle type.");
        return false;
      }
      if (formData.intermediateStops.some((stop) => !stop.address)) {
        setError("Select an address suggestion for every additional stop.");
        return false;
      }

      const geoEnabled = company.widgetSettings.geoFencingEnabled;
      const serviceZips = company.widgetSettings.serviceZips ?? [];
      if (geoEnabled && serviceZips.length > 0) {
        const pickup = formData.pickupZip.trim();
        const dropoff = formData.dropoffZip.trim();
        const stopInArea = formData.intermediateStops.some((stop) => serviceZips.includes(stop.zip.trim()));
        if (!serviceZips.includes(pickup) && !serviceZips.includes(dropoff) && !stopInArea) {
          setError("Sorry, we don't currently service that area. Please check our coverage and try again.");
          return false;
        }
      }

      const origin = formData.pickupAddress || formData.pickupZip;
      const destination = formData.dropoffAddress || formData.dropoffZip;
      const clientDistance = await calculateClientDistance([
        origin,
        ...formData.intermediateStops.map((stop) => stop.address),
        destination,
      ]);

      const res = await fetch(`/api/widget/${company.id}/estimate`, {
        method: "POST",
        signal: AbortSignal.timeout(20000),
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: formData.pickupAddress,
          destination: formData.dropoffAddress,
          pickupZip: formData.pickupZip,
          dropoffZip: formData.dropoffZip,
          intermediateStops: formData.intermediateStops,
          clientDistance,
          formId: company.formId || null,
          serviceType,
          compareServices: serviceOptions.length > 1,
          customAnswers: formData.customAnswers,
          extras: {
            hasStairs: formData.hasStairs,
            stairsFlights: formData.hasStairs ? (parseInt(formData.stairsFlights) || 1) : 0,
            needsInsideDelivery: formData.needsInsideDelivery,
            needsAddon3: formData.needsAddon3,
            pickupDateTime: formData.pickupDate && formData.pickupTime
              ? `${formData.pickupDate}T${formData.pickupTime}`
              : undefined,
            selectedLargeItems: formData.selectedLargeItems,
            packageWeight: parseFloat(formData.packageWeight) || 0,
            itemCount: parseInt(formData.itemCount) || 0,
          },
          vehicleCount: quickMode ? 1 : (parseInt(formData.vehicleCount) || 0),
          vehicleType,
        }),
      });

      const data = await res.json();
      if (requestId !== estimateRequestRef.current) return false;

      if (res.ok) {
        if (Array.isArray(data.serviceComparisons)) setComparison({ fingerprint: quoteFingerprint, options: data.serviceComparisons });
        if (serviceOptions.length > 1 && !serviceType) {
          setEstimate(null);
          setBreakdown(null);
          setError("Choose a delivery option to continue.");
          return true;
        }
        setEstimate(data.estimate);
        setDistance(data.distance);
        if (typeof data.durationMinutes === "number") setDurationMinutes(data.durationMinutes);
        setBreakdown(data.breakdown ?? null);
        setFormData((prev) => ({
          ...prev,
          ...(typeof data.serviceType === "string" && data.serviceType ? { serviceType: data.serviceType } : {}),
          ...(typeof data.vehicleType === "string" && data.vehicleType ? { vehicleType: data.vehicleType } : {}),
          ...(quickMode ? { vehicleCount: "1" } : {}),
        }));
        if (advance) setStep(2);
        return true;
      }

      setError(data.error || "Could not calculate estimate. Please check your addresses.");
      return false;
    } catch {
      if (requestId === estimateRequestRef.current) {
        setError("An unexpected error occurred.");
      }
      return false;
    } finally {
      if (requestId === estimateRequestRef.current) {
        setLoading(false);
        setQuickPriceUpdating(false);
      }
    }
  };

  const getEstimate = async (e: React.FormEvent) => {
    e.preventDefault();

    const customCheck = validateCustomAnswers(customQuestions, formData.customAnswers ?? {});
    if (customCheck.error) {
      setError(customCheck.error);
      return;
    }

    await fetchEstimate({ advance: true });
  };

  const submitQuote = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/widget/${company.id}/submit`, {
        method: "POST",
        signal: AbortSignal.timeout(20000),
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          estimatedPrice: estimate,
          distanceMiles: distance,
          pickupDateTime: formData.pickupDate && formData.pickupTime
            ? `${formData.pickupDate}T${formData.pickupTime}`
            : undefined,
          selectedLargeItems: formData.selectedLargeItems,
          formId: company.formId || null,
          widgetSettingsId: widgetSettings.id,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setEstimate(data.estimatedPrice);
        setDistance(data.distanceMiles);
        if (data.breakdown) setBreakdown(data.breakdown);
        setQuoteReceipt({ id: data.quoteId, emailSent: data.customerEmailSent === true, deliveryWindow: data.deliveryWindow || null });
        if (data.paymentRequired && data.quoteId) {
          setLoading(false);
          setError("");
          setStep(4);
          await initiatePayment(data.quoteId);
        } else {
          setStep(3);
        }
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

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (widgetSettings.paymentsEnabled) {
      setError("");
      setShowSummary(true);
    } else {
      submitQuote(e);
    }
  };

  const initiatePayment = async (quoteId: string) => {
    try {
      const res = await fetch("/api/stripe/quote-payment", {
        method: "POST",
        signal: AbortSignal.timeout(20000),
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quoteId }),
      });
      const data = await res.json();
      const secureCheckout = safeWidgetUrl(data.checkoutUrl);
      if (res.ok && secureCheckout && new URL(secureCheckout).hostname === "checkout.stripe.com") {
        setCheckoutUrl(secureCheckout);
        try {
          sessionStorage.setItem(
            draftKey(draftScope),
            JSON.stringify({ savedAt: Date.now(), step: 2, showSummary: false, formData, estimate, distance, durationMinutes, breakdown, routeInfo })
          );
        } catch {}
        // A fresh user click safely leaves cross-origin builder iframes.
        if (window.top === window.self) window.location.assign(secureCheckout);
      } else {
        setError(data.error || "Could not initiate payment. Please try again.");
        setStep(2);
      }
    } catch {
      setError("Payment setup failed. Please try again.");
      setStep(2);
    }
  };

  const backToEdit = () => {
    setShowSummary(false);
    setError("");
    setStep(1);
  };

  const startNewQuote = () => {
    try { sessionStorage.removeItem(draftKey(draftScope)); } catch {}
    setShowSummary(false);
    setError("");
    setEstimate(null);
    setDistance(null);
    setDurationMinutes(null);
    setBreakdown(null);
    setRouteInfo(null);
    setComparison(null);
    setFormData(EMPTY_FORM);
    setStep(1);
  };

  const primaryColor = (widgetSettings.primaryColor && widgetSettings.primaryColor.length >= 4) ? widgetSettings.primaryColor : "#1E40AF";
  const routeComplete = Boolean(
    formData.pickupAddress &&
    formData.dropoffAddress &&
    formData.intermediateStops.every((stop) => stop.address)
  );

  useEffect(() => {
    if (!quickMode || step !== 1) return;

    const serviceReady = serviceOptions.length !== 1 || Boolean(formData.serviceType);
    const vehicleReady = !widgetSettings.showVehicles || vehicleOptions.length === 0 || Boolean(formData.vehicleType);

    if (!routeComplete || !serviceReady || !vehicleReady) {
      setEstimate(null);
      setBreakdown(null);
      setDistance(null);
      setDurationMinutes(null);
      setQuickPriceUpdating(false);
      return;
    }

    const timer = window.setTimeout(() => {
      void fetchEstimate({ advance: false, quickRefresh: true });
    }, 180);

    return () => window.clearTimeout(timer);
    // fetchEstimate is intentionally driven by the concrete quote inputs below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    quickMode,
    step,
    routeComplete,
    formData.pickupAddress,
    formData.dropoffAddress,
    formData.pickupZip,
    formData.dropoffZip,
    formData.intermediateStops,
    formData.vehicleType,
    formData.serviceType,
  ]);

  const activeStage = step >= 2 ? 2 : routeComplete ? 1 : 0;
  const stages = ["Route", "Details", "Quote"] as const;
  const stageStatus = (i: number): "done" | "active" | "todo" => {
    if (i < activeStage) return "done";
    if (i === activeStage) return i === 2 && step >= 3 ? "done" : "active";
    return "todo";
  };

  const serviceType = formData.serviceType || (formData.awbNumber?.trim() ? "Airport pickup" : "Standard delivery");
  const hasAnyAddon = formData.hasStairs || formData.needsInsideDelivery || formData.needsAddon3 || formData.selectedLargeItems.length > 0;
  const animatedEstimate = useCountUp((quickMode || step >= 2) ? estimate : null);
  const money = (n: number) => `${n < 0 ? "-" : ""}$${Math.abs(n).toFixed(2)}`;

  const relabelLine = (li: { key: string; label: string }) => {
    if (li.key === "insideDelivery" && widgetSettings.insideDeliveryLabel) return widgetSettings.insideDeliveryLabel;
    if (li.key === "addon3" && widgetSettings.addon3Label) return widgetSettings.addon3Label;
    return li.label;
  };

  const priceRows = (() => {
    if (!breakdown) return [] as { key: string; label: string; amount: number; detail?: string }[];
    const rows = breakdown.lineItems.map((li) => ({ ...li, label: relabelLine(li) }));
    const totalCents = Math.round(breakdown.total * 100);
    const sumCents = rows.reduce((s, r) => s + Math.round(r.amount * 100), 0);
    const residual = totalCents - sumCents;
    if (residual !== 0 && rows.length > 0) {
      const idx = rows.findIndex((r) => r.key === "mileage");
      const target = idx >= 0 ? idx : 0;
      rows[target] = { ...rows[target], amount: rows[target].amount + residual / 100 };
    }
    return rows;
  })();

  const amountByKey = new Map<string, number>();
  breakdown?.lineItems.forEach((li) => amountByKey.set(li.key, (amountByKey.get(li.key) || 0) + li.amount));
  const priced = (key: string): string | null => (amountByKey.has(key) ? money(amountByKey.get(key)!) : null);

  const bodyKey = step === 2 && showSummary ? "summary" : `step-${step}`;
  const bodyVariants = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -24 } };
  const revealItem = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };
  const showSideMap = step === 2 && !showSummary && widgetSettings.mapLayout === 'side';
  const widgetWidthClass = showSideMap
    ? (quickMode ? 'max-w-6xl' : 'max-w-5xl')
    : (quickMode ? 'max-w-3xl' : 'max-w-md');
  const formWidthClass = showSideMap
    ? (quickMode ? 'md:w-1/2 lg:w-[460px]' : 'md:w-[440px]')
    : 'md:w-full';

  return (
    <div
      data-qalt-brand-owned="true"
      className={`w-full transition-all duration-700 ease-in-out font-sans flex items-start justify-center mx-auto relative ${widgetWidthClass}`}
      style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", ['--ring' as string]: `${primaryColor}59`, ...widgetBrandVariables(primaryColor) }}
    >
      <div className={`w-full transition-all duration-700 ease-in-out relative z-10 overflow-hidden bg-white flex flex-col md:flex-row ${quickMode ? "rounded-[30px] shadow-[0_28px_90px_-20px_rgba(15,23,42,.28)] border border-slate-200/80" : "rounded-[32px] shadow-[0_30px_100px_-15px_rgba(0,0,0,0.2)]"}`}>
        <div className={`w-full transition-all duration-700 ${formWidthClass} flex flex-col shrink-0`}>
          {quickMode ? (
            widgetSettings.backgroundImageUrl ? (
            <div
              className="relative overflow-hidden bg-cover bg-center px-6 pt-7 pb-8 sm:px-10 sm:pt-10 sm:pb-10"
              style={{ backgroundImage: `url(${JSON.stringify(widgetSettings.backgroundImageUrl)})` }}
            >
              <div className="absolute inset-0 bg-linear-to-b from-slate-950/35 to-slate-950/65" />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.04em] text-white drop-shadow-md">Instant Quote</h2>
                  {widgetSettings.quickSubtitleText?.trim() && (
                    <p className="mt-2 text-sm font-semibold text-white/85 drop-shadow">{widgetSettings.quickSubtitleText}</p>
                  )}
                </div>
                {logoUrlToUse ? (
                  <div className="flex min-h-11 w-28 shrink-0 items-center justify-end">
                    <MerchantLogo src={logoUrlToUse} alt={company.name} backdrop={normalizeLogoBackdrop(company.logoBackdrop)} surface="dark" className="max-h-11 w-auto max-w-full object-contain object-right" />
                  </div>
                ) : (
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-md">
                    <Truck size={21} className="text-white" />
                  </div>
                )}
              </div>
            </div>
            ) : (
            <div className="bg-white px-6 pt-7 pb-2 sm:px-10 sm:pt-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.04em] text-slate-950">Instant Quote</h2>
                  {widgetSettings.quickSubtitleText?.trim() && (
                    <p className="mt-2 text-sm font-semibold text-slate-500">{widgetSettings.quickSubtitleText}</p>
                  )}
                </div>
                {logoUrlToUse ? (
                  <div className="flex min-h-11 w-28 shrink-0 items-center justify-end">
                    <MerchantLogo src={logoUrlToUse} alt={company.name} backdrop={normalizeLogoBackdrop(company.logoBackdrop)} surface="widget" className="max-h-11 w-auto max-w-full object-contain object-right" />
                  </div>
                ) : (
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-slate-50">
                    <Truck size={21} style={{ color: primaryColor }} />
                  </div>
                )}
              </div>
            </div>
            )
          ) : (
          <div
            className="relative px-6 pt-6 pb-7 sm:px-8 sm:pt-8 sm:pb-10 overflow-hidden bg-cover bg-center"
            style={widgetSettings.backgroundImageUrl
              ? { backgroundImage: `url(${JSON.stringify(widgetSettings.backgroundImageUrl)})` }
              : { backgroundColor: primaryColor }}
          >
            {!widgetSettings.backgroundImageUrl && <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent mix-blend-overlay" />}
            {widgetSettings.backgroundImageUrl && <div className="absolute inset-0 bg-slate-900/40" />}
            {!widgetSettings.backgroundImageUrl && (
              <>
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10" style={{ background: 'white' }} />
                <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-10" style={{ background: 'white' }} />
              </>
            )}

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                {logoUrlToUse ? (
                  <div className="flex min-h-10 w-24 shrink-0 items-center">
                    {/* The header is the brand color or a darkened photo. */}
                    <MerchantLogo
                      src={logoUrlToUse}
                      alt={company.name}
                      backdrop={normalizeLogoBackdrop(company.logoBackdrop)}
                      surface={widgetSettings.backgroundImageUrl || readableForeground(primaryColor).toLowerCase() !== "#111827" ? "dark" : "light"}
                      className="max-h-10 w-auto max-w-full object-contain object-left"
                    />
                  </div>
                ) : (
                  <div className="p-2.5 bg-white/15 rounded-2xl backdrop-blur-md ring-1 ring-white/20">
                    <Truck size={22} className="text-white" />
                  </div>
                )}
                <h2 {...(!widgetSettings.backgroundImageUrl ? { "data-qalt-brand-title": "" } : {})} className="text-xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">{widgetSettings.headerText}</h2>
              </div>
              {!logoUrlToUse && (
                <p {...(!widgetSettings.backgroundImageUrl ? { "data-qalt-brand-title": "" } : {})}
                  className="text-white/90 text-sm font-medium pl-1"
                  style={{ fontFamily: widgetSettings.companyNameFont || "Inter" }}>
                  {widgetSettings.companyNameText || company.name}
                </p>
              )}
            </div>

            <div className="relative z-10 flex items-center mt-5 sm:mt-6">
              {stages.map((label, i) => {
                const status = stageStatus(i);
                return (
                  <div key={label} className={`flex items-center ${i < stages.length - 1 ? 'flex-1' : ''}`}>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        {status === "active" && !reduce && (
                          <motion.span className="absolute -inset-1 rounded-full bg-white/25 blur-[3px] pointer-events-none"
                            animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.12, 1] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />
                        )}
                        {status === "done" && !reduce && (
                          <motion.span className="absolute inset-0 rounded-full bg-white pointer-events-none"
                            initial={{ opacity: 0.4, scale: 1 }} animate={{ opacity: 0, scale: 1.7 }}
                            transition={{ duration: 0.6, ease: "easeOut" }} />
                        )}
                        <motion.div key={status}
                          initial={reduce ? false : { scale: 0.86 }} animate={{ scale: 1 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className={`relative w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors duration-500 ${status === "todo" ? "bg-white/15 text-white/50 ring-1 ring-white/20" : "bg-white shadow-lg"}`}
                          style={status !== "todo" ? { color: primaryColor } : {}}>
                          {status === "done" ? <Check size={13} strokeWidth={3} /> : i + 1}
                        </motion.div>
                      </div>
                      <span className={`text-[11px] font-bold tracking-tight transition-colors duration-500 ${status === "todo" ? "text-white/50" : "text-white"}`}>{label}</span>
                    </div>
                    {i < stages.length - 1 && (
                      <div className="flex-1 mx-2 h-0.5 rounded-full bg-white/15 overflow-hidden">
                        <motion.div className="h-full rounded-full bg-white/70" initial={false}
                          animate={{ width: i < activeStage ? "100%" : "0%" }}
                          transition={{ duration: reduce ? 0 : 0.5, ease: EASE }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          )}

          <div className={`bg-white flex-1 ${quickMode ? "px-6 pt-5 pb-7 sm:px-10 sm:pt-6 sm:pb-9" : "px-6 py-7 sm:px-8 sm:py-8"}`}>
            {!hydrated ? (
              <div className="py-16 flex items-center justify-center">
                <div className="w-8 h-8 border-[3px] rounded-full animate-spin" style={{ borderColor: `${primaryColor}22`, borderTopColor: primaryColor }} />
              </div>
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={bodyKey} variants={bodyVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.28, ease: EASE }}>
                  {loadError && <p role="alert" className="mb-3 text-sm text-red-600">Address search is temporarily unavailable. Please reload the form to try again.</p>}
                  {step === 1 && (
                    <form onSubmit={getEstimate} className="space-y-5">
                      <div className={quickMode ? "space-y-3" : "space-y-4"}>
                        <AutocompleteInput label={quickMode ? "" : "Pickup address"} placeholder="Enter pickup address" value={formData.pickupAddress}
                          isLoaded={isLoaded} icon={MapPin}
                          onAddressSelect={(address, zip) => setFormData(prev => ({ ...prev, pickupAddress: address, pickupZip: zip }))}
                          onClear={clearPickup} />
                        <AnimatePresence initial={false}>
                          {formData.intermediateStops.map((stop, index) => (
                            <motion.div
                              key={`additional-stop-${index}`}
                              initial={reduce ? false : { opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={reduce ? undefined : { opacity: 0, height: 0 }}
                              transition={{ duration: 0.22, ease: EASE }}
                              className="grid grid-cols-[minmax(0,1fr)_44px] items-end gap-2 overflow-visible"
                            >
                              <AutocompleteInput
                                label={quickMode ? `Stop ${index + 1}` : `Additional stop ${index + 1}`}
                                placeholder="Enter stop address"
                                value={stop.address}
                                isLoaded={isLoaded}
                                icon={MapPin}
                                onAddressSelect={(address, zip) => updateIntermediateStop(index, address, zip)}
                                onClear={() => updateIntermediateStop(index, "", "")}
                              />
                              <button
                                type="button"
                                onClick={() => removeIntermediateStop(index)}
                                aria-label={`Remove additional stop ${index + 1}`}
                                className="flex h-[50px] w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)]"
                              >
                                <Trash2 size={17} />
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        {formData.intermediateStops.length < MAX_INTERMEDIATE_STOPS && (
                          <button
                            type="button"
                            onClick={addIntermediateStop}
                            className="inline-flex items-center gap-2 px-1 py-1 text-xs font-bold text-slate-500 transition-colors hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
                          >
                            <Plus size={14} /> Add another stop
                          </button>
                        )}
                        <AutocompleteInput label={quickMode ? "" : "Dropoff address"} placeholder="Enter dropoff address" value={formData.dropoffAddress}
                          isLoaded={isLoaded} icon={MapPin}
                          onAddressSelect={(address, zip) => setFormData(prev => ({ ...prev, dropoffAddress: address, dropoffZip: zip }))}
                          onClear={clearDropoff} />
                      </div>

                      <ZipAreaMap zips={[formData.pickupZip, ...formData.intermediateStops.map(stop => stop.zip), formData.dropoffZip]} allowSearch />

                      {serviceOptions.length > 0 && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: EASE }}>
                          <ServiceSelector
                            options={serviceOptions}
                            value={formData.serviceType}
                            onChange={selectService}
                            primaryColor={primaryColor}
                            prices={comparisonOptions.length > 0 ? Object.fromEntries(comparisonOptions.map((option) => [option.name, option.total])) : undefined}
                            comparing={loading || quickPriceUpdating}
                          />
                        </motion.div>
                      )}

                      {quickMode && widgetSettings.showVehicles && vehicleOptions.length > 0 && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: EASE }}>
                          <VehicleSelector
                            options={vehicleOptions}
                            value={formData.vehicleType}
                            onChange={(vehicleType) => setFormData((prev) => ({
                              ...prev,
                              vehicleType,
                              vehicleCount: "1",
                            }))}
                            primaryColor={primaryColor}
                            variant="quick"
                          />
                        </motion.div>
                      )}

                      {quickMode && widgetSettings.showVehicles && vehicleOptions.length === 0 && (
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-800">
                          No vehicle types are configured for this Quick Quote form.
                        </div>
                      )}

                      <AnimatePresence initial={false}>
                        {routeComplete ? (
                          <motion.div key="details" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }} transition={{ duration: reduce ? 0 : 0.35, ease: EASE }} style={{ overflow: "hidden" }}>
                            <motion.div className="space-y-5" initial="hidden" animate="show"
                              transition={{ staggerChildren: reduce ? 0 : 0.05, delayChildren: reduce ? 0 : 0.08 }}>
                              {!quickMode && <motion.div variants={revealItem} transition={{ duration: 0.3, ease: EASE }}>
                                <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 mb-2 ml-0.5">
                                  <Clock size={12} className="text-slate-400" /> Pickup date &amp; time
                                </p>
                                <PickupDateTime date={formData.pickupDate} time={formData.pickupTime}
                                  onDateChange={(d) => setFormData((prev) => ({ ...prev, pickupDate: d }))}
                                  onTimeChange={(t) => setFormData((prev) => ({ ...prev, pickupTime: t }))}
                                  businessHoursStart={pricingProfile?.businessHoursStart}
                                  businessHoursEnd={pricingProfile?.businessHoursEnd}
                                  businessDays={pricingProfile?.businessDays} primaryColor={primaryColor} />
                              </motion.div>}

                              {!quickMode && widgetSettings.showVehicles && vehicleOptions.length > 0 && (
                                <motion.div variants={revealItem} transition={{ duration: 0.3, ease: EASE }}>
                                  <VehicleSelector
                                    options={vehicleOptions}
                                    value={formData.vehicleType}
                                    onChange={(vehicleType) => setFormData((prev) => ({
                                      ...prev,
                                      vehicleType,
                                      vehicleCount: prev.vehicleCount || "1",
                                    }))}
                                    primaryColor={primaryColor}
                                  />
                                </motion.div>
                              )}

                              {!quickMode && (widgetSettings.showWeight || widgetSettings.showItemCount || widgetSettings.showVehicles) && (
                                <motion.div variants={revealItem} transition={{ duration: 0.3, ease: EASE }} className="grid grid-cols-2 gap-4">
                                  {widgetSettings.showWeight && <div><label className={LABEL_CLASS}><Weight size={12} className="text-slate-400" /> Weight (lbs)</label><input type="number" name="packageWeight" placeholder="0" value={formData.packageWeight} onChange={handleInputChange} className={INPUT_CLASS} /></div>}
                                  {widgetSettings.showItemCount && <div><label className={LABEL_CLASS}><Hash size={12} className="text-slate-400" /> Items</label><input type="number" name="itemCount" placeholder="1" min="1" value={formData.itemCount} onChange={handleInputChange} className={INPUT_CLASS} /></div>}
                                  {widgetSettings.showVehicles && <div><label className={LABEL_CLASS}><Truck size={12} className="text-slate-400" /> {vehicleOptions.length > 0 ? "Vehicle quantity" : "Vehicles"}</label><input type="number" name="vehicleCount" placeholder="1" min="1" value={formData.vehicleCount} onChange={handleInputChange} className={INPUT_CLASS} /></div>}
                                </motion.div>
                              )}

                              {!quickMode && widgetSettings.showAwb && (
                                <motion.div variants={revealItem} transition={{ duration: 0.3, ease: EASE }}>
                                  <label className={LABEL_CLASS}><span className="text-slate-400">✈</span> AWB number <span className="font-medium text-slate-400">(airport pickup)</span></label>
                                  <input type="text" name="awbNumber" placeholder="e.g. 123-45678901" value={formData.awbNumber} onChange={handleInputChange} className={INPUT_CLASS} />
                                </motion.div>
                              )}

                              {!quickMode && widgetSettings.showExtras && (
                                <motion.div variants={revealItem} transition={{ duration: 0.3, ease: EASE }} className="space-y-3">
                                  <p className="text-xs font-semibold text-slate-500 ml-0.5">Add-ons</p>
                                  <div className="grid grid-cols-2 gap-2.5">
                                    {(() => {
                                      const addonIds: Array<'hasStairs' | 'needsInsideDelivery' | 'needsAddon3'> = ['hasStairs', 'needsInsideDelivery'];
                                      if (widgetSettings.addon3Label && (pricingProfile?.addon3Fee ?? 0) > 0) addonIds.push('needsAddon3');
                                      return addonIds;
                                    })().map((id) => {
                                      const config: Record<string, { label: string; icon: React.ReactNode }> = {
                                        hasStairs: { label: 'Stairs', icon: <Footprints size={15} /> },
                                        needsInsideDelivery: { label: widgetSettings.insideDeliveryLabel || 'Inside delivery', icon: <Home size={15} /> },
                                        needsAddon3: { label: widgetSettings.addon3Label || 'Add-on', icon: <Sparkles size={15} /> },
                                      };
                                      const active = formData[id];
                                      return (
                                        <label key={id}
                                          className={`relative flex items-center gap-2.5 px-4 py-3.5 border rounded-2xl cursor-pointer transition-all duration-200 select-none overflow-hidden ${active ? 'border-transparent shadow-md' : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-white'}`}
                                          style={active ? { borderColor: primaryColor } : {}}>
                                          {active && <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundColor: primaryColor }} />}
                                          <input type="checkbox" name={id} checked={active} onChange={handleInputChange} className="hidden" />
                                          <span className={`relative ${active ? 'text-slate-700' : 'text-slate-400'} transition-colors`}>{config[id].icon}</span>
                                          <span className={`relative text-[13px] font-bold ${active ? 'text-slate-800' : 'text-slate-500'}`}>{config[id].label}</span>
                                          {active && <span className="relative ml-auto w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0" style={{ backgroundColor: primaryColor }}><Check size={12} strokeWidth={3} /></span>}
                                        </label>
                                      );
                                    })}
                                  </div>

                                  <AnimatePresence initial={false}>
                                    {formData.hasStairs && (
                                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: reduce ? 0 : 0.25, ease: EASE }} style={{ overflow: "hidden" }}>
                                        <div className="flex items-center justify-between gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
                                          <label htmlFor="stairsFlights" className="text-[13px] font-bold text-slate-600 flex items-center gap-1.5"><Footprints size={14} className="text-slate-400" /> Number of flights</label>
                                          <input id="stairsFlights" type="number" name="stairsFlights" min="1" step="1" value={formData.stairsFlights} onChange={handleInputChange}
                                            className="w-20 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-800 text-center focus:ring-2 focus:ring-[color:var(--ring)] focus:border-transparent outline-none transition-all" />
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>

                                  {largeItemsEnabled && largeItemCategories.length > 0 && (
                                    <div className="space-y-3">
                                      <p className="text-xs font-semibold text-slate-500 ml-0.5 flex items-center gap-1.5"><Box size={12} className="text-slate-400" /> Special items</p>
                                      <div className="grid grid-cols-2 gap-2.5">
                                        {largeItemCategories.map((cat) => {
                                          const selected = formData.selectedLargeItems.includes(cat.name);
                                          return (
                                            <button key={cat.name} type="button" onClick={() => toggleLargeItem(cat.name)}
                                              className={`relative flex items-center justify-between gap-2 px-4 py-3.5 border rounded-2xl cursor-pointer transition-all duration-200 select-none overflow-hidden text-left ${selected ? "border-transparent shadow-md" : "bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-white"}`}
                                              style={selected ? { borderColor: primaryColor } : {}}>
                                              {selected && <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundColor: primaryColor }} />}
                                              <span className={`text-[13px] font-bold relative ${selected ? "text-slate-800" : "text-slate-500"}`}>{cat.name}</span>
                                              <span className={`text-[11px] font-bold relative shrink-0 ${selected ? "text-slate-600" : "text-slate-400"}`}>+${cat.price.toFixed(2)}</span>
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </motion.div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>

                      {customQuestions.length > 0 && (
                        <CustomerCustomQuestions questions={customQuestions} answers={formData.customAnswers ?? {}}
                          onChange={(customAnswers) => setFormData((previous) => ({ ...previous, customAnswers }))} />
                      )}

                      {checkoutUrl && <a href={checkoutUrl} target="_top" className="inline-flex px-6 py-4 rounded-xl text-white font-bold" style={{ backgroundColor: primaryColor }}>Continue to secure payment</a>}
                      {error && <div className="text-xs text-red-600 font-semibold bg-red-50 p-4 rounded-2xl border border-red-100 flex items-start gap-2"><span className="shrink-0 mt-0.5">⚠️</span> {error}</div>}

                      {quickMode ? (
                        <div className="mt-2 border-t border-slate-200 pt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                          <div className="min-w-0">
                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">Instant price</p>
                            {quickPriceUpdating ? (
                              <div className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-500">
                                <div className="h-4 w-4 rounded-full border-2 border-slate-200 border-t-slate-600 animate-spin" />
                                Updating price...
                              </div>
                            ) : estimate !== null && breakdown ? (
                              <div className="mt-1">
                                <motion.p
                                  key={estimate}
                                  initial={reduce ? false : { opacity: 0.35, y: 4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-4xl font-black tracking-[-0.04em] tabular-nums text-slate-950"
                                >
                                  ${animatedEstimate.toFixed(2)}
                                </motion.p>
                                <p className="mt-1 text-xs font-bold text-slate-400">
                                  {formData.vehicleType}{distance !== null ? ` · ${distance.toFixed(1)} miles` : ""}
                                </p>
                              </div>
                            ) : (
                              <p className="mt-1 text-sm font-bold text-slate-500">
                                {!routeComplete
                                  ? "Enter pickup and dropoff"
                                  : serviceOptions.length > 0 && !formData.serviceType
                                    ? serviceOptions.length > 1 ? "Compare delivery options" : "Choose a service"
                                    : widgetSettings.showVehicles && vehicleOptions.length > 0 && !formData.vehicleType
                                      ? "Choose a vehicle"
                                      : "Ready to price"}
                              </p>
                            )}
                          </div>
                          <button
                            type="submit"
                            disabled={loading || quickPriceUpdating || estimate === null || !breakdown}
                            data-qalt-brand-cta
                            className="sm:min-w-[230px] px-6 py-4 rounded-2xl text-white font-black text-sm shadow-lg active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-45 relative overflow-hidden group"
                            style={{ backgroundColor: primaryColor }}
                          >
                            <span className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
                            <span className="relative flex items-center gap-2.5">
                              {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Calculating...</> : <>View Price Breakdown<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>}
                            </span>
                          </button>
                        </div>
                      ) : (
                        <button type="submit" disabled={loading} data-qalt-brand-cta
                          className="w-full py-4 rounded-2xl text-white font-bold text-sm shadow-lg active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-50 relative overflow-hidden group"
                          style={{ backgroundColor: primaryColor }}>
                          <div className="absolute inset-0 opacity-20" style={{ boxShadow: `inset 0 -4px 12px rgba(0,0,0,0.2)` }} />
                          <span className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
                          <span className="relative flex items-center gap-2.5">
                            {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Calculating route...</> : <>{widgetSettings.buttonText}<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>}
                          </span>
                        </button>
                      )}
                    </form>
                  )}

                  {step === 2 && !showSummary && (
                    <form onSubmit={handleStep2Submit} className="space-y-6">
                      {comparisonOptions.length > 1 && <ServiceSelector options={serviceOptions} value={formData.serviceType}
                        onChange={selectService} primaryColor={primaryColor}
                        prices={Object.fromEntries(comparisonOptions.map((option) => [option.name, option.total]))} /> }
                      <motion.div className="relative bg-linear-to-br from-emerald-50 to-teal-50/50 border border-emerald-100/80 rounded-[20px] p-6 text-center overflow-hidden"
                        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduce ? 0.2 : 0.4, ease: EASE }}>
                        <div className="absolute top-2 right-3"><Sparkles size={16} className="text-emerald-400/50" /></div>
                        <p className="text-[10px] uppercase font-extrabold text-emerald-600/80 tracking-[0.2em] mb-2">Your estimated rate</p>
                        <div className="flex flex-col items-center">
                          <p className="text-5xl font-black text-emerald-700 tracking-tight tabular-nums">${animatedEstimate.toFixed(2)}</p>
                          <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
                            <motion.span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/70 border border-emerald-100 rounded-full text-[11px] font-bold text-emerald-700"
                              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: EASE, delay: reduce ? 0 : 0.25 }}>
                              <Navigation size={10} /> {distance?.toFixed(1)} miles
                            </motion.span>
                            {durationMinutes !== null && <motion.span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/70 border border-emerald-100 rounded-full text-[11px] font-bold text-emerald-700"
                              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: EASE, delay: reduce ? 0 : 0.38 }}><Clock size={10} /> Est. {formatDuration(durationMinutes)} drive</motion.span>}
                          </div>
                        </div>
                        {widgetSettings.mapLayout !== 'side' && isLoaded && formData.pickupAddress && formData.dropoffAddress && (
                          <motion.div className="mt-6 h-32 w-full rounded-2xl overflow-hidden border border-emerald-100 shadow-inner group"
                            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: EASE, delay: reduce ? 0 : 0.2 }}>
                            <RouteMapDisplay pickupAddress={formData.pickupAddress} intermediateStops={formData.intermediateStops} dropoffAddress={formData.dropoffAddress} isLoaded={isLoaded} />
                          </motion.div>
                        )}
                      </motion.div>

                      {quickMode && formData.vehicleType && (
                        <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                          <div className="min-w-0">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Selected vehicle</p>
                            <p className="mt-1 text-sm font-black text-slate-800">{formData.vehicleType}</p>
                          </div>
                          <span className="h-[64px] w-[132px] shrink-0 sm:h-[72px] sm:w-[150px]">
                            <VehicleArtwork name={formData.vehicleType}
                              artwork={vehicleOptions.find((option) => option.name === formData.vehicleType)?.artwork} />
                          </span>
                        </div>
                      )}

                      {priceRows.length > 0 && (
                        <motion.div className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden" initial="hidden" animate="show"
                          variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: reduce ? 0 : 0.1 } } }}>
                          <motion.p variants={revealItem} transition={{ duration: 0.3, ease: EASE }} className="px-4 pt-3.5 pb-1 text-[11px] font-bold text-slate-400 uppercase tracking-widest">{quickMode ? "Full price breakdown" : "Price breakdown"}</motion.p>
                          <div className="px-4 divide-y divide-slate-100">
                            {priceRows.map((row) => (
                              <motion.div key={row.key} variants={revealItem} transition={{ duration: 0.3, ease: EASE }} className="flex items-center justify-between gap-3 py-2.5">
                                <div className="min-w-0"><p className="text-[13px] font-semibold text-slate-700">{row.label}</p>{row.detail && <p className="text-[11px] text-slate-400 font-medium mt-0.5">{row.detail}</p>}</div>
                                <p className={`text-[13px] font-bold tabular-nums shrink-0 ${row.amount < 0 ? "text-emerald-600" : "text-slate-800"}`}>{money(row.amount)}</p>
                              </motion.div>
                            ))}
                          </div>
                          <motion.div variants={revealItem} transition={{ duration: 0.3, ease: EASE }} className="flex items-center justify-between gap-3 px-4 py-3 border-t border-slate-200 bg-white">
                            <span className="text-[13px] font-bold text-slate-500">Estimated total</span><span className="text-base font-black text-slate-900 tabular-nums">${breakdown!.total.toFixed(2)}</span>
                          </motion.div>
                        </motion.div>
                      )}

                      <div className="space-y-4">
                        <div><label className={LABEL_CLASS}><User size={12} className="text-slate-400" /> Full name</label><input type="text" name="customerName" required placeholder="John Doe" value={formData.customerName} onChange={handleInputChange} className={INPUT_CLASS} /></div>
                        <div><label className={LABEL_CLASS}><Mail size={12} className="text-slate-400" /> Email</label><input type="email" name="customerEmail" required placeholder="john@example.com" value={formData.customerEmail} onChange={handleInputChange} className={INPUT_CLASS} /></div>
                        <div><label className={LABEL_CLASS}><Phone size={12} className="text-slate-400" /> Phone</label><input type="tel" name="customerPhone" required placeholder="(555) 000-0000" value={formData.customerPhone} onChange={handleInputChange} className={INPUT_CLASS} /></div>
                      </div>

                      {checkoutUrl && <a href={checkoutUrl} target="_top" className="inline-flex px-6 py-4 rounded-xl text-white font-bold" style={{ backgroundColor: primaryColor }}>Continue to secure payment</a>}
                      {error && <div className="text-xs text-red-600 font-semibold bg-red-50 p-4 rounded-2xl border border-red-100 flex items-start gap-2"><span className="shrink-0 mt-0.5">⚠️</span> {error}</div>}

                      <div className="space-y-3 pt-1">
                        <button type="submit" disabled={loading} data-qalt-brand-cta
                          className="w-full py-4 rounded-2xl text-white font-bold text-sm shadow-lg active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-50 relative overflow-hidden group bg-emerald-600"
                          style={{ boxShadow: '0 8px 24px -4px rgba(16,185,129,0.35)' }}>
                          <span className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
                          <span className="relative flex items-center gap-2">{loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting...</> : widgetSettings.paymentsEnabled ? <>Pay &amp; Book <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></> : <>Submit Quote <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>}</span>
                        </button>
                        <button type="button" onClick={() => setStep(1)} className="w-full py-3 text-slate-400 font-bold text-[11px] uppercase tracking-[0.15em] hover:text-slate-600 transition-all">← Edit details</button>
                      </div>
                    </form>
                  )}

                  {step === 2 && showSummary && (
                    <div className="space-y-5">
                      <div className="text-center"><h3 className="text-xl font-black text-slate-900 tracking-tight">Review your booking</h3><p className="text-sm text-slate-500 mt-1 font-medium">Confirm the details before payment.</p></div>
                      <div className="rounded-[20px] border border-slate-200 bg-slate-50/60 overflow-hidden divide-y divide-slate-100">
                        <div className="flex items-center justify-between gap-3 px-4 py-3"><span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest shrink-0">Service</span><span className="text-[13px] font-bold text-slate-800 text-right">{serviceType}</span></div>
                        <div className="flex items-center justify-between gap-3 px-4 py-3"><span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest shrink-0">Distance</span><span className="text-[13px] font-bold text-slate-800 text-right">{distance?.toFixed(1)} miles{durationMinutes !== null ? ` · ${formatDuration(durationMinutes)}` : ""}</span></div>
                        <div className="flex items-start justify-between gap-3 px-4 py-3"><span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest shrink-0 mt-0.5">Pickup</span><span className="text-[13px] font-semibold text-slate-800 text-right leading-snug">{formData.pickupAddress}</span></div>
                        {formData.intermediateStops.map((stop, index) => <div key={`${stop.address}-${index}`} className="flex items-start justify-between gap-3 px-4 py-3"><span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest shrink-0 mt-0.5">Stop {index + 1}</span><span className="text-[13px] font-semibold text-slate-800 text-right leading-snug">{stop.address}</span></div>)}
                        <div className="flex items-start justify-between gap-3 px-4 py-3"><span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest shrink-0 mt-0.5">Dropoff</span><span className="text-[13px] font-semibold text-slate-800 text-right leading-snug">{formData.dropoffAddress}</span></div>
                        {formData.vehicleType && <div className="flex items-center justify-between gap-3 px-4 py-3"><span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest shrink-0">Vehicle</span><span className="text-[13px] font-bold text-slate-800 text-right">{formData.vehicleType}{formData.vehicleCount ? ` × ${formData.vehicleCount}` : ""}</span></div>}
                        {formData.pickupDate && <div className="flex items-center justify-between gap-3 px-4 py-3"><span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest shrink-0">When</span><span className="text-[13px] font-bold text-slate-800 text-right">{new Date(formData.pickupDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}{formData.pickupTime && ` · ${formData.pickupTime}`}</span></div>}
                        {hasAnyAddon && (
                          <div className="flex items-start justify-between gap-3 px-4 py-3"><span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest shrink-0 mt-1">Add-ons</span><div className="flex flex-wrap gap-1.5 justify-end">
                            {formData.hasStairs && <span className="text-[11px] font-bold px-2.5 py-1 bg-white text-slate-600 rounded-lg border border-slate-200">Stairs{(parseInt(formData.stairsFlights) || 1) > 1 ? ` ×${parseInt(formData.stairsFlights)}` : ""}</span>}
                            {formData.needsInsideDelivery && <span className="text-[11px] font-bold px-2.5 py-1 bg-white text-slate-600 rounded-lg border border-slate-200">{widgetSettings.insideDeliveryLabel || "Inside delivery"}</span>}
                            {formData.needsAddon3 && <span className="text-[11px] font-bold px-2.5 py-1 bg-white text-slate-600 rounded-lg border border-slate-200">{widgetSettings.addon3Label || "Add-on"}</span>}
                            {formData.selectedLargeItems.map((item) => <span key={item} className="text-[11px] font-bold px-2.5 py-1 bg-white text-slate-600 rounded-lg border border-slate-200">{item}</span>)}
                          </div></div>
                        )}
                        {visibleCustomQuestions(customQuestions, formData.customAnswers).map((question) => {
                          const answer = formData.customAnswers?.[question.id];
                          if (!answer || (Array.isArray(answer) && answer.length === 0)) return null;
                          return <div key={question.id} className="flex items-start justify-between gap-3 px-4 py-3">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{question.label}</span>
                            <span className="text-[13px] font-semibold text-slate-800 text-right">{Array.isArray(answer) ? answer.join(", ") : answer}</span>
                          </div>;
                        })}
                      </div>
                      <div className="flex items-center justify-between px-1"><span className="text-sm font-semibold text-slate-500">Total</span><span className="text-3xl font-black text-slate-900 tracking-tight tabular-nums">${estimate?.toFixed(2)}</span></div>
                      {checkoutUrl && <a href={checkoutUrl} target="_top" className="inline-flex px-6 py-4 rounded-xl text-white font-bold" style={{ backgroundColor: primaryColor }}>Continue to secure payment</a>}
                      {error && <div className="text-xs text-red-600 font-semibold bg-red-50 p-4 rounded-2xl border border-red-100 flex items-start gap-2"><span className="shrink-0 mt-0.5">⚠️</span> {error}</div>}
                      <div className="space-y-3 pt-1">
                        <button type="button" onClick={() => submitQuote()} disabled={loading} data-qalt-brand-cta
                          className="w-full py-4 rounded-2xl text-white font-bold text-sm shadow-lg active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-50 relative overflow-hidden group"
                          style={{ backgroundColor: primaryColor, boxShadow: `0 8px 24px -4px ${primaryColor}55` }}>
                          <span className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" /><span className="relative flex items-center gap-2">{loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Preparing checkout...</> : <><Lock size={15} /> Continue to secure payment</>}</span>
                        </button>
                        <button type="button" onClick={backToEdit} className="w-full py-3 text-slate-400 font-bold text-[11px] uppercase tracking-[0.15em] hover:text-slate-600 transition-all">← Edit details</button>
                        <p className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-400"><ShieldCheck size={13} className="text-emerald-500" /> Payments secured by Stripe</p>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="py-8 text-center space-y-5">
                      <div className="w-20 h-20 bg-linear-to-br from-emerald-100 to-teal-100 text-emerald-600 rounded-[20px] flex items-center justify-center mx-auto shadow-lg shadow-emerald-100"><CheckCircle size={36} stroke="#047857" strokeWidth={2.5} aria-hidden="true" data-qalt-success-icon /></div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Your quote is ready</h3>
                        <p className="text-sm text-slate-500 mt-3 leading-relaxed px-2 font-medium">Thanks, <strong className="text-slate-700">{formData.customerName}</strong>. Your delivery estimate from {widgetSettings.companyNameText || company.name} is <strong className="text-emerald-600">{estimate !== null ? money(estimate) : "available below"}</strong>.</p>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">Your quote has been saved. This is an estimate. Your delivery is not booked yet.</p>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">{quoteReceipt?.emailSent ? <>A copy of your quote has been sent to <strong>{formData.customerEmail}</strong>.</> : "We couldn’t email your copy. You can keep the details below for your records."}</p>
                      </div>
                      <section aria-label="Saved quote details" className="rounded-2xl border border-slate-200 bg-slate-50 text-left p-4 space-y-3 text-sm">
                        {quoteReceipt && <p className="text-xs text-slate-500 break-all">Quote reference: {quoteReceipt.id}</p>}
                        <dl className="space-y-3 text-slate-700">
                          <div><dt className="text-xs font-bold text-slate-500">Service</dt><dd>{serviceType}</dd></div>
                          {quoteReceipt?.deliveryWindow && <div><dt className="text-xs font-bold text-slate-500">Delivery window</dt><dd>{quoteReceipt.deliveryWindow}</dd></div>}
                          <div><dt className="text-xs font-bold text-slate-500">Pickup</dt><dd className="break-words">{formData.pickupAddress}</dd></div>
                          {formData.intermediateStops.map((stop, index) => <div key={index}><dt className="text-xs font-bold text-slate-500">Stop {index + 1}</dt><dd className="break-words">{stop.address}</dd></div>)}
                          <div><dt className="text-xs font-bold text-slate-500">Dropoff</dt><dd className="break-words">{formData.dropoffAddress}</dd></div>
                          {formData.pickupDate && <div><dt className="text-xs font-bold text-slate-500">Requested pickup</dt><dd>{formData.pickupDate}{formData.pickupTime && ` · ${formData.pickupTime}`}</dd></div>}
                          {formData.vehicleType && <div><dt className="text-xs font-bold text-slate-500">Vehicle</dt><dd>{formData.vehicleType}{formData.vehicleCount && ` × ${formData.vehicleCount}`}</dd></div>}
                          {distance !== null && <div><dt className="text-xs font-bold text-slate-500">Distance</dt><dd>{distance.toFixed(1)} miles</dd></div>}
                          {visibleCustomQuestions(customQuestions, formData.customAnswers).map((question) => {
                            const answer = formData.customAnswers?.[question.id];
                            return answer && answer.length > 0 ? <div key={question.id}><dt className="text-xs font-bold text-slate-500">{question.label}</dt><dd className="break-words">{Array.isArray(answer) ? answer.join(", ") : answer}</dd></div> : null;
                          })}
                        </dl>
                        {priceRows.length > 0 && <div className="border-t border-slate-200 pt-3 space-y-2 text-slate-700">
                          <h4 className="font-bold">Price breakdown</h4>
                          {priceRows.map((row, index) => <div key={`${row.key}-${index}`} className="flex justify-between gap-3"><span>{row.label}</span><span className="shrink-0 tabular-nums">{money(row.amount)}</span></div>)}
                        </div>}
                        <div className="border-t border-slate-200 pt-3 flex justify-between gap-3 font-bold text-slate-900"><span>Estimated total</span><span className="tabular-nums">{estimate !== null && money(estimate)}</span></div>
                      </section>
                      <div className="space-y-3 pt-2">
                        {!demoMode && parentUrl && (() => { let hostname = ""; try { hostname = new URL(parentUrl).hostname.replace(/^www\./, ""); } catch { hostname = ""; } return hostname ? <a href={parentUrl} className="w-full py-4 rounded-2xl text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2.5 transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]" style={{ backgroundColor: primaryColor, boxShadow: `0 8px 24px -4px ${primaryColor}55` }}><ArrowLeft size={16} />Back to {hostname}</a> : null; })()}
                        <button onClick={startNewQuote} className="w-full bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 mx-auto px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105">Start new quote <ArrowRight size={16} /></button>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="py-10 text-center space-y-6">
                      <div className="w-20 h-20 rounded-[20px] flex items-center justify-center mx-auto shadow-lg" style={{ backgroundColor: `${primaryColor}15` }}><div className="w-10 h-10 border-4 rounded-full animate-spin" style={{ borderColor: `${primaryColor}33`, borderTopColor: primaryColor }} /></div>
                      <div><h3 className="text-2xl font-black text-slate-900 tracking-tight">{checkoutUrl ? "Your checkout is ready" : "Preparing secure payment"}</h3><p className="text-sm text-slate-500 mt-2 leading-relaxed px-4 font-medium">Continue to Stripe to pay securely.</p><p className="text-xs text-slate-400 mt-3">Quote total: <strong className="text-slate-600">${estimate?.toFixed(2)}</strong></p></div>
                      {checkoutUrl && <a href={checkoutUrl} target="_top" className="inline-flex px-6 py-4 rounded-xl text-white font-bold" style={{ backgroundColor: primaryColor }}>Continue to secure payment</a>}
                      {error && <div className="text-xs text-red-600 font-semibold bg-red-50 p-4 rounded-2xl border border-red-100 flex items-start gap-2"><span className="shrink-0">⚠️</span><div><p>{error}</p><button onClick={backToEdit} className="mt-2 underline text-red-700">Go back and try again</button></div></div>}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          <div className={`${quickMode ? "px-8 py-4 bg-white border-t border-slate-100" : "px-8 py-5 bg-slate-50/80 border-t border-slate-100/80"}`}>
            <p className="text-[10px] text-slate-400 text-center leading-relaxed font-medium">{widgetSettings.disclaimerText}</p>
            <p className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] font-semibold text-slate-400">
              <span className="inline-flex items-center gap-1"><Lock size={10} className="text-emerald-500" aria-hidden="true" /> Encrypted connection</span>
              {widgetSettings.paymentsEnabled && <span className="inline-flex items-center gap-1"><ShieldCheck size={10} className="text-emerald-500" aria-hidden="true" /> Card payments by Stripe</span>}
            </p>
            {!demoMode && parentUrl && step !== 3 && (() => { let hostname = ""; try { hostname = new URL(parentUrl).hostname.replace(/^www\./, ""); } catch { hostname = ""; } return hostname ? <a href={parentUrl} className="mt-3 flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors group"><ArrowLeft size={11} className="group-hover:-translate-x-0.5 transition-transform" />Back to {hostname}</a> : null; })()}
            {!showWhiteLabel && <a href="https://qalt.site" target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-2 opacity-80 hover:opacity-100 transition-opacity"><span className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.2em] leading-none">Powered by</span><Image src="/images/qalt-logo-main-2026.png" alt="Qalt Logo" width={1080} height={1080} className="h-[75px] w-auto object-contain relative -top-[3.78px] -left-[7.56px]" /></a>}
          </div>
        </div>

        {showSideMap && (
          <div className="hidden md:flex min-w-0 flex-col flex-1 min-h-[500px] animate-in slide-in-from-left-4 fade-in duration-700 bg-slate-50 relative border-l border-slate-100">
            <div className="relative flex-1 min-h-[320px]"><div className="absolute inset-0"><RouteMapDisplay pickupAddress={formData.pickupAddress} intermediateStops={formData.intermediateStops} dropoffAddress={formData.dropoffAddress} isLoaded={isLoaded} onRouteInfo={(info) => setRouteInfo(info)} /></div><div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/20 text-[10px] uppercase font-black text-slate-800 tracking-[0.15em] flex items-center gap-2 z-10"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />Route Overview</div></div>
            <div className="bg-white p-5 border-t border-slate-100 relative z-10 space-y-4">
              <div className="grid grid-cols-2 gap-3 pb-4 border-b border-slate-100">
                <div className="space-y-0.5"><span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><Navigation size={9} /> Distance</span><p className="text-sm font-black text-slate-900 tracking-tight">{routeInfo?.distance || `${distance?.toFixed(1)} mi`}</p></div>
                <div className="space-y-0.5"><span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><Clock size={9} /> Drive Time</span><p className="text-sm font-black text-slate-900 tracking-tight">{routeInfo?.duration || (durationMinutes !== null ? formatDuration(durationMinutes) : "N/A")}</p></div>
              </div>
              <div className="pt-3 space-y-2">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] mb-3">Shipment Details</p>
                {formData.serviceType && <div className="flex items-center justify-between gap-2 pb-1"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Service</span><span className="text-[11px] font-extrabold text-slate-700 text-right">{formData.serviceType}</span></div>}
                <div className="flex items-start gap-2.5"><div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0"><MapPin size={10} className="text-emerald-600" /></div><div className="flex-1 min-w-0"><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">From</p><p className="text-[11px] font-extrabold text-slate-700 leading-tight">{formData.pickupAddress}</p></div></div>
                <div className="ml-[9px] w-px h-3 bg-slate-200" />
                {formData.intermediateStops.map((stop, index) => <div key={`${stop.address}-${index}`} className="contents"><div className="flex items-start gap-2.5"><div className="mt-0.5 w-5 h-5 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center shrink-0"><span className="text-[8px] font-black text-slate-500">{index + 1}</span></div><div className="flex-1 min-w-0"><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Stop {index + 1}</p><p className="text-[11px] font-extrabold text-slate-700 leading-tight">{stop.address}</p></div></div><div className="ml-[9px] w-px h-3 bg-slate-200" /></div>)}
                <div className="flex items-start gap-2.5"><div className="mt-0.5 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0"><MapPin size={10} className="text-red-500" /></div><div className="flex-1 min-w-0"><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">To</p><p className="text-[11px] font-extrabold text-slate-700 leading-tight">{formData.dropoffAddress}</p></div></div>
                {formData.pickupDate && <div className="flex items-center gap-2.5 pt-1"><div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0"><Clock size={10} className="text-red-600" /></div><div><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Pickup Date &amp; Time</p><p className="text-[11px] font-extrabold text-slate-700">{new Date(formData.pickupDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}{formData.pickupTime && ` · ${formData.pickupTime}`}</p></div></div>}
                {(formData.packageWeight || formData.itemCount || formData.vehicleCount) && <div className="flex flex-wrap items-start gap-x-5 gap-y-2 pt-1">
                  {formData.packageWeight && <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0"><Weight size={10} className="text-slate-500" /></div><div><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Weight</p><p className="text-[11px] font-extrabold text-slate-700">{formData.packageWeight} lbs</p>{priced("weight") && <p className="text-[10px] font-bold text-emerald-600 tabular-nums">{priced("weight")}</p>}</div></div>}
                  {formData.itemCount && <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0"><Hash size={10} className="text-slate-500" /></div><div><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Items</p><p className="text-[11px] font-extrabold text-slate-700">{formData.itemCount}</p>{priced("items") && <p className="text-[10px] font-bold text-emerald-600 tabular-nums">{priced("items")}</p>}</div></div>}
                  {formData.vehicleCount && <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0"><Truck size={10} className="text-slate-500" /></div><div><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Vehicles</p><p className="text-[11px] font-extrabold text-slate-700">{formData.vehicleCount}</p>{priced("vehicles") && <p className="text-[10px] font-bold text-emerald-600 tabular-nums">{priced("vehicles")}</p>}</div></div>}
                </div>}
                {(formData.hasStairs || formData.needsInsideDelivery || formData.needsAddon3) && <div className="pt-2 space-y-1.5"><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Add-ons</p><div className="space-y-1">
                  {formData.hasStairs && <div className="flex items-center justify-between gap-2"><span className="text-[11px] font-bold text-slate-600">Stairs{(parseInt(formData.stairsFlights) || 1) > 1 ? ` ×${parseInt(formData.stairsFlights)}` : ""}</span>{priced("stairs") && <span className="text-[11px] font-bold text-emerald-600 tabular-nums shrink-0">{priced("stairs")}</span>}</div>}
                  {formData.needsInsideDelivery && <div className="flex items-center justify-between gap-2"><span className="text-[11px] font-bold text-slate-600">{widgetSettings.insideDeliveryLabel || "Inside delivery"}</span>{priced("insideDelivery") && <span className="text-[11px] font-bold text-emerald-600 tabular-nums shrink-0">{priced("insideDelivery")}</span>}</div>}
                  {formData.needsAddon3 && <div className="flex items-center justify-between gap-2"><span className="text-[11px] font-bold text-slate-600">{widgetSettings.addon3Label || "Add-on"}</span>{priced("addon3") && <span className="text-[11px] font-bold text-emerald-600 tabular-nums shrink-0">{priced("addon3")}</span>}</div>}
                </div></div>}
                {formData.selectedLargeItems.length > 0 && <div className="pt-2 space-y-1.5"><p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Large items</p><div className="space-y-1">{formData.selectedLargeItems.map((item) => <div key={item} className="flex items-center justify-between gap-2"><span className="text-[11px] font-bold text-slate-600">{item}</span>{priced(`large:${item}`) && <span className="text-[11px] font-bold text-emerald-600 tabular-nums shrink-0">{priced(`large:${item}`)}</span>}</div>)}</div></div>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
