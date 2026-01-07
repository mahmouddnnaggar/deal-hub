/**
 * Proxy for authentication and i18n routing
 */

import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from '@/i18n/navigation';
import { PROTECTED_ROUTES } from '@/core/config';

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get locale from pathname
  const pathnameLocale = pathname.split('/')[1];
  const isValidLocale = ['en', 'ar'].includes(pathnameLocale);
  const locale = isValidLocale ? pathnameLocale : 'en';
  
  // Remove locale from pathname for route matching
  const pathnameWithoutLocale = isValidLocale
    ? pathname.replace(`/${locale}`, '') || '/'
    : pathname;

  // Check for auth token in cookies (Auth.js v5 uses authjs.session-token)
  // Note: We only check for the session token, not validate it
  // Full session validation happens in protected page components
  const sessionToken = 
    request.cookies.get('authjs.session-token')?.value ||
    request.cookies.get('__Secure-authjs.session-token')?.value;
  
  const isAuthenticated = !!sessionToken && sessionToken.length > 10;

  // Check if route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathnameWithoutLocale.startsWith(route)
  );

  // Redirect to login if accessing protected route while not authenticated
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Note: We intentionally do NOT redirect authenticated users away from auth routes
  // This avoids false positives from stale/invalid tokens and lets the auth pages
  // handle their own redirect logic client-side after proper session validation

  // Apply i18n middleware
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files
  // - Internal Next.js routes
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
