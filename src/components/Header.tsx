import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const Header: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <AppBar 
      position="sticky" 
      sx={{
        backgroundColor: 'rgba(0, 25, 80, 0.9)', // Cor sólida com opacidade
        boxShadow: 'none', // Remover sombra para um visual flat
        padding: '0 24px',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Seção à esquerda: Título e Submenus */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button 
            onClick={() => navigate('/projects')} 
            color="inherit" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              textTransform: 'none', 
            }}
          >
            <HomeIcon sx={{ marginRight: '8px', fontSize: '1.8rem' }} />
            <Typography variant="h6" fontWeight="500" letterSpacing={1}>
              TMSI - Phrase
            </Typography>
          </Button>
          
          {/* Menu de Navegação à esquerda */}
          <Button
            color="inherit"
            onClick={() => navigate('/projects')}
            sx={{
              fontWeight: '500',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Efeito de hover
                borderRadius: '4px',
              }
            }}
          >
            Projects
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate('/about')}
            sx={{
              fontWeight: '500',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Efeito de hover
                borderRadius: '4px',
              }
            }}
          >
            About
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate('/contact')}
            sx={{
              fontWeight: '500',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Efeito de hover
                borderRadius: '4px',
              }
            }}
          >
            Contact
          </Button>
        </Box>
        
        {/* Seção à direita: Login/Logout */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="inherit" onClick={() => console.log('Login')}>
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
