import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  // Ștergem cookie-ul de autentificare
  (await cookies()).delete("auth_token");

  return NextResponse.json({ message: "Delogat cu succes" });
}