import React, { useEffect, useState } from 'react';
import { getProjectsList } from '../services/apiService';
import AppLayout from '../components/AppLayout';
import { Projects } from '../types/types';
import { 
  Grid2,
  Alert, 
  Container,
  Typography,
  Box
} from '@mui/material';
import Loading from '../components/Loading'
import Pagination from '../components/Pagination';
import HeaderTitle from '../components/HeaderTitle';
import ProjectItem from '../components/ProjectItem';

const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState<Projects[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const [currentItems, setCurrentItems] = useState<any[]>([]); 
  const itemsPerPage = 6;
  const totalPerPage = Math.ceil(projects.length / itemsPerPage)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProjectsList();
        setProjects(response);
      } catch (err) {
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = projects.slice(startIndex, endIndex);
    setCurrentItems(itemsToShow);
  }, [currentPage, itemsPerPage, projects]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <AppLayout>
      <Container>
        <HeaderTitle page="Phrase Projects" />
        {projects.length === 0 ? (
          <Box textAlign="center" mt={4}>
            <Typography variant="h6" color="textSecondary">
              No projects available.
            </Typography>
          </Box>
        ) : (
        <Grid2 container spacing={3}>
          {currentItems.map((item) => (
            item && <ProjectItem key={item.id} item={item} />
          ))}
        </Grid2>
        )}
        {/* Pagination */}
        <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          {/* <Pagination 
            totalPages={totalPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          /> */}
        </Container>
      </Container>
    </AppLayout>
  );
};

export default ProjectsList;
