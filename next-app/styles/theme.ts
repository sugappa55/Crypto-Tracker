import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9' // Custom primary color
    },
    secondary: {
      main: '#f48fb1' // Custom secondary color
    },
    background: {
      default: '#121212', // Background color
      paper: '#1d1d1d' // Surface color
    },
    text: {
      primary: '#ffffff', // Text color
      secondary: '#b0bec5'
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif'
  }
});

export default darkTheme;
