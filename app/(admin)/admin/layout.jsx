// import { DashboardShell } from "@/components/dashboard/shell"

// export default function AdminDashboardLayout({
//   children,
// }) {
//   return (
//     <DashboardShell role="admin">
//       {children}
//     </DashboardShell>
//   )
// }


// app/(admin)/layout.js
import { createClient } from "@/lib/supabase/server"   // server client
import { redirect } from "next/navigation"
import { DashboardShell } from "@/components/dashboard/shell"

export default async function AdminDashboardLayout({ children }) {
  const supabase =  await createClient()

  // 1. Get the authenticated user from the session
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  if (!authUser) {
    redirect("/login")
  }

  // 2. Optionally fetch additional data from 'profiles'
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", authUser.id)
    .single()

  // 3. Build the user object (same shape as your mockup)
  const user = {
    name:
      profile?.full_name ||
      authUser.user_metadata?.full_name ||
      "User",
    email: authUser.email ?? "",
    avatar:
      profile?.avatar_url ||
      authUser.user_metadata?.avatar_url ||
      "/default-avatar.png",
  }

  return (
    <DashboardShell role="admin" user={user}>
      {children}
    </DashboardShell>
  )
}