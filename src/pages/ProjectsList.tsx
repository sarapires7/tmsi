import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjectsList } from '../services/apiService';
import AppLayout from '../components/AppLayout';
import { Projects } from '../types/types';
import { 
  Grid2, 
  Card, 
  CardContent, 
  Typography, 
  Alert, 
  Container,
  Avatar,
  CardHeader,
  Divider,
} from '@mui/material';
import { dateFormatToDDMMYYYY } from '../utils/dateUtils';
import { AccountCircle } from '@mui/icons-material';
import Loading from '../components/Loading'
import Pagination from '../components/Pagination';

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
        <Typography variant="h4" gutterBottom align="center" mt={6} mb={4}>
          Projects Phrase
        </Typography>

        <Grid2 container spacing={3}>
          {currentItems.map((item) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={item.id} sx={{ p: 1 }}>
              <Link 
                to={`/projects/${item.id}/changes`}
                style={{
                  textDecoration: 'none',
                  cursor:'pointer'
                }}
              >
                <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3 }}>
                  <CardHeader
                    avatar={<Avatar><AccountCircle /></Avatar>}
                    title={
                      <Typography variant="h6" color='#001950'>
                        {item.name}
                      </Typography>
                    }
                    subheader={`Updated at: ${dateFormatToDDMMYYYY(item.account.updatedAt)}`}
                  />
                  <Divider />
                  <CardContent>
                    <Typography variant="body1" color="textSecondary">
                      Account: {item.account.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Created at: {dateFormatToDDMMYYYY(item.account.createdAt)}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid2>
          ))}
        </Grid2>
        {/* Pagination */}
        <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Pagination 
            totalPages={totalPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Container>
      </Container>
    </AppLayout>
  );
};

export default ProjectsList;
