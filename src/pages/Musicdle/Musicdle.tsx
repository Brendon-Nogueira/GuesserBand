import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BAND_DATABASE } from "../../Utils/BandDatabase";
import { evaluateBandGuess } from "../../Utils/BandComparator";
import type { BandData, GuessEvaluation } from "../../types/MusicdleType";
import GuessRow from "../../components/Musicdle/GuessRow";
import MusicdleInput from "../../components/Musicdle/MusicdleInput";
import BandAvatar from "../../components/Musicdle/BandAvatar";
import ThemeToggleButton from "../../components/ThemeToggleButton/ThemeToggleButton";
import { useTheme } from "../../context/ThemeContext/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Trophy,
  RotateCcw,
  HelpCircle,
  Lightbulb,
  Music,
} from "lucide-react";

export type MusicdleCategory = "all" | "metalcore" | "brazil" | "classics";

const CATEGORIES: { id: MusicdleCategory; label: string; icon: string }[] = [
  { id: "all", label: "Todas as Bandas", icon: "🔥" },
  { id: "metalcore", label: "Metalcore & Metal", icon: "⚡" },
  { id: "brazil", label: "Brasil / Nacional", icon: "🇧🇷" },
  { id: "classics", label: "Rock Clássico & Alternativo", icon: "🎸" },
];

export const Musicdle: React.FC = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] =
    useState<MusicdleCategory>("all");

  const getCategoryBands = (cat: MusicdleCategory): BandData[] => {
    switch (cat) {
      case "metalcore":
        return BAND_DATABASE.filter((b) =>
          b.genres.some((g) =>
            /metalcore|death|djent|deathcore|heavy metal|thrash|groove|nu metal|industrial|metal|post-hardcore/i.test(
              g
            )
          )
        );
      case "brazil":
        return BAND_DATABASE.filter(
          (b) => b.country === "Brasil" || b.flag === "🇧🇷"
        );
      case "classics":
        return BAND_DATABASE.filter(
          (b) =>
            b.country !== "Brasil" &&
            !b.genres.some((g) => /metalcore|djent|deathcore/i.test(g))
        );
      default:
        return BAND_DATABASE;
    }
  };

  const [targetBand, setTargetBand] = useState<BandData>(() => {
    return BAND_DATABASE[Math.floor(Math.random() * BAND_DATABASE.length)];
  });

  const [evaluations, setEvaluations] = useState<GuessEvaluation[]>([]);
  const [isWin, setIsWin] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Troca de categoria
  const handleSelectCategory = (cat: MusicdleCategory) => {
    if (cat === selectedCategory) return;
    setSelectedCategory(cat);
    const pool = getCategoryBands(cat);
    const newTarget =
      pool[Math.floor(Math.random() * pool.length)] || BAND_DATABASE[0];
    setTargetBand(newTarget);
    setEvaluations([]);
    setIsWin(false);
  };

  // Reiniciar partida
  const handleRestart = () => {
    const pool = getCategoryBands(selectedCategory);
    const remainingBands = pool.filter((b) => b.id !== targetBand.id);
    const newTarget =
      remainingBands[Math.floor(Math.random() * remainingBands.length)] ||
      pool[0] ||
      BAND_DATABASE[0];

    setTargetBand(newTarget);
    setEvaluations([]);
    setIsWin(false);
  };

  const handleGuessBand = (guessed: BandData) => {
    if (isWin) return;

    const evaluation = evaluateBandGuess(guessed, targetBand);
    setEvaluations((prev) => [evaluation, ...prev]);

    if (evaluation.isWin) {
      setIsWin(true);
    }
  };

  const guessedIds = evaluations.map((e) => e.guessedBand.id);
  const attemptsCount = evaluations.length;

  return (
    <div
      className={`min-h-screen flex flex-col font-display transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#090b14] text-white"
          : "bg-[#f8fafc] text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md px-3 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between transition-colors ${
          theme === "dark"
            ? "border-gray-800/80 bg-[#090b14]/85"
            : "border-gray-200/80 bg-white/85 shadow-sm"
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-semibold px-2 sm:px-2.5 py-1.5 rounded-lg border border-transparent hover:border-gray-300 dark:hover:border-gray-700 hover:bg-black/5 dark:hover:bg-white/5 transition-all text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            title="Voltar ao início"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Início</span>
          </Link>

          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-black tracking-tight bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Musicdle
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowHelp((prev) => !prev)}
            className="p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-gray-500 dark:text-gray-400 cursor-pointer"
            title="Como jogar"
          >
            <HelpCircle size={18} />
          </button>

          <ThemeToggleButton />
        </div>
      </header>

      {/* Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col items-center">
        {/* Título e Subtítulo */}
        <div className="text-center max-w-xl mx-auto mb-4 sm:mb-6 px-1">
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Adivinhe a Banda Misteriosa
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Digite um artista. A cada tentativa, compare os atributos para acertar a banda secreta!
          </p>
        </div>

        {/* Modal / Card de Instruções */}
        <AnimatePresence>
          {showHelp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full max-w-xl mb-6 overflow-hidden"
            >
              <div className="p-4 rounded-2xl border text-xs sm:text-sm space-y-2 bg-blue-50/60 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40 text-blue-950 dark:text-blue-200">
                <p className="font-bold flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                  <Lightbulb size={16} /> Como funciona:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                  <div className="p-2 rounded-lg bg-emerald-600 text-white font-semibold text-center">
                    🟩 Verde: Match Exato
                  </div>
                  <div className="p-2 rounded-lg bg-amber-600 text-white font-semibold text-center">
                    🟧 Laranja: Parcial / Mesmo Continente
                  </div>
                  <div className="p-2 rounded-lg bg-rose-700 text-white font-semibold text-center">
                    🟥 Vermelho: Incorreto
                  </div>
                </div>
                <p className="text-[11px] opacity-80 pt-1 text-center">
                  Setas ⬆️ ou ⬇️ indicam se o ano de formação ou o número de integrantes é maior ou menor!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Seletor de Categoria / Vertente Musical */}
        <div className="w-full max-w-xl mb-4 sm:mb-5">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-center text-gray-400 dark:text-gray-500 mb-2">
            Sorteando mistério da vertente:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95 ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white shadow-blue-500/30 ring-2 ring-blue-500/50 scale-102"
                    : "bg-white/60 dark:bg-gray-800/60 hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="w-full mb-6">
          <MusicdleInput
            bands={BAND_DATABASE}
            guessedIds={guessedIds}
            onSelectBand={handleGuessBand}
            disabled={isWin}
          />
        </div>

        {/* Dica Progressiva */}
        {attemptsCount >= 4 && !isWin && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl mb-6 p-3 rounded-xl border text-xs flex items-center justify-between gap-3 bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-300"
          >
            <div className="flex items-center gap-2">
              <Lightbulb size={18} className="flex-shrink-0" />
              <span>
                <strong>Dica de ouro:</strong> Um dos maiores sucessos dessa banda é a faixa <em>"{targetBand.topTrack}"</em>.
              </span>
            </div>
          </motion.div>
        )}

        {/* Modal de Vitória */}
        <AnimatePresence>
          {isWin && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md p-6 rounded-3xl border text-center shadow-2xl mb-8 space-y-4 bg-gradient-to-b from-emerald-500/10 to-transparent border-emerald-500/30"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-bounce">
                <Trophy size={32} />
              </div>

              <div>
                <h3 className="text-2xl font-black text-emerald-500">
                  Você acertou!
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  A banda misteriosa era <strong>{targetBand.name}</strong>! Resolvido em {attemptsCount}{" "}
                  {attemptsCount === 1 ? "palpite" : "palpites"}.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                <BandAvatar
                  src={targetBand.image}
                  name={targetBand.name}
                  className="w-14 h-14 rounded-full border border-emerald-500"
                />
                <div className="text-left">
                  <p className="font-bold text-sm">{targetBand.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {targetBand.country} {targetBand.flag} • Formada em {targetBand.formedYear}
                  </p>
                  <p className="text-[11px] text-emerald-500 font-medium">
                    Hit: {targetBand.topTrack}
                  </p>
                </div>
              </div>

              <button
                onClick={handleRestart}
                className="w-full py-3.5 px-6 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all hover:scale-102 cursor-pointer shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 text-sm"
              >
                <RotateCcw size={18} />
                Jogar Próxima Rodada
              </button>
            </motion.div>
          )}
        </AnimatePresence>

     
        <div className="w-full">
          {evaluations.length > 0 && (
            <p className="sm:hidden text-center text-[11px] text-gray-400 dark:text-gray-500 mb-2 flex items-center justify-center gap-1 select-none">
              <span>↔️</span> Deslize para o lado para ver todos os atributos
            </p>
          )}

          <div className="w-full overflow-x-auto pb-4 pt-1 -mx-2 px-2 sm:mx-0 sm:px-0">
            <div className="min-w-[600px] sm:min-w-0 w-full">
              <div className="grid grid-cols-6 gap-1.5 sm:gap-2.5 px-2 py-2 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 select-none">
                <div>Banda</div>
                <div>Formato</div>
                <div>Gêneros</div>
                <div>País</div>
                <div>Ano</div>
                <div>Membros</div>
              </div>

              {/* Lista de Palpites */}
              <div className="space-y-2 sm:space-y-2.5 mt-1">
                {evaluations.length === 0 ? (
                  <div className="py-12 sm:py-16 text-center text-gray-400 dark:text-gray-600 space-y-2">
                    <Music size={32} className="mx-auto opacity-30 animate-pulse sm:w-9 sm:h-9" />
                    <p className="text-xs sm:text-sm font-medium">
                      Nenhum palpite enviado ainda.
                    </p>
                    <p className="text-[11px] sm:text-xs opacity-75 max-w-xs sm:max-w-md mx-auto">
                      Digite qualquer banda clássica no campo acima para começar a receber as dicas!
                    </p>
                  </div>
                ) : (
                  evaluations.map((evaluation) => (
                    <GuessRow key={evaluation.id} evaluation={evaluation} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Musicdle;
