// lib/data.js
import { createClient } from '@/lib/supabase/server'

/**
 * Fetch all products (admin only, based on RLS).
 * Returns an array of { id, name, price } or empty array on error.
 */
export async function getProducts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('id, name, price')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching products:', error.message)
    return []
  }
  return data
}

/**
 * Search products by name (for autocomplete).
 * @param {string} query - The search term.
 */
export async function searchProducts(query) {
  if (!query || query.trim().length === 0) return getProducts()
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('id, name, price')
    .ilike('name', `%${query}%`)
    .order('name', { ascending: true })
    .limit(10)

  if (error) {
    console.error('Error searching products:', error.message)
    return []
  }
  return data
}

/**
 * (Optional) Fetch a single invoice by ID including its metadata items.
 * You can add similar functions for invoices, clients, etc.
 */
export async function getInvoiceById(id) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching invoice:', error.message)
    return null
  }
  return data
}