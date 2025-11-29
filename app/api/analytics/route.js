import { supabaseServer } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// GET analytics data
export async function GET() {
  try {
    const supabase = await supabaseServer();
    
    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Calculate statistics
    const totalViews = data.length;
    const uniqueVisitors = new Set(data.map(a => a.visitor_id)).size;
    
    const locationCounts = data.reduce((acc, item) => {
      acc[item.location] = (acc[item.location] || 0) + 1;
      return acc;
    }, {});
    
    const topLocations = Object.entries(locationCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([location, count]) => ({ location, count }));

    const pageCounts = data.reduce((acc, item) => {
      acc[item.page_path] = (acc[item.page_path] || 0) + 1;
      return acc;
    }, {});
    
    const topPages = Object.entries(pageCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([page, count]) => ({ page, count }));

    return NextResponse.json({
      totalViews,
      uniqueVisitors,
      topLocations,
      topPages,
      recentViews: data.slice(0, 20),
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST track page view
export async function POST(request) {
  try {
    const supabase = await supabaseServer();
    const body = await request.json();
    
    const { visitor_id, location, page_path, user_agent } = body;

    const { data, error } = await supabase
      .from('analytics')
      .insert([{
        visitor_id,
        location,
        page_path,
        user_agent,
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
