"use client";

import { useState, useEffect } from "react";

interface CookiePreferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcceptAll: () => void;
  onBannerDismiss: () => void;
}

const COOKIE_CATEGORIES = [
  { id: "strictlyNecessary", label: "Strictly Necessary Cookies", type: "always" },
  { id: "functional", label: "Functional Cookies", type: "toggle" },
  { id: "performance", label: "Performance Cookies", type: "toggle" },
  { id: "targeting", label: "Targeting Cookies", type: "toggle" },
] as const;

export default function CookiePreferenceModal({ isOpen, onClose, onAcceptAll, onBannerDismiss }: CookiePreferenceModalProps) {
  const [activeTab, setActiveTab] = useState<"privacy" | typeof COOKIE_CATEGORIES[number]["id"]>("privacy");
  const [preferences, setPreferences] = useState({
    functional: false,
    performance: false,
    targeting: false,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      const saved = localStorage.getItem("cookieConsent");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setPreferences({
            functional: !!parsed.functional,
            performance: !!parsed.performance,
            targeting: !!parsed.targeting,
          });
        } catch {
          // Ignore parse errors from old formats
        }
      }
    }
  }, [isOpen]);

  const handleToggle = (id: string) => {
    if (id === "strictlyNecessary") return; // Cannot be toggled
    setPreferences(prev => ({
      ...prev,
      [id]: !prev[id as keyof typeof preferences]
    }));
  };

  const handleConfirmChoices = () => {
    const finalPreferences = {
      strictlyNecessary: true,
      ...preferences
    };
    localStorage.setItem("cookieConsent", JSON.stringify(finalPreferences));
    onClose();
    onBannerDismiss();
  };

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm font-sans" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-[22px] font-bold text-slate-800 tracking-tight">Privacy Preference Center</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors" aria-label="Close modal">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-[400px]">
          
          {/* Sidebar */}
          <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-slate-200 overflow-y-auto p-4 space-y-2">
            <button
              onClick={() => setActiveTab("privacy")}
              className={`w-full text-left px-4 py-3 text-[15px] font-semibold border rounded-sm transition-colors ${
                activeTab === "privacy" 
                  ? "bg-[#E6E9FC] border-[#5e77dca4] text-slate-800" 
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              Your Privacy
            </button>
            
            {COOKIE_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`w-full text-left px-4 py-3 text-[15px] font-semibold border rounded-sm transition-colors ${
                  activeTab === cat.id 
                    ? "bg-[#E6E9FC] border-[#5e77dca4] text-slate-800" 
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="w-full md:w-2/3 p-6 overflow-y-auto">
            {activeTab === "privacy" && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800">Your Privacy</h3>
                <p className="text-[13px] leading-relaxed text-slate-600">
                  When you visit any website, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences or your device and is mostly used to make the site work as you expect it to. The information does not usually directly identify you, but it can give you a more personalized web experience. 
                  <br/><br/>
                  Because we respect your right to privacy, you can choose not to allow some types of cookies. Click on the different category headings to find out more and change our default settings. However, blocking some types of cookies may impact your experience of the site and the services we are able to offer.
                  <br/><br/>
                  <a href="#" className="text-indigo-600 hover:underline">More information</a>
                </p>
              </div>
            )}

            {COOKIE_CATEGORIES.map(cat => (
              activeTab === cat.id && (
                <div key={cat.id} className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800">{cat.label}</h3>
                    
                    {cat.type === "always" ? (
                      <span className="text-sm font-medium text-indigo-700">Always Active</span>
                    ) : (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={preferences[cat.id as keyof typeof preferences]}
                          onChange={() => handleToggle(cat.id)}
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    )}
                  </div>
                  
                  <p className="text-[13px] leading-relaxed text-slate-600 pt-2">
                    {cat.id === "strictlyNecessary" && "These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. These cookies do not store any personally identifiable information."}
                    {cat.id === "functional" && "These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies then some or all of these services may not function properly."}
                    {cat.id === "performance" && "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not know when you have visited our site, and will not be able to monitor its performance."}
                    {cat.id === "targeting" && "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and internet device. If you do not allow these cookies, you will experience less targeted advertising."}
                  </p>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-3 rounded-b-lg">
          <button
            onClick={handleConfirmChoices}
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-md shadow-sm transition-colors"
          >
            Confirm My Choices
          </button>
          <button
            onClick={onAcceptAll}
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-md shadow-sm transition-colors"
          >
            Allow All
          </button>
        </div>
        
      </div>
    </div>
  );
}
