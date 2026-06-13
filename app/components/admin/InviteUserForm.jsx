'use client'

import { useState } from 'react'
import { inviteUser } from '@/app/(admin)/admin/users/invite/actions'

export function InviteUserForm() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    const formData = new FormData(e.currentTarget)
    const res = await inviteUser(formData)

    setResult(res)
    setLoading(false)

    if (res.success) e.currentTarget.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Full Name *
          </label>
          <input
            name="full_name"
            required
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10
                       rounded-lg text-white focus:ring-2 focus:ring-[#F5A623]
                       focus:outline-none"
            placeholder="Jane Mwangi"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Email *
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10
                       rounded-lg text-white focus:ring-2 focus:ring-[#F5A623]
                       focus:outline-none"
            placeholder="jane@company.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Role *
          </label>
          <select
            name="role"
            required
            className="w-full px-4 py-2.5 bg-[#0D0D1A] border border-white/10
                       rounded-lg text-white focus:ring-2 focus:ring-[#F5A623]
                       focus:outline-none"
          >
            <option value="">Select role…</option>
            <option value="staff">Staff</option>
            <option value="client">Client</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Phone
          </label>
          <input
            name="phone"
            type="tel"
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10
                       rounded-lg text-white focus:ring-2 focus:ring-[#F5A623]
                       focus:outline-none"
            placeholder="+254 700 000000"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Company / Organisation
        </label>
        <input
          name="company"
          className="w-full px-4 py-2.5 bg-white/5 border border-white/10
                     rounded-lg text-white focus:ring-2 focus:ring-[#F5A623]
                     focus:outline-none"
          placeholder="Acme Ltd"
        />
      </div>

      {result?.error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-sm text-red-400">{result.error}</p>
        </div>
      )}

      {result?.success && (
        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-sm text-green-400">
            ✓ User created. They'll receive a password setup email shortly.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2.5 bg-[#F5A623] text-black font-semibold rounded-lg
                   hover:bg-[#F5A623]/90 disabled:opacity-50 transition-all"
      >
        {loading ? 'Creating…' : 'Create & Send Invite'}
      </button>
    </form>
  )
}