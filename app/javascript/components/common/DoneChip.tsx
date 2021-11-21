import React from 'react';
import Chip from '@mui/material/Chip';
import { Done } from 'utils/types';

interface DoneChipProps {
  done: Done;
}

const COLORS: { '-1': 'default'; 0: 'warning'; 1: 'success' } = {
  '-1': 'default',
  0: 'warning',
  1: 'success',
};
const DoneColor = (id: Done['id']) => COLORS[id];

const DoneChip = (props: DoneChipProps) => (
  <Chip label={props.done.text} color={DoneColor(props.done.id)} size="small" />
);

export default DoneChip;
