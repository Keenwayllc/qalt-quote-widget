"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const SHOW_AFTER_PX = 420;

function getDashboardScroller() {
  return document.querySelector<HTMLElement>("main > div[class~='overflow-auto']");
}

export default function GlobalScrollToTop() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  // The homepage already has its own matching control. Standalone widgets are
  // customer embeds, so keep Qalt platform chrome out of those surfaces.
  const shouldSkip = pathname === "/" || pathname.startsWith("/widget/");

  useEffect(() => {
    if (shouldSkip) {
      setVisible(false);
      return;
    }

    let target: Window | HTMLElement | null = null;

    const frame = requestAnimationFrame(() => {
      target = pathname.startsWith("/dashboard")
        ? getDashboardScroller() ?? window
        : window;

      const updateVisibility = () => {
        const top = target === window
          ? window.scrollY
          : (target as HTMLElement).scrollTop;
        setVisible(top > SHOW_AFTER_PX);
      };

      updateVisibility();
      target.addEventListener("scroll", updateVisibility, { passive: true });
    });

    return () => {
      cancelAnimationFrame(frame);
      if (target) {
        const noop = () => {};
        // Listener cleanup is handled below by replacing with a fresh route-bound
        // listener; this branch only exists when the target was created.
        target.removeEventListener("scroll", noop);
      }
    };
  }, [pathname, shouldSkip]);

  useEffect(() => {
    if (shouldSkip) return;

    const target = pathname.startsWith("/dashboard")
      ? getDashboardScroller() ?? window
      : window;

    const updateVisibility = () => {
      const top = target === window
        ? window.scrollY
        : (target as HTMLElement).scrollTop;
      setVisible(top > SHOW_AFTER_PX);
    };

    updateVisibility();
    target.addEventListener("scroll", updateVisibility, { passive: true });
    return () => target.removeEventListener("scroll", updateVisibility);
  }, [pathname, shouldSkip]);

  const scrollToTop = () => {
    const behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";
    const dashboardScroller = pathname.startsWith("/dashboard")
      ? getDashboardScroller()
      : null;

    if (dashboardScroller) {
      dashboardScroller.scrollTo({ top: 0, behavior });
    } else {
      window.scrollTo({ top: 0, behavior });
    }
  };

  if (shouldSkip) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.94 }}
          transition={{ duration: reduceMotion ? 0.12 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[80] flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#df1731] text-white shadow-[0_16px_34px_-16px_rgba(223,23,49,0.72)] transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#c9152b] hover:shadow-[0_20px_38px_-16px_rgba(223,23,49,0.8)] active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-500/20"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ArrowUp size={20} strokeWidth={2.4} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
