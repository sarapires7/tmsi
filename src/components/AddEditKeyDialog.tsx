import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

interface AddEditKeyDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (key: string, translation: string) => void;
  initialKey?: string;
  initialTranslation?: string;
}

const AddEditKeyDialog: React.FC<AddEditKeyDialogProps> = ({ open, onClose, onSave, initialKey = '', initialTranslation = '' }) => {
  const [key, setKey] = useState<string>(initialKey);
  const [translation, setTranslation] = useState<string>(initialTranslation);

  const handleSave = () => {
    onSave(key, translation);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialKey ? 'Edit Key' : 'Add New Key'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Key"
          variant="outlined"
          fullWidth
          value={key}
          onChange={(e) => setKey(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Translation"
          variant="outlined"
          fullWidth
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          {initialKey ? 'Update' : 'Add'}
        </Button>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditKeyDialog;
