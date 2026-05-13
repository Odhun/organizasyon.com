import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/routing'
import { NextRequest } from 'next/server'

const intlProxy = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
})

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Admin routes bypass intl proxy
  if (pathname.startsWith('/admin')) {
    return
  }

  return intlProxy(request)
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
}