// components/shared/RoleBadge.jsx
const ROLE_STYLES = {
  admin: 'bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/30',
  staff: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  client: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
}

export function RoleBadge({ role }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${
        ROLE_STYLES[role] ?? 'bg-white/5 text-gray-400 border-white/10'
      }`}
    >
      {role}
    </span>
  )
}