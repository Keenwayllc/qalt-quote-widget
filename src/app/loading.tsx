export default function SiteLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.06]">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-red-600" />
        </div>
      </div>
    </div>
  );
}
