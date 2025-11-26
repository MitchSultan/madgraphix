// Supabase helper functions for user profile operations

import { createClient } from './server'

/**
 * Get current user's profile
 */
export async function getUserProfile() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')
  
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  
  if (error) throw error
  return data
}

/**
 * Update user profile
 */
export async function updateUserProfile(updates) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')
  
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', user.id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

/**
 * Check if current user is admin
 */
export async function isAdmin() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return false
  
  const { data, error } = await supabase
    .from('user_profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()
  
  if (error) return false
  return data?.is_admin || false
}

/**
 * Get all user profiles (admin only)
 */
export async function getAllUsers() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}
