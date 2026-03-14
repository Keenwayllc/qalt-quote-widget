import React from 'react';
import { WelcomeEmail } from '@/components/emails/WelcomeEmail';
import { NewQuoteEmail } from '@/components/emails/NewQuoteEmail';

export default function EmailPreviewPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Email Template Previews</h1>
      
      <div className="max-w-4xl mx-auto space-y-12">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">1. Welcome Email</h2>
          <div className="bg-gray-200 p-8 rounded-xl border border-gray-300 overflow-hidden flex justify-center shadow-inner">
            <WelcomeEmail companyName="Acme Logistics Inc." />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">2. New Quote Request Email</h2>
          <div className="bg-gray-200 p-8 rounded-xl border border-gray-300 overflow-hidden flex justify-center shadow-inner">
            <NewQuoteEmail 
              customerName="John Doe"
              customerEmail="john.doe@example.com"
              customerPhone="(555) 123-4567"
              pickupZip="90210"
              dropoffZip="10001"
              distanceMiles={2789.5}
              estimatedPrice={4184.25}
              serviceType="Standard Freight"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
