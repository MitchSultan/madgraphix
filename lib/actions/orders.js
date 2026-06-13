'use server'

import { createClient } from '@/app/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Fetch orders — RLS handles filtering automatically.
 * Admin sees all orders; client sees only their own.
 */
export async function getOrders() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('orders')
    .select('*, profiles(id, full_name, email)')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

/**
 * Create a new order.
 * Admin can specify client_id to create on behalf of a client.
 * Client orders are automatically assigned to their own ID.
 */
export async function createOrder(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  // Admin can create orders for any client; client creates for self
  const client_id = profile?.role === 'admin' && formData.client_id
    ? formData.client_id
    : user.id

  const insertData = {
    client_id,
    title: formData.title,
    description: formData.description || null,
    quantity: Number(formData.quantity) || 1,
    unit_price: Number(formData.unit_price) || 0,
    notes: formData.notes || null,
    due_date: formData.due_date || null,
  }

  const { error } = await supabase.from('orders').insert(insertData)

  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/orders')
  revalidatePath('/dashboard')
}

/**
 * Update order status (admin only — enforced by RLS).
 */
export async function updateOrderStatus(orderId, status) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)

  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/orders')
  revalidatePath('/dashboard')
}

/**
 * Update an order's details (admin only — enforced by RLS).
 */
export async function updateOrder(orderId, updates) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', orderId)

  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/orders')
  revalidatePath('/dashboard')
}

/**
 * Delete an order (admin only — enforced by RLS).
 */
export async function deleteOrder(orderId) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', orderId)

  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/orders')
  revalidatePath('/dashboard')
}

/**
 * Get all client profiles (for admin's client selector dropdown).
 */
export async function getClientProfiles() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, email')
    .eq('role', 'client')
    .order('full_name', { ascending: true })

  if (error) throw new Error(error.message)
  return data
}
