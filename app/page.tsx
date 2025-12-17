import pool from '@/lib/db'; 
import EventsWrapper from '../components/EventsWrapper'; 
import ThemeToggle from '../components/ThemeToggle';


async function getEvents() {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY date ASC');
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
      
      {/* Wrapper-ul cu evenimente */}
      <EventsWrapper events={events} />

      {/* Butonul de Dark Mode */}
      <ThemeToggle />
    </main>
  );
}