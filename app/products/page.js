import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProductCatalog from './ProductCatalog'

export const metadata = {
  title: 'Products | MAD Graphix',
  description: 'Browse and order custom printing products'
}

export default async function ProductsPage() {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  return <ProductCatalog />
}
