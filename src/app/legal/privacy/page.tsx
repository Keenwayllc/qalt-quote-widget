import PublicNav from "@/components/shared/PublicNav";
import MarketingFooter from "@/components/shared/MarketingFooter";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
    <PublicNav />
    <section className="bg-[#f4f2ec] px-5 pb-14 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-4xl">
        <p className="mb-5 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Qalt Systems</p>
        <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-black leading-[0.9] tracking-[-0.055em] text-slate-950">Privacy Policy</h1>
      </div>
    </section>
    <div className="prose prose-slate mx-auto max-w-4xl px-5 py-14 sm:px-8">
      
      <p className="text-slate-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p>Qalt (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website qalt.site and our embedded quote calculator services.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
        <p>We collect information that you provides directly to us, including:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Account information (name, email, company details).</li>
          <li>Data submitted via the quote calculator (zip codes, package details, contact info).</li>
          <li>Usage data and cookies for service optimization.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Provide and maintain our services.</li>
          <li>Process quote requests and notify users.</li>
          <li>Improve our calculator algorithms and user experience.</li>
          <li>Comply with legal obligations.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Data Sharing</h2>
        <p>We do not sell your personal data. We may share information with service providers (like Firebase for storage and Resend for emails) only as necessary to provide our services.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at support@qalt.site.</p>
      </section>
    </div>
    <MarketingFooter />
    </div>
  );
}
