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

      // Setăm cookie simplu, fără 'secure' complicat pentru localhost
      (await cookies()).set('auth_token', token, {
        httpOnly: true,
        secure: false, // Punem false ca să meargă sigur pe Localhost
        maxAge: 86400,
        path: '/',
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Date incorecte" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Eroare server" }, { status: 500 });
  }
}