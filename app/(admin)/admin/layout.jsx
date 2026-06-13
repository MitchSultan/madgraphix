import { DashboardShell } from "@/components/dashboard/shell"

export default function AdminDashboardLayout({
  children,
}) {
  return (
    <DashboardShell role="admin">
      {children}
    </DashboardShell>
  )
}
