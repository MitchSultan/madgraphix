import { NextResponse } from 'next/server'
import { createOrder, getUserOrders } from '@/lib/supabase/orders'

// GET user's orders
export async function GET() {
  try {
    const orders = await getUserOrders()
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST create new order
export async function POST(request) {
  try {
    const { notes, items } = await request.json()
    
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Order must contain at least one item' }, { status: 400 })
    }
    
    const order = await createOrder({ notes }, items)
    
    // Trigger email notification via Edge Function
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-order-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ order_id: order.id })
      })
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError)
      // Don't fail the order if email fails
    }
    
    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
