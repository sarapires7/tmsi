import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Button, Box, TextField } from '@mui/material';
import KeyList from '../components/KeyList';
import ChangeData from '../services/dataChanges.json';
import AppLayout from '../components/AppLayout';
import FilterKeys from '../components/FilterKeys';
import { ChangeProps } from '../types/types';
import GenericDialog from '../components/GenericDialog';
import KeyItem from '../components/KeyItem';
import Loading from '../components/Loading';

const ProjectChanges: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [changes, setChanges] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    issue: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchChanges = async () => {
      try {
        const changes = ChangeData;
        if (changes) {
            setChanges(changes);
        }
      } catch (err) {
        setError('Failed to load project details.');
      } finally {
        setLoading(false);
      }
    };

    fetchChanges();
  }, [id]);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const handleAddChange = () => {
    setChanges([
      ...changes, 
      { 
        id: Date.now().toString(), 
        issue: formValues.issue, 
        keys_modified: 
          [
            {
                type: "add",
                before: null,
                after: {
                    key: "settings_close",
                    value: "Close"
                }

            }
          ], 
      }]);
    console.log('Form Submitted:', formValues);
    handleDialogClose(); 
  };

  const handleEditChange = (id: string) => {
    navigate(`${id}/keys`);
  };

  const handleDeleteChange = (change: string) => {
    const deleteChange = changes.filter((item: { id:string }) => item.id !== change)
    setChanges(deleteChange);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <AppLayout>
      <Container>
        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
          Changes
        </Typography>

        <Box display='flex' alignItems='center' justifyContent='space-between' p={2}>
            <FilterKeys 
              filter={filter} 
              onFilterChange={(e) => setFilter(e.target.value)} 
              label="Search by issue..." 
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => handleDialogOpen()} 
              sx={{ mt: 2 }}
            >
                Add change
            </Button>
          </Box>

        <KeyList
          items={changes}
          filter={filter}
          onEdit={(item) => handleEditChange(item.id)}
          onDelete={(item) => handleDeleteChange(item.id)}
          renderItem={(item) => (
            <KeyItem id='Issue' translation={item.issue} />
          )}
          getItemKey={(item) => item.issue.toLowerCase()}
        />

      <GenericDialog
        open={dialogOpen}
        title="Add New Change"
        onClose={handleDialogClose}
        onSubmit={handleAddChange}
      >
        <Box sx={{ p: 2 }}>
          <TextField
            label="Issue identifier..."
            value={formValues.issue}
            onChange={(e) => setFormValues({ ...formValues, issue: e.target.value.toUpperCase() })}
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
