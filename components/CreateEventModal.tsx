"use client";
import { useState } from "react";
import { X, Calendar, MapPin, Type, AlignLeft } from "lucide-react";

export default function CreateEventModal({ isOpen, onClose, onAdd }: { isOpen: boolean, onClose: () => void, onAdd: (event: any) => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    image: ""
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ ...formData, id: Date.now() }); 
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[60] backdrop-blur-md">
      <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative animate-in fade-in zoom-in duration-200">
        
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Creează Eveniment</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titlu Eveniment</label>
            <div className="relative">
              <Type className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input 
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-black dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Ex: Fotbal Politehnica" 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Locație</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input 
                  className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-black dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Ex: Teren Leu" 
                  onChange={(e) => setFormData({...formData, location: e.target.value})} 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input 
                  type="date"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-black dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500" 
                  onChange={(e) => setFormData({...formData, date: e.target.value})} 
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descriere</label>
            <textarea 
              rows={3}
              className="w-full p-3 border rounded-lg dark:bg-black dark:border-gray-700 outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Spune-ne mai multe despre eveniment..." 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-lg">
            Publică Evenimentul
          </button>
        </form>
      </div>
    </div>
  );
}