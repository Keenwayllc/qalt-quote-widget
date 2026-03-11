"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Calculator, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  MousePointerClick, 
  Layout, 
  BarChart3, 
  Code2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const BANNER_IMAGES = [
  "/images/banner-1.jpg",
  "/images/banner-2.jpg",
];

export default function LandingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BANNER_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % BANNER_IMAGES.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev === 0 ? BANNER_IMAGES.length - 1 : prev - 1));

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/qalt.png" alt="Qalt" width={100} height={32} className="h-8 w-auto" />
          </Link>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
              Log in
            </Link>
            <Link href="/register" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-24 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[120px] opacity-60 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100 rounded-full blur-[100px] opacity-40 -translate-x-1/2 translate-y-1/4"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest mb-8 animate-fade-in">
              <Zap size={14} className="fill-blue-700" />
              Now in Private Beta
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.9] mb-8">
              Instant Quotes. <br />
              <span className="text-blue-600">More Leads.</span> <br />
              Zero Friction.
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-500 font-medium leading-relaxed mb-12">
              The easiest way to add an embeddable delivery quote calculator to your website. Convert visitors into customers in seconds.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="group w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-[20px] text-lg font-bold flex items-center justify-center gap-3 shadow-2xl shadow-slate-200 hover:bg-blue-600 hover:-translate-y-1 transition-all">
                Get Started for Free
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#features" className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-slate-100 text-slate-600 rounded-[20px] text-lg font-bold hover:bg-slate-50 transition-all text-center">
                Explore Features
              </Link>
            </div>

            {/* Mockup / Dashboard Preview with Banner */}
            <div className="mt-24 relative max-w-5xl mx-auto group">
              <div className="absolute inset-0 bg-blue-600/5 rounded-[40px] -rotate-1 scale-[1.02] -z-10"></div>
              <div className="bg-white rounded-[40px] p-4 shadow-2xl border border-slate-100 overflow-hidden relative">
                <div className="rounded-[32px] overflow-hidden bg-slate-50 aspect-video relative">
                  {BANNER_IMAGES.map((img, index) => (
                    <div 
                      key={img}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <Image 
                        src={img} 
                        alt={`Qalt Showcase ${index + 1}`}
                        fill 
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                    </div>
                  ))}
                  
                  {/* Controls */}
                  <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={prevImage}
                      className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>

                  {/* Indicator */}
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                    {BANNER_IMAGES.map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-2 rounded-full transition-all ${i === currentImageIndex ? 'bg-white w-6' : 'bg-white/40'}`} 
                      />
                    ))}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white/90 backdrop-blur-xl p-10 rounded-[32px] shadow-2xl border border-white/50 flex flex-col items-center gap-6 max-w-md text-center transform translate-y-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
                        <Calculator size={32} />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900">Your Custom Widget</h3>
                      <p className="text-slate-500 font-medium">Embed our beautifully designed calculator directly into your homepage or landing pages.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
              <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Features</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Everything you need to grow.</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
              {[
                {
                  icon: <Code2 size={24} />,
                  title: "Copy-Paste Integration",
                  desc: "Add Qalt to WordPress, Webflow, Shopify, or any custom site with one line of code."
                },
                {
                  icon: <Layout size={24} />,
                  title: "Custom Pricing Engine",
                  desc: "Define your base rates, mileage fees, and extra charges (stairs, items) in seconds."
                },
                {
                  icon: <MousePointerClick size={24} />,
                  title: "Smart Lead Capture",
                  desc: "Automatically save every quote request as a high-intent lead in your dashboard."
                },
                {
                  icon: <BarChart3 size={24} />,
                  title: "Insightful Analytics",
                  desc: "Track how many people are requesting quotes and see which locations are most popular."
                },
                {
                  icon: <ShieldCheck size={24} />,
                  title: "Reliable & Fast",
                  desc: "Built on high-performance infrastructure to ensure your widget is always ready."
                },
                {
                  icon: <CheckCircle2 size={24} />,
                  title: "Instant Verification",
                  desc: "Get notified the moment a customer requests a quote, including their contact info."
                }
              ].map((feature, i) => (
                <div key={i} className="bg-white p-10 rounded-[32px] border border-slate-100 hover:shadow-xl transition-all">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-4">{feature.title}</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="flex-1">
                <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.3em] mb-4">The Process</h2>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-8">Go live in under 5 minutes.</h3>
                
                <div className="space-y-8">
                  {[
                    { step: "01", title: "Create Your Account", desc: "Sign up and set your company name and default service rates." },
                    { step: "02", title: "Configure Your Widget", desc: "Customize colors, button text, and add extra fee triggers." },
                    { step: "03", title: "Copy & Paste", desc: "Grab your unique embed code and drop it into your website editor." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="text-2xl font-black text-blue-100">{item.step}</div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-slate-500 font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/register" className="inline-flex items-center gap-2 mt-12 text-blue-600 font-black uppercase tracking-widest text-sm hover:gap-4 transition-all">
                  Start Building Now <ArrowRight size={16} />
                </Link>
              </div>
              
              <div className="flex-1 w-full">
                <div className="bg-slate-900 rounded-[40px] p-10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-2xl rounded-full"></div>
                  <pre className="text-blue-400 text-sm font-mono leading-relaxed">
                    <code>
{`<iframe 
  src="https://qalt.io/widget/..." 
  width="100%" 
  height="700px" 
  frameborder="0"
></iframe>`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-blue-600 rounded-[40px] p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 blur-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 blur-[120px] translate-x-1/2 translate-y-1/2 rounded-full"></div>
              
              <h3 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Ready to automate your quotes?</h3>
              <p className="max-w-xl mx-auto text-blue-100 text-xl font-medium mb-12">
                Join hundreds of delivery companies using Qalt to save time and grow their business.
              </p>
              
              <Link href="/register" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 rounded-[20px] text-lg font-black hover:bg-blue-50 hover:-translate-y-1 transition-all shadow-xl">
                Create Your Account <Zap size={20} className="fill-blue-600" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Image src="/images/qalt.png" alt="Qalt" width={100} height={32} className="h-6 w-auto" />
            <p className="text-slate-400 text-sm font-medium">&copy; {new Date().getFullYear()} Qalt. All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-8 text-xs font-black text-slate-400 uppercase tracking-widest">
            <Link href="/login" className="hover:text-slate-900 transition-colors">Privacy</Link>
            <Link href="/login" className="hover:text-slate-900 transition-colors">Terms</Link>
            <Link href="/login" className="hover:text-slate-900 transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
