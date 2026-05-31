'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { logSystemAction } from '../logger'

/**
 * Creates a new client account using the Supabase Admin API.
 * Requires SUPABASE_SERVICE_ROLE_KEY to be set in the environment.
 */
export async function createClientAccount(data) {
  try {
    const { email, password, full_name, company, phone } = data

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return { error: 'SUPABASE_SERVICE_ROLE_KEY is not set in environment variables. Required for admin creation of users.' }
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // 1. Create the user in Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
      user_metadata: { full_name }
    })

    if (authError) throw authError

    const userId = authData.user.id

    // 2. Update their role to 'client' in profiles
    // Our existing database trigger might create the profile as 'agent', so we need to update it
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({ role: 'client', full_name })
      .eq('id', userId)

    if (profileError) throw profileError

    // 3. Ensure a customer record exists or link them
    // For simplicity we create a customer record for them in the print_orders customers table
    const { error: customerError } = await supabaseAdmin
      .from('customers')
      .insert({ id: userId, email, name: full_name, company, phone })
      
    // It's possible the user already exists in customers but the profiles table is separate.
    // If we want to link them properly, we use the userId.

    // 4. Log the action
    await logSystemAction({
      userId: null, // we can pass admin id if we pass it down
      action: 'create_client',
      resource: 'clients',
      metadata: { new_client_id: userId, email },
      level: 'info'
    })

    revalidatePath('/dashboard/clients')
    return { success: true, userId }
  } catch (error) {
    console.error('Error creating client:', error)
    return { error: error.message }
  }
}
