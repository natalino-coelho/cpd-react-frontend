import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#16537e',
    },
    secondary: {
      main: '#bcbcbc',
    },
    // Definindo uma paleta personalizada para a sidebar
    drawer: {
      background: '#5b5b5b', // Cor de fundo do drawer (sidebar)
      color: '#ffffff',       // Cor do texto e ícones
    },
  },
});

export default theme;
