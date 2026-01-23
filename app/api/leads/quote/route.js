import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/service';
import { quoteFormSchema } from '@/lib/validations';
import { resend, EMAIL_TO, EMAIL_FROM } from '@/lib/resend';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate input
    const result = quoteFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    const { full_name, email, company, phone, service_interest, budget_range, message } = result.data;
    const supabase = createServiceRoleClient();

    // Insert into Leads
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        full_name,
        email,
        company,
        phone,
        service_interest,
        budget_range,
        message,
        source: 'quote_form',
        status: 'new'
      })
      .select()
      .single();

    if (leadError) throw leadError;

    // Log Activity
    await supabase.from('activities').insert({
      lead_id: lead.id,
      type: 'lead_created',
      metadata: { source: 'quote_form', service: service_interest }
    });

    // Send Internal Notification Email
    try {
      await resend.emails.send({
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: `New Quote Request: ${full_name} - ${service_interest}`,
        html: `
          <h1>New Quote Request</h1>
          <p><strong>Name:</strong> ${full_name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service:</strong> ${service_interest}</p>
          <p><strong>Budget:</strong> ${budget_range}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Details:</strong></p>
          <p>${message || 'No details provided'}</p>
          <br>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/leads/${lead.id}">View in Dashboard</a>
        `
      });

      // Send Auto-reply to Lead
      await resend.emails.send({
        from: EMAIL_FROM,
        to: email,
        subject: 'We received your quote request',
        html: `
          <h1>Thanks for your interest!</h1>
          <p>Hi ${full_name},</p>
          <p>We received your request for a quote regarding <strong>${service_interest}</strong>. We will review your details and send you a proposal soon.</p>
          <br>
          <p>Best,<br>The Team</p>
        `
      });
      
      // Log Email Sent Activity
      await supabase.from('activities').insert({
        lead_id: lead.id,
        type: 'email_sent',
        metadata: { type: 'quote_auto_reply' }
      });

    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    return NextResponse.json({ success: true, lead_id: lead.id });
  } catch (error) {
    console.error('Quote API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
