"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, BriefcaseBusiness, MapPinned } from "lucide-react";

const navItems = [
  {
    href: "/dashboard/ops/jobs",
    label: "Jobs",
    description: "Plan & dispatch",
    icon: BriefcaseBusiness,
  },
  {
    href: "/dashboard/ops/readiness",
    label: "Readiness",
    description: "Verify before launch",
    icon: BadgeCheck,
  },
  {
    href: "/dashboard/ops/stops",
    label: "Saved Stops",
    description: "Reusable location notes",
    icon: MapPinned,
  },
];

export default function OpsMotionShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/dashboard/ops/jobs"
      ? pathname === href || pathname.startsWith(`${href}/`)
      : pathname === href || pathname.startsWith(`${href}/`);

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
            <span className="qalt-ops-kicker">Field Operations</span>
            <span className="qalt-ops-command-copy">Dispatch workspace</span>
          </div>

          <nav className="qalt-ops-nav" aria-label="Field Operations">
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
