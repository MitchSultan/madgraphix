import { supabaseBrowser } from '@/lib/supabase/client';

/**
 * Track a page view in the analytics database
 * @param {string} pagePath - The path of the page being viewed
 */
export async function trackPageView(pagePath) {
  try {
    const supabase = supabaseBrowser();
    
    // Get or create visitor ID
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem('visitor_id', visitorId);
    }

    // Get location from IP
    let location = 'Unknown';
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      location = `${data.city}, ${data.country_name}`;
    } catch (error) {
      console.error('Error fetching location:', error);
    }

    // Track the page view
    const { error } = await supabase.from('analytics').insert({
      visitor_id: visitorId,
      location,
      page_path: pagePath,
      user_agent: navigator.userAgent,
    });

    if (error) {
      console.error('Error tracking page view:', error);
    }
  } catch (error) {
    console.error('Analytics error:', error);
  }
}

/**
 * Get analytics statistics
 * @returns {Promise<Object>} Analytics data
 */
export async function getAnalytics() {
  try {
    const supabase = supabaseBrowser();
    
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return {
      totalViews: data.length,
      uniqueVisitors: new Set(data.map(a => a.visitor_id)).size,
      locations: data.reduce((acc, item) => {
        acc[item.location] = (acc[item.location] || 0) + 1;
        return acc;
      }, {}),
      recentViews: data.slice(0, 10),
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return null;
  }
}
