import type { NextConfig } from "next";

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://maps.googleapis.com https://maps.gstatic.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' data: https://fonts.gstatic.com;
  img-src 'self' data: blob: https://firebasestorage.googleapis.com https://*.googleapis.com https://*.gstatic.com;
  connect-src 'self' https://*.googleapis.com https://*.firebaseapp.com https://firebasestorage.googleapis.com https://api.stripe.com https://o*.ingest.sentry.io wss://*.firebaseapp.com;
  frame-src 'self' https://js.stripe.com https://hooks.stripe.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const securityHeaders = [
  // Prevent DNS prefetch information leakage
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // HSTS: 2 years, include subdomains, preload-ready
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Block clickjacking on same-origin only (widget is JS-injected, not iframed)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Legacy XSS filter (defence-in-depth for older browsers)
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Limit referrer information sent to third-party origins
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrict browser feature access
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      // Geolocation allowed for address autocomplete on the quote widget
      "geolocation=(self)",
      // Payment API allowed for Stripe
      'payment=(self "https://js.stripe.com")',
    ].join(", "),
  },
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // Allow cross-origin requests for the public widget estimate API
        // (called from third-party customer websites)
        source: "/api/widget/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
      {
        // Allow cross-origin requests for the Shopify widget JS bundle
        // (served as a <script> tag injected into Shopify storefronts)
        source: "/api/shopify/widget-js",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
        ],
      },
    ];
  },
};

export default nextConfig;
