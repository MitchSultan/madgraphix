import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/supabase/profiles'
import { getProducts, createProduct } from '@/lib/supabase/products'

// GET all products
export async function GET() {
  try {
    const admin = await isAdmin()
    const products = await getProducts(!admin) // Non-admin sees only active products
    
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST create new product (admin only)
export async function POST(request) {
  try {
    const admin = await isAdmin()
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }
    
    const productData = await request.json()
    const product = await createProduct(productData)
    
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
