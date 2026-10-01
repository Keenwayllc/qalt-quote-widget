"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { HelpCircle, X } from "lucide-react";
import { getEntitlements } from "@/lib/plans";
import { getPageGuide, gettingStartedSteps, guideActionHref } from "@/lib/dashboard-guides";
import { readWalkthroughStatus, saveWalkthroughStatus, subscribeToGuideState } from "@/lib/dashboard-guide-state";
import type { GuideAction } from "@/lib/dashboard-guides";

type Props = {
  companyId: string;
  subscriptionPlan: string;
  isAdmin?: boolean;
  onboardingCompleted: boolean;
};

const secondary = "inline-flex min-h-11 items-center justify-center gap-2 border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:opacity-40 dark:border-white/15 dark:text-zinc-200 dark:hover:bg-white/5";
const primary = "inline-flex min-h-11 items-center justify-center bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500";

export default function DashboardGuide(props: Props) {
  const pathname = usePathname();
  // Keep walkthrough progress while navigating, but isolate company accounts.
  return <PageGuidePanel key={props.companyId} {...props} pathname={pathname} />;
}

function PageGuidePanel({ companyId, subscriptionPlan, isAdmin = false, onboardingCompleted, pathname }: Props & { pathname: string }) {
  const searchParams = useSearchParams();
  const formId = searchParams.get("formId");
  const guide = getPageGuide(pathname, isAdmin);
  const entitlements = getEntitlements(subscriptionPlan);
  const panelId = useId();
  const titleId = useId();
  const [mode, setMode] = useState<"page" | "walkthrough" | null>(null);
  const [openedPath, setOpenedPath] = useState(pathname);
  const [closed, setClosed] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const guideButton = useRef<HTMLButtonElement>(null);
  const setupButton = useRef<HTMLButtonElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const focusOnOpen = useRef(false);
  const returnFocus = useRef<HTMLButtonElement | null>(null);
  const status = useSyncExternalStore(
    subscribeToGuideState,
    () => readWalkthroughStatus(companyId),
    () => "dismissed" as const,
  );
  const autoShow = !onboardingCompleted && !status && !closed
    && pathname !== "/dashboard/onboarding" && !pathname.startsWith("/dashboard/admin");
  const shownMode = mode === "page" && openedPath !== pathname ? null : mode ?? (autoShow ? "walkthrough" : null);
  const open = Boolean(shownMode);
  const step = gettingStartedSteps[stepIndex];
  const locked = Boolean(guide?.feature && !entitlements[guide.feature]);
  const stepGuide = getPageGuide(step.href, isAdmin);

  useEffect(() => {
    if (focusOnOpen.current && open) {
      title.current?.focus();
      focusOnOpen.current = false;
    }
  }, [open, shownMode]);

  function close(completed = false) {
    if (shownMode === "walkthrough") saveWalkthroughStatus(companyId, completed ? "completed" : "dismissed");
    setClosed(true);
    setMode(null);
    (returnFocus.current ?? setupButton.current)?.focus();
  }

  function show(nextMode: "page" | "walkthrough", button: HTMLButtonElement | null) {
    // Opening page help also dismisses the automatic invitation.
    if (autoShow) saveWalkthroughStatus(companyId, "dismissed");
    returnFocus.current = button;
    focusOnOpen.current = true;
    setMode(nextMode);
    setOpenedPath(pathname);
    if (nextMode === "walkthrough") setStepIndex(0);
  }

  function actionLink(action: GuideAction, preview = false) {
    const unavailable = Boolean(action.feature && !entitlements[action.feature]);
    return (
      <Link
        href={guideActionHref(action, entitlements, companyId, formId)}
        className={primary}
        target={preview ? "_blank" : undefined}
        rel={preview ? "noopener noreferrer" : undefined}
      >
        {unavailable ? "Review plan options" : action.label}
        {preview && <span className="sr-only"> (opens in a new tab)</span>}
      </Link>
    );
  }

  if (!guide) return null;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-10" data-dashboard-guide>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <button ref={setupButton} type="button" className={secondary} aria-expanded={shownMode === "walkthrough"} aria-controls={open ? panelId : undefined} onClick={() => shownMode === "walkthrough" ? close() : show("walkthrough", setupButton.current)}>
          Getting started
        </button>
        <button ref={guideButton} type="button" className={secondary} aria-label={`Guide for ${guide.title}`} aria-expanded={shownMode === "page"} aria-controls={open ? panelId : undefined} onClick={() => shownMode === "page" ? close() : show("page", guideButton.current)}>
          <HelpCircle size={16} aria-hidden="true" /> Guide
        </button>
      </div>
      {open && (
        <section id={panelId} aria-labelledby={titleId} className="mt-3 border border-slate-200 bg-white p-4 text-sm text-slate-700 dark:border-white/10 dark:bg-[#141414] dark:text-zinc-300 sm:p-5"
          onKeyDown={(event) => {
            if (event.key === "Escape") { event.stopPropagation(); close(); }
          }}>
          <div className="flex items-start justify-between gap-3">
            <h2 id={titleId} ref={title} tabIndex={-1} className="text-lg font-bold text-slate-900 focus:outline-none dark:text-zinc-100">
              {shownMode === "walkthrough" ? "Get started with Qalt" : `${guide.title} guide`}
            </h2>
            <button type="button" className={secondary} aria-label="Close guide" onClick={() => close()}><X size={16} aria-hidden="true" /></button>
          </div>
          {shownMode === "page" ? (
            <div className="mt-3 space-y-4">
              <p className="max-w-[70ch] leading-6">{guide.purpose}</p>
              {locked ? (
                <p className="max-w-[70ch] leading-6">{guide.requirement}</p>
              ) : (
                <>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-zinc-100">Main controls</h3>
                    <ul className="mt-1 max-w-[70ch] list-disc space-y-1 pl-5 leading-6">{guide.controls.map((control) => <li key={control}>{control}</li>)}</ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-zinc-100">What to configure</h3>
                    <p className="mt-1 max-w-[70ch] leading-6">{guide.configure}</p>
                  </div>
                  {guide.requirement && <p className="max-w-[70ch] leading-6">{guide.requirement}</p>}
                </>
              )}
              <div>
                <h3 className="mb-2 font-bold text-slate-900 dark:text-zinc-100">Recommended next step</h3>
                {locked ? actionLink({ label: "Review plan options", href: "/dashboard/billing" }) : actionLink(guide.next)}
              </div>
            </div>
          ) : (
            <div className="mt-3 space-y-4">
              <p className="max-w-[70ch] leading-6">Work through these steps at your own pace. Save changes on each page before moving on. You can close this guide and reopen it from Getting started.</p>
              <ol className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Getting-started steps">
                {gettingStartedSteps.map((item, index) => (
                  <li key={item.href}>
                    <button type="button" className={`${secondary} ${index === stepIndex ? "border-red-500 dark:border-red-500" : ""}`} aria-current={index === stepIndex ? "step" : undefined} onClick={() => setStepIndex(index)}>
                      {index + 1}. {item.label}
                    </button>
                  </li>
                ))}
              </ol>
              <div aria-live="polite" aria-atomic="true">
                <h3 className="font-bold text-slate-900 dark:text-zinc-100">Step {stepIndex + 1} of {gettingStartedSteps.length}: {step.label}</h3>
                <p className="mt-1 max-w-[70ch] leading-6">
                  {step.feature && !entitlements[step.feature]
                    ? "Analytics requires Pro or Enterprise. On Starter, use Overview and Quotes to review activity. You can finish this guide without upgrading."
                    : step.href === "preview"
                      ? "Open the widget in a new tab. Check the text, service options, and a sample estimate before embedding it. This does not verify installation on your website."
                      : stepGuide?.configure}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {actionLink({ ...step, label: step.href === "preview" ? "Preview Widget" : `Go to ${step.label}` }, step.href === "preview")}
                <button type="button" className={secondary} disabled={stepIndex === 0} onClick={() => setStepIndex((index) => index - 1)}>Previous</button>
                {stepIndex < gettingStartedSteps.length - 1
                  ? <button type="button" className={secondary} onClick={() => setStepIndex((index) => index + 1)}>Next</button>
                  : <button type="button" className={secondary} onClick={() => close(true)}>Finish guide</button>}
                <button type="button" className={secondary} onClick={() => close()}>Dismiss for now</button>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
