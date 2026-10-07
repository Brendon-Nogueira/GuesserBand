const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");


dotenv.config();
if (!process.env.SPOTIFY_CLIENT_ID) {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });
}

const app = express();

// CORS 
const allowedOrigins = [
  "https://brendon-nogueira.github.io",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Acesso bloqueado pela política CORS"));
      }
    },
  })
);

// Rate Limiter IP (60 req/min)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 60;

function rateLimiter(req, res, next) {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const clientData = rateLimitMap.get(ip) || {
    count: 0,
    resetTime: now + RATE_LIMIT_WINDOW,
  };

  if (now > clientData.resetTime) {
    clientData.count = 1;
    clientData.resetTime = now + RATE_LIMIT_WINDOW;
  } else {
    clientData.count += 1;
  }

  rateLimitMap.set(ip, clientData);

  if (clientData.count > MAX_REQUESTS) {
    return res.status(429).json({
      error: "Muitas requisições. Aguarde um momento antes de tentar novamente.",
    });
  }
  next();
}

app.use(rateLimiter);

// Cache de Token em memória
let cachedToken = null;
let tokenExpiresAt = 0;

app.get("/spotify-token", async (req, res) => {
  const now = Date.now();

  // Retorna do cache se válido (60s)
  if (cachedToken && now < tokenExpiresAt - 60000) {
    return res.json({ access_token: cachedToken });
  }

  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return res.status(500).json({
        error: "Configuração de servidor incompleta",
      });
    }

    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authString}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    const data = await response.json();
    cachedToken = data.access_token;
    tokenExpiresAt = now + (data.expires_in || 3600) * 1000;

    res.json({ access_token: cachedToken });
  } catch (error) {
    console.error("Erro seguro no backend ao buscar token:", error.message);
    res.status(502).json({
      error: "Falha na comunicação com o serviço Spotify",
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

