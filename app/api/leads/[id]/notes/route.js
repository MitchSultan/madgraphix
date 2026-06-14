import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const supabase = await supabaseServer();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Insert Note
    const { data: note, error } = await supabase
      .from('notes')
      .insert({
        lead_id: id,
        author_id: user.id,
        content
      })
      .select()
      .single();

    if (error) throw error;

    // Log Activity
    await supabase.from('activities').insert({
      lead_id: id,
      actor_id: user.id,
      type: 'note_added',
      metadata: { note_id: note.id }
    });

    return NextResponse.json({ success: true, note });
  } catch (error) {
    console.error('Note Add Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
