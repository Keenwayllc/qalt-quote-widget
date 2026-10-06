"use client";

import { useState } from "react";
import Link from "next/link";
import QaltLogo from "@/components/shared/QaltLogo";
import SupportModal from "@/components/shared/SupportModal";
import { TrustBadgeStrip } from "@/components/shared/TrustBadges";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/demo", label: "Live Demo" },
      { href: "/#how-it-works", label: "How it Works" },
      { href: "/what-qalt-does", label: "What Qalt Does" },
      { href: "/courier-quote-software", label: "Courier Quote Software" },
      { href: "/compare", label: "Compare" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/security", label: "Security" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/register", label: "Start Free" },
      { href: "/login", label: "Log In" },
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
    ],
  },
];

/** The one footer for every public marketing page. */
export default function MarketingFooter() {
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <footer className="border-t border-slate-950/10 bg-[#f4f2ec] py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.3fr_.8fr_.7fr_.7fr]">
          <div>
            <QaltLogo size="md" />
            <p className="mt-4 max-w-xs text-sm font-medium leading-6 text-slate-500">
              The customer-facing quote layer for delivery companies. Your rates, your services, your coverage, your brand.
            </p>
          </div>
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{column.title}</p>
              <div className="mt-4 space-y-3 text-sm font-bold text-slate-700">
                {column.links.map((link) => (
                  <Link key={link.href} className="block hover:text-red-600" href={link.href}>{link.label}</Link>
                ))}
                {column.title === "Company" && (
                  <button type="button" className="block hover:text-red-600" onClick={() => setSupportOpen(true)}>Support</button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-950/10 pt-7 md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-medium text-slate-400">© 2026 Qalt Systems. All rights reserved.</p>
          <TrustBadgeStrip keys={["https", "stripe", "passwords"]} />
        </div>
      </div>
      <SupportModal isOpen={supportOpen} onClose={() => setSupportOpen(false)} />
    </footer>
  );
}
