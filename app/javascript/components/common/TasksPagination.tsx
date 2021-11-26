import React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

interface TaskPaginationProps {
  onClick: (page: number) => void;
  page: number;
  maxPage: number;
}

const TasksPagination = (props: TaskPaginationProps) => {
  const handleClick = (page: number) => () => {
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

export default TasksPagination;
