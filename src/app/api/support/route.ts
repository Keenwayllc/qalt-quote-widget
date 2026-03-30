import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { SupportContactEmail } from '@/components/emails/SupportContactEmail';
import * as React from 'react';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const result = await sendEmail({
      to: 'support@qalt.site',
      subject: `[Support] ${subject}`,
      react: React.createElement(SupportContactEmail, { name, email, subject, message }),
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Support form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
