import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/service';
import { contactFormSchema } from '@/lib/validations';
import { resend, EMAIL_TO, EMAIL_FROM } from '@/lib/resend';
import { trackContact } from '@/lib/analytics';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    const { full_name, email, message } = result.data;
    const supabase = createServiceRoleClient();

    // Insert into Leads
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        full_name,
        email,
        message,
        source: 'contact_form',
        status: 'new'
      })
      .select()
      .single();

    if (leadError) throw leadError;

    // Log Activity
    await supabase.from('activities').insert({
      lead_id: lead.id,
      type: 'lead_created',
      metadata: { source: 'contact_form' }
    });

    // Send Internal Notification Email
    try {
      await resend.emails.send({
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: `New Lead: ${full_name}`,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${full_name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <br>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/leads/${lead.id}">View in Dashboard</a>
        `
      });

      // Send Auto-reply to Lead
      await resend.emails.send({
        from: EMAIL_FROM,
        to: email,
        subject: 'We received your message',
        html: `
          <h1>Thanks for contacting us!</h1>
          <p>Hi ${full_name},</p>
          <p>We received your message and will get back to you shortly.</p>
          <br>
          <p>Best,<br>The Team</p>
        `
      });
      
      // Log Email Sent Activity
      await supabase.from('activities').insert({
        lead_id: lead.id,
        type: 'email_sent',
        metadata: { type: 'auto_reply' }
      });

    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails, but log it
    }

    return NextResponse.json({ success: true, lead_id: lead.id });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
