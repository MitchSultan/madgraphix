// Clean, centered auth layout — no sidebar
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0D0D1A] flex items-center justify-center p-4">
      {children}
    </div>
  )
}