import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const excludeRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/forget-password",
    "500",
  ];

  const token: any = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const hasToken = token && token?.user?.access_token ? true : false;

  if (!hasToken && !excludeRoutes.includes(path)) {
    const signInUrl = new URL("/auth/login", request.url);
    signInUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname + request.nextUrl.search,
    );
    return NextResponse.redirect(signInUrl);
  }

  if (excludeRoutes.includes(path)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
