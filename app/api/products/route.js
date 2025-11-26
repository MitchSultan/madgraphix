import { NextResponse } from 'next/server'
import { getProducts } from '@/lib/supabase/products'

// GET all active products (for clients)
export async function GET() {
  try {
    const products = await getProducts(true) // Only active products
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
