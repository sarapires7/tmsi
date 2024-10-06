// src/pages/Error404.tsx
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SentimentDissatisfied } from '@mui/icons-material';

const Error404: React.FC = () => {
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
      <SentimentDissatisfied
        sx={{ fontSize: 100, color: 'primary.main', mb: 3 }}
      />
      <Typography variant="h2" color="textPrimary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" sx={{ mb: 3 }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        It seems that the page you're trying to reach is not available.
        <br />
        Please check the URL or head back to the homepage.
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

export default Error404;
