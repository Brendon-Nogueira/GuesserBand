/**
 * Define a estrutura de dados de um álbum/música que o jogo usará.
 */
export interface Album {
  mbid: string; // MusicBrainz ID (chave para buscar no Cover Art Archive)
  artist: string; // Nome da Banda (a resposta correta)
  albumTitle: string;
  releaseYear: number;
  coverArtUrl: string; // O link direto para a imagem
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
