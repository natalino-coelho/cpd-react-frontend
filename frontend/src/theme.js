import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#032996',
    },
    secondary: {
      main: '#123456',
    },
    // Definindo uma paleta personalizada para a sidebar
    drawer: {
      background: '#031a4a', // Cor de fundo do drawer (sidebar)
      color: '#ffffff',       // Cor do texto e ícones
    },
  },
});

export default theme;
