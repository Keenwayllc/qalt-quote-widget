"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  FormInput,
  Eye,
  HelpCircle,
  Webhook,
  MapPin,
  Briefcase,
  Star,
} from "lucide-react";
import { getEntitlements } from "@/lib/plans";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { CompanyProfileProvider, useCompanyProfile } from "@/context/CompanyProfileContext";
import WelcomeToast from "@/components/dashboard/WelcomeToast";

interface DashboardLayoutProps {
  children: React.ReactNode;
  subscriptionPlan: string;
  pendingCount?: number;
  companyId?: string;
  trialDaysLeft?: number | null;
  trialEnded?: boolean;
  incompleteHrefs?: string[];
  companyName?: string;
  logoUrl?: string;
  profilePicUrl?: string;
}

export default function DashboardClientLayout(props: DashboardLayoutProps) {
  return (
    <CompanyProfileProvider
      initial={{
        logoUrl: props.logoUrl ?? "",
        profilePicUrl: props.profilePicUrl ?? "",
        companyName: props.companyName ?? "",
      }}
    >
      <DashboardLayoutInner {...props} />
    </CompanyProfileProvider>
  );
}

function DashboardLayoutInner({
  children,
  subscriptionPlan,
  pendingCount = 0,
  companyId,
  trialDaysLeft,
  trialEnded = false,
  incompleteHrefs = [],
  companyName,
}: DashboardLayoutProps) {
  const { logoUrl, profilePicUrl, companyName: profileName } = useCompanyProfile();
  const displayName = profileName || companyName;
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [quoteCount, setQuoteCount] = useState<number | null>(null);

  const entitlements = getEntitlements(subscriptionPlan);

  // Fetch total quote count for the sidebar badge
  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch("/api/dashboard/quote-count");
        if (res.ok) {
          const data = await res.json();
          setQuoteCount(data.count ?? null);
        }
      } catch {
        // silently ignore — badge is non-critical
      }
    }
    fetchCount();
  }, []);

  const navItems = [
    // Monitor — your day-to-day
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Quotes", href: "/dashboard/quotes", icon: FileText, showBadge: true },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
      isLocked: !entitlements.isAnalyticsDashboardEnabled
    },
    // Build your widget — configure, price, style, then ship it
    { name: "My Forms", href: "/dashboard/forms", icon: FormInput },
    { name: "Pricing Settings", href: "/dashboard/pricing", icon: DollarSign },
    { name: "Widget Appearance", href: "/dashboard/widget", icon: Settings },
    { name: "Get Embed Code", href: "/dashboard/embed", icon: Code },
    // Advanced & account
    {
      name: "Webhooks",
      href: "/dashboard/webhooks",
      icon: Webhook,
      isLocked: !entitlements.isWebhookEnabled,
    },
    { name: "Subscription", href: "/dashboard/billing", icon: CreditCard },
    { name: "Account Settings", href: "/dashboard/settings", icon: UserCircle },
    { name: "What's New", href: "/dashboard/whats-new", icon: Star },
    { name: "Help & FAQ", href: "/dashboard/support", icon: HelpCircle },
  ];

  const opsNavItems = [
    { name: "Jobs Dashboard", href: "/dashboard/ops/jobs", icon: Briefcase },
    { name: "Saved Stop Notes", href: "/dashboard/ops/stops", icon: MapPin },
    { name: "Delivery Readiness", href: "/dashboard/ops/readiness", icon: Eye },
  ];

  const router = useRouter();
  const logoRef = useRef<HTMLButtonElement>(null);

  const handleLogoClick = () => {
    const el = logoRef.current;
    if (el) {
      el.animate(
        [
          { transform: "scale(1) rotate(0deg)", opacity: "1" },
          { transform: "scale(1.18) rotate(-6deg)", opacity: "0.85" },
          { transform: "scale(0.92) rotate(3deg)", opacity: "0.95" },
          { transform: "scale(1) rotate(0deg)", opacity: "1" },
        ],
        { duration: 420, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" }
      );
    }
    closeSidebar();
    router.push("/dashboard");
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#0a0a0a] font-sans selection:bg-red-100 selection:text-red-900 transition-colors duration-300">

      {/* Mobile backdrop overlay — closes sidebar on tap outside */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white/95 dark:bg-[#111111] backdrop-blur-xl border-r border-slate-200/60 dark:border-white/6 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar logo row — includes close button on mobile */}
          <div className="p-6 sm:p-8 flex items-center justify-between">
            <button
              ref={logoRef}
              onClick={handleLogoClick}
              className="focus:outline-none will-change-transform transition-transform duration-200 hover:scale-105 hover:-rotate-2 active:scale-95"
              aria-label="Go to dashboard home"
            >
              <QaltLogo size="lg" />
            </button>
            <button
              onClick={closeSidebar}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Post-trial downgrade banner — hide on billing itself */}
          {trialEnded && !pathname.startsWith("/dashboard/billing") && (
            <div className="mx-4 mb-2 rounded-xl px-4 py-3 text-sm font-bold bg-slate-900 text-white">
              <div className="flex items-center gap-2 mb-1">
                <span>✨</span>
                <span className="font-black">Your PRO trial ended</span>
              </div>
              <p className="text-xs text-white/80 mb-1">You're on STARTER. Upgrade to restore PRO features.</p>
              <Link href="/dashboard/billing" className="text-xs underline underline-offset-2 font-black text-white/90 hover:text-white">
                Upgrade →
              </Link>
            </div>
          )}

          {/* Trial countdown banner */}
          {trialDaysLeft !== null && trialDaysLeft !== undefined && (
            <div className={`mx-4 mb-2 rounded-xl px-4 py-3 text-sm font-bold ${
              trialDaysLeft <= 3
                ? "bg-red-600 text-white"
                : "bg-amber-50 text-amber-800 border border-amber-200"
            }`}>
              <div className="flex items-center gap-2 mb-1">
                <span>{trialDaysLeft <= 3 ? "⚠️" : "🕐"}</span>
                <span className="font-black">
                  {trialDaysLeft === 0
                    ? "Trial expires today"
                    : `${trialDaysLeft} day${trialDaysLeft === 1 ? "" : "s"} left in trial`}
                </span>
              </div>
              <Link
                href="/dashboard/billing"
                className={`text-xs underline underline-offset-2 font-black ${
                  trialDaysLeft <= 3 ? "text-white/90 hover:text-white" : "text-amber-700 hover:text-amber-900"
                }`}
              >
                Upgrade now →
              </Link>
            </div>
          )}

          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
            <div className="mb-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Merchant Console
            </div>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const isLocked = item.isLocked;
              const showBadge = (item as { showBadge?: boolean }).showBadge && quoteCount !== null && quoteCount > 0;
              const needsAttention = !isActive && !isLocked && incompleteHrefs.includes(item.href);

              return (
                <Link
                  key={item.href}
                  href={isLocked ? "/dashboard/billing" : item.href}
                  onClick={closeSidebar}
                  className={`
                     flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-all group relative
                    ${isActive
                      ? "bg-red-600 text-white shadow-none scale-[1.02]"
                      : isLocked
                        ? "text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-70"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"}
                  `}
                >
                  <item.icon
                    className={`
                      mr-3 h-5 w-5 shrink-0 transition-colors
                      ${isActive ? "text-white" : isLocked ? "text-slate-300 dark:text-slate-600" : "text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"}
                    `}
                  />
                  <span className="flex-1">{item.name}</span>

                  {/* Quote count badge */}
                  {showBadge && !isLocked && (
                    <span
                      className={`
                        ml-2 min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-black flex items-center justify-center
                        ${isActive ? "bg-white/20 text-white" : "bg-red-600 text-white"}
                      `}
                    >
                      {quoteCount! > 99 ? "99+" : quoteCount}
                    </span>
                  )}


                  {isLocked && (
                    <Lock size={12} className="text-amber-500 ml-2" />
                  )}
                  {needsAttention && (
                    <span className="ml-2 relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Field Operations Section */}
            <div className="mt-4 mb-3 px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Field Operations
            </div>
            {opsNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`
                     flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-all group relative
                    ${isActive
                      ? "bg-slate-900 dark:bg-white/10 dark:text-white text-white shadow-none scale-[1.02]"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"}
                  `}
                >
                  <item.icon
                    className={`
                      mr-3 h-5 w-5 shrink-0 transition-colors
                      ${isActive ? "text-white dark:text-slate-900" : "text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"}
                    `}
                  />
                  <span className="flex-1">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 mt-auto border-t border-slate-100/60 dark:border-white/6 space-y-1">
            <ThemeToggle />
            {/* Company identity card */}
            {(displayName || logoUrl || profilePicUrl) && (
              <Link
                href="/dashboard/settings"
                onClick={closeSidebar}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100/80 dark:hover:bg-white/5 transition-all group mb-1"
              >
                {/* Avatar: profile pic > logo initial > letter */}
                <div className="relative shrink-0">
                  {profilePicUrl ? (
                    <img
                      src={profilePicUrl}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-200 group-hover:ring-red-200 transition-all"
                    />
                  ) : logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="Logo"
                      className="w-9 h-9 rounded-xl object-cover ring-2 ring-slate-200 group-hover:ring-red-200 transition-all"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center ring-2 ring-slate-200 group-hover:ring-red-200 transition-all">
                      <span className="text-red-600 font-black text-sm">
                        {displayName?.[0]?.toUpperCase() ?? "?"}
                      </span>
                    </div>
                  )}
                  {/* Small logo badge overlaid on profile pic */}
                  {profilePicUrl && logoUrl && (
                    <img
                      src={logoUrl}
                      alt=""
                      className="absolute -bottom-1 -right-1 w-4 h-4 rounded-sm object-cover ring-1 ring-white"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-slate-900 dark:group-hover:text-white">
                    {displayName ?? "My Company"}
                  </p>
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 capitalize">{subscriptionPlan} Plan</p>
                </div>
              </Link>
            )}
            {companyId && (
              <a
                href={`/widget/${companyId}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeSidebar}
                className="flex w-full items-center px-4 py-3 text-sm font-bold text-red-600 rounded-xl hover:bg-red-50 transition-all group"
              >
                <Eye className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-600 transition-colors" />
                Preview Widget
              </a>
            )}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex w-full items-center px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-400 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 transition-all group"
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
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-400/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-red-400/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Mobile header with hamburger */}
        <header className="lg:hidden bg-white/80 dark:bg-[#111111]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/6 h-16 flex items-center justify-between px-4 sm:px-6 shrink-0 relative z-10 transition-colors">
          <QaltLogo size="md" />
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </header>

        <div className="flex-1 overflow-auto relative z-10 custom-scrollbar">
          {children}
        </div>
      </main>

      <WelcomeToast companyName={companyName} />
    </div>
  );
}
