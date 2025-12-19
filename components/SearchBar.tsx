"use client";

import { Search } from "lucide-react";

export default function SearchBar({ onSearch }: { onSearch: (val: string) => void }) {
  return (
    <div className="relative w-full group">
      {/* Iconița Lupa */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
        <Search className="w-5 h-5" />
      </div>
      
      {/* Input-ul transparent */}
      <input
        type="text"
        className="block w-full py-4 pl-12 pr-4 text-lg bg-transparent border-none outline-none focus:ring-0 placeholder:text-gray-500 dark:text-white dark:placeholder:text-gray-400"
        placeholder="Caută evenimente..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}