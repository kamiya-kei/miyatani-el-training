import React from 'react';
import Chip from '@mui/material/Chip';
import { PriorityNumber } from 'utils/types';

const TEXTS: ['低', '中', '高'] = ['低', '中', '高'];
const PriorityText = (id: PriorityNumber) => TEXTS[id];

const COLORS: ['default', 'warning', 'error'] = ['default', 'warning', 'error'];
const PriorityColor = (id: PriorityNumber) => COLORS[id];

const Priority = (props: { priority: PriorityNumber }) => {
  return (
    <Chip
      label={PriorityText(props.priority)}
      color={PriorityColor(props.priority)}
      size="small"
      sx={{ marginRight: '10px' }}
    />
  );
};

export default Priority;
