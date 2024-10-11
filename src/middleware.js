import { NextResponse } from 'next/server';

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("sessionToken");

  // If no token is found, treat the user as unauthenticated
  if (!token) {
    // localStorage.removeItem("user");

    // Redirect unauthenticated users trying to access /wp-admin to the login page
    if (pathname.startsWith("/wp-admin") && pathname !== "/wp-admin/login") {
      return NextResponse.redirect(new URL("/wp-admin/login", req.url));
    }
    // Continue if the path is not restricted
    return NextResponse.next();
  }

//   console.log('Token in middleware:', token);

  // If token is invalid or expired
  if (!token) {
    // Redirect to home page if the user is trying to access protected admin routes
    if (pathname.startsWith("/wp-admin") && pathname !== "/wp-admin/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Redirect logged-in users away from the login page
//   if (userSession && pathname === "/wp-admin/login") {
  if (token && pathname === "/wp-admin/login") {
    return NextResponse.redirect(new URL("/wp-admin", req.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/wp-admin/:path*",
    "/wp-admin/login",
  ],
};
