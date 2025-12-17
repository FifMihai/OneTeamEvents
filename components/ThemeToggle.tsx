import React from 'react';
import { Sun, Moon } from 'lucide-react'; // Dacă nu ai lucide, șterge și vezi mai jos

interface ThemeToggleProps {
  // Le punem pe ambele opționale (?) ca să nu mai ai erori cu "Missing property"
  toggleTheme?: () => void;
  theme?: string | 'light' | 'dark' | boolean; 
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggleTheme, theme }) => {
  
  // Verificăm dacă tema e dark (acceptăm și string "dark", și boolean true)
  const isDark = theme === 'dark' || theme === true;

  return (
    <button
      onClick={toggleTheme}
      // Z-50 și FIXED ca să fie mereu vizibil și clickabil
      className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-slate-800 text-white shadow-xl hover:bg-slate-700 transition-all cursor-pointer border border-slate-600"
      title="Schimbă tema"
    >
      {isDark ? (
        // Dacă ai lucide-react:
        <Sun size={24} className="text-yellow-400" />
      ) : (
        // Dacă ai lucide-react:
        <Moon size={24} className="text-blue-300" />
      )}

      {/* Dacă NU ai lucide-react și îți dă eroare la <Sun /> sau <Moon />, 
         șterge liniile de mai sus și decomentează linia de jos:
      */}
      {/* <span className="text-xl">{isDark ? '☀️' : '🌙'}</span> */}
    </button>
  );
};