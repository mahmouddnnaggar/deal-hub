/**
 * Middleware for authentication and i18n routing
 */

import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from '@/i18n/navigation';
import { PROTECTED_ROUTES, AUTH_ROUTES } from '@/core/config';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get locale from pathname
  const pathnameLocale = pathname.split('/')[1];
  const isValidLocale = ['en', 'ar'].includes(pathnameLocale);
  const locale = isValidLocale ? pathnameLocale : 'en';
  
  // Remove locale from pathname for route matching
  const pathnameWithoutLocale = isValidLocale
    ? pathname.replace(`/${locale}`, '') || '/'
    : pathname;

  // Check for auth token in cookies
  const token = request.cookies.get('authjs.session-token')?.value;
  const isAuthenticated = !!token;

  // Check if route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathnameWithoutLocale.startsWith(route)
  );

  // Check if route is auth route
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathnameWithoutLocale.startsWith(route)
  );

  // Redirect to login if accessing protected route while not authenticated
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to home if accessing auth route while authenticated
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

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
