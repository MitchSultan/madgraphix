// import { requireRole } from '@/lib/auth/requireRole'
// import StaffSidebar from '@/components/staff/StaffSidebar'

export default async function StaffLayout({ children }) {
  // const { profile } = await requireRole('admin', 'staff')

  return (
    <div className="flex h-screen bg-[#0D0D1A]">
      {/* <StaffSidebar profile={profile} /> */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}