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
  BarChart3,
  UserCircle,
  FormInput
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
    { name: "My Forms", href: "/dashboard/forms", icon: FormInput },
    { name: "Widget Appearance", href: "/dashboard/widget", icon: Settings },
    { name: "Get Embed Code", href: "/dashboard/embed", icon: Code },
    { name: "Quotes", href: "/dashboard/quotes", icon: FileText },
    { name: "Subscription", href: "/dashboard/billing", icon: CreditCard },
    { name: "Account Settings", href: "/dashboard/settings", icon: UserCircle },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* Mobile backdrop overlay — closes sidebar on tap outside */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white/90 backdrop-blur-xl border-r border-slate-200/60 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar logo row — includes close button on mobile */}
          <div className="p-6 sm:p-8 flex items-center justify-between">
            <Link href="/dashboard" className="transition-opacity hover:opacity-80" onClick={closeSidebar}>
              <QaltLogo size="xl" />
            </Link>
            <button
              onClick={closeSidebar}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
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
                  onClick={closeSidebar}
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

        {/* Mobile header with hamburger */}
        <header className="lg:hidden bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 shrink-0 relative z-10">
          <QaltLogo size="xl" />
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </header>

        <div className="flex-1 overflow-auto relative z-10 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
