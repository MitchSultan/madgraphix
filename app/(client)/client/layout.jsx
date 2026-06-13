import { DashboardShell } from "@/components/dashboard/shell"

export default function ClientDashboardLayout({
  children,
}) {
  return (
    <DashboardShell role="client">
      {children}
    </DashboardShell>
  )
}
