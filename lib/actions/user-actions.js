'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export async function inviteUser(formData) {
  const email = formData.get('email') ;
  const firstName = formData.get('firstName') ;
  const lastName = formData.get('lastName') ;
  const role = formData.get('role') ;
  const phone = formData.get('phone') || '';

  // Generate a random temporary password (16 characters)
  const tempPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

  // 1. Create the user in Auth
  const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true, // user can log in immediately with temp password
    user_metadata: { first_name: firstName, last_name: lastName },
  });

  if (authError) throw new Error(authError.message);

  // 2. Insert profile
  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .insert({
      id: authUser.user.id,
      email,
      first_name: firstName,
      last_name: lastName,
      role,
      phone,
    });

  if (profileError) throw new Error(profileError.message);

  // 3. Send password reset email so user can set their own password
  const { error: resetError } = await supabaseAdmin.auth.admin.generateLink({
    type: 'recovery',
    email,
    options: { redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/update-password` },
  });

  if (resetError) throw new Error(resetError.message);

  revalidatePath('/settings/team');
  return { success: true };
}

// Update user profile (for admin editing)
export async function updateUserProfile(userId, data) {
  // similar logic with supabaseAdmin
}