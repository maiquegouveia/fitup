import { createContext, useState } from 'react';

export const ThemeContext = createContext();

// DARK MODE COLORS
// // Dark gray: #303030
// // Deep blue: #0D253F
// // Midnight blue: #191970
// // Charcoal: #36454F
// // Slate gray: #708090
// // Gunmetal: #2C3539
// // Dark slate gray: #2F4F4F
// // Ebony: #555D50
// // Dark olive green: #556B2F
// // Dark indigo: #4B0082

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = {
    backgroundColor: isDarkMode ? '#303030' : 'white',
    backgroundLine: isDarkMode ? 'white' : '#303030',
    fontColor: {
      title: isDarkMode ? 'white' : '#0B5563',
      text: isDarkMode ? 'white' : 'black',
    },
    iconColor: isDarkMode ? 'white' : 'black',
  };

  return <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, theme }}>{children}</ThemeContext.Provider>;
};
