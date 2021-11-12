import React, { useState } from "react";
import PropTypes from "prop-types";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ArrowToggleIcon = (props) => (
  props.isAsc ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
);

const SortForm = (props) => {
  const [sortType, setSortType] = useState('createdAt');
  const [isAsc, setIsAsc] = useState(false);

  const handleChange = (event, newValue) => {
    if (newValue) {
      // 並び替え項目を切り替えて、降順にリセット
      setSortType(newValue);
      setIsAsc(false);
      props.onChange(newValue, false);
    } else {
      // 昇順・降順を切り替え
      setIsAsc(!isAsc);
      props.onChange(sortType, !isAsc);
    }
  };

  return (
    <>
      並び順：
      <ToggleButtonGroup
        color="primary"
        value={sortType}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="createdAt" sx={{ width: '110px' }}>
          作成日時
          {sortType === 'createdAt' &&
            <ArrowToggleIcon isAsc={isAsc} />
          }
        </ToggleButton>
        <ToggleButton value="deadline" sx={{ width: '80px' }}>
          期限
          {sortType === 'deadline' &&
            <ArrowToggleIcon isAsc={isAsc} />
          }
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}

export default SortForm;
