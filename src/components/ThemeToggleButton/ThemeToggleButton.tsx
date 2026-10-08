import React from "react";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleButtonProps {
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  showLabel = false,
  className = "",
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300 hover:scale-105 cursor-pointer select-none ${
        theme === "dark"
          ? "bg-gray-800/80 border-gray-700 text-amber-300 hover:bg-gray-700 hover:border-gray-600"
          : "bg-white/80 border-gray-300 text-indigo-600 hover:bg-gray-100 hover:border-gray-400 shadow-sm"
      } ${className}`}
      aria-label={`Alternar para modo ${theme === "dark" ? "claro" : "escuro"}`}
      title={`Alternar para modo ${theme === "dark" ? "claro" : "escuro"}`}
    >
      {theme === "dark" ? (
        <Sun size={18} className="animate-spin-slow text-amber-300" />
      ) : (
        <Moon size={18} className="text-indigo-600" />
      )}
      {showLabel && (
        <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">
          {theme === "dark" ? "Claro" : "Escuro"}
        </span>
      )}
    </button>
  );
};

export default ThemeToggleButton;
