// theme.js
import { createTheme } from '@mui/material/styles';

// Light theme
const lightTheme = createTheme({
  palette: {
    mode: 'light', // Light theme
    primary: {
      main: '#1976d2', // Custom primary color
    },
    secondary: {
      main: '#dc004e', // Custom secondary color
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h1: {
      fontSize: '2.5rem',
    },
  },
});

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Dark theme
    primary: {
      main: '#90caf9', // Custom primary color for dark mode
    },
    secondary: {
      main: '#f48fb1', // Custom secondary color for dark mode
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h1: {
      fontSize: '2.5rem',
    },
  },
});

export { lightTheme, darkTheme };
