import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'module/axios_with_csrf';

const SearchForm = (props) => {
  const formRef = useRef();

  const handleSubmit = () => {
    const formData = new FormData(formRef.current);
    console.log([...formData.entries()]);

    props.onSearch({
      word: formData.get('word'),
      target: formData.get('target'),
      doneIds: formData.getAll('done_ids[]'),
    });
  };

  return (
    <Paper
      component="form"
      ref={formRef}
      sx={{ p: '2px 4px', }}
    >
      <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}>
        <InputBase
          name="word"
          sx={{ ml: 1, flex: 1 }}
          placeholder="検索ワード"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton id="search" type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSubmit}>
          <SearchIcon />
        </IconButton>
      </Paper>

      <FormControl component="fieldset">
        <RadioGroup row aria-label="search-target" name="target" defaultValue="all">
          <FormLabel component="legend" sx={{display: 'flex', alignItems: 'center' }}>検索対象：</FormLabel>
          <FormControlLabel value="all" control={<Radio size="small" />} label="両方" />
          <FormControlLabel value="title" control={<Radio size="small" />} label="タイトル" />
          <FormControlLabel value="description" control={<Radio size="small" />} label="内容" />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset">
        <FormGroup row aria-label="done_ids">
          <FormLabel component="legend" sx={{display: 'flex', alignItems: 'center' }}>ステータス：</FormLabel>
          <FormControlLabel control={<Checkbox name="done_ids[]" value="-1" defaultChecked size="small" />} label="未着手" />
          <FormControlLabel control={<Checkbox name="done_ids[]" value="0" defaultChecked size="small" />} label="着手" />
          <FormControlLabel control={<Checkbox name="done_ids[]" value="1" defaultChecked size="small" />} label="完了" />
        </FormGroup>
      </FormControl>
    </Paper>
  );
};

export default SearchForm;
