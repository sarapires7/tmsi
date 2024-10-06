import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Box, LinearProgress } from '@mui/material';
import KeyList from '../components/KeyList';
import KeyItemModified from '../components/KeyItemModified';
import DetailData from '../services/dataChanges.json';
import AppLayout from '../components/AppLayout';
import { ChangeProps, Key, ModificationProps } from '../types/types';
import GenericDialog from '../components/GenericDialog';
import AddKeyForm from '../components/AddKeyForm'; 
import KeyItem from '../components/KeyItem';
import Loading from '../components/Loading';
import HeaderTitle from '../components/HeaderTitle';
import HeaderActions from '../components/HeaderActions';

const initialFormValues = {
  id: '',
  module: '',
  bu: [],
  breakpoints: [],
  freeText: '',
  suggestedKey: '',
  translation: '',  
  repo: '',
  legalImplication: false,
  screenshot: null,
  translations: []
};

interface ErrorsForm {
  [key: string]: any
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [change, setChanges] = useState<ChangeProps | undefined>(undefined);
  const [inputValue, setInputValues] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 2;
  const [progress, setProgress] = useState<number>(0); // For progress tracking
  const [progressVisible, setProgressVisible] = useState<boolean>(false);

  const [errors, setErrors] = useState<ErrorsForm>({
    module: false,
    bu: false,
    breakpoints: false,
    repo: false,
    freeText: false,
    translation: false
  });

  const [formValues, setFormValues] = useState<Key | ModificationProps >(initialFormValues);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const changesList: any = DetailData;
        const change = changesList.filter((item: {id:string | undefined}) => item.id === id)
        if (change) {
          setChanges(change[0])
        }
      } catch (err) {
        setError('Failed to load project details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleDialogOpen = useCallback(() => {
    setDialogOpen(true);
    setStep(1);
  }, []);

  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
    setFormValues(initialFormValues);
  }, [initialFormValues]);

  const validateFields = useCallback(() => {
    const newErrors = {
      module:(formValues as Key).module === "",
      bu: (formValues as Key).bu.length === 0,
      breakpoints: (formValues as Key).breakpoints.length === 0,
      repo: step === 2 && (formValues as Key).repo === '',
      freeText: (formValues as Key).freeText,
      translation: step === 2 && (formValues as Key).translation === ''
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error)
  }, [formValues, step]);

  
  const handleNextStep = useCallback(() => {
    if (validateFields()) {
      setStep((prevStep) => prevStep + 1);  // Avançar para o próximo passo
    }
  }, [validateFields]);

  const handleSubmit = useCallback(() => {
    if (validateFields()) {
      handleDialogClose();
    }
  }, [validateFields, handleDialogClose]);

   
  const handleEditKey = useCallback((dataToEdit: typeof formValues) => {
    setFormValues(dataToEdit);
    setStep(1); // Volta para o primeiro passo ao editar
    setDialogOpen(true);
  }, []);

  const handleDeleteKey = useCallback((id: string) => {
    console.log(id);
  }, []);

  const handleSubmitKeyForm = async () => {
    // Start progress modal
    setProgressVisible(true);
    setProgress(0);

    try {
      // Simulate the first step
      await new Promise((resolve) => {
        setTimeout(() => {
          setProgress(20);
          resolve(true);
        }, 1000);
      });

      // Simulate the second step
      await new Promise((resolve) => {
        setTimeout(() => {
          setProgress(60);
          resolve(true);
        }, 2000);
      });

      // Simulate final step
      await new Promise((resolve) => {
        setTimeout(() => {
          setProgress(100);
          resolve(true);
        }, 1000);
      });

      console.log('All API calls completed successfully.');
    } catch (error) {
      console.error('Error during API calls:', error);
    } finally {
      setTimeout(() => {
        setProgressVisible(false); // Hide progress modal after a slight delay
        setFormValues(initialFormValues); // Reset form values after submission
      }, 500); // Delay for user to see 100% before closing
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  const combinedKeys: (ModificationProps | Key)[] | null = change
    ? [...change.keys_modified, ...change.keys_unmodified]
    : [];

  const renderKeys = (item: ModificationProps | Key | null) => {
    if(item && 'type' in item) {
      if(item.type === 'add' || item.type === 'update') {
        return <KeyItemModified item={item} index={item?.after?.id} />
      } else {
        return <KeyItemModified item={item} index={item?.before?.id} />
      }
    } else {
      return <KeyItem item={item} />
    }
  }

  const renderKeyIds = (item: ModificationProps | Key | null) => {
    if(item && 'type' in item) {
      if(item.type === 'add' || item.type === 'update') {
        return item?.after?.id || ''
      } else {
        return item?.before?.id || ''
      }
    } else {
      return item?.id || ''
    }
  }

  return (
    <AppLayout>
      <Container>
        <HeaderTitle page={change?.issue || 'Change'} />
        <HeaderActions
          filter={inputValue}
          setFilter={(e) => setInputValues(e.target.value)}
          handleDialogOpen={() => handleDialogOpen()}
          title='Add key'
          label='Search by key'
        />
        
        {change !== null ? (
          <KeyList
            items={combinedKeys}
            filter={inputValue}
            renderItem={(item) => renderKeys(item)}
            getItemKey={(item => renderKeyIds(item))}
            onEdit={(item) => handleEditKey(item)}
            onDelete={(item) => handleDeleteKey(item.id)}
          />
        ) : (
          <Typography>This project does not have any key yet!</Typography>
        )}
        <Box display="flex" alignItems="center" justifyContent="center" p={2}>
          <Button variant='contained' color='primary' onClick={handleSubmitKeyForm} sx={{marginTop: 2}}>
            Submit
          </Button>
        </Box>
      </Container>

      {progressVisible && (
        <GenericDialog
          open={progressVisible}
          title="Submitting..."
          onClose={() => setProgressVisible(false)}
          onSubmit={() => {}} // Provide a dummy onSubmit if required
        >
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" color="textSecondary">{`Progress: ${progress}%`}</Typography>
        </GenericDialog>
      )}

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
          formValues={formValues} 
          setFormValues={setFormValues} 
          step={step} 
          errors={errors}
          setErrors={setErrors}
        />
      </GenericDialog>
    </AppLayout>
  );
};

export default ProjectDetail;
