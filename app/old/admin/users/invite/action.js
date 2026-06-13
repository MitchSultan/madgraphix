'use server'

import { requireRole } from '@/lib/auth/requireRole'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function inviteUser(formData) {
  // LAYER 3: Re-verify admin role in the action itself
  const { profile: adminProfile } = await requireRole('admin')

  const email = formData.get('email')?.trim().toLowerCase()
  const full_name = formData.get('full_name')?.trim()
  const role = formData.get('role')       // 'staff' | 'client'
  const phone = formData.get('phone')?.trim()
  const company = formData.get('company')?.trim()

  // Validate role (never trust client-sent data)
  if (!['staff', 'client'].includes(role)) {
    return { error: 'Invalid role specified.' }
  }

  if (!email || !full_name) {
    return { error: 'Email and full name are required.' }
  }

  const admin = supabaseAdmin()

  // Step 1: Create the Supabase auth user
  const { data: authData, error: authError } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,           // Skip email confirmation
    user_metadata: { full_name, role },
  })

  if (authError) {
    if (authError.message.includes('already registered')) {
      return { error: 'A user with this email already exists.' }
    }
    return { error: authError.message }
  }

  // Step 2: Create the profile record
  const { error: profileError } = await admin
    .from('profiles')
    .insert({
      id: authData.user.id,
      email,
      full_name,
      role,
      phone: phone || null,
      company: company || null,
      created_by: adminProfile.id,
    })

  if (profileError) {
    // Rollback: delete the orphaned auth user
    await admin.auth.admin.deleteUser(authData.user.id)
    return { error: `Failed to create profile: ${profileError.message}` }
  }

  // Step 3: Send password reset so user can set their own password
  const { error: resetError } = await admin.auth.admin.generateLink({
    type: 'recovery',
    email,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/set-password`,
    },
  })

  if (resetError) {
    console.error('Password reset email failed:', resetError.message)
    // Non-fatal — user exists but didn't get email. Admin can resend.
  }

  // Step 4: Log the action
  await admin.from('audit_logs').insert({
    user_id: adminProfile.id,
    user_role: 'admin',
    action: 'user.create',
    resource: 'profiles',
    resource_id: authData.user.id,
    new_data: { email, full_name, role },
  })

  revalidatePath('/admin/users')
  return { success: true, userId: authData.user.id }
}

export async function deactivateUser(userId) {
  const { profile: adminProfile } = await requireRole('admin')

  // Prevent self-deactivation
  if (userId === adminProfile.id) {
    return { error: 'You cannot deactivate your own account.' }
  }

  const admin = supabaseAdmin()

  const { error } = await admin
    .from('profiles')
    .update({ is_active: false })
    .eq('id', userId)

  if (error) return { error: error.message }

  // Revoke all active sessions
  await admin.auth.admin.signOut(userId, 'global')

  await admin.from('audit_logs').insert({
    user_id: adminProfile.id,
    user_role: 'admin',
    action: 'user.deactivate',
    resource: 'profiles',
    resource_id: userId,
  })

  revalidatePath('/admin/users')
  return { success: true }
}