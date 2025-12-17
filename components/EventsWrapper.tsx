"use client";

import { useState } from "react";
import EventCard from "./EventCard";
import SearchBar from "./SearchBar";
import EventModal from "./EventModal";

export default function EventsWrapper({ events }: { events: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Filtram evenimentele
  const filteredEvents = events.filter((event) =>
    event.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Search Bar */}
      <SearchBar onSearch={setSearchTerm} />

      {/* Lista Carduri */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredEvents.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            onOpenDetails={(evt) => setSelectedEvent(evt)} 
          />
        ))}
      </div>

      {/* Mesaj daca e gol */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          Nu am găsit evenimente.
        </div>
      )}

      {/* Pop-up Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </>
  );
}