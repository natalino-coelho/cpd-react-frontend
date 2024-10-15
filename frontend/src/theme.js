import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#10a5d2',
    },
    secondary: {
      main: '#bcbcbc',
    },
    // Definindo uma paleta personalizada para a sidebar
    drawer: {
      background: '#5d6a6e', // Cor de fundo do drawer (sidebar)
      color: '#ffffff',       // Cor do texto e ícones
    },
  },
});

export default theme;
