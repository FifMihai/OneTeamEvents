"use client";
import React from 'react';
import EventCard from './EventCard'; 

interface EventsWrapperProps {
  events: any[];
  onEventClick: (event: any) => void; 
  onDelete: (id: string) => void; // ADAUGĂ ACEASTA
  onEdit: (event: any) => void;   // ADAUGĂ ACEASTA
}

const EventsWrapper: React.FC<EventsWrapperProps> = ({ events, onEventClick, onDelete, onEdit }) => {
  
  if (!events || events.length === 0) {
    return <div className="text-center text-gray-500 py-10">Nu există evenimente momentan.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((eventItem, index) => (
        <div 
            key={eventItem.id || index} 
            className="hover:scale-[1.02] transition-transform duration-200"
        >
            <EventCard 
                event={eventItem} 
                onOpenDetails={() => onEventClick(eventItem)}
                onDelete={onDelete} // PASĂM FUNCȚIA
                onEdit={onEdit}     // PASĂM FUNCȚIA
            />
        </div>
      ))}
    </div>
  );
};

export default EventsWrapper;