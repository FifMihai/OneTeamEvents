import pool from '@/lib/db'; 
// ATENTIE: Aici era problema. Folosim @ ca sa fim siguri ca gaseste folderul.
import EventsWrapper from '../components/EventsWrapper'; 

async function getEvents() {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY date ASC');
    // Convertim datele ca sa nu avem erori
    return JSON.parse(JSON.stringify(result.rows));
  } catch (error) {
    console.error("Eroare la baza de date:", error);
    return [];
  }
}

export default async function Home() {
  const events = await getEvents();

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4">
          OneTeamEvents 🎓
        </h1>
        <p className="text-lg text-slate-900">
          Evenimentele tale din campus, toate într-un singur loc.
        </p>
      </div>
      
      {/* Aici chemam componenta wrapper care contine Search, Pop-up si Carduri */}
      <EventsWrapper events={events} />
    </main>
  );
}