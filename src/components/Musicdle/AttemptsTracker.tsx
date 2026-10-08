import React from "react";
import { motion } from "framer-motion";
import { Globe, Type, Music, Flag, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

interface AttemptsTrackerProps {
  currentAttempts: number;
  maxAttempts: number;
  isWin: boolean;
  isGameOver: boolean;
}

export const AttemptsTracker: React.FC<AttemptsTrackerProps> = ({
  currentAttempts,
  maxAttempts,
  isWin,
  isGameOver,
}) => {
  const percentage = Math.min(100, (currentAttempts / maxAttempts) * 100);
  const remaining = Math.max(0, maxAttempts - currentAttempts);

  // Status color 
  const getProgressColor = () => {
    if (isWin) return "from-emerald-500 to-teal-400";
    if (isGameOver) return "from-rose-600 to-red-500";
    if (currentAttempts >= 15) return "from-rose-500 to-amber-500";
    if (currentAttempts >= 10) return "from-amber-500 to-yellow-400";
    return "from-blue-500 to-indigo-500";
  };

  const checkpoints = [
    {
      step: 5,
      percent: 25,
      label: "Dica 1",
      tooltip: "Continente & Década",
      icon: <Globe size={11} />,
    },
    {
      step: 10,
      percent: 50,
      label: "Dica 2",
      tooltip: "Inicial & Formação",
      icon: <Type size={11} />,
    },
    {
      step: 15,
      percent: 75,
      label: "Dica 3",
      tooltip: "Maior Hit",
      icon: <Music size={11} />,
    },
    {
      step: 20,
      percent: 100,
      label: "Limite",
      tooltip: "20 Tentativas",
      icon: <Flag size={11} />,
    },
  ];

  return (
    <div className="w-full max-w-xl mx-auto mb-4 p-3 sm:p-3.5 rounded-2xl border bg-white/70 dark:bg-gray-900/70 border-gray-200/80 dark:border-gray-800/80 backdrop-blur-sm shadow-sm transition-all">
      {/* Header com contador e status */}
      <div className="flex items-center justify-between text-xs sm:text-sm mb-2.5">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-700 dark:text-gray-300">
            Tentativas:
          </span>
          <span className="font-extrabold text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40">
            {currentAttempts} / {maxAttempts}
          </span>
        </div>

        {/* Badge dinâmica de status */}
        {isWin ? (
          <span className="flex items-center gap-1 font-bold text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 size={13} /> Acertou!
          </span>
        ) : isGameOver ? (
          <span className="flex items-center gap-1 font-bold text-[11px] sm:text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-800">
            <XCircle size={13} /> Limite esgotado
          </span>
        ) : remaining <= 5 ? (
          <span className="flex items-center gap-1 font-bold text-[11px] sm:text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-800 animate-pulse">
            <AlertTriangle size={12} /> Restam apenas {remaining}!
          </span>
        ) : remaining <= 10 ? (
          <span className="font-medium text-[11px] sm:text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
            {remaining} restantes
          </span>
        ) : (
          <span className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
            {remaining} restantes
          </span>
        )}
      </div>

      {/* Barra de Progresso com Checkpoints */}
      <div className="relative pt-1 pb-4">
        {/* Trilho de fundo */}
        <div className="h-2.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden relative">
          <motion.div
            className={`h-full bg-gradient-to-r ${getProgressColor()} rounded-full transition-all duration-300`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
          />
        </div>

        {/* Checkpoint Markers */}
        <div className="absolute inset-x-0 top-0 flex justify-between pointer-events-none">
          {checkpoints.map((cp) => {
            const isReached = currentAttempts >= cp.step;
            const isNext = !isReached && currentAttempts < cp.step && (cp.step === 5 || currentAttempts >= cp.step - 5);

            return (
              <div
                key={cp.step}
                className="flex flex-col items-center"
                style={{
                  position: "absolute",
                  left: `${cp.percent}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {/* Ponto / Ícone */}
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 border -mt-1.25 shadow-xs ${
                    isReached
                      ? "bg-amber-500 text-white border-amber-300 dark:border-amber-600 ring-2 ring-amber-500/30 scale-105"
                      : isNext
                      ? "bg-white dark:bg-gray-800 text-blue-500 dark:text-blue-400 border-blue-400 ring-2 ring-blue-500/20"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 border-gray-300 dark:border-gray-700"
                  }`}
                  title={`${cp.label} (${cp.step} palpites): ${cp.tooltip}`}
                >
                  {cp.icon}
                </div>

                {/* checkpoint */}
                <span
                  className={`text-[9px] sm:text-[10px] mt-1 font-bold whitespace-nowrap select-none transition-colors ${
                    isReached
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-gray-400 dark:text-gray-600"
                  }`}
                >
                  {cp.step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttemptsTracker;
