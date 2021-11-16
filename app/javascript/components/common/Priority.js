import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';

const TEXTS = ['低', '中', '高'];
const COLORS = ['default', 'warning', 'error'];

const Priority = (props) => {
  return (
    <Chip
      label={TEXTS[props.priority]}
      color={COLORS[props.priority]}
      size="small" 
      sx={{ marginRight: '10px' }}
    />
  );
};

export default Priority;
