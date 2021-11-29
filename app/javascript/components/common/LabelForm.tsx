import React, { useState, useEffect, useContext } from 'react';
import { UtilContext } from 'utils/contexts';
import { UseFormSetValue } from 'react-hook-form';
import { Link } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import useMutationEx from 'hooks/useMutationEx';
import {
  GQL_CREATE_LABEL,
  GQL_UPDATE_LABEL,
  GQL_DELETE_LABEL,
} from 'utils/gql';
import { Label } from 'utils/types';

interface LabelFormProps {
  labels: Label[];
  defaultValue: Label['id'][];
  setLabels: (labels: Label[]) => void;
  setValue?: UseFormSetValue<{ labelIds: Label['id'][] }>;
  onChange?: (labels: Label[]) => void;
  canEdit?: boolean;
  userId?: string;
}

const LabelForm = (props: LabelFormProps) => {
  const { util } = useContext(UtilContext);
  const [open, setOpen] = useState(false);

  const canEdit = props.canEdit !== false; // default: true
  const baseUrl = props.userId ? `/admin/users/${props.userId}/tasks` : '/';

  // ---------------------------------------------------------

  const [labelIds, setLabelIds] = useState(props.defaultValue);
  const [newLabelIds, setNewLabelIds] = useState([]);

  useEffect(() => {
    props.setValue?.('labelIds', labelIds);
  }, []);

  const handleOpen = () => {
    setNewLabelIds(labelIds);
    setOpen(true);
  };

  const handleCancel = () => {
    setNewLabelIds([]);
    setOpen(false);
  };

  const handleSetLabel = () => {
    props.setValue?.('labelIds', newLabelIds);
    props.onChange?.(newLabelIds);
    setLabelIds(newLabelIds);
    setNewLabelIds([]);
    setOpen(false);
  };

  const handleCheckLabel = (id) => (event) => {
    const ids = new Set(newLabelIds);
    if (event.target.checked) {
      ids.add(id);
    } else {
      ids.delete(id);
    }
    setNewLabelIds(Array.from(ids));
  };

  // ラベルの作成 ----------------------------------------------

  const [createLabel] = useMutationEx(GQL_CREATE_LABEL, {
    onCompleted: (res) => {
      props.setLabels(res.createLabel.labels);
      util.flashMessage('ラベルを作成しました');
    },
    onError: () => {
      util.flashMessage('同じラベルが既に存在します', 'error');
    },
  });
  const handleCreateLabel = () => {
    const name = window.prompt('ラベル名を入力してください');
    createLabel({ variables: { name } });
  };

  // ラベルの編集 ----------------------------------------------
  const [updateLabel] = useMutationEx(GQL_UPDATE_LABEL, {
    onCompleted: (res) => {
      props.setLabels(res.updateLabel.labels);
      util.flashMessage('ラベル名を変更しました');
    },
    onError: () => {
      util.flashMessage('同じラベルが既に存在します', 'error');
    },
  });
  const handleUpdateLabel = (label) => () => {
    const name = window.prompt('ラベル名を入力してください', label.name);
    if (name !== label.name) updateLabel({ variables: { id: label.id, name } });
  };

  // ラベルの削除 ----------------------------------------------

  const [deleteLabel] = useMutationEx(GQL_DELETE_LABEL, {
    onCompleted: (res) => {
      props.setLabels(res.deleteLabel.labels);
      util.flashMessage('ラベルを削除しました');
    },
  });
  const handleDeleteLabel = (id) => async () => {
    setOpen(false);
    const is_agree = await util.confirmDialog(
      '本当にラベルに削除してよろしいですか？'
    );
    setOpen(true);
    if (is_agree) deleteLabel({ variables: { id } });
  };

  return (
    <>
      ラベル
      {canEdit && (
        <IconButton size="small" onClick={handleOpen}>
          <EditIcon />
        </IconButton>
      )}
      ：
      {labelIds.map((labelId) => {
        const label = props.labels.find((label) => label.id == labelId);
        if (!label) return <></>;
        return (
          <MuiLink
            key={label.id}
            style={{ textDecoration: 'underline', margin: '0 10px' }}
            component={Link}
            to={`${baseUrl}?labelId=${label.id}`}
          >
            {label.name}
          </MuiLink>
        );
      })}
      <Dialog fullWidth maxWidth={'xs'} open={open}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          ラベル
          <IconButton
            size="small"
            sx={{ float: 'right' }}
            onClick={handleCancel}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          {props.labels.map((label) => (
            <div key={label.id} data-test-label={label.id}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '0 20px',
                }}
              >
                <Grid container>
                  <Grid item xs={1}>
                    <Checkbox
                      checked={newLabelIds.includes(label.id)}
                      onClick={handleCheckLabel(label.id)}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        paddingLeft: '40px',
                        height: '100%',
                      }}
                    >
                      {label.name}
                    </div>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton size="small" onClick={handleUpdateLabel(label)}>
                      <EditIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      size="small"
                      onClick={handleDeleteLabel(label.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
              <Divider />
            </div>
          ))}
          <div style={{ marginTop: '20px' }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleCreateLabel}
            >
              新しいラベルを作成
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSetLabel}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LabelForm;
