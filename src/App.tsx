import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import ProjectsList from './pages/ProjectsList';
import ProjectDetail from './pages/ProjectDetail'; 
import ProjectChanges from './pages/ProjectChanges';
import Error404 from './pages/Error404';  // Importar página de erro 404
import Error500 from './pages/Error500';  // Importar página de erro 500

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
    {
      path: "*",
      element: <Error404 />
    },
    {
      path: "/500",
      element: <Error500 />
    }
  ]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
