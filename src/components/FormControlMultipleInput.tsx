import React from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  SelectChangeEvent,
  MenuItem, 
  FormHelperText,
  Checkbox,
  ListItemText
} from '@mui/material';

interface FormControlInputProps {
  errors: boolean;
  value: string;
  label: string;
  options: string[];
  handleSelectChange: (event: SelectChangeEvent) => void;
  name: string;
}

const FormControlMultipleInput: React.FC<FormControlInputProps> = ({
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
        multiple
        label={name}
        value={value}
        onChange={handleSelectChange}
        renderValue={(selected) => Array.isArray(selected) && selected.join(', ')}
      >
        <MenuItem value="">-- Select {label} --</MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            <Checkbox checked={value.includes(option)}/>
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
      {errors && <FormHelperText>{`${label} is required.`}</FormHelperText>}
    </FormControl>
  );
};

export default FormControlMultipleInput;
