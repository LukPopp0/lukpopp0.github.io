import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { cssVariables } from '../cssVariables';

export type Theme = {
  mainColor: string;
  mainColorAlt: string;
  mainColorInverse: string;
  mainColorInverseAlt: string;
  accent1: string;
  accent2: string;
  accent3: string;
  accent1Light: string;
  accent2Light: string;
  accent3Light: string;
};

const getTheme = (prefersDark: boolean): Theme => {
  if (prefersDark) {
    return {
      mainColor: cssVariables.mainColor,
      mainColorAlt: cssVariables.mainColorAlt,
      mainColorInverse: cssVariables.mainColorInverse,
      mainColorInverseAlt: cssVariables.mainColorInverseAlt,
      accent1: cssVariables.accent1,
      accent2: cssVariables.accent2,
      accent3: cssVariables.accent3,
      accent1Light: cssVariables.accent1Light,
      accent2Light: cssVariables.accent2Light,
      accent3Light: cssVariables.accent3Light,
    };
  }
  return {
    mainColor: cssVariables.mainColorInverse,
    mainColorAlt: cssVariables.mainColorInverseAlt,
    mainColorInverse: cssVariables.mainColor,
    mainColorInverseAlt: cssVariables.mainColorAlt,
    accent1: cssVariables.accent1Light,
    accent2: cssVariables.accent2Light,
    accent3: cssVariables.accent3Light,
    accent1Light: cssVariables.accent1,
    accent2Light: cssVariables.accent2,
    accent3Light: cssVariables.accent3,
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
