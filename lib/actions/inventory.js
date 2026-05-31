'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { logSystemAction } from '../logger'

async function getSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) { return cookieStore.get(name)?.value },
      },
    }
  )
}

/**
 * Adjusts the stock of an inventory item and logs the transaction.
 */
export async function adjustInventoryStock(inventoryId, changeAmount, reason, orderId = null) {
  try {
    const supabase = await getSupabase()
    const { data: { session } } = await supabase.auth.getSession()
    const userId = session?.user?.id

    const { error: transactionError } = await supabase
      .from('inventory_transactions')
      .insert({
        inventory_id: inventoryId,
        change_amount: changeAmount,
        reason,
        order_id: orderId,
        user_id: userId
      })

    if (transactionError) throw transactionError

    await logSystemAction({
      userId,
      action: 'adjust_inventory',
      resource: 'inventory',
      metadata: { inventory_id: inventoryId, change_amount: changeAmount, reason },
      level: 'info'
    })

    revalidatePath('/dashboard/inventory')
    return { success: true }
  } catch (error) {
    console.error('Error adjusting inventory:', error)
    return { error: error.message }
  }
}

/**
 * Create a new inventory material
 */
export async function createMaterial(data) {
  try {
    const supabase = await getSupabase()
    const { data: { session } } = await supabase.auth.getSession()
    
    const { error } = await supabase.from('inventory').insert(data)
    if (error) throw error

    await logSystemAction({
      userId: session?.user?.id,
      action: 'create_material',
      resource: 'inventory',
      metadata: { material_name: data.name },
      level: 'info'
    })

    revalidatePath('/dashboard/inventory')
    return { success: true }
  } catch (error) {
    console.error('Error creating material:', error)
    return { error: error.message }
  }
}
