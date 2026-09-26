/**
 * Runs inline in <head> before first paint and decides whether the homepage
 * intro journey (src/components/landing/intro/IntroJourney.tsx) shows: fresh
 * loads of "/" only, once per browser session, never with reduced motion.
 *
 * html[data-intro] states:
 *   "play"    journey on screen, page scroll locked, hero entrance paused
 *   "leaving" door is lifting, hero entrance runs, page still locked
 *   (absent)  journey gone
 */
export const INTRO_BOOT_SCRIPT = `try{if(location.pathname==="/"&&!sessionStorage.getItem("qalt-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.setAttribute("data-intro","play");sessionStorage.setItem("qalt-intro","1")}}catch(e){}`;

/** Fired on window when the visitor reaches the homepage. */
export const INTRO_DONE_EVENT = "qalt:intro-done";
