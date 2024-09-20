import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface GenericDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
  step?: number;
  setStep?: (step: number) => void;
  totalSteps?: number;
  onNext?: () => void
}

const GenericDialog: React.FC<GenericDialogProps> = ({
  open,
  title,
  onClose,
  onSubmit,
  step,
  setStep,
  totalSteps,
  children,
  onNext
}) => {
  const handleNext = () => {
    if (onNext) {
      onNext();
    } else if (setStep && step !== undefined && step < totalSteps!) {
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
          <Button onClick={onSubmit} color="primary">
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default GenericDialog;
