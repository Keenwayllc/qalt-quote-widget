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
  <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', maxWidth: '640px', margin: '0 auto', backgroundColor: '#f7f7f5', padding: '24px 12px' }}>
    <div style={{ backgroundColor: '#ffffff', border: '1px solid #e7e7e4', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(20,20,20,0.04)' }}>
      {/* Header */}
      <div style={{ padding: '32px 32px 24px', textAlign: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #eeeeeb' }}>
        <img
          src="https://qalt.site/images/qalt-logo-main-2026.png"
          alt="Qalt"
          height="64"
          style={{ display: 'block', margin: '0 auto 16px', width: 'auto', maxWidth: '240px', objectFit: 'contain' }}
        />
        <p style={{ margin: '0', color: '#8b8f97', fontSize: '11px', fontWeight: '700', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          New quote notification
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: '30px 32px 24px', backgroundColor: '#fcfcfb' }}>
        <h1 style={{ color: '#171717', fontSize: '24px', fontWeight: '700', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
          New Quote Request
        </h1>
        <p style={{ color: '#6f737b', fontSize: '14px', lineHeight: '1.6', margin: '0 0 24px' }}>
          A customer submitted a new delivery quote through your Qalt form.
        </p>

        {/* Price */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e6e6e2', borderRadius: '14px', padding: '24px', marginBottom: '16px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 8px', fontSize: '10px', color: '#9a9da3', textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: '700' }}>
            Estimated Price
          </p>
          <p style={{ margin: '0', fontSize: '40px', fontWeight: '800', color: '#171717', lineHeight: '1.05', letterSpacing: '-0.03em' }}>
            ${estimatedPrice.toFixed(2)}
          </p>
          <p style={{ margin: '10px 0 0', fontSize: '13px', color: '#73777f' }}>
            {serviceType} &nbsp;·&nbsp; {distanceMiles.toFixed(1)} miles
          </p>
          <div style={{ width: '36px', height: '3px', borderRadius: '999px', backgroundColor: '#df1731', margin: '18px auto 0' }} />
        </div>

        {/* Customer */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e6e6e2', borderRadius: '14px', marginBottom: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '12px 20px', backgroundColor: '#fafaf8', borderBottom: '1px solid #ecece8' }}>
            <p style={{ margin: '0', fontSize: '10px', fontWeight: '700', color: '#9a9da3', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Customer</p>
          </div>
          <div style={{ padding: '18px 20px' }}>
            <p style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: '700', color: '#1f1f1f' }}>{customerName}</p>
            <p style={{ margin: '0 0 3px', fontSize: '14px', color: '#5f636b' }}>{customerEmail}</p>
            {customerPhone && <p style={{ margin: '0', fontSize: '14px', color: '#5f636b' }}>{customerPhone}</p>}
          </div>
        </div>

        {/* Route */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e6e6e2', borderRadius: '14px', overflow: 'hidden' }}>
          <div style={{ padding: '12px 20px', backgroundColor: '#fafaf8', borderBottom: '1px solid #ecece8' }}>
            <p style={{ margin: '0', fontSize: '10px', fontWeight: '700', color: '#9a9da3', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Route</p>
          </div>
          <div style={{ padding: '18px 20px' }}>
            <table cellPadding="0" cellSpacing="0" border={0}>
              <tbody>
                <tr>
                  <td style={{ paddingRight: '10px', verticalAlign: 'middle' }}>
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#b9bdc4' }} />
                  </td>
                  <td style={{ fontSize: '14px', color: '#1f1f1f', paddingBottom: '7px' }}>
                    <strong>From:</strong> <span style={{ color: '#5f636b' }}>{pickupZip}</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingRight: '10px' }}>
                    <div style={{ width: '1px', height: '14px', backgroundColor: '#e0e1e3', margin: '0 auto' }} />
                  </td>
                  <td />
                </tr>
                <tr>
                  <td style={{ paddingRight: '10px', verticalAlign: 'middle' }}>
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#df1731' }} />
                  </td>
                  <td style={{ fontSize: '14px', color: '#1f1f1f', paddingTop: '7px' }}>
                    <strong>To:</strong> <span style={{ color: '#5f636b' }}>{dropoffZip}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '18px 32px', borderTop: '1px solid #eeeeeb', textAlign: 'center', backgroundColor: '#ffffff' }}>
        <p style={{ margin: '0', fontSize: '11px', color: '#a0a3a9' }}>
          Sent via Qalt &nbsp;·&nbsp; Real-time Delivery Quotes &nbsp;·&nbsp; qalt.site
        </p>
      </div>
    </div>
  </div>
);
