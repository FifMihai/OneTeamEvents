"use client";
import { X, MapPin, Users, CheckCircle2, UserPlus } from "lucide-react";
import { useState } from "react";

export function EventModal({ event, onClose }: { event: any; onClose: () => void }) {
  // Starea pentru butonul de participare (locală pentru acum)
  const [isParticipating, setIsParticipating] = useState(false);

  if (!event) return null;

  // Listă simulată de participanți pe care Artiom o va popula din DB mai târziu
  const mockParticipants = ["Mihai F.", "Artiom B.", "Raul S.", "Andreea D."];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden relative flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[90vh]">
        
        {/* Buton Închidere */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 dark:bg-black/20 rounded-full z-20 transition backdrop-blur-md">
          <X className="w-6 h-6 text-white" />
        </button>

        {/* PARTEA STÂNGĂ: Imagine și Titlu */}
        <div className="md:w-1/2 relative h-64 md:h-auto bg-gray-200">
           <img 
             src={event.image || "/placeholder.jpg"} 
             alt={event.title} 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
           <div className="absolute bottom-6 left-6 right-6">
             <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase mb-2 inline-block">
               {event.category || "General"}
             </span>
             <h2 className="text-3xl font-bold text-white leading-tight">{event.title}</h2>
           </div>
        </div>

        {/* PARTEA DREAPTĂ: Detalii și Acțiuni */}
        <div className="md:w-1/2 p-8 overflow-y-auto flex flex-col bg-white dark:bg-[#1e1e1e]">
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-500" />
              </div>
              <span className="font-medium">{event.location}</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Despre Eveniment</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {event.description || "Acest eveniment nu are încă o descriere detaliată adăugată de organizator."}
            </p>
          </div>

          {/* SECȚIUNE PARTICIPANȚI */}
          <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
                <Users className="w-4 h-4" /> Participanți ({isParticipating ? mockParticipants.length + 1 : mockParticipants.length})
              </h3>
            </div>
            
            <div className="flex -space-x-3 mb-6">
              {mockParticipants.map((p, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-[#1e1e1e] bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold" title={p}>
                  {p[0]}
                </div>
              ))}
              {isParticipating && (
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#1e1e1e] bg-green-500 flex items-center justify-center text-white text-xs font-bold animate-bounce" title="Tu">
                  Tu
                </div>
              )}
            </div>

            <button
              onClick={() => setIsParticipating(!isParticipating)}
              className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                isParticipating 
                ? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/10" 
                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/20"
              }`}
            >
              {isParticipating ? (
                <>Anulează Participarea</>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" /> Vreau să particip
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}