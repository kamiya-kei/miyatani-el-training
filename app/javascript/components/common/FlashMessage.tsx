import React, { forwardRef, useState, useImperativeHandle } from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export interface FlashMessageHandler {
  showMessage: (message: string, severity: AlertColor) => void;
}

const FlashMessage = forwardRef((_, ref) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success' as AlertColor);

  useImperativeHandle(ref, () => ({
    showMessage: (message: string, newSeverity: AlertColor = null) => {
      setMessage(message);
      setSeverity(newSeverity || 'success');
      setOpen(true);
    },
  }));

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert severity={severity} onClose={handleClose}>
        {message}{' '}
      </Alert>
    </Snackbar>
  );
});

FlashMessage.displayName = 'FlashMessage';

export default FlashMessage;
