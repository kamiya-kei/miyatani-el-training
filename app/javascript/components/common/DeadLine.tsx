import React, { useState } from 'react';
import { UseFormSetValue, UseFormRegister, FieldError } from 'react-hook-form';
import { Inputs } from 'common/TaskForm';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterDayjs';
import dayjs from 'dayjs';
import { DATETIME_FORMAT } from 'utils/constants';

interface DeadLineProps {
  defaultValue: string;
  setValue: UseFormSetValue<Inputs>;
  register: UseFormRegister<Inputs>;
  error?: FieldError;
}

const DeadLine = (props: DeadLineProps) => {
  const [value, setValue] = useState(new Date(props.defaultValue || ''));

  const handleChange = (newValue) => {
    setValue(newValue);
    const newValueString = dayjs(newValue.$d).format(DATETIME_FORMAT);
    props.setValue('deadline', newValueString);
  };

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DateTimePicker
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
            error={!!props.error}
            helperText={props.error?.message}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DeadLine;
