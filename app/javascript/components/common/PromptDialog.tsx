import React, { forwardRef, useState, useImperativeHandle } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import TextField from '@mui/material/TextField';

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

export interface PromptDialogHandler {
  prompt: (message: string, defaultValue?: string) => Promise<string>;
}

const PromptDialog = forwardRef<PromptDialogHandler>((props, ref) => {
  const [open, setOpen] = useState(false);

  const [handleAgree, setHandleAgree] = useState(null);
  const [handleDisagree, setHandleDisagree] = useState(null);
  const resetHandle = () => {
    setHandleAgree(null);
    setHandleDisagree(null);
    setOpen(false);
  };
  const [message, setMessage] = useState('');
  const [defaultValue, setDefaultValue] = useState('');
  // const [resultValue, setValue] = useState('');
  // const getResultValue = () => {
  //   return resultValue;
  // };
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(event.target.value);
  //   console.log(resultValue, event.target.value);
  // };
  const [handleChange, setHandleChange] = useState(null);

  useImperativeHandle(ref, () => ({
    prompt: (message = '本当によろしいですか？', defaultValue = '') =>
      new Promise((resolve) => {
        let resultValue = '';
        setHandleChange(() => (event: React.ChangeEvent<HTMLInputElement>) => {
          resultValue = event.target.value;
          setDefaultValue(resultValue);
        });
        setHandleAgree(() => () => {
          resetHandle();
          resolve(resultValue);
        });
        setHandleDisagree(() => () => {
          resetHandle();
          resolve('');
        });
        setMessage(message);
        setDefaultValue(defaultValue);
        setOpen(true);
      }),
  }));

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{message}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            id="prompt"
            variant="outlined"
            value={defaultValue}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAgree}>決定</Button>
          <Button onClick={handleDisagree}>キャンセル</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
PromptDialog.displayName = 'PromptDialog';

export default PromptDialog;
