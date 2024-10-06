import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';

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
      setStep(step + 1)
    }
  };

  const handlePrev = () => {
    if (setStep && step && step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Box 
          display="flex"
          justifyContent="space-between"
          width="100%"
          mb={2}
          mx={2}
        >
          <Box>
            <Button 
              onClick={onClose} 
              color="secondary"
              variant='outlined'
              sx={{ mr:1 }}
            >
              Cancel
            </Button>
            {step && step > 1 && (
              <Button onClick={handlePrev} color='primary' variant='outlined'>
                Prev
              </Button>
            )}
          </Box>
          <Box>
          {step && setStep && totalSteps ? (
            <>
              {step < totalSteps ? (
                <Button onClick={handleNext} color="primary" variant='outlined'>
                  Next
                </Button>
              ) : (
                <Button onClick={onSubmit} color="primary" variant='outlined'>
                  Submit
                </Button>
              )}
            </>
          ) : (
            <Button onClick={onSubmit} color="primary" variant='outlined'>
              Submit
            </Button>
          )}
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default GenericDialog;
