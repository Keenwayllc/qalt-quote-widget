"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

function getInternalPath(anchor: HTMLAnchorElement): string | null {
  if (!anchor.href || anchor.target === "_blank" || anchor.hasAttribute("download")) return null;

  try {
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin) return null;
    if (url.pathname.startsWith("/api/")) return null;
    if (url.pathname === window.location.pathname && url.search === window.location.search && url.hash) return null;
    return `${url.pathname}${url.search}`;
  } catch {
    return null;
  }
}

export default function NavigationBoost() {
  const router = useRouter();
  const pathname = usePathname();
  const [navigating, setNavigating] = useState(false);
  const prefetched = useRef(new Set<string>());

  useEffect(() => {
    setNavigating(false);
  }, [pathname]);

  useEffect(() => {
    const prefetch = (path: string | null) => {
      if (!path || prefetched.current.has(path)) return;
      prefetched.current.add(path);
      router.prefetch(path);
    };

    const findAnchor = (target: EventTarget | null) =>
      target instanceof Element ? target.closest("a") as HTMLAnchorElement | null : null;

    const warmTarget = (event: Event) => {
      const anchor = findAnchor(event.target);
      if (anchor) prefetch(getInternalPath(anchor));
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = findAnchor(event.target);
      if (!anchor) return;
      const path = getInternalPath(anchor);
      if (!path) return;
      setNavigating(true);
    };

    document.addEventListener("pointerover", warmTarget, { passive: true });
    document.addEventListener("focusin", warmTarget);
    document.addEventListener("touchstart", warmTarget, { passive: true });
    document.addEventListener("click", onClick, true);

    const warmVisibleLinks = () => {
      const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]"));
      const dashboardFirst = links.sort((a, b) => Number(!a.pathname.startsWith("/dashboard")) - Number(!b.pathname.startsWith("/dashboard")));
      dashboardFirst.slice(0, 24).forEach((anchor) => prefetch(getInternalPath(anchor)));
    };

    const idle = window.setTimeout(warmVisibleLinks, 250);

    return () => {
      window.clearTimeout(idle);
      document.removeEventListener("pointerover", warmTarget);
      document.removeEventListener("focusin", warmTarget);
      document.removeEventListener("touchstart", warmTarget);
      document.removeEventListener("click", onClick, true);
    };
  }, [router]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-x-0 top-0 z-[9999] h-[2px] origin-left bg-red-600 transition-opacity duration-150 ${navigating ? "opacity-100 animate-pulse" : "opacity-0"}`}
    />
  );
}
