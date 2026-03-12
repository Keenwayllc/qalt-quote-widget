import React from 'react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
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
  );
}
