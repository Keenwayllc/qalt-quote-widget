import * as React from 'react';

interface NewQuoteEmailProps {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  pickupZip: string;
  dropoffZip: string;
  distanceMiles: number;
  estimatedPrice: number;
  serviceType: string;
}

export const NewQuoteEmail: React.FC<Readonly<NewQuoteEmailProps>> = ({
  customerName,
  customerEmail,
  customerPhone,
  pickupZip,
  dropoffZip,
  distanceMiles,
  estimatedPrice,
  serviceType,
}) => (
  <div style={{
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '20px',
    maxWidth: '600px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
  }}>
    <h1 style={{ color: '#1e293b', fontSize: '24px', marginBottom: '16px' }}>New Quote Request!</h1>
    
    <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
      <h2 style={{ color: '#3b82f6', fontSize: '18px', marginTop: '0' }}>Customer Details</h2>
      <p><strong>Name:</strong> {customerName}</p>
      <p><strong>Email:</strong> {customerEmail}</p>
      {customerPhone && <p><strong>Phone:</strong> {customerPhone}</p>}
      
      <h2 style={{ color: '#3b82f6', fontSize: '18px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>Job Details</h2>
      <p><strong>Service:</strong> {serviceType}</p>
      <p><strong>Route:</strong> {pickupZip} → {dropoffZip}</p>
      <p><strong>Distance:</strong> {distanceMiles.toFixed(1)} miles</p>
      
      <div style={{
        marginTop: '20px',
        padding: '16px',
        backgroundColor: '#f0f9ff',
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0', fontSize: '14px', color: '#0369a1' }}>Estimated Price</p>
        <p style={{ margin: '0', fontSize: '32px', fontWeight: 'bold', color: '#0369a1' }}>${estimatedPrice.toFixed(2)}</p>
      </div>
    </div>
    
    <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#64748b' }}>
      Sent via Qalt - Real-time Delivery Quotes
    </p>
  </div>
);
