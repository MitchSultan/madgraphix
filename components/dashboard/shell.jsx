// import * as React from "react"
// import { AppSidebar } from "@/components/dashboard/app-sidebar"
// import { SiteHeader } from "@/components/dashboard/site-header"
// import { SidebarInset, SidebarProvider } from "@/components/dashboard/ui/sidebar"

// export function DashboardShell({
//   children,
//   role = "admin",
// }) {
//   return (
//     <SidebarProvider
//       style={
//         {
//           "--sidebar-width": "calc(var(--spacing) * 72)",
//           "--header-height": "calc(var(--spacing) * 12)",
//         }
//       }
//     >
//       <AppSidebar variant="inset" role={role} />
//       <SidebarInset>
//         <SiteHeader />
//         <div className="flex flex-1 flex-col">
//           {children}
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   )
// }


// components/dashboard/shell.jsx
"use client"

import * as React from "react"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SiteHeader } from "@/components/dashboard/site-header"
import { SidebarInset, SidebarProvider } from "@/components/dashboard/ui/sidebar"

export function DashboardShell({
  children,
  role = "admin",
  user = { name: "Guest", email: "", avatar: "/default-avatar.png" },
}) {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" role={role} user={user} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}