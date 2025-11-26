import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ClientOrders from './ClientOrders'

export const metadata = {
  title: 'My Orders | MAD Graphix',
  description: 'View your order history'
}

export default async function OrdersPage() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  return <ClientOrders />
}
