import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Header from './Header';  // Importa o Header
import Sidebar from './Sidebar';  // Importa a Sidebar

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />  {/* Adiciona o Header */}
      <Sidebar />  {/* Adiciona a Sidebar */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
