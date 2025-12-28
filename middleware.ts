import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

/*
  Scenario: User is Logged In

  1. Browser: "GET /my-poems"
     Cookies: sb-access-token=abc123, sb-refresh-token=xyz789

  2. Next.js Middleware (middleware.ts):
     → Calls updateSession(request)
     → Creates Supabase client (middleware client)
     → Reads cookies: sb-access-token=abc123
     → Calls supabase.auth.getUser()
     → Supabase: "Token is valid, user is user-123"
     → Checks: Is token about to expire?
     → If yes: Refresh token, set new cookies
     → Returns NextResponse.next() → continue

  3. Server Component (app/my-poems/page.tsx):
     → Calls createClient() from lib/supabase/server
     → Creates Supabase client (server client)
     → Reads cookies (same ones middleware just verified)
     → Queries: supabase.from('poems').select()
     → Supabase: "User is user-123, return their poems"
     → Renders HTML with poems data

  4. Response to Browser:
     → HTML with poems rendered
     → Updated cookies (if token was refreshed)

  5. Browser Renders Page:
     → User sees their poems
     → Stores updated cookies for next request

  Scenario: User is NOT Logged In

  1. Browser: "GET /my-poems"
     Cookies: (none)

  2. Next.js Middleware:
     → Calls updateSession(request)
     → Reads cookies: (none)
     → supabase.auth.getUser() → returns null
     → TODO logic would redirect:
        if (!user && path === '/my-poems') redirect('/login')

  3. Response to Browser:
     → Redirect to /login (never reaches the page component)

*/
