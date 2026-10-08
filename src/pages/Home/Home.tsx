import React from "react";
import { useNavigate } from "react-router-dom";
import { ARTIST_MAP } from "../../Utils/Music";
import { useGame } from "../../context/GameContext/GameContext";
import ThemeToggleButton from "../../components/ThemeToggleButton/ThemeToggleButton";
import { Disc3, Sparkles, Clock, Flame, Music, ArrowRight, Grid3X3 } from "lucide-react";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setGenre } = useGame();

  const handleSelectGenre = (genre: string) => {
    const lowerGenre = genre.toLowerCase();
    setGenre(lowerGenre);
    localStorage.setItem("selectedGenre", lowerGenre);
    navigate("/game");
  };

  const handlePlayNow = () => {
    setGenre("rock");
    localStorage.setItem("selectedGenre", "rock");
    navigate("/game");
  };

  const handlePlayMusicdle = () => {
    navigate("/musicdle");
  };

  const handlePlayThematic = () => {
    setGenre("rock");
    localStorage.setItem("selectedGenre", "rock");
    navigate("/modo-tematico");
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-500 overflow-x-hidden font-display">
      
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-20">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-600/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl" />
      </div>

      {/* Conteúdo */}
      <header className="relative z-20 flex items-center justify-between px-4 sm:px-12 py-3.5 sm:py-5 max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <Disc3 size={20} className="animate-spin-slow" />
          </div>
          <span className="font-extrabold text-base sm:text-xl tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            GuesserBand
          </span>
        </div>

        <ThemeToggleButton showLabel />
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-6 max-w-6xl mx-auto w-full text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-4 sm:mb-5"
        >
          <Sparkles size={14} />
          <span>O Desafio Definitivo para Amantes de Música</span>
        </motion.div>

        {/* Título Principal */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] max-w-3xl"
        >
          Adivinhe suas bandas favoritas em{" "}
          <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            múltiplos modos
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-xs sm:text-base text-subtext-light dark:text-subtext-dark max-w-xl mx-auto leading-relaxed"
        >
          Do clássico mistério das capas pixeladas ao novo modo estilo Loldle com atributos comparativos em tempo real.
        </motion.p>

        {/* Cards */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mt-6 sm:mt-8 w-full max-w-5xl"
        >
         
          <div
            onClick={handlePlayMusicdle}
            className="group relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl text-left border cursor-pointer transition-all duration-300 hover:-translate-y-1.5 active:scale-98 bg-gradient-to-b from-blue-500/10 via-white/80 to-white/40 dark:from-blue-600/20 dark:via-gray-900/90 dark:to-gray-900/60 backdrop-blur-md border-blue-500/40 hover:border-blue-500 shadow-xl hover:shadow-blue-500/25 ring-2 ring-blue-500/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shadow-blue-600/30">
                <Grid3X3 size={24} />
              </div>
              <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-blue-600 text-white tracking-wide shadow-sm">
                NOVO MODO
              </span>
            </div>
            <h3 className="text-xl font-extrabold tracking-tight mb-1 text-gray-900 dark:text-white flex items-center gap-1.5">
              Musicdle (Loldle)
            </h3>
            <p className="text-xs sm:text-sm text-subtext-light dark:text-subtext-dark mb-4">
              Adivinhe a banda através de pistas de atributos: Gênero, País de Origem, Ano de Formação e Integrantes!
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
              Jogar Musicdle <ArrowRight size={14} />
            </span>
          </div>

          
          <div
            onClick={handlePlayNow}
            className="group relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl text-left border cursor-pointer transition-all duration-300 hover:-translate-y-1.5 active:scale-98 bg-white/70 dark:bg-card-dark/80 backdrop-blur-md border-border-light dark:border-border-dark hover:border-indigo-500/50 shadow-lg hover:shadow-indigo-500/15"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Flame size={24} />
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                Jogar <ArrowRight size={14} />
              </span>
            </div>
            <h3 className="text-xl font-extrabold tracking-tight mb-1 text-gray-900 dark:text-white">
              Capa Pixelada
            </h3>
            <p className="text-xs sm:text-sm text-subtext-light dark:text-subtext-dark mb-4">
              A imagem começa em baixa resolução. A cada erro, ganhe mais nitidez e dicas para identificar o álbum.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              Escolher Gênero
            </span>
          </div>

          
          <div
            onClick={handlePlayThematic}
            className="group relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl text-left border cursor-pointer transition-all duration-300 hover:-translate-y-1.5 active:scale-98 bg-white/70 dark:bg-[#1a0b2e]/80 backdrop-blur-md border-border-light dark:border-[#7645d9]/40 hover:border-purple-500/50 shadow-lg hover:shadow-purple-500/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-[#ff00ff] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock size={24} />
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-[#00ffff] group-hover:translate-x-1 transition-transform">
                Entrar <ArrowRight size={14} />
              </span>
            </div>
            <h3 className="text-xl font-extrabold tracking-tight mb-1 text-gray-900 dark:text-white">
              Viagem no Tempo
            </h3>
            <p className="text-xs sm:text-sm text-subtext-light dark:text-subtext-dark mb-4">
              Navegue pelas décadas de 70 a 2010 em um universo retro synthwave neon descobrindo discos lendários.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-[#ff00ff]">
              Explorar Eras
            </span>
          </div>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 w-full max-w-2xl"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-subtext-light dark:text-subtext-dark mb-3 flex items-center justify-center gap-1.5">
            <Music size={14} />
            Ou jogue direto com seu estilo musical favorito:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.keys(ARTIST_MAP).map((genre) => (
              <button
                key={genre}
                onClick={() => handleSelectGenre(genre)}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-200 cursor-pointer bg-white/50 dark:bg-card-dark/50 border-border-light dark:border-border-dark hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-400 hover:scale-105"
              >
                {genre}
              </button>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 border-t border-border-light dark:border-border-dark/60 text-center text-xs text-subtext-light dark:text-subtext-dark">
        <p>© 2025 GuesserBand • O jogo definitivo de adivinhação musical.</p>
      </footer>
    </div>
  );
};

export default Home;
