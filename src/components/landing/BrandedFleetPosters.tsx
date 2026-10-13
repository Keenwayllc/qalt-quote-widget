import Image from "next/image";
import Link from "next/link";

/** Brand artwork uses the same diagonal proportions as the Q's red tail. */
function BrandDiagonal({ dark = false }: { dark?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 307 189"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute -right-[12%] bottom-[18%] h-[43%] w-[85%] ${dark ? "text-[#ed1c24]/30" : "text-[#ed1c24]/10"}`}
    >
      <path fill="currentColor" d="M0 0H147L307 189H160Z" />
    </svg>
  );
}

export default function BrandedFleetPosters() {
  return (
    <div className="mt-12 grid gap-5 lg:grid-cols-2">
      <article className="relative isolate flex min-w-0 flex-col overflow-hidden border border-slate-200 bg-[#f4f2ec] px-6 pb-6 pt-7 sm:px-9 sm:pb-8 sm:pt-9">
        <BrandDiagonal />
        <Image src="/images/qalt-wordmark-2026-10-clean.svg" alt="Qalt" width={1961} height={422} className="relative h-auto w-24 sm:w-28" sizes="112px" />
        <h3 className="relative mt-9 text-[clamp(2.25rem,5vw,3.75rem)] font-black leading-[0.95] tracking-[-0.055em]">
          Your fleet.<br />Your pricing.
        </h3>
        <p className="relative mt-4 max-w-xs text-sm font-medium leading-6 text-slate-600 sm:text-base">
          Instant delivery quotes on your website.
        </p>
        <div className="relative mt-7 grid h-40 grid-cols-[0.7fr_1fr_1.2fr] items-end gap-1 sm:h-48" role="img" aria-label="Qalt vehicle artwork: a hatchback, cargo van and delivery truck">
          <div className="relative h-[55%]"><Image src="/images/vehicles/light/hatchback.webp" alt="" fill sizes="(max-width: 1023px) 22vw, 120px" className="object-contain object-bottom" /></div>
          <div className="relative h-[80%]"><Image src="/images/vehicles/light/high-roof-cargo-van.webp" alt="" fill sizes="(max-width: 1023px) 30vw, 175px" className="object-contain object-bottom" /></div>
          <div className="relative h-full"><Image src="/images/vehicles/light/straight-truck.webp" alt="" fill sizes="(max-width: 1023px) 36vw, 220px" className="object-contain object-bottom" /></div>
        </div>
        <div className="relative mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-slate-950/15 pt-5">
          <p className="text-xs font-medium text-slate-600">Mileage · Weight · Vehicle type</p>
          <Link href="/register" className="text-sm font-bold underline decoration-[#ed1c24] decoration-2 underline-offset-8 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-red-600">Start free</Link>
        </div>
      </article>

      <article className="relative isolate flex min-w-0 flex-col overflow-hidden bg-[#151719] px-6 pb-6 pt-7 text-white sm:px-9 sm:pb-8 sm:pt-9">
        <BrandDiagonal dark />
        <Image src="/images/qalt-wordmark-light-2026-10-clean.svg" alt="Qalt" width={1961} height={422} className="relative h-auto w-24 sm:w-28" sizes="112px" />
        <h3 className="relative mt-9 text-[clamp(2.25rem,5vw,3.75rem)] font-black leading-[0.95] tracking-[-0.055em]">
          From two wheels.<br />To a full fleet.
        </h3>
        <p className="relative mt-4 max-w-xs text-sm font-medium leading-6 text-slate-300 sm:text-base">
          Set your vehicle options and the rates behind every quote.
        </p>
        <div className="relative mt-7 grid h-40 grid-cols-[0.7fr_1.3fr] items-end gap-6 sm:h-48" role="img" aria-label="Qalt vehicle artwork: a cargo bike and a high-roof delivery van">
          <div className="relative h-[65%]"><Image src="/images/vehicles/dark/cargo-bike.webp" alt="" fill sizes="(max-width: 1023px) 30vw, 165px" className="object-contain object-bottom" /></div>
          <div className="relative h-full"><Image src="/images/vehicles/dark/high-roof-cargo-van.webp" alt="" fill sizes="(max-width: 1023px) 55vw, 300px" className="object-contain object-bottom" /></div>
        </div>
        <div className="relative mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-white/20 pt-5">
          <p className="text-xs font-medium text-slate-300">Your vehicles. Your rates. Your brand.</p>
          <Link href="/demo/try" className="text-sm font-bold underline decoration-[#ed1c24] decoration-2 underline-offset-8 hover:text-red-300 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-red-400">Try the live demo</Link>
        </div>
      </article>
    </div>
  );
}
