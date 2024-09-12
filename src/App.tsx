import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import ProjectsList from './components/ProjectsList';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ProjectsList />
    </ThemeProvider>
  );
}

export default App;
