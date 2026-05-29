'use server'

import { createClient } from '@/lib/supabase/server'

export async function submitLead(prevState, formData) {
  const name    = formData.get('name')?.toString().trim()
  const email   = formData.get('email')?.toString().trim().toLowerCase()
  const service = formData.get('service')?.toString().trim()
  const message = formData.get('message')?.toString().trim()

  if (!name || !email || !message) {
    return { success: false, message: 'Please fill in all required fields.' }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('leads')
    .insert({ full_name: name, email, service: service || null, message })

  if (error) {
    console.error('Lead insert error:', error)
    return { success: false, message: 'Something went wrong. Please try again.' }
  }

  return {
    success: true,
    message: `Thank you ${name}! We've received your message and will be in touch within 24 hours.`
  }
}