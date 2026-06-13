// app/(admin)/admin/users/page.jsx
import Link from 'next/link'
import { UserPlus } from 'lucide-react'
import { supabaseServer } from '@/lib/supabase/server'
import { UserTable } from '@/components/admin/UserTable'

export const metadata = { title: 'Users — MadGraphix Admin' }

export default async function AdminUsersPage() {
  const supabase = await supabaseServer()

  const { data: users, error } = await supabase
    .from('profiles')
    .select('id, full_name, email, role, company, is_active, created_at')
    .order('created_at', { ascending: false })

  return (
    <div className="p-4 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="mt-1 text-sm text-gray-400">Manage staff and client accounts.</p>
        </div>
        <Link
          href="/admin/users/invite"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#F5A623]
                     px-4 py-2.5 text-sm font-semibold text-black transition-all hover:bg-[#F5A623]/90"
        >
          <UserPlus size={16} />
          Invite User
        </Link>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          Failed to load users: {error.message}
        </div>
      ) : (
        <UserTable users={users} />
      )}
    </div>
  )
}