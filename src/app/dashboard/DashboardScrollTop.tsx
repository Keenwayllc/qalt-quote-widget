"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

export default function DashboardScrollTop() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const scroller = document.getElementById("qalt-dashboard-scroll-container");
    if (!scroller) return;

    const update = () => setVisible(scroller.scrollTop > 700);
    update();
    scroller.addEventListener("scroll", update, { passive: true });
    return () => scroller.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const scroller = document.getElementById("qalt-dashboard-scroll-container");
    if (!scroller) return;
    scroller.scrollTo({ top: 0, behavior: "auto" });
    setVisible(false);
  }, [pathname]);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => document.getElementById("qalt-dashboard-scroll-container")?.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-600/20 transition hover:-translate-y-0.5 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900/50"
      aria-label="Scroll to top"
      title="Back to top"
    >
      <ArrowUp size={20} strokeWidth={2.5} />
    </button>
  );
}
