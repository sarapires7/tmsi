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
}

const AddKeyForm: React.FC<AddKeyFormProps> = ({ formValues, setFormValues }) => {
  const [errors, setErrors] = useState({
    module: false,
    bu: false,
    breakpoint: false,
    repository: false,
  });

  // Função para o Select
  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name as string]: value,
    });
  };

  // Função para o TextField e TextArea
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Função para validar o formulário
  const validateForm = () => {
    const newErrors = {
      module: formValues.module === '',
      bu: formValues.bu === '',
      breakpoint: formValues.breakpoint === '',
      repository: formValues.repository === '',
    };
    setErrors(newErrors);

    // Verificar se há algum erro
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      // Lógica de envio de formulário aqui (API call, etc.)
      console.log('Formulário válido, enviar dados:', formValues);
    } else {
      console.log('Formulário inválido');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {DataForm.map((formKey,index) => (
        <FormControlInput
          errors={errors}
          formValues={formValues}
          questionary={formKey}
          handleSelectChange={handleSelectChange}
          key={index}
        />
        
      ))}
      

      {/* Campo de texto livre */}
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

      {/* Checkbox para "Legal implications" */}
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

      {/* Botão de enviar */}
      <Button type="submit" variant="contained" color="primary">
        Add Key
      </Button>
    </form>
  );
};

export default AddKeyForm;
