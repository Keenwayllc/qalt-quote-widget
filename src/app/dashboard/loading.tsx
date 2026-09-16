export default function DashboardLoading() {
  return (
    <div className="min-h-[60vh] px-6 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl animate-pulse space-y-6">
        <div className="h-8 w-56 rounded-lg bg-slate-200/80 dark:bg-white/10" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-28 rounded-2xl bg-slate-200/70 dark:bg-white/[0.07]" />
          <div className="h-28 rounded-2xl bg-slate-200/70 dark:bg-white/[0.07]" />
          <div className="h-28 rounded-2xl bg-slate-200/70 dark:bg-white/[0.07]" />
        </div>
        <div className="h-72 rounded-3xl bg-slate-200/60 dark:bg-white/[0.06]" />
      </div>
    </div>
  );
}
