import React, { useState } from "react";

const Game: React.FC = () => {
  const maxAttempts = 5;

  const [attemptsLeft, setAttemptsLeft] = useState(maxAttempts);
  const [guess, setGuess] = useState("");
  const [blurLevel, setBlurLevel] = useState(32);
  const [feedback, setFeedback] = useState<"success" | "error" | null>(null);

  const correctAnswer = "Linkin Park"; // Exemplo fixo, depois pode vir do backend

  const handleGuess = () => {
    if (guess.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("success");
    } else {
      const newAttempts = attemptsLeft - 1;
      setAttemptsLeft(newAttempts);
      setFeedback("error");
      if (newAttempts > 0) {
        setBlurLevel((prev) => Math.max(0, prev - 32 / maxAttempts));
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
        <div className="flex items-center gap-4 text-white">
          <div className="size-5 text-primary">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6H42L36 24L42 42H6L12 24L6 6Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h1 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            GUESS THE BAND
          </h1>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex flex-col items-center justify-center flex-1 w-full gap-8 py-10 px-4">
        {/* Image Container */}
        <div className="w-full max-w-lg bg-[#121212] rounded-xl shadow-lg overflow-hidden">
          <div className="w-full aspect-square rounded-xl flex bg-[#121212]">
            <div
              className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-xl flex-1 transition-all duration-500"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDzsD_nYMgqAnbJzJOnNyhycgyDWx3VXyGTgDK-TAg2GSkRUTZrYs8Ey0jUMDOfgJeKl77CCNFeH0Ep-x98moh1sItr3-SENpOiFPUnxwgzzWKBt_prw6M_HgNSHPbBWm5DMFy_sEWMBGCw1q-ubVQpTyVkJY439VS3bg0E6WyJ9tJN7eKMn0_L-lUtfCriL5pBK3SyXDbQf-fz_12jKrcK9OagQRx2aDdV9p4A6jQpNUXSWBDTLELVt-VVeLO1WtbgLnqd1sVFQwk")',
                filter: `blur(${blurLevel}px)`,
              }}
            ></div>
          </div>
        </div>

        {/* Game Status */}
        <div className="w-full max-w-lg flex flex-col items-center gap-4">
          <div className="w-full flex flex-col gap-2">
            <p className="text-white text-base font-medium">Image Sharpness</p>
            <div className="rounded-full bg-[#2D3748] h-2">
              <div
                className="h-2 rounded-full bg-primary transition-all duration-300"
                style={{ width: `${sharpnessPercentage}%` }}
              ></div>
            </div>
          </div>
          <p className="text-[#a0aec0] text-sm text-center">
            {attemptsLeft} attempts remaining
          </p>
        </div>

        {/* Input + Button */}
        <div className="w-full max-w-lg flex flex-col sm:flex-row items-end gap-4">
          <label className="flex flex-col w-full flex-1">
            <p className="text-white text-base font-medium pb-2">Band Name</p>
            <input
              className="form-input flex w-full rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary border border-[#2D3748] bg-[#2D3748] focus:border-primary h-14 placeholder:text-[#a0aec0] p-[15px]"
              placeholder="Enter the band name..."
              value={guess}
              onChange={handleChange}
              disabled={attemptsLeft === 0 || feedback === "success"}
            />
          </label>
          <button
            onClick={handleGuess}
            disabled={attemptsLeft === 0 || feedback === "success"}
            className="flex items-center justify-center gap-2 h-14 w-full sm:w-auto shrink-0 px-6 bg-primary text-white font-bold rounded-lg hover:bg-opacity-90 active:scale-95 transition-all disabled:opacity-50"
          >
            Enviar Resposta
          </button>
        </div>

        {/* Feedback */}
        <div className="w-full max-w-lg flex flex-col items-center gap-4 mt-4">
          {feedback === "success" && (
            <div className="flex items-center justify-center gap-3 w-full p-4 rounded-lg bg-success/20 text-success border border-success">
              <span className="material-symbols-outlined text-xl">
                check_circle
              </span>
              <p className="font-medium">Acertou!</p>
            </div>
          )}
          {feedback === "error" && attemptsLeft > 0 && (
            <div className="flex items-center justify-center gap-3 w-full p-4 rounded-lg bg-error/20 text-error border border-error">
              <span className="material-symbols-outlined text-xl">cancel</span>
              <p className="font-medium">Errou! Tente novamente.</p>
            </div>
          )}
          {attemptsLeft === 0 && feedback === "error" && (
            <div className="flex items-center justify-center gap-3 w-full p-4 rounded-lg bg-error/30 text-error border border-error">
              <span className="material-symbols-outlined text-xl">close</span>
              <p className="font-medium">
                Fim de jogo! A banda era <strong>{correctAnswer}</strong>.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Game;
