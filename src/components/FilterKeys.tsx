import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import {FilterKeysProps} from '../types/types'
import { Search } from '@mui/icons-material';

const FilterKeys: React.FC<FilterKeysProps> = ({ filter, onFilterChange, label }) => {
  return (
    <TextField
      placeholder={label}
      variant="standard"
      value={filter}
      onChange={onFilterChange}
      sx={{ mb: 2, mt: 4 }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          )
        }
      }}
    />
  );
};

export default FilterKeys;
