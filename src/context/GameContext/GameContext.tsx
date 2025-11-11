import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

type GameContextType = {
  genre: string;
  setGenre: (genre: string) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [genre, setGenre] = useState("rock");
  return (
    <GameContext.Provider value={{ genre, setGenre }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame deve ser usado dentro de um GameProvider");
  }
  return context;
}
