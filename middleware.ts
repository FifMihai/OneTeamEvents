import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. Luăm token-ul din cookie-uri
  const token = request.cookies.get('auth_token')?.value

  // 2. Definim rutele publice
  const publicPaths = ['/login', '/register', '/reset']
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname)

  // 3. LOGICA DE PROTECȚIE:
  
  // A. Dacă userul NU e logat și încearcă să intre pe o pagină privată
  // Îl trimitem la Login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // B. (MODIFICAT) Am ELIMINAT redirecționarea inversă (Login -> Dashboard).
  // Aceasta cauza bucla infinită când token-ul era invalid.
  // Acum, dacă ai un token vechi și intri pe /login, te lăsăm să stai acolo să te reloghezi.
if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|media).*)',
  ],
}