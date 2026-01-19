import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email și parola sunt obligatorii" },
        { status: 400 }
      );
    }

    // 1. Căutăm userul după email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // 2. Verificăm dacă userul există ȘI dacă parola se potrivește cu hash-ul din bază
    if (user && (await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Cont inexistent sau parolă greșită" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Eroare internă server" },
      { status: 500 }
    );
  }
}