import React, { useEffect, useState } from "react";
import { fetchAlbums } from "../../api/Music";
import type { Album } from "../../types/AlbumType/Album";

const maxAttempts = 5;

const Game: React.FC = () => {
  const [attemptsLeft, setAttemptsLeft] = useState(maxAttempts);
  const [guess, setGuess] = useState("");
  const [blurLevel, setBlurLevel] = useState(32);
  const [feedback, setFeedback] = useState<"success" | "error" | null>(null);
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [hint, setHint] = useState("");

  // Função para carregar novo álbum
  const loadAlbum = async () => {
    setLoading(true);
    const albums = await fetchAlbums("rock");
    const randomAlbum = albums[Math.floor(Math.random() * albums.length)];
    setAlbum(randomAlbum);
    setAttemptsLeft(maxAttempts);
    setBlurLevel(32);
    setFeedback(null);
    setGuess("");
    setHint("");
    setLoading(false);
  };

  useEffect(() => {
    loadAlbum();
  }, []);

  const handleGuess = () => {
    if (!album) return;

    if (
      guess.trim().toLowerCase() === album.artist.toLowerCase() ||
      guess.trim().toLowerCase() === album.albumTitle.toLowerCase()
    ) {
      setFeedback("success");
      setScore((prev) => prev + 1);
      setTimeout(loadAlbum, 2000); // Carrega novo álbum após 2s
    } else {
      const newAttempts = attemptsLeft - 1;
      setAttemptsLeft(newAttempts);
      setFeedback("error");

      // Ajusta blur
      if (newAttempts > 0) {
        setBlurLevel((prev) => Math.max(0, prev - 32 / maxAttempts));
      }

      // Adiciona dicas
      if (newAttempts === 3) {
        setHint(`Dica: Ano do álbum é ${album.releaseYear}`);
      } else if (newAttempts === 2) {
        setHint(`Dica: A banda começa com "${album.artist[0]}"`);
      }

      // Se acabou tentativas, mostra resposta e reseta
      if (newAttempts === 0) {
        setTimeout(loadAlbum, 3000); // Carrega novo álbum após 3s
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

      {/* Main */}
      <main className="flex flex-col items-center justify-center flex-1 w-full gap-8 py-10 px-4">
        {loading ? (
          <p>Carregando álbum...</p>
        ) : (
          <>
            {/* Image */}
            <div className="w-full max-w-lg bg-[#121212] rounded-xl shadow-lg overflow-hidden">
              <div
                className="w-full aspect-square bg-center bg-cover rounded-xl transition-all duration-500"
                style={{
                  backgroundImage: `url(${album?.coverArtUrl})`,
                  filter: `blur(${blurLevel}px)`,
                }}
              ></div>
            </div>

            {/* Status */}
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
                className="h-14 px-6 bg-primary text-white font-bold rounded-lg"
              >
                Enviar
              </button>
            </div>

            {/* Feedback */}
            {feedback === "success" && (
              <p className="text-green-400">
                ✅ Acertou! Era {album?.artist} - {album?.albumTitle}
              </p>
            )}
            {attemptsLeft === 0 && feedback === "error" && (
              <p className="text-red-400">
                ❌ Fim de jogo! Era {album?.artist} - {album?.albumTitle}
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Game;