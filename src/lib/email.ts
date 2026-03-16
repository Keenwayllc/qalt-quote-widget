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
      from: 'Qalt <notifications@gokeenway.com>',
      to,
      subject,
      react,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};
