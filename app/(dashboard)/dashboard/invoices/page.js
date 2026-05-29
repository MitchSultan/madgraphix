import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const statusStyle = {
  draft:     'bg-gray-100 text-gray-700',
  sent:      'bg-blue-100 text-blue-800',
  paid:      'bg-green-100 text-green-800',
  overdue:   'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-400',
}

export default async function InvoicesPage() {
  const supabase = await createClient()

  const { data: invoices, error } = await supabase
    .from('invoices')
    .select(`
      *,
      orders (
        order_number,
        status
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          <strong>Error:</strong> {error.message}
        </div>
      </div>
    )
  }

  const totalPaid = invoices
    ?.filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + Number(i.amount), 0) ?? 0

  const totalPending = invoices
    ?.filter(i => ['sent', 'draft'].includes(i.status))
    .reduce((sum, i) => sum + Number(i.amount), 0) ?? 0

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Invoices</h1>
        <span className="text-sm text-gray-500">{invoices?.length ?? 0} total</span>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Collected</p>
          <p className="text-2xl font-semibold text-green-600">
            KES {totalPaid.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Outstanding</p>
          <p className="text-2xl font-semibold text-amber-600">
            KES {totalPending.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-medium text-gray-600">Invoice #</th>
              <th className="text-left p-4 font-medium text-gray-600">Client</th>
              <th className="text-left p-4 font-medium text-gray-600">Order</th>
              <th className="text-left p-4 font-medium text-gray-600">Amount</th>
              <th className="text-left p-4 font-medium text-gray-600">Status</th>
              <th className="text-left p-4 font-medium text-gray-600">Due</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {invoices?.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-400">
                  No invoices yet.
                </td>
              </tr>
            )}
            {invoices?.map((inv) => (
              <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-mono text-xs text-gray-500">{inv.invoice_number}</td>
                <td className="p-4">
                  <p className="font-medium">{inv.client_name}</p>
                  <p className="text-xs text-gray-400">{inv.client_email}</p>
                </td>
                <td className="p-4 text-xs text-gray-500">
                  {inv.orders?.order_number ?? '—'}
                </td>
                <td className="p-4 font-medium">KES {Number(inv.amount).toLocaleString()}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyle[inv.status]}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="p-4 text-xs text-gray-400">
                  {inv.due_date
                    ? new Date(inv.due_date).toLocaleDateString('en-KE', {
                        day: 'numeric', month: 'short'
                      })
                    : '—'}
                </td>
                <td className="p-4">
                  <Link
                    href={`/admin/invoices/${inv.id}`}
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