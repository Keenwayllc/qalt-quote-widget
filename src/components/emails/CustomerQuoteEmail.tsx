import * as React from 'react';

interface CustomerQuoteEmailProps {
  customerName: string;
  pickupZip: string;
  dropoffZip: string;
  distanceMiles: number;
  estimatedPrice: number;
  serviceType: string;
  companyName: string;
}

export const CustomerQuoteEmail: React.FC<Readonly<CustomerQuoteEmailProps>> = ({
  customerName,
  pickupZip,
  dropoffZip,
  distanceMiles,
  estimatedPrice,
  serviceType,
  companyName,
}) => (
  <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f8fafc' }}>

    {/* Header */}
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
        Your Quote is Ready, {customerName}!
      </h1>
      <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 24px' }}>
        Thanks for reaching out to <strong>{companyName}</strong>. Here&apos;s a summary of your quote. Someone will be in touch with you shortly.
      </p>

      {/* Price */}
      <div style={{ backgroundColor: '#1e3a5f', borderRadius: '10px', padding: '20px 24px', marginBottom: '20px', textAlign: 'center' }}>
        <p style={{ margin: '0 0 2px', fontSize: '11px', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '700' }}>
          Your Estimate
        </p>
        <p style={{ margin: '0', fontSize: '42px', fontWeight: '800', color: '#ffffff', lineHeight: '1.1' }}>
          ${estimatedPrice.toFixed(2)}
        </p>
        <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#93c5fd' }}>
          {serviceType} &nbsp;·&nbsp; {distanceMiles.toFixed(1)} miles
        </p>
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
                  <strong>Pickup:</strong> <span style={{ color: '#475569' }}>{pickupZip}</span>
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
                  <strong>Dropoff:</strong> <span style={{ color: '#475569' }}>{dropoffZip}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p style={{ color: '#64748b', fontSize: '13px', margin: '20px 0 0', textAlign: 'center' }}>
        This is an estimate only. Final pricing may vary based on job requirements.
      </p>

      {/* Not Spam tip */}
      <div style={{ marginTop: '20px', backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '14px 18px' }}>
        <p style={{ margin: '0 0 4px', fontSize: '13px', fontWeight: '700', color: '#92400e' }}>
          📬 Did this land in your spam folder?
        </p>
        <p style={{ margin: '0', fontSize: '13px', color: '#78350f', lineHeight: '1.5' }}>
          If so, please mark it as <strong>&quot;Not Spam&quot;</strong> or move it to your inbox. This ensures you receive your quote details and any follow-up messages from {companyName} without issue.
        </p>
      </div>
    </div>

    {/* Footer */}
    <div style={{ padding: '16px 32px', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
      <p style={{ margin: '0', fontSize: '12px', color: '#94a3b8' }}>
        Powered by Qalt &nbsp;·&nbsp; qalt.site
      </p>
    </div>
  </div>
);
