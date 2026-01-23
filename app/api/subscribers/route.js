import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/service';
import { subscriberSchema } from '@/lib/validations';
import { resend, EMAIL_TO, EMAIL_FROM } from '@/lib/resend';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = subscriberSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    const { email, consent } = result.data;
    const supabase = createServiceRoleClient();

    // Check if exists
    const { data: existing } = await supabase
      .from('subscribers')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json({ message: 'Already subscribed' }, { status: 200 });
    }

    // Insert Subscriber
    const { data: subscriber, error } = await supabase
      .from('subscribers')
      .insert({
        email,
        consent,
        consent_at: new Date().toISOString(),
        source: 'newsletter'
      })
      .select()
      .single();

    if (error) throw error;

    // Send Welcome Email
    try {
      await resend.emails.send({
        from: EMAIL_FROM,
        to: email,
        subject: 'Welcome to our newsletter',
        html: `
          <h1>Welcome!</h1>
          <p>Thanks for subscribing to our newsletter. We'll keep you updated with the latest news.</p>
          <br>
          <p>Best,<br>The Team</p>
        `
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    return NextResponse.json({ success: true, subscriber_id: subscriber.id });
  } catch (error) {
    console.error('Subscriber API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
