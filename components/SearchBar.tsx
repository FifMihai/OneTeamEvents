"use client";

import { Search } from "lucide-react";

export default function SearchBar({ onSearch }: { onSearch: (val: string) => void }) {
  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="text"
        // Am adăugat clasele 'dark:...' pentru a arăta bine pe fundal negru
        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Caută evenimente..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}