"use client";

import { useState, useEffect } from "react";
import CookiePreferenceModal from "./CookiePreferenceModal";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if consent has already been given
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const preferences = {
      strictlyNecessary: true,
      functional: true,
      performance: true,
      targeting: true,
    };
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!mounted || !isVisible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] font-sans" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1 pr-4 md:pr-8">
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              We use cookies to track visitors, measure ads, ad campaign effectiveness and analyze site traffic. We may also share information about your use of our site with 3rd parties. For more info, see, our <a href="/legal/privacy" className="text-indigo-600 font-semibold hover:underline">Cookie Policy</a> and our <a href="/legal/privacy" className="text-indigo-600 font-semibold hover:underline">Privacy Policy</a>. By clicking on &quot;<button onClick={() => setIsModalOpen(true)} className="text-indigo-600 font-semibold hover:underline">Cookie Preference Manager</button>&quot; you can choose to enable or disable them. By clicking &quot;Accept all&quot; you agree to the storing of all cookies on your device.
            </p>
          </div>
          
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto mt-2 md:mt-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 text-sm font-bold text-slate-700 bg-white border-2 border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors flex-1 md:flex-none"
            >
              Preferences
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-5 py-2.5 text-sm font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex-1 md:flex-none"
            >
              Accept all
            </button>
            <button
              onClick={handleDismiss}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors shrink-0 ml-1 hidden md:block"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <CookiePreferenceModal 
         isOpen={isModalOpen} 
         onClose={() => setIsModalOpen(false)}
         onAcceptAll={handleAcceptAll}
         onBannerDismiss={() => setIsVisible(false)}
      />
    </>
  );
}
