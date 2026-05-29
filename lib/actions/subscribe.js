'use server'

import { createClient } from '@/lib/supabase/server'

export async function subscribeEmail(prevState, formData) {
  const email = formData.get('email')?.toString().trim().toLowerCase()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('subscribers')
    .insert({ email })

  if (error) {
    // Postgres unique violation code
    if (error.code === '23505') {
      return { success: false, message: 'You\'re already subscribed!' }
    }
    return { success: false, message: 'Something went wrong. Please try again.' }
  }

  return { success: true, message: 'Thank you for subscribing! 🎉' }
}