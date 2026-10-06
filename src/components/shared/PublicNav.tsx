"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import QaltLogo from "@/components/shared/QaltLogo";

const NAV_LINKS = [
  { label: "Features",       href: "/#features" },
  { label: "Live Demo",      href: "/demo" },
  { label: "How it Works",   href: "/#how-it-works" },
  { label: "What Qalt Does", href: "/what-qalt-does" },
  { label: "Courier Quote Software", href: "/courier-quote-software" },
  { label: "Compare",        href: "/compare" },
  { label: "Pricing",        href: "/pricing" },
  { label: "Blog",           href: "/blog" },
];

export default function PublicNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    if (href === "/blog") return pathname === "/blog" || pathname.startsWith("/blog/");
    return pathname === href;
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-950/10 bg-[#f4f2ec]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <QaltLogo size="lg" linked={false} />
        </Link>

        {/* Desktop links — with 8 links, keep the compact menu until xl to avoid collisions. */}
        <div className="hidden xl:flex items-center gap-6 text-sm font-bold text-slate-500">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap transition-colors hover:text-red-600 ${
                isActive(link.href) ? "text-red-600" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/login"
            className="hidden px-4 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:text-slate-950 sm:block whitespace-nowrap"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="bg-red-600 px-4 py-2.5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-red-700 sm:px-6 whitespace-nowrap"
          >
            Get Started
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-slate-600 transition-colors hover:bg-black/5 hover:text-slate-950 xl:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden border-t border-slate-950/10 bg-[#f4f2ec] xl:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 text-sm font-bold transition-colors hover:bg-red-50 ${
                    isActive(link.href)
                      ? "text-red-600"
                      : "text-slate-600 hover:text-red-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 pb-1 border-t border-slate-100">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  Log in
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
