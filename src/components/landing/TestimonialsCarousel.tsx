import { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  industry: string;
  quote: string;
  image: string;
  initials: string;
  color: string;
  video?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Liam Bloom",
    role: "Owner, Bloom & Stem",
    industry: "Floral & Gift Shop",
    quote: "Our flower delivery business needed a way to give instant quotes for local deliveries. Qalt made it seamless. Our conversion rate for weekend bouquets tripled!",
    image: "/testimonials/liam.png",
    initials: "LB",
    color: "bg-pink-500",
    video: "/videos/liam_bloom.mp4"
  },
  {
    id: 2,
    name: "Sophia Rossi",
    role: "Founder, Rossi Bakery",
    industry: "Boutique Bakery",
    quote: "Custom cakes are hard to price on the fly. With the Qalt widget, customers get a delivery estimate immediately, and we save hours of back-and-forth emails.",
    image: "/testimonials/sophia.png",
    initials: "SR",
    color: "bg-amber-500",
    video: "/videos/sophia_rossi.mp4"
  },
  {
    id: 3,
    name: "David Chen",
    role: "Operations, CorePulse",
    industry: "Tech Hardware",
    quote: "We deliver high-end servers. Precision and reliability are key. Qalt's pricing engine handles our weight-based variables perfectly. It's transformed our B2B game.",
    image: "/testimonials/david.png",
    initials: "DC",
    color: "bg-blue-600",
    video: "/videos/david_chen.mp4"
  },
  {
    id: 4,
    name: "Marcus Thorne",
    role: "Director, Thorne Express",
    industry: "Last-Mile Courier",
    quote: "Scaling a courier service is all about transparency. Qalt gives our customers the confidence they need to book instantly. Best tech investment we've ever made.",
    image: "/testimonials/marcus.png",
    initials: "MT",
    color: "bg-slate-700",
    video: "/videos/marcus_thorne.mp4"
  },
  {
    id: 5,
    name: "Elena Vance",
    role: "Manager, Vance Interiors",
    industry: "Modern Furniture",
    quote: "Delivery and assembly quotes used to be a bottleneck. Now, it's a 30-second process for our clients. Qalt's white-labeling matches our luxury aesthetic perfectly.",
    image: "/testimonials/elena.png",
    initials: "EV",
    color: "bg-indigo-600",
    video: "/videos/elena_vance.mp4"
  },
  {
    id: 6,
    name: "Samira Joudi",
    role: "Founder, Velour",
    industry: "Retail Boutique",
    quote: "Qalt isn't just for 'delivery companies'. As a small retailer, it lets me offer premium local delivery that competes with the giants. My customers love the simplicity.",
    image: "/testimonials/samira.png",
    initials: "SJ",
    color: "bg-emerald-500",
    video: "/videos/samira_joudi.mp4"
  },
  {
    id: 7,
    name: "James Miller",
    role: "Lead Pharmacist, City Meds",
    industry: "Pharmacy & Healthcare",
    quote: "Ensuring time-sensitive medical deliveries is critical. Qalt's precise pricing and automated workflow give our patients peace of mind and keep our logistics efficient.",
    image: "/testimonials/james.png",
    initials: "JM",
    color: "bg-cyan-600",
    video: "/videos/james_miller.mp4"
  }
];

const COUNT = TESTIMONIALS.length;
// 3 copies for seamless infinite loop
const SLIDES = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(COUNT); // start at middle copy
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const startRef = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Seamless wrap: after transition ends, silently jump to the middle copy
  const handleTransitionEnd = useCallback(() => {
    if (index >= COUNT * 2) {
      setAnimate(false);
      setIndex(index - COUNT);
    } else if (index < COUNT) {
      setAnimate(false);
      setIndex(index + COUNT);
    }
  }, [index]);

  // Re-enable animation after a silent jump
  useEffect(() => {
    if (!animate) {
      // Force a layout read then re-enable in next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    }
  }, [animate]);

  // Auto-advance
  useEffect(() => {
    if (paused || dragging) return;
    const id = setInterval(() => {
      setAnimate(true);
      setIndex((i) => i + 1);
    }, 4500);
    return () => clearInterval(id);
  }, [paused, dragging]);

  const go = (dir: 1 | -1) => {
    setAnimate(true);
    setIndex((i) => i + dir);
  };

  // --- drag / touch ---
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
    const threshold = 80;
    if (dragX < -threshold) go(1);
    else if (dragX > threshold) go(-1);
    else setAnimate(true);
    setDragX(0);
  };

  const visible = typeof window !== "undefined"
    ? window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3
    : 3;

  const total = SLIDES.length;
  const slideW = 100 / total;
  const trackW = (total * 100) / visible;
  const tx = -(index * slideW);

  return (
    <div
      className="relative w-full group overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); if (dragging) onPointerUp(); }}
    >
      {/* Arrows */}
      <button
        onClick={() => go(-1)}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-40 p-3 bg-slate-900/80 hover:bg-slate-900 border border-white/10 rounded-full text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-2xl"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-40 p-3 bg-slate-900/80 hover:bg-slate-900 border border-white/10 rounded-full text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-2xl"
        aria-label="Next testimonial"
      >
        <ChevronRight size={24} />
      </button>

      {/* Track */}
      <div
        className="relative overflow-hidden cursor-grab active:cursor-grabbing px-4 py-20"
        onMouseDown={(e) => onPointerDown(e.pageX)}
        onMouseMove={(e) => { if (dragging) { e.preventDefault(); onPointerMove(e.pageX); } }}
        onMouseUp={onPointerUp}
        onMouseLeave={() => { if (dragging) onPointerUp(); }}
        onTouchStart={(e) => onPointerDown(e.touches[0].pageX)}
        onTouchMove={(e) => onPointerMove(e.touches[0].pageX)}
        onTouchEnd={onPointerUp}
      >
        <div
          ref={trackRef}
          onTransitionEnd={handleTransitionEnd}
          className={animate ? "transition-transform duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""}
          style={{
            display: "flex",
            width: `${trackW}%`,
            transform: `translateX(calc(${tx}% + ${dragX}px))`,
            willChange: "transform",
          }}
        >
          {SLIDES.map((t, idx) => (
            <div
              key={`${t.id}-${idx}`}
              className="flex-none px-4"
              style={{ width: `${slideW}%` }}
            >
              <div className="h-[380px] relative overflow-hidden p-8 bg-[#0a0f1e] border border-white/5 rounded-[28px] hover:border-white/20 transition-all duration-500 flex flex-col justify-between group/card select-none shadow-2xl">
                {t.video && (
                  <>
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover z-0 opacity-30 group-hover/card:opacity-50 transition-opacity duration-700 block bg-black"
                    >
                      <source src={t.video} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-linear-to-b from-slate-950/20 via-slate-950/60 to-slate-950/90 z-10" />
                  </>
                )}

                <div className="relative z-20">
                  <div className="mb-6">
                    <span className="px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-blue-500/20 backdrop-blur-sm">
                      {t.industry}
                    </span>
                  </div>
                  <p className="text-lg md:text-xl font-medium text-white/95 mb-6 italic leading-relaxed tracking-tight text-shadow-md">
                    &quot;{t.quote}&quot;
                  </p>
                </div>

                <div className="relative z-20 flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className={`w-12 h-12 ${t.color} rounded-xl flex items-center justify-center shadow-lg group-hover/card:scale-110 transition-transform duration-500 ring-1 ring-white/10`}>
                    <span className="text-white font-black text-base">{t.initials}</span>
                  </div>
                  <div>
                    <div className="font-bold text-white text-base tracking-tight">{t.name}</div>
                    <div className="text-blue-400 text-[9px] font-black uppercase tracking-[0.15em] mt-1 opacity-80">{t.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
