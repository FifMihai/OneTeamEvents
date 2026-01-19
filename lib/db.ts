import { Pool } from 'pg';

let conn: Pool | undefined;

if (!conn) {
  // Verificăm dacă link-ul există. Dacă nu, aruncăm o eroare clară.
  if (!process.env.DATABASE_URL) {
    throw new Error("❌ EROARE CRITICĂ: Variabila DATABASE_URL lipsește din .env.local");
  }

  conn = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    connectionTimeoutMillis: 5000 // 5 secunde timeout
  });
}

export default conn!;