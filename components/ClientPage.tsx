"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { EventModal } from "./EventModal";
import EventsWrapper from "./EventsWrapper";
import SearchBar from "./SearchBar";
import CreateEventModal from "./CreateEventModal";
import { PlusCircle, Heart, LayoutGrid, UserCheck } from "lucide-react";

export default function ClientPage({ initialEvents }: { initialEvents: any[] }) {
  const [events, setEvents] = useState(initialEvents);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const [viewMode, setViewMode] = useState<"all" | "favorites" | "participating">("all");
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [participatingIds, setParticipatingIds] = useState<string[]>([]);

  // Funcție pentru a sincroniza ID-urile din localStorage
  const refreshData = () => {
    const savedFavs = JSON.parse(localStorage.getItem("favorites") || "[]");
    const savedParts = JSON.parse(localStorage.getItem("participations") || "[]");
    setFavoriteIds(savedFavs);
    setParticipatingIds(savedParts);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleDeleteEvent = (id: string) => {
    if (window.confirm("Ești sigur că vrei să ștergi acest eveniment?")) {
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
      
      const newFavs = favoriteIds.filter(favId => favId !== id);
      localStorage.setItem("favorites", JSON.stringify(newFavs));
      
      const newParts = participatingIds.filter(partId => partId !== id);
      localStorage.setItem("participations", JSON.stringify(newParts));
      
      refreshData();
    }
  };

  const handleEditEvent = (event: any) => {
    alert(`Funcția de editare pentru "${event.title}" va fi implementată în pasul următor!`);
  };

  const handleAddEvent = (newEvent: any) => {
    setEvents([newEvent, ...events]);
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (viewMode === "favorites") {
      return matchesSearch && favoriteIds.includes(event.id);
    }
    if (viewMode === "participating") {
      return matchesSearch && participatingIds.includes(event.id);
    }
    return matchesSearch;
  });

  return (
    <main className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      <div className="pt-16 pb-8 text-center">
        <h1 className="text-5xl md:text-6xl font-black text-blue-500 mb-4 tracking-tighter text-center">
          OneTeamEvents <span className="animate-pulse">🎓</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl font-medium">
          Evenimentele tale din campus, într-un singur loc.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-4 bg-white/5 dark:bg-white/[0.03] p-2 md:p-3 rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-2xl backdrop-blur-xl transition-all">
          <div className="w-full md:flex-1">
            <SearchBar onSearch={setSearchTerm} />
          </div>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-[1.8rem] font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95 whitespace-nowrap w-full md:w-auto justify-center"
          >
            <PlusCircle className="w-5 h-5" /> 
            <span>Adaugă Eveniment</span>
          </button>
        </div>

        <div className="flex justify-center gap-4 md:gap-10 mt-12 border-b border-gray-200 dark:border-white/5 pb-1">
          <button 
            onClick={() => setViewMode("all")}
            className={`flex items-center gap-2 pb-3 px-4 text-xs md:text-sm font-bold transition-all relative ${viewMode === 'all' ? 'text-blue-500' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <LayoutGrid className="w-4 h-4" /> Toate
            {viewMode === 'all' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full" />}
          </button>
          
          <button 
            onClick={() => {
              refreshData();
              setViewMode("favorites");
            }}
            className={`flex items-center gap-2 pb-3 px-4 text-xs md:text-sm font-bold transition-all relative ${viewMode === 'favorites' ? 'text-red-500' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Heart className={`w-4 h-4 ${viewMode === 'favorites' ? 'fill-current' : ''}`} /> 
            Favorite ({favoriteIds.length})
            {viewMode === 'favorites' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 rounded-full" />}
          </button>

          <button 
            onClick={() => {
              refreshData();
              setViewMode("participating");
            }}
            className={`flex items-center gap-2 pb-3 px-4 text-xs md:text-sm font-bold transition-all relative ${viewMode === 'participating' ? 'text-green-500' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <UserCheck className="w-4 h-4" /> 
            Participări ({participatingIds.length})
            {viewMode === 'participating' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 rounded-full" />}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-10">
         <EventsWrapper 
            events={filteredEvents} 
            onEventClick={setSelectedEvent} 
            onDelete={handleDeleteEvent} 
            onEdit={handleEditEvent}     
         />
      </div>

      <CreateEventModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onAdd={handleAddEvent} />
      <EventModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)}
        onParticipationChange={refreshData}
      />
      <ThemeToggle theme={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
    </main>
  );
}