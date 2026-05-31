import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import OrderStatusUpdater from './orderStatusUpdater';

const statusColors = {
  pending:        'bg-yellow-100 text-yellow-800',
  confirmed:      'bg-blue-100 text-blue-800',
  in_production:  'bg-orange-100 text-orange-800',
  quality_check:  'bg-purple-100 text-purple-800',
  ready:          'bg-green-100 text-green-800',
  delivered:      'bg-gray-100 text-gray-800',
  cancelled:      'bg-red-100 text-red-800',
}

export default async function OrderDetailPage({ params }) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch order with its items
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        id,
        product_name,
        quantity,
        unit_price,
        specifications
      )
    `)
    .eq('id', id)
    .single()

  if (orderError || !order) {
    console.error('Order fetch error:', orderError)
    notFound()
  }

  // Fetch linked invoice separately (no join — avoids FK name issues)
  const { data: invoice } = await supabase
    .from('invoices')
    .select('*')
    .eq('order_id', id)
    .maybeSingle()

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/orders" className="text-sm text-gray-400 hover:text-gray-600">
          ← Orders
        </Link>
        <h1 className="text-xl font-semibold">{order.order_number}</h1>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[order.status]}`}>
          {order.status.replace(/_/g, ' ')}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Left: Order info */}
        <div className="md:col-span-2 space-y-6">

          {/* Client info */}
          <div className="bg-white rounded-sm border p-5 space-y-3">
            <h2 className="font-medium text-sm text-gray-500 uppercase tracking-wide">Client</h2>
            <div className="space-y-1">
              <p className="font-semibold text-lg">{order.client_name}</p>
              <p className="text-sm text-gray-500">{order.client_email}</p>
              {order.client_phone && (
                <p className="text-sm text-gray-500">{order.client_phone}</p>
              )}
            </div>
          </div>

          {/* Order items */}
          <div className="bg-white rounded-xl border overflow-hidden">
            <div className="p-5 border-b">
              <h2 className="font-medium text-sm text-gray-500 uppercase tracking-wide">Items</h2>
            </div>
            {order.order_items?.length > 0 ? (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-600">Product</th>
                    <th className="text-left p-4 font-medium text-gray-600">Qty</th>
                    <th className="text-left p-4 font-medium text-gray-600">Unit Price</th>
                    <th className="text-left p-4 font-medium text-gray-600">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {order.order_items.map((item) => (
                    <tr key={item.id}>
                      <td className="p-4">
                        <p className="font-medium">{item.product_name}</p>
                        {item.specifications && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            {Object.entries(item.specifications)
                              .map(([k, v]) => `${k}: ${v}`)
                              .join(' · ')}
                          </p>
                        )}
                      </td>
                      <td className="p-4">{item.quantity}</td>
                      <td className="p-4">KES {Number(item.unit_price).toLocaleString()}</td>
                      <td className="p-4 font-medium">
                        KES {(item.quantity * item.unit_price).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t bg-gray-50">
                  <tr>
                    <td colSpan={3} className="p-4 text-right font-medium">Total</td>
                    <td className="p-4 font-bold text-lg">
                      KES {Number(order.total_amount).toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <p className="p-5 text-sm text-gray-400">No items recorded for this order.</p>
            )}
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="bg-white rounded-xl border p-5">
              <h2 className="font-medium text-sm text-gray-500 uppercase tracking-wide mb-2">Notes</h2>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Right: Status + Invoice */}
        <div className="space-y-4">

          {/* Update status */}
          <div className="bg-white rounded-xl border p-5 space-y-3">
            <h2 className="font-medium text-sm text-gray-500 uppercase tracking-wide">Update Status</h2>
            <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
          </div>

          {/* Invoice */}
          <div className="bg-white rounded-xl border p-5 space-y-3">
            <h2 className="font-medium text-sm text-gray-500 uppercase tracking-wide">Invoice</h2>
            {invoice ? (
              <div className="space-y-2">
                <p className="font-mono text-xs text-gray-500">{invoice.invoice_number}</p>
                <p className="font-semibold">KES {Number(invoice.amount).toLocaleString()}</p>
                <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                  invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                  invoice.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                  invoice.status === 'overdue' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {invoice.status}
                </span>
                {invoice.due_date && (
                  <p className="text-xs text-gray-400">
                    Due: {new Date(invoice.due_date).toLocaleDateString('en-KE', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </p>
                )}
                <Link
                  href={`/admin/invoices/${invoice.id}`}
                  className="block text-sm text-blue-600 hover:underline mt-2"
                >
                  View invoice →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-400">No invoice yet.</p>
                <CreateInvoiceButton orderId={order.id} order={order} />
              </div>
            )}
          </div>

          {/* Dates */}
          <div className="bg-white rounded-xl border p-5 space-y-2 text-sm">
            <h2 className="font-medium text-xs text-gray-500 uppercase tracking-wide mb-3">Timeline</h2>
            <div className="flex justify-between">
              <span className="text-gray-400">Created</span>
              <span>{new Date(order.created_at).toLocaleDateString('en-KE')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Updated</span>
              <span>{new Date(order.updated_at).toLocaleDateString('en-KE')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Inline button component for creating invoice
function CreateInvoiceButton({ orderId, order }) {
  return (
    <form action={async () => {
      'use server'
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      await supabase.from('invoices').insert({
        order_id: orderId,
        client_name: order.client_name,
        client_email: order.client_email,
        amount: order.total_amount,
        status: 'draft',
        due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      })
    }}>
      <button
        type="submit"
        className="w-full text-sm bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition-colors"
      >
        Generate Invoice
      </button>
    </form>
  )
}