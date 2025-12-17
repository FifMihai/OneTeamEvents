import React from 'react';
import EventCard from './EventCard'; 

interface EventsWrapperProps {
  events: any[];
  onEventClick: (event: any) => void; 
}

const EventsWrapper: React.FC<EventsWrapperProps> = ({ events, onEventClick }) => {
  
  if (!events || events.length === 0) {
    return <div className="text-center text-gray-500 py-10">Nu există evenimente momentan.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((eventItem, index) => (
        <div 
            key={eventItem.id || index} 
            // Păstrăm click-ul pe tot cardul (opțional, dar recomandat pentru UX)
            onClick={() => onEventClick(eventItem)}
            className="cursor-pointer hover:scale-[1.02] transition-transform duration-200"
        >
            <EventCard 
                event={eventItem} 
                
                // --- FIXUL ESTE AICI ---
                // Îi dăm funcția pe care o cere obligatoriu
                onOpenDetails={() => onEventClick(eventItem)}
            />
        </div>
      ))}
    </div>
  );
};

export default EventsWrapper;