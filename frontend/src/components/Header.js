import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box
} from "@mui/material";
import { Menu, Logout } from "@mui/icons-material";

const Header = ({ isCollapsed, toggleSidebar }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${isCollapsed ? "60px" : "240px"})`, // Ajusta a largura com base na sidebar
        ml: `${isCollapsed ? "60px" : "240px"}`, // Ajusta a margem esquerda para alinhar ao sidebar
        transition: "width 0.3s ease-in-out, margin-left 0.3s ease-in-out", // Adiciona uma transição suave
      }}
    >
      <Toolbar
        sx={{
          minHeight: "64px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar} // Botão que colapsa/expande a sidebar
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            CPD
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="logout"
            href="/" // Link para o perfil do usuário
            sx={{ mr: 1 }}
          >
            <Logout />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
