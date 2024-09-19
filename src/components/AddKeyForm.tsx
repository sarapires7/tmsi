import React, { useState } from 'react';
import {
  FormControl,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import DataForm from "../services/dataKeyForm.json"
import FormControlInput from './FormControlInput';

interface AddKeyFormProps {
  formValues: any;
  setFormValues: React.Dispatch<React.SetStateAction<any>>;
  handleSubmit: (event: React.FormEvent) => void; // Agora passando a função de submit do parent
}

const AddKeyForm: React.FC<AddKeyFormProps> = ({ formValues, setFormValues, handleSubmit }) => {
  const [errors, setErrors] = useState({
    module: false,
    bu: false,
    breakpoint: false,
    repository: false,
  });

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name as string]: value,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      module: formValues.module === '',
      bu: formValues.bu === '',
      breakpoint: formValues.breakpoint === '',
      repository: formValues.repository === '',
    };
    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  return (
    <form onSubmit={(e) => {
      if (validateForm()) {
        handleSubmit(e);
      }
    }}>
      {DataForm.map((formKey, index) => (
        <FormControlInput
          errors={errors}
          formValues={formValues}
          questionary={formKey}
          handleSelectChange={handleSelectChange}
          key={index}
        />
      ))}

      <TextField
        label="Free text"
        name="freeText"
        value={formValues.freeText}
        onChange={handleInputChange}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="legalImplications"
            checked={formValues.legalImplications}
            onChange={handleInputChange}
          />
        }
        label="Legal implications?"
      />

      <Button type="submit" variant="contained" color="primary">
        {formValues.id ? 'Edit Key' : 'Add Key'}
      </Button>
    </form>
  );
};

export default AddKeyForm;
