import { NextResponse } from 'next/server';
import { supabaseServer } from '@/app/lib/supabase/server';

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { assigned_to } = body; // user uuid

    const supabase = await supabaseServer();
    
    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Update Assignment
    const { error } = await supabase
      .from('leads')
      .update({ assigned_to })
      .eq('id', id);

    if (error) throw error;

    // Log Activity
    await supabase.from('activities').insert({
      lead_id: id,
      actor_id: user.id,
      type: 'assigned',
      metadata: { assigned_to }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Assignment Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
