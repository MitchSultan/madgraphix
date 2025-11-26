import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/supabase/profiles'
import OrdersManagement from './OrdersManagement'

export const metadata = {
  title: 'Order Management | MAD Graphix Admin',
  description: 'Manage client orders'
}

export default async function AdminOrdersPage() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  const admin = await isAdmin()
  
  if (!admin) {
    redirect('/') // Redirect non-admin users
  }
  
  return <OrdersManagement />
}
