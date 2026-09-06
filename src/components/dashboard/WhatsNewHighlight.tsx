"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star, ChevronRight, Mail, Trello, MapPin, Clock, CreditCard } from "lucide-react";
import Link from "next/link";
import WhatsNewCard from "./WhatsNewCard";

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
  const reduceMotion = useReducedMotion();
  const featuredItems = whatsnewFeatures.slice(0, 3);

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.42, ease: "easeOut" }}
      className="relative overflow-hidden bg-white dark:bg-[#141414] rounded-[22px] border border-[#e2e4e9] dark:border-white/[0.07] shadow-[0_18px_52px_-42px_rgba(34,37,43,0.38)] dark:shadow-none p-6 sm:p-7 space-y-5"
    >
      <div className="pointer-events-none absolute -right-16 -top-20 h-44 w-44 rounded-full bg-red-500/[0.06] blur-3xl" />

      <div className="relative flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#8a919c] dark:text-zinc-500">
            <Star size={13} className="text-[#df1731]" />
            Product updates
          </div>
          <h2 className="text-xl font-extrabold tracking-[-0.025em] text-[#22252b] dark:text-white">
            What&apos;s New
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#646b76] dark:text-zinc-400">
            New tools and improvements designed to make quoting, booking, and operations smoother.
          </p>
        </div>
      </div>

      <div className="relative grid grid-cols-1 gap-3 md:grid-cols-3">
        {featuredItems.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.34, delay: reduceMotion ? 0 : index * 0.055, ease: "easeOut" }}
            whileHover={reduceMotion ? undefined : { y: -2 }}
            className="rounded-[16px]"
          >
            <WhatsNewCard
              name={feature.name}
              icon={feature.icon}
              description={feature.description}
              readingTime={feature.readingTime}
              category={feature.category}
              learnMoreLink={feature.learnMoreLink}
              variant="compact"
            />
          </motion.div>
        ))}
      </div>

      <Link
        href="/dashboard/whats-new"
        className="group relative inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] bg-[#22252b] px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#17191d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-500/10 dark:bg-white dark:text-[#22252b] dark:hover:bg-zinc-100"
      >
        View all updates
        <ChevronRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      </Link>
    </motion.section>
  );
}

export { whatsnewFeatures };
