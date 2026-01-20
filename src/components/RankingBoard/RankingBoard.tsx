import React, { useEffect, useState } from "react";
import {
  getRanking,
  type ScoreEntry,
  type GameMode,
} from "../../Utils/RankingUtils";
import { Trophy } from "lucide-react";

interface RankingBoardProps {
  mode: GameMode;
  refreshTrigger?: number; // Prop para forçar refresh quando uma nova pontuação é salva
}

const RankingBoard: React.FC<RankingBoardProps> = ({
  mode,
  refreshTrigger,
}) => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    setScores(getRanking(mode));
  }, [mode, refreshTrigger]);

  const isThematic = mode === "thematic";

  // Estilos Condicionais
  const containerClass = isThematic
    ? "bg-[#1a0b2e]/90 border border-[#7645d9] shadow-[0_0_20px_rgba(118,69,217,0.4)]"
    : "bg-white dark:bg-[#1b1b1b] shadow-lg border border-gray-200 dark:border-gray-700";

  const titleClass = isThematic
    ? "text-[#00ffff] font-display uppercase tracking-widest drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]"
    : "text-gray-800 dark:text-gray-100 font-bold";

  const itemClass = (index: number) => {
    if (isThematic) {
      return "border-b border-[#7645d9]/30 text-[#d4b3ff] hover:bg-[#7645d9]/20";
    }
    return `border-b border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 ${
      index === 0 ? "bg-yellow-50 dark:bg-yellow-900/10" : ""
    }`;
  };

  const scoreClass = isThematic
    ? "text-[#ff00ff] font-mono"
    : "text-blue-600 dark:text-blue-400 font-bold";

  return (
    <div
      className={`rounded-xl p-6 w-full max-w-sm ${containerClass} transition-all duration-300`}
    >
      <div className="flex items-center gap-3 mb-6">
        <Trophy
          className={isThematic ? "text-[#ff00ff]" : "text-yellow-500"}
          size={isThematic ? 28 : 24}
        />
        <h3 className={`text-xl ${titleClass}`}>
          {isThematic ? "Top Hackers" : "Ranking"}
        </h3>
      </div>

      {scores.length === 0 ? (
        <p
          className={`text-center py-4 ${
            isThematic ? "text-[#7645d9]" : "text-gray-400"
          }`}
        >
          Nenhum recorde ainda. Seja o primeiro!
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {scores.map((score, index) => (
            <li
              key={index}
              className={`flex justify-between items-center py-3 px-2 rounded ${itemClass(
                index,
              )}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                    index === 0
                      ? "bg-yellow-400 text-white"
                      : index === 1
                        ? "bg-gray-400 text-white"
                        : index === 2
                          ? "bg-orange-400 text-white"
                          : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="text-sm">{score.date}</span>
              </div>
              <span className={`text-lg ${scoreClass}`}>{score.points}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RankingBoard;
