import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation  } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import appRoutes from "./appRoutes";

// Componente que atualiza o título da página
function usePageTitle() {
  const location = useLocation();

  useEffect(() => {
    // Encontra a rota correspondente à URL atual
    const currentRoute = appRoutes.find(route => route.path === location.pathname);
    
    // Se houver uma rota correspondente e um título, atualize o document.title
    if (currentRoute && currentRoute.title) {
      document.title = currentRoute.title;
    } else {
      document.title = 'CPD';  // Título padrão se a rota não tiver um título
    }
  }, [location]);  // Atualiza o título sempre que a rota mudar
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <PageTitleHandler />  {/* Este componente agora está dentro do Router */}
        <Routes>
          {/* Mapeia dinamicamente as rotas importadas de appRoutes */}
          {appRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

// Componente separado para gerenciar o título da página
function PageTitleHandler() {
  usePageTitle();  // Chamamos o hook aqui, pois ele agora está dentro do contexto do Router
  return null;  // Esse componente não precisa renderizar nada
}

export default App;
