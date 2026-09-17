import * as React from 'react';

interface CustomerQuoteEmailProps {
  customerName: string;
  pickupZip: string;
  dropoffZip: string;
  distanceMiles: number;
  estimatedPrice: number;
  serviceType: string;
  companyName: string;
  logoUrl?: string;
  primaryColor?: string;
}

export const CustomerQuoteEmail: React.FC<Readonly<CustomerQuoteEmailProps>> = ({
  customerName,
  pickupZip,
  dropoffZip,
  distanceMiles,
  estimatedPrice,
  serviceType,
  companyName,
  logoUrl,
  primaryColor = '#d71920',
}) => (
  <div style={{ margin: '0', padding: '32px 12px', backgroundColor: '#f4f4f5', fontFamily: 'Arial, Helvetica, sans-serif', color: '#18181b' }}>
    <div style={{ maxWidth: '620px', margin: '0 auto', backgroundColor: '#ffffff', border: '1px solid #e4e4e7', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 16px 40px rgba(24,24,27,0.08)' }}>
      <div style={{ backgroundColor: '#171717', padding: '32px 32px 28px', textAlign: 'center', borderTop: `4px solid ${primaryColor}` }}>
        {logoUrl ? (
          <div
            style={{
              display: 'inline-block',
              backgroundColor: '#737373',
              border: '1px solid rgba(255,255,255,0.22)',
              borderRadius: '14px',
              padding: '12px 22px',
              marginBottom: '16px',
            }}
          >
            <img
              src={logoUrl}
              alt={companyName}
              height="64"
              style={{ display: 'block', width: 'auto', maxWidth: '240px', objectFit: 'contain' }}
            />
          </div>
        ) : (
          <p style={{ margin: '0 0 10px', fontSize: '24px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.02em' }}>
            {companyName}
          </p>
        )}
        <p style={{ margin: '0', color: '#a1a1aa', fontSize: '11px', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          Delivery Quote
        </p>
      </div>

      <div style={{ padding: '34px 32px 26px' }}>
        <h1 style={{ color: '#18181b', fontSize: '26px', lineHeight: '1.25', fontWeight: '800', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
          Your quote is ready{customerName ? `, ${customerName}` : ''}.
        </h1>
        <p style={{ color: '#71717a', fontSize: '15px', lineHeight: '1.65', margin: '0 0 26px' }}>
          Thanks for reaching out to <strong style={{ color: '#27272a' }}>{companyName}</strong>. Here is a clear summary of your delivery estimate. We will follow up if anything else is needed.
        </p>

        <div style={{ backgroundColor: '#fafafa', border: '1px solid #e4e4e7', borderRadius: '14px', padding: '24px 24px 22px', marginBottom: '20px', textAlign: 'center', boxShadow: 'inset 0 3px 0 0 ' + primaryColor }}>
          <p style={{ margin: '0 0 8px', fontSize: '10px', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: '800' }}>
            Estimated Total
          </p>
          <p style={{ margin: '0', fontSize: '44px', fontWeight: '800', color: '#18181b', lineHeight: '1.05', letterSpacing: '-0.03em' }}>
            ${estimatedPrice.toFixed(2)}
          </p>
          <p style={{ margin: '10px 0 0', fontSize: '13px', color: '#71717a' }}>
            {serviceType} &nbsp;·&nbsp; {distanceMiles.toFixed(1)} miles
          </p>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e4e4e7', borderRadius: '14px', overflow: 'hidden', marginBottom: '18px' }}>
          <div style={{ padding: '11px 20px', backgroundColor: '#fafafa', borderBottom: '1px solid #e4e4e7' }}>
            <p style={{ margin: '0', fontSize: '10px', fontWeight: '800', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
              Route Summary
            </p>
          </div>
          <div style={{ padding: '18px 20px' }}>
            <table cellPadding="0" cellSpacing="0" border={0} style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ width: '22px', paddingRight: '10px', verticalAlign: 'middle' }}>
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
                  </td>
                  <td style={{ fontSize: '14px', color: '#27272a', paddingBottom: '7px' }}>
                    <strong>Pickup</strong>
                    <span style={{ color: '#71717a' }}> &nbsp;{pickupZip}</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '22px', paddingRight: '10px' }}>
                    <div style={{ width: '2px', height: '15px', backgroundColor: '#e4e4e7', margin: '0 auto' }} />
                  </td>
                  <td />
                </tr>
                <tr>
                  <td style={{ width: '22px', paddingRight: '10px', verticalAlign: 'middle' }}>
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: primaryColor }} />
                  </td>
                  <td style={{ fontSize: '14px', color: '#27272a', paddingTop: '7px' }}>
                    <strong>Dropoff</strong>
                    <span style={{ color: '#71717a' }}> &nbsp;{dropoffZip}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ backgroundColor: '#fafafa', border: '1px solid #e4e4e7', borderRadius: '12px', padding: '14px 16px', marginTop: '18px' }}>
          <p style={{ margin: '0', color: '#71717a', fontSize: '12px', lineHeight: '1.6', textAlign: 'center' }}>
            This estimate is based on the information provided. Final pricing may change only if the job details or service requirements change.
          </p>
        </div>

        <div style={{ marginTop: '18px', padding: '0 4px' }}>
          <p style={{ margin: '0', fontSize: '12px', color: '#a1a1aa', lineHeight: '1.6', textAlign: 'center' }}>
            To make sure future updates arrive normally, add this sender to your contacts or mark this message as not spam if needed.
          </p>
        </div>
      </div>

      <div style={{ padding: '18px 32px 20px', borderTop: '1px solid #e4e4e7', backgroundColor: '#fafafa', textAlign: 'center' }}>
        <p style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: '700', color: '#52525b' }}>
          {companyName}
        </p>
        <p style={{ margin: '0', fontSize: '11px', color: '#a1a1aa' }}>
          Quote delivery powered by Qalt
        </p>
      </div>
    </div>
  </div>
);
