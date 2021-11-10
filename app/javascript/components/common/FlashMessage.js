import React, { forwardRef, useState, useImperativeHandle} from "react";
import PropTypes from "prop-types";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const FlashMessage = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const handleClose = () => setOpen(false);

  useImperativeHandle(ref, () => ({
    showMessage: (message) => {
      setMessage(message);
      setOpen(true);
    }
  }));

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert severity="success" onClose={handleClose}>{message} </Alert>
    </Snackbar>
  );
});

export default FlashMessage;
