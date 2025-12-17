"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { EventModal } from "./EventModal"; // Asigura-te ca importul e bun (scos EventData daca nu e exportat, sau lasat daca e)
import EventsWrapper from "./EventsWrapper";

interface ClientPageProps {
  initialEvents: any[]; 
}

export default function ClientPage({ initialEvents }: ClientPageProps) {
  // --- 1. SANITIZARE DATE (FIX EROARE) ---
  // Transformăm data din obiect Date în String (ISO) pentru a nu crăpa Reactul.
  // Aceasta variabila 'safeEvents' o vom folosi peste tot mai jos.
  const safeEvents = initialEvents.map((event) => ({
    ...event,
    // Dacă 'date' este un obiect Date real, îl facem string. 
    // Dacă e deja string, îl lăsăm așa.
    date: new Date(event.date).toISOString(), 
  }));

  // --- LOGICA DARK MODE ---
  const [isDarkMode, setIsDarkMode] = useState(true);

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

  // --- LOGICA MODAL ---
  // Folosim 'any' temporar la state daca nu ai interfata EventData exportata, 
  // dar ideal e sa folosesti interfata definita.
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#121212]' : 'bg-gray-100'}`}>
      
      {/* HEADER */}
      <div className="pt-10 text-center">
        <h1 className="text-4xl font-bold text-blue-500 mb-2">
          OneTeamEvents 🎓
        </h1>
        <p className="text-gray-400">Evenimentele tale din campus, toate într-un singur loc.</p>
      </div>

      {/* COMPONENTA DE AFIȘARE - Folosim safeEvents aici! */}
      <div className="p-10">
         <EventsWrapper 
            events={safeEvents} 
            onEventClick={setSelectedEvent} 
         />
      </div>

      {/* THEME TOGGLE */}
      <ThemeToggle 
        theme={isDarkMode} 
        toggleTheme={handleToggleTheme} 
      />

      {/* MODALUL - Acum va primi un event cu data string, deci nu va mai crăpa */}
      <EventModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />

    </main>
  );
}