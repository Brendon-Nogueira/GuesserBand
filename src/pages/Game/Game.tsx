import React, { useEffect, useState } from "react";
import { fetchAlbumsByGenre } from "../../../api/Music";
import type { Album } from "../../types/AlbumType/Album";
import { fetchBadOmensAlbums } from "../../../api/Artist";
import AlbumCover from "../../components/AlbumCover/AlbumCover";
import { motion, AnimatePresence } from "framer-motion";
import { LoaderCircleIcon, LucideTrophy } from "lucide-react";

interface GameProps {
  thematic?: boolean;
}

const maxAttempts = 5;

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
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [guesses, setGuesses] = useState<{ text: string; correct: boolean }[]>(
    []
  );

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
    } catch (err) {
      console.error("Erro ao carregar álbuns:", err);
    } finally {
      setAttemptsLeft(maxAttempts);
      setPixelLevel(20);
      setFeedback(null);
      setGuess("");
      setHint("");
      setGuesses([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlbum();
  }, [selectedGenre]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  // Função de tentativa
  const handleGuess = () => {
    if (!album || !guess.trim()) return;

    const correct =
      guess.trim().toLowerCase() === album.artist.toLowerCase() ||
      guess.trim().toLowerCase() === album.albumTitle.toLowerCase();

    setGuesses((prev) => [...prev, { text: guess.trim(), correct }]);
    setGuess("");

    if (correct) {
      setFeedback("success");
      setScore((prev) => prev + 1);
      setPixelLevel(1);
    } else {
      const newAttempts = attemptsLeft - 1;
      setAttemptsLeft(newAttempts);
      setFeedback("error");

      if (newAttempts > 0) {
        setPixelLevel((prev) => Math.max(1, prev - 4));
      }

      if (newAttempts === 3) {
        setHint(`💡 Dica: Ano do álbum é ${album.releaseYear}`);
      } else if (newAttempts === 2) {
        setHint(`💡 Dica: A banda começa com "${album.artist[0]}"`);
      } else if (newAttempts === 0) {
        setFeedback("error");
        setPixelLevel(1);
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

  // const sharpnessPercentage =
  //   ((maxAttempts - attemptsLeft + 1) / maxAttempts) * 100;

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-[#0f0f0f] text-white"
          : "bg-[#f7f7f7] text-gray-900"
      } font-display min-h-screen flex flex-col transition-colors duration-500`}
    >
      {/* Header */}
      <header
        className={`flex items-center justify-between px-4 sm:px-10 py-3 border-b ${
          theme === "dark" ? "border-gray-700" : "border-gray-300"
        }`}
      >
        <h1 className="text-lg font-bold">
          <a href="/">GUESS THE BAND</a>
        </h1>
        <div className="flex items-center gap-3">
          <p>Pontuação: {score}</p>

          {/* Toggle de tema */}
          <button
            onClick={toggleTheme}
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              theme === "dark"
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
          >
            {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>
      </header>

      {/* Seletor de gênero */}
      <div className="flex justify-center gap-3 mt-6 flex-wrap">
        {["rock", "pop", "indie", "80s", "metalcore"].map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedGenre === genre
                ? "bg-blue-600 text-white"
                : theme === "dark"
                ? "border border-white/30 text-white/80 hover:bg-white/10"
                : "border border-gray-400 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {genre.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Main */}
      <main className="flex flex-col items-center justify-center flex-1 w-full gap-8 py-10 px-4">
        {loading ? (
          <motion.div
            className="flex justify-center items-center w-full max-w-lg h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{
              opacity: { duration: 0.3 },
              rotate: { repeat: Infinity, duration: 1.2, ease: "linear" },
            }}
          >
            <LoaderCircleIcon
              size={64}
              className={`${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}
            />
          </motion.div>
        ) : (feedback === "success" ||
            (feedback === "error" && attemptsLeft === 0)) &&
          album ? (
          // ======== (ACERTO OU ERRO) ========
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-6 w-full max-w-lg text-center"
          >
            <h2
              className={`text-2xl font-bold ${
                feedback === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {feedback === "success" ? "Você Acertou!" : "Você Errou!"}
            </h2>

            {/* Card do Álbum */}
            <div
              className={`rounded-2xl shadow-lg overflow-hidden w-full flex flex-col items-center ${
                theme === "dark" ? "bg-[#121212]" : "bg-white"
              }`}
            >
              <img
                src={album.coverArtUrl}
                alt={album.albumTitle}
                className="w-full aspect-square object-cover rounded-t-2xl"
              />
              <div className="py-4">
                <h3 className="text-xl font-semibold">{album.artist}</h3>
                <p className="text-gray-400 italic">
                  {album.albumTitle} ({album.releaseYear})
                </p>
              </div>
            </div>

            {/* Pontuação ou mensagem de erro */}
            {feedback === "success" ? (
              <div
                className={`rounded-xl p-4 flex items-center justify-between w-full shadow-md ${
                  theme === "dark" ? "bg-[#1b1b1b]" : "bg-gray-100"
                }`}
              >
                <div>
                  <p className="text-3xl font-bold text-blue-500">
                    {Math.round((attemptsLeft / maxAttempts) * 100)}
                  </p>
                  <p className="text-sm text-gray-400">
                    Pontos, baseado em {maxAttempts - attemptsLeft + 1}{" "}
                    tentativa
                    {maxAttempts - attemptsLeft + 1 > 1 ? "s" : ""}
                  </p>
                </div>
                <LucideTrophy className="text-blue-500" size={32} />
              </div>
            ) : (
              <div
                className={`rounded-xl p-4 w-full text-center shadow-md ${
                  theme === "dark" ? "bg-[#1b1b1b]" : "bg-gray-100"
                }`}
              >
                <p className="text-gray-300">
                  O álbum era{" "}
                  <span className="font-semibold">{album.artist}</span> –{" "}
                  <span className="italic">{album.albumTitle}</span>
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 w-full justify-center">
              <button
                onClick={() => loadAlbum()}
                className="bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:scale-105 transition-transform"
              >
                Tentar Novamente
              </button>
              <button
                onClick={() => loadAlbum()}
                className={`font-semibold py-3 px-6 rounded-lg hover:scale-105 transition-transform ${
                  feedback === "success"
                    ? "bg-blue-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                Próximo Desafio
              </button>
            </div>
          </motion.div>
        ) : (
          // ======== TELA NORMAL (JOGO) ========
          <>
            <AnimatePresence mode="wait">
              {album ? (
                <motion.div
                  key={album.mbid}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={`w-full max-w-lg rounded-xl shadow-lg overflow-hidden flex justify-center items-center ${
                    theme === "dark" ? "bg-[#121212]" : "bg-white"
                  }`}
                >
                  <AlbumCover url={album.coverArtUrl} pixelLevel={pixelLevel} />
                </motion.div>
              ) : (
                // <p>Nenhum álbum encontrado.</p>
                <button
                  onClick={() => loadAlbum()}
                  className="bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:scale-105 transition-transform"
                >
                  Reiniciar
                </button>
              )}
            </AnimatePresence>

            {/* Status */}
            {!loading && album && (
              <>
                <div className="w-full max-w-lg flex flex-col items-center gap-2 mt-4">
                  <p>{attemptsLeft} tentativas restantes</p>
                  <div className="flex justify-between w-full max-w-lg gap-1 mt-1">
                    {Array.from({ length: maxAttempts }).map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-2 rounded-full transition-colors duration-300 ${
                          i < maxAttempts - attemptsLeft
                            ? "bg-blue-600"
                            : theme === "dark"
                            ? "bg-gray-700"
                            : "bg-gray-300"
                        }`}
                      ></div>
                    ))}
                  </div>
                  {hint && (
                    <p className="text-yellow-400 text-center max-w-xs">
                      {hint}
                    </p>
                  )}
                </div>

                {/* Input e Botão */}
                <div className="w-full max-w-lg flex flex-col sm:flex-row items-end gap-2 mt-2">
                  <input
                    className={`form-input w-full rounded-lg h-14 p-[15px] focus:outline-none ${
                      theme === "dark"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-200 text-gray-900"
                    }`}
                    placeholder="Digite o nome da banda ou álbum..."
                    value={guess}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    disabled={attemptsLeft === 0 || feedback === "success"}
                  />
                  <button
                    onClick={handleGuess}
                    disabled={attemptsLeft === 0 || feedback === "success"}
                    className="h-14 px-6 bg-blue-600 text-white font-bold rounded-lg hover:scale-105 transition-transform"
                  >
                    Adivinhar
                  </button>
                </div>

                {/* Ultima tentativa */}
                <div className="w-full max-w-lg mt-2 flex flex-col gap-2">
                  {guesses.length > 0 && (
                    <motion.div
                      key={guesses.length - 1}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`rounded-lg px-4 py-2 text-center font-semibold transition-all duration-300 ${
                        guesses[guesses.length - 1].correct
                          ? "bg-green-500/30 text-green-400 border border-green-600"
                          : "bg-red-500/30 text-red-400 border border-red-600"
                      }`}
                    >
                      {guesses[guesses.length - 1].text}
                    </motion.div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Game;
