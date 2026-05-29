import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch all stats in parallel
  const [
    { count: totalOrders },
    { count: pendingOrders },
    { count: totalProducts },
    { count: totalInvoices },
    { data: recentOrders },
    { data: ordersByStatus },
  ] = await Promise.all([
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('invoices').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
    supabase.from('orders').select('status'),
  ])

  // Calculate revenue from invoices
  const { data: paidInvoices } = await supabase
    .from('invoices')
    .select('amount')
    .eq('status', 'paid')

  const totalRevenue = paidInvoices?.reduce((sum, inv) => sum + Number(inv.amount), 0) ?? 0

  const stats = [
    { label: 'Total Orders', value: totalOrders ?? 0, color: 'bg-blue-500' },
    { label: 'Pending Orders', value: pendingOrders ?? 0, color: 'bg-amber-500' },
    { label: 'Products', value: totalProducts ?? 0, color: 'bg-emerald-500' },
    { label: 'Revenue (KES)', value: `${(totalRevenue).toLocaleString()}`, color: 'bg-purple-500' },
  ]

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    in_production: 'bg-orange-100 text-orange-800',
    quality_check: 'bg-purple-100 text-purple-800',
    ready: 'bg-green-100 text-green-800',
    delivered: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border p-5 shadow-sm">
            <div className={`w-2 h-2 rounded-full ${stat.color} mb-3`} />
            <p className="text-3xl font-semibold">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="p-5 border-b flex items-center justify-between">
          <h2 className="font-semibold">Recent Orders</h2>
          <a href="/admin/orders" className="text-sm text-blue-600 hover:underline">View all</a>
        </div>
        <div className="divide-y">
          {recentOrders?.length === 0 && (
            <p className="p-5 text-sm text-gray-400">No orders yet.</p>
          )}
          {recentOrders?.map((order) => (
            <div key={order.id} className="p-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-sm">{order.client_name}</p>
                <p className="text-xs text-gray-400">{order.order_number}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
                {order.status.replace('_', ' ')}
              </span>
              <p className="text-sm font-medium">KES {Number(order.total_amount).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}