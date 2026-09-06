import type { NextConfig } from "next";

// Public identifier for Qalt's dedicated demo tenant. Vercel Production and
// Preview can override this with DEMO_COMPANY_ID, but a missing env value must
// not take the public /demo showroom offline. This ID belongs only to the demo
// tenant and is already public through /widget/[companyId] URLs.
const DEMO_COMPANY_ID =
  process.env.DEMO_COMPANY_ID ||
  process.env.NEXT_PUBLIC_DEMO_COMPANY_ID ||
  "cmtjk5po0000004jzgud1ar9o";

const nextConfig: NextConfig = {
  env: {
    DEMO_COMPANY_ID,
  },
};

export default nextConfig;
