import React from 'react';
import { Typography, ListItemText, Box } from '@mui/material';
import { Key } from '../types/types';

interface KeyItemProps {
  item: Key | null
}

const KeyItem: React.FC<KeyItemProps> = ({ item }) => {
  return (
    <ListItemText sx={{py: 1.5, p1:1}} >
      <Box
        component="section"
        sx={{
          display: 'flex',
          width: '100%'
        }}
      >
        <Typography variant='body2' sx={{fontWeight: 'bold', mr: 1}}>
          {item?.id}
        </Typography>
        <Typography variant='body2'>
          {item?.translation}
        </Typography>
      </Box>
    </ListItemText>
  );
};

export default KeyItem;
