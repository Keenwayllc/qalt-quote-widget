"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DashboardRouteStyler() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    let route = "";

    root.classList.add("qalt-console-shell");

    if (pathname.startsWith("/dashboard/settings")) route = "settings";
    if (pathname.startsWith("/dashboard/webhooks")) route = "webhooks";

    if (route) root.dataset.qaltDashboardRoute = route;
    else delete root.dataset.qaltDashboardRoute;

    return () => {
      if (root.dataset.qaltDashboardRoute === route) {
        delete root.dataset.qaltDashboardRoute;
      }
      root.classList.remove("qalt-console-shell");
    };
  }, [pathname]);

  return null;
}
