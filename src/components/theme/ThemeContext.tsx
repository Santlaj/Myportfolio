import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const getTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#7fb069' : '#2d5a27',
      light: mode === 'dark' ? '#a8d084' : '#4a6741',
      dark: mode === 'dark' ? '#5a8049' : '#1a3317',
    },
    secondary: {
      main: mode === 'dark' ? '#e07a5f' : '#c44536',
      light: mode === 'dark' ? '#ff9a7f' : '#e76f51',
      dark: mode === 'dark' ? '#b5583f' : '#8b2f1f',
    },
    background: {
      default: mode === 'dark' ? '#0c100d' : '#fdfcf8',
      paper: mode === 'dark' ? '#121714' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#f0f6fc' : '#1a1a1a',
      secondary: mode === 'dark' ? '#8b949e' : '#555555',
    },
    info: {
      main: mode === 'dark' ? '#6cb6ff' : '#0550ae',
      light: mode === 'dark' ? '#94ccff' : '#0969da',
      dark: mode === 'dark' ? '#4493f8' : '#033d8b',
    },
    success: {
      main: mode === 'dark' ? '#3fb950' : '#116329',
      light: mode === 'dark' ? '#7ee787' : '#1a7f37',
      dark: mode === 'dark' ? '#2ea043' : '#0d4818',
    },
    warning: {
      main: mode === 'dark' ? '#d29922' : '#9a6700',
      light: mode === 'dark' ? '#e2cc67' : '#bf8700',
      dark: mode === 'dark' ? '#bb7506' : '#7d4900',
    },
    error: {
      main: mode === 'dark' ? '#f85149' : '#a40e26',
      light: mode === 'dark' ? '#ff7b72' : '#cf222e',
      dark: mode === 'dark' ? '#da3633' : '#7d0a1a',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 28px',
          fontSize: '0.95rem',
          boxShadow: mode === 'dark'
            ? '0 4px 14px rgba(127, 176, 105, 0.25)'
            : '0 4px 14px rgba(74, 103, 65, 0.25)',
          '&:hover': {
            boxShadow: mode === 'dark'
              ? '0 6px 20px rgba(127, 176, 105, 0.35)'
              : '0 6px 20px rgba(74, 103, 65, 0.35)',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: mode === 'dark'
            ? 'linear-gradient(45deg, #7fb069 30%, #ff8a50 90%)'
            : 'linear-gradient(45deg, #2d5a27 30%, #c44536 90%)',
          color: '#ffffff',
          '&:hover': {
            background: mode === 'dark'
              ? 'linear-gradient(45deg, #a8d084 30%, #ffaa7a 90%)'
              : 'linear-gradient(45deg, #1a3317 30%, #8b2f1f 90%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backdropFilter: 'blur(10px)',
          border: mode === 'dark'
            ? '1px solid rgba(127, 176, 105, 0.2)'
            : '1px solid rgba(45, 90, 39, 0.15)',
          boxShadow: mode === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(127, 176, 105, 0.1)'
            : '0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(45, 90, 39, 0.08)',
          background: mode === 'dark'
            ? 'linear-gradient(135deg, rgba(22, 27, 34, 0.8) 0%, rgba(127, 176, 105, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(45, 90, 39, 0.02) 100%)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        filled: {
          background: mode === 'dark'
            ? 'linear-gradient(45deg, rgba(127, 176, 105, 0.2) 0%, rgba(255, 138, 80, 0.2) 100%)'
            : 'linear-gradient(45deg, rgba(45, 90, 39, 0.12) 0%, rgba(196, 69, 54, 0.12) 100%)',
          border: mode === 'dark'
            ? '1px solid rgba(127, 176, 105, 0.3)'
            : '1px solid rgba(45, 90, 39, 0.25)',
          color: mode === 'dark' ? '#f0f6fc' : '#1a1a1a',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'transparent',
          boxShadow: 'none',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? '#f0f6fc' : '#1a1a1a',
        },
        h1: {
          color: mode === 'dark' ? '#f0f6fc' : '#1a1a1a',
        },
        h2: {
          color: mode === 'dark' ? '#f0f6fc' : '#1a1a1a',
        },
        h3: {
          color: mode === 'dark' ? '#f0f6fc' : '#1a1a1a',
        },
        h4: {
          color: mode === 'dark' ? '#f0f6fc' : '#1a1a1a',
        },
        h5: {
          color: mode === 'dark' ? '#f0f6fc' : '#1a1a1a',
        },
        h6: {
          color: mode === 'dark' ? '#f0f6fc' : '#1a1a1a',
        },
        subtitle1: {
          color: mode === 'dark' ? '#8b949e' : '#555555',
        },
        subtitle2: {
          color: mode === 'dark' ? '#8b949e' : '#555555',
        },
        body2: {
          color: mode === 'dark' ? '#8b949e' : '#555555',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: mode === 'dark' ? '#8b949e' : '#555555',
          '&:hover': {
            color: mode === 'dark' ? '#7fb069' : '#2d5a27',
            backgroundColor: mode === 'dark'
              ? 'rgba(127, 176, 105, 0.1)'
              : 'rgba(45, 90, 39, 0.08)',
          },
        },
      },
    },
  },
});

interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeContextProvider');
  }
  return context;
};

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('themeMode');
      if (savedTheme) {
        setDarkMode(savedTheme === 'dark');
      } else {
        setDarkMode(true);
      }
    }
  }, []);

  // Save theme preference to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeMode', darkMode ? 'dark' : 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const theme = getTheme(darkMode ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
