import React, { ChangeEvent } from 'react';
import { Button, TextField, Typography, Box, Checkbox, Stepper, StepLabel, Step, FormControlLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select'; 
import FormControlInput from './FormControlInput';
import FormControlMultipleInput from './FormControlMultipleInput';
import { UploadFile } from '@mui/icons-material';
import { Key, ModificationProps } from '../types/types'

interface AddKeyFormProps {
  formValues: Key | ModificationProps;
  setFormValues: React.Dispatch<React.SetStateAction<ModificationProps | Key>>;
  step: number;
  errors: KeyForm;
  setErrors: (item: any) => void
}

interface KeyForm {
  [key: string]: boolean
}

const AddKeyForm: React.FC<AddKeyFormProps> = ({ formValues, setFormValues, step, errors, setErrors }) => {

  // Handler para mudança de inputs (geral)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    const isChecked = (event.target as HTMLInputElement).checked
    setFormValues((prev: Key | ModificationProps) => ({ 
      ...prev, 
      [name]: type === "checkbox" ? isChecked : value 
    }));

    if(errors[name]) {
      setErrors((prev: any) => ({...prev, [name]: false}))
    }
  };

  // Handler para mudanças em selects múltiplos (BU, Breakpoints)
  const handleSelectChange = (event: SelectChangeEvent<string[]>, name: string) => {
    setFormValues((prev: Key | ModificationProps) => ({ 
      ...prev, 
      [name]: event.target.value 
    }));
    if (errors[name]) {
      setErrors((prev: any) => ({...prev, [name]: false}))
    }
  };

  const handleSelectMultipleChanges = (event: any, name: string) => {
    const value =  event.target.value as string[]
    setFormValues((prev: Key | ModificationProps) => ({ 
      ...prev, 
      [name]: value 
    }));
    if (errors[name]) {
      setErrors((prev: any) => ({...prev, [name]: false}))
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file =  event.target.files?.[0];
    if(file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormValues((prev:any) => ({ 
          ...prev, 
          screenshot: base64String 
        }));
        reader.readAsDataURL(file)
      }
    }
  };

  const suggestedKeys = 
  (formValues as Key).module &&
  (formValues as Key).bu &&
  (formValues as Key).breakpoints &&
  (formValues as Key).freeText
    ? (formValues as Key)?.bu.flatMap((bu: string) =>
      (formValues as Key)?.breakpoints.map((bp: string) =>
        `${(formValues as Key).module}.${bu}.${bp}.${(formValues as Key).freeText}`.toLowerCase()
      )
    ) : [];

  return (
    <form>
      <Box mb={6}>
        <Stepper activeStep={step - 1}>
          {["Step 1: Key Details", "Step 2: Translation Details"].map(
            (label) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              )
            }
          )}
        </Stepper>
      </Box>
      {step === 1 && (
        <>
          <FormControlInput
            errors={errors.module}
            value={(formValues as Key).module}
            label="Module"
            options={['Module1', 'Module2', 'Module3']}
            handleSelectChange={(e: any) => handleSelectChange(e, 'module')}
            name="module"
          />

          <FormControlMultipleInput
            errors={errors.bu}
            value={(formValues as Key).bu}
            label="BU"
            options={['BU1', 'BU2', 'BU3']}
            handleSelectChange={(e) => handleSelectMultipleChanges(e, 'bu')}
            name="bu"
          />

          
          <FormControlMultipleInput
            errors={errors.breakpoints}
            value={(formValues as Key).breakpoints}
            label="Breakpoints"
            options={['lg', 'md', 'sm']}
            handleSelectChange={(e) => handleSelectMultipleChanges(e, 'breakpoints')}
            name="breakpoints"
          />

          <TextField
            variant='standard'
            label="Free text"
            fullWidth
            margin="normal"
            name="freeText"
            value={(formValues as Key).freeText}
            onChange={handleInputChange}
            
          />

          {/* Campo Repo adicionado ao Step 1 */}
          <FormControlInput
            errors={errors.repo}
            value={(formValues as Key).repo}
            label="Repo"
            options={['Repo1', 'Repo2', 'Repo3']}
            handleSelectChange={(e: any) => handleSelectChange(e, 'repo')}
            name="repo"
          />

          <Box mt={2}>
            <FormControlLabel 
              control={
                <Checkbox 
                  name="legalImplications"
                  checked={(formValues as Key).legalImplications}
                  onChange={handleInputChange}
                />
              }
              label="legal implications"
            />
          </Box>

          <Box
            component="section"
            sx={{
              p:2,
              mt: 2,
              border: "1px dashed grey",
              display: 'flex',
              justifyContent: "center"
            }}
          >
            <Typography
              variant='subtitle2'
              sx= {{fontWeight: 'bold', color: 'primary.main'}}
            >
              {(formValues as Key).module ||
              (formValues as Key).bu ||
              (formValues as Key).breakpoints ||
              (formValues as Key).freeText
                ? `${(formValues as Key).module || '[module]'}.${(formValues as Key).bu || '[bu]'}.${(formValues as Key).breakpoints || '[breakpoints]'}.${(formValues as Key).freeText || '[freeText]'}`
                : "Key preview..."
              }
            </Typography>
          </Box>
        </>
      )}

      {step === 2 && (
        <>
        {suggestedKeys.map((key: string, index: number) => (
  <Box
    key={key}
    sx={{ mb: 2 }}
    display="flex"
    justifyContent="space-between"
    alignItems="center"
  >
    <TextField
      variant="standard"
      label={`Translation for ${key}`}
      margin="normal"
      sx={{ width: '60%' }}
      name={`translation_${index}`}
      value={(formValues as Key).translations?.[index] || ""}
      onChange={(e) =>
        setFormValues((prev: any) => ({
          ...prev,
          translations: {
            ...prev.translations,
            [index]: e.target.value
          }
        }))
      }
      error={errors.translation}
      helperText={errors.translation ? "This field is required." : ""}
      required
    />

    {!(formValues as Key).screenshot ? (
      <Button
        variant="outlined"
        component="label"
        startIcon={<UploadFile />}
        sx={{ mt: 2 }}
      >
        Upload screenshot
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
    ) : (
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1, textAlign: "center" }}>
        File Uploaded
      </Typography>
    )}
  </Box>
))}
        </>
      )}
    </form>
  );
};

export default AddKeyForm;
