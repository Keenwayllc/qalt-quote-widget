import { useEffect, useState, useCallback } from "react";
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

// Combine for infinite loop (3 sets to ensure enough content in both directions)
const DISPLAY_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(TESTIMONIALS.length); // Start in the middle set
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev: number) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev: number) => prev - 1);
  }, []);

  // Handle infinite wrap-around
  useEffect(() => {
    if (currentIndex >= TESTIMONIALS.length * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(TESTIMONIALS.length);
      }, 700); // Match transition duration
    } else if (currentIndex < TESTIMONIALS.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(TESTIMONIALS.length * 2 - 1);
      }, 700);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (isPaused || isDragging) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, isDragging, nextSlide]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - dragOffset);
    setIsTransitioning(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - startX;
    setDragOffset(x);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Determine if we should snap to next/prev or stay
    const threshold = 100;
    if (dragOffset < -threshold) {
      nextSlide();
    } else if (dragOffset > threshold) {
      prevSlide();
    }
    setDragOffset(0);
    setIsTransitioning(true);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - dragOffset);
    setIsTransitioning(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - startX;
    setDragOffset(x);
  };

  const getVisibleItems = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const visibleItems = getVisibleItems();
  const totalItems = DISPLAY_TESTIMONIALS.length;

  return (
    <div 
      className="relative w-full group overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        if (isDragging) handleMouseUp();
      }}
    >
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-40 p-3 bg-slate-900/80 hover:bg-slate-900 border border-white/10 rounded-full text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-2xl"
        aria-label="Previous testimonial"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-40 p-3 bg-slate-900/80 hover:bg-slate-900 border border-white/10 rounded-full text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-2xl"
        aria-label="Next testimonial"
      >
        <ChevronRight size={24} />
      </button>

      {/* Carousel Container */}
      <div
        className="relative overflow-hidden cursor-grab active:cursor-grabbing px-4 py-20"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <div 
          className={`flex ${isTransitioning ? "transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" : "transition-none"} ${isDragging ? "transition-none" : ""}`}
          style={{ 
            transform: `translateX(calc(-${currentIndex} * (100% / ${totalItems}) + ${dragOffset}px))`,
            width: `${(totalItems * 100) / visibleItems}%`,
            willChange: "transform" 
          }}
        >
          {DISPLAY_TESTIMONIALS.map((testimonial, idx) => (
            <div 
              key={`${testimonial.id}-${idx}`}
              className="flex-none px-4"
              style={{ width: `${100 / totalItems}%` }}
            >
              <div className="h-[380px] relative overflow-hidden p-8 bg-[#0a0f1e] border border-white/5 rounded-[28px] hover:border-white/20 transition-all duration-500 flex flex-col justify-between group/card select-none shadow-2xl">
                {testimonial.video && (
                  <>
                    <video
                      key={`video-${testimonial.id}-${idx}`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 group-hover/card:opacity-50 transition-opacity duration-700"
                    >
                      <source src={testimonial.video} type={testimonial.video.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
                      <source src={testimonial.video.endsWith('.mp4') ? testimonial.video.replace('.mp4', '.mov') : testimonial.video.replace('.mov', '.mp4')} type={testimonial.video.endsWith('.mp4') ? 'video/quicktime' : 'video/mp4'} />
                    </video>
                    {/* Balanced dark overlay */}
                    <div className="absolute inset-0 bg-linear-to-b from-slate-950/20 via-slate-950/60 to-slate-950/90 z-10" />
                  </>
                )}
                
                <div className="relative z-20">
                  <div className="mb-6">
                    <span className="px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-blue-500/20 backdrop-blur-sm">
                      {testimonial.industry}
                    </span>
                  </div>
                  
                  <p className="text-lg md:text-xl font-medium text-white/95 mb-6 italic leading-relaxed tracking-tight text-shadow-md">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </div>

                <div className="relative z-20 flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className={`w-12 h-12 ${testimonial.color} rounded-xl flex items-center justify-center shadow-lg group-hover/card:scale-110 transition-transform duration-500 ring-1 ring-white/10`}>
                    <span className="text-white font-black text-base">{testimonial.initials}</span>
                  </div>
                  <div>
                    <div className="font-bold text-white text-base tracking-tight">{testimonial.name}</div>
                    <div className="text-blue-400 text-[9px] font-black uppercase tracking-[0.15em] mt-1 opacity-80">{testimonial.role}</div>
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
