// app/(client)/client/settings/actions.js
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData) {
  const supabase = createClient()

  // Get the authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Not authenticated.' }
  }

  // Update the profiles table
  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: formData.full_name,
      company: formData.company,
      phone: formData.phone,
      address: formData.address,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/client/settings')
  return { success: true }
}