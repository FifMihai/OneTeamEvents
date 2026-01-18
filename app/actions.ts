'use server'

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';

// 1. Funcția de ADAUGARE
export async function createEventInDb(eventData: any) {
  const client = await pool.connect();
  
  try {
    const sql = `
      INSERT INTO events (title, description, location, date, category, image, "creatorId")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    
    const values = [
      eventData.title,
      eventData.description,
      eventData.location,
      eventData.date,
      eventData.category,
      eventData.image,
      eventData.creatorId
    ];

    const result = await client.query(sql, values);
    revalidatePath('/');
    
    return { success: true, newEvent: result.rows[0] };
    
  } catch (error) {
    console.error('Eroare la salvare:', error);
    return { success: false };
  } finally {
    client.release();
  }
}

// 2. Funcția de ȘTERGERE SECURIZATĂ
export async function deleteEventFromDb(eventId: string, userId: string) {
  const client = await pool.connect();
  try {
    // Trucul de securitate: Ștergem DOAR dacă id-ul evenimentului ȘI id-ul creatorului se potrivesc
    const sql = `DELETE FROM events WHERE id = $1 AND "creatorId" = $2`;
    const result = await client.query(sql, [eventId, userId]);

    // Verificăm dacă s-a șters ceva (dacă nu, înseamnă că nu era evenimentul tău)
    if (result.rowCount === 0) {
      return { success: false, message: "Nu ai permisiunea să ștergi acest eveniment sau el nu există." };
    }

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Eroare la ștergere:', error);
    return { success: false, message: "Eroare server" };
  } finally {
    client.release();
  }
}

// 3. Funcția de EDITARE SECURIZATĂ
export async function updateEventInDb(event: any, userId: string) {
  const client = await pool.connect();
  try {
    // Actualizăm DOAR dacă creatorId din bază este același cu userId-ul tău
    const sql = `
      UPDATE events 
      SET title = $1, description = $2, location = $3, date = $4, category = $5, image = $6
      WHERE id = $7 AND "creatorId" = $8
    `;
    
    const values = [
      event.title, 
      event.description, 
      event.location, 
      event.date, 
      event.category, 
      event.image,
      event.id,
      userId // Cheia de securitate
    ];

    const result = await client.query(sql, values);

    if (result.rowCount === 0) {
      return { success: false, message: "Nu ai permisiunea să editezi acest eveniment." };
    }

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Eroare la editare:', error);
    return { success: false, message: "Eroare server" };
  } finally {
    client.release();
  }
}