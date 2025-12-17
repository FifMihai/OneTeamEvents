"use client";
import { MapPin, Calendar, Heart } from "lucide-react";
import { useState, useEffect } from "react";

export default function EventCard({ 
  event, 
  onOpenDetails 
}: { 
  event: any; 
  onOpenDetails: (e: any) => void; 
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Verificăm dacă evenimentul este la favorite
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favorites.includes(event.id)) {
      setIsFavorite(true);
    }
  }, [event.id]);

  // Funcție pentru formatarea datei (o folosim și la afișare, și la trimiterea spre modal)
  const formattedDate = new Date(event.date).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter((id: string) => id !== event.id);
    } else {
      newFavorites = [...favorites, event.id];
    }

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  // Funcție sigură pentru deschiderea detaliilor
  const handleOpenDetails = () => {
    // AICI ESTE REPARAȚIA PENTRU EROARE:
    // Creăm o copie a evenimentului unde 'date' este sigur un String (formattedDate),
    // nu un obiect Date. Astfel, Modalul nu va mai crăpa.
    const safeEvent = {
      ...event,
      date: formattedDate // Trimitem data gata formatată ca text
    };
    onOpenDetails(safeEvent);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 border border-gray-100 flex flex-col h-full">
      <div className="relative h-48 bg-gray-200">
        <img 
          src={event.image || "/placeholder.jpg"} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <button 
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:scale-110 transition"
        >
          <Heart 
            className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} 
          />
        </button>
      </div>

      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
          
          <div className="text-sm text-gray-500 space-y-1 mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              {event.location}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              {/* Afișăm variabila formatată */}
              {formattedDate}
            </div>
          </div>
        </div>

        <button 
          onClick={handleOpenDetails}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Detalii
        </button>
      </div>
    </div>
  );
}