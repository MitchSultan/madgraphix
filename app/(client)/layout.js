// import { requireRole } from '@/lib/auth/requireRole'
// import ClientSidebar from '@/components/client/ClientSidebar'

export default async function ClientLayout({ children }) {
  // const { profile } = await requireRole('client')

  return (
    <div className="flex h-screen bg-white">
      {/* <ClientSidebar profile={profile} /> */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {children}
      </main>
    </div>
  )
}