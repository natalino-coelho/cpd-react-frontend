import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ width: `calc(100% - 240px)`, ml: `240px` }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
