// Supabase helper functions for product operations

import { createClient } from './server'

/**
 * Get all products (filters by is_active for non-admin users)
 */
export async function getProducts(activeOnly = true) {
  const supabase = createClient()
  
  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (activeOnly) {
    query = query.eq('is_active', true)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data
}

/**
 * Get a single product by ID
 */
export async function getProduct(id) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

/**
 * Create a new product (admin only)
 */
export async function createProduct(productData) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

/**
 * Update a product (admin only)
 */
export async function updateProduct(id, updates) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

/**
 * Delete a product (admin only)
 */
export async function deleteProduct(id) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}

/**
 * Toggle product active status
 */
export async function toggleProductStatus(id, isActive) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('products')
    .update({ is_active: isActive })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}
