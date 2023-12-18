export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const access_token = request.cookies.get("token_access");
  const refresh_token = request.cookies.get("token_ref");
  const isTokenNoValid =
    access_token?.value === "undefined" || refresh_token?.value === "undefined";

  if (url.pathname === "/") {
    if (isTokenNoValid) {
      url.pathname = "/auth/signin";
      return NextResponse.redirect(url);
    }
    url.pathname = "/posts";
    return NextResponse.redirect(url);
  }
}

export const config = { matcher: ["/", "/posts", "/posts/:path*"] };
