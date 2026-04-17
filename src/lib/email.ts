import { Resend } from 'resend';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY env var is not set");
  return new Resend(key);
}

export const sendEmail = async ({
  to,
  subject,
  react,
}: {
  to: string | string[];
  subject: string;
  react: React.ReactNode;
}) => {
  try {
    const resend = getResend();
    const data = await resend.emails.send({
      from: 'Qalt <notifications@qalt.site>',
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
