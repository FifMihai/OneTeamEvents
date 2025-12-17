"use client"; // Asta ii spune ca e componenta interactiva

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  // Citim tema din memorie cand se incarca pagina
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      // Clasele de mai jos il pun fix in coltul dreapta-jos
      className="fixed bottom-6 right-6 p-4 rounded-full shadow-xl bg-white dark:bg-gray-800 text-3xl hover:scale-110 transition-transform z-50 border border-gray-200 dark:border-gray-700"
      title="Schimbă tema"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}