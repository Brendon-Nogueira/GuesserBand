import React, { useEffect, useState } from "react";
import { fetchAlbumsByGenre } from "../../api/Music";
import type { Album } from "../../types/AlbumType/Album";
import { fetchBadOmensAlbums } from "../../api/Artist";
import AlbumCover from "../../components/AlbumCover/AlbumCover";
import { motion, AnimatePresence } from "framer-motion";

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

  // Carrega novo álbum
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
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlbum();
  }, [selectedGenre]);

  const handleGuess = () => {
    if (!album) return;

    const correct =
      guess.trim().toLowerCase() === album.artist.toLowerCase() ||
      guess.trim().toLowerCase() === album.albumTitle.toLowerCase();

    if (correct) {
      setFeedback("success");
      setScore((prev) => prev + 1);
      setPixelLevel(1);
      setTimeout(() => loadAlbum(), 2000);
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
      }

      if (newAttempts === 0) {
        setTimeout(() => loadAlbum(), 3000);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(e.target.value);
    setFeedback(null);
  };

  const sharpnessPercentage =
    ((maxAttempts - attemptsLeft + 1) / maxAttempts) * 100;

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#F7FAFC] min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#2D3748] px-4 sm:px-10 py-3">
        <h1 className="text-white text-lg font-bold">GUESS THE BAND</h1>
        <p className="text-white">Pontuação: {score}</p>
      </header>

      {/* Seletor de gênero */}
      <div className="flex justify-center gap-3 mt-6">
        {["rock", "pop", "indie", "80s", "metalcore"].map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedGenre === genre
                ? "bg-primary text-white"
                : "border border-white/30 text-white/80 hover:bg-white/10"
            }`}
          >
            {genre.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Main */}
      <main className="flex flex-col items-center justify-center flex-1 w-full gap-8 py-10 px-4">
        {loading ? (
          <p>Carregando álbum...</p>
        ) : album ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={album.mbid}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-lg bg-[#121212] rounded-xl shadow-lg overflow-hidden flex justify-center items-center"
            >
              <AlbumCover url={album.coverArtUrl} pixelLevel={pixelLevel} />
            </motion.div>
          </AnimatePresence>
        ) : (
          <p>Nenhum álbum encontrado para o gênero selecionado.</p>
        )}

        {/* Status */}
        {!loading && album && (
          <>
            <div className="w-full max-w-lg flex flex-col items-center gap-4">
              <p>{attemptsLeft} tentativas restantes</p>
              <div className="rounded-full bg-[#2D3748] h-2 w-full">
                <div
                  className="h-2 rounded-full bg-primary transition-all duration-300"
                  style={{ width: `${sharpnessPercentage}%` }}
                ></div>
              </div>
              {hint && <p className="text-yellow-400">{hint}</p>}
            </div>

            {/* Input */}
            <div className="w-full max-w-lg flex flex-col sm:flex-row items-end gap-4">
              <input
                className="form-input w-full rounded-lg text-white bg-[#2D3748] h-14 p-[15px]"
                placeholder="Digite o nome da banda ou álbum..."
                value={guess}
                onChange={handleChange}
                disabled={attemptsLeft === 0 || feedback === "success"}
              />
              <button
                onClick={handleGuess}
                disabled={attemptsLeft === 0 || feedback === "success"}
                className="h-14 px-6 bg-primary text-white font-bold rounded-lg hover:scale-105 transition-transform"
              >
                Adivinhar
              </button>
            </div>

            {/* Feedback */}
            {feedback === "success" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400"
              >
                ✅ Acertou! Era {album.artist} - {album.albumTitle}
              </motion.p>
            )}
            {attemptsLeft === 0 && feedback === "error" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400"
              >
                ❌ Fim de jogo! Era {album.artist} - {album.albumTitle}
              </motion.p>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Game;
