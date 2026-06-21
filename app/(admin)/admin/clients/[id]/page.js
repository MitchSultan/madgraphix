// app/dashboard/clients/[id]/page.js
import { createClient } from '@/lib/supabase/server'   // or wherever your server client is
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function ClientDetailPage({ params }) {
  const supabase = await createClient()

  // Fetch the client profile with the given ID
  const { data: client, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.id)
    .eq('role', 'client')          // ensure it's a client
    .single()

  // Handle not found or error
  if (error || !client) {
    notFound()
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Client Details</h1>
        <Link href="/dashboard/clients" className="text-blue-600 hover:underline">
          ← Back to Clients
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        {/* Basic Info */}
        <div className="flex items-center gap-4">
          {client.avatar_url ? (
            <img src={client.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl">
              {client.full_name?.[0] || 'C'}
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{client.full_name || 'Unnamed Client'}</h2>
            <p className="text-gray-500">{client.email}</p>
          </div>
        </div>

        {/* Client-specific fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          {client.company && (
            <div>
              <span className="text-sm text-gray-500">Company</span>
              <p className="font-medium">{client.company}</p>
            </div>
          )}
          {client.phone && (
            <div>
              <span className="text-sm text-gray-500">Phone</span>
              <p className="font-medium">{client.phone}</p>
            </div>
          )}
          {client.address && (
            <div className="col-span-2">
              <span className="text-sm text-gray-500">Address</span>
              <p className="font-medium">{client.address}</p>
            </div>
          )}
        </div>

        {/* Created / Updated dates */}
        <div className="pt-2 text-xs text-gray-400">
          Joined {new Date(client.created_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}