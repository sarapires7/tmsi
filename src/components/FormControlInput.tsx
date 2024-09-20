import React from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  SelectChangeEvent,
  MenuItem, 
  FormHelperText 
} from '@mui/material';

interface FormControlInputProps {
  errors: boolean;
  value: string;
  label: string;
  options: string[];
  handleSelectChange: (event: SelectChangeEvent) => void;
  name: string;
}

const FormControlInput: React.FC<FormControlInputProps> = ({
  errors,
  value,
  label,
  options,
  handleSelectChange,
  name,
}) => {
  return (
    <FormControl
      variant="standard" 
      fullWidth 
      required 
      error={errors} 
      sx={{ mb: 2 }}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={handleSelectChange}
      >
        <MenuItem value="">-- Select {label} --</MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {errors && <FormHelperText>{`${label} is required.`}</FormHelperText>}
    </FormControl>
  );
};

export default FormControlInput;
