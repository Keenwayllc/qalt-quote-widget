import * as React from "react";

interface VerifyEmailProps {
  companyName: string;
  verifyUrl: string;
}

export const VerifyEmail: React.FC<Readonly<VerifyEmailProps>> = ({
  companyName,
  verifyUrl,
}) => (
  <div style={{
    fontFamily: "system-ui, -apple-system, sans-serif",
    padding: "40px 20px",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
  }}>
    <div style={{
      backgroundColor: "#dc2626",
      borderRadius: "24px 24px 0 0",
      padding: "48px 32px",
      textAlign: "center",
    }}>
      <img
        src="https://qalt.site/images/qalt-logo-main-2026.png"
        alt="Qalt Logo"
        height="44"
        style={{ display: "block", margin: "0 auto 16px", borderRadius: "8px", padding: "6px 16px", backgroundColor: "#ffffff" }}
      />
      <p style={{ margin: "0", color: "#fca5a5", fontSize: "13px", fontWeight: "800", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        Confirm your email
      </p>
    </div>

    <div style={{ backgroundColor: "#f8fafc", padding: "40px 32px", borderRadius: "0 0 24px 24px", border: "1px solid #e2e8f0" }}>
      <h1 style={{ color: "#1e293b", fontSize: "28px", fontWeight: "900", margin: "0 0 16px", letterSpacing: "-0.03em" }}>
        Welcome to Qalt, {companyName}!
      </h1>
      <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.7", margin: "0 0 32px" }}>
        You&apos;re almost there. Click the button below to confirm your email and activate your account. Your delivery quote widget will be ready to go right after.
      </p>

      <div style={{ textAlign: "center", margin: "0 0 40px" }}>
        <a href={verifyUrl} style={{
          display: "inline-block",
          backgroundColor: "#dc2626",
          color: "#ffffff",
          padding: "18px 40px",
          borderRadius: "16px",
          textDecoration: "none",
          fontWeight: "900",
          fontSize: "16px",
          letterSpacing: "-0.01em",
          boxShadow: "0 10px 20px rgba(220,38,38,0.25)",
        }}>
          Confirm Email & Go to Dashboard
        </a>
      </div>

      <p style={{ fontSize: "13px", color: "#94a3b8", textAlign: "center", margin: "0 0 8px" }}>
        This link expires in 24 hours. If you didn&apos;t create a Qalt account, ignore this email.
      </p>

      <div style={{ borderTop: "1px solid #e2e8f0", marginTop: "32px", paddingTop: "24px", textAlign: "center" }}>
        <p style={{ margin: "0", fontSize: "12px", color: "#94a3b8" }}>
          © 2026 Qalt. Built for the modern delivery business.
        </p>
      </div>
    </div>
  </div>
);
