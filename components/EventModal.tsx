"use client";

import { X, Calendar, MapPin } from "lucide-react";

export default function EventModal({ event, onClose }: { event: any, onClose: () => void }) {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-200">
          <X className="w-6 h-6 text-gray-700" />
        </button>

        {/* Daca ai imagini reale, scoate comentariul de mai jos */}
        <div className="h-64 bg-gray-200 w-full relative">
           {event.image && <img src={event.image} alt={event.title} className="w-full h-full object-cover" />}
        </div>

        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h2>
          <div className="flex gap-4 text-gray-600 mb-4">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {event.location}</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {event.date}</span>
          </div>
          <p className="text-gray-700 mb-6">{event.description || "Fără descriere."}</p>
        </div>
      </div>
    </div>
  );
}