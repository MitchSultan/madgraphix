'use client'

import { useState } from 'react'
import { Plus, ShoppingBag } from 'lucide-react'
import OrdersTable from '@/components/orders/OrdersTable'
import CreateOrderForm from '@/components/orders/CreateOrderForm'

export default function OrdersPageClient({ orders, role, clients }) {
  const [showCreateForm, setShowCreateForm] = useState(false)

  return (
    <>
      {/* Action Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200/10 transition hover:bg-slate-800"
        >
          {role === 'admin' ? (
            <>
              <Plus size={16} />
              New Order
            </>
          ) : (
            <>
              <ShoppingBag size={16} />
              Request New Order
            </>
          )}
        </button>
      </div>

      {/* Orders Table */}
      <OrdersTable orders={orders} role={role} />

      {/* Create Order Modal */}
      {showCreateForm && (
        <CreateOrderForm
          role={role}
          clients={clients}
          onClose={() => setShowCreateForm(false)}
        />
      )}
    </>
  )
}
