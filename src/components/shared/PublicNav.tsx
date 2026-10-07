"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import QaltLogo from "@/components/shared/QaltLogo";

type NavItem = {
  label: string;
  href: string;
  description?: string;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const PRODUCT_ITEMS: NavItem[] = [
  { label: "Features", href: "/#features", description: "Pricing, service areas, vehicles, payments and more." },
  { label: "How it Works", href: "/#how-it-works", description: "See how Qalt fits into the customer quote flow." },
  { label: "What Qalt Does", href: "/what-qalt-does", description: "A plain-language overview of the platform." },
  { label: "Live Demo", href: "/demo", description: "Try the customer-facing quote experience." },
];

const SOLUTION_ITEMS: NavItem[] = [
  { label: "Courier Quote Software", href: "/courier-quote-software", description: "Instant website pricing for courier and delivery companies." },
  { label: "Compare Qalt", href: "/compare", description: "See where Qalt fits alongside dispatch and delivery tools." },
];

const RESOURCE_ITEMS: NavItem[] = [
  { label: "Blog", href: "/blog", description: "Pricing, operations and growth resources." },
  { label: "Security", href: "/security", description: "How Qalt protects accounts, quotes and payments." },
];

const NAV_GROUPS: NavGroup[] = [
  { label: "Product", items: PRODUCT_ITEMS },
  { label: "Solutions", items: SOLUTION_ITEMS },
  { label: "Resources", items: RESOURCE_ITEMS },
];

export default function PublicNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>("Product");
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setDesktopOpen(null);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    if (href === "/blog") return pathname === "/blog" || pathname.startsWith("/blog/");
    return pathname === href;
  };

  const groupIsActive = (group: NavGroup) => group.items.some((item) => isActive(item.href));

  return (
    <nav className="fixed inset-x-0 top-0 z-[55] border-b border-slate-950/10 bg-[#f4f2ec]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 xl:px-10">
        <Link href="/" className="min-w-0 shrink-0" aria-label="Qalt home">
          <QaltLogo size="md" linked={false} />
        </Link>

        <div className="hidden min-w-0 items-center gap-1 lg:flex">
          {NAV_GROUPS.map((group) => {
            const open = desktopOpen === group.label;
            return (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setDesktopOpen(group.label)}
                onMouseLeave={() => setDesktopOpen(null)}
              >
                <button
                  type="button"
                  onClick={() => setDesktopOpen(open ? null : group.label)}
                  onFocus={() => setDesktopOpen(group.label)}
                  aria-expanded={open}
                  aria-haspopup="menu"
                  className={`inline-flex items-center gap-1.5 px-3 py-3 text-sm font-bold transition-colors hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600/30 ${groupIsActive(group) ? "text-red-600" : "text-slate-600"}`}
                >
                  {group.label}
                  <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.16 }}
                      className="absolute left-0 top-full w-[320px] pt-2"
                    >
                      <div className="border border-slate-200 bg-white p-2 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.38)]">
                        {group.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            role="menuitem"
                            onClick={() => setDesktopOpen(null)}
                            className={`block border-l-2 px-4 py-3 transition-colors hover:border-red-600 hover:bg-slate-50 ${isActive(item.href) ? "border-red-600 bg-red-50/60" : "border-transparent"}`}
                          >
                            <span className={`block text-sm font-black ${isActive(item.href) ? "text-red-700" : "text-slate-900"}`}>{item.label}</span>
                            {item.description && <span className="mt-1 block text-xs font-medium leading-5 text-slate-500">{item.description}</span>}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <Link
            href="/pricing"
            className={`px-3 py-3 text-sm font-bold transition-colors hover:text-red-600 ${isActive("/pricing") ? "text-red-600" : "text-slate-600"}`}
          >
            Pricing
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="hidden px-3 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:text-slate-950 md:block"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="bg-red-600 px-4 py-2.5 text-sm font-black text-white transition hover:bg-red-700 sm:px-5 lg:px-6"
          >
            Get Started
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center text-slate-700 transition-colors hover:bg-black/5 hover:text-slate-950 lg:hidden"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-950/10 bg-[#f4f2ec] lg:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
              {NAV_GROUPS.map((group) => {
                const open = mobileSection === group.label;
                return (
                  <div key={group.label} className="border-b border-slate-950/10 last:border-b-0">
                    <button
                      type="button"
                      onClick={() => setMobileSection(open ? null : group.label)}
                      className={`flex w-full items-center justify-between py-4 text-left text-sm font-black ${groupIsActive(group) ? "text-red-600" : "text-slate-900"}`}
                      aria-expanded={open}
                    >
                      {group.label}
                      <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden pb-3"
                        >
                          <div className="grid gap-1">
                            {group.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`block border-l-2 px-4 py-3 ${isActive(item.href) ? "border-red-600 bg-red-50/70" : "border-transparent"}`}
                              >
                                <span className={`block text-sm font-bold ${isActive(item.href) ? "text-red-700" : "text-slate-800"}`}>{item.label}</span>
                                {item.description && <span className="mt-1 block text-xs font-medium leading-5 text-slate-500">{item.description}</span>}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <Link
                href="/pricing"
                onClick={() => setMobileOpen(false)}
                className={`block border-b border-slate-950/10 py-4 text-sm font-black ${isActive("/pricing") ? "text-red-600" : "text-slate-900"}`}
              >
                Pricing
              </Link>

              <div className="grid gap-2 py-4 sm:grid-cols-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center border border-slate-950/15 bg-white/50 px-4 py-3 text-sm font-black text-slate-900 md:hidden"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center bg-red-600 px-4 py-3 text-sm font-black text-white"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
