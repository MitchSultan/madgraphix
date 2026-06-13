// import { createClient } from '../../../../lib/supabase/server'
// import { time } from 'motion'

// export default async function AdminDashboard() {
//   const supabase = await createClient()

//   // Fetch all stats in parallel
//   const [
//     { count: totalOrders },
//     { count: pendingOrders },
//     { count: totalProducts },
//     { count: totalInvoices },
//     { data: recentOrders },
//     { data: ordersByStatus },
//     { data: analyticsData },
//   ] = await Promise.all([
//     supabase.from('orders').select('*', { count: 'exact', head: true }),
//     supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
//     supabase.from('products').select('*', { count: 'exact', head: true }),
//     supabase.from('invoices').select('*', { count: 'exact', head: true }),
//     supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
//     supabase.from('orders').select('status'),
//     supabase.from('analytics').select('visitor_id'),
//   ])

//   // Calculate revenue from invoices
//   const { data: paidInvoices } = await supabase
//     .from('invoices')
//     .select('amount')
//     .eq('status', 'paid')

//   const totalRevenue = paidInvoices?.reduce((sum, inv) => sum + Number(inv.amount), 0) ?? 0

//   const totalViews = analyticsData?.length ?? 0
//   const uniqueVisitors = new Set(analyticsData?.map(a => a.visitor_id)).size ?? 0

//   const stats = [
//     { label: 'Total Page Views', value: totalViews, color: 'bg-indigo-500' },
//     { label: 'Unique Visitors', value: uniqueVisitors, color: 'bg-pink-500' },
//     { label: 'Total Orders', value: totalOrders ?? 0, color: 'bg-blue-500' },
//     { label: 'Pending Orders', value: pendingOrders ?? 0, color: 'bg-amber-500' },
//     { label: 'Products', value: totalProducts ?? 0, color: 'bg-emerald-500' },
//     { label: 'Revenue (KES)', value: `${(totalRevenue).toLocaleString()}`, color: 'bg-purple-500' },
//   ]

//   const statusColors = {
//     pending: 'bg-yellow-100 text-yellow-800',
//     confirmed: 'bg-blue-100 text-blue-800',
//     in_production: 'bg-orange-100 text-orange-800',
//     quality_check: 'bg-purple-100 text-purple-800',
//     ready: 'bg-green-100 text-green-800',
//     delivered: 'bg-gray-100 text-gray-800',
//     cancelled: 'bg-red-100 text-red-800',
//   }

//   return (
//     <div className="p-6 space-y-8">
//       <div>
//       <h1 className="text-2xl font-semibold">Welcome, Admin</h1>
//       <p className="text-gray-500 mt-1">Here's a quick overview of your print shop's performance.</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {stats.map((stat) => (
//           <div key={stat.label} className="bg-white rounded-sm border p-5 shadow-sm">
//             <div className={`w-2 h-2 rounded-full ${stat.color} mb-3`} />
//             <p className="text-3xl font-semibold">{stat.value}</p>
//             <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
//           </div>
//         ))}
//       </div>

//       {/* Recent Orders */}
//       <div className="bg-white rounded-sm border shadow-sm">
//         <div className="p-5 border-b flex items-center justify-between">
//           <h2 className="font-semibold">Recent Orders</h2>
//           <a href="/dashboard/orders" className="text-sm  hover:underline">View all</a>
//         </div>
//         <div className="divide-y">
//           {recentOrders?.length === 0 && (
//             <p className="p-5 text-sm text-gray-400">No orders yet.</p>
//           )}
//           {recentOrders?.map((order) => (
//             <div key={order.id} className="p-4 flex items-center justify-between gap-4">
//               <div>
//                 <p className="font-medium text-sm">{order.client_name}</p>
//                 <p className="text-xs text-gray-400">{order.order_number}</p>
//               </div>
//               <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
//                 {order.status.replace('_', ' ')}
//               </span>
//               <p className="text-sm font-medium">KES {Number(order.total_amount).toLocaleString()}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }


// app/(admin)/admin/dashboard/page.jsx
import { Users, UserCheck, ShoppingCart, FileText } from 'lucide-react'
import { supabaseServer } from '../../../../lib/supabase/server'


export const metadata = { title: 'Dashboard — MadGraphix Admin' }

export default async function AdminDashboardPage() {
  const supabase = await supabaseServer()

  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  const { count: activeUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  // Wire these up once the orders / invoices tables are in place
  const stats = [
    { label: 'Total Users', value: totalUsers ?? 0, icon: Users },
    { label: 'Active Accounts', value: activeUsers ?? 0, icon: UserCheck },
    { label: 'Open Orders', value: '—', icon: ShoppingCart },
    { label: 'Unpaid Invoices', value: '—', icon: FileText },
  ]

  return (
    <>
    

    <div className="p-4 lg:p-8">
      <h1 className="text-2xl font-bold ">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-400">Overview of your MadGraphix workspace.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">{label}</p>
              <Icon size={18} color="#F5A623" />
            </div>
            <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}