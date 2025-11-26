import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/supabase/profiles'
import { updateOrderStatus } from '@/lib/supabase/orders'

// PUT update order status (admin only)
export async function PUT(request, { params }) {
  try {
    const admin = await isAdmin()
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }
    
    const { status } = await request.json()
    const order = await updateOrderStatus(params.id, status)
    
    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
