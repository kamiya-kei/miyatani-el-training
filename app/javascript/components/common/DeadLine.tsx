import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterDayjs';
import dayjs from 'dayjs';
import { DATETIME_FORMAT } from 'utils/constants';

const DeadLine = (props) => {
  const [value, setValue] = useState(new Date(props.defaultValue || ''));

  const handleChange = (newValue) => {
    setValue(newValue);
    const newValueString = dayjs(newValue.$d).format(DATETIME_FORMAT);
    props.setValue('deadline', newValueString);
  };

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DateTimePicker
        name="deadline"
        label="期限"
        inputFormat="YYYY-MM-DD HH:mm:ss"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            name="deadline"
            {...params}
            {...props.register('deadline', {
              pattern: {
                value: /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/,
                message: '日時の書式が変です',
              },
            })}
            error={!!props.errors.deadline}
            helperText={props.errors.deadline?.message}
          />
        )}
      />
    </LocalizationProvider>
  );
};

DeadLine.propTypes = {
  defaultValue: PropTypes.string,
  setValue: PropTypes.func,
  register: PropTypes.func,
  errors: PropTypes.object,
};

export default DeadLine;
