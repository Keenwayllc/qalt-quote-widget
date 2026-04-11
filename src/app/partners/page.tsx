"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
};
import QaltLogo from "@/components/shared/QaltLogo";
import {
  ArrowRight,
  ArrowUp,
  Globe,
  Handshake,
  Rocket,
  Users,
  ExternalLink,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import PublicNav from "@/components/shared/PublicNav";
import { AnimatePresence } from "framer-motion";

/* ─── Partner Data ────────────────────────────────────────────────────────── */

interface Partner {
  name: string;
  logo: string;
  logoWhite?: string;
  category: string;
  description: string;
  longDescription: string;
  benefits: string[];
  url: string;
  cta: string;
  bgImage?: string;
}

const PARTNERS: Partner[] = [
  {
    name: "Keenway",
    logo: "/images/keenway-logo.png",
    logoWhite: "/images/keenway-logo.png",
    bgImage: "/images/keenway-hero.jpg",
    category: "Delivery Management",
    description:
      "A full delivery operations platform for couriers, dispatchers, and fleet owners.",
    longDescription:
      "Keenway is a delivery management platform built for courier and logistics companies that need more than just a quote tool. It covers the full operations loop: driver dispatch, real-time tracking, proof of delivery with photo capture, customer portal access, and admin dashboards. If you are ready to move beyond spreadsheets and text messages, Keenway is the next step.",
    benefits: [
      "Driver dispatch and job assignment in one place",
      "Proof of delivery with photo and signature capture",
      "Real-time driver tracking for admins and customers",
      "Customer-facing portal for tracking deliveries",
      "Bill of Lading and delivery documentation built in",
      "Works alongside your Qalt quote widget seamlessly",
    ],
    url: "https://www.gokeenway.com/",
    cta: "Visit Keenway",
  },
  {
    name: "UENI",
    logo: "/images/ueni-logo.png",
    category: "Website Builder",
    description:
      "Professional websites for small businesses, built and managed for you.",
    longDescription:
      "UENI builds professional, mobile-ready websites for small businesses in days, not weeks. They handle design, hosting, domain, and ongoing updates so you can focus on running your delivery business. If you do not have a website yet, UENI is the fastest way to get one and start embedding your Qalt quote widget.",
    benefits: [
      "Professional website built for you in days",
      "Mobile-optimized and SEO-ready out of the box",
      "Hosting, domain, and SSL included",
      "Perfect for embedding your Qalt quote widget",
      "Affordable plans for small businesses",
    ],
    url: "https://ueni.com",
    cta: "Visit UENI",
  },
];

/* ─── Why Partner Section Data ────────────────────────────────────────────── */

const WHY_PARTNER = [
  {
    icon: <Rocket className="text-red-600" size={24} />,
    title: "Grow Together",
    desc: "We refer our merchants to partners that help them succeed. When they grow, we all grow.",
  },
  {
    icon: <Users className="text-red-600" size={24} />,
    title: "Shared Audience",
    desc: "Delivery and courier companies need more than a quote widget. They need websites, insurance, fleet tools, and more.",
  },
  {
    icon: <Globe className="text-red-600" size={24} />,
    title: "Public Visibility",
    desc: "Partners are featured on this page, inside our merchant dashboard, and across our marketing channels.",
  },
];

/* ─── Main Page ───────────────────────────────────────────────────────────── */

export default function PartnersPage() {
  const [showScroll, setShowScroll] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    contactName: "",
    email: "",
    partnershipType: "Technology",
    message: "",
  });

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");
      
      setSubmitStatus("success");
      setFormData({
        companyName: "",
        website: "",
        contactName: "",
        email: "",
        partnershipType: "Technology",
        message: "",
      });
      // Optionally close form after a delay
      setTimeout(() => setIsFormOpen(false), 3000);
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <PublicNav />

      <main className="pt-32 sm:pt-40 pb-24 sm:pb-32">
        {/* Hero */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center mb-16 sm:mb-24 px-4 sm:px-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-100 mb-6 sm:mb-8">
            <Handshake size={14} />
            Qalt Partner Ecosystem
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-5 sm:mb-6">
            Tools That Help Your<br />
            <span className="text-red-600">Delivery Business Grow</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-4">
            We partner with the best tools and services so you can run your delivery business with everything you need in one place.
          </p>
          <p className="text-sm text-slate-400 font-medium">
            Trusted partners, hand-picked for courier and logistics companies.
          </p>
        </motion.div>

        {/* Partner Cards */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i}
              variants={fadeUp}
              className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
            >
              {/* Card Header */}
              {partner.bgImage ? (
                <div
                  className="relative p-8 sm:p-12 border-b border-slate-100 overflow-hidden"
                  style={{ backgroundImage: `url(${partner.bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
                >
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm flex items-center justify-center p-3 shrink-0">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        width={80}
                        height={80}
                        className="object-contain brightness-0 invert"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{partner.name}</h2>
                        <span className="px-3 py-1 bg-white/15 text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-white/25">
                          {partner.category}
                        </span>
                      </div>
                      <p className="text-white/75 font-medium text-base sm:text-lg">{partner.description}</p>
                    </div>
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-red-500 hover:-translate-y-0.5 transition-all shrink-0"
                    >
                      {partner.cta}
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="bg-linear-to-br from-slate-50 to-white p-8 sm:p-12 border-b border-slate-100">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center p-3 shrink-0">
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{partner.name}</h2>
                        <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-100">
                          {partner.category}
                        </span>
                      </div>
                      <p className="text-slate-500 font-medium text-base sm:text-lg">{partner.description}</p>
                    </div>
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-200 hover:bg-red-700 hover:-translate-y-0.5 transition-all shrink-0"
                    >
                      {partner.cta}
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              )}

              {/* Card Body */}
              <div className="p-8 sm:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                  <div>
                    <h3 className="text-lg font-black mb-4 text-slate-900">About {partner.name}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed text-sm sm:text-base">
                      {partner.longDescription}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-black mb-4 text-slate-900">Why This Partner</h3>
                    <ul className="space-y-3">
                      {partner.benefits.map((benefit, j) => (
                        <li key={j} className="flex items-start gap-3 text-slate-600 font-medium text-sm sm:text-base">
                          <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                            <ArrowRight size={10} className="text-red-600" />
                          </div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:hidden flex items-center justify-center gap-2 mt-8 px-6 py-4 bg-red-600 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-red-700 transition-all w-full"
                >
                  {partner.cta}
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Partner With Qalt */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-24 sm:mb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Why Partner With Qalt?</h2>
            <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">
              We are building the go-to platform for delivery businesses. Our partners are part of that mission.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {WHY_PARTNER.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={i}
                variants={fadeUp}
                className="bg-linear-to-b from-white to-slate-50 p-7 sm:p-9 rounded-xl border border-slate-200 hover:shadow-lg hover:shadow-red-900/5 hover:-translate-y-1 transition-all group"
              >
                <div className="w-12 h-12 bg-red-600/10 border border-red-100 rounded-lg flex items-center justify-center mb-6 sm:mb-7 group-hover:bg-red-600/15 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black mb-3 text-slate-900">{item.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed text-sm sm:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeIn}
          className="max-w-4xl mx-auto px-4 sm:px-6"
        >
          <div className="bg-linear-to-br from-[#150f0f] via-[#1c0f0f] to-[#2d1215] rounded-3xl p-8 sm:p-16 text-center relative overflow-hidden border border-white/5 shadow-2xl">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-[120px] -mr-48 -mt-48" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-700 rounded-full blur-[120px] -ml-48 -mb-48" />
            </div>
            
            <AnimatePresence mode="wait">
              {!isFormOpen ? (
                <motion.div
                  key="cta"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white/20">
                    <Handshake size={14} />
                    Partner Program
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 tracking-tight">
                    Scale With Qalt<br />
                    <span className="text-red-600">Let&apos;s Build Together.</span>
                  </h2>
                  <p className="text-slate-300 font-medium text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
                    Does your product help delivery companies thrive? Joins us in building the most powerful ecosystem in logistics.
                  </p>
                  <button
                    onClick={() => setIsFormOpen(true)}
                    className="inline-flex items-center gap-3 px-10 py-5 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-500 transition-all hover:scale-[1.02] shadow-xl shadow-red-900/40 text-lg"
                  >
                    <Handshake size={20} />
                    Become a Partner
                  </button>
                  <p className="text-sm text-slate-500 font-medium mt-6">Apply in less than 60 seconds</p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 text-left max-w-2xl mx-auto"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-black text-white">Partner Registry</h2>
                      <p className="text-slate-400 text-sm font-medium">Tell us about your business</p>
                    </div>
                    <button 
                      onClick={() => setIsFormOpen(false)}
                      className="text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest px-3 py-1 border border-white/10 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>

                  {submitStatus === "success" ? (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-500">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={32} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-black text-white mb-2">Application Received!</h3>
                      <p className="text-slate-300 font-medium">Our partnership team will review your profile and reach out to you within 48 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Company Name</label>
                          <input
                            required
                            type="text"
                            placeholder="e.g. FleetFlow Express"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-hidden focus:border-red-600 transition-colors font-medium"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Website URL</label>
                          <input
                            type="text"
                            placeholder="fleetflow.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-hidden focus:border-red-600 transition-colors font-medium"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Contact Name</label>
                          <input
                            required
                            type="text"
                            placeholder="Your name"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-hidden focus:border-red-600 transition-colors font-medium"
                            value={formData.contactName}
                            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Work Email</label>
                          <input
                            required
                            type="email"
                            placeholder="you@company.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-hidden focus:border-red-600 transition-colors font-medium"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Partnership Type</label>
                        <select
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-hidden focus:border-red-600 transition-colors font-medium"
                          value={formData.partnershipType}
                          onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                        >
                          <option value="Technology" className="bg-[#1c0f0f]">Technology / Software Integration</option>
                          <option value="Referral" className="bg-[#1c0f0f]">Referral / Agency Partner</option>
                          <option value="Logistics" className="bg-[#1c0f0f]">Logistics / Fleet Provider</option>
                          <option value="Insurance" className="bg-[#1c0f0f]">Insurance / Compliance</option>
                          <option value="Other" className="bg-[#1c0f0f]">Other</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Message</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="How can we help delivery companies grow together?"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-hidden focus:border-red-600 transition-colors font-medium resize-none"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>

                      {submitStatus === "error" && (
                        <div className="flex items-center gap-2 text-red-500 text-xs font-bold bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                          <AlertCircle size={14} />
                          Something went wrong. Please try again.
                        </div>
                      )}

                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-8 py-5 bg-red-600 text-white rounded-2xl font-black shadow-xl shadow-red-900/30 hover:bg-red-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin" size={20} />
                            Processing...
                          </>
                        ) : (
                          <>
                            Submit Registry
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-14 sm:py-20 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <QaltLogo size="md" />
              <p className="text-red-600 font-black text-sm mt-3">Your rates. Embedded. Anywhere.</p>
              <p className="text-slate-400 font-medium text-sm mt-2 max-w-[220px] leading-relaxed">
                Instant delivery quotes for your website. No manual quoting required.
              </p>
            </div>
            {/* Product */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Product</p>
              <ul className="space-y-3 text-sm font-medium text-slate-500">
                <li><Link href="/#features" className="hover:text-red-600 transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-red-600 transition-colors">Pricing</Link></li>
                <li><Link href="/#how-it-works" className="hover:text-red-600 transition-colors">How it Works</Link></li>
                <li><Link href="/#use-cases" className="hover:text-red-600 transition-colors">Use Cases</Link></li>
                <li><Link href="/partners" className="hover:text-red-600 transition-colors">Partners</Link></li>
                <li><Link href="/blog" className="hover:text-red-600 transition-colors">Blog</Link></li>
              </ul>
            </div>
            {/* Account */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Account</p>
              <ul className="space-y-3 text-sm font-medium text-slate-500">
                <li><Link href="/register" className="hover:text-red-600 transition-colors">Get Started Free</Link></li>
                <li><Link href="/login" className="hover:text-red-600 transition-colors">Log In</Link></li>
              </ul>
            </div>
            {/* Legal */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Legal</p>
              <ul className="space-y-3 text-sm font-medium text-slate-500">
                <li><Link href="/legal/privacy" className="hover:text-red-600 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/legal/terms" className="hover:text-red-600 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100">
            <p className="text-slate-400 font-medium text-sm text-center md:text-left">&copy; {new Date().getFullYear()} Qalt. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-red-600 text-white rounded-full shadow-lg shadow-red-200 flex items-center justify-center hover:bg-red-700 transition-all z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
