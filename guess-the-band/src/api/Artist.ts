import type { Album } from '../types/AlbumType/Album';

const BACKEND_URL = 'http://localhost:3001'; 

// Função para pegar token do backend
async function getSpotifyToken(): Promise<string> {
  const response = await fetch(`${BACKEND_URL}/spotify-token`);
  const data = await response.json();
  return data.access_token;
}

export async function fetchBadOmensAlbums(): Promise<Album[]> {
  const token = await getSpotifyToken();
  const artistId = "3ZztVuWxHzNpl0THurTFCv"; // ID do Bad Omens no Spotify

  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  return data.items.map((item: any) => ({
    mbid: item.id,
    artist: "Bad Omens",
    albumTitle: item.name,
    releaseYear: parseInt(item.release_date.split("-")[0]),
    coverArtUrl: item.images[0]?.url || "",
    genre: "Metalcore",
  }));
}
