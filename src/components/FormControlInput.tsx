import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

const FormControlInput: React.FC<any> = ({
    errors,
    formValues,
    questionary,
    handleSelectChange
}) => {
  return (
    <FormControl fullWidth required error={errors.module}>
        <InputLabel>What module?</InputLabel>
        <Select
          name="module"
          value={formValues.module}
          onChange={handleSelectChange}
        >
          <MenuItem value="">-- Select Module --</MenuItem>
          {questionary.options.map((option: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: string | number | readonly string[] | undefined) => (
            <MenuItem value={index}>{option}</MenuItem>
          ))}
          
        </Select>
        {errors.module && <FormHelperText>Module is required.</FormHelperText>}
      </FormControl>
  );
};

export default FormControlInput;
