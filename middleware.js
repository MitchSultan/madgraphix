import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function middleware(req) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = req.nextUrl.clone();

  // Protect admin routes - require authentication
  if (!user && url.pathname.startsWith("/admin")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Check if user is admin (from database)
  if (user && url.pathname.startsWith("/admin")) {
    // Check admin status from user_profiles table
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();
    
    if (!profile || !profile.is_admin) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
