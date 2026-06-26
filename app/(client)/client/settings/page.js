// // // app/(client)/client/settings/page.jsx
// // import { createClient } from '@/lib/supabase/server'
// // import { redirect } from 'next/navigation'
// // import { SettingsForm } from './SettingsForm'

// // export default async function SettingsPage() {
// //   const supabase = await createClient();

// //   // 1. Authenticated user
// //   const {
// //     data: { user: authUser },
// //   } = await supabase.auth.getUser()
// //   if (!authUser) redirect('/login')

// //   // 2. Full profile from the 'profiles' table
// //   const { data: profile, error } = await supabase
// //     .from('profiles')
// //     .select('*')
// //     .eq('id', authUser.id)
// //     .single()

// //   if (error) {
// //     // If no profile exists yet, show a fallback; you could create one automatically
// //     return <p className="p-4 text-red-500">Failed to load profile. Please contact support.</p>
// //   }

// //   // 3. Pass the current values to the client form
// //   return (
// //     <div className="p-6 max-w-xl">
// //       <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
// //       <SettingsForm profile={profile} />
// //     </div>
// //   )
// // }

// import { supabaseServer } from '@/lib/supabase/server';
// import { NextResponse } from 'next/server';

// // GET /api/blogs - Fetch all published blogs (public) or all blogs (admin)
// export async function GET(request) {
//   try {
//     const supabase = await supabaseServer();
//     const { searchParams } = new URL(request.url);
    
//     // Pagination params
//     const page = parseInt(searchParams.get('page') || '1');
//     const limit = parseInt(searchParams.get('limit') || '12');
//     const offset = (page - 1) * limit;
    
//     // Check if user is admin to show drafts
//     const { data: { user } } = await supabase.auth.getUser();
//     let isAdmin = false;
    
//     if (user) {
//       const { data: profile } = await supabase
//         .from('profiles')
//         .select('role')
//         .eq('id', user.id)
//         .single();
//       isAdmin = profile?.role === 'admin';
//     }
    
//     // Build query
//     let query = supabase
//       .from('blogs')
//       .select('*', { count: 'exact' })
//       .order('created_at', { ascending: false });
    
//     // Only show published blogs for non-admins
//     if (!isAdmin) {
//       query = query.eq('published', true);
//     }
    
//     // Apply pagination
//     query = query.range(offset, offset + limit - 1);
    
//     const { data: blogs, error, count } = await query;
    
//     if (error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }
    
//     return NextResponse.json({
//       blogs,
//       pagination: {
//         page,
//         limit,
//         total: count,
//         totalPages: Math.ceil(count / limit)
//       }
//     });
//   } catch (error) {
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

// // POST /api/blogs - Create new blog (admin only)
// export async function POST(request) {
//   try {
//     const supabase = await supabaseServer();
    
//     // Check authentication
//     const { data: { user } } = await supabase.auth.getUser();
    
//     if (!user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }
    
//     // Check admin role
//     const { data: profile } = await supabase
//       .from('profiles')
//       .select('role')
//       .eq('id', user.id)
//       .single();
    
//     if (profile?.role !== 'admin') {
//       return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
//     }
    
//     // Get request body
//     const body = await request.json();
//     const { title, slug, excerpt, content, author, featured_image, tags, published } = body;
    
//     // Validate required fields
//     if (!title || !slug || !excerpt || !content) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }
    
//     // Insert blog
//     const { data: blog, error } = await supabase
//       .from('blogs')
//       .insert({
//         title,
//         slug,
//         excerpt,
//         content,
//         author: author || 'MAD Graphix Team',
//         featured_image,
//         tags: tags || [],
//         published: published ?? false
//       })
//       .select()
//       .single();
    
//     if (error) {
//       if (error.code === '23505') { // Unique constraint violation
//         return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
//       }
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }
    
//     return NextResponse.json(blog, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

import React from 'react'

export default function page() {
  return (
    <div>

        h2
      
    </div>
  )
}
