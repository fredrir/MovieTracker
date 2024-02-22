import { request } from "http";
import { NextResponse } from "next/server";
import { usePathname } from "next/navigation";

export async function middleware() {
  // Set a flag for client-side to check localStorage
  const response = NextResponse.next();
  response.headers.set("x-check-access-token", "true");
  return response;
}
