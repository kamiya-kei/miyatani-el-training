import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

const TasksPagination = (props) => {
  const handleClick = (page) => () => {
    props.onClick(page);

    // ページ上部へスクロール
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <Pagination
        page={props.page}
        count={props.maxPage}
        renderItem={(item) => (
          <PaginationItem {...item} onClick={handleClick(item.page)} />
        )}
        sx={{ display: 'flex', justifyContent: 'center' }}
      />
    </>
  );
};

TasksPagination.propTypes = {
  onClick: PropTypes.func,
  page: PropTypes.number,
  maxPage: PropTypes.number,
};

export default TasksPagination;
