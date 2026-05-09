"use client";

import { Star, ChevronRight } from "lucide-react";
import Link from "next/link";
import WhatsNewCard from "./WhatsNewCard";
import { Mail, Trello, MapPin, Clock, CreditCard } from "lucide-react";

// Define the 5 What's New features
const whatsnewFeatures = [
  {
    id: "white-label-email",
    name: "White-Label Email Domain",
    category: "Pro/Enterprise",
    icon: <Mail size={24} />,
    description: "Send customer confirmation emails from your own domain instead of Qalt's.",
    readingTime: 5,
    learnMoreLink: "/dashboard/support#customer-communication",
  },
  {
    id: "kanban-crm",
    name: "Kanban CRM Board",
    category: "All Plans",
    icon: <Trello size={24} />,
    description: "Organize quote requests in a visual Kanban board with 6 status columns.",
    readingTime: 4,
    learnMoreLink: "/dashboard/support#pricing-quotes",
  },
  {
    id: "geo-fencing",
    name: "Geo-Fencing & Service Areas",
    category: "Pro/Enterprise",
    icon: <MapPin size={24} />,
    description: "Restrict quote requests to specific service areas by ZIP code.",
    readingTime: 6,
    learnMoreLink: "/dashboard/support#advanced-features",
  },
  {
    id: "transit-time",
    name: "Transit Time Estimation",
    category: "All Plans",
    icon: <Clock size={24} />,
    description: "Show customers estimated transit time for their quote automatically.",
    readingTime: 4,
    learnMoreLink: "/dashboard/support#advanced-features",
  },
  {
    id: "payments",
    name: "Payment Processing",
    category: "Pro/Enterprise",
    icon: <CreditCard size={24} />,
    description: "Accept customer payments directly through Qalt for quote orders.",
    readingTime: 8,
    learnMoreLink: "/dashboard/support#advanced-features",
  },
];

export default function WhatsNewHighlight() {
  // Show only the first 3 features in the highlight
  const featuredItems = whatsnewFeatures.slice(0, 3);

  return (
    <section className="bg-white dark:bg-[#1e1e1e] rounded-none border border-slate-200 dark:border-white/[0.06] shadow-sm dark:shadow-none p-6 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Star size={20} className="text-red-500" />
        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
          What's New
        </h2>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400">
        Discover the latest features to help you manage quotes and grow your business.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {featuredItems.map((feature) => (
          <WhatsNewCard
            key={feature.id}
            name={feature.name}
            icon={feature.icon}
            description={feature.description}
            readingTime={feature.readingTime}
            category={feature.category}
            learnMoreLink={feature.learnMoreLink}
            variant="compact"
          />
        ))}
      </div>

      <Link
        href="/dashboard/whats-new"
        className="inline-flex items-center justify-center px-4 py-2.5 mt-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-none transition-colors"
      >
        View All Features
        <ChevronRight size={16} className="ml-2" />
      </Link>
    </section>
  );
}

// Export the features array for use in the What's New page
export { whatsnewFeatures };
