import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { sidebarLinks, profileLink } from "./sidebarLinks"; // Importa os links da sidebar

const Sidebar = ({ isCollapsed }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? "60px" : "240px", // Ajusta a largura conforme o estado
        flexShrink: 0,
        transition: "width 0.3s ease-in-out", // Transição suave ao colapsar/expandir
        [`& .MuiDrawer-paper`]: {
          width: isCollapsed ? "60px" : "240px",
          transition: "width 0.3s ease-in-out",
          boxSizing: "border-box",
          backgroundColor: "#002855",
          color: "#fff",
          overflowX: "hidden",
          overflowY: isCollapsed ? "hidden" : "auto",
        },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          overflowX: "hidden",
          overflowY: isCollapsed ? "hidden" : "auto",
        }}
      >
        <Box>
          <List sx={{ padding: 0 }}>
            {sidebarLinks.map((link, index) => (
              <ListItem
                button
                component={NavLink}
                to={link.path}
                key={index}
                sx={{
                  color: "#fff",
                  "&.active": { backgroundColor: "#1e88e5", color: "#fff" }, // Destaca o link ativo
                  "&:hover": { backgroundColor: "#1e88e5" }, // Efeito de hover
                }}
              >
                <ListItemIcon sx={{ minWidth: "40px", color: "#fff" }}>
                  {link.icon}
                </ListItemIcon>
                {!isCollapsed && <ListItemText primary={link.text} />}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ paddingBottom: 2 }}>
          <List>
            <ListItem
              button
              component={NavLink}
              to={profileLink.path}
              sx={{
                color: "#fff",
                "&.active": { backgroundColor: "#1e88e5", color: "#fff" }, // Destaca o link ativo
                "&:hover": { backgroundColor: "#1e88e5" }, // Efeito de hover
              }}
            >
              <ListItemIcon sx={{ minWidth: "40px", color: "#fff" }}>
                {profileLink.icon}
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary={profileLink.text} />}
            </ListItem>
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
