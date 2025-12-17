import React, { useEffect } from 'react';
import { X } from 'lucide-react'; 

export interface EventData {
  id?: string | number;
  title: string;
  date: string;
  location: string;
  description: string;
  image?: string;
}

interface EventModalProps {
  onClose: () => void;
  event: EventData | null; // Dacă event are date, modalul se deschide
}

export const EventModal: React.FC<EventModalProps> = ({ onClose, event }) => {
  
  // Calculăm isOpen automat: dacă avem event, e deschis
  const isOpen = !!event;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Dacă nu avem eveniment, nu randăm nimic
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white tracking-wide">
            {event.title}
          </h2>
          
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 text-slate-300 space-y-4">
            
            <div className="flex flex-wrap gap-4 text-sm font-semibold text-blue-400">
                <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-1 rounded-md">
                    <span>📅</span>
                    <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-1 rounded-md">
                    <span>📍</span>
                    <span>{event.location}</span>
                </div>
            </div>

            <div className="text-slate-300 leading-relaxed">
                {event.description}
            </div>

        </div>
      </div>
    </div>
  );
};