import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";


function spotifyTokenPlugin(env: Record<string, string>) {
  let cachedToken: string | null = null;
  let tokenExpiresAt = 0;

  return {
    name: "spotify-token-dev-middleware",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const url = req.url?.split("?")[0];
        if (url === "/api/spotify-token" || url === "/spotify-token") {
          try {
            const clientId =
              env.SPOTIFY_CLIENT_ID || process.env.SPOTIFY_CLIENT_ID;
            const clientSecret =
              env.SPOTIFY_CLIENT_SECRET || process.env.SPOTIFY_CLIENT_SECRET;

            if (!clientId || !clientSecret) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  error: "Configuração de ambiente ausente",
                  message:
                    "Defina SPOTIFY_CLIENT_ID e SPOTIFY_CLIENT_SECRET no arquivo .env",
                })
              );
              return;
            }

            const now = Date.now();
            // Retorna do cache se o token ainda for válido (60s)
            if (cachedToken && now < tokenExpiresAt - 60000) {
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ access_token: cachedToken }));
              return;
            }

            const authString = Buffer.from(
              `${clientId}:${clientSecret}`
            ).toString("base64");

            const response = await fetch(
              "https://accounts.spotify.com/api/token",
              {
                method: "POST",
                headers: {
                  Authorization: `Basic ${authString}`,
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: "grant_type=client_credentials",
              }
            );

            if (!response.ok) {
              throw new Error(`Spotify API error: ${response.status}`);
            }

            const data: any = await response.json();
            cachedToken = data?.access_token;
            tokenExpiresAt = now + ((data?.expires_in || 3600) * 1000);

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ access_token: cachedToken }));
            return;
          } catch (error: any) {
            console.error("Erro no middleware de token Spotify:", error?.message);
            res.statusCode = 502;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                error: "Falha na comunicação com o serviço Spotify",
              })
            );
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  
  if (!env.SPOTIFY_CLIENT_ID) {
    try {
      const backendEnvPath = path.resolve(process.cwd(), "backend", ".env");
      if (fs.existsSync(backendEnvPath)) {
        const content = fs.readFileSync(backendEnvPath, "utf-8");
        content.split("\n").forEach((line) => {
          const [key, val] = line.split("=");
          if (key && val) env[key.trim()] = val.trim();
        });
      }
    } catch {
      
    }
  }

  return {
    base: "/",
    plugins: [react(), spotifyTokenPlugin(env)],
    server: {
      proxy: {
        // Fallback para servidor Express se estiver rodando
        "/express-api": {
          target: "http://localhost:3001",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/express-api/, ""),
        },
      },
    },
  };
});

