import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/supabase/profiles'
import { getOrderStats } from '@/lib/supabase/orders'

// GET order statistics (admin only)
export async function GET() {
  try {
    const admin = await isAdmin()
    
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }
    
    const stats = await getOrderStats()
    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
