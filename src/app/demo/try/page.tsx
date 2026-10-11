import Link from "next/link";
import type { Metadata } from "next";
import GatedDemo from "@/components/landing/GatedDemo";
import { resolveDemoCompanies } from "@/lib/demo-company";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Full-size Live Demo · Qalt", description: "Try all three Qalt quote templates, preview your logo and colors, and explore the expanding route map." };

export default async function FullSizeDemoPage() {
  const companies = await resolveDemoCompanies();
  return <main className="min-h-screen bg-slate-100 text-slate-900">
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-5 sm:px-8">
      <div><h1 className="text-xl font-bold tracking-tight">Qalt live demo</h1><p className="mt-1 text-sm text-slate-500">Three templates. Your branding. A complete quote experience.</p></div>
      <nav aria-label="Demo navigation" className="flex gap-5 text-sm font-semibold"><Link href="/demo" className="hover:text-red-600">Back to demo overview</Link><Link href="/register" className="text-red-600 hover:text-red-700">Create your account</Link></nav>
    </header>
    <div className="mx-auto w-full max-w-[1600px]">
      {companies.length > 0 ? <GatedDemo companies={companies} fullSize /> : <p className="p-8">The demo is temporarily unavailable. Please try again shortly.</p>}
    </div>
  </main>;
}
