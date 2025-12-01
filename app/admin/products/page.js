import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/supabase/profiles'
import ProductsManagement from './ProductsManagement'

export const metadata = {
  title: 'Product Management | MAD Graphix Admin',
  description: 'Manage products for client orders'
}

export default async function AdminProductsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  const admin = await isAdmin()
  
  if (!admin) {
    redirect('/') // Redirect non-admin users
  }
  
  return <ProductsManagement />
}
