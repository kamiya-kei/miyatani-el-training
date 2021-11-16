import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const PriorityForm = (props) => {
  const [priority, setPriority] = useState(props.defaultValue);

  const handleChange = (event) => {
    setPriority(event.target.value);
    props.setValue('priorityNumber', event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="status-label">優先度</InputLabel>
        <Select
          labelId="status-label"
          value={priority}
          label="優先度"
          onChange={handleChange}
        >
          <MenuItem value="0">低</MenuItem>
          <MenuItem value="1">中</MenuItem>
          <MenuItem value="2">高</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default PriorityForm
