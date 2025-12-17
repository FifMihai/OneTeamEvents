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
        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
        placeholder="Caută evenimente..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}