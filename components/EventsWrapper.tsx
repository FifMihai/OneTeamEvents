"use client";
import React from 'react';
import EventCard from './EventCard'; 

interface EventsWrapperProps {
  events: any[];
  onEventClick: (event: any) => void; 
  onDelete: (id: number) => void; // Schimbat in number
  onEdit: (event: any) => void;
  currentUserId: number; // Schimbat in number
}

const EventsWrapper: React.FC<EventsWrapperProps> = ({ events, onEventClick, onDelete, onEdit, currentUserId }) => {
  if (!events || events.length === 0) {
    return <div className="text-center text-gray-500 py-10">Nu există evenimente momentan.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((eventItem, index) => (
        <div key={eventItem.id || index} className="hover:scale-[1.02] transition-transform duration-200">
            <EventCard 
                event={eventItem} 
                onOpenDetails={() => onEventClick(eventItem)}
                // Convertim ID-ul la string pentru funcția veche de delete, daca e nevoie, sau il lasam number
                onDelete={() => onDelete(eventItem.id)}
                onEdit={onEdit}
                // VERIFICARE: Comparăm număr cu număr
                isOwner={Number(eventItem.creatorId) === Number(currentUserId)}
            />
        </div>
      ))}
    </div>
  );
};

export default EventsWrapper;