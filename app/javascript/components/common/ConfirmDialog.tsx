import React, { forwardRef, useState, useImperativeHandle } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>; // eslint-disable-line
    },
    ref: React.Ref<unknown>
  ) => {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);
Transition.displayName = 'Transition';

export interface ConfirmDialogHandler {
  confirm: () => Promise<boolean>;
}

const ConfirmDialog = forwardRef<ConfirmDialogHandler>((props, ref) => {
  const [open, setOpen] = useState(false);

  const [handleAgree, setHandleAgree] = useState(null);
  const [handleDisagree, setHandleDisagree] = useState(null);
  const resetHandle = () => {
    setHandleAgree(null);
    setHandleDisagree(null);
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    confirm: () =>
      new Promise((resolve) => {
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
ConfirmDialog.displayName = 'ConfirmDialog';

export default ConfirmDialog;
