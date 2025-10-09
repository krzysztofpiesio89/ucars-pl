import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import ContactEmail from '@/components/emails/ContactEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'uCars <onboarding@resend.dev>', // IMPORTANT: This must be a verified domain in Resend.
      to: ['ucarspl@gmail.com'], // TODO: Replace with your actual email address.
      subject: `Wiadomość od ${name} - uCars.pl`,
      react: ContactEmail({ name, email, message }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
