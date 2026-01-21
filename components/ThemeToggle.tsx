import React from 'react';
import { Sun, Moon } from 'lucide-react'; 

interface ThemeToggleProps {
  
  toggleTheme?: () => void;
  theme?: string | 'light' | 'dark' | boolean; 
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggleTheme, theme }) => {
  
  
  const isDark = theme === 'dark' || theme === true;

  return (
    <button
      onClick={toggleTheme}
      
      className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-slate-800 text-white shadow-xl hover:bg-slate-700 transition-all cursor-pointer border border-slate-600"
      title="Schimbă tema"
    >
      {isDark ? (
        
        <Sun size={24} className="text-yellow-400" />
      ) : (
        
        <Moon size={24} className="text-blue-300" />
      )}

      {/*
         
      */}
      {/* <span className="text-xl">{isDark ? '☀️' : '🌙'}</span> */}
    </button>
  );
};