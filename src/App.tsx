import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import ProjectsList from './pages/ProjectsList';
import ProjectDetail from './pages/ProjectDetail'; 
import ProjectChanges from './pages/ProjectChanges'; 


function App() {
  const router = createBrowserRouter([
    {
      path: "/projects",
      element: <ProjectsList />
    },
    {
      path: "/projects/:id/changes",
      element: <ProjectChanges />
    },
    {
      path: "/projects/:id/changes/:id/keys",
      element: <ProjectDetail />
    },
  ])
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
