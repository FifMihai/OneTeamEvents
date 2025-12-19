import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Cautam userul
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json({ error: "Email gresit" }, { status: 401 });
    }

    // Verificam parola
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ error: "Parola gresita" }, { status: 401 });
    }

    // Generam TOKEN-ul (Asta vrea colegul tau!)
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    // Trimitem token-ul inapoi
    return NextResponse.json({
      message: "Login reusit!",
      token: token,
      user: { id: user.id, name: user.name, role: user.role }
    });

  } catch (error) {
    return NextResponse.json({ error: "Eroare server" }, { status: 500 });
  }
}