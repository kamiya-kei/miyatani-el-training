import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { Done } from 'utils/types';
interface SearchFormProps {
  onSearch: ({ word, target, doneIds }) => void;
  onReset: () => void;
  word: string;
  target: 'all' | 'title' | 'description';
  doneIds: Done['id'][];
  children?: React.ReactNode;
}

const SearchForm = (props: SearchFormProps) => {
  const [formValues, setFormValues] = useState({
    word: props.word,
    target: props.target,
    doneIds: props.doneIds,
  });
  const handleChangeWord = (event) => {
    setFormValues({ ...formValues, word: event.target.value });
  };
  const handleChangeTarget = (event) => {
    setFormValues({ ...formValues, target: event.target.value });
  };
  const handleChangeDoneIds = (event) => {
    const ids = new Set(formValues.doneIds);
    if (event.target.checked) {
      ids.add(String(event.target.value) as Done['id']);
    } else {
      ids.delete(String(event.target.value) as Done['id']);
    }
    setFormValues({ ...formValues, doneIds: Array.from(ids) });
  };
  const handleReset = () => {
    setFormValues({
      word: '',
      target: 'all',
      doneIds: ['-1', '0', '1'],
    });
    props.onReset();
  };

  const handleSubmit = () => {
    props.onSearch(formValues);
  };

  return (
    <Paper component="form" sx={{ p: '2px 4px', position: 'relative' }}>
      <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
        <InputBase
          name="word"
          sx={{ ml: 1, flex: 1 }}
          placeholder="検索ワード"
          inputProps={{ 'aria-label': 'search word' }}
          onKeyDown={(event) => {
            // フォーム内でEnter押下時にページ遷移しないようにする
            if (event.code !== 'Enter') return;
            event.preventDefault();
            handleSubmit();
          }}
          value={formValues.word}
          onChange={handleChangeWord}
        />
        <IconButton
          id="search"
          type="button"
          sx={{ p: '10px' }}
          aria-label="search"
          onClick={handleSubmit}
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="search-target"
          name="target"
          value={formValues.target}
          onChange={handleChangeTarget}
        >
          <FormLabel
            component="legend"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            検索対象：
          </FormLabel>
          <FormControlLabel
            value="all"
            control={<Radio size="small" />}
            label="両方"
          />
          <FormControlLabel
            value="title"
            control={<Radio size="small" />}
            label="タイトル"
          />
          <FormControlLabel
            value="description"
            control={<Radio size="small" />}
            label="内容"
          />
        </RadioGroup>
      </FormControl>

      <Button
        variant="outlined"
        color="error"
        size="small"
        sx={{ float: 'right', margin: '10px 10px 0 0' }}
        onClick={handleReset}
      >
        リセット
      </Button>

      <FormControl component="fieldset">
        <FormGroup row aria-label="done_ids">
          <FormLabel
            component="legend"
            sx={{ display: 'flex', alignItems: 'center' }}
            onChange={handleChangeDoneIds}
          >
            ステータス：
          </FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                name="done_ids[]"
                value="-1"
                checked={formValues.doneIds.includes('-1')}
                size="small"
                onChange={handleChangeDoneIds}
              />
            }
            label="未着手"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="done_ids[]"
                value="0"
                checked={formValues.doneIds.includes('0')}
                size="small"
                onChange={handleChangeDoneIds}
              />
            }
            label="着手"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="done_ids[]"
                value="1"
                checked={formValues.doneIds.includes('1')}
                size="small"
                onChange={handleChangeDoneIds}
              />
            }
            label="完了"
          />
        </FormGroup>
      </FormControl>
      <br />
      {props.children}
    </Paper>
  );
};

export default SearchForm;
