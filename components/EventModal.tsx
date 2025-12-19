"use client";
import { X, MapPin, Users, CheckCircle2, UserPlus, Info } from "lucide-react";
import { useState, useEffect } from "react";

export function EventModal({ 
  event, 
  onClose,
  onParticipationChange 
}: { 
  event: any; 
  onClose: () => void;
  onParticipationChange: () => void; 
}) {
  const [isParticipating, setIsParticipating] = useState(false);

  // Verificăm dacă ești înscris la ACEST eveniment specific când se deschide modalul
  useEffect(() => {
    if (event) {
      const participations = JSON.parse(localStorage.getItem("participations") || "[]");
      setIsParticipating(participations.includes(event.id));
    }
  }, [event]);

  if (!event) return null;

  const handleToggleParticipation = () => {
    const participations = JSON.parse(localStorage.getItem("participations") || "[]");
    let newParticipations;

    if (isParticipating) {
      newParticipations = participations.filter((id: string) => id !== event.id);
    } else {
      newParticipations = [...participations, event.id];
    }

    localStorage.setItem("participations", JSON.stringify(newParticipations));
    setIsParticipating(!isParticipating);
    
    // Anunțăm ClientPage că s-a schimbat ceva în listă
    onParticipationChange();
  };

  const mockParticipants = ["Mihai F.", "Artiom B.", "Raul S.", "Andreea D.", "Luca T."];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[100] backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#1e1e1e] rounded-[2rem] shadow-2xl w-full max-w-4xl overflow-hidden relative flex flex-col md:flex-row max-h-[90vh]">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full z-20 transition backdrop-blur-md"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="md:w-5/12 relative h-64 md:h-auto bg-gray-200 text-left">
           <img 
             src={event.image || "/placeholder.jpg"} 
             alt={event.title} 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
           <div className="absolute bottom-8 left-8 right-8">
             <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-lg uppercase mb-3 inline-block tracking-widest shadow-lg">
               {event.category || "General"}
             </span>
             <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tighter">
               {event.title}
             </h2>
           </div>
        </div>

        <div className="md:w-7/12 p-8 md:p-12 overflow-y-auto flex flex-col bg-white dark:bg-[#1e1e1e]">
          
          <div className="flex flex-col gap-6 mb-10 text-left">
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-gray-400">Locație</p>
                <p className="font-bold text-lg">{event.location}</p>
              </div>
            </div>
          </div>

          <div className="mb-10 text-left">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Info className="w-4 h-4" /> Despre Eveniment
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg italic">
              "{event.description || "Organizatorul nu a adăugat încă o descriere pentru acest eveniment."}"
            </p>
          </div>

          <div className="mt-auto pt-8 border-t border-gray-100 dark:border-white/5 text-left">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Users className="w-4 h-4" /> 
                Participanți ({isParticipating ? mockParticipants.length + 1 : mockParticipants.length})
              </h3>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="flex -space-x-4">
                {mockParticipants.slice(0, 4).map((p, i) => (
                  <div 
                    key={i} 
                    className="w-12 h-12 rounded-full border-4 border-white dark:border-[#1e1e1e] bg-gradient-to-tr from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-[10px] font-black shadow-sm"
                  >
                    {p.split(' ').map(n => n[0]).join('')}
                  </div>
                ))}
                {isParticipating && (
                  <div className="w-12 h-12 rounded-full border-4 border-white dark:border-[#1e1e1e] bg-blue-500 flex items-center justify-center text-white text-[10px] font-black animate-bounce z-10 shadow-lg">
                    TU
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium ml-2">
                {isParticipating ? "Tu și alți " : ""} {mockParticipants.length} persoane vin la acest eveniment.
              </p>
            </div>

            <button
              onClick={handleToggleParticipation}
              className={`w-full py-5 rounded-[1.5rem] font-black transition-all flex items-center justify-center gap-3 shadow-xl ${
                isParticipating 
                ? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400 border border-red-200 dark:border-red-900/30" 
                : "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-blue-600/30 active:scale-95"
              }`}
            >
              {isParticipating ? (
                <>
                  <CheckCircle2 className="w-6 h-6" /> 
                  Anulează Participarea
                </>
              ) : (
                <>
                  <UserPlus className="w-6 h-6" /> 
                  Vreau să particip
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}