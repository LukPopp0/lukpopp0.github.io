import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { cssVariables } from '../cssVariables';

export type Theme = {
  mainColor: string;
  mainColorInverse: string;
  accent1: string;
  accent2: string;
  accent3: string;
  accentInverse1: string;
  accentInverse2: string;
  accentInverse3: string;
};

const getTheme = (prefersDark: boolean): Theme => {
  if (prefersDark) {
    return {
      mainColor: cssVariables.mainColor,
      mainColorInverse: cssVariables.mainColorInverse,
      accent1: cssVariables.accent1,
      accent2: cssVariables.accent2,
      accent3: cssVariables.accent3,
      accentInverse1: cssVariables.accentInverse1,
      accentInverse2: cssVariables.accentInverse2,
      accentInverse3: cssVariables.accentInverse3,
    };
  }
  return {
    mainColor: cssVariables.mainColorInverse,
    mainColorInverse: cssVariables.mainColor,
    accent1: cssVariables.accentInverse1,
    accent2: cssVariables.accentInverse2,
    accent3: cssVariables.accentInverse3,
    accentInverse1: cssVariables.accent1,
    accentInverse2: cssVariables.accent2,
    accentInverse3: cssVariables.accent3,
  };
};

export const ThemeContext = createContext<Theme>(
  getTheme(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(
    getTheme(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
  );

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      console.log('updating the theme');
      setTheme(getTheme(event.matches));
    });
  }, []);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
