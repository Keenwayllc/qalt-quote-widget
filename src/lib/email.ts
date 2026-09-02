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
    const { data, error } = await resend.emails.send({
      from: from || DEFAULT_FROM,
      to,
      subject,
      react,
    });
    // Resend v6 resolves with an { error } object on API rejections instead of
    // throwing — must inspect it or failures get silently reported as success.
    if (error) {
      console.error('[email] Resend rejected send | from:', from || DEFAULT_FROM, '| to:', to, '| error:', JSON.stringify(error));
      return { success: false, error };
    }
    return { success: true, data };
  } catch (error) {
    const msg = error instanceof Error ? error.message : JSON.stringify(error);
    console.error('[email] FULL ERROR (threw):', msg);
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
