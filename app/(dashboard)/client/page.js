import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ClientOverviewPage() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) { return cookieStore.get(name)?.value },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()
  const userId = session?.user?.id

  // Fetch some stats for the client
  const { data: orders } = await supabase
    .from('print_orders')
    .select('*')
    .eq('customer_id', userId) // assuming customer_id maps to user ID as per our link
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Welcome to your Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Here you can view your recent orders and browse our product catalogue.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Links</h2>
          <div className="space-y-4 flex flex-col">
            <Link href="/client/products" className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors">
              &rarr; Browse Catalogue
            </Link>
            <Link href="/client/orders" className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors">
              &rarr; View All Orders
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Orders</h2>
          {orders && orders.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map(order => (
                <li key={order.id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{order.job_type}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    order.production_status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                    order.production_status === 'Queued' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {order.production_status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">You have no recent orders.</p>
          )}
        </div>
      </div>
    </div>
  )
}
