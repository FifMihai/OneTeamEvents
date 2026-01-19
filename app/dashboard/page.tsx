import pool from '@/lib/db'; // Conexiunea ta la baza de date
import ClientPage from '../../components/ClientPage';

// Aceasta e o componentă de SERVER (fără "use client")
export default async function Home() {
  
  // 1. Luăm datele din bază (Codul tău de backend)
  let events = [];
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM events'); // Sau cum ai tu query-ul
    events = result.rows;
    client.release();
  } catch (err) {
    console.error('Eroare la baza de date:', err);
    // Poți lăsa lista goală sau pune date dummy dacă crapă baza
  }

  // 2. Trimitem datele la componenta de Client care le afișează
  return (
    <ClientPage initialEvents={events} />
  );
}