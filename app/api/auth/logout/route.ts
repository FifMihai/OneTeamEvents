import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });

  // Ștergem cookie-ul auth_token setându-l cu o dată expirată
  response.cookies.set('auth_token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return response;
}