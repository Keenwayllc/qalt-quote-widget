"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ChevronRight, Pause, Play, X } from "lucide-react";
import { activityAge, activityMessage, ACTIVITY_WINDOW_MS, type PublicActivity } from "@/lib/public-activity";

const routes = new Set(["/", "/pricing", "/compare", "/what-qalt-does", "/courier-quote-software"]);

export default function RecentActivity() {
  const pathname = usePathname();
  if (!routes.has(pathname)) return null;
  // A route change resets the display cycle and cancels outstanding requests.
  return <ActivityCards key={pathname} />;
}

function ActivityCards() {
  const [events, setEvents] = useState<PublicActivity[]>([]);
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [bottom, setBottom] = useState(20);
  const [fits, setFits] = useState(true);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (window.self !== window.top) return;
    const host = window.location.hostname.toLowerCase();
    if (!["qalt.site", "www.qalt.site", "localhost", "127.0.0.1"].includes(host) && !host.endsWith(".vercel.app")) return;
    try { if (sessionStorage.getItem("qalt-activity-dismissed")) return; } catch { /* Storage is optional. */ }
    const controller = new AbortController();
    const delay = window.setTimeout(() => setReady(true), 10000);
    fetch("/api/public/activity", { signal: controller.signal })
      .then(response => response.ok ? response.json() : { events: [] })
      .then(data => { if (!controller.signal.aborted && Array.isArray(data.events)) setEvents(data.events); })
      .catch(() => { /* No data means no card, never substitute invented events. */ });
    return () => { controller.abort(); window.clearTimeout(delay); };
  }, []);

  useEffect(() => {
    let banner: Element | null = null;
    const measure = () => {
      const nextBanner = document.querySelector("[data-qalt-cookie-banner]");
      if (nextBanner !== banner) {
        if (banner) observer.unobserve(banner);
        banner = nextBanner;
        if (banner) observer.observe(banner);
      }
      const height = banner?.getBoundingClientRect().height || 0;
      setBottom(height + 20);
      setFits(window.innerHeight - height > 280);
    };
    const observer = new ResizeObserver(measure);
    const mutations = new MutationObserver(measure);
    mutations.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", measure);
    measure();
    return () => { mutations.disconnect(); observer.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  useEffect(() => {
    if (!ready || dismissed || paused || hovering || focused || !fits || events.length < 2 || index >= events.length) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setNow(Date.now());
      // Show each actual event once per visit rather than replay it as new activity.
      setIndex(current => current + 1);
    }, 9000);
    return () => window.clearInterval(timer);
  }, [ready, dismissed, paused, hovering, focused, fits, events.length, index]);

  useEffect(() => {
    if (!ready || dismissed || !events[index]) return;
    const timer = window.setInterval(() => setNow(Date.now()), 60000);
    return () => window.clearInterval(timer);
  }, [ready, dismissed, events, index]);

  const item = events[index];
  if (!ready || dismissed || !fits || !item || now - Date.parse(item.occurredAt) > ACTIVITY_WINDOW_MS) return null;
  const dismiss = () => {
    setDismissed(true);
    try { sessionStorage.setItem("qalt-activity-dismissed", "1"); } catch { /* Storage is optional. */ }
  };

  return (
    <aside
      aria-label="Recent Qalt activity"
      data-qalt-activity
      className="fixed left-3 z-40 w-[calc(100%-1.5rem)] max-w-[350px] rounded-2xl border border-slate-200 bg-white p-4 text-slate-950 shadow-[0_12px_40px_rgba(15,23,42,0.14)] sm:left-5 motion-safe:animate-[qalt-logo-enter_250ms_ease-out_both]"
      style={{ bottom: `calc(${bottom}px + env(safe-area-inset-bottom))` }}
      onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500"><CheckCircle2 size={12} className="text-red-600" /> Recent Qalt activity</span>
        <button onClick={dismiss} aria-label="Dismiss activity cards" className="-mr-1 -mt-1 rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-red-600"><X size={16} /></button>
      </div>
      <div key={item.id} className="mt-1 flex items-center gap-3 motion-safe:animate-[qalt-logo-enter_250ms_ease-out_both]">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50"><Image src="/images/qalt-icon-2026-10.png" alt="" width={36} height={36} unoptimized /></div>
        <div className="min-w-0"><p className="text-xs text-slate-500">A company</p><p className="mt-0.5 text-sm font-bold">{activityMessage(item)}</p><p className="mt-1 text-[11px] text-slate-500">{activityAge(item.occurredAt, now)}</p></div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
        <Link href="/register" className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700">Start free <ArrowRight size={13} /></Link>
        {events.length > 1 && <div className="flex items-center gap-1"><span className="mr-1 text-[10px] tabular-nums text-slate-400">{index + 1}/{events.length}</span><button aria-label={paused ? "Resume activity rotation" : "Pause activity rotation"} onClick={() => setPaused(value => !value)} className="rounded-md p-2 text-slate-500 hover:bg-slate-100">{paused ? <Play size={13} /> : <Pause size={13} />}</button><button aria-label="Next activity card" onClick={() => { setNow(Date.now()); setIndex(value => value + 1); }} className="rounded-md p-2 text-slate-500 hover:bg-slate-100"><ChevronRight size={15} /></button></div>}
      </div>
    </aside>
  );
}
