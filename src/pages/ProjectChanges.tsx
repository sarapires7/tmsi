import React, { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Box, TextField } from '@mui/material';
import ChangeData from '../services/dataChanges.json';
import AppLayout from '../components/AppLayout';
import GenericDialog from '../components/GenericDialog';
import AccordionItems from '../components/AccordionItems';
import Loading from '../components/Loading';
import HeaderTitle from '../components/HeaderTitle';
import HeaderActions from '../components/HeaderActions';


const ProjectChanges: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [changes, setChanges] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState("")
  const [isValid, setIsValid] = useState(false)

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

  console.log(changes)

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => {
    setDialogOpen(false)
    setFormValues('')
  };

  const handleAddChange = () => {
    if(formValues.trim() === ''){
      setIsValid(true)
    } else {
      setIsValid(false)
      setChanges([
        ...changes, 
        { 
          id: Date.now().toString(), 
          issue: formValues, 
          keys_modified: [], 
          keys_unmodified: [], 
        }]);
      console.log('Form Submitted:', formValues);
      handleDialogClose(); 
    }
    
  };

  const handleChangeFormValue = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues(e.target.value.toUpperCase())
    if (isValid && e.target.value.trim() !== ""){
      setIsValid(false)
    }
  }

  const handleEditChange = (id: string) => {
    navigate(`${id}/keys`);
  };

  const handleDeleteChange = (change: string) => {
    const deleteChange = changes.filter((item: { id: string }) => item.id !== change)
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
        <HeaderTitle page="changes" />
        <HeaderActions 
          filter={filter}
          setFilter={(e) => setFilter(e.target.value)}
          handleDialogOpen={() => handleDialogOpen()}
          title="Add change"
          label="Search by issue..."
        />

        {changes && changes
          .map((change: any) => (
            <AccordionItems 
              key={change.id}
              change={change}
              onEdit={() => handleEditChange(change.id)}
              onDelete={() => handleEditChange(change.id)}
            />
          ))
        }

      <GenericDialog
        open={dialogOpen}
        title="Add New Change"
        onClose={handleDialogClose}
        onSubmit={handleAddChange}
      >
        <Box sx={{ p: 2 }}>
          <TextField
            label="Issue identifier..."
            value={formValues}
            onChange={handleChangeFormValue}
            fullWidth
            margin="normal"
            required
            error={isValid}
            helperText={isValid ? 'Prease, fill the issue' : ''}
          />
        </Box>
      </GenericDialog>
    </Container>
    </AppLayout>
    
  );
};

export default ProjectChanges;
