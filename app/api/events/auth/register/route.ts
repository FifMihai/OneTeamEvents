import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validare simpla
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Lipsesc date (email, parola, nume)" }, { status: 400 });
    }

    // Verificam daca exista deja
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Acest email este deja folosit!" }, { status: 409 });
    }

    // Criptam parola
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cream userul
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "STUDENT", 
      },
    });

    return NextResponse.json({ message: "Cont creat cu succes!" }, { status: 201 });

  } catch (error) {
    console.error("Registration error:", error); // E util sa vezi eroarea in loguri
    return NextResponse.json({ error: "Eroare server" }, { status: 500 });
  }
}