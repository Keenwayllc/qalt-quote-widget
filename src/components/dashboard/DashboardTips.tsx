"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Search,
  X,
  LayoutDashboard,
  FileText,
  BarChart3,
  FormInput,
  DollarSign,
  Settings,
  Code,
  Webhook,
  CreditCard,
  UserCircle,
  Star,
  HelpCircle,
  Briefcase,
  MapPin,
  Eye,
  Lightbulb,
} from "lucide-react";

const destinations = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard, keywords: "home dashboard" },
  { name: "Quotes", href: "/dashboard/quotes", icon: FileText, keywords: "customers estimates sales pipeline pdf documents" },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3, keywords: "reports metrics performance" },
  { name: "My Forms", href: "/dashboard/forms", icon: FormInput, keywords: "quote forms widgets" },
  { name: "Pricing Settings", href: "/dashboard/pricing", icon: DollarSign, keywords: "rates mileage fees price" },
  { name: "Widget Appearance", href: "/dashboard/widget", icon: Settings, keywords: "branding colors logo theme light dark" },
  { name: "Get Embed Code", href: "/dashboard/embed", icon: Code, keywords: "iframe install website" },
  { name: "Webhooks", href: "/dashboard/webhooks", icon: Webhook, keywords: "integrations api events" },
  { name: "Subscription", href: "/dashboard/billing", icon: CreditCard, keywords: "plan billing upgrade" },
  { name: "Account Settings", href: "/dashboard/settings", icon: UserCircle, keywords: "profile company account" },
  { name: "What's New", href: "/dashboard/whats-new", icon: Star, keywords: "updates features changelog" },
  { name: "Help & FAQ", href: "/dashboard/support", icon: HelpCircle, keywords: "support help questions" },
  { name: "Jobs Dashboard", href: "/dashboard/ops/jobs", icon: Briefcase, keywords: "field operations jobs dispatch" },
  { name: "Saved Stop Notes", href: "/dashboard/ops/stops", icon: MapPin, keywords: "stops notes delivery" },
  { name: "Delivery Readiness", href: "/dashboard/ops/readiness", icon: Eye, keywords: "readiness checks operations" },
];

const tips = [
  { key: "F", text: "find anything in the dashboard" },
  { key: "T", text: "switch themes" },
];

function isTypingTarget(target: EventTarget | null) {
  const element = target as HTMLElement | null;
  if (!element) return false;
  const tag = element.tagName?.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select" || element.isContentEditable;
}

export default function DashboardTips({ showCard = false }: { showCard?: boolean }) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [tipIndex, setTipIndex] = useState(0);
  const [finderOpen, setFinderOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTipIndex((current) => (current + 1) % tips.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      if (event.key === "Escape" && finderOpen) {
        event.preventDefault();
        setFinderOpen(false);
        return;
      }

      if (isTypingTarget(event.target)) return;

      if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        setFinderOpen(true);
        return;
      }

      if (event.key.toLowerCase() === "t") {
        event.preventDefault();
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [finderOpen, resolvedTheme, setTheme]);

  useEffect(() => {
    if (!finderOpen) {
      setQuery("");
      return;
    }
    const id = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(id);
  }, [finderOpen]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return destinations;
    return destinations.filter((item) => `${item.name} ${item.keywords}`.toLowerCase().includes(needle));
  }, [query]);

  const go = (href: string) => {
    setFinderOpen(false);
    router.push(href);
  };

  const currentTip = tips[tipIndex];

  return (
    <>
      {showCard && (
        <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => currentTip.key === "F" ? setFinderOpen(true) : setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="ml-auto flex max-w-[340px] items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-3.5 py-3 text-left shadow-sm transition hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-[#141414] dark:hover:border-white/20"
            aria-label={`Tip: Press ${currentTip.key} to ${currentTip.text}`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-white/7 dark:text-zinc-400">
              <Lightbulb size={15} />
            </span>
            <span className="min-w-0 text-xs font-semibold text-slate-500 dark:text-zinc-400">
              <span className="mr-1 text-slate-400 dark:text-zinc-500">Tip:</span>
              Press <kbd className="mx-1 inline-flex min-w-6 items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] font-black text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-200">{currentTip.key}</kbd>
              to {currentTip.text}.
            </span>
          </button>
        </div>
      )}

      {finderOpen && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center bg-slate-950/35 px-4 pt-[12vh] backdrop-blur-sm" onMouseDown={() => setFinderOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Find anything in Qalt"
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#151515]"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-slate-100 px-4 dark:border-white/7">
              <Search size={18} className="shrink-0 text-slate-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && filtered[0]) {
                    event.preventDefault();
                    go(filtered[0].href);
                  }
                }}
                placeholder="Find pages, settings, quotes, pricing..."
                className="h-14 flex-1 bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-zinc-600"
              />
              <button type="button" onClick={() => setFinderOpen(false)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/7 dark:hover:text-white" aria-label="Close finder">
                <X size={17} />
              </button>
            </div>

            <div className="max-h-[430px] overflow-y-auto p-2">
              {filtered.length > 0 ? filtered.map((item, index) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => go(item.href)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${index === 0 ? "bg-slate-50 dark:bg-white/5" : "hover:bg-slate-50 dark:hover:bg-white/5"}`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 dark:border-white/8 dark:bg-white/5 dark:text-zinc-400">
                    <item.icon size={16} />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-bold text-slate-800 dark:text-zinc-100">{item.name}</span>
                    <span className="block text-[11px] text-slate-400 dark:text-zinc-500">{item.href}</span>
                  </span>
                  {index === 0 && <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-600">ENTER</span>}
                </button>
              )) : (
                <div className="px-4 py-10 text-center text-sm font-semibold text-slate-400 dark:text-zinc-500">No dashboard destination found.</div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-2.5 text-[10px] font-semibold text-slate-400 dark:border-white/7 dark:text-zinc-600">
              <span>Press F anywhere to open</span>
              <span>ESC to close · ENTER to open first result</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
