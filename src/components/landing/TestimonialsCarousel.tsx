"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  industry: string;
  quote: string;
  initials: string;
  accent: "red" | "emerald" | "amber" | "slate";
}

const FONT = {
  fontFamily: "var(--font-space-grotesk), var(--font-geist-sans), system-ui, sans-serif",
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Liam Bloom",
    role: "Owner, Bloom & Stem",
    industry: "Floral & Gift Shop",
    quote: "Our flower delivery business needed a way to give instant quotes for local deliveries. Qalt made the customer flow much easier to manage.",
    initials: "LB",
    accent: "red",
  },
  {
    id: 2,
    name: "Sophia Rossi",
    role: "Founder, Rossi Bakery",
    industry: "Boutique Bakery",
    quote: "Delivery estimates used to mean back-and-forth messages. The quote widget gives customers a much clearer path from delivery details to a decision.",
    initials: "SR",
    accent: "amber",
  },
  {
    id: 3,
    name: "David Chen",
    role: "Operations, CorePulse",
    industry: "Tech Hardware",
    quote: "The pricing rules are what matter for us. Weight, distance, and service options can all be reflected in one customer-facing quote flow.",
    initials: "DC",
    accent: "emerald",
  },
  {
    id: 4,
    name: "Marcus Thorne",
    role: "Director, Thorne Express",
    industry: "Last-Mile Courier",
    quote: "The biggest improvement is consistency. Customers see the same structured quote experience every time instead of depending on who answers the phone.",
    initials: "MT",
    accent: "slate",
  },
  {
    id: 5,
    name: "Elena Vance",
    role: "Manager, Vance Interiors",
    industry: "Modern Furniture",
    quote: "Delivery and assembly quotes were a bottleneck. A branded quote form makes the process easier for customers to understand before they book.",
    initials: "EV",
    accent: "red",
  },
  {
    id: 6,
    name: "Samira Joudi",
    role: "Founder, Velour",
    industry: "Retail Boutique",
    quote: "Keeping the quote experience on our own site makes the business feel more polished and keeps the customer journey in our brand.",
    initials: "SJ",
    accent: "emerald",
  },
  {
    id: 7,
    name: "James Miller",
    role: "Lead Pharmacist, City Meds",
    industry: "Pharmacy & Healthcare",
    quote: "A structured quote and booking flow removes a lot of repetitive questions and gives us better information before a delivery is scheduled.",
    initials: "JM",
    accent: "slate",
  },
];

const COUNT = TESTIMONIALS.length;
const SLIDES = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

const accentClasses = {
  red: "bg-red-50 text-red-700 border-red-100",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  slate: "bg-slate-100 text-slate-700 border-slate-200",
};

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(COUNT);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [visible, setVisible] = useState(3);
  const startRef = useRef(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => {
      setVisible(window.innerWidth < 768 ? 1 : window.innerWidth < 1100 ? 2 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    if (index >= COUNT * 2) {
      setAnimate(false);
      setIndex(index - COUNT);
    } else if (index < COUNT) {
      setAnimate(false);
      setIndex(index + COUNT);
    }
  }, [index]);

  useEffect(() => {
    if (!animate) {
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    }
  }, [animate]);

  useEffect(() => {
    if (paused || dragging || reducedMotion) return;
    const timer = window.setInterval(() => {
      setAnimate(true);
      setIndex((value) => value + 1);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused, dragging, reducedMotion]);

  const go = (direction: 1 | -1) => {
    setAnimate(true);
    setIndex((value) => value + direction);
  };

  const onPointerDown = (x: number) => {
    setDragging(true);
    setAnimate(false);
    startRef.current = x;
    setDragX(0);
  };

  const onPointerMove = (x: number) => {
    if (!dragging) return;
    setDragX(x - startRef.current);
  };

  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragX < -70) go(1);
    else if (dragX > 70) go(-1);
    else setAnimate(true);
    setDragX(0);
  };

  const total = SLIDES.length;
  const slideW = 100 / total;
  const trackW = (total * 100) / visible;
  const tx = -(index * slideW);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={FONT}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        if (dragging) onPointerUp();
      }}
    >
      <div className="mx-auto mb-2 flex max-w-7xl items-center justify-end gap-2 px-6">
        <button
          type="button"
          onClick={() => go(-1)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Next testimonial"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div
        className="cursor-grab overflow-hidden px-3 pb-20 pt-5 active:cursor-grabbing"
        onMouseDown={(event) => onPointerDown(event.pageX)}
        onMouseMove={(event) => {
          if (dragging) {
            event.preventDefault();
            onPointerMove(event.pageX);
          }
        }}
        onMouseUp={onPointerUp}
        onTouchStart={(event) => onPointerDown(event.touches[0].pageX)}
        onTouchMove={(event) => onPointerMove(event.touches[0].pageX)}
        onTouchEnd={onPointerUp}
      >
        <div
          onTransitionEnd={handleTransitionEnd}
          className={animate ? "transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]" : ""}
          style={{
            display: "flex",
            width: `${trackW}%`,
            transform: `translateX(calc(${tx}% + ${dragX}px))`,
            willChange: "transform",
          }}
        >
          {SLIDES.map((testimonial, slideIndex) => {
            const distance = Math.abs(slideIndex - index);
            const active = distance < visible;

            return (
              <div key={`${testimonial.id}-${slideIndex}`} className="flex-none px-3.5" style={{ width: `${slideW}%` }}>
                <motion.article
                  animate={reducedMotion ? undefined : { y: active ? 0 : 8, opacity: active ? 1 : 0.7 }}
                  transition={{ duration: 0.45 }}
                  className="relative min-h-[350px] overflow-hidden rounded-[26px] border border-white/10 bg-white p-7 shadow-2xl shadow-black/20 sm:p-8"
                >
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-red-50 blur-3xl" />
                  <div className="relative flex h-full min-h-[294px] flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <span className={`inline-flex rounded-full border px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] ${accentClasses[testimonial.accent]}`}>
                        {testimonial.industry}
                      </span>
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-white shadow-lg">
                        <Quote size={16} />
                      </div>
                    </div>

                    <p className="mt-8 text-lg font-bold leading-relaxed tracking-[-0.02em] text-slate-800 sm:text-xl">
                      “{testimonial.quote}”
                    </p>

                    <div className="mt-auto border-t border-slate-100 pt-6">
                      <div className="flex items-center gap-3">
                        <div className="grid h-11 w-11 place-items-center rounded-xl bg-slate-950 text-sm font-black text-white">
                          {testimonial.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-black text-slate-950">{testimonial.name}</div>
                          <div className="mt-0.5 text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">{testimonial.role}</div>
                        </div>
                        <ArrowUpRight size={15} className="text-slate-300" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
