import { Mail, Trello, MapPin, Clock, CreditCard } from "lucide-react";
import WhatsNewCard from "@/components/dashboard/WhatsNewCard";

const whatsnewFeatures = [
  {
    id: "white-label-email",
    name: "White-Label Email Domain",
    category: "Pro/Enterprise",
    icon: <Mail size={32} />,
    description: "Send customer confirmation emails from your own domain instead of Qalt's. Configure a custom sender name and verify DNS records to establish brand trust.",
    readingTime: 5,
    learnMoreLink: "/dashboard/support#customer-communication",
  },
  {
    id: "kanban-crm",
    name: "Kanban CRM Board",
    category: "All Plans",
    icon: <Trello size={32} />,
    description: "Organize and manage quote requests in a visual Kanban board. Drag quotes through 6 status columns (PENDING, CONFIRMED, WON, LOST, CANCELLED, PAID) to track progress at a glance.",
    readingTime: 4,
    learnMoreLink: "/dashboard/support#pricing-quotes",
  },
  {
    id: "geo-fencing",
    name: "Geo-Fencing & Service Areas",
    category: "Pro/Enterprise",
    icon: <MapPin size={32} />,
    description: "Restrict quote requests to specific service areas by ZIP code. Customers outside your service zone see a message explaining your coverage area.",
    readingTime: 6,
    learnMoreLink: "/dashboard/support#advanced-features",
  },
  {
    id: "transit-time",
    name: "Transit Time Estimation",
    category: "All Plans",
    icon: <Clock size={32} />,
    description: "Show customers estimated transit time for their quote. Calculated based on distance and automatically displayed in the quote confirmation.",
    readingTime: 4,
    learnMoreLink: "/dashboard/support#advanced-features",
  },
  {
    id: "payments",
    name: "Payment Processing",
    category: "Pro/Enterprise",
    icon: <CreditCard size={32} />,
    description: "Accept customer payments directly through Qalt. Customers can pay upfront for quotes, streamlining your quote-to-payment workflow.",
    readingTime: 8,
    learnMoreLink: "/dashboard/support#advanced-features",
  },
];

export default function WhatsNewPage() {
  return (
    <div className="p-4 lg:p-10 space-y-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="space-y-3">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          What's New in Qalt
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium max-w-2xl">
          Discover the latest features to help you manage quote requests and grow your business. Each feature includes a brief description and a link to the complete guide.
        </p>
      </div>

      {/* Features Grid */}
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

      {/* CTA Section */}
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
