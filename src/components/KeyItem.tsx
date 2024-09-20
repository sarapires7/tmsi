import React from 'react';
import { Typography, ListItemText } from '@mui/material';
import { Key } from '../types/types';

const KeyItem: React.FC<Key> = ({ id, translation }) => {
  return (
    <ListItemText 
      primary={id}
      secondary={<Typography color="textSecondary"> {translation}</Typography>}
      primaryTypographyProps={{ fontWeight:'bold' }}
    />
  );
};

export default KeyItem;
