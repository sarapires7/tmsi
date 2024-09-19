import React from 'react';
import { TextField } from '@mui/material';
import {FilterKeysProps} from '../types/types'

const FilterKeys: React.FC<FilterKeysProps> = ({ filter, onFilterChange, label }) => {
  return (
    <TextField
      placeholder={label}
      variant="standard"
      value={filter}
      onChange={onFilterChange}
      sx={{ mb: 2, mt: 4 }}
    />
  );
};

export default FilterKeys;
