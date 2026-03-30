import * as React from 'react';

interface SupportContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const SupportContactEmail: React.FC<Readonly<SupportContactEmailProps>> = ({
  name,
  email,
  subject,
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
      backgroundColor: '#1E40AF',
      borderRadius: '24px 24px 0 0',
      padding: '48px 32px',
      textAlign: 'center',
      marginBottom: '32px',
    }}>
      <img
        src="https://qalt.site/images/faceqaltwh.png"
        alt="Qalt Logo"
        height="60"
        style={{ display: 'block', margin: '0 auto 16px' }}
      />
      <p style={{ margin: '0', color: '#93c5fd', fontSize: '13px', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        Tech Support Request
      </p>
    </div>

    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
      <h1 style={{ color: '#1e293b', fontSize: '28px', fontWeight: '900', margin: '0', letterSpacing: '-0.04em' }}>
        New Support Message
      </h1>
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
            <td style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0', width: '120px' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>From</span>
            </td>
            <td style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '15px', color: '#1e293b', fontWeight: '600' }}>{name}</span>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Reply-To</span>
            </td>
            <td style={{ padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
              <a href={`mailto:${email}`} style={{ fontSize: '15px', color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>{email}</a>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '10px 0' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Subject</span>
            </td>
            <td style={{ padding: '10px 0' }}>
              <span style={{ fontSize: '15px', color: '#1e293b', fontWeight: '600' }}>{subject}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
        <p style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
          Message
        </p>
        <p style={{ fontSize: '15px', color: '#334155', lineHeight: '1.7', margin: '0', whiteSpace: 'pre-wrap' }}>
          {message}
        </p>
      </div>
    </div>

    <div style={{ textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
      <p style={{ margin: '0', fontSize: '12px', color: '#94a3b8' }}>
        © 2026 Qalt. Built for the modern delivery business.
      </p>
    </div>
  </div>
);
