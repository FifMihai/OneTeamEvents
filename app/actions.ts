'use server'

import pool from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createEventInDb(eventData: any) {
  const client = await pool.connect();
  
  try {
    // 1. Scriem în baza de date
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
    
    // 2. Spunem Next.js să actualizeze pagina pentru toți utilizatorii
    revalidatePath('/');
    
    return { success: true, newEvent: result.rows[0] };
    
  } catch (error) {
    console.error('Eroare la salvare:', error);
    return { success: false };
  } finally {
    client.release();
  }
}