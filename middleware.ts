import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hasVisited = request.cookies.get('hasVisited');
  const { pathname } = request.nextUrl;

  // If it's the first visit and not already on the telegram-check page, redirect to telegram-check
  if (!hasVisited && pathname !== '/telegram-check') {
    return NextResponse.redirect(new URL('/telegram-check', request.url));
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