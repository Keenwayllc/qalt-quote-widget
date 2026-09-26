"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { INTRO_DONE_EVENT } from "@/lib/intro-boot";
import QaltAnimatedLogo from "@/components/shared/QaltAnimatedLogo";
import {
  ArrivalVisual,
  BookVisual,
  BrandVisual,
  DetailsVisual,
  EmbedVisual,
  InboxVisual,
  OpsVisual,
  QuoteVisual,
  RulesVisual,
  vars,
} from "./scenes";
import "./intro.css";

/**
 * Homepage intro: a delivery route the visitor travels at their own pace.
 *
 * The overlay is its own scroll container. Each stop is one viewport of
 * vertical scroll (snapped, one stop per gesture), and that scroll drives a
 * horizontal camera move across the stops while a marker travels the route
 * strip. Scroll, arrow keys, the "Next stop" button, or the stop labels all
 * move the journey. Past the last stop a transparent spacer scrolls the stage
 * up like a cargo roll-up door, revealing the real homepage underneath.
 *
 * Whether it shows is decided before first paint by INTRO_BOOT_SCRIPT
 * (src/lib/intro-boot.ts): html[data-intro="play"] on fresh loads of "/",
 * once per session, never with reduced motion. It is mounted in the root
 * layout, outside the page template's transformed wrapper, so it can sit
 * above the nav and cookie banner.
 */

type Stop = {
  label: string;
  kicker: string;
  title: string;
  body: string;
  Visual: () => React.JSX.Element;
};

const STOPS: Stop[] = [
  {
    label: "Start",
    kicker: "The route",
    title: "Every delivery starts with one question: how much?",
    body: "Right now the answer takes a phone call, a text thread, or an email chain. Follow one job from your website to a paid booking.",
    Visual: InboxVisual,
  },
  {
    label: "Your site",
    kicker: "Stop 01 · Embed",
    title: "Qalt lives on your website",
    body: "Add Qalt to WordPress, Shopify, Webflow, or any site with a simple embed. Go live fast without a custom build.",
    Visual: EmbedVisual,
  },
  {
    label: "Details",
    kicker: "Stop 02 · Delivery details",
    title: "Customer enters the job",
    body: "Pickup, delivery, shipment details, date, and service add-ons stay in one branded flow.",
    Visual: DetailsVisual,
  },
  {
    label: "Pricing",
    kicker: "Stop 03 · Your pricing rules",
    title: "Your rates, set once",
    body: "Set rates by distance, weight, dimensions, service type, and more. Qalt applies them to every request, so nobody quotes by hand.",
    Visual: RulesVisual,
  },
  {
    label: "Quote",
    kicker: "Stop 04 · Instant quote",
    title: "Your pricing appears clearly",
    body: "Distance, service charges, and the final estimate are shown before the customer books.",
    Visual: QuoteVisual,
  },
  {
    label: "Pay & book",
    kicker: "Stop 05 · Pay & book",
    title: "The customer confirms the job",
    body: "Contact details, route information, and the booking move forward without starting over. Online payment is available on Enterprise.",
    Visual: BookVisual,
  },
  {
    label: "Your brand",
    kicker: "Stop 06 · White-label",
    title: "Your brand from quote to booking",
    body: "Use your logo, colors, and branding across the quote flow. Customers stay in your brand from quote to submission.",
    Visual: BrandVisual,
  },
  {
    label: "Ops",
    kicker: "Stop 07 · Ops Console",
    title: "Then you run the job",
    body: "Manage jobs, stops, readiness, and issues in one place. See quote volume, conversion trends, and where leads drop off.",
    Visual: OpsVisual,
  },
  {
    label: "Arrived",
    kicker: "Delivered",
    title: "One booked job pays for a full month.",
    body: "Start free with 50 quotes a month, no card required. Pro is $29/mo billed annually for unlimited quotes and full white-label.",
    Visual: ArrivalVisual,
  },
];

const LAST = STOPS.length - 1;

function Scene({ index, stop, progress, active }: { index: number; stop: Stop; progress: MotionValue<number>; active: boolean }) {
  // Distance from the camera, in stops. Content is fully visible near its
  // stop and gone by the halfway point, so the active switch is never seen.
  const offset = useTransform(progress, (p) => index - p);
  const opacity = useTransform(offset, (o) => Math.max(0, Math.min(1, 1 - (Math.abs(o) - 0.08) * 2.4)));
  // The visual trails the copy slightly, which reads as depth while travelling.
  const visualX = useTransform(offset, (o) => `${o * 16}vw`);
  const { Visual } = stop;

  return (
    <motion.section
      className="qj-scene"
      style={{ left: `${index * 100}vw`, opacity }}
      data-active={active ? "" : undefined}
      aria-hidden={!active}
      aria-label={stop.label}
    >
      <div className={`qj-scene__inner${index === 0 ? " is-opening" : ""}`}>
        <div className="qj-copy">
          <div className="qj-copy__kicker">{stop.kicker}</div>
          <h2 className="qj-copy__title">{stop.title}</h2>
          <p className="qj-copy__body">{stop.body}</p>
          {index === LAST && (
            <div className="qj-cta">
              <Link href="/register" className="qj-cta__primary" tabIndex={active ? 0 : -1}>
                Start free <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
        <motion.div className="qj-visual" style={{ x: visualX }}>
          <Visual />
        </motion.div>
      </div>
    </motion.section>
  );
}

export default function IntroJourney() {
  const [mounted, setMounted] = useState(true);
  const [active, setActive] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  const released = useRef(false);

  const { scrollY } = useScroll({ container: scroller });
  const progress = useTransform(scrollY, (y) => y / (scroller.current?.clientHeight || 1));
  const travel = useTransform(progress, (p) => Math.min(p, LAST));
  const worldX = useTransform(travel, (p) => `${-p * 100}vw`);
  const streetsX = useTransform(travel, (p) => `${-p * 28}vw`);
  const routeFill = useTransform(travel, (p) => p / LAST);
  const carX = useTransform(travel, (p) => `${(p / LAST) * 100}%`);

  const finish = useCallback(() => {
    document.documentElement.removeAttribute("data-intro");
    setMounted(false);
    window.dispatchEvent(new Event(INTRO_DONE_EVENT));
  }, []);

  // Start the hero's entrance as the door begins to lift, so it lands while
  // the door clears.
  const release = useCallback(() => {
    if (released.current) return;
    released.current = true;
    document.documentElement.setAttribute("data-intro", "leaving");
  }, []);

  useMotionValueEvent(progress, "change", (p) => {
    const next = Math.round(Math.min(p, LAST));
    setActive((cur) => (cur === next ? cur : next));
    if (p > LAST + 0.25) release();
    if (p >= LAST + 0.98) finish();
  });

  const goTo = useCallback((i: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ top: Math.max(0, Math.min(i, LAST + 1)) * el.clientHeight, behavior: "smooth" });
  }, []);

  const skip = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    // Jump to the last stop, then let the door lift from there.
    el.scrollTo({ top: LAST * el.clientHeight, behavior: "instant" });
    requestAnimationFrame(() => goTo(LAST + 1));
  }, [goTo]);

  useEffect(() => {
    if (document.documentElement.dataset.intro !== "play") return;
    const el = scroller.current;
    el?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
      if (e.key === "ArrowRight") goTo(active + 1);
      if (e.key === "ArrowLeft") goTo(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo, skip]);

  // One wheel gesture moves exactly one stop. Browsers disagree on how
  // scroll-snap treats small wheel deltas, and trackpad momentum would
  // otherwise fly past several stops. The lock holds until the wheel has been
  // quiet briefly, which absorbs momentum. Touch keeps native snapping.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let lockedUntil = 0;
    let pending = 0;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // pinch zoom
      e.preventDefault();
      const now = performance.now();
      if (now < lockedUntil) {
        lockedUntil = Math.max(lockedUntil, now + 200);
        return;
      }
      pending += e.deltaY || e.deltaX;
      if (Math.abs(pending) < 24) return;
      const here = Math.round(el.scrollTop / el.clientHeight);
      goTo(here + Math.sign(pending));
      pending = 0;
      lockedUntil = now + 700;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [mounted, goTo]);

  if (!mounted) return null;

  return (
    <div
      ref={scroller}
      className="qj"
      tabIndex={-1}
      role="region"
      aria-label="How Qalt works. Scroll or use the arrow keys to travel each stop."
      style={vars({ "--stops": STOPS.length })}
    >
      <div className="qj__track">
        {STOPS.map((stop, i) => (
          <div
            key={stop.label}
            className="qj__snap"
            style={{ top: `${(i / STOPS.length) * 100}%`, height: `${100 / STOPS.length}%` }}
          />
        ))}

        <div className="qj__stage">
          <motion.div className="qj__streets" style={{ x: streetsX }} aria-hidden />

          <motion.div className="qj__world" style={{ x: worldX }}>
            {STOPS.map((stop, i) => (
              <Scene key={stop.label} index={i} stop={stop} progress={progress} active={active === i} />
            ))}
          </motion.div>

          <div className="qj__top">
            <QaltAnimatedLogo onDark className="qj__brand" />
            <button type="button" className="qj__skip" onClick={skip}>
              Skip to homepage
            </button>
          </div>

          <div className="qj__bottom">
            <nav className="qj-route" aria-label="Journey stops">
              <div className="qj-route__line">
                <motion.i style={{ scaleX: routeFill }} />
              </div>
              <motion.div className="qj-route__car-track" style={{ x: carX }} aria-hidden>
                <span className="qj-route__car">
                  <QaltAnimatedLogo onDark iconOnly noAnimate />
                </span>
              </motion.div>
              {STOPS.map((stop, i) => (
                <button
                  key={stop.label}
                  type="button"
                  className="qj-route__stop"
                  style={{ left: `${(i / LAST) * 100}%` }}
                  data-state={i < active ? "done" : i === active ? "here" : undefined}
                  onClick={() => goTo(i)}
                  aria-current={i === active ? "step" : undefined}
                >
                  <span className="qj-route__dot" />
                  <span className="qj-route__label">{stop.label}</span>
                </button>
              ))}
            </nav>

            <button type="button" className="qj__next" onClick={() => goTo(active + 1)}>
              {active === 0 ? "Start the route" : active === LAST ? "Enter homepage" : "Next stop"}
              <ArrowRight size={15} />
            </button>
          </div>

          {active === 0 && (
            <div className="qj__hint">
              <span className="qj__hint-desktop">Scroll or use arrow keys to travel</span>
              <span className="qj__hint-touch">Swipe up to travel</span>
            </div>
          )}
        </div>
      </div>

      {/* Scrolling through this transparent spacer lifts the stage off the homepage. */}
      <div className="qj__spacer" />
    </div>
  );
}
