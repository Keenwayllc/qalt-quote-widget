"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, Save, Eye, Upload, Image as ImageIcon, RotateCcw } from "lucide-react";

import Image from "next/image";

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
      backgroundImageUrl?: string | null;
    };
  };
}

export default function WidgetSettingsForm({ 
  initialData, 
  companyLogoUrl 
}: { 
  initialData: WidgetProps['company']['widgetSettings'];
  companyLogoUrl?: string | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState(initialData);
  const [logo, setLogo] = useState(companyLogoUrl || "");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'background') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        if (type === 'logo') {
          setLogo(data.url);
        } else {
          setPreviewData(prev => ({ ...prev, backgroundImageUrl: data.url }));
        }
      } else {
        setErrorStatus(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setErrorStatus("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    setErrorStatus(null);

    try {
      const [resWidget, resProfile] = await Promise.all([
        fetch("/api/dashboard/widget", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(previewData),
        }),
        fetch("/api/dashboard/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ logoUrl: logo }),
        })
      ]);

      const data = await resWidget.json();

      if (resWidget.ok && resProfile.ok) {
        setMessage({ type: "success", text: "Widget settings updated!" });
        router.refresh();
      } else {
        setErrorStatus(data.error || "Failed to update settings.");
      }
    } catch {
      setErrorStatus("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setPreviewData(prev => ({ ...prev, [name]: val }));
  };

  return (
    <div className="p-8 max-w-6xl flex flex-col lg:flex-row gap-12">
      <div className="flex-1">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Widget Appearance</h1>
          <p className="text-slate-500">Customize how your quote calculator looks on your website.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Settings className="text-blue-600" size={20} />
              Visual Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Uploads */}
              <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-slate-50 border border-slate-100 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company Logo</label>
                  <div className="flex items-center gap-4">
                    {logo ? (
                      <div className="relative w-12 h-12">
                        <Image src={logo} alt="Logo" fill className="object-contain bg-white rounded-lg border border-slate-200" unoptimized />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center">
                        <ImageIcon size={20} className="text-slate-300" />
                      </div>
                    )}
                    <label className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                      <Upload size={16} />
                      Upload Logo
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo')} />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Widget Background</label>
                  <div className="flex items-center gap-4">
                    {previewData.backgroundImageUrl ? (
                      <div className="w-24 h-12 rounded-lg border border-slate-200 bg-cover bg-center" style={{ backgroundImage: `url(${previewData.backgroundImageUrl})` }} />
                    ) : (
                      <div className="w-24 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center">
                        <ImageIcon size={20} className="text-slate-300" />
                      </div>
                    )}
                    <label className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                      <Upload size={16} />
                      Upload Background
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'background')} />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="primaryColor" className="block text-sm font-medium text-slate-700 mb-1">Primary Brand Color (Hex)</label>
                <div className="flex gap-2">
                  <div 
                    className="relative w-10 h-10 rounded-lg border border-slate-200 shrink-0 overflow-hidden cursor-pointer" 
                    style={{ backgroundColor: previewData.primaryColor }}
                  >
                     <input
                      type="color"
                      name="primaryColor"
                      value={previewData.primaryColor.length === 7 && previewData.primaryColor.startsWith('#') ? previewData.primaryColor : '#3B82F6'}
                      onChange={handleChange}
                      className="absolute inset-[-10px] w-20 h-20 opacity-0 cursor-pointer"
                      title="Pick a color"
                     />
                  </div>
                  <input
                    id="primaryColor"
                    name="primaryColor"
                    type="text"
                    required
                    placeholder="#3B82F6"
                    value={previewData.primaryColor}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm uppercase"
                    style={{ '--tw-ring-color': previewData.primaryColor } as React.CSSProperties}
                  />
                  <button
                    type="button"
                    onClick={() => setPreviewData((prev) => ({ ...prev, primaryColor: '#3B82F6' }))}
                    className="shrink-0 flex items-center justify-center px-3 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                    title="Reset to default color"
                  >
                     <RotateCcw size={18} />
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="buttonText" className="block text-sm font-medium text-slate-700 mb-1">Button Text</label>
                <input
                  id="buttonText"
                  name="buttonText"
                  type="text"
                  required
                  value={previewData.buttonText}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="headerText" className="block text-sm font-medium text-slate-700 mb-1">Header Title</label>
              <input
                id="headerText"
                name="headerText"
                type="text"
                required
                value={previewData.headerText}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="disclaimerText" className="block text-sm font-medium text-slate-700 mb-1">Disclaimer Text</label>
              <textarea
                id="disclaimerText"
                name="disclaimerText"
                rows={3}
                value={previewData.disclaimerText}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-wrap gap-8">
               <label className="flex items-center gap-3 cursor-pointer">
                 <input
                   name="showWeight"
                   type="checkbox"
                   checked={previewData.showWeight}
                   onChange={handleChange}
                   className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                 />
                 <span className="text-sm font-medium text-slate-700">Show Package Weight field</span>
               </label>
               <label className="flex items-center gap-3 cursor-pointer">
                 <input
                   name="showExtras"
                   type="checkbox"
                   checked={previewData.showExtras}
                   onChange={handleChange}
                   className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                 />
                 <span className="text-sm font-medium text-slate-700">Display Extras (Stairs, etc.)</span>
               </label>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              <Save size={20} />
              {loading ? "Saving..." : "Save Settings"}
            </button>
            
            {message.text && (
              <p className={`text-sm font-semibold ${message.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
                {message.text}
              </p>
            )}
            {errorStatus && (
              <p className="text-sm font-semibold text-red-600">
                {errorStatus}
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Live Preview */}
      <div className="w-full lg:w-96 shrink-0">
        <div className="sticky top-8">
          <div className="mb-4 flex items-center gap-2">
            <Eye className="text-slate-400" size={20} />
            <h2 className="text-lg font-bold text-slate-900">Widget Live Preview</h2>
          </div>
          <div className="bg-white rounded-2xl border-slate-200 shadow-xl overflow-hidden pointer-events-none opacity-80 scale-95 border-dashed border-2">
             <div 
               className="p-6 border-b border-slate-100 flex items-center justify-between bg-cover bg-center relative"
               style={
                 previewData.backgroundImageUrl 
                   ? { backgroundImage: `url(${previewData.backgroundImageUrl})`, minHeight: '100px' } 
                   : { backgroundColor: previewData.primaryColor, minHeight: '100px' }
               }
             >
                {/* Dark overlay if there's a background image to ensure text is readable */}
                {previewData.backgroundImageUrl && (
                  <div className="absolute inset-0 bg-slate-900/40 rounded-t-2xl" />
                )}
               <div className="relative z-10 flex flex-col gap-2">
                 {logo ? (
                   <div className="relative h-8 w-24">
                     <Image src={logo} alt="Logo" fill className="object-contain object-left" unoptimized />
                   </div>
                 ) : (
                   <div className="text-white font-bold opacity-80">Qalt</div>
                 )}
                 <h3 className="font-bold text-white text-xl drop-shadow-md">{previewData.headerText}</h3>
               </div>
             </div>
             <div className="p-6 space-y-4">
               <div>
                  <div className="h-8 bg-slate-100 rounded-md w-full mb-2" />
                  <div className="h-8 bg-slate-100 rounded-md w-full" />
               </div>
               <div className="py-4 border-t border-slate-100">
                  <div className="w-full h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: previewData.primaryColor }}>
                    {previewData.buttonText}
                  </div>
               </div>
               <p className="text-[10px] text-slate-400 text-center leading-tight">
                 {previewData.disclaimerText}
               </p>
             </div>
          </div>
          <p className="mt-4 text-xs text-slate-400 italic text-center">
            Note: This is a simplified preview. The actual widget will be responsive and interactive.
          </p>
        </div>
      </div>
    </div>
  );
}
