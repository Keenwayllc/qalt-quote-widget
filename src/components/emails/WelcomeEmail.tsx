import * as React from 'react';

interface WelcomeEmailProps {
  companyName: string;
}

export const WelcomeEmail: React.FC<Readonly<WelcomeEmailProps>> = ({
  companyName,
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
      marginBottom: '32px'
    }}>
      <img 
        src="https://qalt.site/images/faceqaltwh.png" 
        alt="Qalt Logo" 
        height="60" 
        style={{ display: 'block', margin: '0 auto 16px' }} 
      />
      <p style={{ margin: '0', color: '#93c5fd', fontSize: '13px', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        Your rates. Embedded. Anywhere.
      </p>
    </div>
    
    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
      <h1 style={{ color: '#1e293b', fontSize: '32px', fontWeight: '900', margin: '0', letterSpacing: '-0.04em' }}>
        Welcome to Qalt!
      </h1>
    </div>
    
    <div style={{ 
      backgroundColor: '#f8fafc', 
      padding: '32px', 
      borderRadius: '24px', 
      border: '1px solid #e2e8f0',
      marginBottom: '32px'
    }}>
      <p style={{ fontSize: '18px', color: '#334155', marginTop: '0', lineHeight: '1.6' }}>
        Hi <strong>{companyName}</strong>,
      </p>
      <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.6' }}>
        We&apos;re thrilled to have you on board! Qalt is designed to help your delivery business grow by providing instant, accurate quotes to your customers.
      </p>
      
      <div style={{ marginTop: '32px', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
          Next Steps
        </h2>
        <ul style={{ padding: '0', margin: '0', listStyle: 'none' }}>
          {[
            { tag: '1', text: 'Customize your widget appearance' },
            { tag: '2', text: 'Set your pricing per mile' },
            { tag: '3', text: 'Embed the widget on your website' }
          ].map((item) => (
            <li key={item.tag} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                borderRadius: '50%',
                fontSize: '12px',
                fontWeight: 'bold',
                marginRight: '12px'
              }}>{item.tag}</span>
              <span style={{ fontSize: '15px', color: '#334155', fontWeight: '500' }}>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <a href="https://qalt.site/dashboard" style={{
          display: 'inline-block',
          backgroundColor: '#1E40AF',
          color: '#ffffff',
          padding: '16px 32px',
          borderRadius: '16px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '16px',
          boxShadow: '0 10px 15px -3px rgba(30, 64, 175, 0.2)'
        }}>
          Go to Dashboard
        </a>
      </div>
    </div>
    
    <div style={{ textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
      <p style={{ margin: '0', fontSize: '14px', color: '#64748b' }}>
        Need help? Just reply to this email.
      </p>
      <p style={{ marginTop: '8px', fontSize: '12px', color: '#94a3b8' }}>
        © 2026 Qalt. Built for the modern delivery business.
      </p>
    </div>
  </div>
);
