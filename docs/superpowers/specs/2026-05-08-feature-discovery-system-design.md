# Qalt Feature Discovery & Documentation System Design

**Date:** 2026-05-08  
**Status:** Design Phase  
**Scope:** What's New showcase, Feature Reference Hub, and Dashboard integration

---

## Overview

This design introduces a comprehensive feature discovery and documentation system for Qalt customers. The system consists of three interconnected parts:

1. **What's New Dashboard Highlight** — Quick preview of latest features on the main dashboard
2. **What's New Showcase Page** — Dedicated page showcasing all new features with details and learning resources
3. **Feature Reference Hub** — Complete knowledge base organized by feature category (replaces FAQ-only structure)

The goal is to help users discover new features, understand how to use them, and navigate to feature pages with clear action links.

---

## System Architecture

### Pages & Navigation

```text
/dashboard (Overview)
├── What's New highlight card
│   └── "View All Features" → /dashboard/whats-new

/dashboard/whats-new (New Page)
├── Hero section
├── 5 Feature cards (white-label email, Kanban CRM, geo-fencing, transit time, payments)
└── Each card links to /dashboard/support#category

/dashboard/support (Restructured)
├── Feature Reference Hub (not FAQ-style)
├── 6 Feature categories with anchor links
│   ├── #widget-configuration
│   ├── #pricing-quotes
│   ├── #customer-communication
│   ├── #advanced-features
│   ├── #analytics-reporting
│   └── #account-billing
├── 3-5 brief guides per category
└── "Still need help?" CTA
```

### Sidebar Navigation

**Decision:** Keep "Support" link, add "What's New" as separate link above it in the dashboard sidebar.

**Rationale:** What's New is a temporary/rotating feature that highlights recent additions, while Support/Feature Reference is a permanent knowledge base. Separating them in navigation makes the distinction clear and prevents confusion.

---

## What's New Showcase Page (`/dashboard/whats-new`)

### Purpose
Dedicated showcase for the 5 new features, designed to highlight them prominently and drive awareness/adoption.

### Layout & Components

**Hero Section:**
- Title: "What's New in Qalt"
- Subtitle: "Discover the latest features to help you manage quote requests and grow your business."

**Feature Grid:**
- 2 columns on desktop, 1 on mobile
- 5 feature cards, each containing:
  - Icon (from lucide-react)
  - Feature name
  - Category/plan badge (e.g., "Pro/Enterprise", "All Plans")
  - Description (2-3 sentences max)
  - Estimated reading time (e.g., "5 min read")
  - "Learn More" link (anchors to `/dashboard/support#category`)

**Feature Cards Data:**

```typescript
const whatsnewFeatures = [
  {
    id: "white-label-email",
    name: "White-Label Email Domain",
    category: "Pro/Enterprise",
    icon: "Mail",
    description: "Send customer confirmation emails from your own domain instead of Qalt's. Configure a custom sender name and verify DNS records to establish brand trust.",
    readingTime: 5,
    learnMoreLink: "/dashboard/support#customer-communication"
  },
  {
    id: "kanban-crm",
    name: "Kanban CRM Board",
    category: "All Plans",
    icon: "Trello",
    description: "Organize and manage quote requests in a visual Kanban board. Drag quotes through 6 status columns (PENDING, CONFIRMED, WON, LOST, CANCELLED, PAID) to track progress at a glance.",
    readingTime: 4,
    learnMoreLink: "/dashboard/support#pricing-quotes"
  },
  {
    id: "geo-fencing",
    name: "Geo-Fencing & Service Areas",
    category: "Pro/Enterprise",
    icon: "MapPin",
    description: "Restrict quote requests to specific service areas by ZIP code. Customers outside your service zone see a message explaining your coverage area.",
    readingTime: 6,
    learnMoreLink: "/dashboard/support#advanced-features"
  },
  {
    id: "transit-time",
    name: "Transit Time Estimation",
    category: "All Plans",
    icon: "Clock",
    description: "Show customers estimated transit time for their quote. Calculated based on distance and automatically displayed in the quote confirmation.",
    readingTime: 4,
    learnMoreLink: "/dashboard/support#advanced-features"
  },
  {
    id: "payments",
    name: "Payment Processing",
    category: "Pro/Enterprise",
    icon: "CreditCard",
    description: "Accept customer payments directly through Qalt. Customers can pay upfront for quotes, streamlining your quote-to-payment workflow.",
    readingTime: 8,
    learnMoreLink: "/dashboard/support#advanced-features"
  }
];
```

### Styling

- Dark mode support (match dashboard theme: dark:bg-[#1e1e1e], dark:text-white)
- Hover states: subtle lift/shadow on cards
- Responsive: 2 columns (lg), 1 column (md and below)
- Padding/spacing consistent with dashboard pages

---

## Feature Reference Hub (`/dashboard/support` restructured)

### Purpose
Replace FAQ-only format with a complete feature reference organized by category. Users can browse all features, understand what they do, and navigate directly to configuration pages.

### Layout & Components

**Navigation:**
- Sticky section header with category links (scrollable on mobile, side nav on desktop)
- Each category is an anchor (`#widget-configuration`, `#pricing-quotes`, etc.)
- Current section highlighted as user scrolls

**6 Feature Categories:**

#### 1. Widget Configuration
**Features documented:**
- Upload Logo
- Customize Colors
- Add Background Image
- Edit Widget Text (button text, header text)
- Mobile Preview & Responsive Design

**Example format:**
```
### Widget Configuration
[Icon] Customize how your widget looks and feels

- **Upload Logo** — Add your company logo to the quote form header. Improves brand recognition and customer trust. → Go to Widget Settings
- **Customize Colors** — Set the primary color to match your brand. Changes apply instantly to your live widget. → Go to Widget Settings
- **Add Background Image** — Upload a background image to the quote form for visual context. → Go to Widget Settings
- **Edit Widget Text** — Customize the button text and form headers. → Go to Widget Settings
```

#### 2. Pricing & Quotes
**Features documented:**
- Set Base Rate & Service Fees
- Configure Minimums & Thresholds
- Create Multiple Pricing Profiles
- View & Manage Quotes in Kanban
- Export Quote Data

**Example format:**
```
### Pricing & Quotes
[Icon] Configure pricing and organize customer requests

- **Set Pricing Rules** — Configure your base rate per mile, minimum charge, and service extras (stairs, inside delivery, large items). → Go to Pricing Settings
- **Kanban Quote Board** — Organize quotes by status in a visual board. Drag quotes to track PENDING → CONFIRMED → WON. → Go to Quotes Board
- **View Quote Details** — See customer info, location, requested date, and add internal notes. → Go to Quotes Board
```

#### 3. Customer Communication
**Features documented:**
- Send Test Emails
- White-Label Email Domain
- Email Notifications
- Custom Sender Name

**Example format:**
```
### Customer Communication
[Icon] Manage how you communicate with customers

- **Send Test Emails** — Verify your notification emails arrive correctly. → Go to Account Settings
- **White-Label Email Domain** — Send customer emails from your own domain instead of Qalt's. Requires Pro/Enterprise plan. → Go to Custom Email Domain Settings
- **Email Notifications** — Confirm your notification email is set correctly to receive quote alerts. → Go to Account Settings
```

#### 4. Advanced Features
**Features documented:**
- Geo-Fencing & Service Areas
- Transit Time Estimation
- Payment Processing Integration
- Webhooks for Automation
- Multiple Widget Forms (Pro/Enterprise)

**Example format:**
```
### Advanced Features
[Icon] Power up your workflow with advanced capabilities

- **Geo-Fencing** — Restrict quote requests to specific ZIP codes. Customers outside your service area see a message explaining coverage. Requires Pro/Enterprise. → Go to Geo-Fencing Settings
- **Transit Time Estimation** — Automatically calculate and display estimated transit time for each quote. → Enabled by Default
- **Payment Processing** — Accept customer payments upfront for quotes. Available on Pro/Enterprise plans. → Go to Payment Settings
- **Webhooks** — Integrate Qalt with your backend systems to automate quote handling. → Go to Webhooks
- **Multiple Widget Forms** — Create up to 5 separate widgets with different branding and pricing (Pro) or unlimited (Enterprise). → Go to Forms
```

#### 5. Analytics & Reporting
**Features documented:**
- Quote Metrics & Trends
- Service Type Breakdown
- Monthly Quota Tracking
- Quote Status Distribution

**Example format:**
```
### Analytics & Reporting
[Icon] Understand your quote performance

- **Quote Metrics** — View total quotes, monthly trends, and quote status breakdown. → Go to Dashboard
- **Service Type Breakdown** — See which services are most requested (standard vs. large item). → Go to Dashboard
- **Quota Tracking** — Monitor your monthly quota usage based on your subscription plan. → Go to Dashboard
```

#### 6. Account & Billing
**Features documented:**
- Subscription Plans & Pricing
- Upgrade/Downgrade Plans
- Billing & Invoice History
- Account Settings & Profile
- Data Retention & Cancellation

**Example format:**
```
### Account & Billing
[Icon] Manage your account and subscription

- **View Your Plan** — See your current plan features, quota limits, and pricing. → Go to Subscription
- **Upgrade or Downgrade** — Change plans anytime. Upgrades take effect immediately; downgrades apply at the end of your billing period. → Go to Subscription
- **Billing & Invoices** — View invoice history and manage your payment method. → Go to Billing
- **Account Settings** — Update your company name, email, and notification preferences. → Go to Settings
```

**Bottom CTA:**
```
Still need help?
Can't find your answer above? Our team typically responds within a few hours.
[Contact Support Button] → Opens support modal
```

### Styling

- Dark mode support (match support page theme)
- Section headers with icons (lucide-react)
- Clean typography hierarchy
- Action links styled consistently (text-red-600 hover:underline or similar)

---

## Dashboard Overview Integration

### What's New Highlight Card

**Placement:** After onboarding checklist (if visible) or before "Recent Requests" section  
**Size:** Full-width card with padding consistent with other dashboard sections  
**Content:**
- Icon: Star or Sparkles
- Title: "What's New"
- 2-3 latest feature cards (condensed/horizontal layout):
  - Icon + name
  - Brief 1-sentence description
  - Plan badge if applicable
- "View All Features →" button → `/dashboard/whats-new`

**Styling:**
- Border, shadow, and colors match dashboard cards
- Dark mode support
- Responsive: horizontal scroll on mobile if needed, or stack vertically

**Example HTML structure:**
```
<section className="...">
  <div className="flex items-center gap-2 mb-4">
    <Star size={20} className="text-red-500" />
    <h2 className="text-xl font-black">What's New</h2>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    {/* 3 feature mini-cards */}
  </div>
  
  <Link href="/dashboard/whats-new" className="...">
    View All Features →
  </Link>
</section>
```

---

## Data & Management

### Feature Management

Features are stored as a static array (no database required initially). To add a new feature:

1. Add feature object to `whatsnewFeatures` array in `whats-new/page.tsx`
2. Add feature section to `/dashboard/support` if it belongs in a new category
3. Update FAQ if applicable

**Future:** If feature rotation becomes frequent, move to a database table or CMS.

### Content Updates

- When a new feature ships, add it to `whatsnewFeatures` with metadata
- It automatically appears on `/dashboard/whats-new` and dashboard highlight
- Update `/dashboard/support` with brief guide in relevant category

---

## User Experience Flow

1. **User logs into dashboard** → Sees "What's New" highlight card
2. **Clicks "View All Features"** → Navigates to `/dashboard/whats-new`
3. **Browses feature cards** → Sees description, reading time, and "Learn More" link
4. **Clicks "Learn More"** → Anchors to relevant section in `/dashboard/support`
5. **Reads brief guide** → Understands feature and sees action link (e.g., "Go to Widget Settings")
6. **Clicks action link** → Navigates directly to configuration page

---

## Implementation Scope

**Files to create:**
- `src/app/dashboard/whats-new/page.tsx` — What's New showcase page

**Files to modify:**
- `src/app/dashboard/page.tsx` — Add What's New highlight card
- `src/app/dashboard/support/page.tsx` — Restructure from FAQ to feature reference
- `src/app/dashboard/layout.tsx` — Add "What's New" to sidebar nav (optional)

**Components (if created separately):**
- `src/components/dashboard/WhatsNewCard.tsx` — Reusable feature card component
- `src/components/dashboard/WhatsNewHighlight.tsx` — Dashboard highlight section

---

## Assumptions & Constraints

1. **No database required** — Features are hardcoded; admin updates manually (scalable to CMS later)
2. **Action links** — All guides link to existing dashboard pages (no new setup required)
3. **Dark mode** — Matches existing dashboard dark mode implementation
4. **Responsive** — Mobile-first design, tested on common breakpoints
5. **Reading time** — Manually estimated; can be automated later if guides are stored in markdown

---

## Testing Checklist

- [ ] What's New page loads with all 5 features
- [ ] Feature cards display icons, badges, descriptions, reading times
- [ ] "Learn More" links navigate to correct `/dashboard/support` anchor
- [ ] Dashboard highlight card shows 2-3 features correctly
- [ ] "View All Features" button navigates to `/dashboard/whats-new`
- [ ] `/dashboard/support` displays all 6 categories with guides
- [ ] Action links in guides navigate to correct dashboard pages
- [ ] Dark mode works correctly on all pages
- [ ] Responsive design: desktop (2 cols), tablet (2 cols), mobile (1 col)
- [ ] All links are functional and don't have broken anchors

---

## Success Criteria

- Users can discover new features from the dashboard in one click
- Feature Reference Hub provides quick answers without long FAQ-style Q&A
- Users know where to go to configure each feature
- System is maintainable and easy to add new features to
