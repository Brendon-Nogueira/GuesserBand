import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export default async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return res.status(500).json({
        error: "Configuração de ambiente ausente",
        details: "SPOTIFY_CLIENT_ID ou SECRET não definidos no Vercel.",
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

    console.log("Token obtido com sucesso:", data.access_token);

    res.status(200).json({ access_token: data.access_token });
  } catch (error) {
    const axiosError = error as {
      response?: { status: number; data: any };
      message: string;
    };

    const statusCode = axiosError.response ? axiosError.response.status : 500;
    const details = axiosError.response
      ? axiosError.response.data
      : axiosError.message;

    res.status(statusCode).json({
      error: "Erro ao obter token",
      details: details,
    });
  }
};
