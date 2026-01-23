import { supabaseServer } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// GET /api/case-studies - Fetch all published case studies (public) or all (admin)
export async function GET(request) {
  try {
    const supabase = await supabaseServer();
    
    // Check if user is admin to show drafts
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
    
    // Build query
    let query = supabase
      .from('case_studies')
      .select('*')
      .order('created_at', { ascending: false });
    
    // Only show published case studies for non-admins
    if (!isAdmin) {
      query = query.eq('published', true);
    }
    
    const { data: caseStudies, error } = await query;
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ caseStudies });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/case-studies - Create new case study (admin only)
export async function POST(request) {
  try {
    const supabase = await supabaseServer();
    
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
    const { 
      title, slug, client, category, description,
      challenge, solution, results,
      featured_image, gallery_images, tags, published 
    } = body;
    
    // Validate required fields
    if (!title || !slug || !client || !category || !description || !challenge || !solution || !results) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Insert case study
    const { data: caseStudy, error } = await supabase
      .from('case_studies')
      .insert({
        title,
        slug,
        client,
        category,
        description,
        challenge,
        solution,
        results,
        featured_image,
        gallery_images: gallery_images || [],
        tags: tags || [],
        published: published ?? false
      })
      .select()
      .single();
    
    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(caseStudy, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
