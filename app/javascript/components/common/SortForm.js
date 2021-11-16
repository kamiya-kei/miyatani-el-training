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
  const handleChange = (event, newValue) => {
    if (newValue) {
      // 並び替え項目を切り替えて、降順にリセット
      props.onChange(newValue, false);
    } else {
      // 昇順・降順を切り替え
      props.onChange(props.sortType, !props.isAsc);
    }
  };

  return (
    <>
      並び順：
      <ToggleButtonGroup
        color="primary"
        value={props.sortType}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="createdAt" sx={{ width: '110px' }}>
          作成日時
          {props.sortType === 'createdAt' &&
            <ArrowToggleIcon isAsc={props.isAsc} />
          }
        </ToggleButton>
        <ToggleButton value="deadline" sx={{ width: '100px' }}>
          期限
          {props.sortType === 'deadline' &&
            <ArrowToggleIcon isAsc={props.isAsc} />
          }
        </ToggleButton>
        <ToggleButton value="priorityNumber" sx={{ width: '100px' }}>
          優先度
          {props.sortType === 'priorityNumber' &&
            <ArrowToggleIcon isAsc={props.isAsc} />
          }
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}

export default SortForm;
