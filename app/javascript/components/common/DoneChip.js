import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';

const DoneChip = (props) => {
  const COLORS = {
    '-1': 'default',
    0: 'warning',
    1: 'success',
  };
  const color = COLORS[props.done.id];
  return <Chip label={props.done.text} color={color} size="small" />;
};

DoneChip.propTypes = {
  done: PropTypes.object,
};

export default DoneChip;
