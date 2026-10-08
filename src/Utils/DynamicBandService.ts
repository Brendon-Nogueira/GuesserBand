import type { BandData, Continent } from "../types/MusicdleType";
import { getSpotifyToken } from "./Music";


const dynamicBandCache = new Map<string, BandData>();

// Mapeamento de códigos de país 
const COUNTRY_INFO: Record<string, { country: string; flag: string; continent: Continent }> = {
  BR: { country: "Brasil", flag: "🇧🇷", continent: "América do Sul" },
  US: { country: "Estados Unidos", flag: "🇺🇸", continent: "América do Norte" },
  GB: { country: "Reino Unido", flag: "🇬🇧", continent: "Europa" },
  UK: { country: "Reino Unido", flag: "🇬🇧", continent: "Europa" },
  CA: { country: "Canadá", flag: "🇨🇦", continent: "América do Norte" },
  AU: { country: "Austrália", flag: "🇦🇺", continent: "Oceania" },
  DE: { country: "Alemanha", flag: "🇩🇪", continent: "Europa" },
  FR: { country: "França", flag: "🇫🇷", continent: "Europa" },
  SE: { country: "Suécia", flag: "🇸🇪", continent: "Europa" },
  FI: { country: "Finlândia", flag: "🇫🇮", continent: "Europa" },
  NO: { country: "Noruega", flag: "🇳🇴", continent: "Europa" },
  IT: { country: "Itália", flag: "🇮🇹", continent: "Europa" },
  ES: { country: "Espanha", flag: "🇪🇸", continent: "Europa" },
  JP: { country: "Japão", flag: "🇯🇵", continent: "Ásia" },
  NL: { country: "Holanda", flag: "🇳🇱", continent: "Europa" },
  IE: { country: "Irlanda", flag: "🇮🇪", continent: "Europa" },
  AR: { country: "Argentina", flag: "🇦🇷", continent: "América do Sul" },
};

function formatGenreName(g: string): string {
  return g
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Busca artistas no catálogo local e complementa dinamicamente via Spotify Web API.
 */
export async function searchDynamicBands(
  query: string,
  localBands: BandData[],
  guessedIds: string[]
): Promise<BandData[]> {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  //  Busca local 
  const localMatches = localBands
    .filter((b) => !guessedIds.includes(b.id))
    .filter((b) => b.name.toLowerCase().includes(cleanQuery));

  
  if (localMatches.length >= 6) {
    return localMatches.slice(0, 6);
  }

  // Spotify Web API
  try {
    const token = await getSpotifyToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        cleanQuery
      )}&type=artist&limit=6`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.ok) {
      const data = await response.json();
      const spotifyArtists = data.artists?.items || [];

      const results = [...localMatches];
      const seenNames = new Set(results.map((r) => r.name.toLowerCase()));

      for (const artist of spotifyArtists) {
        const lowerName = artist.name.toLowerCase();
        if (seenNames.has(lowerName)) continue;

        // Verifica se já está no cache dinâmico
        if (dynamicBandCache.has(artist.id)) {
          const cached = dynamicBandCache.get(artist.id)!;
          if (!guessedIds.includes(cached.id)) {
            results.push(cached);
            seenNames.add(lowerName);
          }
          continue;
        }

        // Estima dados preliminares baseados nos gêneros do Spotify
        const isBrazilian = artist.genres?.some((g: string) =>
          /brazil|nacional|sertanejo|pagode|bossa|mpb|tropicalia/i.test(g)
        );

        const countryInfo = isBrazilian
          ? COUNTRY_INFO.BR
          : COUNTRY_INFO.US;

        const rawGenres = (artist.genres || []).slice(0, 3);
        const genres = rawGenres.length > 0
          ? rawGenres.map((g: string) => formatGenreName(g))
          : ["Rock", "Metal"];

        const bandSkeleton: BandData = {
          id: artist.id,
          name: artist.name,
          image:
            artist.images?.[1]?.url ||
            artist.images?.[0]?.url ||
            "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400",
          format: "Banda",
          genres,
          country: countryInfo.country,
          flag: countryInfo.flag,
          continent: countryInfo.continent,
          formedYear: 2010, 
          membersCount: 4,
          topTrack: "Música em Destaque",
        };

        results.push(bandSkeleton);
        seenNames.add(lowerName);

        if (results.length >= 8) break;
      }

      return results.slice(0, 8);
    }
  } catch (error) {
    console.warn("Busca dinâmica no Spotify offline ou falhou:", error);
  }

  return localMatches.slice(0, 6);
}

export async function enrichSelectedBand(band: BandData): Promise<BandData> {
  // Se já está no cache dinâmico completo, retorna direto
  if (dynamicBandCache.has(band.id)) {
    return dynamicBandCache.get(band.id)!;
  }

  let enriched: BandData = { ...band };

  try {
    const token = await getSpotifyToken();

    // top 1 no spotify
    try {
      const topRes = await fetch(
        `https://api.spotify.com/v1/artists/${band.id}/top-tracks?market=BR`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (topRes.ok) {
        const topData = await topRes.json();
        if (topData.tracks?.[0]?.name) {
          enriched.topTrack = topData.tracks[0].name;
        }
      }
    } catch {
      
    }

    // Metadados de Origem e Ano via MusicBrainz
    try {
      const mbRes = await fetch(
        `https://musicbrainz.org/ws/2/artist/?query=artist:${encodeURIComponent(
          band.name
        )}&fmt=json`,
        {
          headers: {
            "User-Agent": "GuesserBandApp/1.0 (contact@guesserband.app)",
          },
        }
      );

      if (mbRes.ok) {
        const mbData = await mbRes.json();
        const mbArtist = mbData.artists?.[0];

        if (mbArtist) {
          // Ano de início/formação
          if (mbArtist["life-span"]?.begin) {
            const parsedYear = parseInt(mbArtist["life-span"].begin.split("-")[0]);
            if (parsedYear && parsedYear > 1950 && parsedYear <= 2026) {
              enriched.formedYear = parsedYear;
            }
          }

          // Formato (Solo x Banda)
          if (mbArtist.type === "Person") {
            enriched.format = "Solo";
            enriched.membersCount = 1;
          }

          // País e Continente
          const countryCode = mbArtist.country?.toUpperCase();
          if (countryCode && COUNTRY_INFO[countryCode]) {
            enriched.country = COUNTRY_INFO[countryCode].country;
            enriched.flag = COUNTRY_INFO[countryCode].flag;
            enriched.continent = COUNTRY_INFO[countryCode].continent;
          }
        }
      }
    } catch {
     
    }

    // Se o ano ainda não foi detectado, tenta o ano do primeiro álbum do Spotify
    if (enriched.formedYear === 2010) {
      try {
        const albumRes = await fetch(
          `https://api.spotify.com/v1/artists/${band.id}/albums?limit=50&include_groups=album`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (albumRes.ok) {
          const albumData = await albumRes.json();
          const items = albumData.items || [];
          const years = items
            .map((item: any) => parseInt(item.release_date?.split("-")[0]))
            .filter((y: number) => !isNaN(y) && y > 1950);

          if (years.length > 0) {
            enriched.formedYear = Math.min(...years);
          }
        }
      } catch {
        
      }
    }
  } catch (error) {
    console.warn("Erro ao enriquecer artista dinâmico:", error);
  }

  // Guarda no cache
  dynamicBandCache.set(band.id, enriched);
  return enriched;
}
