"use client";

import { useState, useEffect } from "react";
import QaltIcon from "@/components/shared/QaltIcon";
import { Copy, Check, ExternalLink } from "lucide-react";

export default function EmbedCodePage() {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCompany() {
      try {
        const res = await fetch("/api/dashboard/widget");
        const data = await res.json();
        if (data.id) {
          setCompanyId(data.id);
        }
      } catch (err) {
        console.error("Failed to fetch company", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCompany();
  }, []);

  const widgetUrl = companyId ? `${window.location.origin}/widget/${companyId}` : "";
  
  const embedCode = `<iframe 
  src="${widgetUrl}" 
  width="100%" 
  height="700px" 
  frameborder="0"
  style="border-radius: 24px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);"
></iframe>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <header className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Add Qalt to Your Website</h1>
          <p className="text-slate-500 mt-3 text-base sm:text-lg font-medium">Capture more leads by embedding your smart calculator anywhere.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Your Embed Code</h2>
                <button 
                  onClick={copyToClipboard}
                  className={`
                    flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95
                    ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'}
                  `}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy Snippet'}
                </button>
              </div>
              
              <div className="relative group">
                <pre className="bg-slate-900 text-slate-300 p-8 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed ring-1 ring-slate-800 shadow-2xl">
                  <code className="text-blue-400">
                    {embedCode}
                  </code>
                </pre>
              </div>
              
              <div className="mt-8 flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <ExternalLink size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Direct Link</p>
                    <p className="text-xs text-slate-500">{widgetUrl}</p>
                  </div>
                </div>
                <a 
                  href={widgetUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
                >
                  Preview
                </a>
              </div>
            </div>

            <div className="bg-blue-50 rounded-[32px] p-10 border border-blue-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none scale-150">
                 <QaltIcon size={120} />
               </div>
               <h3 className="text-xl font-black text-blue-900 mb-6">Installation Guide</h3>
               <ul className="space-y-6">
                 <li className="flex gap-6">
                   <span className="shrink-0 w-8 h-8 bg-blue-600 text-white text-xs font-black rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">1</span>
                   <div>
                     <p className="font-bold text-blue-900">Copy the snippet</p>
                     <p className="text-sm text-blue-800/60 mt-1">Use the black copy button above to grab your unique widget code.</p>
                   </div>
                 </li>
                 <li className="flex gap-6">
                   <span className="shrink-0 w-8 h-8 bg-blue-600 text-white text-xs font-black rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">2</span>
                   <div>
                     <p className="font-bold text-blue-900">Paste in your editor</p>
                     <p className="text-sm text-blue-800/60 mt-1">Navigate to your website builder (WordPress, Webflow, Shopify) and add an HTML element.</p>
                   </div>
                 </li>
                 <li className="flex gap-6">
                   <span className="shrink-0 w-8 h-8 bg-blue-600 text-white text-xs font-black rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">3</span>
                   <div>
                     <p className="font-bold text-blue-900">Publish & Go Live</p>
                     <p className="text-sm text-blue-800/60 mt-1">Save your changes. Your Qalt calculator is now ready to capture leads!</p>
                   </div>
                 </li>
               </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Need help?</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-8">Not sure where to paste the code? Our engineering team can help you get it installed in minutes.</p>
              <button className="w-full py-4 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                Contact Technical Support
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}
