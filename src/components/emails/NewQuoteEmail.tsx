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
  <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f8fafc' }}>

    {/* Header — table layout for email client compatibility */}
    <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px 12px 0 0', padding: '22px 32px' }}>
      <img
        src="https://qalt.site/images/faceqaltwh.png"
        alt="Qalt"
        height="32"
        style={{ display: 'block' }}
      />
    </div>

    {/* Body */}
    <div style={{ padding: '28px 32px 20px' }}>
      <h1 style={{ color: '#0f172a', fontSize: '22px', fontWeight: '700', margin: '0 0 6px' }}>
        New Quote Request
      </h1>
      <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 24px' }}>
        A customer submitted a quote through your widget.
      </p>

      {/* Price */}
      <div style={{ backgroundColor: '#1e3a5f', borderRadius: '10px', padding: '20px 24px', marginBottom: '20px', textAlign: 'center' }}>
        <p style={{ margin: '0 0 2px', fontSize: '11px', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '700' }}>
          Estimated Price
        </p>
        <p style={{ margin: '0', fontSize: '42px', fontWeight: '800', color: '#ffffff', lineHeight: '1.1' }}>
          ${estimatedPrice.toFixed(2)}
        </p>
        <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#93c5fd' }}>
          {serviceType} &nbsp;·&nbsp; {distanceMiles.toFixed(1)} miles
        </p>
      </div>

      {/* Customer */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', marginBottom: '12px', overflow: 'hidden' }}>
        <div style={{ padding: '10px 20px', backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
          <p style={{ margin: '0', fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Customer</p>
        </div>
        <div style={{ padding: '16px 20px' }}>
          <p style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>{customerName}</p>
          <p style={{ margin: '0 0 2px', fontSize: '14px', color: '#475569' }}>{customerEmail}</p>
          {customerPhone && <p style={{ margin: '0', fontSize: '14px', color: '#475569' }}>{customerPhone}</p>}
        </div>
      </div>

      {/* Route */}
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ padding: '10px 20px', backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
          <p style={{ margin: '0', fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Route</p>
        </div>
        <div style={{ padding: '16px 20px' }}>
          <table cellPadding="0" cellSpacing="0" border={0}>
            <tbody>
              <tr>
                <td style={{ paddingRight: '10px', verticalAlign: 'middle' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
                </td>
                <td style={{ fontSize: '14px', color: '#0f172a', paddingBottom: '6px' }}>
                  <strong>From:</strong> <span style={{ color: '#475569' }}>{pickupZip}</span>
                </td>
              </tr>
              <tr>
                <td style={{ paddingRight: '10px' }}>
                  <div style={{ width: '2px', height: '14px', backgroundColor: '#e2e8f0', margin: '0 auto' }} />
                </td>
                <td />
              </tr>
              <tr>
                <td style={{ paddingRight: '10px', verticalAlign: 'middle' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                </td>
                <td style={{ fontSize: '14px', color: '#0f172a', paddingTop: '6px' }}>
                  <strong>To:</strong> <span style={{ color: '#475569' }}>{dropoffZip}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div style={{ padding: '16px 32px', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
      <p style={{ margin: '0', fontSize: '12px', color: '#94a3b8' }}>
        Sent via Qalt &nbsp;·&nbsp; Real-time Delivery Quotes &nbsp;·&nbsp; qalt.site
      </p>
    </div>
  </div>
);
