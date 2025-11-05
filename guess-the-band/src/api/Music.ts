import type { Album } from '../types/AlbumType/Album';

const BACKEND_URL = 'http://localhost:3001'; // Ajuste se estiver em produção

// Função para pegar token do backend
async function getSpotifyToken(): Promise<string> {
  const response = await fetch(`${BACKEND_URL}/spotify-token`);
  const data = await response.json();
  return data.access_token;
}

// Função para buscar álbuns no Spotify
export async function fetchAlbums(query: string): Promise<Album[]> {
  const token = await getSpotifyToken();

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  return data.albums.items.map((item: any) => ({
    mbid: item.id,
    artist: item.artists[0].name,
    albumTitle: item.name,
    releaseYear: parseInt(item.release_date.split('-')[0]),
    coverArtUrl: item.images[0]?.url || '',
    genre: 'Desconhecido', // Spotify não retorna gênero diretamente
  }));
}