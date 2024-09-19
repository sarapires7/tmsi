import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Button, Box, TextField } from '@mui/material';
import FilterKeys from '../components/FilterKeys';
import KeyList from '../components/KeyList';
import DetailData from '../services/dataKeyForm.json';
import { Projects, Changes } from '../types/types';
import ChangeData from '../services/dataChanges.json';
import GenericDialog from '../components/GenericDialog';
import AddKeyForm from '../components/AddKeyForm'; 
import AppLayout from '../components/AppLayout';
import KeyItem from '../components/KeyItem';

interface Key {
  id: string;
  issue: string;
  keys_modified: any[]
}

const ProjectChanges: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [change, setChange] = useState<Key[]>([]);
  const [keys, setKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [editKey, setEditKey] = useState<Key | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    issue: '',
  });

  const navigate = useNavigate();

  console.log(change)

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const handleSubmit = () => {
    setChange([...change, { id: Date.now().toString(), issue: formValues.issue, keys_modified: [
      {
          type: "add",
          before: null,
          after: {
              key: "settings_close",
              value: "Close"
          }

      }
  ], }]);
    console.log('Form Submitted:', formValues);
    handleDialogClose(); 
  };
  

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const project = ChangeData;
        if (project) {
            setChange(project);
        }
      } catch (err) {
        setError('Failed to load project details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleAddKey = (id: string, issue: string) => {
    
  };

  const handleEditKey = (id: string) => {
    navigate(`${id}/keys`);

  };

  const handleDeleteKey = (key: string) => {
    setKeys(keys.filter((k) => k.id !== id));
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  console.log(keys)

  return (
    <AppLayout>
      <Container>
        <Typography variant="h4" gutterBottom>
          Changes
        </Typography>

        <Box>
          <FilterKeys filter={filter} onFilterChange={(e) => setFilter(e.target.value)} label="Search" />
          <Button variant="contained" color="primary" onClick={handleDialogOpen} sx={{ marginTop: 2 }}>
            Add Key
          </Button>
        </Box>

        <KeyList
          items={change}
          filter={filter}
          onEdit={(item) => handleEditKey(item.id)}
          onDelete={(item) => handleDeleteKey(item.id)}
          renderItem={(item) => (
            <KeyItem id={item.id} translation={item.issue} />
          )}
          getItemKey={(item) => item.id}
        />

      <GenericDialog
        open={dialogOpen}
        title="Add New Key"
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
      >
        <Box sx={{ padding: 2 }}>
            <TextField
              label="Issue"
              value={formValues.issue}
              onChange={(e) => setFormValues({ ...formValues, issue: e.target.value })}
              fullWidth
              margin="normal"
            />
          </Box>
      </GenericDialog>
    </Container>
    </AppLayout>
    
  );
};

export default ProjectChanges;
