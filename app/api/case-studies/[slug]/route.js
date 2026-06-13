import { supabaseServer } from '@/app/lib/supabase/server';
import { NextResponse } from 'next/server';

// GET /api/case-studies/[slug] - Fetch single case study by slug (public if published)
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
    
    // Fetch case study
    let query = supabase
      .from('case_studies')
      .select('*')
      .eq('slug', slug);
    
    // Only show published case studies for non-admins
    if (!isAdmin) {
      query = query.eq('published', true);
    }
    
    const { data: caseStudy, error } = await query.single();
    
    if (error || !caseStudy) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }
    
    return NextResponse.json(caseStudy);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/case-studies/[slug] - Update case study (admin only)
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
    if (body.client !== undefined) updates.client = body.client;
    if (body.category !== undefined) updates.category = body.category;
    if (body.description !== undefined) updates.description = body.description;
    if (body.challenge !== undefined) updates.challenge = body.challenge;
    if (body.solution !== undefined) updates.solution = body.solution;
    if (body.results !== undefined) updates.results = body.results;
    if (body.featured_image !== undefined) updates.featured_image = body.featured_image;
    if (body.gallery_images !== undefined) updates.gallery_images = body.gallery_images;
    if (body.tags !== undefined) updates.tags = body.tags;
    if (body.published !== undefined) updates.published = body.published;
    
    // Update case study
    const { data: caseStudy, error } = await supabase
      .from('case_studies')
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
    
    if (!caseStudy) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }
    
    return NextResponse.json(caseStudy);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/case-studies/[slug] - Delete case study (admin only)
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
    
    // Delete case study
    const { error } = await supabase
      .from('case_studies')
      .delete()
      .eq('slug', slug);
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ message: 'Case study deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
