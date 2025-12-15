// app/page.tsx
import pool from '@/lib/db'; // Conexiunea la baza de date
import EventCard from '@/components/EventCard'; // Componenta vizuală

// Funcția care aduce datele
async function getEvents() {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY date ASC');
    return result.rows;
  } catch (error) {
    console.error("Eroare la baza de date:", error);
    return [];
  }
}

export default async function Home() {
  const events = await getEvents();

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4">
          OneTeamEvents 🎓
        </h1>
        <p className="text-lg text-slate-900">
          Evenimentele tale din campus, toate într-un singur loc.
        </p>
      </div>
      
      {/* Lista de Evenimente */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {events.map((event: any) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Mesaj dacă e gol */}
      {events.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          Nu există evenimente sau nu s-a putut conecta la baza de date.
        </div>
      )}
    </main>
  );
}
