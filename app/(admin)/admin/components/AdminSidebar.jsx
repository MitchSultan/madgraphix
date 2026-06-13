// components/admin/AdminSidebar.jsx
'use client'

import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  FileText,
  ScrollText,
  Settings,
} from 'lucide-react'
import { DashboardShell } from './DashboardShell'

const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Users', href: '/admin/dashboardusers', icon: Users },
  { label: 'Orders', href: '/admin/dashboard/orders', icon: ShoppingCart },
  { label: 'Products', href: '/admin/dashboard/products', icon: Package },
  { label: 'Invoices', href: '/admin/dashboard/invoices', icon: FileText },
  { label: 'Audit Log', href: '/admin/dashboard/audit-log', icon: ScrollText },
  { label: 'Settings', href: '/admin/dashboard/settings', icon: Settings },
]

export function AdminSidebar({ profile, children }) {
  return (
    <DashboardShell navItems={ADMIN_NAV_ITEMS} profile={profile} roleLabel="Administrator">
      {children}
    </DashboardShell>
  )
}