import { getOrders, getClientProfiles } from '@/lib/actions/orders'
import { getProfile } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { ORDER_STATUS_CONFIG } from '@/types/database'
import OrdersPageClient from './OrdersPageClient'

export default async function OrdersPage() {
  const profile = await getProfile()
  if (!profile) redirect('/login')

  const orders = await getOrders()

  // Admin needs client list for the create form
  let clients = []
  if (profile.role === 'admin') {
    clients = await getClientProfiles()
  }

  // Compute summary metrics
  const totalOrders = orders.length
  const statusBreakdown = {}
  let totalRevenue = 0

  for (const order of orders) {
    statusBreakdown[order.status] = (statusBreakdown[order.status] || 0) + 1
    if (order.status === 'delivered') {
      totalRevenue += Number(order.total_price || 0)
    }
  }

  const totalSpend = orders.reduce((sum, o) => sum + Number(o.total_price || 0), 0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {profile.role === 'admin' ? 'Order Management' : 'My Orders'}
        </h1>
        <p className="text-gray-500">
          {profile.role === 'admin'
            ? 'Manage all client orders, update statuses, and track revenue.'
            : 'View and track your print orders.'}
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Total Orders</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{totalOrders}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            {profile.role === 'admin' ? 'Revenue (Delivered)' : 'Total Spend'}
          </p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">
            KES {(profile.role === 'admin' ? totalRevenue : totalSpend).toLocaleString('en-KE')}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Active Orders</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">
            {(statusBreakdown['pending'] || 0) + (statusBreakdown['processing'] || 0)}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(statusBreakdown).map(([status, count]) => {
              const config = ORDER_STATUS_CONFIG[status]
              if (!config) return null
              return (
                <span
                  key={status}
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${config.color}`}
                >
                  {config.label}: {count}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      {/* Client component handles table + create form */}
      <OrdersPageClient
        orders={orders}
        role={profile.role}
        clients={clients}
      />
    </div>
  )
}
