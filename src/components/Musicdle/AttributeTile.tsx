import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";
import type { MatchStatus, Direction } from "../../types/MusicdleType";

interface AttributeTileProps {
  label?: string;
  value: React.ReactNode;
  status: MatchStatus;
  direction?: Direction;
  delayIndex?: number;
}

export const AttributeTile: React.FC<AttributeTileProps> = ({
  label,
  value,
  status,
  direction,
  delayIndex = 0,
}) => {
  // Paleta de cores Loldle premium
  const statusClasses = {
    correct:
      "bg-emerald-600 border-emerald-400/60 text-white shadow-lg shadow-emerald-950/40",
    partial:
      "bg-amber-600 border-amber-400/60 text-white shadow-lg shadow-amber-950/40",
    wrong:
      "bg-rose-700 border-rose-500/60 text-white shadow-lg shadow-rose-950/30",
  }[status];

  return (
    <motion.div
      initial={{ rotateX: 90, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{
        duration: 0.45,
        delay: delayIndex * 0.12,
        ease: "easeOut",
      }}
      className={`relative flex flex-col items-center justify-center p-1.5 sm:p-2.5 md:p-3 text-center rounded-xl border font-bold text-[11px] sm:text-xs md:text-sm select-none min-h-[68px] sm:min-h-[80px] transition-transform hover:scale-102 ${statusClasses}`}
    >
      {label && (
        <span className="text-[9px] sm:text-[10px] font-semibold opacity-75 uppercase tracking-wider mb-0.5">
          {label}
        </span>
      )}

      <div className="flex items-center justify-center gap-1 leading-snug break-words px-1">
        <span>{value}</span>

        {direction === "higher" && (
          <ArrowUp
            size={16}
            className="animate-bounce text-white drop-shadow-md flex-shrink-0"
          />
        )}
        {direction === "lower" && (
          <ArrowDown
            size={16}
            className="animate-bounce text-white drop-shadow-md flex-shrink-0"
          />
        )}
      </div>
    </motion.div>
  );
};

export default AttributeTile;
