import React, { useRef, useState } from 'react';
import { UtilContext } from 'utils/contexts';
import FlashMessage, { FlashMessageHandler } from 'common/FlashMessage';
import ConfirmDialog, { ConfirmDialogHandler } from 'common/ConfirmDialog';
import PromptDialog, { PromptDialogHandler } from 'common/PromptDialog';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const UtilProvider = (props: { children: React.ReactNode }) => {
  const flashMessageRef = useRef({} as FlashMessageHandler);
  const confirmDialogRef = useRef({} as ConfirmDialogHandler);
  const promptDialogRef = useRef({} as PromptDialogHandler);
  const [isLoading, setIsLoading] = useState(false);

  const util = {
    flashMessage: (message, severity = null) =>
      flashMessageRef.current.showMessage(message, severity),
    confirmDialog: async (message) =>
      await confirmDialogRef.current.confirm(message),
    promptDialog: async (message, defaultValue = '') =>
      await promptDialogRef.current.prompt(message, defaultValue),
    setBackdrop: (loading: boolean) => setIsLoading(loading),
  };

  return (
    <UtilContext.Provider value={{ util }}>
      {props.children}
      <FlashMessage ref={flashMessageRef} />
      <ConfirmDialog ref={confirmDialogRef} />
      <PromptDialog ref={promptDialogRef} />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </UtilContext.Provider>
  );
};

export default UtilProvider;
