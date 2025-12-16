import type { Album } from "../types/AlbumType/Album";

const BACKEND_URL =
  import.meta.env.MODE === "production" ? "" : "http://localhost:3001";

export const ARTIST_MAP: Record<string, string[]> = {
  rock: [
    "Led Zeppelin",
    "Pink Floyd",
    "Queen",
    "The Rolling Stones",
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
    "Creed",
    "Skid Row",
    "The Doors",
    "Deep Purple",
    "Black Sabbath",
    "Bon Jovi",
    "U2",
    "Maneskin",
    "Sepultura",
    "Ghost",
    "Rammstein",
    "The Clash",
    "Blink-182",
    "Def Leppard",
    "Rush",
    "Radiohead",
    "David Bowie",
    "Bob Dylan",
    "Santana",
    "Fleetwood Mac",
    "Eagles",
    "Green Day",
    "Linkin Park",
    "Jimmy Page",
    "Kiss",
    "Lynyrd Skynyrd",
    "The Police",
    "Journey",
    "The Kinks",
    "Yes",
    "R.E.M.",
    "a-ha",
    "Iron Maiden",
    "Judas Priest",
    "Motörhead",
    "Steppenwolf",
    "Creedence Clearwater Revival",
    "Allman Brothers Band",
    "The Doors of Perception",
    "Black Flag",
    "Queensrÿche",
    "Megadeth",
    "Greta Van Fleet",
    "Anthrax",
    "Ramones",
    "Faith No More",
    "Tool",
    "Dream Theater",
    "Van Halen",
    "Slayer",
    "Pantera",
    "Alice in Chains",
    "Rage Against the Machine",
    "System of a Down",
    "Muse",
    "The White Stripes",
    "The Strokes",
    "Oasis",
    "Blur",
    "Coldplay",
    "Paramore",
    "Evanescence",
    "Thirty Seconds to Mars",
    "Kings of Leon",
    "The Smashing Pumpkins",
    "Pixies",
    "Nine Inch Nails",
    "The Cure",
    "Depeche Mode",
    "Panic! at the Disco",
    "My Chemical Romance",
    "Fall Out Boy",
    "The Black Crowes",
    "ZZ Top",
    "Whitesnake",
    "Foreigner",
    "Bad Company",
    "Chicago",
    "Steve Miller Band",
    "Limp Bizkit",
    "Marilyn Manson",
    "Alice Cooper",
    "Motley Crüe",
    "Def Leppard",
    "Scorpions",
    "Boston",
    "REO Speedwagon",
    "Toto",
    "Cheap Trick",
    "Genesis",
    "Kansas",
    "Emerson, Lake & Palmer",
    "The Moody Blues",
    "Uriah Heep",
    "King Crimson",
    "Steely Dan",
    "Beastie Boys",
    "The Offspring",
    "NOFX",
    "Bad Religion",
    "Social Distortion",
    "Sum 41",
    "Good Charlotte",
    "The Rasmus",
    "Incubus",
    "Papa Roach",
    "Disturbed",
    "Avenged Sevenfold",
  ],
  pop: [
    "Madonna",
    "Michael Jackson",
    "Beyoncé",
    "Taylor Swift",
    "Rihanna",
    "Lady Gaga",
    "Britney Spears",
    "Ariana Grande",
    "Katy Perry",
    "Dua Lipa",
    "Bruno Mars",
    "Justin Timberlake",
    "Ed Sheeran",
    "Selena Gomez",
    "Miley Cyrus",
    "The Weeknd",
    "Harry Styles",
    "Billie Eilish",
    "Olivia Rodrigo",
    "Doja Cat",
    "Charlie Puth",
    "Shawn Mendes",
    "Sam Smith",
    "Adele",
    "Lorde",
    "Camila Cabello",
    "Sia",
    "Halsey",
    "Carly Rae Jepsen",
    "Ellie Goulding",
    "Demi Lovato",
    "Nicki Minaj",
    "Christina Aguilera",
    "Jennifer Lopez",
    "Kesha",
    "Pink",
    "Kelly Clarkson",
    "Jason Derulo",
    "Meghan Trainor",
    "Maroon 5",
    "OneRepublic",
    "Imagine Dragons",
    "Ava Max",
    "Charli XCX",
    "Rita Ora",
    "Zara Larsson",
    "Tove Lo",
    "Bebe Rexha",
    "Celine Dion",
    "Whitney Houston",
    "Janet Jackson",
    "George Michael",
    "Prince",
    "Elton John",
    "Cher",
    "Gloria Estefan",
    "Backstreet Boys",
    "NSYNC",
    "Spice Girls",
    "Christina Perri",
    "Norah Jones",
    "Jessie J",
    "Leona Lewis",
    "Annie Lennox",
    "Shakira",
    "Enrique Iglesias",
    "Ricky Martin",
    "Alicia Keys",
    "John Legend",
    "Adele",
    "Sam Smith",
    "Troye Sivan",
    "Conan Gray",
    "Lana Del Rey",
    "Rina Sawayama",
    "Grimes",
    "Frank Ocean",
    "Lizzo",
    "Rosalía",
    "Måneskin",
    "Jonas Brothers",
    "Carly Rae Jepsen",
    "Hailee Steinfeld",
    "Tinashe",
    "Becky G",
    "Sabrina Carpenter",
    "Niall Horan",
    "ZAYN",
    "Louis Tomlinson",
    "Khalid",
    "Julia Michaels",
    "Alessia Cara",
    "BTS",
    "BLACKPINK",
    "TWICE",
    "SEVENTEEN",
    "NewJeans",
    "Charli XCX",
    "Jessie Ware",
    "Janelle Monáe",
    "Florence + The Machine",
    "Rex Orange County",
    "Laufey",
  ],
  indie: [
    "Arctic Monkeys",
    "The Strokes",
    "Tame Impala",
    "Vampire Weekend",
    "Florence + The Machine",
    "Imagine Dragons",
    "The 1975",
    "The Killers",
    "MGMT",
    "Two Door Cinema Club",
    "Foster The People",
    "Cage The Elephant",
    "Alt-J",
    "The Neighbourhood",
    "Phoenix",
    "The xx",
    "Of Monsters and Men",
    "Portugal. The Man",
    "M83",
    "The Lumineers",
    "Mumford & Sons",
    "Bastille",
    "Cold War Kids",
    "The Kooks",
    "Franz Ferdinand",
    "Bloc Party",
    "Foals",
    "Yeah Yeah Yeahs",
    "Interpol",
    "The National",
    "Bon Iver",
    "Lana Del Rey",
    "Beabadoobee",
    "Clairo",
    "Girl in Red",
    "Wallows",
    "The Drums",
    "Mac DeMarco",
    "Rex Orange County",
    "Dayglow",
    "Boy Pablo",
    "The Vaccines",
    "The Wombats",
    "Death Cab for Cutie",
    "The Shins",
    "CHVRCHES",
    "Beach House",
    "The War on Drugs",
    "Alvvays",
    "The Paper Kites",
    "Local Natives",
    "Grizzly Bear",
    "Fleet Foxes",
    "The Japanese House",
    "Men I Trust",
    "Temples",
    "BØRNS",
    "Haim",
    "King Princess",
    "Grouplove",
    "Passion Pit",
    "The Postal Service",
    "Sufjan Stevens",
    "The Kills",
    "Broken Bells",
    "The Fratellis",
    "The Coral",
    "Kaiser Chiefs",
    "Catfish and the Bottlemen",
    "The Vaccines",
    "Noah Kahan",
    "Matt Maeson",
    "Half•Alive",
    "The Strumbellas",
    "COIN",
    "Sir Chloe",
    "Glass Animals",
    "Wet Leg",
    "Billie Marten",
    "Gorillaz",
    "Metric",
    "Christine and the Queens",
    "Frou Frou",
    "Angus & Julia Stone",
    "Vance Joy",
    "Birdy",
    "James Bay",
    "Lord Huron",
    "Florence + The Machine",
    "Phoebe Bridgers",
    "Lucy Dacus",
    "Snail Mail",
    "Soccer Mommy",
    "Elliott Smith",
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
    "I Prevail",
    "Bullet For My Valentine",
    "As I Lay Dying",
    "Killswitch Engage",
    "Trivium",
    "August Burns Red",
    "Beartooth",
    "Motionless In White",
    "Erra",
    "Attila",
    "Polaris",
    "Bury Tomorrow",
    "Make Them Suffer",
    "Of Mice & Men",
    "Ice Nine Kills",
    "Born of Osiris",
    "Counterparts",
    "Veil of Maya",
    "Chelsea Grin",
    "Miss May I",
    "The Ghost Inside",
    "The Amity Affliction",
    "Atreyu",
    "Underoath",
    "Good Charlotte",
    "Sum 41",
    "Gideon",
    "In Hearts Wake",
    "Thornhill",
    "Void of Vision",
    "Windwaker",
    "Jinjer",
    "Dayseeker",
    "Crown The Empire",
    "Imminence",
    "Paleface Swiss",
    "Baby Metal",
    "Five Pointe O",
    "Make Them Suffer",
    "Allt",
    "Oceans Ate Alaska",
    "Counterparts",
    "After the Burial",
    "The Plot In You",
    "Sleep Theory",
    "The Word Alive",
    "Three Days Grace",
    "PRESIDENT",
    "Too Close To Touch",
  ],
};

async function getSpotifyToken(): Promise<string> {
  let apiUrl: string;

  // chamada vercel
  if (import.meta.env.MODE === "production") {
    apiUrl = "/api/spotify-token";
  } else {
    // chamada local
    apiUrl = `${BACKEND_URL}/spotify-token`;
  }

  console.log("Buscando token Spotify em:", apiUrl);

  const response = await fetch(apiUrl);
  // const response = await fetch(`${BACKEND_URL}/api/spotify-token`);
  //const response = await fetch(`/api/spotify-token`);

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Erro ao obter token da API:", errorData);
    throw new Error(`Falha ao buscar token: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}

// Função para buscar álbuns no Spotify
export async function fetchAlbumsByGenre(
  genre: string,
  lastArtist: string | null = null
): Promise<Album[]> {
  const token = await getSpotifyToken();

  const artists = ARTIST_MAP[genre.toLowerCase()];
  if (!artists || artists.length === 0) {
    console.warn(`Nenhum artista encontrado para o gênero "${genre}".`);
    return [];
  }

  // Tenta buscar de até 5 artistas diferentes se não encontrar álbuns
  const maxRetries = 5;

  for (let i = 0; i < maxRetries; i++) {
    // Escolhe um artista aleatório diferente do anterior
    let randomArtist: string;
    let attempts = 0;
    do {
      randomArtist = artists[Math.floor(Math.random() * artists.length)];
      attempts++;
    } while (
      randomArtist === lastArtist &&
      artists.length > 1 &&
      attempts < 10
    );

    try {
      // Removido o offset aleatório que causava resultados vazios
      // Removido o typo '$$' da query e usado 'artist:' para busca mais precisa
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=artist:${encodeURIComponent(
          randomArtist
        )}&type=album&limit=50`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        console.warn(
          `Erro ao buscar álbuns de ${randomArtist}: ${response.status}`
        );
        continue;
      }

      const data = await response.json();

      const retornoTratado: Album[] =
        data.albums?.items
          ?.filter((item: any) => item.album_type === "album")
          // Filtra para garantir que o artista principal é o que buscamos (evita feats e coletâneas incorretas)
          .filter(
            (item: any) =>
              item.artists[0]?.name
                .toLowerCase()
                .includes(randomArtist.toLowerCase()) ||
              randomArtist
                .toLowerCase()
                .includes(item.artists[0]?.name.toLowerCase())
          )
          .map((item: any) => ({
            mbid: item.id,
            artist: item.artists[0]?.name ?? randomArtist,
            albumTitle: item.name,
            releaseYear: parseInt(item.release_date?.split("-")[0] ?? "0"),
            coverArtUrl: item.images?.[0]?.url ?? "",
            genre,
          })) || [];

      if (retornoTratado.length > 0) {
        // console.log(
        //   `Álbuns encontrados para ${randomArtist}: ${retornoTratado.length}`
        // );
        return retornoTratado;
      }

      // Se chegou aqui, não achou álbuns válidos para este artista, tenta o próximo do loop
      // console.log(`Tentativa ${i+1}: Nenhum álbum válido encontrado para ${randomArtist}, tentando outro...`);
    } catch (error) {
      console.error(`Erro na tentativa ${i + 1} com ${randomArtist}:`, error);
    }
  }

  console.error("Falha ao encontrar álbuns após várias tentativas.");
  return [];
}

// Busca álbuns por década (Thematic Mode)
export async function fetchAlbumsByDecade(
  decade: string,
  lastArtist: string | null = null
): Promise<Album[]> {
  const token = await getSpotifyToken();

  // Mapeamento de décadas para anos
  const decadeMap: Record<string, string> = {
    "70s": "1970-1979",
    "80s": "1980-1989",
    "90s": "1990-1999",
    "2000s": "2000-2009",
    "2010s": "2010-2019",
  };

  const yearRange = decadeMap[decade] || "2020-2024";

  // Lista de gêneros
  const validGenres = [
    "rock",
    "pop",
    "metal",
    "indie",
    "alternative",
    "metal core",
  ];
  const maxRetries = 5;

  for (let i = 0; i < maxRetries; i++) {
    const randomGenre =
      validGenres[Math.floor(Math.random() * validGenres.length)];

    // Configuração de tentativa progressiva com maior entropia:
    // 0: Offset 0-500 + gênero (Alta variedade)
    // 1: Offset 0-250 + gênero (Média variedade)
    // 2: Offset 0-50 + gênero (Alta probabilidade)
    // 3: Offset 0 + gênero (Segurança no gênero)
    // 4: Offset 0 + sem gênero (Fallback total)

    let queryOffset = 0;
    let queryGenreString = ` genre:${randomGenre}`;

    if (i === 0) {
      queryOffset = Math.floor(Math.random() * 500);
    } else if (i === 1) {
      queryOffset = Math.floor(Math.random() * 250);
    } else if (i === 2) {
      queryOffset = Math.floor(Math.random() * 50);
    } else if (i === 3) {
      queryOffset = 0;
    } else {
      queryOffset = 0;
      queryGenreString = "";
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=year:${yearRange}${queryGenreString}&type=album&limit=50&offset=${queryOffset}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        console.warn(
          `Erro ao buscar álbuns da década ${decade} (Tentativa ${i + 1}): ${
            response.status
          }`
        );
        continue;
      }

      const data = await response.json();

      const retornoTratado: Album[] =
        data.albums?.items
          ?.filter((item: any) => item.album_type === "album")
          .map((item: any) => ({
            mbid: item.id,
            artist: item.artists[0]?.name ?? "Desconhecido",
            albumTitle: item.name,
            releaseYear: parseInt(item.release_date?.split("-")[0] ?? "0"),
            coverArtUrl: item.images?.[0]?.url ?? "",
          }))
          // Remove o artista anterior se houver
          .filter(
            (album: Album) => !lastArtist || album.artist !== lastArtist
          ) || [];

      if (retornoTratado.length > 0) {
        return retornoTratado;
      }
    } catch (error) {
      console.error(
        `Erro ao buscar álbuns da década ${decade} (Tentativa ${i + 1}):`,
        error
      );
    }
  }

  console.error("Falha ao encontrar álbuns por década após várias tentativas.");
  return [];
}

// Busca artistas para o autocomplete (Thematic Mode)
export async function searchArtists(query: string): Promise<string[]> {
  if (!query || query.length < 2) return [];

  const token = await getSpotifyToken();

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=artist&limit=5`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) return [];

    const data = await response.json();
    return data.artists?.items?.map((artist: any) => artist.name) || [];
  } catch (error) {
    console.error("Erro ao buscar artistas:", error);
    return [];
  }
}
