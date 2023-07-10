import { createContext, useState, useEffect, useContext } from 'react';
import changeThemeAsyncStorage from './changeThemeAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../AppContext';

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
  const { setIsLoadingTheme } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem('fitupData');
        if (data !== null) {
          const { isDarkMode: darkMode } = JSON.parse(data);
          setIsDarkMode(darkMode);
        }
        setIsLoadingTheme(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    changeThemeAsyncStorage(isDarkMode);
  }, [isDarkMode]);

  const theme = {
    font: {
      bold: 'PoppinsBold',
      semiBold: 'PoppinsSemiBold',
      regular: 'PoppinsRegular',
    },
    backgroundColor: isDarkMode ? '#2C3539' : 'white',
    backgroundTest: isDarkMode ? '#808080' : 'white',
    backgroundLine: isDarkMode ? 'white' : '#303030',
    fontColor: {
      title: isDarkMode ? 'white' : '#0B5563',
      text: isDarkMode ? 'white' : 'black',
      textBlack: isDarkMode ? 'black' : 'white',
    },
    iconColor: isDarkMode ? 'white' : 'black',
    drawer: {
      fontColor: isDarkMode ? 'white' : 'black',
      backgroundColor: isDarkMode ? '#303030' : 'white',
      itemActive: {
        backgroundColor: isDarkMode ? 'orange' : '#ccc',
        fontColor: isDarkMode ? 'white' : 'black',
      },
      itemInactive: {
        backgroundColor: isDarkMode ? 'orange' : '#ccc',
        fontColor: isDarkMode ? 'white' : 'black',
      },
      iconColor: isDarkMode ? 'white' : 'black',
    },
    profile: {
      backgroundColor: isDarkMode ? '#303030' : 'white',
      card: {
        backgroundColor: isDarkMode ? 'white' : '#303030',
        fontColor: isDarkMode ? '#303030' : 'white',
      },
    },
    createDish: {
      foodCard: {
        backgroundColor: isDarkMode ? 'white' : '#b2b2b2',
        fontColor: isDarkMode ? '#303030' : 'white',
      },
    },
  };

  return <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, theme }}>{children}</ThemeContext.Provider>;
};
