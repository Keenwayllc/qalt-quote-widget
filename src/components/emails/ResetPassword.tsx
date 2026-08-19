import * as React from "react";

interface ResetPasswordProps {
  companyName: string;
  resetUrl: string;
}

export const ResetPassword: React.FC<Readonly<ResetPasswordProps>> = ({
  companyName,
  resetUrl,
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
        Reset your password
      </p>
    </div>

    <div style={{ backgroundColor: "#f8fafc", padding: "40px 32px", borderRadius: "0 0 24px 24px", border: "1px solid #e2e8f0" }}>
      <h1 style={{ color: "#1e293b", fontSize: "28px", fontWeight: "900", margin: "0 0 16px", letterSpacing: "-0.03em" }}>
        Reset your password
      </h1>
      <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.7", margin: "0 0 32px" }}>
        Hi {companyName}, we received a request to reset your Qalt password. Click the button below to choose a new one.
      </p>

      <div style={{ textAlign: "center", margin: "0 0 40px" }}>
        <a href={resetUrl} style={{
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
          Reset Password
        </a>
      </div>

      <p style={{ fontSize: "13px", color: "#94a3b8", textAlign: "center", margin: "0 0 8px" }}>
        This link expires in 1 hour. If you didn&apos;t request a reset, you can safely ignore this email.
      </p>

      <div style={{ borderTop: "1px solid #e2e8f0", marginTop: "32px", paddingTop: "24px", textAlign: "center" }}>
        <p style={{ margin: "0", fontSize: "12px", color: "#94a3b8" }}>
          © 2026 Qalt. Built for the modern delivery business.
        </p>
      </div>
    </div>
  </div>
);
