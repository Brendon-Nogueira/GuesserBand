import axios from "axios";

export default async (req, res) => {
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

    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    const response = await axios.post(
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

    res.status(200).json({ access_token: data.access_token });
  } catch (error) {
    const statusCode = error.response ? error.response.status : 500;
    const details = error.response ? error.response.data : error.message;

    res.status(statusCode).json({
      error: "Erro ao obter token",
      details: details,
    });
  }
};
