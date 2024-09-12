import React from 'react';
import { Container, Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container component="main" sx={{ flex: 1, p: 2 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default AppLayout;
