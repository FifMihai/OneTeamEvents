import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

// Definim tipul pentru Next.js 15
type Params = Promise<{ id: string }>;

const getUserFromToken = (request: Request) => {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) return null;
    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
    return decoded;
  } catch (error) {
    return null;
  }
};

// 1. GET
export async function GET(request: Request, segmentData: { params: Params }) {
  try {
    const params = await segmentData.params;
    
    // FIX: Transformam in numar cu parseInt()
    // Daca folosesti UUID (stringuri lungi), sterge parseInt si lasa doar params.id
    const id = parseInt(params.id); 

    const event = await prisma.event.findUnique({
      where: { id: id },
      include: {
        organizer: { select: { name: true, email: true } }
      }
    });

    if (!event) {
      return NextResponse.json({ error: "Evenimentul nu a fost gasit" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ error: "Eroare server" }, { status: 500 });
  }
}

// 2. DELETE
export async function DELETE(request: Request, segmentData: { params: Params }) {
  try {
    const params = await segmentData.params;
    const id = parseInt(params.id); // <--- FIX AICI

    const user = getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ error: "Nu esti autentificat!" }, { status: 401 });
    }

    const eventToDelete = await prisma.event.findUnique({
      where: { id: id },
    });

    if (!eventToDelete) {
      return NextResponse.json({ error: "Evenimentul nu exista" }, { status: 404 });
    }

    const isOwner = eventToDelete.organizerId === user.userId;
    const isAdmin = user.role === "ADMIN";

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: "Nu ai dreptul sa stergi acest eveniment!" }, { status: 403 });
    }

    await prisma.event.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Eveniment sters cu succes" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Eroare la stergere" }, { status: 500 });
  }
}

// 3. PUT
export async function PUT(request: Request, segmentData: { params: Params }) {
  try {
    const params = await segmentData.params;
    const id = parseInt(params.id); // <--- FIX AICI

    const user = getUserFromToken(request);
    if (!user) return NextResponse.json({ error: "Neautorizat" }, { status: 401 });

    const body = await request.json();
    
    const eventToUpdate = await prisma.event.findUnique({ where: { id: id } });
    
    if (!eventToUpdate) return NextResponse.json({ error: "Nu exista" }, { status: 404 });

    if (eventToUpdate.organizerId !== user.userId && user.role !== "ADMIN") {
      return NextResponse.json({ error: "Nu ai voie sa modifici asta!" }, { status: 403 });
    }

    const updatedEvent = await prisma.event.update({
      where: { id: id },
      data: {
        title: body.title,
        description: body.description,
        location: body.location,
        date: body.date ? new Date(body.date) : undefined,
      },
    });

    return NextResponse.json(updatedEvent);

  } catch (error) {
    return NextResponse.json({ error: "Eroare la update" }, { status: 500 });
  }
}