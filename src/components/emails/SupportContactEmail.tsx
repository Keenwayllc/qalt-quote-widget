import * as React from "react";

interface SupportContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  platform?: string;
  exactError?: string;
  screenshotName?: string;
}

const labelStyle: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: "800",
  color: "#94a3b8",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

export const SupportContactEmail: React.FC<Readonly<SupportContactEmailProps>> = ({
  name,
  email,
  subject,
  message,
  platform = "General Qalt issue",
  exactError,
  screenshotName,
}) => (
  <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", padding: "40px 20px", maxWidth: "640px", margin: "0 auto", backgroundColor: "#ffffff" }}>
    <div style={{ backgroundColor: "#17191e", borderRadius: "24px 24px 0 0", padding: "40px 32px", textAlign: "center", marginBottom: "28px" }}>
      <img src="https://qalt.site/images/qalt-logo-main-2026.png" alt="Qalt Logo" height="44" style={{ display: "block", margin: "0 auto 16px", borderRadius: "8px", padding: "6px 16px", backgroundColor: "#ffffff" }} />
      <p style={{ margin: 0, color: "#fda4af", fontSize: "13px", fontWeight: "800", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        Customer Support Request
      </p>
    </div>

    <h1 style={{ color: "#111827", fontSize: "26px", fontWeight: "900", margin: "0 0 24px", letterSpacing: "-0.04em" }}>
      {subject}
    </h1>

    <div style={{ backgroundColor: "#f8fafc", padding: "28px", borderRadius: "20px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr><td style={{ padding: "9px 0", width: "130px", borderBottom: "1px solid #e2e8f0" }}><span style={labelStyle}>Customer</span></td><td style={{ padding: "9px 0", borderBottom: "1px solid #e2e8f0", fontWeight: 700, color: "#1e293b" }}>{name}</td></tr>
          <tr><td style={{ padding: "9px 0", borderBottom: "1px solid #e2e8f0" }}><span style={labelStyle}>Reply to</span></td><td style={{ padding: "9px 0", borderBottom: "1px solid #e2e8f0" }}><a href={`mailto:${email}`} style={{ color: "#df1731", fontWeight: 700, textDecoration: "none" }}>{email}</a></td></tr>
          <tr><td style={{ padding: "9px 0", borderBottom: "1px solid #e2e8f0" }}><span style={labelStyle}>Platform</span></td><td style={{ padding: "9px 0", borderBottom: "1px solid #e2e8f0", fontWeight: 700, color: "#1e293b" }}>{platform}</td></tr>
          <tr><td style={{ padding: "9px 0" }}><span style={labelStyle}>Screenshot</span></td><td style={{ padding: "9px 0", fontWeight: 700, color: "#1e293b" }}>{screenshotName ? `Attached: ${screenshotName}` : "Not provided"}</td></tr>
        </tbody>
      </table>
    </div>

    <div style={{ marginBottom: "22px" }}>
      <p style={{ ...labelStyle, margin: "0 0 8px" }}>What happened</p>
      <div style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "18px", color: "#334155", fontSize: "15px", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{message}</div>
    </div>

    {exactError ? (
      <div style={{ marginBottom: "22px" }}>
        <p style={{ ...labelStyle, margin: "0 0 8px" }}>Exact error message</p>
        <div style={{ backgroundColor: "#fff1f2", border: "1px solid #fecdd3", borderRadius: "16px", padding: "18px", color: "#9f1239", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "13px", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{exactError}</div>
      </div>
    ) : null}

    <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "22px", textAlign: "center" }}>
      <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>© 2026 Qalt. Customer support diagnostic request.</p>
    </div>
  </div>
);
