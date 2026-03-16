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
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f8fafc',
  }}>
    {/* Header */}
    <div style={{
      backgroundColor: '#1e3a5f',
      borderRadius: '12px 12px 0 0',
      padding: '28px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
    }}>
      <img
        src="https://qalt.site/images/qalt_face.png"
        alt="Qalt Icon"
        width="44"
        height="44"
        style={{ borderRadius: '10px' }}
      />
      <img
        src="https://qalt.site/images/qalt.png"
        alt="Qalt"
        height="28"
        style={{ display: 'block' }}
      />
    </div>

    {/* Body */}
    <div style={{ padding: '28px 32px' }}>
      <h1 style={{
        color: '#0f172a',
        fontSize: '22px',
        fontWeight: '700',
        margin: '0 0 6px',
      }}>
        New Quote Request
      </h1>
      <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 24px' }}>
        A customer has submitted a quote through your widget.
      </p>

      {/* Price highlight */}
      <div style={{
        backgroundColor: '#1e3a5f',
        borderRadius: '10px',
        padding: '20px 24px',
        marginBottom: '24px',
        textAlign: 'center',
      }}>
        <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600' }}>
          Estimated Price
        </p>
        <p style={{ margin: '0', fontSize: '40px', fontWeight: '800', color: '#ffffff' }}>
          ${estimatedPrice.toFixed(2)}
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#93c5fd' }}>
          {serviceType} · {distanceMiles.toFixed(1)} miles
        </p>
      </div>

      {/* Customer card */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '16px',
      }}>
        <div style={{ padding: '12px 20px', backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
          <p style={{ margin: '0', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Customer
          </p>
        </div>
        <div style={{ padding: '16px 20px' }}>
          <p style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>{customerName}</p>
          <p style={{ margin: '0 0 4px', fontSize: '14px', color: '#475569' }}>{customerEmail}</p>
          {customerPhone && <p style={{ margin: '0', fontSize: '14px', color: '#475569' }}>{customerPhone}</p>}
        </div>
      </div>

      {/* Route card */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '12px 20px', backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
          <p style={{ margin: '0', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Route
          </p>
        </div>
        <div style={{ padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block', flexShrink: '0' }} />
            <span style={{ fontSize: '14px', color: '#0f172a', fontWeight: '600' }}>From: <span style={{ fontWeight: '400', color: '#475569' }}>{pickupZip}</span></span>
          </div>
          <div style={{ marginLeft: '4px', width: '2px', height: '16px', backgroundColor: '#e2e8f0', marginBottom: '8px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block', flexShrink: '0' }} />
            <span style={{ fontSize: '14px', color: '#0f172a', fontWeight: '600' }}>To: <span style={{ fontWeight: '400', color: '#475569' }}>{dropoffZip}</span></span>
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div style={{
      padding: '16px 32px',
      borderTop: '1px solid #e2e8f0',
      textAlign: 'center',
    }}>
      <p style={{ margin: '0', fontSize: '12px', color: '#94a3b8' }}>
        Sent via Qalt · Real-time Delivery Quotes · qalt.site
      </p>
    </div>
  </div>
);
