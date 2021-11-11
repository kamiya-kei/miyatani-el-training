import React, { useState } from "react";
import PropTypes from "prop-types";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterDayjs';

const DeadLine = (props) => {
  const [value, setValue] = useState(new Date(props.deadLine || ''));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DateTimePicker
        name='deadline'
        label="期限"
        inputFormat="YYYY-MM-DD HH:mm:ss"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField name='deadline'
            {...params}
            {...props.register('deadline',  { required: false })}
            error={false}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DeadLine;
