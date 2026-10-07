import React, { useState, useRef, useEffect } from "react";
import type { BandData } from "../../types/MusicdleType";
import { Search } from "lucide-react";
import BandAvatar from "./BandAvatar";

interface MusicdleInputProps {
  bands: BandData[];
  guessedIds: string[];
  onSelectBand: (band: BandData) => void;
  disabled?: boolean;
}

export const MusicdleInput: React.FC<MusicdleInputProps> = ({
  bands,
  guessedIds,
  onSelectBand,
  disabled = false,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  
  const availableBands = bands.filter((b) => !guessedIds.includes(b.id));

  // Filtragem rápida
  const filteredBands = query.trim()
    ? availableBands
        .filter((b) =>
          b.name.toLowerCase().includes(query.trim().toLowerCase())
        )
        .slice(0, 6)
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (band: BandData) => {
    onSelectBand(band);
    setQuery("");
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredBands.length > 0) {
      e.preventDefault();
      handleSelect(filteredBands[0]);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <div className="relative flex items-center">
        <Search
          size={18}
          className="absolute left-4 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={
            disabled
              ? "Desafio encerrado!"
              : "Digite o nome de qualquer banda ou artista..."
          }
          className="w-full h-13 pl-11 pr-4 rounded-2xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 shadow-sm"
          autoComplete="off"
          spellCheck="false"
        />
      </div>

      {/* Sugestões */}
      {isOpen && filteredBands.length > 0 && !disabled && (
        <ul className="absolute z-50 w-full mt-2 rounded-2xl border shadow-2xl overflow-hidden divide-y bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 divide-gray-100 dark:divide-gray-800">
          {filteredBands.map((band) => (
            <li
              key={band.id}
              onClick={() => handleSelect(band)}
              className="flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-gray-800/80 cursor-pointer transition-colors"
            >
              <BandAvatar
                src={band.image}
                name={band.name}
                className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm"
              />
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  {band.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {band.format} • {band.genres.join(", ")}
                </p>
              </div>
              <span className="text-lg">{band.flag}</span>
            </li>
          ))}
        </ul>
      )}

      {isOpen && query.trim().length > 1 && filteredBands.length === 0 && !disabled && (
        <div className="absolute z-50 w-full mt-2 p-4 text-center rounded-2xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-xs text-gray-500">
          Nenhuma banda encontrada com este nome no catálogo do jogo.
        </div>
      )}
    </div>
  );
};

export default MusicdleInput;
