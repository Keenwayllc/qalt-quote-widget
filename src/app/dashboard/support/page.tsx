"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import SupportModal from "@/components/shared/SupportModal";

const faqs = [
  {
    category: "Installation",
    items: [
      {
        q: "My widget isn't showing on my site,what should I check?",
        a: "First, confirm the embed code is pasted inside an HTML block (not a text/paragraph block). Most builders (WordPress, Webflow, Shopify) have a dedicated 'Custom HTML' or 'Embed' element,use that. Also check your browser console for any Content Security Policy (CSP) errors, which may block iframes from external domains.",
      },
      {
        q: "The widget loads but looks cut off or too small.",
        a: "The iframe needs a minimum height of 700px to display correctly. Check that the height attribute in your embed code hasn't been changed. If your page has a max-width container, make sure it's at least 360px wide. You can also adjust the height in your embed code to a larger value like 800px.",
      },
      {
        q: "How do I update my embed code after making changes?",
        a: "You don't need to,your embed code never changes. Any updates you make to your widget appearance, pricing, or settings in the dashboard automatically apply to the embedded widget. Just save your changes and refresh the page where it's embedded.",
      },
    ],
  },
  {
    category: "Styling & Appearance",
    items: [
      {
        q: "The widget style is conflicting with my website's CSS.",
        a: "The Qalt widget runs inside an iframe which isolates it from your site's CSS,so true style conflicts are rare. If you're seeing layout issues, it's most likely a container width or height problem. Wrap the iframe in a div and set width: 100%; overflow: hidden; on that wrapper.",
      },
      {
        q: "Can I change the widget colors to match my brand?",
        a: "Yes,go to Dashboard → Widget Appearance. You can set a primary color, upload a logo, add a background image, and customize the header and button text. Changes take effect immediately on your live widget.",
      },
      {
        q: "The widget looks different on mobile than desktop.",
        a: "The widget is fully responsive but needs enough horizontal space to render correctly. Use the Desktop / Mobile toggle on the Get Embed Code page to preview both views. If mobile looks off, try setting the iframe width to 100% and testing in a real mobile browser.",
      },
    ],
  },
  {
    category: "Quotes & Notifications",
    items: [
      {
        q: "I'm not receiving email notifications when a quote is submitted.",
        a: "Go to Dashboard → Account Settings and confirm your notification email is correct, then send a test email to verify delivery. Check your spam/junk folder. If the test email doesn't arrive, contact support and we'll investigate the mail delivery.",
      },
      {
        q: "What does the quote limit mean on the Starter plan?",
        a: "The Starter plan allows up to 25 quote requests per month. Once you hit that limit, new customers will still see your widget but won't be able to submit a quote until the next billing cycle or until you upgrade. Upgrade to Pro for unlimited quotes.",
      },
      {
        q: "Can I see who submitted a quote and respond to them?",
        a: "Yes,go to Dashboard → Quotes to see all submitted quote requests with customer name, email, pickup/dropoff location, and estimated price. You can add internal notes to each quote. Direct email reply to the customer from the dashboard is on our roadmap.",
      },
    ],
  },
  {
    category: "Account & Billing",
    items: [
      {
        q: "How do I upgrade or downgrade my plan?",
        a: "Go to Dashboard → Subscription. You can upgrade, downgrade, or cancel at any time. Upgrades take effect immediately. Downgrades take effect at the end of your current billing period.",
      },
      {
        q: "What happens to my data if I cancel?",
        a: "Your data (quotes, widget settings, pricing) is retained for 30 days after cancellation. During that window you can reactivate your account without losing anything. After 30 days, data is permanently deleted.",
      },
      {
        q: "Can I use Qalt on multiple websites?",
        a: "Your embed code works on any number of websites,there's no domain restriction. Pro plan users can create up to 5 separate widget forms with different branding and pricing. Enterprise users get unlimited forms.",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <span className="text-sm font-bold text-slate-900 pr-4">{q}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 bg-white">
          <p className="text-sm text-slate-600 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function SupportPage() {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  return (
    <>
      <div className="p-4 sm:p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Help & FAQ</h1>
          <p className="text-slate-500 mt-1 font-medium">
            Answers to the most common questions about installing and using Qalt.
          </p>
        </div>

        <div className="space-y-10">
          {faqs.map((section) => (
            <div key={section.category}>
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle size={16} className="text-red-500" />
                <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  {section.category}
                </h2>
              </div>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still need help CTA */}
        <div className="mt-12 bg-slate-900 rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
              <MessageCircle size={18} className="text-white" />
            </div>
            <div>
              <p className="text-white font-black text-base">Still need help?</p>
              <p className="text-slate-400 text-sm font-medium mt-0.5">
                Can't find your answer above? Our team typically responds within a few hours.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="shrink-0 px-6 py-3 bg-red-600 text-white rounded-xl font-black text-sm hover:bg-red-500 transition-all shadow-lg whitespace-nowrap"
          >
            Contact Support →
          </button>
        </div>
      </div>

      <SupportModal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} />
    </>
  );
}
