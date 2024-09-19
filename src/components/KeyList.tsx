import React from 'react';
import { List, ListItem, Divider, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

interface KeyListProps<T> {
  items: T[];  // Lista genérica de itens
  filter: string;  // Filtro de busca
  onEdit?: (item: T) => void;  // Ação de editar
  onDelete?: (item: T) => void;  // Ação de deletar
  renderItem: (item: T) => React.ReactNode;  // Renderização personalizada para cada item
  getItemKey: (item: T) => string;  // Função para obter a chave única de cada item
}

const KeyList = <T,>({ items, filter, onEdit, onDelete, renderItem, getItemKey }: KeyListProps<T>) => {
  return (
    <List>
      {items
        .filter((item) => getItemKey(item).includes(filter))
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
