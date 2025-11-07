import type { Album } from "../types/AlbumType/Album";

const BACKEND_URL = "http://localhost:3001";

export const ARTIST_MAP: Record<string, string[]> = {
  rock: [
    "Led Zeppelin",
    "Pink Floyd",
    "Queen",
    "Rolling Stones",
    "AC/DC",
    "Jimi Hendrix",
    "Nirvana",
    "Foo Fighters",
    "The Beatles",
    "The Who",
    "Octorama",
    "Metallica",
    "Guns N' Roses",
    "Aerosmith",
    "Red Hot Chili Peppers",
    "Pearl Jam",
    "Soundgarden",
    "The Doors",
    "Deep Purple",
    "Black Sabbath",
    "Bon Jovi",
    "U2",
    "Maneskin",
    "Sepultura",
    "Ghost",
    "Rammstein",
  ],
  pop: ["Madonna", "Michael Jackson", "Beyoncé", "Taylor Swift", "Rihanna"],
  indie: [
    "Arctic Monkeys",
    "The Strokes",
    "Tame Impala",
    "Radiohead",
    "Vampire Weekend",
    "Florence + The Machine",
    "Imagine Dragons",
  ],
  "80s": ["A-ha", "Tears for Fears", "Duran Duran", "Prince", "Eurythmics"],
  metalcore: [
    "Bad Omens",
    "Axty",
    "Architects",
    "Bring Me The Horizon",
    "Parkway Drive",
    "Wage War",
    "Invent Animate",
    "Fit for a King",
    "Landmvrks",
    "Northlane",
    "Poppy",
    "Spiritbox",
    "While She Sleeps",
    "The Devil Wears Prada",
    "Bleed From Within",
    "Currents",
    "Silent Planet",
    "House Of Protection",
  ],
};

// Função para pegar token do backend
async function getSpotifyToken(): Promise<string> {
  const response = await fetch(`${BACKEND_URL}/spotify-token`);
  const data = await response.json();
  return data.access_token;
}

// Função para buscar álbuns no Spotify
export async function fetchAlbumsByGenre(genre: string): Promise<Album[]> {
  const token = await getSpotifyToken();

  const artists = ARTIST_MAP[genre.toLowerCase()];
  if (!artists || artists.length === 0) {
    console.warn(`Nenhum artista encontrado para o gênero "${genre}".`);
    return [];
  }

  // Escolhe um artista aleatório da lista para buscar
  const randomArtist = artists[Math.floor(Math.random() * artists.length)];

  const offset = Math.floor(Math.random() * 20);
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      randomArtist
    )}&type=album&limit=50&offset=${offset}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await response.json();
  console.log(data);
  return (
    data.albums?.items?.map((item: any) => ({
      mbid: item.id,
      artist: item.artists[0]?.name ?? "Desconhecido",
      albumTitle: item.name,
      releaseYear: parseInt(item.release_date?.split("-")[0] ?? "0"),
      coverArtUrl: item.images?.[0]?.url ?? "",
      genre,
    })) ?? []
  );
}
