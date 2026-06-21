// app/(client)/client/settings/page.jsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SettingsForm } from './SettingsForm'

export default async function SettingsPage() {
  const supabase = await createClient();

  // 1. Authenticated user
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()
  if (!authUser) redirect('/login')

  // 2. Full profile from the 'profiles' table
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authUser.id)
    .single()

  if (error) {
    // If no profile exists yet, show a fallback; you could create one automatically
    return <p className="p-4 text-red-500">Failed to load profile. Please contact support.</p>
  }

  // 3. Pass the current values to the client form
  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      <SettingsForm profile={profile} />
    </div>
  )
}