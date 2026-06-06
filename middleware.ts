import createMiddleware from 'next-intl/middleware'
import { routing } from './src/i18n/routing'
import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  try {
    const intlMiddleware = createMiddleware(routing)
    return intlMiddleware(request)
  } catch (e) {
    const msg = e instanceof Error ? e.message + '\n' + e.stack : String(e)
    return new NextResponse(msg, { status: 500, headers: { 'content-type': 'text/plain' } })
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico).*)'],
}
