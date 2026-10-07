import type {
  BandData,
  GuessEvaluation,
  MatchStatus,
  Direction,
} from "../types/MusicdleType";

export function evaluateBandGuess(
  guessed: BandData,
  target: BandData
): GuessEvaluation {
  const isWin = guessed.id === target.id;

  // (Banda, Solo, Duo, Trio)
  const formatStatus: MatchStatus =
    guessed.format === target.format ? "correct" : "wrong";

  // Gêneros
  const guessedGenresLower = guessed.genres.map((g) => g.toLowerCase());
  const targetGenresLower = target.genres.map((g) => g.toLowerCase());

  const hasAnyMatch = guessedGenresLower.some((g) =>
    targetGenresLower.some(
      (tg) => tg === g || tg.includes(g) || g.includes(tg)
    )
  );

  const exactGenreMatch =
    guessedGenresLower.length === targetGenresLower.length &&
    guessedGenresLower.every((g) => targetGenresLower.includes(g));

  const genresStatus: MatchStatus = exactGenreMatch
    ? "correct"
    : hasAnyMatch
    ? "partial"
    : "wrong";

  //  País 
  let countryStatus: MatchStatus = "wrong";
  if (guessed.country.toLowerCase() === target.country.toLowerCase()) {
    countryStatus = "correct";
  } else if (guessed.continent === target.continent) {
    countryStatus = "partial"; 
  }

  // Ano de Formação
  let yearDirection: Direction = "equal";
  let yearStatus: MatchStatus = "wrong";

  if (guessed.formedYear === target.formedYear) {
    yearStatus = "correct";
    yearDirection = "equal";
  } else if (guessed.formedYear < target.formedYear) {
    yearStatus = "wrong";
    yearDirection = "higher"; 
  } else {
    yearStatus = "wrong";
    yearDirection = "lower"; 
  }

  // Quantidade de Integrantes
  let membersDirection: Direction = "equal";
  let membersStatus: MatchStatus = "wrong";

  if (guessed.membersCount === target.membersCount) {
    membersStatus = "correct";
    membersDirection = "equal";
  } else if (guessed.membersCount < target.membersCount) {
    membersStatus = "wrong";
    membersDirection = "higher"; 
  } else {
    membersStatus = "wrong";
    membersDirection = "lower"; 
  }

  return {
    id: `${guessed.id}-${Date.now()}`,
    guessedBand: guessed,
    formatMatch: { status: formatStatus },
    genresMatch: { status: genresStatus },
    countryMatch: { status: countryStatus },
    yearMatch: { status: yearStatus, direction: yearDirection },
    membersMatch: { status: membersStatus, direction: membersDirection },
    isWin,
  };
}
