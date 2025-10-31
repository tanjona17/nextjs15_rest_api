import { NextResponse } from "next/server";
import { authentification } from "@/app/middlewares/api/authMiddleware";
import { middlewareLogs } from "./app/middlewares/api/middlewareLogs";

//export const runtime = "experimental-edge";  // explicitly run on Edge
export const config = { matcher: "/api/:path*" };

export default async function middleware(request: Request) {
  const publicPaths = ["/api/login", "/api/register",];
  const { pathname } = new URL(request.url);

  if (publicPaths.includes(pathname)) return NextResponse.next();

  
  const auth = await authentification(request);

  if (!auth?.isValid) {
    return new NextResponse(
      JSON.stringify({ message: "Unauthorized: Invalid or missing token" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  return NextResponse.next();
}
