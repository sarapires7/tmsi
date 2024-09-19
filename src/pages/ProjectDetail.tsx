import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import FilterKeys from '../components/FilterKeys';
import KeyList from '../components/KeyList';
import DetailData from '../services/detailData.json';
import GenericDialog from '../components/GenericDialog';
import AddKeyForm from '../components/AddKeyForm'; 
import AppLayout from '../components/AppLayout';
import KeyItem from '../components/KeyItem';

interface Key {
  id: string;
  translation: string;
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any | null>(null);
  const [keys, setKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [editKey, setEditKey] = useState<Key | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const initialFormValues = {
    id: '',
    module: '',
    bu: '',
    breakpoint: '',
    repository: '',
    additionalInfo: '',
    legalImplications: false,
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleDialogOpen = (key: Key | null = null) => {
    console.log("oalaa,", key)

    if (key) {
      console.log("entrei,", key)
      setFormValues({
        id: '121334',
        module: 'settings',
        bu: 'axa',
        breakpoint: 'sm',
        repository: 'wealth',
        additionalInfo: 'dcsfds',
        legalImplications: false,
      });
    } else {
      setFormValues(initialFormValues);
    }
    setDialogOpen(true);
  };

  const handleDialogClose = () => setDialogOpen(false);

  const handleSubmit = () => {
    if (formValues.id) {
      // Editar key existente
      setKeys(keys.map((k) => (k.id === formValues.id ? formValues : k)));
    } else {
      // Adicionar nova key
      setKeys([...keys, { ...formValues, id: Date.now().toString() }]);
    }
    handleDialogClose();
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const project = DetailData;
        if (project) {
          setProject(project);
          setKeys(project.keys);
        }
      } catch (err) {
        setError('Failed to load project details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleDeleteKey = (id: string) => {
    setKeys(keys.filter((k) => k.id !== id));
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  console.log(formValues)

  return (
    <AppLayout>
      <Container>
        <Typography variant="h4" gutterBottom>
          Project: {project?.key}
        </Typography>

        <Box>
          <FilterKeys filter={filter} onFilterChange={(e) => setFilter(e.target.value)} label="Search" />
          <Button variant="contained" color="primary" onClick={() => handleDialogOpen()} sx={{ marginTop: 2 }}>
            Add Key
          </Button>
        </Box>

        <KeyList
          items={keys}
          filter={filter}
          onEdit={(item) => handleDialogOpen(item)}
          onDelete={(item) => handleDeleteKey(item.id)}
          renderItem={(item) => (
            <KeyItem id={item.id} translation={item.translation} />
          )}
          getItemKey={(item) => item.id}
        />

        <GenericDialog
          open={dialogOpen}
          title={formValues.id ? 'Edit Key' : 'Add New Key'}
          onClose={handleDialogClose}
          onSubmit={handleSubmit}
        >
          <AddKeyForm formValues={formValues} setFormValues={setFormValues} handleSubmit={handleSubmit} />
        </GenericDialog>
      </Container>
    </AppLayout>
  );
};

export default ProjectDetail;
