export type BandFormat = "Banda" | "Solo" | "Duo" | "Trio";

export type Continent = "Europa" | "América do Norte" | "América do Sul" | "Ásia" | "Oceania" | "África";

export interface BandData {
  id: string;
  name: string;
  image: string; 
  format: BandFormat;
  genres: string[]; 
  country: string; 
  flag: string; 
  continent: Continent;
  formedYear: number;
  membersCount: number; 
  topTrack: string; 
}

export type MatchStatus = "correct" | "partial" | "wrong";
export type Direction = "higher" | "lower" | "equal";

export interface AttributeEvaluation {
  status: MatchStatus;
  direction?: Direction;
}

export interface GuessEvaluation {
  id: string;
  guessedBand: BandData;
  formatMatch: AttributeEvaluation;
  genresMatch: AttributeEvaluation;
  countryMatch: AttributeEvaluation;
  yearMatch: AttributeEvaluation;
  membersMatch: AttributeEvaluation;
  isWin: boolean;
}
