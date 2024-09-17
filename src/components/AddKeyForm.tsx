import React, { useState } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  FormHelperText,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

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
      {/* Select para "What module?" */}
      <FormControl fullWidth required error={errors.module}>
        <InputLabel>What module?</InputLabel>
        <Select
          name="module"
          value={formValues.module}
          onChange={handleSelectChange}
        >
          <MenuItem value="">-- Select Module --</MenuItem>
          <MenuItem value="Module 1">Module 1</MenuItem>
          <MenuItem value="Module 2">Module 2</MenuItem>
          <MenuItem value="Module 3">Module 3</MenuItem>
        </Select>
        {errors.module && <FormHelperText>Module is required.</FormHelperText>}
      </FormControl>

      {/* Select para "Which BU?" */}
      <FormControl fullWidth required error={errors.bu}>
        <InputLabel>Which BU?</InputLabel>
        <Select
          name="bu"
          value={formValues.bu}
          onChange={handleSelectChange}
        >
          <MenuItem value="">-- Select BU --</MenuItem>
          <MenuItem value="BU 1">BU 1</MenuItem>
          <MenuItem value="BU 2">BU 2</MenuItem>
          <MenuItem value="BU 3">BU 3</MenuItem>
        </Select>
        {errors.bu && <FormHelperText>BU is required.</FormHelperText>}
      </FormControl>

      {/* Select para "Which breakpoint?" */}
      <FormControl fullWidth required error={errors.breakpoint}>
        <InputLabel>Which breakpoint?</InputLabel>
        <Select
          name="breakpoint"
          value={formValues.breakpoint}
          onChange={handleSelectChange}
        >
          <MenuItem value="">-- Select Breakpoint --</MenuItem>
          <MenuItem value="Breakpoint 1">Breakpoint 1</MenuItem>
          <MenuItem value="Breakpoint 2">Breakpoint 2</MenuItem>
          <MenuItem value="Breakpoint 3">Breakpoint 3</MenuItem>
        </Select>
        {errors.breakpoint && <FormHelperText>Breakpoint is required.</FormHelperText>}
      </FormControl>

      {/* Select para "Which repository?" */}
      <FormControl fullWidth required error={errors.repository}>
        <InputLabel>Which repository?</InputLabel>
        <Select
          name="repository"
          value={formValues.repository}
          onChange={handleSelectChange}
        >
          <MenuItem value="">-- Select Repository --</MenuItem>
          <MenuItem value="Repo 1">Repo 1</MenuItem>
          <MenuItem value="Repo 2">Repo 2</MenuItem>
          <MenuItem value="Repo 3">Repo 3</MenuItem>
        </Select>
        {errors.repository && <FormHelperText>Repository is required.</FormHelperText>}
      </FormControl>

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
