import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  // "Distrugem" cookie-ul suprascriindu-l
  // Trebuie să aibă EXACT același 'path' ca la Login
  cookieStore.set('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0), // Îl expirăm în anul 1970
    maxAge: 0,            // Moare instant
    path: '/',            // <--- Fără asta, nu poate șterge cookie-ul global!
    sameSite: 'lax'
  });

  return NextResponse.json({ success: true });
}