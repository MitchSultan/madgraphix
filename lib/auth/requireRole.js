import { redirect } from 'next/navigation'
import { supabaseServer } from '../supabase/server'

const ROLE_HOME = {
  admin: '/admin/dashboard',
  staff: '/staff/dashboard',
  client: '/portal/dashboard',
}

/**
 * Call at the top of any Server Component or layout.
 * Redirects away if user isn't authenticated or doesn't have required role.
 *
 * Usage:
 *   const { user, profile } = await requireRole('admin')
 *   const { user, profile } = await requireRole('admin', 'staff')
 *   const { user, profile } = await requireRole() // just needs to be logged in
 */
export async function requireRole(...allowedRoles) {
  const supabase = await supabaseServer()

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/login')
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, email, full_name, role, avatar_url, is_active')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    redirect('/login?error=profile_not_found')
  }

  if (!profile.is_active) {
    // Sign them out and redirect
    await supabase.auth.signOut()
    redirect('/login?error=account_disabled')
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(profile.role)) {
    // Wrong role — send to their actual home
    redirect(ROLE_HOME[profile.role] ?? '/login')
  }

  return { user, profile }
}