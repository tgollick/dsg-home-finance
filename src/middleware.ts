// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

const allowedEmails = ["thomasgollick@gmail.com", "davidgollick@gmail.com"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin")) {
    if (
      !req.auth?.user?.email ||
      !allowedEmails.includes(req.auth.user.email)
    ) {
      const redirectUrl = new URL("/login", req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
