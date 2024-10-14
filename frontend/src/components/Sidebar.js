import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box } from '@mui/material';
import { Home, ContactMail } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Sidebar = () => {
  const theme = useTheme();  // Acessa o tema
  
  // Verifica se o tema e a paleta drawer foram definidos
  if (!theme.palette.drawer) {
    console.error('Paleta drawer não definida no tema');
    return null; // Impede que o componente quebre enquanto você resolve o problema
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.drawer.background,  // Acessa a cor de fundo do drawer
          color: theme.palette.drawer.color,  // Acessa a cor do texto/ícones do drawer
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button>
            <ListItemIcon sx={{ color: theme.palette.drawer.color }}>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button>
            <ListItemIcon sx={{ color: theme.palette.drawer.color }}>
              <ContactMail />
            </ListItemIcon>
            <ListItemText primary="Contato" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;