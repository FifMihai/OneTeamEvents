import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. Luăm token-ul din cookie-uri
  const token = request.cookies.get('auth_token')?.value

  // 2. Definim care sunt rutele publice (unde ai voie fără cont)
  // Adăugăm '/login', '/register' și '/reset' (dacă ai resetare parolă)
  const publicPaths = ['/login', '/register', '/reset']
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname)

  // 3. LOGICA DE PROTECȚIE:
  
  // A. Dacă userul NU e logat și încearcă să intre pe o pagină privată (Dashboard, Home, etc.)
  if (!token && !isPublicPath) {
    // Îl trimitem forțat la Login
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // B. Dacă userul E DEJA logat și încearcă să intre iar pe Login sau Register
  if (token && isPublicPath) {
    // Îl trimitem direct în Dashboard (nu are sens să se logheze iar)
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // C. Altfel, lăsăm cererea să treacă mai departe
  return NextResponse.next()
}

// Aici configurăm pe ce rute să NU ruleze middleware-ul (imagini, api, fișiere statice)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - media (folderul tau cu imagini png)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|media).*)',
  ],
}