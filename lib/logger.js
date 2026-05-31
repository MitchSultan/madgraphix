import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Logs an action to the system_logs table
 * @param {Object} params
 * @param {string} [params.userId] - The ID of the user performing the action
 * @param {string} params.action - The action being performed (e.g., 'create_client', 'adjust_inventory')
 * @param {string} params.resource - The resource affected (e.g., 'clients', 'inventory')
 * @param {Object} [params.metadata={}] - Additional details about the action
 * @param {import('@/types/database').LogLevel} [params.level='info'] - The log level ('info', 'warning', 'error', 'security')
 * @returns {Promise<void>}
 */
export async function logSystemAction({ userId, action, resource, metadata = {}, level = 'info' }) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value
          },
        },
      }
    )

    // Ensure we use the service role key to insert logs bypassing RLS if needed,
    // or just rely on the authenticated user having permissions.
    // If we only have anon key in the frontend, RLS must allow inserts.
    // Ideally we would use SUPABASE_SERVICE_ROLE_KEY here, but for now we try with the anon key
    // which assumes RLS allows it or the user is admin.
    
    await supabase.from('system_logs').insert({
      user_id: userId || null,
      action,
      resource,
      metadata,
      level
    })
  } catch (error) {
    console.error('Failed to log system action:', error)
  }
}
