import { NextResponse } from "next/server";
import { authentification } from "@/app/middlewares/api/authMiddleware";

// ✅ Protect all /api/* routes
export const config = {
  matcher: "/api/:path*",
};

export default function middleware(request: Request) {
  // Don’t block login or register routes
  const publicPaths = ["/api/login", "/api/register"];
  const { pathname } = new URL(request.url);

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // ✅ Run token authentication
  const auth = authentification(request);

  if (!auth?.isValid) {
    return new NextResponse(
      JSON.stringify({ message: "Unauthorized: Invalid or missing token" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // ✅ Allow request if valid
  return NextResponse.next();
}
