import * as React from 'react';

interface PartnerInquiryEmailProps {
  companyName: string;
  website?: string;
  contactName: string;
  email: string;
  partnershipType: string;
  message: string;
}

export const PartnerInquiryEmail: React.FC<Readonly<PartnerInquiryEmailProps>> = ({
  companyName,
  website,
  contactName,
  email,
  partnershipType,
  message,
}) => (
  <div style={{
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '40px 20px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
  }}>
    <div style={{
      backgroundColor: '#4f515b', // Charcoal
      borderRadius: '24px 24px 0 0',
      padding: '48px 32px',
      textAlign: 'center',
      marginBottom: '32px',
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://qalt.site/images/qalt-logo-main-2026.png"
        alt="Qalt Logo"
        height="44"
        style={{ display: 'block', margin: '0 auto 16px', borderRadius: '8px', padding: '6px 16px', backgroundColor: '#ffffff' }}
      />
      <p style={{ margin: '0', color: '#e9001a', fontSize: '13px', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        Partnership Inquiry
      </p>
    </div>

    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
      <h1 style={{ color: '#1e293b', fontSize: '28px', fontWeight: '900', margin: '0', letterSpacing: '-0.04em' }}>
        New Partner Registry
      </h1>
      <p style={{ color: '#64748b', fontSize: '16px', marginTop: '8px' }}>
        A new business is interested in partnering with Qalt.
      </p>
    </div>

    <div style={{
      backgroundColor: '#f8fafc',
      padding: '32px',
      borderRadius: '24px',
      border: '1px solid #e2e8f0',
      marginBottom: '32px',
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0', width: '140px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Company</span>
            </td>
            <td style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '15px', color: '#1e293b', fontWeight: '600' }}>{companyName}</span>
            </td>
          </tr>
          {website && (
            <tr>
              <td style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Website</span>
              </td>
              <td style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                <a href={website.startsWith('http') ? website : `https://${website}`} style={{ fontSize: '15px', color: '#e9001a', fontWeight: '600', textDecoration: 'none' }}>{website}</a>
              </td>
            </tr>
          )}
          <tr>
            <td style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Contact Name</span>
            </td>
            <td style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '15px', color: '#1e293b', fontWeight: '600' }}>{contactName}</span>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Work Email</span>
            </td>
            <td style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
              <a href={`mailto:${email}`} style={{ fontSize: '15px', color: '#e9001a', fontWeight: '600', textDecoration: 'none' }}>{email}</a>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '10px 0' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Partner Type</span>
            </td>
            <td style={{ padding: '10px 0' }}>
              <span style={{ fontSize: '14px', color: '#4f515b', fontWeight: '700', backgroundColor: '#f1f5f9', padding: '4px 12px', borderRadius: '12px' }}>
                {partnershipType}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
        <p style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
          Partnership Proposition
        </p>
        <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.7', margin: '0', whiteSpace: 'pre-wrap' }}>
          {message}
        </p>
      </div>
    </div>

    <div style={{ textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
      <p style={{ margin: '0', fontSize: '12px', color: '#94a3b8' }}>
        © 2026 Qalt. Partner Ecosystem.
      </p>
    </div>
  </div>
);
