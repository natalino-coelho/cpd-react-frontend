import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Header from './Header';  // Importa o Header
import Sidebar from './Sidebar';  // Importa a Sidebar

const DashboardLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Estado para controlar a sidebar colapsada

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed); // Alterna entre expandido e colapsado
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />  {/* Adiciona o Header */}
      <Sidebar isCollapsed={isCollapsed} />  {/* Adiciona a Sidebar */}
      <Box component="main" sx={{
        position: "relative",
        flexGrow: 1,
        //bgcolor: "background.default",
        p: 1,
        marginTop: '64px',
        transition: 'margin-left 0.3s ease-in-out',
        marginLeft: isCollapsed ? '0' : '60px',
        overflow: 'hidden',
        overflowY: "auto",
        "::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("/logo.png")', // URL da sua imagem
            backgroundSize: "40vw", // Ajusta a imagem para cobrir toda a área disponível
            backgroundRepeat: "no-repeat", // Não repete a imagem
            backgroundPosition: "center", // Centraliza a imagem
            opacity: 0.1, // Ajusta a transparência da imagem (ajuste conforme necessário)
            zIndex: -1, // Garante que a imagem fique atrás de tudo
        }
      }}>
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
