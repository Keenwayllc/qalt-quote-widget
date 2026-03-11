"use client";

import { useState } from "react";
import Image from "next/image";
import { Calculator, MapPin, Package, CheckCircle, ArrowRight, User, Mail, Phone } from "lucide-react";

interface WidgetProps {
  company: {
    id: string;
    name: string;
    pricingProfile: Record<string, unknown>;
    widgetSettings: {
      primaryColor: string;
      headerText: string;
      buttonText: string;
      showWeight: boolean;
      showExtras: boolean;
      disclaimerText: string;
    };
  };
}

interface FormData {
  pickupZip: string;
  dropoffZip: string;
  hasStairs: boolean;
  needsInsideDelivery: boolean;
  isAfterHours: boolean;
  isLargeItem: boolean;
  packageWeight: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export default function QuoteWidgetForm({ company }: WidgetProps) {
  const { widgetSettings } = company;
  const [step, setStep] = useState(1); // 1: Route/Extras, 2: Info/Estimate, 3: Success
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    pickupZip: "",
    dropoffZip: "",
    hasStairs: false,
    needsInsideDelivery: false,
    isAfterHours: false,
    isLargeItem: false,
    packageWeight: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const getEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/widget/${company.id}/estimate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickupZip: formData.pickupZip,
          dropoffZip: formData.dropoffZip,
          extras: {
            hasStairs: formData.hasStairs,
            needsInsideDelivery: formData.needsInsideDelivery,
            isAfterHours: formData.isAfterHours,
            isLargeItem: formData.isLargeItem,
          }
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setEstimate(data.estimate);
        setDistance(data.distance);
        setStep(2);
      } else {
        setError(data.error || "Could not calculate estimate. Please check your ZIP codes.");
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

  return (
    <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden font-sans">
      {/* Header */}
      <div 
        className="p-6 text-white"
        style={{ backgroundColor: widgetSettings.primaryColor }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Calculator size={20} className="text-white" />
          </div>
          <h2 className="text-lg font-bold tracking-tight">{widgetSettings.headerText}</h2>
        </div>
        <p className="text-blue-50 text-xs font-medium opacity-90">{company.name}</p>
      </div>

      <div className="p-6">
        {step === 1 && (
          <form onSubmit={getEstimate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5 ml-1">
                  <MapPin size={10} /> Pickup ZIP
                </label>
                <input
                  type="text"
                  name="pickupZip"
                  required
                  placeholder="00000"
                  value={formData.pickupZip}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5 ml-1">
                  <MapPin size={10} /> Dropoff ZIP
                </label>
                <input
                  type="text"
                  name="dropoffZip"
                  required
                  placeholder="00000"
                  value={formData.dropoffZip}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            {widgetSettings.showWeight && (
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5 ml-1">
                  <Package size={10} /> Package weight (lb)
                </label>
                <input
                  type="number"
                  name="packageWeight"
                  placeholder="0"
                  value={formData.packageWeight}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            )}

            {widgetSettings.showExtras && (
              <div className="space-y-3 pt-2">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider ml-1">Extra Services</p>
                <div className="grid grid-cols-2 gap-2">
                   {(['hasStairs', 'needsInsideDelivery', 'isAfterHours', 'isLargeItem'] as const).map((id) => {
                    const labels: Record<string, string> = {
                      hasStairs: 'Stairs',
                      needsInsideDelivery: 'Inside',
                      isAfterHours: 'After Hours',
                      isLargeItem: 'Large Item'
                    };
                    return (
                      <label 
                        key={id}
                        className={`
                          flex items-center gap-2 p-2 border rounded-xl cursor-pointer transition-all
                          ${formData[id] ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'}
                        `}
                      >
                        <input
                          type="checkbox"
                          name={id}
                          checked={formData[id]}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        <span className={`text-[11px] font-semibold ${formData[id] ? 'text-blue-700' : 'text-slate-600'}`}>
                          {labels[id]}
                        </span>
                      </label>
                    );
                   })}
                </div>
              </div>
            )}

            {error && <p className="text-xs text-red-500 font-medium bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl text-white font-bold text-sm shadow-lg shadow-blue-200 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ backgroundColor: widgetSettings.primaryColor }}
            >
              {loading ? "Calculating..." : widgetSettings.buttonText}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={submitQuote} className="space-y-5">
             <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-center">
                <p className="text-[10px] uppercase font-extrabold text-emerald-600 tracking-widest mb-1">Estimated Rate</p>
                <p className="text-4xl font-black text-emerald-700">${estimate?.toFixed(2)}</p>
                <p className="text-[11px] text-emerald-600/70 mt-1 font-medium">{distance?.toFixed(1)} miles total distance</p>
             </div>

             <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5 ml-1">
                    <User size={10} /> Full Name
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    required
                    placeholder="John Doe"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5 ml-1">
                    <Mail size={10} /> Email
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    required
                    placeholder="john@example.com"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5 ml-1">
                    <Phone size={10} /> Phone
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    required
                    placeholder="(555) 000-0000"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
             </div>

             {error && <p className="text-xs text-red-500 font-medium bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>}

             <div className="flex flex-col gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl text-white font-bold text-sm bg-emerald-600 shadow-lg shadow-emerald-100 hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Book Shipment"}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full py-3 text-slate-400 font-bold text-[11px] uppercase tracking-widest hover:text-slate-600 transition-all"
                >
                  Edit Details
                </button>
             </div>
          </form>
        )}

        {step === 3 && (
          <div className="py-10 text-center space-y-4">
             <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} />
             </div>
             <h3 className="text-xl font-black text-slate-900">Quote Submitted!</h3>
             <p className="text-slate-500 px-4">
                Thank you, <strong>{formData.customerName}</strong>. {company.name} has received your request and will contact you shortly regarding your <strong>${estimate?.toFixed(2)}</strong> estimate.
             </p>
             <button
               onClick={() => {
                 setStep(1);
                 setFormData(prev => ({ ...prev, pickupZip: "", dropoffZip: "", customerName: "", customerEmail: "", customerPhone: "" }));
               }}
               className="mt-8 font-bold text-blue-600 hover:text-blue-700 flex items-center gap-2 mx-auto"
               style={{ color: widgetSettings.primaryColor }}
             >
                Start New Quote <ArrowRight size={18} />
             </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-100">
         <p className="text-[10px] text-slate-400 text-center leading-tight">
           {widgetSettings.disclaimerText}
         </p>
          <div className="mt-4 flex items-center justify-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all cursor-default">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Powered By</span>
            <Image src="/images/qalt.png" alt="Qalt" width={80} height={24} className="h-6 w-auto grayscale opacity-70" />
          </div>
       </div>
    </div>
  );
}
