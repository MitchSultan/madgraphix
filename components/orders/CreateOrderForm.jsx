'use client'

import { useState } from 'react'
import { CalendarCheck, X } from 'lucide-react'
import { createOrder } from '@/lib/actions/orders'

export default function CreateOrderForm({ role, clients, onClose }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    quantity: 1,
    unit_price: '',
    due_date: '',
    notes: '',
    client_id: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await createOrder({
        title: form.title,
        description: form.description || undefined,
        quantity: Number(form.quantity) || 1,
        unit_price: Number(form.unit_price) || 0,
        due_date: form.due_date || undefined,
        notes: form.notes || undefined,
        client_id: role === 'admin' ? form.client_id || undefined : undefined,
      })
      onClose?.()
    } catch (err) {
      setError(err.message || 'Failed to create order')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 px-4 py-10">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              {role === 'admin' ? 'Create New Order' : 'Request New Order'}
            </h3>
            <p className="text-sm text-slate-500">
              {role === 'admin'
                ? 'Create an order for a client with pricing details.'
                : 'Submit an order request. The shop will confirm pricing.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Admin: Client Selector */}
          {role === 'admin' && (
            <label className="block space-y-2 text-sm text-slate-700">
              <span className="font-medium">Client *</span>
              <select
                value={form.client_id}
                onChange={e => handleChange('client_id', e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
              >
                <option value="">Select a client...</option>
                {clients?.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.full_name || client.email || client.id}
                    {client.email ? ` (${client.email})` : ''}
                  </option>
                ))}
              </select>
            </label>
          )}

          {/* Title */}
          <label className="block space-y-2 text-sm text-slate-700">
            <span className="font-medium">Title *</span>
            <input
              type="text"
              value={form.title}
              onChange={e => handleChange('title', e.target.value)}
              required
              placeholder="e.g. 500x Business Cards"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
            />
          </label>

          {/* Description */}
          <label className="block space-y-2 text-sm text-slate-700">
            <span className="font-medium">Description</span>
            <textarea
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              rows={3}
              placeholder="Describe the print job details, materials, finishes..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 resize-none"
            />
          </label>

          {/* Quantity & Unit Price */}
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block space-y-2 text-sm text-slate-700">
              <span className="font-medium">Quantity *</span>
              <input
                type="number"
                min="1"
                value={form.quantity}
                onChange={e => handleChange('quantity', e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
              />
            </label>
            <label className="block space-y-2 text-sm text-slate-700">
              <span className="font-medium">
                Unit Price (KES) {role !== 'admin' && <span className="text-slate-400 font-normal">— optional</span>}
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.unit_price}
                onChange={e => handleChange('unit_price', e.target.value)}
                placeholder={role === 'admin' ? 'Required' : 'Leave blank for quote'}
                required={role === 'admin'}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
              />
            </label>
          </div>

          {/* Due Date */}
          <label className="block space-y-2 text-sm text-slate-700">
            <span className="font-medium">Due Date</span>
            <input
              type="date"
              value={form.due_date}
              onChange={e => handleChange('due_date', e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
            />
          </label>

          {/* Notes */}
          <label className="block space-y-2 text-sm text-slate-700">
            <span className="font-medium">Notes</span>
            <textarea
              value={form.notes}
              onChange={e => handleChange('notes', e.target.value)}
              rows={2}
              placeholder="Any special instructions or additional details..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 resize-none"
            />
          </label>

          {/* Total Preview */}
          {form.unit_price && form.quantity && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Estimated Total</span>
                <span className="text-lg font-semibold text-slate-900">
                  KES {(Number(form.quantity) * Number(form.unit_price)).toLocaleString('en-KE', { minimumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
            >
              <CalendarCheck size={16} />
              {submitting
                ? 'Creating...'
                : role === 'admin'
                  ? 'Create Order'
                  : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
