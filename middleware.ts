import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hasVisited = request.cookies.get('hasVisited');
  const { pathname } = request.nextUrl;

  // If it's the first visit and not already on the telegram-check page, redirect to telegram-check
  if (!hasVisited && pathname !== '/telegram-check') {
    const response = NextResponse.redirect(new URL('/telegram-check', request.url));
    response.cookies.set('hasVisited', 'true', { maxAge: 60 * 60 * 24 * 30 }); // 30 days
    return response;
  }

  // For subsequent visits, if on the root path, redirect to streak-celebration
  if (hasVisited && pathname === '/') {
    return NextResponse.redirect(new URL('/streak-celebration', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};