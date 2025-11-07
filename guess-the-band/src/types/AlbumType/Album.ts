/**
 * Define a estrutura de dados de um álbum/música que o jogo usará.
 */
export interface Album {
  mbid: string; 
  artist: string; 
  albumTitle: string;
  releaseYear: number;
  coverArtUrl: string; 
  genre: string;
}

/**
 * Define o estado geral do jogo.
 */
export interface GameState {
  currentAlbum: Album | null;
  score: number;
  attempts: number;
  message: string;
  isRevealed: boolean; // Se a capa e a resposta estão visíveis
  isLoading: boolean;
}
