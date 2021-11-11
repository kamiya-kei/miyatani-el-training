import React, { forwardRef, useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDialog = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  const [handleAgree, setHandleAgree] = useState(()=>{});
  const [handleDisagree, setHandleDisagree] = useState(()=>{});
  const resetHandle = () => {
    setHandleAgree(()=>{});
    setHandleDisagree(()=>{});
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    confirm: () => new Promise((resolve, reject) => {
      setHandleAgree(() => () => {
        resetHandle();
        resolve(true);
      });
      setHandleDisagree(() => () => {
        resetHandle();
        resolve(false);
      });
      setOpen(true);
    }),
  }));

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDisagree}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>確認</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            本当によろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAgree}>はい</Button>
          <Button onClick={handleDisagree}>いいえ</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default ConfirmDialog;
