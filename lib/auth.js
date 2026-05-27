import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Get the current authenticated Supabase user
 * @returns {Promise<import('@supabase/supabase-js').User|null>}
 */
export async function getUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  return user
}

/**
 * Get the current user's profile from the profiles table
 * @returns {Promise<import('@/types/database').Profile|null>}
 */
export async function getProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return data
}

/**
 * Get the current user's role
 * @returns {Promise<import('@/types/database').UserRole|null>}
 */
export async function getUserRole() {
  const profile = await getProfile()
  return profile?.role ?? null
}

/**
 * Require authentication — redirects to /login if not authenticated
 * @returns {Promise<import('@supabase/supabase-js').User>}
 */
export async function requireAuth() {
  const user = await getUser()
  if (!user) redirect('/login')
  return user
}

/**
 * Require admin role — redirects to /dashboard if not admin
 * @returns {Promise<import('@/types/database').Profile>}
 */
export async function requireAdmin() {
  const profile = await getProfile()
  if (!profile || (profile.role !== 'admin' && profile.role !== 'agent')) redirect('/dashboard')
  return profile
}
