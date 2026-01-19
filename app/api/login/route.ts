import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email_username, password } = await request.json();
    const client = await pool.connect();
    
    // Căutăm userul în tabelul 'users'
    const result = await client.query(
      'SELECT * FROM users WHERE (email = $1 OR username = $1) AND password = $2',
      [email_username, password]
    );
    
    client.release();

    if (result.rows.length > 0) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Cont inexistent sau parolă greșită" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Eroare de conexiune la bază" }, { status: 500 });
  }
}