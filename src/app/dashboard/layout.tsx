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
  DollarSign
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
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
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-8">
            <QaltLogo size="sm" />
          </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          <div className="mb-6 px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Menu
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                   flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group
                  ${isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}
                `}
              >
                <item.icon
                  className={`
                    mr-3 h-5 w-5 shrink-0 transition-colors
                    ${isActive ? "text-blue-700" : "text-slate-400 group-hover:text-slate-600"}
                  `}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex w-full items-center px-3 py-2.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 text-slate-400" />
            {isLoggingOut ? "Logging out..." : "Log out"}
          </button>
        </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="md:hidden bg-white border-b border-slate-200 h-24 flex items-center justify-between px-6">
          <QaltLogo size="sm" />
        </header>

        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
