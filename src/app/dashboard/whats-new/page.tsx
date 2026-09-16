import { FileText, Mail, Trello, MapPin, Clock, CreditCard } from "lucide-react";
import WhatsNewCard from "@/components/dashboard/WhatsNewCard";

const whatsnewFeatures = [
  {
    id: "customer-documents",
    name: "Branded Quote & Paid Invoice PDFs",
    category: "Customer Documents",
    icon: <FileText size={32} />,
    description: "Issue branded Quote PDFs, email secure customer document links, and manage paid invoice records from Quote Details after successful payment.",
    readingTime: 5,
    learnMoreLink: "/dashboard/support/articles/customer-documents",
  },
  {
    id: "white-label-email",
    name: "White-Label Email Domain",
    category: "Pro/Enterprise",
    icon: <Mail size={32} />,
    description: "Send customer quote emails from your own verified sending domain. Configure a sender name, add the required DNS records, and verify the domain in Qalt.",
    readingTime: 5,
    learnMoreLink: "/dashboard/support/articles/white-label-email",
  },
  {
    id: "kanban-crm",
    name: "Kanban CRM Board",
    category: "All Plans",
    icon: <Trello size={32} />,
    description: "Organize quote requests in a visual Kanban board and drag them through PENDING, CONFIRMED, WON, LOST, CANCELLED, and PAID statuses.",
    readingTime: 4,
    learnMoreLink: "/dashboard/support/articles/kanban-crm",
  },
  {
    id: "geo-fencing",
    name: "Geo-Fencing & Service Areas",
    category: "Pro/Enterprise",
    icon: <MapPin size={32} />,
    description: "Define supported ZIP codes and use geo-fencing to stop unsupported customer routes before they move through the normal quote flow.",
    readingTime: 6,
    learnMoreLink: "/dashboard/support/articles/geo-fencing",
  },
  {
    id: "transit-time",
    name: "Transit Time Estimation",
    category: "All Plans",
    icon: <Clock size={32} />,
    description: "Show estimated driving time with the quote when route-duration data is available. Qalt displays it beside distance and carries it into booking review.",
    readingTime: 4,
    learnMoreLink: "/dashboard/support/articles/transit-time",
  },
  {
    id: "payments",
    name: "Payment Processing",
    category: "Enterprise",
    icon: <CreditCard size={32} />,
    description: "Enable Pay & Book for eligible Enterprise widgets so customers can review a quote and continue into hosted checkout.",
    readingTime: 8,
    learnMoreLink: "/dashboard/support/articles/payments",
  },
];

export default function WhatsNewPage() {
  return (
    <div className="p-4 lg:p-10 space-y-8 max-w-6xl mx-auto">
      <div className="space-y-3">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          What's New in Qalt
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium max-w-2xl">
          Discover the latest features to help you manage quote requests and grow your business. Each feature includes a brief description and a link to its complete guide.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {whatsnewFeatures.map((feature) => (
          <WhatsNewCard
            key={feature.id}
            name={feature.name}
            icon={feature.icon}
            description={feature.description}
            readingTime={feature.readingTime}
            category={feature.category}
            learnMoreLink={feature.learnMoreLink}
            variant="full"
          />
        ))}
      </div>

      <div className="bg-slate-900 dark:bg-[#1e1e1e] dark:border dark:border-white/[0.06] rounded-none p-8 text-center space-y-4">
        <h2 className="text-2xl font-black text-white">Ready to get started?</h2>
        <p className="text-slate-300 max-w-xl mx-auto">
          Explore each feature in detail by clicking "Learn More" above, or head back to the dashboard to start using them.
        </p>
        <a
          href="/dashboard"
          className="inline-block px-6 py-3 mt-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-none transition-all"
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}
