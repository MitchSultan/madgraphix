'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const STATUSES = [
  'pending', 'confirmed', 'in_production', 'quality_check', 'ready', 'delivered', 'cancelled'
]

export default function OrderStatusUpdater({ orderId, currentStatus }) {
  const [status, setStatus] = useState(currentStatus)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleChange(e) {
    const newStatus = e.target.value
    setStatus(newStatus)
    setSaving(true)
    setSaved(false)

    const supabase = createClient()
    await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', orderId)

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-2">
      <select
        value={status}
        onChange={handleChange}
        className="w-full text-sm border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-black"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
          </option>
        ))}
      </select>
      {saving && <p className="text-xs text-gray-400">Saving…</p>}
      {saved && <p className="text-xs text-green-600">✓ Status updated</p>}
    </div>
  )
}