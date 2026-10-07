import type { Album } from "../types/AlbumType/Album";
import { getSpotifyToken } from "./Music";

export async function fetchBadOmensAlbums(): Promise<Album[]> {
  const token = await getSpotifyToken();
  const artistId = "3Ri4H12KFyu98LMjSoij5V"; // ID do Bad Omens no Spotify

  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Erro seguro ao buscar álbuns:", response.status);
    throw new Error(`Falha ao buscar álbuns: ${response.statusText}`);
  }

  return data.items.map((item: any) => ({
    mbid: item.id,
    artist: "Bad Omens",
    albumTitle: item.name,
    releaseYear: parseInt(item.release_date?.split("-")[0] || "0"),
    coverArtUrl: item.images?.[0]?.url || "",
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

