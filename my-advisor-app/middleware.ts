// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define your public routes
const publicRoutes = ['/', '/auth/register', '/auth/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the request path is a public route
  const isPublicRoute = publicRoutes.includes(pathname);

  // If the route is public, allow the request
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check for the authentication token in cookies
  const token = request.cookies.get('token');

  // If token is not present and the route is not public, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // For authenticated users, allow the request
  return NextResponse.next();
}

// Apply middleware to specific paths
export const config = {
  matcher: ['/', '/auth/register', '/auth/login', '/profile'],
};
