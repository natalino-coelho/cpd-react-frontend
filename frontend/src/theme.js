import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#032996",
    },
    secondary: {
      main: "#123456",
    },
    // Definindo uma paleta personalizada para a sidebar
    drawer: {
      background: "#031a4a", // Cor de fundo do drawer (sidebar)
      color: "#ffffff", // Cor do texto e ícones
    },
    button: {
      primary: "#32cd32", // Cor customizada para botões primários (verde)
      secondary: "#ff4500", // Cor customizada para botões secundários (laranja)
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Usando as cores personalizadas da paleta
          "&.MuiButton-containedPrimary": {
            backgroundColor: "#32cd32", // Cor do botão primário (verde)
            color: "#fff",
            "&:hover": {
              backgroundColor: "#388e3c", // Cor ao passar o mouse
            },
          },
          "&.MuiButton-containedSecondary": {
            backgroundColor: "#ff4500", // Cor do botão secundário (laranja)
            color: "#fff",
            "&:hover": {
              backgroundColor: "#f57c00", // Cor ao passar o mouse
            },
          },
        },
      },
    },
  },
});

export default theme;
