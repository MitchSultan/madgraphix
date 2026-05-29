import { createClient } from '@/lib/supabase/server'

export default async function SubscribersPage() {
  const supabase = await createClient()

  const { data: subscribers } = await supabase
    .from('subscribers')
    .select('*')
    .order('subscribed_at', { ascending: false })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Subscribers</h1>
        <span className="text-sm text-gray-500">{subscribers?.length ?? 0} total</span>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-medium text-gray-600">Email</th>
              <th className="text-left p-4 font-medium text-gray-600">Subscribed</th>
              <th className="text-left p-4 font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {subscribers?.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-400">
                  No subscribers yet.
                </td>
              </tr>
            )}
            {subscribers?.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{sub.email}</td>
                <td className="p-4 text-gray-400">
                  {new Date(sub.subscribed_at).toLocaleDateString('en-KE', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    sub.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {sub.is_active ? 'Active' : 'Unsubscribed'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}