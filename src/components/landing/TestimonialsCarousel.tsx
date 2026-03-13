"use client";

import { useEffect, useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  industry: string;
  quote: string;
  image: string;
  initials: string;
  color: string;
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
    color: "bg-pink-500"
  },
  {
    id: 2,
    name: "Sophia Rossi",
    role: "Founder, Rossi Bakery",
    industry: "Boutique Bakery",
    quote: "Custom cakes are hard to price on the fly. With the Qalt widget, customers get a delivery estimate immediately, and we save hours of back-and-forth emails.",
    image: "/testimonials/sophia.png",
    initials: "SR",
    color: "bg-amber-500"
  },
  {
    id: 3,
    name: "David Chen",
    role: "Operations, CorePulse",
    industry: "Tech Hardware",
    quote: "We deliver high-end servers. Precision and reliability are key. Qalt's pricing engine handles our weight-based variables perfectly. It's transformed our B2B game.",
    image: "/testimonials/david.png",
    initials: "DC",
    color: "bg-blue-600"
  },
  {
    id: 4,
    name: "Marcus Thorne",
    role: "Director, Thorne Express",
    industry: "Last-Mile Courier",
    quote: "Scaling a courier service is all about transparency. Qalt gives our customers the confidence they need to book instantly. Best tech investment we've ever made.",
    image: "/testimonials/marcus.png",
    initials: "MT",
    color: "bg-slate-700"
  },
  {
    id: 5,
    name: "Elena Vance",
    role: "Manager, Vance Interiors",
    industry: "Modern Furniture",
    quote: "Delivery and assembly quotes used to be a bottleneck. Now, it's a 30-second process for our clients. Qalt's white-labeling matches our luxury aesthetic perfectly.",
    image: "/testimonials/elena.png",
    initials: "EV",
    color: "bg-indigo-600"
  },
  {
    id: 6,
    name: "Samira Joudi",
    role: "Founder, Velour",
    industry: "Retail Boutique",
    quote: "Qalt isn't just for 'delivery companies'. As a small retailer, it lets me offer premium local delivery that competes with the giants. My customers love the simplicity.",
    image: "/testimonials/samira.png",
    initials: "SJ",
    color: "bg-emerald-500"
  },
  {
    id: 7,
    name: "James Miller",
    role: "Lead Pharmacist, City Meds",
    industry: "Pharmacy & Healthcare",
    quote: "Ensuring time-sensitive medical deliveries is critical. Qalt's precise pricing and automated workflow give our patients peace of mind and keep our logistics efficient.",
    image: "/testimonials/james.png",
    initials: "JM",
    color: "bg-cyan-600"
  }
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div 
      className="relative w-full overflow-hidden py-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="flex transition-transform duration-700 ease-in-out gap-6"
        style={{ transform: `translateX(-${currentIndex * (100 / (typeof window !== 'undefined' && window.innerWidth < 1024 ? (window.innerWidth < 768 ? 1 : 2) : 3))}%)` }}
      >
        {TESTIMONIALS.map((testimonial) => (
          <div 
            key={testimonial.id}
            className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <div className="h-full p-9 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/8 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="mb-6">
                  <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/5">
                    {testimonial.industry}
                  </span>
                </div>
                
                <p className="text-xl font-medium text-white/80 mb-8 italic leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${testimonial.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <span className="text-white font-black text-sm">{testimonial.initials}</span>
                </div>
                <div>
                  <div className="font-bold text-white text-base tracking-tight">{testimonial.name}</div>
                  <div className="text-blue-400 text-xs font-black uppercase tracking-widest">{testimonial.role}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-3 mt-12">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              currentIndex === i ? 'w-12 bg-blue-500' : 'w-2 bg-slate-800'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
