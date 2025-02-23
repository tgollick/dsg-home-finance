// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export default auth(async function middleware(req) {
  const url = req.nextUrl;
  const pathname = url.pathname;
  const isLogin = pathname === "/login";
  const isAdmin = pathname.startsWith("/admin");

  if (!isLogin && !isAdmin) return NextResponse.next();

  const session = req.auth;

  const allowedEmails =
    env.ALLOWED_EMAILS?.split(",")
      .map((email) => email.trim().replace(/['";]/g, ""))
      .filter(Boolean) || [];

  const userEmail = session?.user?.email?.toLowerCase().trim();

  if (session) {
    const isAllowed = userEmail && allowedEmails.includes(userEmail);

    if (isAllowed) {
      return isLogin
        ? NextResponse.redirect(new URL("/admin/dashboard", url))
        : NextResponse.next();
    } else {
      return isAdmin
        ? NextResponse.redirect(new URL("/login", url))
        : NextResponse.next();
    }
  } else if (isAdmin) {
    return NextResponse.redirect(new URL("/login", url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/login", "/admin/:path*"],
};
