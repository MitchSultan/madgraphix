// // app/api/team/invite/route.ts
// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';
// import { sendInvitationEmail } from '@/lib/email'; // your email service

// export async function POST(req) {
//   const supabase = createRouteHandlerClient({ cookies });
//   const { data: { session } } = await supabase.auth.getSession();
//   if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

//   // Check if user is admin (from profiles)
//   const { data: profile } = await supabase
//     .from('profiles')
//     .select('role')
//     .eq('id', session.user.id)
//     .single();
//   if (profile?.role !== 'admin') {
//     return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
//   }

//   const { email, role } = await req.json();
//   if (!email || !role) {
//     return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
//   }

//   // Generate token
//   const token = crypto.randomBytes(32).toString('hex');
//   const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

//   // Insert invitation
//   const { data: invite, error: insertError } = await supabase
//     .from('invitations')
//     .insert({ email, role, token, expires_at: expiresAt })
//     .select()
//     .single();

//   if (insertError) {
//     return NextResponse.json({ error: 'Failed to create invitation' }, { status: 500 });
//   }

//   // Send email
//   try {
//     await sendInvitationEmail(email, token);
//     // Optionally update invitation status to 'sent' or leave as 'pending'
//     return NextResponse.json({ success: true, message: 'Invitation sent successfully' });
//   } catch (emailError) {
//     // Log error, update invitation status to 'failed'
//     await supabase
//       .from('invitations')
//       .update({ status: 'failed', updated_at: new Date() })
//       .eq('id', invite.id);
//     return NextResponse.json(
//       { success: false, error: 'Failed to send email. Please try again.' },
//       { status: 500 }
//     );
//   }
// }