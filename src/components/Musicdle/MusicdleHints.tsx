import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Type, Music, Check } from "lucide-react";
import type { BandData } from "../../types/MusicdleType";

interface MusicdleHintsProps {
  targetBand: BandData;
  attemptsCount: number;
  isWin: boolean;
  isGameOver: boolean;
}

interface HintTier {
  level: number;
  threshold: number;
  title: string;
  shortLabel: string;
  icon: React.ReactNode;
  getContent: (band: BandData) => {
    highlight: string;
    description: string;
  };
}

export const MusicdleHints: React.FC<MusicdleHintsProps> = ({
  targetBand,
  attemptsCount,
  isWin,
  isGameOver,
}) => {
  // Configuração 
  const hints: HintTier[] = [
    {
      level: 1,
      threshold: 5,
      title: "Origem & Década de Formação",
      shortLabel: "Origem & Época",
      icon: <Globe size={18} className="text-amber-500" />,
      getContent: (band) => {
        const decade = Math.floor(band.formedYear / 10) * 10;
        return {
          highlight: `Continente: ${band.continent} • Década de ${decade}s`,
          description: `A banda se originou no continente ${band.continent} e iniciou as atividades nos anos ${decade}s (especificamente em ${band.formedYear}).`,
        };
      },
    },
    {
      level: 2,
      threshold: 10,
      title: "Inicial do Nome & Formação",
      shortLabel: "Inicial & Membros",
      icon: <Type size={18} className="text-amber-500" />,
      getContent: (band) => {
        const firstLetter = band.name.trim()[0]?.toUpperCase() || "?";
        const membersText =
          band.membersCount === 1 ? "1 integrante" : `${band.membersCount} integrantes`;
        return {
          highlight: `Letra Inicial: "${firstLetter}" • Formato: ${band.format} (${membersText})`,
          description: `O nome da banda começa com a letra "${firstLetter}" e sua composição é no formato ${band.format} (${membersText}).`,
        };
      },
    },
    {
      level: 3,
      threshold: 15,
      title: "Maior Hit / Música de Sucesso",
      shortLabel: "Hit Mundial",
      icon: <Music size={18} className="text-amber-500" />,
      getContent: (band) => ({
        highlight: `Música mais famosa: "${band.topTrack}"`,
        description: `Um dos maiores sucessos e músicas de destaque dessa banda é o hit "${band.topTrack}".`,
      }),
    },
  ];

  const unlockedHints = hints.filter((h) => attemptsCount >= h.threshold);

  // Não renderiza nada se venceu, perdeu ou se nenhuma dica foi desbloqueada ainda (< 5)
  if (isWin || isGameOver || unlockedHints.length === 0) return null;

  return (
    <div className="w-full max-w-xl mx-auto mb-4 space-y-2">
      <AnimatePresence>
        {unlockedHints.map((hint) => {
          const content = hint.getContent(targetBand);
          return (
            <motion.div
              key={hint.level}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="p-2.5 sm:p-3 rounded-2xl border text-xs sm:text-sm bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/30 text-amber-950 dark:text-amber-100 shadow-sm"
            >
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
                  {hint.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="font-bold text-[11px] uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <Check size={12} className="stroke-[3]" /> Dica {hint.level} ({hint.threshold} Palpites): {hint.title}
                    </span>
                  </div>

                  <p className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white mt-0.5">
                    {content.highlight}
                  </p>
                  <p className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed">
                    {content.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default MusicdleHints;
