import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/supabase/profiles'
import { updateProduct, deleteProduct } from '@/lib/supabase/products'

// PUT update product (admin only)
export async function PUT(request, { params }) {
  try {
    const admin = await isAdmin()
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }
    
    const updates = await request.json()
    const product = await updateProduct(params.id, updates)
    
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE product (admin only)
export async function DELETE(request, { params }) {
  try {
    const admin = await isAdmin()
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }
    
    await deleteProduct(params.id)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
