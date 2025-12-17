"use client"; // Asta e OBLIGATORIU aici

import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { EventModal, EventData } from "./EventModal";
import EventsWrapper from "./EventsWrapper"; // Verifică dacă importul e corect pentru tine

interface ClientPageProps {
  initialEvents: any[]; // Aici vin evenimentele din baza de date
}

export default function ClientPage({ initialEvents }: ClientPageProps) {
  // --- LOGICA DARK MODE ---
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Efectul care chiar schimbă culoarea site-ului
  useEffect(() => {
    // Verificăm dacă suntem în browser
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

  // --- LOGICA MODAL (Opțional, dacă vrei să îl controlezi de aici) ---
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#121212]' : 'bg-gray-100'}`}>
      
      {/* HEADER / TITLU */}
      <div className="pt-10 text-center">
        <h1 className="text-4xl font-bold text-blue-500 mb-2">
          OneTeamEvents 🎓
        </h1>
        <p className="text-gray-400">Evenimentele tale din campus, toate într-un singur loc.</p>
      </div>

      {/* COMPONENTA CARE AFIȘEAZĂ EVENIMENTELE */}
      {/* Presupun că EventsWrapper știe să afișeze cardurile dacă îi dai lista */}
      <div className="p-10">
         <EventsWrapper events={initialEvents} onEventClick={setSelectedEvent} />
      </div>

      {/* BUTONUL DE DARK MODE */}
      <ThemeToggle 
        theme={isDarkMode} 
        toggleTheme={handleToggleTheme} 
      />

      {/* MODALUL */}
      <EventModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />

    </main>
  );
}