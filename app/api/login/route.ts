import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email și parola sunt obligatorii" }, { status: 400 });
    }

    // 1. Căutăm userul
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // 2. Verificăm parola
    if (user && (await bcrypt.compare(password, user.password))) {
      
      // --- AICI ERA PROBLEMA: Trebuie să generăm Token-ul real ---
      const token = jwt.sign(
        { userId: user.id, email: user.email }, // Ce salvăm în token
        process.env.JWT_SECRET || "secret", 
        { expiresIn: '1d' }
      );

      // 3. Setăm cookie-ul direct de pe server (Securizat)
      (await cookies()).set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400, // 1 zi
        path: '/',
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Cont inexistent sau parolă greșită" }, { status: 401 });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Eroare internă server" }, { status: 500 });
  }
}