import React from 'react';
import { List, ListItem, Divider, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

interface KeyListProps<T> {
  items: T[];  
  filter: string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  renderItem: (item: T) => React.ReactNode;
  getItemKey: (item: T) => string;
}

const KeyList = <T,>({ 
  items, 
  filter, 
  onEdit, 
  onDelete, 
  renderItem, 
  getItemKey 
}: KeyListProps<T>) => {
  return (
    <List>
      {items
        .filter((item) => getItemKey(item).includes(filter.toLowerCase()))
        .map((item) => (
          <React.Fragment key={getItemKey(item)}>
            <ListItem
              secondaryAction={
                <>
                  {onEdit && (
                    <IconButton aria-label="edit" onClick={() => onEdit(item)}>
                      <Edit />
                    </IconButton>
                  )}
                  {onDelete && (
                    <IconButton aria-label="delete" onClick={() => onDelete(item)}>
                      <Delete />
                    </IconButton>
                  )}
                </>
              }
            >
              {renderItem(item)}  
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
    </List>
  );
};

export default KeyList;
