import React from 'react';
import Chip from '@mui/material/Chip';

type PriorityId = 0 | 1 | 2;

const TEXTS: ['低', '中', '高'] = ['低', '中', '高'];
const PriorityText = (id: PriorityId) => TEXTS[id];

const COLORS: ['default', 'warning', 'error'] = ['default', 'warning', 'error'];
const PriorityColor = (id: PriorityId) => COLORS[id];

const Priority = (props: { priority: PriorityId }) => {
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
