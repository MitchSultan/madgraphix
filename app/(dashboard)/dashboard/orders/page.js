import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  in_production: 'bg-orange-100 text-orange-800',
  quality_check: 'bg-purple-100 text-purple-800',
  ready: 'bg-green-100 text-green-800',
  delivered: 'bg-gray-100 text-gray-800',
  cancelled: 'bg-red-100 text-red-800',
}

export default async function OrdersPage() {
  const supabase = await createClient()

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          <strong>Database error:</strong> {error.message}
          <p className="mt-1 text-xs">Make sure the orders table exists in Supabase and RLS policies allow authenticated reads.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <span className="text-sm text-gray-500">{orders?.length ?? 0} total</span>
      </div>

      <div className="bg-white rounded-sm border shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-medium text-gray-600">Order #</th>
              <th className="text-left p-4 font-medium text-gray-600">Client</th>
              <th className="text-left p-4 font-medium text-gray-600">Status</th>
              <th className="text-left p-4 font-medium text-gray-600">Amount</th>
              <th className="text-left p-4 font-medium text-gray-600">Date</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders?.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-400">
                  No orders yet. They'll appear here once clients submit quote requests.
                </td>
              </tr>
            )}
            {orders?.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-mono text-xs text-gray-500">{order.order_number}</td>
                <td className="p-4">
                  <p className="font-medium">{order.client_name}</p>
                  <p className="text-xs text-gray-400">{order.client_email}</p>
                </td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="p-4 font-medium">KES {Number(order.total_amount).toLocaleString()}</td>
                <td className="p-4 text-gray-400 text-xs">
                  {new Date(order.created_at).toLocaleDateString('en-KE', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </td>
                <td className="p-4">
                  <Link
                    href={`/dashboard/orders/${order.id}`}
                    className="text-blue-600 hover:underline text-xs"
                  >
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}