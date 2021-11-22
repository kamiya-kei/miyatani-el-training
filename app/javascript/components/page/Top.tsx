import React, { useState, useEffect, useContext } from 'react';
import { UtilContext } from 'utils/contexts';
import { Link } from 'react-router-dom';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import BaseLayout from 'BaseLayout';
import TaskCard from 'common/TaskCard';
import SortForm from 'common/SortForm';
import SearchForm from 'common/SearchForm';
import Priority from 'common/Priority';
import DoneChip from 'common/DoneChip';
import TasksPagination from 'common/TasksPagination';
import { DATETIME_FORMAT } from 'utils/constants';
import { SortType, SearchTarget, Task } from 'utils/types';
import { client } from 'common/MyApolloProvider';
import { GQL_TASKS, GQL_DELETE_TASK } from 'utils/gql';

const DEFAULT_SEARCH_PARAMETERS: {
  word: string;
  target: SearchTarget;
  doneIds: ('-1' | '0' | '1')[];
  sortType: SortType;
  isAsc: boolean;
  page: number;
} = {
  word: '',
  target: 'all',
  doneIds: ['-1', '0', '1'],
  sortType: 'created_at',
  isAsc: false,
  page: 1,
};

const Top = () => {
  const [searchParams, setSearchParams] = useState(DEFAULT_SEARCH_PARAMETERS);
  const [tasks, setTasks] = useState([] as Task[]);
  const [maxPage, setMaxPage] = useState(1);

  const { util } = useContext(UtilContext);

  const getTasks = (newParams = {}) => {
    const allParams = { ...searchParams, ...newParams }; // 新しいパラメータを上書き
    // const { page, word, target, doneIds, sortType, isAsc } = allParams;
    setSearchParams(allParams);

    util.setBackdrop(true);
    client
      .query({
        query: GQL_TASKS,
        variables: allParams,
      })
      .then(({ data, error }) => {
        if (error) {
          alert(
            '申し訳ございません、エラーが発生しました。ページを再読み込みしてください。'
          );
          console.error(error);
          util.setBackdrop(false);
          return;
        }
        setTasks(data.tasks.tasks);
        setMaxPage(data.tasks.maxPage);
        util.setBackdrop(false);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleDelete = async (id) => {
    const is_agree = await util.confirmDialog();
    if (!is_agree) return;

    client
      .mutate({
        mutation: GQL_DELETE_TASK,
        variables: { id },
      })
      .then(() => {
        // 削除後、タスク一覧のデータを再取得して更新
        getTasks();
        // フラッシュメッセージ表示
        util.flashMessage('タスクが削除されました');
      });
  };

  // タスク一覧のソート処理
  const handleChangeSort = (sortType, isAsc) => {
    getTasks({ sortType, isAsc, page: 1 });
  };

  const handleSearch = ({ word, target, doneIds }) => {
    getTasks({ word, target, doneIds, page: 1 });
  };

  const handleClickPagination = (page) => {
    getTasks({ page });
  };

  return (
    <BaseLayout>
      <Stack spacing={2} style={{ padding: '20px 0' }}>
        <div>
          <SearchForm onSearch={handleSearch} />
        </div>
        <div style={{ textAlign: 'right' }}>
          <SortForm
            sortType={searchParams.sortType}
            isAsc={searchParams.isAsc}
            onChange={handleChangeSort}
          />
        </div>
        <div>
          <TasksPagination
            page={searchParams.page}
            maxPage={maxPage}
            onClick={handleClickPagination}
          />
        </div>
      </Stack>

      {tasks.map((task) => (
        <TaskCard key={task.id} className="task-card">
          {/* .task-card: rspec用 */}
          <CardHeader
            title={
              <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <Priority priority={task.priorityNumber} />
                  {task.title}
                </div>
                <div>
                  <DoneChip done={task.done} />
                </div>
              </Box>
            }
            subheader={
              <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  作成日時:
                  {dayjs(task.createdAt).format(DATETIME_FORMAT)}
                </div>
                <div>
                  期限:
                  {task.deadline
                    ? dayjs(task.deadline).format(DATETIME_FORMAT)
                    : '--'}
                </div>
              </Box>
            }
          />
          <CardContent>{task.description}</CardContent>
          <CardActions>
            <Stack spacing={2} direction="row">
              <Button
                component={Link}
                to={`/tasks/${task.id}/edit`}
                variant="contained"
                size="small"
                color="primary"
              >
                編集
              </Button>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => {
                  handleDelete(task.id);
                }}
              >
                削除
              </Button>
            </Stack>
          </CardActions>
        </TaskCard>
      ))}

      <div style={{ padding: '20px 0' }}>
        <TasksPagination
          page={searchParams.page}
          maxPage={maxPage}
          onClick={handleClickPagination}
        />
      </div>
    </BaseLayout>
  );
};

export default Top;
