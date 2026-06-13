// // import { createServerClient } from "@supabase/ssr";
// // import { NextResponse } from "next/server";

// // export async function proxy(request) {
// //   let response = NextResponse.next({
// //     request: {
// //       headers: request.headers,
// //     },
// //   });

// //   const supabase = createServerClient(
// //     process.env.NEXT_PUBLIC_SUPABASE_URL,
// //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
// //     {
// //       cookies: {
// //         getAll() {
// //           return request.cookies.getAll();
// //         },
// //         setAll(cookiesToSet) {
// //           cookiesToSet.forEach(({ name, value, options }) =>
// //             request.cookies.set(name, value)
// //           );
// //           response = NextResponse.next({
// //             request: {
// //               headers: request.headers,
// //             },
// //           });
// //           cookiesToSet.forEach(({ name, value, options }) =>
// //             response.cookies.set(name, value, options)
// //           );
// //         },
// //       },
// //     }
// //   );

// //   const {
// //     data: { user },
// //   } = await supabase.auth.getUser();

// //   // Protect /dashboard routes
// //   if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
// //     const loginUrl = request.nextUrl.clone();
// //     loginUrl.pathname = '/login';
// //     return NextResponse.redirect(loginUrl);
// //   }

// //   // Redirect /login to /dashboard if already logged in
// //   if (request.nextUrl.pathname.startsWith('/login') && user) {
// //     const dashboardUrl = request.nextUrl.clone();
// //     dashboardUrl.pathname = '/dashboard';
// //     return NextResponse.redirect(dashboardUrl);
// //   }

// //   return response;
// // }

// // export const config = {
// //   matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
// // };


// // middleware.js
// import { createServerClient } from '@supabase/ssr'
// import { NextResponse } from 'next/server'

// // Route → who can access it
// const ROLE_ROUTES = {
//   '/admin':  ['admin'],
//   '/staff':  ['admin', 'staff'],
//   '/portal': ['admin', 'staff', 'client'],
// }

// // Where each role goes after login
// const ROLE_HOME = {
//   admin:  '/admin/dashboard',
//   staff:  '/staff/dashboard',
//   client: '/portal/dashboard',
// }

// // Routes that don't need auth
// const PUBLIC_ROUTES = ['/login', '/set-password', '/error']

// export async function proxy(request) {
//   let response = NextResponse.next({ request })
//   const { pathname } = request.nextUrl

//   // Skip static assets
//   if (
//     pathname.startsWith('/_next') ||
//     pathname.startsWith('/api/health') ||
//     pathname.includes('.')
//   ) {
//     return response
//   }

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     {
//       cookies: {
//         getAll: () => request.cookies.getAll(),
//         setAll: (cookiesToSet) => {
//           cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
//           response = NextResponse.next({ request })
//           cookiesToSet.forEach(({ name, value, options }) =>
//             response.cookies.set(name, value, options)
//           )
//         },
//       },
//     }
//   )

//   // Always call getUser() — refreshes session cookie if needed
//   const { data: { user } } = await supabase.auth.getUser()

//   // --- Authenticated user hitting a public route ---
//   const isPublicRoute = PUBLIC_ROUTES.some(r => pathname.startsWith(r))
//   if (user && isPublicRoute) {
//     const { data: profile } = await supabase
//       .from('profiles')
//       .select('role')
//       .eq('id', user.id)
//       .single()

//     return NextResponse.redirect(
//       new URL(ROLE_HOME[profile?.role] ?? '/login', request.url)
//     )
//   }

//   // --- Protected route checks ---
//   for (const [routePrefix, allowedRoles] of Object.entries(ROLE_ROUTES)) {
//     if (!pathname.startsWith(routePrefix)) continue

//     // Not logged in
//     if (!user) {
//       const url = new URL('/login', request.url)
//       url.searchParams.set('redirect', pathname)
//       return NextResponse.redirect(url)
//     }

//     // Check role
//     const { data: profile } = await supabase
//       .from('profiles')
//       .select('role, is_active')
//       .eq('id', user.id)
//       .single()

//     if (!profile?.is_active) {
//       await supabase.auth.signOut()
//       return NextResponse.redirect(new URL('/login?error=account_disabled', request.url))
//     }

//     if (!allowedRoles.includes(profile?.role)) {
//       return NextResponse.redirect(
//         new URL(ROLE_HOME[profile?.role] ?? '/login', request.url)
//       )
//     }

//     break
//   }

//   return response
// }

// export const config = {
//   matcher: [
//     '/((?!_next/static|_next/image|favicon.ico|icons|images).*)',
//   ],
// }




// proxy.js (middleware)
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import { ROLE_ROUTES, ROLE_HOME, PUBLIC_ROUTES } from './lib/roles'

export async function proxy(request) {
  let response = NextResponse.next({ request })
  const { pathname } = request.nextUrl

  // Skip static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/health') ||
    pathname.includes('.')
  ) {
    return response
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh / get the user
  const { data: { user } } = await supabase.auth.getUser()

  // --- Authenticated user visiting a public route ---
  const isPublicRoute = PUBLIC_ROUTES.some(r => pathname.startsWith(r))
  if (user && isPublicRoute) {
    // If we're already on /login, do not redirect – let the page handle it
    if (pathname === '/login') {
      return response
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    // Missing profile → sign out and show error
    if (!profile) {
      await supabase.auth.signOut()
      const url = new URL('/login', request.url)
      url.searchParams.set('error', 'missing_profile')
      return NextResponse.redirect(url)
    }

    // Otherwise, redirect to role home
    const destination = ROLE_HOME[profile.role]
    if (destination) {
      return NextResponse.redirect(new URL(destination, request.url))
    }

    // Fallback – should not happen if role is defined, but be safe
    return NextResponse.redirect(new URL('/error', request.url))
  }

  // --- Protected route checks ---
  for (const [routePrefix, allowedRoles] of Object.entries(ROLE_ROUTES)) {
    if (!pathname.startsWith(routePrefix)) continue

    // Not logged in → send to /login with redirect query
    if (!user) {
      const url = new URL('/login', request.url)
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }

    // Fetch profile with role and active status
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, is_active')
      .eq('id', user.id)
      .single()

    // No profile → sign out
    if (!profile) {
      await supabase.auth.signOut()
      const url = new URL('/login', request.url)
      url.searchParams.set('error', 'missing_profile')
      return NextResponse.redirect(url)
    }

    // Inactive account
    if (!profile.is_active) {
      await supabase.auth.signOut()
      return NextResponse.redirect(new URL('/login?error=account_disabled', request.url))
    }

    // Wrong role
    if (!allowedRoles.includes(profile.role)) {
      const fallback = ROLE_HOME[profile.role] ?? '/login?error=unauthorized'
      return NextResponse.redirect(new URL(fallback, request.url))
    }

    // Access allowed – break loop and continue
    break
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons|images).*)',
  ],
}