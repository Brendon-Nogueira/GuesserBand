import type { Album } from "../types/AlbumType/Album";

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

let cachedSpotifyToken: string | null = null;
let tokenExpiryTime: number = 0;

export async function getSpotifyToken(): Promise<string> {
  
  if (cachedSpotifyToken && Date.now() < tokenExpiryTime) {
    return cachedSpotifyToken;
  }

  
  const candidateEndpoints = [
    "/api/spotify-token",
    "/spotify-token",
    "http://localhost:3001/spotify-token",
  ];

  for (const endpoint of candidateEndpoints) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        if (data.access_token) {
          cachedSpotifyToken = data.access_token;
          tokenExpiryTime = Date.now() + 50 * 60 * 1000; 
          return data.access_token;
        }
      }
    } catch {
     
    }
  }

  throw new Error("Falha ao obter token do Spotify em todos os endpoints disponíveis.");
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
    } catch (error) {
      console.error(`Erro na tentativa ${i + 1} com ${randomArtist}:`, error);
    }
  }

  console.warn("Utilizando álbuns de reserva (fallback offline).");
  const fallbackMatch = FALLBACK_ALBUMS.filter(
    (a) => a.genre.toLowerCase() === genre.toLowerCase()
  );
  return fallbackMatch.length > 0 ? fallbackMatch : FALLBACK_ALBUMS;
}

const FALLBACK_ALBUMS: Album[] = [
  {
    mbid: "queen-night-at-the-opera",
    artist: "Queen",
    albumTitle: "A Night at the Opera",
    releaseYear: 1975,
    coverArtUrl: "https://upload.wikimedia.org/wikipedia/en/4/4d/Queen_A_Night_At_The_Opera.png",
    genre: "rock",
  },
  {
    mbid: "pink-floyd-dark-side",
    artist: "Pink Floyd",
    albumTitle: "The Dark Side of the Moon",
    releaseYear: 1973,
    coverArtUrl: "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png",
    genre: "rock",
  },
  {
    mbid: "nirvana-nevermind",
    artist: "Nirvana",
    albumTitle: "Nevermind",
    releaseYear: 1991,
    coverArtUrl: "https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg",
    genre: "rock",
  },
  {
    mbid: "metallica-master-of-puppets",
    artist: "Metallica",
    albumTitle: "Master of Puppets",
    releaseYear: 1986,
    coverArtUrl: "https://upload.wikimedia.org/wikipedia/en/b/b2/Metallica_-_Master_of_Puppets_cover.jpg",
    genre: "rock",
  },
  {
    mbid: "led-zeppelin-iv",
    artist: "Led Zeppelin",
    albumTitle: "Led Zeppelin IV",
    releaseYear: 1971,
    coverArtUrl: "https://upload.wikimedia.org/wikipedia/en/2/26/Led_Zeppelin_-_Led_Zeppelin_IV.jpg",
    genre: "rock",
  },
  {
    mbid: "acdc-back-in-black",
    artist: "AC/DC",
    albumTitle: "Back in Black",
    releaseYear: 1980,
    coverArtUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Acdc_backinblack_cover.jpg",
    genre: "rock",
  },
  {
    mbid: "beatles-abbey-road",
    artist: "The Beatles",
    albumTitle: "Abbey Road",
    releaseYear: 1969,
    coverArtUrl: "https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg",
    genre: "rock",
  },
  {
    mbid: "guns-appetite",
    artist: "Guns N' Roses",
    albumTitle: "Appetite for Destruction",
    releaseYear: 1987,
    coverArtUrl: "https://upload.wikimedia.org/wikipedia/en/6/60/GunsnRosesAppetiteforDestructionalbumcover.jpg",
    genre: "rock",
  },
  {
    mbid: "michael-jackson-thriller",
    artist: "Michael Jackson",
    albumTitle: "Thriller",
    releaseYear: 1982,
    coverArtUrl: "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png",
    genre: "pop",
  },
  {
    mbid: "arctic-monkeys-am",
    artist: "Arctic Monkeys",
    albumTitle: "AM",
    releaseYear: 2013,
    coverArtUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e7/%22AM%22_%28Arctic_Monkeys%29.jpg",
    genre: "indie",
  },
];

// Busca álbuns por década (Thematic Mode)
export async function fetchAlbumsByDecade(
  decade: string,
  lastArtist: string | null = null
): Promise<Album[]> {
  try {
    const token = await getSpotifyToken();
    const decadeMap: Record<string, string> = {
      "70s": "1970-1979",
      "80s": "1980-1989",
      "90s": "1990-1999",
      "2000s": "2000-2009",
      "2010s": "2010-2019",
    };
    const yearRange = decadeMap[decade] || "2020-2024";
    const validGenres = ["rock", "pop", "metal", "indie", "alternative"];
    const randomGenre = validGenres[Math.floor(Math.random() * validGenres.length)];

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=year:${yearRange} genre:${randomGenre}&type=album&limit=30`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.ok) {
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
          .filter((album: Album) => !lastArtist || album.artist !== lastArtist) || [];

      if (retornoTratado.length > 0) return retornoTratado;
    }
  } catch (error) {
    console.warn("Erro ao buscar década via API, usando fallback:", error);
  }

  return FALLBACK_ALBUMS;
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
