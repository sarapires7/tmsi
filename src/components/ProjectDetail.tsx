import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import FilterKeys from './FilterKeys';
import KeyList from './KeyList';
import AddEditKeyDialog from './AddEditKeyDialog';
import { Projects } from '../types/Projects';
import { getProjectsList } from '../services/apiService';

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
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [editKey, setEditKey] = useState<Key | null>(null);

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
            setOpenDialog(true);
          }
        }}
        onDelete={handleDeleteKey}
      />

      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)} sx={{ marginTop: 2 }}>
        Add Key
      </Button>

      <AddEditKeyDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={(key, translation) => {
          if (editKey) {
            handleEditKey(key, translation);
          } else {
            handleAddKey(key, translation);
          }
          setEditKey(null);
        }}
        initialKey={editKey?.key}
        initialTranslation={editKey?.translation}
      />
    </Container>
  );
};

export default ProjectDetail;
