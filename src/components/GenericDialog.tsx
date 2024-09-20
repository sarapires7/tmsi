import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface GenericDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
  step?: number;  // Agora opcional
  setStep?: (step: number) => void;  // Agora opcional
  totalSteps?: number;  // Agora opcional
}

const GenericDialog: React.FC<GenericDialogProps> = ({
  open,
  title,
  onClose,
  onSubmit,
  step,
  setStep,
  totalSteps,
  children
}) => {
  const handleNext = () => {
    if (setStep && step && totalSteps && step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (setStep && step && step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>

        {/* Renderizar os botões de navegação se step e totalSteps estiverem definidos */}
        {step && setStep && totalSteps ? (
          <>
            {step > 1 && (
              <Button onClick={handlePrev} color="primary">
                Prev
              </Button>
            )}
            {step < totalSteps ? (
              <Button onClick={handleNext} color="primary">
                Next
              </Button>
            ) : (
              <Button onClick={onSubmit} color="primary">
                Submit
              </Button>
            )}
          </>
        ) : (
          // Caso não tenha steps, apenas exibe o botão de Submit
          <Button onClick={onSubmit} color="primary">
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default GenericDialog;
