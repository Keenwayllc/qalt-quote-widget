import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import { PartnerInquiryEmail } from '@/components/emails/PartnerInquiryEmail';
import * as React from 'react';

export async function POST(req: NextRequest) {
  try {
    const { companyName, website, contactName, email, partnershipType, message } = await req.json();

    // Basic validation
    if (!companyName || !contactName || !email || !partnershipType || !message) {
      return NextResponse.json(
        { error: 'Required fields are missing.' },
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

    // 1. Save to database
    await prisma.partnerInquiry.create({
      data: {
        companyName,
        website,
        contactName,
        email,
        partnershipType,
        message,
      },
    });

    // 2. Send email notification
    const emailResult = await sendEmail({
      to: 'business@qalt.site',
      subject: `New Partner Inquiry: ${companyName}`,
      react: React.createElement(PartnerInquiryEmail, {
        companyName,
        website,
        contactName,
        email,
        partnershipType,
        message,
      }),
    });

    if (!emailResult.success) {
      console.warn('Database record created but email failed to send:', emailResult.error);
      // We still return success: true because the DB record exists and can be handled manually
      return NextResponse.json({ 
        success: true, 
        message: 'Inquiry saved, but notification email failed to send.' 
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Partner inquiry error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
