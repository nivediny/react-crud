import React, { useState } from 'react';
import { Button, Box, Typography, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeToggleComponent = () => {
  // State to manage the current theme mode (light or dark)
  const [darkMode, setDarkMode] = useState(false);

  // Define the light theme
  const lightTheme = createTheme({
    palette: {
      mode: 'light', // Set to 'light' for light theme
      primary: {
        main: '#1976d2', // Blue color
      },
      background: {
        default: '#ffffff', // White background for light mode
      },
    },
  });

  // Define the dark theme
  const darkTheme = createTheme({
    palette: {
      mode: 'dark', // Set to 'dark' for dark theme
      primary: {
        main: '#90caf9', // Light blue color for dark mode
      },
      background: {
        default: '#121212', // Dark background for dark mode
      },
    },
  });

  // Toggle the dark mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline /> {/* This helps with the default background and font colors */}
      
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          {darkMode ? 'Dark Mode' : 'Light Mode'}
        </Typography>

        <Button variant="contained" onClick={toggleTheme}>
          Toggle Theme
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default ThemeToggleComponent;
