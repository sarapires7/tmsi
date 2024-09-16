import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import ProjectsList from './components/ProjectsList';
import ProjectDetail from './components/ProjectDetail'; 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/projects/:id" element={<ProjectDetail />} /> 
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
