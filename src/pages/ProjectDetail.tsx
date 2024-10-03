import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Box, Grid2 } from '@mui/material';
import KeyList from '../components/KeyList';
import DetailData from '../services/detailData.json';
import AppLayout from '../components/AppLayout';
import FilterKeys from '../components/FilterKeys';
import { Key, ProjectDetailProps } from '../types/types';
import GenericDialog from '../components/GenericDialog';
import AddKeyForm from '../components/AddKeyForm'; 
import KeyItem from '../components/KeyItem';
import Loading from '../components/Loading';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectDetailProps | null>(null);
  const [keys, setKeys] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 2; // Definir o número total de etapas

  const initialFormValues = {
    id: '',
    module: '',
    bu: [],
    breakpoints: [],
    freeText: '',
    suggestedKey: '',
    translations: [],  // inicializado como array vazio
    repo: '',
    legalImplication: false,
    screenshot: null
  };
  

  const [errors, setErrors] = useState({
    module: false,
    bu: false,
    breakpoints: false,
    repo: false,
    freeText: false,
    translation: false
  });

  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    const suggestedKey = `${formValues.module}.${formValues.bu}.${formValues.breakpoints}`.toLowerCase();
    setFormValues((prev: any) => ({ ...prev, suggestedKey }));
  }, [formValues.module, formValues.bu, formValues.breakpoints, formValues.freeText]);

  const handleDialogOpen = useCallback(() => {
    setDialogOpen(true);
    setStep(1);
  }, []);

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
    setFormValues(initialFormValues);
  }, [initialFormValues]);

  const validateFields = () => {
    // Validações para o passo 1
    const step1Errors = {
      module: formValues.module === '',
      bu: formValues.bu.length === 0,  // Verifica se o array 'bu' está vazio
      breakpoints: formValues.breakpoints.length === 0, // Verifica se 'breakpoints' está vazio
      repo: formValues.repo === '',  // Repo já está no passo 1 agora
      freeText: formValues.freeText === '',
      translation: false,  // Não validado no passo 1
    };
  
    // Validações para o passo 2
    const step2Errors = {
      module: false,  // Não é necessário validar o módulo no passo 2
      bu: false,      // Não é necessário validar 'bu' no passo 2
      breakpoints: false, // Não é necessário validar 'breakpoints' no passo 2
      repo: false,    // Já foi validado no passo 1
      freeText: false, // Já foi validado no passo 1
      translation: (formValues.translations || []).some((translation: string) => translation === '') // Garante que 'translations' é um array
    };
  
    // Determina os erros com base no passo atual
    const errors = step === 1 ? step1Errors : step2Errors;
    setErrors(errors);
  
    // Retorna true apenas se não houver erros
    return !Object.values(errors).some((error) => error);
  };
  
  
  
  const handleNextStep = useCallback(() => {
    if (validateFields()) {
      setStep((prevStep) => prevStep + 1);  // Avançar para o próximo passo
    }
  }, [validateFields]);

    const handleSubmit = useCallback(() => {
      if (validateFields()) {
        console.log(formValues);
        handleDialogClose();
      }
    }, [formValues, handleDialogClose]);

   

  const handleEditKey = useCallback((dataToEdit: typeof formValues) => {
    setFormValues(dataToEdit);
    setStep(1); // Volta para o primeiro passo ao editar
    setDialogOpen(true);
  }, []);

  const handleDeleteKey = useCallback((id: string) => {
    setKeys(prevKeys => prevKeys.filter((k) => k.id !== id));
  }, []);

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
          {project?.name} Project
        </Typography>
        <Grid2>
          <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
            <FilterKeys 
              filter={filter} 
              onFilterChange={(e) => setFilter(e.target.value)} 
              label="Search by key..." 
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleDialogOpen} 
              sx={{ mt: 2 }}
            >
              Add Key
            </Button>
          </Box>
        </Grid2>
        
        {project !== null ? (
          <KeyList
            items={keys}
            filter={filter}
            onEdit={handleEditKey}
            onDelete={(item) => handleDeleteKey(item.id)}
            renderItem={(item) => (
              <KeyItem id={item.id} translation={item.translation} />
            )}
            getItemKey={(item) => item.id}
          />
        ) : (
          <Typography>This project does not have any key yet!</Typography>
        )}
      </Container>
      <GenericDialog
        open={dialogOpen}
        title={formValues.id ? 'Edit Key' : 'Add New Key'}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
        step={step}
        setStep={setStep}
        totalSteps={totalSteps}
        onNext={handleNextStep}
      >
        <AddKeyForm 
          formData={formValues} 
          setFormData={setFormValues} 
          step={step} 
          errors={errors}
        />
      </GenericDialog>
    </AppLayout>
  );
};

export default ProjectDetail;
