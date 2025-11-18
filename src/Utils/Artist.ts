import type { Album } from "../types/AlbumType/Album";

const BACKEND_URL =
  import.meta.env.MODE === "production" ? "" : "http://localhost:3001";

// Função para pegar token do backend
async function getSpotifyToken(): Promise<string> {
  let apiUrl: string;

  if (import.meta.env.MODE === "production") {
    apiUrl = "/api/spotify-token";
  } else {
    apiUrl = `${BACKEND_URL}/spotify-token`;
  }
  console.log("Buscando token Spotify em:", apiUrl);

  const response = await fetch(apiUrl);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Erro ao obter token da API:", errorData);
    throw new Error(`Falha ao buscar token: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}
export async function fetchBadOmensAlbums(): Promise<Album[]> {
  const token = await getSpotifyToken();
  const artistId = "3Ri4H12KFyu98LMjSoij5V"; // ID do Bad Omens no Spotify

  const response = await fetch(
    `https://api.spotify.com/v1/artists/$$${artistId}/albums?include_groups=album,single&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Erro ao buscar álbuns:", data);
    throw new Error(`Falha ao buscar álbuns: ${response.statusText}`);
  }

  return data.items.map((item: any) => ({
    mbid: item.id,
    artist: "Bad Omens",
    albumTitle: item.name,
    releaseYear: parseInt(item.release_date.split("-")[0]),
    coverArtUrl: item.images[0]?.url || "",
    genre: [
      "metalcore",
      "djent",
      "metal",
      "mathcore",
      "post-hardcore",
      "deathcore",
    ],
  }));
}
