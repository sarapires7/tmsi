import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#cccccc' }}>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          TMSI - Phrase
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
