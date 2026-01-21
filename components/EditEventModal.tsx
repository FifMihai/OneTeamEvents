"use client";
import { useState, useEffect } from "react";
import { X, Calendar, MapPin, Type, Tag } from "lucide-react";

export default function EditEventModal({ 
  isOpen, 
  onClose, 
  onSave, 
  event 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (updatedEvent: any) => void; 
  event: any; 
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    category: "General",
    image: ""
  });

  
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        description: event.description || "",
        location: event.location || "",
        date: event.date ? new Date(event.date).toISOString().split('T')[0] : "",
        category: event.category || "General",
        image: event.image || ""
      });
    }
  }, [event, isOpen]);

  if (!isOpen || !event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...event, ...formData }); 
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[70] backdrop-blur-md animate-in fade-in zoom-in duration-200">
      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative text-gray-800 dark:text-white">
        
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Editează Eveniment</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Titlu Eveniment</label>
            <div className="relative text-gray-400 focus-within:text-blue-500">
              <Type className="absolute left-3 top-3 w-4 h-4" />
              <input 
                required
                value={formData.title}
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-transparent dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500" 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Data</label>
              <div className="relative text-gray-400 focus-within:text-blue-500">
                <Calendar className="absolute left-3 top-3 w-4 h-4" />
                <input 
                  type="date"
                  required
                  value={formData.date}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-transparent dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
                  onChange={(e) => setFormData({...formData, date: e.target.value})} 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Categorie</label>
              <div className="relative text-gray-400 focus-within:text-blue-500">
                <Tag className="absolute left-3 top-3 w-4 h-4" />
                <select 
                  value={formData.category}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-transparent dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none"
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="General">General</option>
                  <option value="Sport">Sport</option>
                  <option value="Party">Party</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Conferință">Conferință</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Locație</label>
            <div className="relative text-gray-400 focus-within:text-blue-500">
              <MapPin className="absolute left-3 top-3 w-4 h-4" />
              <input 
                value={formData.location}
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-transparent dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500" 
                onChange={(e) => setFormData({...formData, location: e.target.value})} 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descriere</label>
            <textarea 
              rows={3}
              value={formData.description}
              className="w-full p-3 border rounded-lg bg-transparent dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500" 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-lg active:scale-95">
            Salvează Modificările
          </button>
        </form>
      </div>
    </div>
  );
}