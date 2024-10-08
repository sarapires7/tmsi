import { createTheme } from '@mui/material/styles';

// Criação do tema
const theme = createTheme({
  palette: {
    primary: {
      main: '#001950',
    },
    secondary: {
      main: '#908271',
    },
  },
  typography: {
    fontFamily: 'Lato, Arial, sans-serif', // Atualize para Lato
    h1: {
      fontFamily: 'Lato, Arial, sans-serif',
    },
    h2: {
      fontFamily: 'Lato, Arial, sans-serif',
    },
    h3: {
      fontFamily: 'Lato, Arial, sans-serif',
    },
    h4: {
      fontFamily: 'Lato, Arial, sans-serif',
    },
    h5: {
      fontFamily: 'Lato, Arial, sans-serif',
    },
    h6: {
      fontFamily: 'Lato, Arial, sans-serif',
    },
    body1: {
      fontFamily: 'Lato, Arial, sans-serif',
    },
    body2: {
      fontFamily: 'Lato, Arial, sans-serif',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#001950',
        },
      },
    },
  },
});

export default theme;
