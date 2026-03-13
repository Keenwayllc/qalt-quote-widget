"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import QaltLogo from "@/components/shared/QaltLogo";
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Code, 
  LogOut,
  Menu,
  X,
  CreditCard,
  DollarSign,
  Lock,
  BarChart3
} from "lucide-react";
import { getEntitlements } from "@/lib/plans";

export default function DashboardClientLayout({
  children,
  subscriptionPlan,
}: {
  children: React.ReactNode;
  subscriptionPlan: string;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const entitlements = getEntitlements(subscriptionPlan);

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { 
      name: "Analytics", 
      href: "/dashboard/analytics", 
      icon: BarChart3, 
      isLocked: !entitlements.isAnalyticsDashboardEnabled 
    },
    { name: "Pricing Settings", href: "/dashboard/pricing", icon: DollarSign },
    { name: "Widget Appearance", href: "/dashboard/widget", icon: Settings },
    { name: "Get Embed Code", href: "/dashboard/embed", icon: Code },
    { name: "Quotes", href: "/dashboard/quotes", icon: FileText },
    { name: "Subscription", href: "/dashboard/billing", icon: CreditCard },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-8">
            <Link href="/dashboard" className="transition-opacity hover:opacity-80">
              <QaltLogo size="xl" />
            </Link>
          </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="mb-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Merchant Console
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const isLocked = item.isLocked;

            return (
              <Link
                key={item.href}
                href={isLocked ? "/dashboard/billing" : item.href}
                className={`
                   flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all group relative
                  ${isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-[1.02]" 
                    : isLocked
                      ? "text-slate-400 cursor-not-allowed opacity-70"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"}
                `}
              >
                <item.icon
                  className={`
                    mr-3 h-5 w-5 shrink-0 transition-colors
                    ${isActive ? "text-white" : isLocked ? "text-slate-300" : "text-slate-400 group-hover:text-slate-900"}
                  `}
                />
                <span className="flex-1">{item.name}</span>
                {isLocked && (
                  <Lock size={12} className="text-amber-500 ml-2" />
                )}
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-100/60">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex w-full items-center px-4 py-3 text-sm font-bold text-slate-600 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all group"
          >
            <LogOut className="mr-3 h-5 w-5 text-slate-400 group-hover:text-rose-500 transition-colors" />
            {isLoggingOut ? "Logging out..." : "Log out"}
          </button>
        </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Subtle Background Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-indigo-400/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Mobile header */}
        <header className="lg:hidden bg-white/80 backdrop-blur-md border-b border-slate-200 h-20 flex items-center justify-between px-6 shrink-0 relative z-10">
          <QaltLogo size="xl" />
        </header>

        <div className="flex-1 overflow-auto relative z-10 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
