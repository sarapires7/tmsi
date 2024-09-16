import React from 'react';
import { Grid } from '@mui/material';
import KeyItem from './KeyItem';

interface KeyListProps {
  keys: { key: string; translation: string }[];
  onEdit: (key: string) => void;
  onDelete: (key: string) => void;
  filter: string;
}

const KeyList: React.FC<KeyListProps> = ({ keys, onEdit, onDelete, filter }) => {
  return (
    <Grid container spacing={2}>
      {keys
        .filter((k) => k.key.includes(filter)) 
        .map((k) => (
          <KeyItem
            key={k.key}
            keyName={k.key}
            translation={k.translation}
            onEdit={() => onEdit(k.key)}
            onDelete={() => onDelete(k.key)}
          />
        ))}
    </Grid>
  );
};

export default KeyList;
