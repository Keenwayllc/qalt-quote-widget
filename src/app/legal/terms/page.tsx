import PublicNav from "@/components/shared/PublicNav";
import MarketingFooter from "@/components/shared/MarketingFooter";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
    <PublicNav />
    <section className="bg-[#f4f2ec] px-5 pb-14 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-4xl">
        <p className="mb-5 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Qalt Systems</p>
        <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-black leading-[0.9] tracking-[-0.055em] text-slate-950">Terms of Service</h1>
      </div>
    </section>
    <div className="prose prose-slate mx-auto max-w-4xl px-5 py-14 sm:px-8">
      
      <p className="text-slate-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p>By accessing or using Qalt (qalt.site), you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
        <p>Qalt provides embeddable quote calculation tools for delivery and logistics businesses. We reserve the right to modify or discontinue the service at any time.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
        <p>Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account. You agree to provide accurate information when using the calculator tools.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
        <p>Qalt provides estimates only. We are not liable for any discrepancies between the estimated quote and the final price charged by the service provider. We are not responsible for any indirect or consequential damages arising from the use of our service.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Governing Law</h2>
        <p>These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the company operates.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
        <p>We may update these terms from time to time. Your continued use of the service after changes constitutes acceptance of the new terms.</p>
      </section>
    </div>
    <MarketingFooter />
    </div>
  );
}
