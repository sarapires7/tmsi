import React from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select'; 
import FormControlInput from './FormControlInput';

const AddKeyForm: React.FC<any> = ({ formData, setFormData, step, errors }) => {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>, name: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: event.target.value }));
  };

  return (
    <form>
      {step === 1 && (
        <>
          <Typography variant="h5">Step 1</Typography>

          <FormControlInput
            errors={errors.module}
            value={formData.module}
            label="Module"
            options={['Module1', 'Module2', 'Module3']}
            handleSelectChange={(e) => handleSelectChange(e, 'module')}
            name="module"
          />

          <FormControlInput
            errors={errors.bu}
            value={formData.bu}
            label="BU"
            options={['BU1', 'BU2', 'BU3']}
            handleSelectChange={(e) => handleSelectChange(e, 'bu')}
            name="bu"
          />

          <FormControlInput
            errors={errors.breakpoints}
            value={formData.breakpoints}
            label="Breakpoints"
            options={['BP1', 'BP2', 'BP3']}
            handleSelectChange={(e) => handleSelectChange(e, 'breakpoints')}
            name="breakpoints"
          />

          <TextField
            label="Free text"
            fullWidth
            margin="normal"
            name="freeText"
            value={formData.freeText}
            onChange={handleInputChange}
            error={errors.freeText}
            helperText={errors.freeText ? "This field is required." : ""}
            required
          />

          <Typography variant="body1">
            Suggested Key: {formData.module && formData.bu && formData.breakpoints && formData.freeText ? `${formData.module}.${formData.bu}.${formData.breakpoints}.${formData.freeText}`.toLowerCase() : 'N/A'}
          </Typography>
        </>
      )}

      {step === 2 && (
        <>
          <Typography variant="h5">Step 2</Typography>

          <TextField
            label="Translation (English)"
            fullWidth
            margin="normal"
            name="translation"
            value={formData.translation}
            onChange={handleInputChange}
            error={errors.translation}
            helperText={errors.translation ? "This field is required." : ""}
            required
          />

          <FormControlInput
            errors={errors.repo}
            value={formData.repo}
            label="Repo"
            options={['Repo1', 'Repo2', 'Repo3']}
            handleSelectChange={(e) => handleSelectChange(e, 'repo')}
            name="repo"
          />

          <input type="file" accept="image/*" onChange={handleInputChange} />
        </>
      )}
    </form>
  );
};

export default AddKeyForm;
