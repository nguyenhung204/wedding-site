import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization") ?? "";

  if (!authHeader.startsWith("Basic ")) {
    return unauthorized();
  }

  let credentials: string;
  try {
    credentials = atob(authHeader.slice(6));
  } catch {
    return unauthorized();
  }

  // Support passwords that contain ":"
  const colonIdx = credentials.indexOf(":");
  if (colonIdx === -1) return unauthorized();

  const username = credentials.slice(0, colonIdx);
  const password = credentials.slice(colonIdx + 1);

  const validUsername = process.env.ADMIN_USERNAME ?? "admin";
  const validPassword = process.env.ADMIN_PASSWORD ?? "";

  // Refuse to serve admin pages if no password has been configured
  if (!validPassword) return unauthorized();

  if (username !== validUsername || password !== validPassword) {
    return unauthorized();
  }

  return NextResponse.next();
}

function unauthorized() {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Wedding Admin"' },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
