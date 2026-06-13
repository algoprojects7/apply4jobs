import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected route prefixes and the role required to access them
const PROTECTED_ROUTES: { prefix: string; role: string }[] = [
  { prefix: '/candidate', role: 'candidate' },
  { prefix: '/employer',  role: 'employer'  },
  { prefix: '/admin',     role: 'admin'     },
];

// Routes that should redirect to dashboard if already logged in
const AUTH_ROUTES = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('session_token')?.value;

  // ── 1. Check if this is a protected dashboard route ─────────────────────
  const protectedRoute = PROTECTED_ROUTES.find(r => pathname.startsWith(r.prefix));

  if (protectedRoute) {
    // No session cookie at all → redirect to login
    if (!sessionToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      loginUrl.searchParams.set('reason', 'unauthenticated');
      return NextResponse.redirect(loginUrl);
    }

    // Validate the session token against the DB via our internal API
    // (Edge middleware can't use Prisma directly, so we call the /api/auth/me route)
    try {
      const meUrl = new URL('/api/auth/me', request.url);
      const meRes = await fetch(meUrl.toString(), {
        headers: {
          // Forward the session cookie so the API can read it
          cookie: `session_token=${sessionToken}`,
        },
        // Important: don't follow redirects inside middleware
        redirect: 'manual',
      });

      if (!meRes.ok) {
        // API error → clear cookie and send to login
        const loginUrl = new URL('/login', request.url);
        if (meRes.status === 401) {
          loginUrl.searchParams.set('redirect', pathname);
          loginUrl.searchParams.set('reason', 'session_expired');
        } else {
          loginUrl.searchParams.set('reason', 'session_error');
        }
        const res = NextResponse.redirect(loginUrl);
        res.cookies.delete('session_token');
        return res;
      }

      const data = await meRes.json();

      // Session expired or invalid
      if (data.status !== 'authenticated') {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        loginUrl.searchParams.set('reason', 'session_expired');
        const res = NextResponse.redirect(loginUrl);
        res.cookies.delete('session_token');
        return res;
      }

      const userRole: string = data.user?.role;

      // Role mismatch — user is authenticated but wrong role for this section
      if (userRole !== protectedRoute.role) {
        // Redirect them to their own dashboard
        const correctDashboard =
          userRole === 'candidate' ? '/candidate/dashboard'
          : userRole === 'employer'  ? '/employer/dashboard'
          : '/admin/dashboard';

        return NextResponse.redirect(new URL(correctDashboard, request.url));
      }

      // ✅ Authenticated + correct role — allow through, attach role header
      const response = NextResponse.next();
      response.headers.set('x-user-role', userRole);
      response.headers.set('x-user-id', data.user?.id ?? '');
      return response;

    } catch {
      // Network / parse error during validation
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('reason', 'auth_error');
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete('session_token');
      return res;
    }
  }

  // ── 2. Auth pages: redirect already-logged-in users to their dashboard ──
  if (AUTH_ROUTES.some(r => pathname.startsWith(r)) && sessionToken) {
    try {
      const meUrl = new URL('/api/auth/me', request.url);
      const meRes = await fetch(meUrl.toString(), {
        headers: { cookie: `session_token=${sessionToken}` },
        redirect: 'manual',
      });

      if (meRes.ok) {
        const data = await meRes.json();
        if (data.status === 'authenticated') {
          const role: string = data.user?.role;
          const dashboard =
            role === 'candidate' ? '/candidate/dashboard'
            : role === 'employer'  ? '/employer/dashboard'
            : '/admin/dashboard';
          return NextResponse.redirect(new URL(dashboard, request.url));
        }
      }
    } catch {
      // Let them through to login/register if check fails
    }
  }

  // ── 3. All other routes — pass through ──────────────────────────────────
  return NextResponse.next();
}

// Apply middleware only to dashboard + auth pages (skip API, static assets, etc.)
export const config = {
  matcher: [
    '/candidate/:path*',
    '/employer/:path*',
    '/admin/:path*',
    '/login',
    '/register',
  ],
};
