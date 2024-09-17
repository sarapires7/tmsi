import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import FilterKeys from './FilterKeys';
import KeyList from './KeyList';
import AddEditKeyDialog from './AddEditKeyDialog';
import { Projects } from '../types/Projects';
import { getProjectsList } from '../services/apiService';
import GenericDialog from './GenericDialog';
import AddKeyForm from './AddKeyForm'; 


interface Key {
  key: string;
  translation: string;
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Projects | null>(null);
  const [keys, setKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [editKey, setEditKey] = useState<Key | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    module: '',
    bu: '',
    breakpoint: '',
    repository: '',
    additionalInfo: '',
    legalImplications: false,
  });

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const handleSubmit = () => {
    console.log('Form Submitted:', formValues);
    handleDialogClose(); 
  };
  

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProjectsList();
        const project = response.find((p) => p.id === Number(id));
        if (project) {
          setProject(project);
          setKeys([
            { key: 'greeting', translation: 'Hello' },
            { key: 'farewell', translation: 'Goodbye' },
          ]);
        }
      } catch (err) {
        setError('Failed to load project details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleAddKey = (key: string, translation: string) => {
    setKeys([...keys, { key, translation }]);
  };

  const handleEditKey = (key: string, translation: string) => {
    setKeys(keys.map((k) => (k.key === key ? { key, translation } : k)));
  };

  const handleDeleteKey = (key: string) => {
    setKeys(keys.filter((k) => k.key !== key));
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Project: {project?.name}
      </Typography>

      <FilterKeys filter={filter} onFilterChange={(e) => setFilter(e.target.value)} />

      <KeyList
        keys={keys}
        filter={filter}
        onEdit={(key) => {
          const keyItem = keys.find((k) => k.key === key);
          if (keyItem) {
            setEditKey(keyItem);
          }
        }}
        onDelete={handleDeleteKey}
      />

      <Button variant="contained" color="primary" onClick={handleDialogOpen} sx={{ marginTop: 2 }}>
        Add Key
      </Button>

      <GenericDialog
        open={dialogOpen}
        title="Add New Key"
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
      >
        <AddKeyForm formValues={formValues} setFormValues={setFormValues} />
      </GenericDialog>
    </Container>
  );
};

export default ProjectDetail;
