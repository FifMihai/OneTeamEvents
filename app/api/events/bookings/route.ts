import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST: Studentul se inscrie la un eveniment
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Primim ID-ul studentului si ID-ul evenimentului de la frontend
    const { userId, eventId } = body; 

    // 1. Verificam daca e deja inscris (sa nu se inscrie de 2 ori)
    const existingBooking = await prisma.booking.findFirst({
      where: {
        userId: userId,
        eventId: eventId
      }
    });

    if (existingBooking) {
      return NextResponse.json({ message: "Ești deja înscris!" }, { status: 400 });
    }

    // 2. Salvam inscrierea in baza de date
    const newBooking = await prisma.booking.create({
      data: {
        userId: userId,
        eventId: eventId
      }
    });

    return NextResponse.json({ message: "Te-ai înscris cu succes!", booking: newBooking }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: 'Eroare la înscriere.' }, { status: 500 });
  }
}