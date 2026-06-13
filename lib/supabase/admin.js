// NEVER import this in client components or pages
// ONLY use in: API Routes, Server Actions, lib/auth utilities
import { createClient } from '@supabase/supabase-js'

export function supabaseAdmin() {
  if (typeof window !== 'undefined') {
    throw new Error('supabaseAdmin() cannot be used client-side')
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}