import { Clock, CreditCard, FileText, Mail, MapPin, Trello, Truck, type LucideIcon } from "lucide-react";

/**
 * Product updates shown on the dashboard overview (first three) and the
 * What's New page (all). Newest first. Every update gets a card image in
 * public/images/whats-new/; tests/whats-new.test.mjs enforces it.
 *
 * Images: 16:9, subject on the right half, since the card fades in from the
 * left behind the text. imageDark is optional, for transparent artwork that
 * needs a dark-theme version.
 */
export type WhatsNewItem = {
  id: string;
  name: string;
  category: string;
  icon: LucideIcon;
  /** Full description for the What's New page. */
  description: string;
  /** One-line version for the dashboard overview. */
  summary: string;
  readingTime?: number;
  link: string;
  linkLabel?: string;
  image: string | null;
  imageDark?: string;
};

export const WHATS_NEW: WhatsNewItem[] = [
  {
    id: "vehicle-artwork",
    name: "Realistic Vehicle Artwork",
    category: "All Plans",
    icon: Truck,
    description: "Every vehicle on your quote form now shows a realistic picture that matches your Light or Dark form, from cargo bikes to 53 ft tractor trailers, doubles and triples. New choices include Moped, Dump, Tanker, Roll-Off and Flatbed Tractor Trailer.",
    summary: "Realistic pictures for every vehicle, in light and dark forms.",
    link: "/dashboard/forms",
    linkLabel: "Open My Forms",
    image: "/images/whats-new/vehicle-artwork-light.webp",
    imageDark: "/images/whats-new/vehicle-artwork-dark.webp",
  },
  {
    id: "customer-documents",
    name: "Branded Quote & Paid Invoice PDFs",
    category: "Customer Documents",
    icon: FileText,
    description: "Issue branded Quote PDFs, email secure customer document links, and manage paid invoice records from Quote Details after successful payment.",
    summary: "Send branded quote PDFs and keep paid invoice records.",
    readingTime: 5,
    link: "/dashboard/support/articles/customer-documents",
    image: null,
  },
  {
    id: "white-label-email",
    name: "White-Label Email Domain",
    category: "Pro/Enterprise",
    icon: Mail,
    description: "Send customer quote emails from your own verified sending domain. Configure a sender name, add the required DNS records, and verify the domain in Qalt.",
    summary: "Send customer emails from your own domain instead of Qalt's.",
    readingTime: 5,
    link: "/dashboard/support/articles/white-label-email",
    image: null,
  },
  {
    id: "kanban-crm",
    name: "Kanban CRM Board",
    category: "All Plans",
    icon: Trello,
    description: "Organize quote requests in a visual Kanban board and drag them through PENDING, CONFIRMED, WON, LOST, CANCELLED, and PAID statuses.",
    summary: "Organize quote requests on a board with 6 status columns.",
    readingTime: 4,
    link: "/dashboard/support/articles/kanban-crm",
    image: null,
  },
  {
    id: "geo-fencing",
    name: "Geo-Fencing & Service Areas",
    category: "All Plans",
    icon: MapPin,
    description: "Define supported ZIP codes and use geo-fencing to stop unsupported customer routes before they move through the normal quote flow.",
    summary: "Limit quote requests to the ZIP codes you serve.",
    readingTime: 6,
    link: "/dashboard/support/articles/geo-fencing",
    image: null,
  },
  {
    id: "transit-time",
    name: "Transit Time Estimation",
    category: "All Plans",
    icon: Clock,
    description: "Show estimated driving time with the quote when route-duration data is available. Qalt displays it beside distance and carries it into booking review.",
    summary: "Show customers the estimated drive time with each quote.",
    readingTime: 4,
    link: "/dashboard/support/articles/transit-time",
    image: null,
  },
  {
    id: "payments",
    name: "Payment Processing",
    category: "Enterprise",
    icon: CreditCard,
    description: "Enable Pay & Book for eligible Enterprise widgets so customers can review a quote and continue into hosted checkout.",
    summary: "Let customers pay for a quote through hosted checkout.",
    readingTime: 8,
    link: "/dashboard/support/articles/payments",
    image: null,
  },
];
