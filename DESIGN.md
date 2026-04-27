---
name: Qalt
description: White-label delivery quoting and booking SaaS for operators who mean business.
colors:
  brand-red: "#dc2626"
  brand-red-dim: "#b91c1c"
  page-bg-dark: "#0a0a0a"
  surface-dark: "#141414"
  surface-raised-dark: "#1c1c1c"
  sidebar-dark: "#111111"
  page-bg-light: "#ffffff"
  surface-raised-light: "#f8f9fb"
  foreground-dark: "#f4f4f5"
  foreground-light: "#171717"
  muted-dark: "#71717a"
  muted-light: "#64748b"
  border-dark: "rgba(255,255,255,0.07)"
  border-light: "rgba(0,0,0,0.07)"
  status-emerald: "#34d399"
  status-amber: "#fbbf24"
  status-rose: "#f87171"
typography:
  display:
    fontFamily: "Geist Sans, Arial, Helvetica, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Geist Sans, Arial, Helvetica, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Geist Sans, Arial, Helvetica, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist Sans, Arial, Helvetica, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.05em"
  mono:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
rounded:
  none: "0px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.brand-red}"
    textColor: "#ffffff"
    rounded: "{rounded.none}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.brand-red-dim}"
    textColor: "#ffffff"
    rounded: "{rounded.none}"
    padding: "10px 20px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.muted-dark}"
    rounded: "{rounded.none}"
    padding: "10px 20px"
  card-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.foreground-dark}"
    rounded: "{rounded.none}"
    padding: "24px"
  input-field:
    backgroundColor: "#ffffff"
    textColor: "{colors.foreground-light}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
---

# Design System: Qalt

## 1. Overview

**Creative North Star: "The Dispatch Terminal"**

A carrier-grade operations interface. Not a SaaS dashboard — a professional tool that delivery operators use under pressure, in the cab, at the depot, while juggling a full schedule. The aesthetic is terminal-meets-operator-manual: dense but instantly readable, high contrast, zero decorative fat. Every pixel is occupied with information or affordance, never gesture or atmosphere.

The dark theme is not stylistic choice — it is the native state. An operator checking quote status at 6am in a dim warehouse does not need a white interface screaming at them. The surface palette (page `#0a0a0a`, cards `#141414`, raised elements `#1c1c1c`) achieves depth through tonal steps, not shadows. Borders whisper at `rgba(255,255,255,0.07)`.

Red `#dc2626` is the brand's only accent and it pulls double duty: primary actions, active nav states, and the brand logo. Its rarity is the point. A red button on this interface means something. No other color competes for that role.

**Key Characteristics:**
- Zero border-radius. Every edge is sharp. This is deliberate operator-grade language.
- Tonal depth, not shadow depth. Dark surfaces layer through value, not box-shadow.
- One accent, used sparingly. Red for action. Everything else is neutral.
- Dense but clear. Information fills the space. Spacious-but-shallow is the enemy.
- Geist Sans: variable-weight, technically precise. Matches the product register exactly.

## 2. Colors: The Dispatch Palette

Restrained strategy: tinted near-blacks plus one accent that never exceeds 10% of any surface.

### Primary
- **Signal Red** (`#dc2626`): The sole action accent. Used on primary buttons, active nav states, focus rings, brand logo. Appears on less than 10% of any screen. Its scarcity is what makes it mean "go."
- **Signal Red Deep** (`#b91c1c`): Hover state for Signal Red. Used nowhere else.

### Neutral (Dark Theme — default)
- **Void** (`#0a0a0a`): Page background. The absolute floor. Not pure black — tinted imperceptibly warm.
- **Dispatch Surface** (`#141414`): Card and panel background. Primary data-bearing surface.
- **Raised Surface** (`#1c1c1c`): Elevated elements, popovers, dropdown menus.
- **Sidebar** (`#111111`): Navigation panel. Slightly distinct from cards, slightly above Void.
- **Foreground** (`#f4f4f5`): Primary text on dark surfaces. Zinc-100 family.
- **Muted** (`#71717a`): Secondary text, labels, timestamps. Zinc-500.
- **Ghost Border** (`rgba(255,255,255,0.07)`): All borders in dark mode. Low-opacity white — fades at extremes of screen brightness, never harsh.

### Neutral (Light Theme — fallback)
- **Paper** (`#ffffff`): Page and card backgrounds.
- **Off-Surface** (`#f8f9fb`): Raised elements.
- **Ink** (`#171717`): Primary text.
- **Slate Muted** (`#64748b`): Secondary text, labels.
- **Ghost Border Light** (`rgba(0,0,0,0.07)`): Borders in light mode.

### Status (Semantic — used in badges and trend indicators only)
- **Confirmed** (`#34d399` at 15% opacity backgrounds): Delivered, paid, complete.
- **Pending** (`#fbbf24` at 15% opacity backgrounds): Awaiting action, in transit.
- **Issue** (`#f87171` at 15% opacity backgrounds): Failed, cancelled, requires attention.

### Named Rules
**The One Voice Rule.** Signal Red is the only accent color. It appears on primary buttons, the active nav indicator, and the brand mark. Never add a secondary accent. If you are tempted to use blue or purple for variety, you are designing the wrong product.

**The Badge Rule.** Status colors live only as low-opacity tinted backgrounds (15%) with their mid-tone text counterpart. Never full-saturation status fills on dark surfaces.

## 3. Typography

**Body Font:** Geist Sans (with Arial, Helvetica, sans-serif fallback)
**Mono Font:** Geist Mono (for embed codes, API keys, numeric data)

**Character:** Variable-weight geometric sans. Technically precise, not warm. At heavy weights it reads like a manifest header. At regular weight it disappears into the data it carries — which is exactly right for an operator tool.

### Hierarchy
- **Display** (900, 1.875rem/30px, leading 1.1, tracking -0.02em): Dashboard page titles, metric values on KPI cards. Used rarely — when it appears, it commands attention.
- **Headline** (700, 1.25rem/20px, leading 1.2): Section headers, card titles, modal headings.
- **Title** (700, 1rem/16px, leading 1.3): Sub-section labels, table column headers.
- **Body** (400, 0.875rem/14px, leading 1.5): All prose, descriptions, form labels. Max line length 65ch.
- **Label** (700, 0.75rem/12px, tracking 0.05em, uppercase): Status badges, metadata tags, chart axis labels. Uppercase only when used as a data label, not as a button label.

### Named Rules
**The Weight Ladder Rule.** Hierarchy is communicated by weight contrast (400 vs 700 vs 900), not by size alone. Two adjacent text elements at the same weight with only a size difference read as peers, not as hierarchy. Separate them by weight.

## 4. Elevation

This system is flat by default. Shadows are not used to establish hierarchy — tonal surface layering does that work. A card at `#141414` on a `#0a0a0a` background is elevated through value contrast, not a box-shadow.

`shadow-none` is applied to all cards in dark mode explicitly. This is intentional, not an omission.

In light mode, cards use `shadow-sm` at rest and `shadow-md` on hover — subtle lift that gives interactivity signal without depth theatre.

### Shadow Vocabulary (light mode only)
- **Rest** (`box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)`): Card default in light mode.
- **Hover** (`box-shadow: 0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)`): Cards on hover, lifted state.
- **Modal** (`box-shadow: 0 20px 60px rgba(0,0,0,0.25)`): Drawer and modal panels in light mode.

### Named Rules
**The Flat-By-Default Rule.** In dark mode, surfaces are flat at rest. Their depth is communicated by background tonal step (`#0a0a0a` → `#141414` → `#1c1c1c`), not shadow. Adding `box-shadow` to a dark card introduces visual noise without adding information.

## 5. Components

### Buttons
- **Shape:** Zero radius. Square corners are the Qalt signature. Non-negotiable.
- **Primary:** Signal Red `#dc2626` background, white text, `10px 20px` padding, `font-weight: 700`. Full width on mobile.
- **Hover:** Signal Red Deep `#b91c1c`. Transition 150ms ease-out.
- **Focus:** `ring-2 ring-red-500 ring-offset-2` (dark: `ring-offset-[#0a0a0a]`).
- **Ghost / Secondary:** Transparent background, muted text, full border at ghost-border opacity. On hover: `bg-white/5` in dark, `bg-slate-100` in light.
- **Disabled:** 40% opacity, `cursor-not-allowed`.

### Cards / Containers
- **Corner Style:** Zero radius. No `rounded-*` anywhere.
- **Background Dark:** `#141414` (Dispatch Surface).
- **Background Light:** `#ffffff` with `border border-slate-200/60`.
- **Border Dark:** `border border-white/[0.06]`.
- **Shadow Strategy:** None in dark mode. `shadow-sm` at rest in light; `shadow-md` on hover.
- **Internal Padding:** `p-6` (24px) standard; `p-4` (16px) for compact list rows.
- **Hover State Dark:** `hover:border-white/10` — border brightens slightly to signal interactivity.

### Inputs / Fields
- **Style:** White background, `border border-slate-300`, zero radius, `px-4 py-2`.
- **Focus:** `focus:ring-2 focus:ring-red-500` — Signal Red focus ring, consistent with primary button.
- **Placeholder:** `text-slate-400`.
- **Dark mode inputs:** `bg-[#1c1c1c] border-white/10 text-zinc-100 focus:ring-red-500`.
- **Error:** `border-red-500 focus:ring-red-500`.

### Navigation (Sidebar)
- **Background:** `#111111`, `border-r border-white/6`.
- **Width:** `w-72` (288px).
- **Nav items default:** `text-slate-400 hover:text-white hover:bg-white/5` — ghost treatment, no heavy fill.
- **Active state:** `text-red-400 bg-red-500/10` — Signal Red tint, not full fill.
- **Incomplete indicator:** Pulsing dot `bg-amber-400` on nav items pending setup.
- **Pending badge:** `bg-red-500 text-white` pill on Quotes nav item.
- **Logo row:** `p-8` padding. Logo links to `/dashboard`.
- **Mobile:** Slides in from left with `backdrop-blur-xl` overlay. Closes on outside tap.

### MetricCard (Signature Component)
The primary KPI surface on the dashboard overview. Dense, action-oriented.
- `bg-white dark:bg-[#1e1e1e]` with a subtle gradient tint from the variant color (10% in light, 5% in dark).
- Icon in a tinted square (zero radius) of the variant color.
- Trend badge: `rounded-full` (the one exception to zero-radius, intentionally pill-shaped to distinguish data badges from structural elements).
- Value: Display weight (900) at `text-3xl`. Label: uppercase tracking-tight at `text-sm`.

### Status Badges
- Three roles: Confirmed (emerald), Pending (amber), Issue (red/rose).
- Format: `bg-[color]/15 text-[color]-400` in dark; `bg-[color]-100 text-[color]-700` in light.
- `rounded-full`, `font-bold`, `text-xs`, `px-2 py-1`.

## 6. Do's and Don'ts

### Do:
- **Do** use `#dc2626` Signal Red exclusively for primary CTA buttons and active nav state. No other elements.
- **Do** use sharp corners (`border-radius: 0`) on all structural elements: cards, buttons, inputs, nav items, modals. The only exception is status badge pills.
- **Do** use tonal layering (`#0a0a0a` → `#141414` → `#1c1c1c`) to establish depth in dark mode. Trust the palette.
- **Do** label secondary text with `text-zinc-500 dark:text-zinc-400` and `font-bold uppercase tracking-tight` when it serves as a data label.
- **Do** treat operators as professionals. Dense information display is a feature. Padding is not a substitute for design.
- **Do** apply `dark:shadow-none` to all cards and panels in dark mode. Shadows are for the light fallback only.
- **Do** use `ring-2 ring-red-500` for all focus-visible states to maintain consistent visual language.

### Don't:
- **Don't** use floating cards with purple-to-pink gradients. This is explicitly the anti-reference for Qalt. If it resembles a generic SaaS landing page, it's wrong.
- **Don't** use rounded corners on structural elements. `rounded-lg`, `rounded-xl`, `rounded-2xl` on cards, buttons, or inputs are all prohibited. Use `rounded-full` only for badge pills.
- **Don't** use glassmorphism as decoration. No `backdrop-blur` on cards for aesthetics. The sidebar uses blur for functional mobile overlay only.
- **Don't** use neon colors, speed lines, or stock delivery truck imagery. This is not an "Uber for X" app.
- **Don't** add a second accent color. Signal Red is the only accent. Blue, purple, teal, orange — none of these appear as brand colors in this system.
- **Don't** use `box-shadow` on cards in dark mode. It adds noise without information.
- **Don't** use gradient text (`background-clip: text`). Solid colors only. Weight and size carry hierarchy.
- **Don't** use side-stripe borders (`border-left: 4px solid red`) on cards or list items. Use full borders, background tints, or nothing.
- **Don't** design for spaciousness as a goal. Information density is correct for operators. Empty space is wasted operator time.
- **Don't** use enterprise-bloat UI patterns: tabbed dashboards with 40 nav items, heavy multi-step modal flows, progress-wizard onboarding over a full page.
