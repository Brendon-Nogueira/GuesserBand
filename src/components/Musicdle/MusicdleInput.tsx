import React, { useState, useRef, useEffect } from "react";
import type { BandData } from "../../types/MusicdleType";
import { Search, Loader2, Sparkles } from "lucide-react";
import BandAvatar from "./BandAvatar";
import {
  searchDynamicBands,
  enrichSelectedBand,
} from "../../Utils/DynamicBandService";

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
  const [isSearchingOnline, setIsSearchingOnline] = useState(false);
  const [isEnriching, setIsEnriching] = useState(false);
  const [results, setResults] = useState<BandData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Bandas disponíveis no catálogo principal
  const availableBands = bands.filter((b) => !guessedIds.includes(b.id));

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setIsSearchingOnline(false);
      return;
    }

    // 1. Instantâneo: busca local imediata
    const local = availableBands
      .filter((b) => b.name.toLowerCase().includes(trimmed.toLowerCase()))
      .slice(0, 6);
    setResults(local);

    // 2. Debounce: busca dinâmica complementar no Spotify
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setIsSearchingOnline(true);
      try {
        const dynamicList = await searchDynamicBands(
          trimmed,
          availableBands,
          guessedIds
        );
        if (dynamicList && dynamicList.length > 0) {
          setResults(dynamicList);
        }
      } catch (err) {
        console.warn("Erro ao buscar artistas no Spotify:", err);
      } finally {
        setIsSearchingOnline(false);
      }
    }, 250);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, bands, guessedIds]);

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

  const handleSelect = async (band: BandData) => {
    setQuery("");
    setIsOpen(false);
    setIsEnriching(true);
    try {
      const fullBand = await enrichSelectedBand(band);
      onSelectBand(fullBand);
    } catch {
      onSelectBand(band);
    } finally {
      setIsEnriching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && results.length > 0 && !isEnriching) {
      e.preventDefault();
      handleSelect(results[0]);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <div className="relative flex items-center">
        {isSearchingOnline || isEnriching ? (
          <Loader2
            size={18}
            className="absolute left-4 text-blue-500 animate-spin pointer-events-none"
          />
        ) : (
          <Search
            size={18}
            className="absolute left-4 text-gray-400 pointer-events-none"
          />
        )}

        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isEnriching}
          placeholder={
            disabled
              ? "Desafio encerrado!"
              : isEnriching
              ? "Identificando atributos do artista..."
              : "Digite qualquer banda (Bad Omens, Fresno, BMTH, Queen...)"
          }
          className="w-full h-12 sm:h-14 pl-11 pr-4 rounded-2xl border text-base sm:text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 shadow-sm"
          autoComplete="off"
          spellCheck="false"
        />
      </div>

      {/* Sugestões Dinâmicas */}
      {isOpen && results.length > 0 && !disabled && (
        <ul className="absolute z-50 w-full mt-2 rounded-2xl border shadow-2xl overflow-hidden divide-y bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 divide-gray-100 dark:divide-gray-800 max-h-72 sm:max-h-80 overflow-y-auto">
          {results.map((band) => (
            <li
              key={band.id}
              onClick={() => handleSelect(band)}
              className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 hover:bg-blue-50 dark:hover:bg-gray-800/80 active:bg-blue-100 dark:active:bg-gray-800 cursor-pointer transition-colors"
            >
              <BandAvatar
                src={band.image}
                name={band.name}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm"
              />
              <div className="flex-1 min-w-0 text-left">
                <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white truncate flex items-center gap-1.5">
                  {band.name}
                </p>
                <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">
                  {band.format} • {band.genres.join(", ")}
                </p>
              </div>
              <span className="text-base sm:text-lg">{band.flag}</span>
            </li>
          ))}

          {isSearchingOnline && (
            <li className="p-2.5 text-center text-xs text-blue-500 font-medium flex items-center justify-center gap-1.5 bg-blue-50/50 dark:bg-blue-950/20">
              <Sparkles size={13} className="animate-pulse" />
              Buscando mais artistas no catálogo do Spotify...
            </li>
          )}
        </ul>
      )}

      {isOpen &&
        query.trim().length > 1 &&
        results.length === 0 &&
        !isSearchingOnline &&
        !disabled && (
          <div className="absolute z-50 w-full mt-2 p-4 text-center rounded-2xl border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-xs text-gray-500">
            Nenhum artista encontrado com esse nome.
          </div>
        )}
    </div>
  );
};

export default MusicdleInput;
