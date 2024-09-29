import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hasVisited = request.cookies.get('hasVisited');
  const { pathname } = request.nextUrl;

  // If it's the first visit and not already on the home1 page, redirect to home1
  if (!hasVisited && pathname !== '/home1') {
    return NextResponse.redirect(new URL('/home1', request.url));
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