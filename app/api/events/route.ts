import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Initializam clientul Prisma (legatura cu baza de date)
const prisma = new PrismaClient();

// 1. Functia POST - Pentru CREAREA unui eveniment nou
export async function POST(request: Request) {
  try {
    // Primim datele trimise de frontend (titlu, data, etc.)
    const body = await request.json();

    // Le salvam in baza de date
    const newEvent = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        location: body.location,
        date: new Date(body.date), // Convertim textul in Data calendaristica
        category: body.category,   // Sport, Social, etc.
        organizer: body.organizer || "Anonim",
      },
    });

    // Raspundem cu succes si trimitem evenimentul creat inapoi
    return NextResponse.json(newEvent, { status: 201 });

  } catch (error) {
    console.error("Eroare la creare eveniment:", error);
    return NextResponse.json(
      { error: 'Nu am putut crea evenimentul. Verifica datele.' },
      { status: 500 }
    );
  }
}

// 2. Functia GET - Pentru a VEDEA toate evenimentele (Listare)
export async function GET() {
  try {
    // Luam toate evenimentele din baza de date, ordonate dupa data (cele noi sus)
    const events = await prisma.event.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(events, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Eroare la incarcarea evenimentelor' }, { status: 500 });
  }
}