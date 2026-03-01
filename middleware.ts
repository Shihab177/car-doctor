import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware function – mandatory
export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  if (token) {
    return NextResponse.next();
  }else{
     return NextResponse.redirect(new URL("/login", req.url));
  }
}
export const config = {
  matcher: ["/my-booking", "/my-booking/:path*", "/checkout/:path*"],
};
