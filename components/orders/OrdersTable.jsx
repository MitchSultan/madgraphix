'use client'

import { useState, useMemo } from 'react'
import { Trash2, ChevronDown, Eye, Search } from 'lucide-react'
import { ORDER_STATUS_CONFIG, ORDER_STATUSES } from '@/types/database'
import { updateOrderStatus, deleteOrder } from '@/lib/actions/orders'

export default function OrdersTable({ orders, role }) {
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [updatingId, setUpdatingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [expandedId, setExpandedId] = useState(null)

  const filteredOrders = useMemo(() => {
    let result = orders || []
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(order =>
        order.title?.toLowerCase().includes(q) ||
        order.id?.toLowerCase().includes(q) ||
        order.profiles?.full_name?.toLowerCase().includes(q) ||
        order.profiles?.email?.toLowerCase().includes(q)
      )
    }
    return result
  }, [orders, statusFilter, searchQuery])

  async function handleStatusChange(orderId, newStatus) {
    setUpdatingId(orderId)
    try {
      await updateOrderStatus(orderId, newStatus)
    } catch (err) {
      alert('Failed to update status: ' + err.message)
    } finally {
      setUpdatingId(null)
    }
  }

  async function handleDelete(orderId) {
    if (!confirm('Are you sure you want to delete this order? This cannot be undone.')) return
    setDeletingId(orderId)
    try {
      await deleteOrder(orderId)
    } catch (err) {
      alert('Failed to delete order: ' + err.message)
    } finally {
      setDeletingId(null)
    }
  }

  function formatCurrency(amount) {
    return `KES ${Number(amount || 0).toLocaleString('en-KE', { minimumFractionDigits: 0 })}`
  }

  function formatDate(dateStr) {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleDateString('en-KE', {
      year: 'numeric', month: 'short', day: 'numeric'
    })
  }

  function truncateId(id) {
    return id ? id.substring(0, 8) : '—'
  }

  return (
    <div className="space-y-4">
      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
              statusFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({orders?.length || 0})
          </button>
          {ORDER_STATUSES.map(status => {
            const config = ORDER_STATUS_CONFIG[status]
            const count = orders?.filter(o => o.status === status).length || 0
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  statusFilter === status
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {config.label} ({count})
              </button>
            )
          })}
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 rounded-full border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-sm outline-none transition focus:border-slate-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left divide-y divide-slate-200">
            <thead className="bg-slate-50 text-xs uppercase tracking-[0.15em] text-slate-500">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Title</th>
                {role === 'admin' && <th className="px-6 py-4">Client</th>}
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-700">
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => {
                  const statusConfig = ORDER_STATUS_CONFIG[order.status] || ORDER_STATUS_CONFIG.pending
                  return (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <code className="rounded bg-slate-100 px-2 py-1 text-xs font-mono text-slate-600">
                          {truncateId(order.id)}
                        </code>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {order.title}
                        {order.description && (
                          <p className="text-xs text-slate-500 mt-0.5 max-w-[200px] truncate">
                            {order.description}
                          </p>
                        )}
                      </td>
                      {role === 'admin' && (
                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-900">
                            {order.profiles?.full_name || 'Unknown'}
                          </p>
                          <p className="text-xs text-slate-500">
                            {order.profiles?.email || ''}
                          </p>
                        </td>
                      )}
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {formatCurrency(order.total_price)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${statusConfig.color}`}>
                          <span className={`inline-block w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {formatDate(order.due_date)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {role === 'admin' ? (
                            <>
                              {/* Status Dropdown */}
                              <div className="relative">
                                <select
                                  value={order.status}
                                  onChange={e => handleStatusChange(order.id, e.target.value)}
                                  disabled={updatingId === order.id}
                                  className="appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 pr-8 text-xs font-medium outline-none transition focus:border-slate-400 disabled:opacity-50 cursor-pointer"
                                >
                                  {ORDER_STATUSES.map(s => (
                                    <option key={s} value={s}>
                                      {ORDER_STATUS_CONFIG[s].label}
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                              </div>
                              {/* Delete Button */}
                              <button
                                onClick={() => handleDelete(order.id)}
                                disabled={deletingId === order.id}
                                className="rounded-xl border border-red-200 bg-red-50 p-1.5 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                                title="Delete order"
                              >
                                <Trash2 size={14} />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
                            >
                              <Eye size={14} />
                              View Details
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={role === 'admin' ? 7 : 6} className="px-6 py-16 text-center text-slate-500">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-lg font-medium text-slate-400">No orders found</p>
                      <p className="text-sm">
                        {statusFilter !== 'all'
                          ? 'Try a different status filter.'
                          : 'Create your first order to get started.'}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client detail panel */}
      {expandedId && role !== 'admin' && (() => {
        const order = orders.find(o => o.id === expandedId)
        if (!order) return null
        const statusConfig = ORDER_STATUS_CONFIG[order.status] || ORDER_STATUS_CONFIG.pending
        return (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">{order.title}</h3>
              <button
                onClick={() => setExpandedId(null)}
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500">Order ID</p>
                <p className="font-mono text-slate-900">{order.id}</p>
              </div>
              <div>
                <p className="text-slate-500">Status</p>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${statusConfig.color}`}>
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                  {statusConfig.label}
                </span>
              </div>
              <div>
                <p className="text-slate-500">Quantity</p>
                <p className="text-slate-900">{order.quantity}</p>
              </div>
              <div>
                <p className="text-slate-500">Unit Price</p>
                <p className="text-slate-900">{formatCurrency(order.unit_price)}</p>
              </div>
              <div>
                <p className="text-slate-500">Total Price</p>
                <p className="font-semibold text-slate-900">{formatCurrency(order.total_price)}</p>
              </div>
              <div>
                <p className="text-slate-500">Due Date</p>
                <p className="text-slate-900">{formatDate(order.due_date)}</p>
              </div>
              {order.description && (
                <div className="sm:col-span-2">
                  <p className="text-slate-500">Description</p>
                  <p className="text-slate-900">{order.description}</p>
                </div>
              )}
              {order.notes && (
                <div className="sm:col-span-2">
                  <p className="text-slate-500">Notes</p>
                  <p className="text-slate-900">{order.notes}</p>
                </div>
              )}
              <div>
                <p className="text-slate-500">Created</p>
                <p className="text-slate-900">{formatDate(order.created_at)}</p>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
