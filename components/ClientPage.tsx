"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { EventModal } from "./EventModal";
import EventsWrapper from "./EventsWrapper";
import SearchBar from "./SearchBar";
import CreateEventModal from "./CreateEventModal"; // Importă noul modal
import { PlusCircle, Heart, LayoutGrid } from "lucide-react";

export default function ClientPage({ initialEvents }: { initialEvents: any[] }) {
  // --- STATE-URI ---
  const [events, setEvents] = useState(initialEvents);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"all" | "favorites">("all");
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // Actualizăm favoritele din localStorage la intervale sau la montare
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavoriteIds(saved);
  }, []);

  // --- FILTRARE LOGICĂ ---
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (viewMode === "favorites") {
      return matchesSearch && favoriteIds.includes(event.id);
    }
    return matchesSearch;
  });

  const handleAddEvent = (newEvent: any) => {
    setEvents([newEvent, ...events]); // Adăugăm local evenimentul nou
  };

  return (
    <main className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* HEADER */}
      <div className="pt-12 pb-6 text-center">
        <h1 className="text-5xl font-extrabold text-blue-500 mb-3 tracking-tight">
          OneTeamEvents <span className="animate-pulse">🎓</span>
        </h1>
        <p className="text-gray-400 text-lg">Evenimentele tale din campus, într-un singur loc.</p>
      </div>

      {/* CONTROALE: Search + Add + Tabs */}
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-2/3">
            <SearchBar onSearch={setSearchTerm} />
          </div>
          
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition shadow-lg w-full md:w-auto justify-center"
          >
            <PlusCircle className="w-5 h-5" /> Adaugă Eveniment
          </button>
        </div>

        {/* TABS PENTRU FILTRARE */}
        <div className="flex justify-center gap-4 border-b border-gray-800 pb-2">
          <button 
            onClick={() => setViewMode("all")}
            className={`flex items-center gap-2 pb-2 px-4 transition ${viewMode === 'all' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          >
            <LayoutGrid className="w-4 h-4" /> Toate
          </button>
          <button 
            onClick={() => {
              // Refresh la favorite din localStorage înainte de a schimba view-ul
              setFavoriteIds(JSON.parse(localStorage.getItem("favorites") || "[]"));
              setViewMode("favorites");
            }}
            className={`flex items-center gap-2 pb-2 px-4 transition ${viewMode === 'favorites' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-500'}`}
          >
            <Heart className="w-4 h-4" /> Favorite ({favoriteIds.length})
          </button>
        </div>
      </div>

      {/* GRID EVENIMENTE */}
      <div className="max-w-7xl mx-auto p-10">
         <EventsWrapper 
            events={filteredEvents} 
            onEventClick={setSelectedEvent} 
         />
      </div>

      {/* MODALE */}
      <CreateEventModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onAdd={handleAddEvent}
      />

      <EventModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />

      <ThemeToggle theme={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
    </main>
  );
}