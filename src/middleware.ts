import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/routing'
import { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
})

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Admin routes bypass intl middleware
  if (pathname.startsWith('/admin')) {
    return
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
}
