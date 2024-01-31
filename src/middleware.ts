import {
  type NextRequest,
  type NextFetchEvent,
  NextResponse,
} from "next/server";
import { getToken } from "next-auth/jwt";
const withAuthList = ["/_next/static/chunks/pages/main.js"];
const withOutAuthList = ["/_next/static/chunks/pages/auth/Login.js"];

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  let isWithAuth = withAuthList.includes(pathname);
  let isWithOutAuth = withOutAuthList.includes(pathname);

  if (isWithAuth && !token) {
    return NextResponse.rewrite(new URL("/auth/Login", req.url));
  } else if (isWithOutAuth && token) {
    return NextResponse.rewrite(new URL("/", req.url));
  }
}

export const config = {
  mathcher: [...withAuthList, ...withOutAuthList],
};
