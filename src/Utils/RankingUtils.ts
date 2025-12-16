export interface ScoreEntry {
  points: number;
  date: string;
}

export type GameMode = "standard" | "thematic";

const STORAGE_KEY = "GUESSER_BAND_RANKING";

export const getRanking = (mode: GameMode): ScoreEntry[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const parsed = JSON.parse(data);
    return parsed[mode] || [];
  } catch (error) {
    console.error("Erro ao ler ranking:", error);
    return [];
  }
};

export const saveScore = (mode: GameMode, points: number) => {
  try {
    const currentRanking = getRanking(mode);
    const newEntry: ScoreEntry = {
      points,
      date: new Date().toLocaleDateString("pt-BR"),
    };

    const newRanking = [...currentRanking, newEntry]
      .sort((a, b) => b.points - a.points)
      .slice(0, 5); // Mantém apenas top 5

    const allData = localStorage.getItem(STORAGE_KEY);
    const parsedData = allData ? JSON.parse(allData) : {};

    const updatedData = {
      ...parsedData,
      [mode]: newRanking,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    return newRanking;
  } catch (error) {
    console.error("Erro ao salvar ranking:", error);
    return [];
  }
};
