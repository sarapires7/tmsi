// src/pages/Error500.tsx
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ErrorOutline } from '@mui/icons-material';

const Error500: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <ErrorOutline sx={{ fontSize: 100, color: 'error.main', mb: 3 }} />
      <Typography variant="h2" color="textPrimary" gutterBottom>
        500
      </Typography>
      <Typography variant="h5" color="textSecondary" sx={{ mb: 3 }}>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        An unexpected error occurred on the server.
        <br />
        Please try again later or contact support.
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mx: 1 }}
          onClick={() => navigate('/projects')}
        >
          Back to Projects
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mx: 1 }}
          onClick={() => navigate('/')}
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default Error500;
