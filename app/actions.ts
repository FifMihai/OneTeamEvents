"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");
  if (!token) return null;
  try {
    return jwt.verify(token.value, process.env.JWT_SECRET || "secret") as any;
  } catch {
    return null;
  }
}

// --- 1. CREATE ---
export async function createEventInDb(eventData: any) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) return { success: false, message: "Trebuie să fii logat!" };

    const newEvent = await prisma.event.create({
      data: {
        title: eventData.title,
        description: eventData.description,
        location: eventData.location,
        date: new Date(eventData.date),
        category: eventData.category,
        imageUrl: eventData.image, 
        organizerId: user.userId, 
      },
    });

    revalidatePath("/dashboard"); 
    return { success: true, newEvent };
  } catch (error) {
    console.error("Create Error:", error);
    return { success: false, message: "Eroare la baza de date" };
  }
}

// --- 2. DELETE ---
export async function deleteEventFromDb(eventId: number) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) return { success: false, message: "Nu ești logat" };

    const event = await prisma.event.findUnique({ where: { id: eventId } });

    if (!event) return { success: false, message: "Evenimentul nu există" };
    
    // Verificăm dacă ești proprietarul
    if (event.organizerId !== user.userId) {
      return { success: false, message: "Nu ai voie să ștergi evenimentul altcuiva!" };
    }

    await prisma.event.delete({ where: { id: eventId } });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Eroare la ștergere" };
  }
}

// --- 3. UPDATE ---
export async function updateEventInDb(eventData: any) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) return { success: false, message: "Nu ești logat" };

    const event = await prisma.event.findUnique({ where: { id: eventData.id } });
    
    if (!event || event.organizerId !== user.userId) {
      return { success: false, message: "Nu ai voie să modifici acest eveniment!" };
    }

    const updated = await prisma.event.update({
      where: { id: eventData.id },
      data: {
        title: eventData.title,
        description: eventData.description,
        location: eventData.location,
        date: new Date(eventData.date),
        category: eventData.category,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, updatedEvent: updated };
  } catch (error) {
    return { success: false, message: "Update eșuat" };
  }
}

// --- 4. JOIN EVENT (Participare) ---
export async function joinEvent(eventId: number) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) return { success: false, message: "Trebuie să fii logat!" };

    // 1. Verificăm dacă userul participă deja
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { participants: true },
    });

    if (!event) return { success: false, message: "Evenimentul nu există." };

    const isAlreadyParticipating = event.participants.some(
      (p) => p.id === user.userId
    );

    if (isAlreadyParticipating) {
      // 2. DACĂ PARTICIPĂ -> ÎL ȘTERGEM (Anulare)
      await prisma.event.update({
        where: { id: eventId },
        data: {
          participants: {
            disconnect: { id: user.userId }
          }
        }
      });
      revalidatePath("/dashboard");
      return { success: true, message: "Participare anulată." };
    } else {
      // 3. DACĂ NU PARTICIPĂ -> ÎL ADĂUGĂM (Înscriere)
      await prisma.event.update({
        where: { id: eventId },
        data: {
          participants: {
            connect: { id: user.userId }
          }
        }
      });
      revalidatePath("/dashboard");
      return { success: true, message: "Te-ai înscris cu succes!" };
    }
  } catch (error) {
    console.error("Join/Leave Error:", error);
    return { success: false, message: "Eroare la procesarea participării." };
  }
}