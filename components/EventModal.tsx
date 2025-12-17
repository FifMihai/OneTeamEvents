"use client";
import { X, Calendar, MapPin } from "lucide-react";

export function EventModal({ event, onClose }: { event: any; onClose: () => void }) {
  if (!event) return null;

 
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    
    
    return date.toLocaleDateString("ro-RO", {
      weekday: "long", 
      year: "numeric",
      month: "long",   
      day: "numeric",
      hour: "2-digit", 
      minute: "2-digit"
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
        
        {/* Buton X Închidere */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 rounded-full transition z-10"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        {/* Imagine */}
        <div className="h-64 bg-gray-200 relative">
           <img 
             src={event.image || "/placeholder.jpg"} 
             alt={event.title}
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
           <h2 className="absolute bottom-4 left-6 text-3xl font-bold text-white shadow-sm">
             {event.title}
           </h2>
        </div>

        {/* Conținut */}
        <div className="p-6">
          <div className="flex flex-wrap gap-4 mb-6">
            
            {/* DATA FORMATATA FRUMOS AICI */}
            <div className="bg-blue-50 px-4 py-2 rounded-lg flex items-center gap-2 text-blue-700 border border-blue-100">
              <Calendar className="w-5 h-5" />
              <span className="font-medium capitalize">
                {formatDate(event.date)}
              </span>
            </div>

            <div className="bg-pink-50 px-4 py-2 rounded-lg flex items-center gap-2 text-pink-700 border border-pink-100">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">{event.location}</span>
            </div>
          </div>

          <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Descriere eveniment</h3>
            <p>
              {event.description || "Nu există o descriere detaliată pentru acest eveniment."}
            </p>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
            >
              Închide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}