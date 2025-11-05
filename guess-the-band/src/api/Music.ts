import type { Album, GameState } from '../types/Album'; 

// DADOS MOCK (Substitua por uma lista mais completa de Rock)
const MOCK_ALBUMS: Album[] = [
  {
    mbid: 'a74799b3-4676-48a5-9276-6966601f016d', 
    artist: 'Pink Floyd',
    albumTitle: 'The Dark Side of the Moon',
    releaseYear: 1973,
    coverArtUrl: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png', 
    genre: 'Progressive Rock',
  },
  {
    mbid: 'c1b4b9b9-1d4a-4c9f-8a03-9d0d9e7d3e6c', 
    artist: 'Led Zeppelin',
    albumTitle: 'Led Zeppelin IV',
    releaseYear: 1971,
    coverArtUrl: 'https://upload.wikimedia.org/wikipedia/en/2/23/Led_Zeppelin_-_Led_Zeppelin_IV.jpg', 
    genre: 'Hard Rock',
  },
  {
    mbid: '900b7049-9f79-3715-9961-752174d1a512',
    artist: 'Nirvana',
    albumTitle: 'Nevermind',
    releaseYear: 1991,
    coverArtUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg',
    genre: 'Grunge',
  },
];

/**
 * Função para buscar dados de álbuns. 
 * Na versão final, esta função chamaria as APIs MusicBrainz e Cover Art Archive.
 */
export async function fetchAlbums(): Promise<Album[]> {
  // Por enquanto, retorna o mock após um pequeno delay:
  return new Promise((resolve) => {
    setTimeout(() => {
      // Retorna uma cópia para não modificar o array original
      resolve([...MOCK_ALBUMS]); 
    }, 500); 
  });
}
