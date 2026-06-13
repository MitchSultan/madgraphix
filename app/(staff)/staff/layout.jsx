import { DashboardShell } from "@/components/dashboard/shell"

export default function StaffDashboardLayout({
  children,
}) {
  return (
    <DashboardShell role="staff">
      {children}
    </DashboardShell>
  )
}
