const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

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

    const data = await response.json();
    res.status(200).json({ access_token: data.access_token });
  } catch (error) {
    res.status(500).json({ error: "Erro interno", details: error.message });
  }
};
