"use client";

import { useState } from "react";
import {
  Palette,
  DollarSign,
  Mail,
  Zap,
  BarChart3,
  Settings,
  HelpCircle,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import SupportModal from "@/components/shared/SupportModal";

const featureCategories = [
  {
    id: "widget-configuration",
    name: "Widget Configuration",
    icon: Palette,
    description: "Customize how your widget looks and feels",
    guides: [
      {
        title: "Upload Logo",
        description:
          "Add your company logo to the quote form header. Improves brand recognition and customer trust.",
        actionLink: "/dashboard/widget",
        actionText: "Go to Widget Settings",
      },
      {
        title: "Customize Colors",
        description:
          "Set the primary color to match your brand. Changes apply instantly to your live widget.",
        actionLink: "/dashboard/widget",
        actionText: "Go to Widget Settings",
      },
      {
        title: "Add Background Image",
        description:
          "Upload a background image to the quote form for visual context about your services.",
        actionLink: "/dashboard/widget",
        actionText: "Go to Widget Settings",
      },
      {
        title: "Edit Widget Text",
        description:
          "Customize the button text and form headers to match your brand voice.",
        actionLink: "/dashboard/widget",
        actionText: "Go to Widget Settings",
      },
    ],
  },
  {
    id: "pricing-quotes",
    name: "Pricing & Quotes",
    icon: DollarSign,
    description: "Configure pricing and organize customer requests",
    guides: [
      {
        title: "Set Pricing Rules",
        description:
          "Configure your base rate per mile, minimum charge, and service extras (stairs, inside delivery, large items).",
        actionLink: "/dashboard/pricing",
        actionText: "Go to Pricing Settings",
      },
      {
        title: "Kanban Quote Board",
        description:
          "Organize quotes by status in a visual board. Drag quotes to track PENDING → CONFIRMED → WON.",
        actionLink: "/dashboard/quotes",
        actionText: "Go to Quotes Board",
      },
      {
        title: "View Quote Details",
        description:
          "See customer info, location, requested date, estimated price, and add internal notes.",
        actionLink: "/dashboard/quotes",
        actionText: "Go to Quotes Board",
      },
    ],
  },
  {
    id: "customer-communication",
    name: "Customer Communication",
    icon: Mail,
    description: "Manage how you communicate with customers",
    guides: [
      {
        title: "Send Test Emails",
        description:
          "Verify your notification emails arrive correctly before deploying the widget.",
        actionLink: "/dashboard/settings",
        actionText: "Go to Account Settings",
      },
      {
        title: "White-Label Email Domain",
        description:
          "Send customer emails from your own domain instead of Qalt's. Requires Pro/Enterprise plan.",
        actionLink: "/dashboard/settings",
        actionText: "Go to Custom Email Domain",
      },
      {
        title: "Email Notifications",
        description:
          "Confirm your notification email is set correctly to receive quote alerts immediately.",
        actionLink: "/dashboard/settings",
        actionText: "Go to Account Settings",
      },
    ],
  },
  {
    id: "advanced-features",
    name: "Advanced Features",
    icon: Zap,
    description: "Power up your workflow with advanced capabilities",
    guides: [
      {
        title: "Geo-Fencing & Service Areas",
        description:
          "Restrict quote requests to specific ZIP codes. Customers outside your service area see a message explaining coverage.",
        actionLink: "/dashboard/widget",
        actionText: "Go to Geo-Fencing Settings",
      },
      {
        title: "Transit Time Estimation",
        description:
          "Automatically calculate and display estimated transit time for each quote based on distance.",
        actionLink: "/dashboard/quotes",
        actionText: "View in Quotes",
      },
      {
        title: "Payment Processing",
        description:
          "Accept customer payments upfront for quotes. Available on Pro/Enterprise plans.",
        actionLink: "/dashboard/settings",
        actionText: "Go to Payment Settings",
      },
      {
        title: "Webhooks & Integrations",
        description:
          "Integrate Qalt with your backend systems to automate quote handling and data sync.",
        actionLink: "/dashboard/webhooks",
        actionText: "Go to Webhooks",
      },
      {
        title: "Multiple Widget Forms",
        description:
          "Create up to 5 separate widgets with different branding and pricing (Pro) or unlimited (Enterprise).",
        actionLink: "/dashboard/forms",
        actionText: "Go to Forms",
      },
    ],
  },
  {
    id: "analytics-reporting",
    name: "Analytics & Reporting",
    icon: BarChart3,
    description: "Understand your quote performance",
    guides: [
      {
        title: "Quote Metrics & Trends",
        description:
          "View total quotes, monthly trends, and quote status breakdown on your dashboard.",
        actionLink: "/dashboard",
        actionText: "Go to Dashboard",
      },
      {
        title: "Service Type Breakdown",
        description:
          "See which services are most requested (standard delivery vs. large item) in a visual chart.",
        actionLink: "/dashboard",
        actionText: "Go to Dashboard",
      },
      {
        title: "Monthly Quota Tracking",
        description:
          "Monitor your monthly quota usage based on your subscription plan in real-time.",
        actionLink: "/dashboard",
        actionText: "Go to Dashboard",
      },
    ],
  },
  {
    id: "account-billing",
    name: "Account & Billing",
    icon: Settings,
    description: "Manage your account and subscription",
    guides: [
      {
        title: "View Your Plan",
        description:
          "See your current plan features, quota limits, and pricing. Understand what's included in your tier.",
        actionLink: "/dashboard/billing",
        actionText: "Go to Subscription",
      },
      {
        title: "Upgrade or Downgrade",
        description:
          "Change plans anytime. Upgrades take effect immediately; downgrades apply at the end of your billing period.",
        actionLink: "/dashboard/billing",
        actionText: "Go to Subscription",
      },
      {
        title: "Billing & Invoices",
        description:
          "View invoice history, manage your payment method, and download receipts.",
        actionLink: "/dashboard/billing",
        actionText: "Go to Billing",
      },
      {
        title: "Account Settings",
        description:
          "Update your company name, email address, and notification preferences.",
        actionLink: "/dashboard/settings",
        actionText: "Go to Account Settings",
      },
      {
        title: "Data Retention & Cancellation",
        description:
          "Your data is retained for 30 days after cancellation. Reactivate within that window to recover everything.",
        actionLink: "/dashboard/billing",
        actionText: "Go to Subscription",
      },
    ],
  },
];

function FeatureGuide({
  title,
  description,
  actionLink,
  actionText,
}: {
  title: string;
  description: string;
  actionLink: string;
  actionText: string;
}) {
  return (
    <div className="border-l-2 border-slate-200 dark:border-white/6 pl-4 py-3">
      <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">
        {title}
      </p>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
        {description}
      </p>
      <a
        href={actionLink}
        className="inline-flex text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors items-center gap-1 group"
      >
        {actionText}
        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
      </a>
    </div>
  );
}

function CategorySection({
  id,
  name,
  icon: Icon,
  description,
  guides,
}: (typeof featureCategories)[0]) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div id={id} className="scroll-mt-20 space-y-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 bg-white dark:bg-[#1e1e1e] border border-slate-200 dark:border-white/6 rounded-none hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3 text-left">
          <Icon size={20} className="text-red-500 shrink-0" />
          <div>
            <h2 className="font-black text-slate-900 dark:text-white text-base">
              {name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              {description}
            </p>
          </div>
        </div>
        <ChevronDown
          size={18}
          className={`text-slate-400 shrink-0 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded && (
        <div className="space-y-4 pl-4">
          {guides.map((guide, idx) => (
            <FeatureGuide
              key={idx}
              title={guide.title}
              description={guide.description}
              actionLink={guide.actionLink}
              actionText={guide.actionText}
            />
          ))}
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
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Feature Reference
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 font-medium">
            Learn about every Qalt feature and how to use it. Each guide includes a direct link to the relevant settings page.
          </p>
        </div>

        {/* Feature Categories */}
        <div className="space-y-6 mb-12">
          {featureCategories.map((category) => (
            <CategorySection key={category.id} {...category} />
          ))}
        </div>

        {/* Still need help CTA */}
        <div className="bg-slate-900 dark:bg-[#1e1e1e] dark:border dark:border-white/6 rounded-none p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-none flex items-center justify-center shrink-0">
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
            className="shrink-0 px-6 py-3 bg-red-600 text-white rounded-none font-black text-sm hover:bg-red-500 transition-all shadow-lg dark:shadow-none whitespace-nowrap"
          >
            Contact Support →
          </button>
        </div>
      </div>

      <SupportModal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} />
    </>
  );
}
