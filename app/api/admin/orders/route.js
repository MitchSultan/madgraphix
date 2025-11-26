import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/supabase/profiles'
import { getAllOrders } from '@/lib/supabase/orders'

// GET all orders (admin only)
export async function GET(request) {
  try {
    const admin = await isAdmin()
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }
    
    const { searchParams } = new URL(request.url)
    const filters = {
      status: searchParams.get('status'),
      userId: searchParams.get('userId')
    }
    
    const orders = await getAllOrders(filters)
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
