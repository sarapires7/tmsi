import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        p: 3,
        mt: 'auto',
        textAlign: 'center',
      }}
    >
      <Container>
        <Typography variant="body1">© 2024 TMSI</Typography>
      </Container>
    </Box>
  );
};

export default Footer;
