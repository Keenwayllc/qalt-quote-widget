import Link from "next/link";
import { Mail, BarChart3, CalendarCheck, Calculator, Layers3, GitBranch } from "lucide-react";

const tools = [
  { phase: 30, title: "Automated Follow-Ups", text: "Qalt automatically reminds open quote customers after 4 hours and again after 24 hours.", href: "/dashboard/quotes", icon: Mail },
  { phase: 31, title: "Quote Funnel Analytics", text: "See starts, abandoned leads, completed quotes, bookings, paid jobs, and conversion rates.", href: "/dashboard/analytics/funnel", icon: BarChart3 },
  { phase: 32, title: "Booking Workflow", text: "Schedule accepted quotes, assign drivers and vehicles, and move bookings through operations.", href: "/dashboard/ops/bookings", icon: CalendarCheck },
  { phase: 33, title: "Pricing Simulator", text: "Test mileage, weight, items, and pricing rules before changing live pricing.", href: "/dashboard/pricing/simulator", icon: Calculator },
  { phase: 34, title: "Pricing Templates", text: "Apply ready-made pricing structures for common delivery business models.", href: "/dashboard/pricing/templates", icon: Layers3 },
  { phase: 35, title: "Rules Engine", text: "Add conditional distance, weight, and item-count surcharges without hardcoding them.", href: "/dashboard/pricing/rules", icon: GitBranch },
];

export default function GrowthToolsPage() {
  return <div className="mx-auto max-w-7xl space-y-7 p-4 lg:p-10">
    <div><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-red-600">Growth system</p><h1 className="mt-1 text-3xl font-black text-slate-950 dark:text-white sm:text-4xl">Qalt Growth Tools</h1><p className="mt-2 max-w-2xl text-sm font-medium text-slate-500">Phases 30 through 35 turn quote traffic into a measurable sales and booking workflow.</p></div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{tools.map(({ phase,title,text,href,icon:Icon }) => <Link key={phase} href={href} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-[#111111]"><div className="flex items-center justify-between"><div className="rounded-2xl bg-red-50 p-3 text-red-600 dark:bg-red-950/30"><Icon size={22}/></div><span className="text-xs font-black text-slate-400">Phase {phase}</span></div><h2 className="mt-5 text-lg font-black text-slate-950 dark:text-white">{title}</h2><p className="mt-2 text-sm font-medium leading-6 text-slate-500">{text}</p><div className="mt-5 text-sm font-black text-red-600">Open tool →</div></Link>)}</div>
  </div>;
}
