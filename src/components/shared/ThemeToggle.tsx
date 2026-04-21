"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-full bg-slate-200 dark:bg-white/5" />;
  }

  const buttons = [
    { key: "light", icon: Sun, label: "Light Mode" },
    { key: "system", icon: Monitor, label: "System Preference" },
    { key: "dark", icon: Moon, label: "Dark Mode" },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/[0.06] w-full mb-4">
      {buttons.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={`flex-1 flex justify-center py-2 transition-all text-xs font-bold ${
            theme === key
              ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm"
              : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
          }`}
          title={label}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  );
}
