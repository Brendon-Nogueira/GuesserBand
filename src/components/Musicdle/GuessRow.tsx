import React from "react";
import { motion } from "framer-motion";
import type { GuessEvaluation } from "../../types/MusicdleType";
import AttributeTile from "./AttributeTile";
import BandAvatar from "./BandAvatar";

interface GuessRowProps {
  evaluation: GuessEvaluation;
}

export const GuessRow: React.FC<GuessRowProps> = ({ evaluation }) => {
  const { guessedBand, isWin } = evaluation;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`grid grid-cols-6 gap-1.5 sm:gap-2.5 w-full items-stretch p-1.5 sm:p-2 rounded-2xl border transition-all ${
        isWin
          ? "bg-emerald-500/10 border-emerald-500/40 shadow-xl shadow-emerald-500/15"
          : "bg-white/40 dark:bg-gray-900/40 border-gray-200/50 dark:border-gray-800/50 shadow-sm"
      }`}
    >
      {/* Card da Banda  */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-gray-900 text-white text-center border border-gray-700 overflow-hidden shadow-md"
      >
        <BandAvatar
          src={guessedBand.image}
          name={guessedBand.name}
          className="w-8 h-8 sm:w-11 sm:h-11 rounded-full border border-white/20 mb-1"
        />
        <span className="text-[11px] sm:text-xs font-bold leading-tight truncate max-w-full px-1">
          {guessedBand.name}
        </span>
      </motion.div>

      {/* Formato */}
      <AttributeTile
        value={guessedBand.format}
        status={evaluation.formatMatch.status}
        delayIndex={1}
      />

      {/* Gêneros */}
      <AttributeTile
        value={
          <span className="text-[11px] sm:text-xs line-clamp-2">
            {guessedBand.genres.join(", ")}
          </span>
        }
        status={evaluation.genresMatch.status}
        delayIndex={2}
      />

      {/* País */}
      <AttributeTile
        value={
          <div className="flex flex-col items-center">
            <span className="text-base sm:text-lg mb-0.5">{guessedBand.flag}</span>
            <span className="text-[10px] sm:text-xs truncate max-w-full">
              {guessedBand.country}
            </span>
          </div>
        }
        status={evaluation.countryMatch.status}
        delayIndex={3}
      />

      {/* Ano de Formação */}
      <AttributeTile
        value={guessedBand.formedYear}
        status={evaluation.yearMatch.status}
        direction={evaluation.yearMatch.direction}
        delayIndex={4}
      />

      {/* Número de Integrantes */}
      <AttributeTile
        value={
          <span>
            {guessedBand.membersCount}{" "}
            <span className="text-[10px] sm:text-xs opacity-80">
              {guessedBand.membersCount === 1 ? "membro" : "membros"}
            </span>
          </span>
        }
        status={evaluation.membersMatch.status}
        direction={evaluation.membersMatch.direction}
        delayIndex={5}
      />
    </motion.div>
  );
};

export default GuessRow;
