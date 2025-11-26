// Supabase helper functions for order operations

import { createClient } from './server'

/**
 * Get all orders for the current user
 */
export async function getUserOrders() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')
  
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

/**
 * Get all orders (admin only)
 */
export async function getAllOrders(filters = {}) {
  const supabase = createClient()
  
  let query = supabase
    .from('orders')
    .select(`
      *,
      user_profiles!orders_user_id_fkey (email, full_name, company_name),
      order_items (
        *,
        products (*)
      )
    `)
    .order('created_at', { ascending: false })
  
  // Apply filters
  if (filters.status) {
    query = query.eq('status', filters.status)
  }
  
  if (filters.userId) {
    query = query.eq('user_id', filters.userId)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data
}

/**
 * Get a single order by ID
 */
export async function getOrder(id) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      user_profiles!orders_user_id_fkey (email, full_name, company_name, phone),
      order_items (
        *,
        products (*)
      )
    `)
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

/**
 * Create a new order with items
 */
export async function createOrder(orderData, items) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) throw new Error('Not authenticated')
  
  // Create the order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([{
      user_id: user.id,
      notes: orderData.notes,
      status: 'pending'
    }])
    .select()
    .single()
  
  if (orderError) throw orderError
  
  // Create order items
  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    color: item.color,
    size: item.size,
    custom_text: item.custom_text
  }))
  
  const { data: createdItems, error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)
    .select()
  
  if (itemsError) throw itemsError
  
  return { ...order, order_items: createdItems }
}

/**
 * Update order status (admin only)
 */
export async function updateOrderStatus(id, status) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

/**
 * Get order statistics (admin only)
 */
export async function getOrderStats() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .select('status')
  
  if (error) throw error
  
  const stats = {
    total: data.length,
    pending: data.filter(o => o.status === 'pending').length,
    confirmed: data.filter(o => o.status === 'confirmed').length,
    in_production: data.filter(o => o.status === 'in_production').length,
    completed: data.filter(o => o.status === 'completed').length,
    cancelled: data.filter(o => o.status === 'cancelled').length
  }
  
  return stats
}
