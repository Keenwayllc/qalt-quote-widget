import type { PlanEntitlements } from "./plans";

type Feature = "isAnalyticsDashboardEnabled" | "isWebhookEnabled";
export type GuideAction = { label: string; href: string; feature?: Feature };
export type PageGuide = {
  title: string;
  purpose: string;
  controls: string[];
  configure: string;
  next: GuideAction;
  feature?: Feature;
  requirement?: string;
  adminOnly?: boolean;
};

// Keep guidance beside the real console routes. More-specific routes win.
export const pageGuides: Record<string, PageGuide> = {
  "/dashboard": {
    title: "Overview",
    purpose: "See recent quote activity, usage, and setup progress in one place.",
    controls: ["Use the setup checklist to find unfinished tasks.", "Open Quotes to follow up on incoming requests. The sidebar takes you to every console section."],
    configure: "Start with pricing, then check the widget customers will see.",
    next: { label: "Set your pricing", href: "/dashboard/pricing" },
  },
  "/dashboard/quotes": {
    title: "Quotes",
    purpose: "Review customer quote requests and keep their status up to date.",
    controls: ["Switch between the list and Kanban views to review the pipeline.", "Open a request to review delivery details and available quote documents."],
    configure: "Check the request details before changing status or following up with the customer.",
    next: { label: "Review customer contact details", href: "/dashboard/settings/customer-contact" },
  },
  "/dashboard/quotes/abandoned": {
    title: "Abandoned quotes",
    purpose: "Review leads that started a quote but did not finish.",
    controls: ["Review the saved customer and route details.", "Use the available follow-up actions when the lead includes contact details."],
    configure: "Check the lead before contacting the customer.",
    next: { label: "Review completed quotes", href: "/dashboard/quotes" },
  },
  "/dashboard/analytics": {
    title: "Analytics",
    purpose: "Understand quote volume, trends, and service activity.",
    controls: ["Review the charts and summary metrics.", "Compare activity before deciding whether pricing or your form needs adjustment."],
    configure: "There is no setup here. Collect quote requests first so the charts have useful data.",
    feature: "isAnalyticsDashboardEnabled",
    requirement: "Analytics is available on Pro and Enterprise. Starter includes the Overview and Quotes pages.",
    next: { label: "Review your forms", href: "/dashboard/forms" },
  },
  "/dashboard/analytics/funnel": {
    title: "Quote funnel",
    purpose: "Compare quote starts, completed quotes, bookings, and payments over the last 30 days.",
    controls: ["Read the conversion rates alongside the number of starts.", "Paid metrics depend on actual payments; widget payments require Enterprise."],
    configure: "Use the drop-off points to decide what to review in your customer form.",
    feature: "isAnalyticsDashboardEnabled",
    requirement: "Analytics guidance is for Pro and Enterprise. Starter merchants can review requests in Quotes.",
    next: { label: "Review your forms", href: "/dashboard/forms" },
  },
  "/dashboard/forms": {
    title: "My Forms",
    purpose: "Manage the quote forms customers use for your services.",
    controls: ["Create a named form and choose its questions and vehicle options. Extended forms support shipment presets, conditional questions, and answer fees.", "Use each form's pricing, appearance, preview, and embed actions to configure that form."],
    configure: "Keep questions relevant to the service. Starter allows 1 form, Pro 5, and Enterprise unlimited forms. Vehicle quoting requires Enterprise.",
    next: { label: "Review quote requests", href: "/dashboard/quotes" },
  },
  "/dashboard/pricing": {
    title: "Pricing Settings",
    purpose: "Set the rates and extras used to calculate customer estimates.",
    controls: ["Check the selected form before editing; form-specific pricing and default pricing are separate.", "Review your base rate, minimum charge, and enabled service extras, then save. Add delivery services and their windows so customers compare full quote totals."],
    configure: "Use rates that match your delivery costs. Vehicle pricing is available on Enterprise.",
    next: { label: "Customize widget appearance", href: "/dashboard/widget" },
  },
  "/dashboard/pricing/simulator": {
    title: "Pricing simulator",
    purpose: "Try the current default pricing and rules without creating a customer quote.",
    controls: ["Enter miles, weight, items, and stair flights, then run the simulation.", "Review the total and its line items."],
    configure: "Test representative deliveries. The simulator reads saved default pricing; it does not save new rates.",
    next: { label: "Adjust pricing", href: "/dashboard/pricing" },
  },
  "/dashboard/pricing/templates": {
    title: "Pricing templates",
    purpose: "Choose a starting pricing structure for your delivery business.",
    controls: ["Compare each template's rates and minimum.", "Applying a template replaces values in the default pricing profile."],
    configure: "Review the current default before applying a template, then fine-tune the rates.",
    next: { label: "Review pricing settings", href: "/dashboard/pricing" },
  },
  "/dashboard/pricing/rules": {
    title: "Pricing rules",
    purpose: "Add conditional surcharges for distance, weight, or item count.",
    controls: ["Give a rule a name, threshold, and flat or percentage adjustment.", "Enable, disable, or delete rules from the list."],
    configure: "Check the threshold and amount carefully before enabling a rule.",
    next: { label: "Test pricing rules", href: "/dashboard/pricing/simulator" },
  },
  "/dashboard/widget": {
    title: "Widget Appearance",
    purpose: "Choose how your customer quote widget looks and reads.",
    controls: ["Check the selected form, adjust the available text and color controls, then save.", "Use the preview to check the customer experience and the service-area settings.", "On Enterprise, use Advanced appearance to match the form's colors, fonts, shapes and light or dark mode to your website."],
    configure: "Keep labels clear. Logo uploads, backgrounds, and advanced customization require Pro or Enterprise. Advanced appearance, widget payments and custom CSS require Enterprise.",
    next: { label: "Get embed code", href: "/dashboard/embed" },
  },
  "/dashboard/embed": {
    title: "Get Embed Code",
    purpose: "Add the configured widget to your website or share its link.",
    controls: ["Copy the default widget's embed code or link. For a specific form, use its embed action in My Forms.", "Follow the installation instructions for your website platform."],
    configure: "Save pricing and appearance first. Test the installed widget on a phone and desktop before sharing it.",
    next: { label: "Manage your forms", href: "/dashboard/forms" },
  },
  "/dashboard/webhooks": {
    title: "Webhooks & integrations",
    purpose: "Connect Qalt to supported AI tools and receive quote events in your systems.",
    controls: ["Create a scoped access token and follow the chosen platform's connection instructions.", "Add a webhook URL, test delivery, and review integration activity. Current AI connections are read-only."],
    configure: "Use a trusted receiving endpoint and keep access tokens private.",
    feature: "isWebhookEnabled",
    requirement: "Webhooks and AI connections require Enterprise. They are unavailable on Starter and Pro.",
    next: { label: "Review quote requests", href: "/dashboard/quotes" },
  },
  "/dashboard/billing": {
    title: "Subscription",
    purpose: "Review your plan, usage, and subscription options.",
    controls: ["Compare the included features and form or quote limits.", "Use the available subscription controls to manage your plan."],
    configure: "Choose the plan that fits the features you need. Review any confirmation carefully before changing or cancelling a subscription.",
    next: { label: "Review account settings", href: "/dashboard/settings" },
  },
  "/dashboard/settings": {
    title: "Account Settings",
    purpose: "Keep your company profile and internal notification details current.",
    controls: ["Edit company information, contact name, address, and profile images.", "Check the internal notification email and use the test email control to verify delivery."],
    configure: "Save accurate business details. Set the public customer contact separately.",
    next: { label: "Set customer contact details", href: "/dashboard/settings/customer-contact" },
  },
  "/dashboard/settings/customer-contact": {
    title: "Customer Contact",
    purpose: "Choose the contact details customers see on quotes, emails, and PDFs.",
    controls: ["Set the department, customer-facing email, phone, and support hours.", "Review the customer preview and save. Customer email replies go to this address."],
    configure: "Use a monitored customer-service address. Your internal notification email is managed in Account Settings.",
    next: { label: "Review your quotes", href: "/dashboard/quotes" },
  },
  "/dashboard/whats-new": {
    title: "What's New",
    purpose: "Read updates about Qalt's available features.",
    controls: ["Browse the update notes and any links to related console pages."],
    configure: "No setup is needed here. Check your plan before using a feature mentioned in an update.",
    next: { label: "Find help and FAQs", href: "/dashboard/support" },
  },
  "/dashboard/support": {
    title: "Help & FAQ",
    purpose: "Find feature instructions, common answers, and Qalt support.",
    controls: ["Browse feature categories and expand FAQ answers.", "Use the support contact control when you need help with your account."],
    configure: "Describe the page and the issue when asking for help.",
    next: { label: "Return to overview", href: "/dashboard" },
  },
  "/dashboard/support/articles": {
    title: "Help article",
    purpose: "Read detailed instructions for the topic you opened.",
    controls: ["Follow the article's steps and links to the related feature."],
    configure: "Check the requirements and your plan before changing settings.",
    next: { label: "Browse help and FAQs", href: "/dashboard/support" },
  },
  "/dashboard/ops/jobs": {
    title: "Jobs Dashboard",
    purpose: "Organize delivery jobs using saved stop notes.",
    controls: ["Search by job ID or stop name and open a job to review its details.", "Create a job with a date, saved stops, and an optional linked quote."],
    configure: "Save stop notes first, then check the stops and schedule for each job.",
    next: { label: "Check delivery readiness", href: "/dashboard/ops/readiness" },
  },
  "/dashboard/ops/stops": {
    title: "Saved Stop Notes",
    purpose: "Keep reusable delivery-site contacts and access instructions.",
    controls: ["Search by name or address and open a stop to review its notes.", "Add company, address, contact, entry codes, hours, and delivery instructions."],
    configure: "Keep access and contact details current so they can be reused in jobs.",
    next: { label: "Create a delivery job", href: "/dashboard/ops/jobs" },
  },
  "/dashboard/ops/readiness": {
    title: "Delivery Readiness",
    purpose: "Record whether a delivery stop is ready for the scheduled date.",
    controls: ["Choose a saved stop and date.", "Confirm contact, address, access, and site readiness; add notes and save the check."],
    configure: "Only confirm details you have verified. Record an exception when there is an issue.",
    next: { label: "Review delivery jobs", href: "/dashboard/ops/jobs" },
  },
  "/dashboard/ops/bookings": {
    title: "Booking workflow",
    purpose: "Schedule operational bookings created from accepted or paid quotes.",
    controls: ["Set the date, driver, vehicle, status, and internal notes.", "Save each booking after making changes."],
    configure: "Check the customer route and assignments before starting the job.",
    next: { label: "Review delivery readiness", href: "/dashboard/ops/readiness" },
  },
  "/dashboard/growth": {
    title: "Growth tools",
    purpose: "Find the console's follow-up, funnel, booking, and pricing tools.",
    controls: ["Open a tool from its link to review the available controls."],
    configure: "Start with saved pricing and real quote activity. Analytics requires Pro or Enterprise.",
    next: { label: "Test your pricing", href: "/dashboard/pricing/simulator" },
  },
  "/dashboard/onboarding": {
    title: "Company setup",
    purpose: "Work through the existing company setup checklist.",
    controls: ["Use Previous and Next to review company details, service area, pricing, branding, and publishing.", "Payment setup is only available with Enterprise widget payments."],
    configure: "Save accurate company and service details, then preview the widget before publishing.",
    next: { label: "Return to overview", href: "/dashboard" },
  },
  "/dashboard/admin": {
    title: "Admin",
    purpose: "Review company and lead activity using the administrator console.",
    controls: ["Review the company list and available administrative controls."],
    configure: "Verify the company before making an administrative change.",
    next: { label: "Return to overview", href: "/dashboard" },
    adminOnly: true,
  },
};

export function getPageGuide(pathname: string, isAdmin = false): PageGuide | null {
  const route = Object.keys(pageGuides)
    .filter((path) => pathname === path || (path !== "/dashboard" && pathname.startsWith(path + "/")))
    .sort((a, b) => b.length - a.length)[0];
  const guide = route ? pageGuides[route] : null;
  return guide?.adminOnly && !isAdmin ? null : guide;
}

export const gettingStartedSteps: GuideAction[] = [
  { label: "Pricing Settings", href: "/dashboard/pricing" },
  { label: "Widget Appearance", href: "/dashboard/widget" },
  { label: "Preview Widget", href: "preview" },
  { label: "Get Embed Code", href: "/dashboard/embed" },
  { label: "My Forms", href: "/dashboard/forms" },
  { label: "Quotes", href: "/dashboard/quotes" },
  { label: "Analytics", href: "/dashboard/analytics", feature: "isAnalyticsDashboardEnabled" },
];

export function guideActionHref(action: GuideAction, entitlements: PlanEntitlements, companyId: string, formId?: string | null) {
  if (action.feature && !entitlements[action.feature]) return "/dashboard/billing";
  if (action.href === "preview") return formId ? `/widget/form/${encodeURIComponent(formId)}` : `/widget/${encodeURIComponent(companyId)}`;
  if (formId && action.href === "/dashboard/embed") return "/dashboard/forms";
  if (formId && ["/dashboard/pricing", "/dashboard/widget"].includes(action.href)) {
    return `${action.href}?formId=${encodeURIComponent(formId)}`;
  }
  return action.href;
}
