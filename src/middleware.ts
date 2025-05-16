import type { NextRequest } from "next/server"

import { NextResponse } from "next/server"

import { ORIGIN } from "./constants/domain"

const allowedOrigins = ORIGIN

const corsOptions = {
  "Access-Control-Allow-Methods": "GET",
}

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin") ?? ""
  const isAllowedOrigin = allowedOrigins.includes(origin)

  const isPreflight = request.method === "OPTIONS"

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }

  const response = NextResponse.next()

  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin)
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: "/api/:path*",
}
