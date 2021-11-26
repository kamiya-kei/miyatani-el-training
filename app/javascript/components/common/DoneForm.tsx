import React, { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { Inputs } from 'common/TaskForm';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Done } from 'utils/types';

interface DoneFormProps {
  defaultValue: Done['id'];
  setValue: UseFormSetValue<Inputs>;
}

const DoneForm = (props: DoneFormProps) => {
  const [done, setDone] = useState(props.defaultValue);

  const handleChange = (event) => {
    setDone(event.target.value);
    props.setValue('doneId', event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="status-label">ステータス</InputLabel>
        <Select
          labelId="status-label"
          value={done}
          label="ステータス"
          onChange={handleChange}
        >
          <MenuItem value="-1">未着手</MenuItem>
          <MenuItem value="0">着手</MenuItem>
          <MenuItem value="1">完了</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default DoneForm;
