"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createEventInDb, deleteEventFromDb, updateEventInDb } from "../app/actions";
import { ThemeToggle } from "./ThemeToggle";
import { EventModal } from "./EventModal";
import EventsWrapper from "./EventsWrapper";
import SearchBar from "./SearchBar";
import CreateEventModal from "./CreateEventModal";
import EditEventModal from "./EditEventModal";
import { PlusCircle, Heart, LayoutGrid, UserCheck, LogOut } from "lucide-react";

interface ClientPageProps {
  initialEvents: any[];
  currentUser: {
    id: number;
    name: string;
    email: string;
  };
}

export default function ClientPage({ initialEvents, currentUser }: ClientPageProps) {
  const router = useRouter();
  
  // ID-ul utilizatorului (număr)
  const currentUserId = currentUser.id;

  const [events, setEvents] = useState(initialEvents);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<any | null>(null);
  
  const [viewMode, setViewMode] = useState<"all" | "favorites" | "participating">("all");
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [participatingIds, setParticipatingIds] = useState<string[]>([]);

  // Actualizăm evenimentele când serverul trimite date noi
  useEffect(() => {
    setEvents(initialEvents);
  }, [initialEvents]);

  const refreshData = () => {
    const savedFavs = JSON.parse(localStorage.getItem("favorites") || "[]");
    const savedParts = JSON.parse(localStorage.getItem("participations") || "[]");
    setFavoriteIds(savedFavs);
    setParticipatingIds(savedParts);
  };

  useEffect(() =>
  {
    refreshData();

    // Ascultăm semnalul de actualizare de la orice componentă (EventCard)
    window.addEventListener("favoritesUpdated", refreshData);
    
    return () => 
      window.removeEventListener("favoritesUpdated", refreshData);
  }, []);

  // --- LOGOUT ROBUST (Modificat pentru securitate) ---
  const handleLogout = async () => {
    try {
      // 1. Cerem serverului să șteargă cookie-ul
      await fetch('/api/auth/logout', { method: 'POST' });
      
      // 2. Forțăm o reîncărcare completă a paginii către Login.
      // Asta șterge memoria cache a browserului și previne intrarea cu butonul "Back".
      window.location.href = '/login'; 
    } catch (error) {
      console.error("Eroare la logout", error);
    }
  };

  // --- DELETE ---
  const handleDeleteEvent = async (id: number) => { 
    if (window.confirm("Ești sigur că vrei să ștergi acest eveniment?")) {
      const result = await deleteEventFromDb(id);
      
      if (result.success) {
        router.refresh(); 
      } else {
        alert(result.message || "Eroare la ștergere");
      }
    }
  };

  // --- EDIT ---
  const handleEditEvent = (event: any) => {
    setEventToEdit(event);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedEvent: any) => {
    const result = await updateEventInDb(updatedEvent);
    if (result.success) {
      setIsEditModalOpen(false);
      setEventToEdit(null);
      router.refresh();
    } else {
      alert(result.message || "Nu poți edita evenimentul altcuiva!");
    }
  };

  // --- ADD ---
  const handleAddEvent = async (newEvent: any) => {
    const response = await createEventInDb(newEvent);

    if (response.success) {
      setIsCreateModalOpen(false);
      router.refresh();
    } else {
      alert("Eroare: Evenimentul nu s-a putut salva.");
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
      if (viewMode === "favorites") {
      return matchesSearch && favoriteIds.map(String).includes(String(event.id));
      }
    
     if (viewMode === "participating") {
      return matchesSearch && participatingIds.map(String).includes(String(event.id));
      }
    return matchesSearch;
  });

  return (
    <main className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* HEADER */}
      <header className="bg-white/5 backdrop-blur-md border-b border-gray-200 dark:border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
         <div className="flex items-center gap-2">
           <span className="text-2xl">🎓</span>
           <span className="font-bold text-xl hidden sm:block text-blue-500">OneTeamEvents</span>
         </div>

         <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-800 dark:text-white">{currentUser.name}</p>
              <p className="text-xs text-gray-400">{currentUser.email}</p>
            </div>
            
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
               {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
            </div>

            <button 
              onClick={handleLogout}
              className="p-2 ml-2 text-red-400 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition border border-transparent hover:border-red-500/20" 
              title="Deconectare"
            >
              <LogOut size={20} />
            </button>
         </div>
      </header>

      {/* TITLU */}
      <div className="pt-8 pb-8 text-center">
        <h1 className="text-5xl md:text-6xl font-black text-blue-500 mb-4 tracking-tighter">
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
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-[1.8rem] font-bold transition-all shadow-lg active:scale-95 whitespace-nowrap w-full md:w-auto justify-center"
          >
            <PlusCircle className="w-5 h-5" /> Adaugă Eveniment
          </button>
        </div>

        {/* TABS */}
        <div className="flex justify-center gap-4 md:gap-10 mt-12 border-b border-gray-200 dark:border-white/5 pb-1">
          <button onClick={() => { refreshData(); setViewMode("all") }} className={`flex items-center gap-2 pb-3 px-4 text-xs font-bold transition-all relative ${viewMode === 'all' ? 'text-blue-500' : 'text-gray-500'}`}>
            <LayoutGrid className="w-4 h-4" /> Toate
            {viewMode === 'all' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full" />}
          </button>
          
          <button onClick={() => { refreshData(); setViewMode("favorites"); }} className={`flex items-center gap-2 pb-3 px-4 text-xs font-bold transition-all relative ${viewMode === 'favorites' ? 'text-red-500' : 'text-gray-500'}`}>
            <Heart className={`w-4 h-4 ${viewMode === 'favorites' ? 'fill-current' : ''}`} /> Favorite ({favoriteIds.length})
            {viewMode === 'favorites' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 rounded-full" />}
          </button>

          <button onClick={() => { refreshData(); setViewMode("participating"); }} className={`flex items-center gap-2 pb-3 px-4 text-xs font-bold transition-all relative ${viewMode === 'participating' ? 'text-green-500' : 'text-gray-500'}`}>
            <UserCheck className="w-4 h-4" /> Participări ({participatingIds.length})
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
           currentUserId={currentUserId} // Trimitem ca numar
         />
      </div>

      {/* MODALELE */}
      <CreateEventModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onAdd={handleAddEvent} 
      />
      
      <EditEventModal 
        isOpen={isEditModalOpen} 
        onClose={() => { setIsEditModalOpen(false); setEventToEdit(null); }} 
        onSave={handleSaveEdit} 
        event={eventToEdit} 
      />
      
      <EventModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
        onParticipationChange={refreshData} 
      />
      
      <ThemeToggle theme={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
    </main>
  );
}