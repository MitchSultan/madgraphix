import { supabaseServer } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// GET /api/blogs/[slug] - Fetch single blog by slug (public if published)
export async function GET(request, context) {
  try {
    const supabase = await supabaseServer();
    const params = await context.params;
    const { slug } = params;
    
    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser();
    let isAdmin = false;
    
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      isAdmin = profile?.role === 'admin';
    }
    
    // Fetch blog
    let query = supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug);
    
    // Only show published blogs for non-admins
    if (!isAdmin) {
      query = query.eq('published', true);
    }
    
    const { data: blog, error } = await query.single();
    
    if (error || !blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/blogs/[slug] - Update blog (admin only)
export async function PATCH(request, context) {
  try {
    const supabase = await supabaseServer();
    const params = await context.params;
    const { slug } = params;
    
    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Check admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    // Get request body
    const body = await request.json();
    const updates = {};
    
    // Only include provided fields
    if (body.title !== undefined) updates.title = body.title;
    if (body.slug !== undefined) updates.slug = body.slug;
    if (body.excerpt !== undefined) updates.excerpt = body.excerpt;
    if (body.content !== undefined) updates.content = body.content;
    if (body.author !== undefined) updates.author = body.author;
    if (body.featured_image !== undefined) updates.featured_image = body.featured_image;
    if (body.tags !== undefined) updates.tags = body.tags;
    if (body.published !== undefined) updates.published = body.published;
    
    // Update blog
    const { data: blog, error } = await supabase
      .from('blogs')
      .update(updates)
      .eq('slug', slug)
      .select()
      .single();
    
    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json({ error: 'New slug already exists' }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/blogs/[slug] - Delete blog (admin only)
export async function DELETE(request, context) {
  try {
    const supabase = await supabaseServer();
    const params = await context.params;
    const { slug } = params;
    
    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Check admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    // Delete blog
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('slug', slug);
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
