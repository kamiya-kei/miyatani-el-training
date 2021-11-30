import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Label } from 'utils/types';

interface LabelLinksProps {
  labels: Label[];
  userId?: string;
}

const LabelLinks = (props: LabelLinksProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const baseUrl = props.userId ? `/admin/users/${props.userId}/tasks` : '/';

  return (
    <>
      <MuiLink
        component="span"
        sx={{ position: 'absolute', bottom: '5px', right: '15px' }}
        onClick={handleOpen}
        data-test-label-list="#"
      >
        ラベル一覧
      </MuiLink>
      <Dialog maxWidth={'xs'} open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>ラベル一覧</DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          {props.labels.map((label) => (
            <div
              key={label.id}
              style={{
                textAlign: 'left',
                margin: '15px 0',
              }}
            >
              <MuiLink
                component={Link}
                to={`${baseUrl}?labelId=${label.id}`}
                onClick={handleClose}
              >
                {label.name}({label.tasksCount})
              </MuiLink>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LabelLinks;
