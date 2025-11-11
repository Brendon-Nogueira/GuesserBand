// src/pages/Game/Game.tsx
import React, { useEffect, useState } from "react";
import { fetchAlbumsByGenre } from "../../api/Music";
import type { Album } from "../../types/AlbumType/Album";
import { fetchBadOmensAlbums } from "../../api/Artist";
import AlbumCover from "../../components/AlbumCover/AlbumCover";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext/ThemeContext";

interface GameProps {
  thematic?: boolean;
}

const maxAttempts = 5;

// local storage key
const LOCAL_GUESSES_KEY = "gtb_previous_guesses";

const Game: React.FC<GameProps> = ({ thematic }) => {
  const [attemptsLeft, setAttemptsLeft] = useState(maxAttempts);
  const [guess, setGuess] = useState("");
  const [pixelLevel, setPixelLevel] = useState(15);
  const [feedback, setFeedback] = useState<"success" | "error" | null>(null);
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [hint, setHint] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("rock");
  const [previousGuesses, setPreviousGuesses] = useState<string[]>([]);
  const [guessesOpen, setGuessesOpen] = useState(false);
  const [usedArtists, setUsedArtists] = useState<string[]>([]);

  const { theme, toggleTheme } = useTheme();

  // carrega  previous guesses do localStorage (se houver)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_GUESSES_KEY);
      if (raw) setPreviousGuesses(JSON.parse(raw));
    } catch (e) {}
  }, []);

  // atualiza o local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_GUESSES_KEY, JSON.stringify(previousGuesses));
    } catch (e) {}
  }, [previousGuesses]);

  // carrega novo album
  const loadAlbum = async (genre = selectedGenre) => {
    setLoading(true);
    try {
      const albums = thematic
        ? await fetchBadOmensAlbums()
        : await fetchAlbumsByGenre(genre);

      if (!albums || albums.length === 0) {
        console.warn("Nenhum álbum encontrado para o gênero:", genre);
        setAlbum(null);
        setLoading(false);
        return;
      }

      const randomAlbum = albums[Math.floor(Math.random() * albums.length)];
      setAlbum(randomAlbum);
      setUsedArtists((prev) => [...prev, randomAlbum.artist]);
    } catch (err) {
      console.error("Erro ao carregar álbuns:", err);
    } finally {
      setAttemptsLeft(maxAttempts);
      setPixelLevel(20);
      setFeedback(null);
      setGuess("");
      setHint("");

      // não limpamos previousGuesses aqui — preservamos histórico por padrão
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlbum();
  }, [selectedGenre, thematic]);

  const addGuessToHistory = (g: string) => {
    setPreviousGuesses((prev) => {
      const next = [...prev, g].slice(-50);
      return next;
    });
  };

  const handleGuess = () => {
    if (!album) return;
    const currentGuess = guess.trim();
    if (currentGuess === "") return;

    // adiciona ao histórico imediatamente (para feedback visual)
    addGuessToHistory(currentGuess);

    const normalized = currentGuess.toLowerCase();
    const artistNorm = album.artist.toLowerCase();
    const titleNorm = album.albumTitle.toLowerCase();
    const correct = normalized === artistNorm || normalized === titleNorm;

    if (correct) {
      setFeedback("success");
      setScore((s) => s + 1);
      setPixelLevel(1);

      // limpar campo e seguir
      setGuess("");
      setTimeout(() => loadAlbum(), 1600);
    } else {
      const newAttempts = attemptsLeft - 1;
      setAttemptsLeft(newAttempts);
      setFeedback("error");
      setGuess("");

      // reduz pixelização gradualmente
      if (newAttempts > 0) {
        setPixelLevel((prev) =>
          Math.max(1, prev - Math.ceil(20 / maxAttempts))
        );
      }

      if (newAttempts === 3) {
        setHint(`💡 Dica: Ano do álbum é ${album.releaseYear}`);
      } else if (newAttempts === 2) {
        setHint(`💡 Dica: A banda começa com "${album.artist[0]}"`);
      }

      if (newAttempts === 0) {
        setTimeout(() => loadAlbum(), 2000);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);
    setFeedback(null);
  };

  // permite enviar com Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // se botão está desabilitado por tentativas, não faz nada
      if (attemptsLeft === 0 || feedback === "success") return;
      handleGuess();
    }
  };

  const sharpnessPercentage =
    ((maxAttempts - attemptsLeft + 1) / maxAttempts) * 100;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col text-text-light dark:text-text-dark transition-colors duration-300">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border-light dark:border-border-dark px-4 sm:px-10 py-3">
        <h1 className="font-bold text-lg text-primary dark:text-primaryLight">
          <a href="/">GUESS THE BAND</a>
        </h1>

        <div className="flex items-center gap-3">
          <p className="font-medium">{score} pts</p>

          {/* Toggle de tema */}
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded-full text-sm border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark hover:opacity-90 transition-colors"
            aria-label="Alternar tema"
          >
            {theme === "dark" ? "☀️ Claro" : "🌙 Escuro"}
          </button>
        </div>
      </header>

      {/* Seletor de gênero */}
      <div className="flex justify-center gap-3 mt-6 flex-wrap px-4">
        {["rock", "pop", "indie", "80s", "metalcore"].map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              selectedGenre === genre
                ? "bg-primary text-white shadow-md"
                : "border border-border-light dark:border-border-dark text-subtext-light dark:text-subtext-dark hover:bg-card-light dark:hover:bg-card-dark"
            }`}
          >
            {genre.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Main */}
      <main className="flex flex-col items-center justify-center flex-1 w-full gap-6 py-8 px-4">
        {loading ? (
          <p className="text-subtext-light dark:text-subtext-dark">
            Carregando álbum...
          </p>
        ) : album ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={album.mbid}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="w-full max-w-lg rounded-xl overflow-hidden"
              >
                <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-lg p-5 flex justify-center items-center">
                  <AlbumCover url={album.coverArtUrl} pixelLevel={pixelLevel} />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Status */}
            <div className="w-full max-w-lg flex flex-col items-center gap-3 mt-2">
              <p className="font-medium text-subtext-light dark:text-subtext-dark">
                {attemptsLeft} tentativas restantes
              </p>

              <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700 h-2">
                <div
                  className="h-2 rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${sharpnessPercentage}%` }}
                />
              </div>

              {hint && (
                <p className="text-yellow-700 dark:text-yellow-400 text-sm mt-1">
                  {hint}
                </p>
              )}
            </div>

            {/* Input + botão */}
            <div className="w-full max-w-lg flex flex-col sm:flex-row items-end gap-4 mt-3">
              <input
                type="text"
                value={guess}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Digite o nome da banda ou álbum..."
                className="form-input w-full rounded-lg h-14 p-4 bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark placeholder:text-subtext-light dark:placeholder:text-subtext-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={attemptsLeft === 0 || feedback === "success"}
              />

              <button
                onClick={handleGuess}
                disabled={attemptsLeft === 0 || feedback === "success"}
                className={`h-14 px-6 rounded-lg text-white font-bold transition-transform ${
                  attemptsLeft === 0 || feedback === "success"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-primaryLight active:scale-95"
                }`}
              >
                Adivinhar
              </button>
            </div>

            {/* Lista de palpites: toggle + conteúdo */}
            <div className="w-full max-w-lg mt-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-subtext-light dark:text-subtext-dark">
                  Tentativas anteriores
                </h3>
                <button
                  onClick={() => setGuessesOpen((s) => !s)}
                  className="text-sm px-2 py-1 rounded-md border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark"
                >
                  {guessesOpen ? "Fechar" : `Ver (${previousGuesses.length})`}
                </button>
              </div>

              {guessesOpen && (
                <div className="mt-2 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg p-3">
                  {previousGuesses.length === 0 ? (
                    <p className="text-sm text-subtext-light dark:text-subtext-dark">
                      Nenhuma tentativa ainda.
                    </p>
                  ) : (
                    <ul className="space-y-2 text-sm">
                      {previousGuesses.map((g, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-between text-text-light dark:text-text-dark"
                        >
                          <span className="text-subtext-light dark:text-subtext-dark">
                            {i + 1}. {g}
                          </span>
                          {/* opcional: botão para remover item */}
                          <button
                            onClick={() =>
                              setPreviousGuesses((prev) =>
                                prev.filter((_, idx) => idx !== i)
                              )
                            }
                            className="text-xs px-2 py-0.5 rounded bg-transparent border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-label={`Remover tentativa ${i + 1}`}
                          >
                            Remover
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Feedback final */}
            {feedback === "success" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-700 dark:text-green-400 font-semibold mt-4"
              >
                ✅ Acertou! Era {album.artist} - {album.albumTitle}
              </motion.p>
            )}

            {attemptsLeft === 0 && feedback === "error" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-700 dark:text-red-400 font-semibold mt-4"
              >
                ❌ Fim de jogo! Era {album.artist} - {album.albumTitle}
              </motion.p>
            )}
          </>
        ) : (
          <p className="text-subtext-light dark:text-subtext-dark">
            Nenhum álbum encontrado para o gênero selecionado.
          </p>
        )}
      </main>
    </div>
  );
};

export default Game;
