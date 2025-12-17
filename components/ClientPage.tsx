"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { EventModal } from "./EventModal";
import EventsWrapper from "./EventsWrapper";
import SearchBar from "./SearchBar"; // <--- 1. IMPORTĂ COMPONENTA

interface ClientPageProps {
  initialEvents: any[]; 
}

export default function ClientPage({ initialEvents }: ClientPageProps) {
  // --- SANITIZARE DATE ---
  const safeEvents = initialEvents.map((event) => ({
    ...event,
    date: new Date(event.date).toISOString(), 
  }));

  // --- STATE-URI ---
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  
  // 2. STATE PENTRU CĂUTARE
  const [searchTerm, setSearchTerm] = useState(""); 

  // --- LOGICA DARK MODE ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      const html = document.documentElement;
      if (isDarkMode) {
        html.classList.add("dark");
        html.style.colorScheme = "dark";
      } else {
        html.classList.remove("dark");
        html.style.colorScheme = "light";
      }
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // 3. LOGICA DE FILTRARE
  // Dacă avem text în search, filtrăm evenimentele. Dacă nu, le arătăm pe toate.
  const filteredEvents = safeEvents.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#121212]' : 'bg-gray-100'}`}>
      
      {/* HEADER */}
      <div className="pt-10 pb-6 text-center">
        <h1 className="text-4xl font-bold text-blue-500 mb-2">
          OneTeamEvents 🎓
        </h1>
        <p className="text-gray-400">Evenimentele tale din campus, toate într-un singur loc.</p>
      </div>

      {/* 4. AICI ADAUGI SEARCH BAR-UL CA SĂ FIE VIZIBIL */}
      <div className="px-4">
        <SearchBar onSearch={setSearchTerm} />
      </div>

      {/* COMPONENTA DE AFIȘARE - Trimitem 'filteredEvents' acum! */}
      <div className="p-10">
         <EventsWrapper 
            events={filteredEvents} // <--- Trimitem lista filtrată
            onEventClick={setSelectedEvent} 
         />
      </div>

      <ThemeToggle 
        theme={isDarkMode} 
        toggleTheme={handleToggleTheme} 
      />

      <EventModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />

    </main>
  );
}