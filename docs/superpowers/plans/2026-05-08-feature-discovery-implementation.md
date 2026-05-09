# Feature Discovery System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a feature discovery system with a What's New showcase page, Feature Reference Hub, and dashboard integration to help Qalt customers discover and understand new features.

**Architecture:** Three connected components: (1) reusable WhatsNewCard and WhatsNewHighlight components, (2) a new /dashboard/whats-new page showcasing 5 features with metadata, (3) a restructured /dashboard/support page organized by feature category instead of FAQ format, and (4) dashboard integration showing latest features with a link to the full showcase.

**Tech Stack:** Next.js 14 (App Router), React (client + server components), TypeScript, Tailwind CSS v4 (dark mode), lucide-react icons

---

## Task 1: Create WhatsNewCard Component

**Files:**
- Create: `src/components/dashboard/WhatsNewCard.tsx`

This is a reusable card component for displaying individual features in both the dashboard highlight and the What's New showcase page.

- [ ] **Step 1: Create the WhatsNewCard component file**

Create `src/components/dashboard/WhatsNewCard.tsx`:

```typescript
import { Star } from "lucide-react";
import Link from "next/link";

interface WhatsNewCardProps {
  name: string;
  icon: React.ReactNode;
  description: string;
  readingTime: number;
  category: string;
  learnMoreLink: string;
  variant?: "full" | "compact";
}

export default function WhatsNewCard({
  name,
  icon,
  description,
  readingTime,
  category,
  learnMoreLink,
  variant = "full",
}: WhatsNewCardProps) {
  if (variant === "compact") {
    // Compact version for dashboard highlight
    return (
      <div className="bg-white dark:bg-[#1e1e1e] border border-slate-200 dark:border-white/[0.06] rounded-none p-4 space-y-2">
        <div className="flex items-start gap-3">
          <div className="text-red-500 shrink-0">{icon}</div>
          <div className="min-w-0 flex-1">
            <p className="font-black text-slate-900 dark:text-white text-sm truncate">
              {name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Full version for What's New page
  return (
    <div className="bg-white dark:bg-[#1e1e1e] border border-slate-200 dark:border-white/[0.06] rounded-none p-6 space-y-4 hover:shadow-lg dark:hover:border-white/10 hover:border-slate-300 transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="text-red-500 shrink-0">{icon}</div>
          <div>
            <p className="font-black text-slate-900 dark:text-white text-lg">
              {name}
            </p>
            <span className="inline-block px-2 py-0.5 mt-1 text-[10px] font-bold uppercase tracking-wider bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400 rounded-md">
              {category}
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>

      <div className="flex items-center justify-between pt-2">
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
          {readingTime} min read
        </span>
        <Link
          href={learnMoreLink}
          className="text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
        >
          Learn More →
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the component exports correctly**

Run: `cd "c:/Users/Emmanuel and Claudia/ANTI/quote-widget-saas" && npx tsc --noEmit`

Expected: No TypeScript errors

- [ ] **Step 3: Commit the component**

```bash
cd "c:/Users/Emmanuel and Claudia/ANTI/quote-widget-saas"
git add src/components/dashboard/WhatsNewCard.tsx
git commit -m "feat: add WhatsNewCard component for feature showcase"
```

---

## Task 2: Create WhatsNewHighlight Component

**Files:**
- Create: `src/components/dashboard/WhatsNewHighlight.tsx`

This component displays a highlight section on the dashboard overview showing 2-3 latest features with a "View All Features" link.

- [ ] **Step 1: Create the WhatsNewHighlight component**

Create `src/components/dashboard/WhatsNewHighlight.tsx`:

```typescript
"use client";

import { Star, ChevronRight } from "lucide-react";
import Link from "next/link";
import WhatsNewCard from "./WhatsNewCard";
import { Mail, Trello, MapPin, Clock, CreditCard } from "lucide-react";

// Define the 5 What's New features
const whatsnewFeatures = [
  {
    id: "white-label-email",
    name: "White-Label Email Domain",
    category: "Pro/Enterprise",
    icon: <Mail size={24} />,
    description: "Send customer confirmation emails from your own domain instead of Qalt's.",
    readingTime: 5,
    learnMoreLink: "/dashboard/support#customer-communication",
  },
  {
    id: "kanban-crm",
    name: "Kanban CRM Board",
    category: "All Plans",
    icon: <Trello size={24} />,
    description: "Organize quote requests in a visual Kanban board with 6 status columns.",
    readingTime: 4,
    learnMoreLink: "/dashboard/support#pricing-quotes",
  },
  {
    id: "geo-fencing",
    name: "Geo-Fencing & Service Areas",
    category: "Pro/Enterprise",
    icon: <MapPin size={24} />,
    description: "Restrict quote requests to specific service areas by ZIP code.",
    readingTime: 6,
    learnMoreLink: "/dashboard/support#advanced-features",
  },
  {
    id: "transit-time",
    name: "Transit Time Estimation",
    category: "All Plans",
    icon: <Clock size={24} />,
    description: "Show customers estimated transit time for their quote automatically.",
    readingTime: 4,
    learnMoreLink: "/dashboard/support#advanced-features",
  },
  {
    id: "payments",
    name: "Payment Processing",
    category: "Pro/Enterprise",
    icon: <CreditCard size={24} />,
    description: "Accept customer payments directly through Qalt for quote orders.",
    readingTime: 8,
    learnMoreLink: "/dashboard/support#advanced-features",
  },
];

export default function WhatsNewHighlight() {
  // Show only the first 3 features in the highlight
  const featuredItems = whatsnewFeatures.slice(0, 3);

  return (
    <section className="bg-white dark:bg-[#1e1e1e] rounded-none border border-slate-200 dark:border-white/[0.06] shadow-sm dark:shadow-none p-6 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Star size={20} className="text-red-500" />
        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
          What's New
        </h2>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400">
        Discover the latest features to help you manage quotes and grow your business.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {featuredItems.map((feature) => (
          <WhatsNewCard
            key={feature.id}
            name={feature.name}
            icon={feature.icon}
            description={feature.description}
            readingTime={feature.readingTime}
            category={feature.category}
            learnMoreLink={feature.learnMoreLink}
            variant="compact"
          />
        ))}
      </div>

      <Link
        href="/dashboard/whats-new"
        className="inline-flex items-center justify-center px-4 py-2.5 mt-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-none transition-colors"
      >
        View All Features
        <ChevronRight size={16} className="ml-2" />
      </Link>
    </section>
  );
}

// Export the features array for use in the What's New page
export { whatsnewFeatures };
```

- [ ] **Step 2: Verify TypeScript compilation**

Run: `npx tsc --noEmit`

Expected: No TypeScript errors

- [ ] **Step 3: Commit the component**

```bash
git add src/components/dashboard/WhatsNewHighlight.tsx
git commit -m "feat: add WhatsNewHighlight component for dashboard integration"
```

---

## Task 3: Create What's New Showcase Page

**Files:**
- Create: `src/app/dashboard/whats-new/page.tsx`

The full What's New page displaying all 5 features with detailed information.

- [ ] **Step 1: Create the What's New page**

Create `src/app/dashboard/whats-new/page.tsx`:

```typescript
import { Mail, Trello, MapPin, Clock, CreditCard } from "lucide-react";
import WhatsNewCard from "@/components/dashboard/WhatsNewCard";

const whatsnewFeatures = [
  {
    id: "white-label-email",
    name: "White-Label Email Domain",
    category: "Pro/Enterprise",
    icon: <Mail size={32} />,
    description: "Send customer confirmation emails from your own domain instead of Qalt's. Configure a custom sender name and verify DNS records to establish brand trust.",
    readingTime: 5,
    learnMoreLink: "/dashboard/support#customer-communication",
  },
  {
    id: "kanban-crm",
    name: "Kanban CRM Board",
    category: "All Plans",
    icon: <Trello size={32} />,
    description: "Organize and manage quote requests in a visual Kanban board. Drag quotes through 6 status columns (PENDING, CONFIRMED, WON, LOST, CANCELLED, PAID) to track progress at a glance.",
    readingTime: 4,
    learnMoreLink: "/dashboard/support#pricing-quotes",
  },
  {
    id: "geo-fencing",
    name: "Geo-Fencing & Service Areas",
    category: "Pro/Enterprise",
    icon: <MapPin size={32} />,
    description: "Restrict quote requests to specific service areas by ZIP code. Customers outside your service zone see a message explaining your coverage area.",
    readingTime: 6,
    learnMoreLink: "/dashboard/support#advanced-features",
  },
  {
    id: "transit-time",
    name: "Transit Time Estimation",
    category: "All Plans",
    icon: <Clock size={32} />,
    description: "Show customers estimated transit time for their quote. Calculated based on distance and automatically displayed in the quote confirmation.",
    readingTime: 4,
    learnMoreLink: "/dashboard/support#advanced-features",
  },
  {
    id: "payments",
    name: "Payment Processing",
    category: "Pro/Enterprise",
    icon: <CreditCard size={32} />,
    description: "Accept customer payments directly through Qalt. Customers can pay upfront for quotes, streamlining your quote-to-payment workflow.",
    readingTime: 8,
    learnMoreLink: "/dashboard/support#advanced-features",
  },
];

export default function WhatsNewPage() {
  return (
    <div className="p-4 lg:p-10 space-y-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="space-y-3">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          What's New in Qalt
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium max-w-2xl">
          Discover the latest features to help you manage quote requests and grow your business. Each feature includes a brief description and a link to the complete guide.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {whatsnewFeatures.map((feature) => (
          <WhatsNewCard
            key={feature.id}
            name={feature.name}
            icon={feature.icon}
            description={feature.description}
            readingTime={feature.readingTime}
            category={feature.category}
            learnMoreLink={feature.learnMoreLink}
            variant="full"
          />
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-slate-900 dark:bg-[#1e1e1e] dark:border dark:border-white/[0.06] rounded-none p-8 text-center space-y-4">
        <h2 className="text-2xl font-black text-white">Ready to get started?</h2>
        <p className="text-slate-300 max-w-xl mx-auto">
          Explore each feature in detail by clicking "Learn More" above, or head back to the dashboard to start using them.
        </p>
        <a
          href="/dashboard"
          className="inline-block px-6 py-3 mt-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-none transition-all"
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify page compiles**

Run: `npx tsc --noEmit`

Expected: No TypeScript errors

- [ ] **Step 3: Commit the page**

```bash
git add src/app/dashboard/whats-new/page.tsx
git commit -m "feat: create /dashboard/whats-new showcase page with 5 features"
```

---

## Task 4: Restructure Support Page (Feature Reference Hub)

**Files:**
- Modify: `src/app/dashboard/support/page.tsx`

Replace the FAQ-only format with a 6-category Feature Reference Hub organized by feature category.

- [ ] **Step 1: Backup and replace the support page**

Read the current file first, then replace with the new structure:

Create `src/app/dashboard/support/page.tsx`:

```typescript
"use client";

import { useState } from "react";
import {
  Palette,
  DollarSign,
  Mail,
  Zap,
  BarChart3,
  Settings,
  HelpCircle,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import SupportModal from "@/components/shared/SupportModal";

const featureCategories = [
  {
    id: "widget-configuration",
    name: "Widget Configuration",
    icon: Palette,
    description: "Customize how your widget looks and feels",
    guides: [
      {
        title: "Upload Logo",
        description:
          "Add your company logo to the quote form header. Improves brand recognition and customer trust.",
        actionLink: "/dashboard/widget",
        actionText: "Go to Widget Settings",
      },
      {
        title: "Customize Colors",
        description:
          "Set the primary color to match your brand. Changes apply instantly to your live widget.",
        actionLink: "/dashboard/widget",
        actionText: "Go to Widget Settings",
      },
      {
        title: "Add Background Image",
        description:
          "Upload a background image to the quote form for visual context about your services.",
        actionLink: "/dashboard/widget",
        actionText: "Go to Widget Settings",
      },
      {
        title: "Edit Widget Text",
        description:
          "Customize the button text and form headers to match your brand voice.",
        actionLink: "/dashboard/widget",
        actionText: "Go to Widget Settings",
      },
    ],
  },
  {
    id: "pricing-quotes",
    name: "Pricing & Quotes",
    icon: DollarSign,
    description: "Configure pricing and organize customer requests",
    guides: [
      {
        title: "Set Pricing Rules",
        description:
          "Configure your base rate per mile, minimum charge, and service extras (stairs, inside delivery, large items).",
        actionLink: "/dashboard/pricing",
        actionText: "Go to Pricing Settings",
      },
      {
        title: "Kanban Quote Board",
        description:
          "Organize quotes by status in a visual board. Drag quotes to track PENDING → CONFIRMED → WON.",
        actionLink: "/dashboard/quotes",
        actionText: "Go to Quotes Board",
      },
      {
        title: "View Quote Details",
        description:
          "See customer info, location, requested date, estimated price, and add internal notes.",
        actionLink: "/dashboard/quotes",
        actionText: "Go to Quotes Board",
      },
    ],
  },
  {
    id: "customer-communication",
    name: "Customer Communication",
    icon: Mail,
    description: "Manage how you communicate with customers",
    guides: [
      {
        title: "Send Test Emails",
        description:
          "Verify your notification emails arrive correctly before deploying the widget.",
        actionLink: "/dashboard/settings",
        actionText: "Go to Account Settings",
      },
      {
        title: "White-Label Email Domain",
        description:
          "Send customer emails from your own domain instead of Qalt's. Requires Pro/Enterprise plan.",
        actionLink: "/dashboard/settings",
        actionText: "Go to Custom Email Domain",
      },
      {
        title: "Email Notifications",
        description:
          "Confirm your notification email is set correctly to receive quote alerts immediately.",
        actionLink: "/dashboard/settings",
        actionText: "Go to Account Settings",
      },
    ],
  },
  {
    id: "advanced-features",
    name: "Advanced Features",
    icon: Zap,
    description: "Power up your workflow with advanced capabilities",
    guides: [
      {
        title: "Geo-Fencing & Service Areas",
        description:
          "Restrict quote requests to specific ZIP codes. Customers outside your service area see a message explaining coverage.",
        actionLink: "/dashboard/widget",
        actionText: "Go to Geo-Fencing Settings",
      },
      {
        title: "Transit Time Estimation",
        description:
          "Automatically calculate and display estimated transit time for each quote based on distance.",
        actionLink: "/dashboard/quotes",
        actionText: "View in Quotes",
      },
      {
        title: "Payment Processing",
        description:
          "Accept customer payments upfront for quotes. Available on Pro/Enterprise plans.",
        actionLink: "/dashboard/settings",
        actionText: "Go to Payment Settings",
      },
      {
        title: "Webhooks & Integrations",
        description:
          "Integrate Qalt with your backend systems to automate quote handling and data sync.",
        actionLink: "/dashboard/webhooks",
        actionText: "Go to Webhooks",
      },
      {
        title: "Multiple Widget Forms",
        description:
          "Create up to 5 separate widgets with different branding and pricing (Pro) or unlimited (Enterprise).",
        actionLink: "/dashboard/forms",
        actionText: "Go to Forms",
      },
    ],
  },
  {
    id: "analytics-reporting",
    name: "Analytics & Reporting",
    icon: BarChart3,
    description: "Understand your quote performance",
    guides: [
      {
        title: "Quote Metrics & Trends",
        description:
          "View total quotes, monthly trends, and quote status breakdown on your dashboard.",
        actionLink: "/dashboard",
        actionText: "Go to Dashboard",
      },
      {
        title: "Service Type Breakdown",
        description:
          "See which services are most requested (standard delivery vs. large item) in a visual chart.",
        actionLink: "/dashboard",
        actionText: "Go to Dashboard",
      },
      {
        title: "Monthly Quota Tracking",
        description:
          "Monitor your monthly quota usage based on your subscription plan in real-time.",
        actionLink: "/dashboard",
        actionText: "Go to Dashboard",
      },
    ],
  },
  {
    id: "account-billing",
    name: "Account & Billing",
    icon: Settings,
    description: "Manage your account and subscription",
    guides: [
      {
        title: "View Your Plan",
        description:
          "See your current plan features, quota limits, and pricing. Understand what's included in your tier.",
        actionLink: "/dashboard/billing",
        actionText: "Go to Subscription",
      },
      {
        title: "Upgrade or Downgrade",
        description:
          "Change plans anytime. Upgrades take effect immediately; downgrades apply at the end of your billing period.",
        actionLink: "/dashboard/billing",
        actionText: "Go to Subscription",
      },
      {
        title: "Billing & Invoices",
        description:
          "View invoice history, manage your payment method, and download receipts.",
        actionLink: "/dashboard/billing",
        actionText: "Go to Billing",
      },
      {
        title: "Account Settings",
        description:
          "Update your company name, email address, and notification preferences.",
        actionLink: "/dashboard/settings",
        actionText: "Go to Account Settings",
      },
      {
        title: "Data Retention & Cancellation",
        description:
          "Your data is retained for 30 days after cancellation. Reactivate within that window to recover everything.",
        actionLink: "/dashboard/billing",
        actionText: "Go to Subscription",
      },
    ],
  },
];

function FeatureGuide({
  title,
  description,
  actionLink,
  actionText,
}: {
  title: string;
  description: string;
  actionLink: string;
  actionText: string;
}) {
  return (
    <div className="border-l-2 border-slate-200 dark:border-white/[0.06] pl-4 py-3">
      <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">
        {title}
      </p>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
        {description}
      </p>
      <a
        href={actionLink}
        className="inline-flex text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors items-center gap-1 group"
      >
        {actionText}
        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
      </a>
    </div>
  );
}

function CategorySection({
  id,
  name,
  icon: Icon,
  description,
  guides,
}: (typeof featureCategories)[0]) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div id={id} className="scroll-mt-20 space-y-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 bg-white dark:bg-[#1e1e1e] border border-slate-200 dark:border-white/[0.06] rounded-none hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3 text-left">
          <Icon size={20} className="text-red-500 shrink-0" />
          <div>
            <h2 className="font-black text-slate-900 dark:text-white text-base">
              {name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              {description}
            </p>
          </div>
        </div>
        <ChevronDown
          size={18}
          className={`text-slate-400 shrink-0 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded && (
        <div className="space-y-4 pl-4">
          {guides.map((guide, idx) => (
            <FeatureGuide
              key={idx}
              title={guide.title}
              description={guide.description}
              actionLink={guide.actionLink}
              actionText={guide.actionText}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SupportPage() {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  return (
    <>
      <div className="p-4 sm:p-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Feature Reference
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 font-medium">
            Learn about every Qalt feature and how to use it. Each guide includes a direct link to the relevant settings page.
          </p>
        </div>

        {/* Feature Categories */}
        <div className="space-y-6 mb-12">
          {featureCategories.map((category) => (
            <CategorySection key={category.id} {...category} />
          ))}
        </div>

        {/* Still need help CTA */}
        <div className="bg-slate-900 dark:bg-[#1e1e1e] dark:border dark:border-white/[0.06] rounded-none p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-none flex items-center justify-center shrink-0">
              <MessageCircle size={18} className="text-white" />
            </div>
            <div>
              <p className="text-white font-black text-base">Still need help?</p>
              <p className="text-slate-400 text-sm font-medium mt-0.5">
                Can't find your answer above? Our team typically responds within a few hours.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="shrink-0 px-6 py-3 bg-red-600 text-white rounded-none font-black text-sm hover:bg-red-500 transition-all shadow-lg dark:shadow-none whitespace-nowrap"
          >
            Contact Support →
          </button>
        </div>
      </div>

      <SupportModal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} />
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compilation**

Run: `npx tsc --noEmit`

Expected: No TypeScript errors

- [ ] **Step 3: Commit the restructured support page**

```bash
git add src/app/dashboard/support/page.tsx
git commit -m "feat: restructure support page as Feature Reference Hub with 6 categories"
```

---

## Task 5: Integrate What's New Highlight into Dashboard Overview

**Files:**
- Modify: `src/app/dashboard/page.tsx`

Add the WhatsNewHighlight component to the dashboard overview after the onboarding checklist.

- [ ] **Step 1: Update the dashboard page**

Find line ~308 (after `{showChecklist && <OnboardingChecklist steps={onboardingSteps} />}`) and add the WhatsNewHighlight.

First, add the import at the top of `src/app/dashboard/page.tsx`:

```typescript
import WhatsNewHighlight from "@/components/dashboard/WhatsNewHighlight";
```

Then, add the component after the onboarding checklist (around line 310):

```typescript
      {/* Onboarding checklist — shown until merchant completes 3 of 4 steps */}
      {showChecklist && <OnboardingChecklist steps={onboardingSteps} />}

      {/* What's New Highlight */}
      <WhatsNewHighlight />
```

- [ ] **Step 2: Verify the page compiles**

Run: `npx tsc --noEmit`

Expected: No TypeScript errors

- [ ] **Step 3: Test the integration locally (visual check)**

Run: `npm run dev` and navigate to http://localhost:3000/dashboard

Expected: Dashboard loads, What's New highlight appears with 3 featured items and "View All Features" button

- [ ] **Step 4: Stop the dev server**

Press `Ctrl+C` in the terminal

- [ ] **Step 5: Commit the dashboard changes**

```bash
git add src/app/dashboard/page.tsx
git commit -m "feat: integrate What's New highlight on dashboard overview"
```

---

## Task 6: Update Dashboard Navigation (Add What's New Link)

**Files:**
- Modify: `src/app/dashboard/layout.tsx`

Add a "What's New" link to the sidebar navigation above "Support".

- [ ] **Step 1: Read the current layout file to understand navigation structure**

Run: `head -100 src/app/dashboard/layout.tsx`

(Examine the sidebar menu/navigation structure to find where to add the link)

- [ ] **Step 2: Add the What's New navigation item**

Find the navigation array/menu in `src/app/dashboard/layout.tsx` and locate the Support link. Add a What's New link before it.

The pattern should look something like:

```typescript
// In your navigation array or sidebar menu:
{
  label: "What's New",
  href: "/dashboard/whats-new",
  icon: "Star", // or use lucide icon
},
{
  label: "Support",
  href: "/dashboard/support",
  icon: "HelpCircle",
},
```

(Exact code depends on your current navigation structure — adjust accordingly)

- [ ] **Step 3: Verify TypeScript compilation**

Run: `npx tsc --noEmit`

Expected: No TypeScript errors

- [ ] **Step 4: Commit the navigation update**

```bash
git add src/app/dashboard/layout.tsx
git commit -m "feat: add What's New link to dashboard sidebar navigation"
```

---

## Task 7: Comprehensive Testing & Verification

**No files to create/modify** — verification only

- [ ] **Step 1: Start dev server**

Run: `npm run dev`

Expected: Server starts on http://localhost:3000

- [ ] **Step 2: Test Dashboard Overview**

Navigate to: http://localhost:3000/dashboard

**Verify:**
- What's New highlight card appears
- Shows 3 featured items (white-label email, Kanban CRM, geo-fencing)
- "View All Features" button is visible and clickable
- Dark mode toggle (if present) works correctly

- [ ] **Step 3: Test What's New Showcase Page**

Click "View All Features" button or navigate to: http://localhost:3000/dashboard/whats-new

**Verify:**
- Page loads with hero section
- All 5 feature cards display correctly:
  - White-Label Email Domain
  - Kanban CRM Board
  - Geo-Fencing & Service Areas
  - Transit Time Estimation
  - Payment Processing
- Each card shows: name, category badge, description, reading time, "Learn More" link
- "Back to Dashboard" button works
- Dark mode is properly applied

- [ ] **Step 4: Test Feature Reference Hub**

Navigate to: http://localhost:3000/dashboard/support

**Verify:**
- Page title is "Feature Reference"
- All 6 categories are present and expandable:
  - Widget Configuration (4 guides)
  - Pricing & Quotes (3 guides)
  - Customer Communication (3 guides)
  - Advanced Features (5 guides)
  - Analytics & Reporting (3 guides)
  - Account & Billing (5 guides)
- Each guide shows title, description, and action link
- Categories collapse/expand on click
- "Contact Support" button works
- Dark mode is properly applied

- [ ] **Step 5: Test What's New → Feature Reference Links**

From /dashboard/whats-new:
- Click "Learn More" on "White-Label Email Domain" → should anchor to /dashboard/support#customer-communication
- Click "Learn More" on "Kanban CRM Board" → should anchor to /dashboard/support#pricing-quotes
- Click "Learn More" on "Geo-Fencing" → should anchor to /dashboard/support#advanced-features

**Verify:** Each link navigates to correct category anchor

- [ ] **Step 6: Test Feature Reference Action Links**

From /dashboard/support:
- Click "Go to Widget Settings" in Widget Configuration → navigate to /dashboard/widget
- Click "Go to Pricing Settings" in Pricing & Quotes → navigate to /dashboard/pricing
- Click "Go to Quotes Board" → navigate to /dashboard/quotes
- Verify all action links navigate to correct pages

- [ ] **Step 7: Test Responsive Design**

Using browser dev tools:
- Desktop (1024px+): 2-column layout for feature cards
- Tablet (768px): 2 columns should adjust gracefully
- Mobile (375px): 1-column layout, readable and clickable buttons

**Verify:** Layout is readable on all screen sizes

- [ ] **Step 8: Test Dark Mode Consistency**

Toggle dark mode (if available) on all three pages:
- /dashboard (What's New highlight)
- /dashboard/whats-new (full showcase)
- /dashboard/support (feature reference)

**Verify:**
- Text is readable (not white on white, not black on black)
- Icons are visible
- Borders are subtle and visible
- Buttons are clearly clickable

- [ ] **Step 9: Stop dev server and run type check**

Press `Ctrl+C` in terminal, then:

Run: `npx tsc --noEmit`

Expected: No TypeScript errors

- [ ] **Step 10: Create final commit summarizing testing**

```bash
git log --oneline -10
```

(Verify all commits from Task 1-6 are present)

Expected: Should see commits for:
- WhatsNewCard component
- WhatsNewHighlight component
- What's New showcase page
- Support page restructure
- Dashboard integration
- Navigation link

---

## Summary

This plan implements a complete feature discovery system across 6 components:

1. **WhatsNewCard** — Reusable component for displaying features
2. **WhatsNewHighlight** — Dashboard highlight section
3. **/dashboard/whats-new** — Full feature showcase page
4. **Support page restructure** — Feature Reference Hub with 6 categories
5. **Dashboard integration** — Highlight appears on overview
6. **Navigation update** — What's New link in sidebar

All changes are dark-mode compatible, responsive, and TypeScript-safe. The system is maintainable and easy to add features to by updating the `whatsnewFeatures` array and adding new guides to the Feature Reference section.
