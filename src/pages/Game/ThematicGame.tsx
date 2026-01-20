import React, { useEffect, useState } from "react";
import { fetchAlbumsByDecade, searchArtists } from "../../Utils/Music";
import type { Album } from "../../types/AlbumType/Album";
import AlbumCover from "../../components/AlbumCover/AlbumCover";
import RankingBoard from "../../components/RankingBoard/RankingBoard";
import { saveScore } from "../../Utils/RankingUtils";
import { motion, AnimatePresence } from "framer-motion";
import { LucideTrophy, Clock } from "lucide-react";

const maxAttempts = 5;

const DECADES = ["70s", "80s", "90s", "2000s", "2010s"];

const ThematicGame: React.FC = () => {
  const [selectedDecade, setSelectedDecade] = useState("80s");
  const [attemptsLeft, setAttemptsLeft] = useState(maxAttempts);
  const [guess, setGuess] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [pixelLevel, setPixelLevel] = useState(15);
  const [feedback, setFeedback] = useState<"success" | "error" | null>(null);
  const [album, setAlbum] = useState<Album | null>(null);
  const [history, setHistory] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [pointsGainedInRound, setPointsGainedInRound] = useState(0);
  const [refreshRanking, setRefreshRanking] = useState(0);

  const loadAlbum = async (decade = selectedDecade) => {
    setLoading(true);
    setSuggestions([]);
    try {
      const albums = await fetchAlbumsByDecade(decade, album?.artist);

      const availableAlbums = albums.filter((a) => !history.has(a.artist));

      if (availableAlbums.length === 0) {
        if (albums.length > 0) {
          const fallbackAlbum =
            albums[Math.floor(Math.random() * albums.length)];
          setAlbum(fallbackAlbum);
        } else {
          setAlbum(null);
        }
        setLoading(false);
        return;
      }

      const randomAlbum =
        availableAlbums[Math.floor(Math.random() * availableAlbums.length)];
      setAlbum(randomAlbum);

      setHistory((prev) => new Set(prev).add(randomAlbum.artist));
    } catch (err) {
      console.error("Erro ao carregar álbuns:", err);
    } finally {
      setAttemptsLeft(maxAttempts);
      setPixelLevel(20);
      setFeedback(null);
      setGuess("");
      setPointsGainedInRound(0);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlbum();
  }, [selectedDecade]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGuess(value);

    // Permitir busca mesmo se feedback == "error" (para o usuário corrigir)
    // Se feedback == "success", o input está disabled, então não chega aqui
    if (value.length > 1) {
      const results = await searchArtists(value);
      setSuggestions(results.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (artistName: string) => {
    setGuess(artistName);
    setSuggestions([]);
    // Opcional: Auto-enviar ao selecionar
    handleGuess(artistName);
  };

  const handleGuess = (overrideGuess?: string) => {
    const finalGuess = overrideGuess || guess;
    if (!album || !finalGuess.trim()) return;

    const guessLower = finalGuess.trim().toLowerCase();
    const artistMatch = guessLower === album.artist.toLowerCase();
    const albumMatch =
      guessLower === album.albumTitle.toLowerCase().split("(")[0].trim();

    if (artistMatch || albumMatch) {
      setFeedback("success");
      setPixelLevel(1);
      const points = (attemptsLeft + 1) * 20;
      setPointsGainedInRound(points);
      setScore((prev) => prev + points);
      setSuggestions([]);
    } else {
      setAttemptsLeft((prev) => prev - 1);
      setFeedback("error");
      setPixelLevel((prev) => Math.max(1, prev - 4));

      // Game Over: Reset e Salvar Score
      if (attemptsLeft - 1 === 0 && score > 0) {
        saveScore("thematic", score);
        setRefreshRanking((prev) => prev + 1);
        setScore(0);
      }
    }
    setGuess("");
  };

  return (
    <div className="min-h-screen bg-[#1a0b2e] text-[#d4b3ff] font-display flex flex-col transition-colors duration-500 overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#7645d9"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <header className="flex items-center justify-between px-6 py-4 border-b border-[#7645d9]/30 relative z-10 bg-[#1a0b2e]/80 backdrop-blur-md">
        <h1 className="text-xl font-bold tracking-widest uppercase text-[#ff00ff] drop-shadow-[0_0_10px_rgba(255,0,255,0.5)]">
          <a href="/">Modo Viagem no Tempo</a>
        </h1>
        <div className="flex items-center gap-4">
          <p className="font-mono text-[#00ffff]">
            PONTOS: {score.toString().padStart(6, "0")}
          </p>
        </div>
      </header>

      {/* Ranking Thematic Style - Absolute Top Left */}
      <div className="absolute top-24 left-6 z-20 hidden xl:block">
        <RankingBoard mode="thematic" refreshTrigger={refreshRanking} />
      </div>

      <div className="flex justify-center gap-4 mt-6 flex-wrap relative z-10">
        {DECADES.map((decade) => (
          <button
            key={decade}
            onClick={() => setSelectedDecade(decade)}
            className={`px-6 py-2 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 border-2 ${
              selectedDecade === decade
                ? "bg-[#ff00ff] border-[#ff00ff] text-[#1a0b2e] shadow-[0_0_20px_rgba(255,0,255,0.6)] scale-110"
                : "bg-transparent border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff]/10 hover:shadow-[0_0_10px_rgba(0,255,255,0.4)]"
            }`}
          >
            {decade}
          </button>
        ))}
      </div>

      <main className="flex flex-col items-center justify-center flex-1 w-full gap-8 py-10 px-4 relative z-10">
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          >
            <Clock
              size={64}
              className="text-[#00ffff] drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]"
            />
          </motion.div>
        ) : (feedback === "success" ||
            (feedback === "error" && attemptsLeft === 0)) &&
          album ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6 w-full max-w-lg text-center"
          >
            <h2
              className={`text-3xl font-black uppercase tracking-widest drop-shadow-md ${
                feedback === "success" ? "text-[#00ff9d]" : "text-[#ff0055]"
              }`}
            >
              {feedback === "success"
                ? "Linha do Tempo Restaurada!"
                : "Paradoxo Criado!"}
            </h2>

            <div className="rounded-xl p-1 bg-gradient-to-br from-[#00ffff] to-[#ff00ff]">
              <img
                src={album.coverArtUrl}
                alt={album.albumTitle}
                className="w-full max-w-sm rounded-lg"
              />
            </div>

            {feedback === "success" && (
              <div className="flex items-center gap-2 justify-center text-[#00ff9d] font-bold text-xl drop-shadow-[0_0_5px_rgba(0,255,157,0.5)]">
                <LucideTrophy size={24} />
                <span>+{pointsGainedInRound} pontos temporais</span>
              </div>
            )}

            <div className="text-center">
              <h3 className="text-2xl font-bold text-white">{album.artist}</h3>
              <p className="text-[#00ffff]">
                {album.albumTitle} ({album.releaseYear})
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => loadAlbum()}
                className="px-8 py-3 bg-[#7645d9] hover:bg-[#9d6dff] text-white font-bold rounded shadow-lg transition-transform hover:scale-105 uppercase tracking-widest"
              >
                Próxima Era
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              {album && (
                <motion.div
                  key={album.mbid}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#00ffff] to-[#ff00ff] rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                  <div className="relative rounded-xl bg-black">
                    <AlbumCover
                      url={album.coverArtUrl}
                      pixelLevel={pixelLevel}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="w-full max-w-lg flex flex-col gap-2 relative">
              <div className="flex justify-between text-[#00ffff] text-sm uppercase tracking-wider mb-1">
                <span>Nível de Energia</span>
                <span>{attemptsLeft} tentativas</span>
              </div>
              <div className="flex gap-1 h-3">
                {Array.from({ length: maxAttempts }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-sm skew-x-[-10deg] transition-all duration-300 ${
                      i < maxAttempts - attemptsLeft
                        ? "bg-[#ff0055] shadow-[0_0_10px_#ff0055]"
                        : "bg-[#00ffff] shadow-[0_0_5px_#00ffff]"
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            <div className="w-full max-w-lg flex gap-2 relative">
              <div className="flex-1 relative">
                <input
                  value={guess}
                  onChange={handleInputChange}
                  onKeyDown={(e) => e.key === "Enter" && handleGuess()}
                  disabled={feedback === "success"}
                  placeholder="Identifique a anomalia temporal..."
                  className="w-full bg-[#1a0b2e] border-2 border-[#7645d9] focus:border-[#00ffff] text-[#00ffff] placeholder-[#7645d9] rounded-lg px-4 py-3 outline-none transition-colors"
                />

                {suggestions.length > 0 && !feedback && (
                  <ul className="absolute top-full left-0 w-full mt-2 bg-[#1a0b2e] border border-[#7645d9] rounded-lg shadow-[0_0_20px_rgba(118,69,217,0.5)] overflow-hidden z-20">
                    {suggestions.map((artist, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelectSuggestion(artist)}
                        className="px-4 py-2 hover:bg-[#7645d9] text-[#00ffff] cursor-pointer transition-colors border-b border-[#7645d9]/30 last:border-0"
                      >
                        {artist}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                onClick={() => handleGuess()}
                className="px-6 py-3 bg-[#ff00ff] text-[#1a0b2e] font-black rounded-lg hover:bg-[#ff40ff] transition-transform active:scale-95 uppercase tracking-wider"
              >
                HACK
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ThematicGame;
