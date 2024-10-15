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
        flexGrow: 1, 
        bgcolor: 'background.default', 
        p: 1, 
        marginTop: '64px',
        transition: 'margin-left 0.3s ease-in-out',
        marginLeft: isCollapsed ? '0' : '60px' }}>
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
