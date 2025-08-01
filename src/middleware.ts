import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {

  const hostname = req.nextUrl.hostname;

  // Skip redirect for localhost and 127.0.0.1
  const isLocalhost = hostname === "localhost";

  //https enforcement
  if (!isLocalhost && req.nextUrl.protocol === "http:") {
    const httpsUrl = new URL(req.url);
    httpsUrl.protocol = 'https:';
    return NextResponse.redirect(httpsUrl);
  }

  return NextResponse.next();
}

// Configuration to apply the middleware
export const config = {
  matcher: ["/:path*"],  // All paths are matched
};
