import { NextRequest, type NextFetchEvent, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (token && req.nextUrl.pathname.includes("/auth/Login")) {
    return NextResponse.redirect(new URL(`/main`, req.url));
  }

  if (!token && req.nextUrl.pathname.includes("/main")) {
    return NextResponse.redirect(new URL(`/auth/Login`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/Login", "/main"],
};
