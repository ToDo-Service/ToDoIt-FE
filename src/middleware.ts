import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.KAKAO_CLIENT_SECRET;

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  console.log("미들웨어 진입");

  // 로그인 했을 경우에만 토큰이 존재합니다.
  const session = await getToken({ req, secret, raw: true });

  console.log(session);
  const { pathname } = req.nextUrl;

  if (session) {
    return NextResponse.redirect(new URL("/main", req.url));
  } else {
    return console.log("로그인 안되어 있음");
  }
}

export const config = {
  matcher: ["/auth/signup"],
};
