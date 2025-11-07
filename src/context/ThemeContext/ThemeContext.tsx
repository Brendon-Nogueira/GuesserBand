import React, { useCallback, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeState | undefined>(undefined);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storageKey = "vite-ui-theme";
  const defaultTheme: Theme = "dark";

  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme;
    return savedTheme || defaultTheme;
  });

  const setTheme = useCallback((newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system" || (theme === defaultTheme && !localStorage.getItem(storageKey))) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = { theme, setTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };