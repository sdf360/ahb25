import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const rateLimit = 10 // Number of requests
const rateLimitPeriod = 60 * 1000 // 1 minute

const ipRequests = new Map<string, { count: number; startTime: number }>()

export function middleware(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1"
  const now = Date.now()

  if (ipRequests.has(ip)) {
    const { count, startTime } = ipRequests.get(ip)!

    if (now - startTime > rateLimitPeriod) {
      ipRequests.set(ip, { count: 1, startTime: now })
    } else if (count >= rateLimit) {
      return new NextResponse("Too Many Requests", { status: 429 })
    } else {
      ipRequests.set(ip, { count: count + 1, startTime })
    }
  } else {
    ipRequests.set(ip, { count: 1, startTime: now })
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/api/:path*",
}

