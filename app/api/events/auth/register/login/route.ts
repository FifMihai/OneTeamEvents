import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { userId: user.id, email: user.email }, 
        process.env.JWT_SECRET || "secret", 
        { expiresIn: '1d' }
      );

      // --- CHEIA SUCCESULUI ---
      // Setăm cookie-ul explicit pe rădăcină ('/')
      // Setăm secure: false pentru localhost (ca să nu facă figuri)
      const cookieStore = await cookies();
      cookieStore.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // False pe localhost
        maxAge: 86400,
        path: '/', // <--- ASTA E CRITIC
        sameSite: 'lax'
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Date incorecte" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Eroare server" }, { status: 500 });
  }
}