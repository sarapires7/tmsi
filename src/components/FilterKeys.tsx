import React from 'react';
import { TextField } from '@mui/material';

interface FilterKeysProps {
  filter: string;
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterKeys: React.FC<FilterKeysProps> = ({ filter, onFilterChange }) => {
  return (
    <TextField
      label="Filter by key"
      variant="outlined"
      fullWidth
      value={filter}
      onChange={onFilterChange}
      sx={{ marginBottom: 2 }}
    />
  );
};

export default FilterKeys;
