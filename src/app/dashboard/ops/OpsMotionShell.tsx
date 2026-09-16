"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, BriefcaseBusiness, MapPinned } from "lucide-react";

const navItems = [
  {
    href: "/dashboard/ops/jobs",
    label: "Jobs & Dispatch",
    description: "Plan deliveries and assign work",
    icon: BriefcaseBusiness,
  },
  {
    href: "/dashboard/ops/readiness",
    label: "Delivery Checklist",
    description: "Confirm details before heading out",
    icon: BadgeCheck,
  },
  {
    href: "/dashboard/ops/stops",
    label: "Saved Locations",
    description: "Remember instructions for repeat places",
    icon: MapPinned,
  },
];

export default function OpsMotionShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="qalt-ops">
      <div className="qalt-ops-commandbar-wrap">
        <motion.div
          className="qalt-ops-commandbar"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="qalt-ops-branding">
            <span className="qalt-ops-kicker">Delivery Operations</span>
            <span className="qalt-ops-command-copy">Tools that help you prepare, dispatch, and repeat deliveries</span>
          </div>

          <nav className="qalt-ops-nav" aria-label="Delivery Operations">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`qalt-ops-nav-item ${active ? "is-active" : ""}`}
                >
                  {active && (
                    <motion.span
                      layoutId="qalt-ops-active-tab"
                      className="qalt-ops-nav-active"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="qalt-ops-nav-icon">
                    <Icon size={16} strokeWidth={2.1} />
                  </span>
                  <span className="qalt-ops-nav-copy">
                    <strong>{item.label}</strong>
                    <small>{item.description}</small>
                  </span>
                </Link>
              );
            })}
          </nav>
        </motion.div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          className="qalt-ops-page"
          initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
