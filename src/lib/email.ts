import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const data = await resend.emails.send({
      from: 'Qalt <notifications@qalt.site>',
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
