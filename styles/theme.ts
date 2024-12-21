import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFD700' // Gold color for primary,
    },
    secondary: {
      main: '#f48fb1' // Secondary color
    },
    background: {
      default: '#121212', // Background color for the app
      paper: '#1d1d1d' // Surface (card) color
    },
    text: {
      primary: '#ffffff', // Main text color
      secondary: '#b0bec5' // Secondary text color
    }
  },
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif' // Montserrat as the main font family
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Prevent uppercase transformation on buttons
          color: '#000'
        }
      }
    }
  }
});

export default darkTheme;
