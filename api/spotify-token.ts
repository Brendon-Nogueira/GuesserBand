import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}


let cachedToken: string | null = null;
let tokenExpiresAt = 0;

export default async (req: VercelRequest, res: VercelResponse) => {
 
  const origin = (req.headers.origin as string) || "";
  const isAllowedOrigin =
    !origin ||
    origin.includes("github.io") ||
    origin.includes("localhost") ||
    origin.includes("vercel.app");

  if (isAllowedOrigin && origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  
  const now = Date.now();
  if (cachedToken && now < tokenExpiresAt - 60000) {
    return res.status(200).json({ access_token: cachedToken });
  }

  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return res.status(500).json({
        error: "Configuração do servidor ausente",
      });
    }

    const authString: string = Buffer.from(
      `${clientId}:${clientSecret}`
    ).toString("base64");

    const response = await axios.post<SpotifyTokenResponse>(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${authString}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = response.data;
    cachedToken = data.access_token;
    tokenExpiresAt = now + (data.expires_in || 3600) * 1000;

    res.status(200).json({ access_token: data.access_token });
  } catch (error) {
    const axiosError = error as {
      response?: { status: number; data: any };
      message: string;
    };

    console.error("Erro seguro ao obter token do Spotify:", axiosError.message);
    const statusCode = axiosError.response?.status || 502;

    
    res.status(statusCode).json({
      error: "Falha na autenticação com serviço de streaming",
    });
  }
};

