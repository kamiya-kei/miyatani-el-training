import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';

const DoneColor = (id) => {
  const COLORS = {
    '-1': 'default',
    0: 'warning',
    1: 'success',
  };
  return COLORS[id];
};

const DoneChip = (props) => (
  <Chip label={props.done.text} color={DoneColor(props.done.id)} size="small" />
);

export default DoneChip;
