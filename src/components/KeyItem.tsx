import React from 'react';
import { Typography, IconButton, Grid } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

interface KeyItemProps {
  keyName: string;
  translation: string;
  onEdit: () => void;
  onDelete: () => void;
}

const KeyItem: React.FC<KeyItemProps> = ({ keyName, translation, onEdit, onDelete }) => {
  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h6">{keyName}</Typography>
      <Typography variant="body1">Translation: {translation}</Typography>
      <IconButton onClick={onEdit}>
        <Edit />
      </IconButton>
      <IconButton onClick={onDelete}>
        <Delete />
      </IconButton>
    </Grid>
  );
};

export default KeyItem;
