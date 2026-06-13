// components/shared/DashboardShell.jsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { LogoutButton } from './LogoutButton'

const BRAND = (
  <>
    MAD <span className="text-[#F5A623]">Graphix</span>
  </>
)

/**
 * Responsive sidebar + topbar shell shared by every role dashboard.
 * Desktop (lg+): sidebar is static and always visible.
 * Mobile: sidebar is off-canvas; a hamburger in the topbar toggles it.
 *
 *   <DashboardShell navItems={ADMIN_NAV_ITEMS} profile={profile} roleLabel="Administrator">
 *     {children}
 *   </DashboardShell>
 */
export function DashboardShell({ navItems, profile, roleLabel, accent = '#F5A623', children }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Lock background scroll + allow Esc to close while the drawer is open
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen])

  const initials = profile?.full_name
    ?.split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="flex h-screen overflow-hidden bg-[#0D0D1A]">
      {/* Mobile overlay */}
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10
          bg-[#13131F] transition-transform duration-300 ease-in-out
          lg:static lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-white/10 px-5">
          <span className="text-lg font-bold tracking-tight text-white">{BRAND}</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={18} color={active ? accent : '#9ca3af'} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="flex-shrink-0 border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3">
            <div
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold text-black"
              style={{ backgroundColor: accent }}
            >
              {initials || '?'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{profile?.full_name}</p>
              <p className="text-xs capitalize text-gray-500">{roleLabel ?? profile?.role}</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 flex-shrink-0 items-center gap-4 border-b border-white/10 px-4 lg:hidden">
          <button onClick={() => setIsOpen(true)} className="text-gray-300 hover:text-white" aria-label="Open menu">
            <Menu size={24} />
          </button>
          <span className="text-base font-semibold text-white">{BRAND}</span>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}