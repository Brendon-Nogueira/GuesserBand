import { useNavigate } from "react-router-dom";
//import { TwitterIcon, InstagramIcon, FacebookIcon } from "../../components/IconsComponents";

const Home: React.FC = () => {
  const navigate = useNavigate();

  


// const socialIcons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
//   Twitter: TwitterIcon,
//   Instagram: InstagramIcon,
//   Facebook: FacebookIcon,
// };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-hidden font-display">
      {/* Background SVG */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="soundwave"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 50 Q 25 25, 50 50 T 100 50"
                fill="none"
                stroke="#909acb"
                strokeWidth="1"
              />
              <path
                d="M0 55 Q 25 80, 50 55 T 100 55"
                fill="none"
                stroke="#909acb"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect fill="url(#soundwave)" width="100%" height="100%" />
        </svg>
      </div>

      {/* Conteúdo */}
      <div className="z-10 flex flex-col h-full">
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-5 text-center sm:px-6 md:px-8">
          <div className="flex flex-col max-w-[960px] justify-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="material-symbols-outlined text-primary text-5xl">
                music_note
              </span>
            </div>

            <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight tracking-tight px-4 pb-3 pt-6">
              Guess The Band
            </h1>
            <p className="text-white text-base font-normal leading-normal pb-6 pt-1 px-4 max-w-md mx-auto">
              Adivinhe a banda. Teste seus conhecimentos musicais e suba no
              ranking.
            </p>

            <div className="flex flex-col sm:flex-row px-4 py-3 justify-center gap-4">
              <button
                className="flex items-center justify-center w-full sm:w-auto h-12 px-8 bg-primary text-white font-bold rounded-lg transition-transform hover:scale-105"
                onClick={() => navigate("/guess-the-band/game")}
              >
                Jogar Agora
              </button>

              <button
                className="flex items-center justify-center w-full sm:w-auto h-12 px-8 border border-primary text-white font-bold rounded-lg hover:bg-primary/20 transition-colors"
                onClick={() => navigate("/guess-the-band/modo-tematico")}
              >
                Modo Temático
              </button>
            </div>

            <div className="mt-4 px-4">
              <p className="text-white/80 text-sm mb-3">
                Escolha uma categoria:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Rock", "Pop", "Indie", "80s"].map((cat) => (
                  <a
                    key={cat}
                    href="#"
                    className="px-4 py-2 rounded-full border border-white/30 text-white/80 text-sm hover:bg-white/10 hover:border-white/50 transition-colors"
                  >
                    {cat}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="#"
              className="text-[#909acb] text-sm underline hover:text-white transition-colors pb-3 pt-6 px-4 text-center"
            >
              Como Jogar
            </a>
          </div>
        </main>

        <footer className="flex flex-col gap-6 px-5 py-10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              className="text-[#909acb] text-sm hover:text-white transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-[#909acb] text-sm hover:text-white transition-colors"
              href="#"
            >
              Terms of Service
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {["Twitter", "Instagram", "Facebook"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-[#909acb] hover:text-white transition-colors"
              >
                <span className="sr-only">{social}</span>
                <i className="material-symbols-outlined">share</i>
              </a>
            ))}
          </div>

          <p className="text-[#909acb] text-sm">
            © 2025 Guess The Band. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
