import { Resend } from 'resend';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY env var is not set");
  return new Resend(key);
}

const DEFAULT_FROM = 'Qalt <notifications@qalt.site>';

export const sendEmail = async ({
  to,
  subject,
  react,
  from,
}: {
  to: string | string[];
  subject: string;
  react: React.ReactNode;
  from?: string;
}) => {
  try {
    const resend = getResend();
    const data = await resend.emails.send({
      from: from || DEFAULT_FROM,
      to,
      subject,
      react,
    });
    return { success: true, data };
  } catch (error) {
    const msg = error instanceof Error ? error.message : JSON.stringify(error);
    console.error('[email] FULL ERROR:', msg);
    console.error('[email] Stack:', error instanceof Error ? error.stack : 'no stack');
    return { success: false, error };
  }
};

export function buildFromAddress(opts: {
  customDomain?: string | null;
  fromName?: string | null;
  domainVerified?: boolean | null;
  fallbackName: string;
}): string {
  if (opts.customDomain && opts.domainVerified) {
    const name = (opts.fromName || opts.fallbackName).replace(/[<>]/g, '').trim();
    return `${name} <noreply@${opts.customDomain}>`;
  }
  return DEFAULT_FROM;
}
