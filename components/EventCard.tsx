"use client";
import { MapPin, Calendar, Heart, Trash2, Pencil } from "lucide-react";
import { useState, useEffect } from "react";

interface EventCardProps {
  event: any;
  onOpenDetails: (e: any) => void;
  onDelete: (id: string) => void;
  onEdit: (event: any) => void;
  isOwner: boolean; // Prop nou pentru a verifica dacă utilizatorul este creatorul
}

export default function EventCard({ 
  event, 
  onOpenDetails,
  onDelete,
  onEdit,
  isOwner
}: EventCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favorites.includes(event.id)) {
      setIsFavorite(true);
    }
  }, [event.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter((id: string) => id !== event.id);
    } else {
      newFavorites = [...favorites, event.id];
    }

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const formattedDate = new Date(event.date).toLocaleDateString("ro-RO", {
    day: "numeric", month: "long", year: "numeric",
  });

  const handleOpenDetails = () => {
    const safeEvent = { ...event, date: formattedDate };
    onOpenDetails(safeEvent);
  };

  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'Sport': return 'bg-green-500';
      case 'Party': return 'bg-purple-500';
      case 'Workshop': return 'bg-orange-500';
      case 'Conferință': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col h-full group relative text-left">
      
      {/* BUTOANE ADMIN - Apar DOAR dacă isOwner este true */}
      {isOwner && (
        <div className="absolute top-2 left-2 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(event); }}
            className="p-2 bg-white/90 dark:bg-black/50 text-yellow-500 rounded-full hover:bg-yellow-500 hover:text-white transition shadow-sm backdrop-blur-md"
            title="Editează"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(event.id); }}
            className="p-2 bg-white/90 dark:bg-black/50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition shadow-sm backdrop-blur-md"
            title="Șterge"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img 
          src={event.image || "/placeholder.jpg"} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        <div className={`absolute top-2 ${isOwner ? 'left-24' : 'left-2'} px-2 py-1 rounded-md text-[10px] font-bold text-white uppercase shadow-sm transition-all ${getCategoryColor(event.category)}`}>
          {event.category || 'General'}
        </div>

        <button 
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-black/50 rounded-full shadow-sm hover:scale-110 transition backdrop-blur-sm z-20"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
        </button>
      </div>

      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">{event.title}</h3>
          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-2 mb-4">
            <div className="flex items-center gap-2 text-left">
              <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-left">
              <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); handleOpenDetails(); }}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md active:scale-95"
        >
          Detalii
        </button>
      </div>
    </div>
  );
}