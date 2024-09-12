import React, { useEffect, useState } from 'react';
import { getProjectsList } from '../services/apiService';
import AppLayout from './AppLayout';
import { Projects } from '../types/Projects';
import { 
  Grid2, 
  Card, 
  CardContent, 
  Typography, 
  CircularProgress, 
  Alert, 
  Container,
  Avatar,
  CardHeader,
  Divider,
  Pagination
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState<Projects[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const itemsPerPage = 6;

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

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  // Calculate items in current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
        <Typography>Loading projects...</Typography>
      </Container>
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
        <Typography variant="h4" gutterBottom align="center">Projects Phrase</Typography>
      
      
      <Grid2 container spacing={3}>
        {projects.map((item) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={item.id} sx={{ p: 1 }}>
            <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
              
              <CardHeader
                avatar={<Avatar><AccountCircle /></Avatar>}
                title={<Typography variant="h6">{item.name}</Typography>}
                subheader={`Slug: ${item.slug}`}
              />
              
              <Divider />

              <CardContent>
                <Typography variant="body1" color="textSecondary">
                  Account: {item.account.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Account Slug: {item.account.slug}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      {/* Pagination */}
      <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Pagination 
          count={Math.ceil(projects.length / itemsPerPage)}  // Calculate total number per page
          page={currentPage}  // Current page
          onChange={handlePageChange}  // Page change function
          color="primary" 
          showFirstButton  
          showLastButton 
        />
      </Container>
    </Container>
    </AppLayout>
  );
};

export default ProjectsList;
