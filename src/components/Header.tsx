import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar>
        <Button onClick={() => navigate('/projects')} color={'inherit'}>
          <Typography variant="h6" color="inherit">
            TMSI - Phrase
          </Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
