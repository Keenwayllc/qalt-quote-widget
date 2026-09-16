"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
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
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard, keywords: "home dashboard", group: "Navigation" },
  { name: "Quotes", href: "/dashboard/quotes", icon: FileText, keywords: "customers estimates sales pipeline pdf documents", group: "Navigation" },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3, keywords: "reports metrics performance", group: "Navigation" },
  { name: "My Forms", href: "/dashboard/forms", icon: FormInput, keywords: "quote forms widgets", group: "Build" },
  { name: "Pricing Settings", href: "/dashboard/pricing", icon: DollarSign, keywords: "rates mileage fees price", group: "Build" },
  { name: "Widget Appearance", href: "/dashboard/widget", icon: Settings, keywords: "branding colors logo theme light dark", group: "Build" },
  { name: "Get Embed Code", href: "/dashboard/embed", icon: Code, keywords: "iframe install website", group: "Build" },
  { name: "Webhooks", href: "/dashboard/webhooks", icon: Webhook, keywords: "integrations api events", group: "Settings" },
  { name: "Subscription", href: "/dashboard/billing", icon: CreditCard, keywords: "plan billing upgrade", group: "Settings" },
  { name: "Account Settings", href: "/dashboard/settings", icon: UserCircle, keywords: "profile company account", group: "Settings" },
  { name: "What's New", href: "/dashboard/whats-new", icon: Star, keywords: "updates features changelog", group: "Settings" },
  { name: "Help & FAQ", href: "/dashboard/support", icon: HelpCircle, keywords: "support help questions", group: "Settings" },
  { name: "Jobs Dashboard", href: "/dashboard/ops/jobs", icon: Briefcase, keywords: "field operations jobs dispatch", group: "Field Operations" },
  { name: "Saved Stop Notes", href: "/dashboard/ops/stops", icon: MapPin, keywords: "stops notes delivery", group: "Field Operations" },
  { name: "Delivery Readiness", href: "/dashboard/ops/readiness", icon: Eye, keywords: "readiness checks operations", group: "Field Operations" },
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
    }, 7000);
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
      const reset = window.setTimeout(() => setQuery(""), 180);
      return () => window.clearTimeout(reset);
    }
    const focus = window.setTimeout(() => inputRef.current?.focus(), 180);
    return () => window.clearTimeout(focus);
  }, [finderOpen]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return destinations;
    return destinations.filter((item) => `${item.name} ${item.keywords} ${item.group}`.toLowerCase().includes(needle));
  }, [query]);

  const groupedResults = useMemo(() => {
    const map = new Map<string, typeof destinations>();
    filtered.forEach((item) => {
      const items = map.get(item.group) ?? [];
      items.push(item);
      map.set(item.group, items);
    });
    return Array.from(map.entries());
  }, [filtered]);

  const go = (href: string) => {
    setFinderOpen(false);
    window.setTimeout(() => router.push(href), 130);
  };

  const currentTip = tips[tipIndex];
  const runCurrentTip = () => {
    if (currentTip.key === "F") setFinderOpen(true);
    else setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {showCard && (
        <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={runCurrentTip}
            className="ml-auto flex h-[64px] w-full max-w-[560px] items-center gap-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-white px-5 text-left shadow-sm transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-[#141414] dark:hover:border-white/20"
            aria-label={`Tip: Press ${currentTip.key} to ${currentTip.text}`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-white/[0.06] dark:text-zinc-400">
              <Lightbulb size={16} />
            </span>
            <span className="relative block min-w-0 flex-1 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={`${currentTip.key}-${tipIndex}`}
                  initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  className="block whitespace-nowrap text-sm font-semibold text-slate-600 dark:text-zinc-300"
                >
                  <span className="mr-1 text-slate-400 dark:text-zinc-500">Tip:</span>
                  Press
                  <kbd className="mx-2 inline-flex min-w-7 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[11px] font-black text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-100">
                    {currentTip.key}
                  </kbd>
                  to {currentTip.text}.
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.14em] text-slate-300 dark:text-zinc-600 sm:block">
              Shortcut
            </span>
          </button>
        </div>
      )}

      <AnimatePresence>
        {finderOpen && (
          <motion.div
            className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-[2px] dark:bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onMouseDown={() => setFinderOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Find anything in Qalt"
              initial={{ opacity: 0, x: -18, y: -8, scale: 0.985 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -12, y: -6, scale: 0.99 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-3 right-3 top-3 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.24)] dark:border-white/[0.10] dark:bg-[#111111] sm:left-5 sm:right-auto sm:top-5 sm:w-[460px]"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="flex h-[58px] items-center gap-3 border-b border-slate-100 px-4 dark:border-white/[0.07]">
                <Search size={20} className="shrink-0 text-slate-400 dark:text-zinc-500" />
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
                  placeholder="Find"
                  className="h-full flex-1 bg-transparent text-[15px] font-medium text-slate-900 outline-none placeholder:text-slate-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                />
                <kbd className="inline-flex h-7 min-w-9 items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-2 font-mono text-[11px] font-bold text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400">
                  Esc
                </kbd>
              </div>

              <div className="max-h-[min(560px,72vh)] overflow-y-auto p-2 custom-scrollbar">
                {filtered.length > 0 ? (
                  groupedResults.map(([group, items], groupIndex) => (
                    <div key={group} className={groupIndex === 0 ? "" : "mt-2 border-t border-slate-100 pt-2 dark:border-white/[0.06]"}>
                      <div className="px-3 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400 dark:text-zinc-600">
                        {group}
                      </div>
                      {items.map((item) => {
                        const first = item.href === filtered[0]?.href;
                        return (
                          <motion.button
                            key={item.href}
                            type="button"
                            onClick={() => go(item.href)}
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.14 }}
                            className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-150 ${first ? "bg-slate-100 dark:bg-white/[0.07]" : "hover:bg-slate-50 dark:hover:bg-white/[0.05]"}`}
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-zinc-400">
                              <item.icon size={15} />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-semibold text-slate-800 dark:text-zinc-100">{item.name}</span>
                              <span className="block truncate text-[11px] text-slate-400 dark:text-zinc-600">{item.href}</span>
                            </span>
                            {first && (
                              <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400 dark:text-zinc-600">Enter</span>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-12 text-center text-sm font-medium text-slate-400 dark:text-zinc-500">
                    No dashboard destination found.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
