import React from 'react';
import { List, ListItem, Divider, IconButton } from '@mui/material';
import { Edit, Delete, Undo } from '@mui/icons-material';

interface KeyListProps<T> {
  items: T[];  
  filter: string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onUndoDelete?: (item: T) => void;
  renderItem: (item: T) => React.ReactNode;
  getItemKey: (item: T) => string;
}

const KeyList = <T extends object>({ 
  items, 
  filter, 
  onEdit, 
  onDelete, 
  onUndoDelete,  // Novo handler passado aqui
  renderItem, 
  getItemKey 
}: KeyListProps<T>) => {
  return (
    <List>
      {items
        .filter((item) => getItemKey(item).toLowerCase().includes(filter.toLowerCase()))
        .map((item) => (
          <React.Fragment key={getItemKey(item)}>
            <ListItem
              secondaryAction={
                <>
                  {/* Lógica de botão baseado no tipo */}
                  {'type' in item && item.type === 'delete' ? (
                    onUndoDelete && (
                      <IconButton aria-label="undo" onClick={() => onUndoDelete(item)}>
                        <Undo />
                      </IconButton>
                    )
                  ) : (
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
