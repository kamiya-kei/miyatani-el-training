import React, { useState, useEffect, useContext } from 'react';
import { UtilContext } from 'utils/contexts';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import AdminLayout from 'AdminLayout';
import TaskCard from 'common/TaskCard';
import SortForm from 'common/SortForm';
import SearchForm from 'common/SearchForm';
import Priority from 'common/Priority';
import DoneChip from 'common/DoneChip';
import TasksPagination from 'common/TasksPagination';
import { DATETIME_FORMAT } from 'utils/constants';
import { SortType, SearchTarget, Task } from 'utils/types';
import { client } from 'common/MyApolloProvider';
import { useQuery } from '@apollo/client';
import { GQL_USER, GQL_TASKS } from 'utils/gql';
import MuiLink from '@mui/material/Link';

const DEFAULT_SEARCH_PARAMETERS: {
  word: string;
  target: SearchTarget;
  doneIds: ('-1' | '0' | '1')[];
  sortType: SortType;
  isAsc: boolean;
  page: number;
  userId: number;
} = {
  word: '',
  target: 'all',
  doneIds: ['-1', '0', '1'],
  sortType: 'created_at',
  isAsc: false,
  page: 1,
  userId: null,
};

const AdminUserTasks = () => {
  const { util } = useContext(UtilContext);
  const params = useParams();

  const [searchParams, setSearchParams] = useState({
    ...DEFAULT_SEARCH_PARAMETERS,
    userId: params.id,
  });

  const { loading, error, data } = useQuery(GQL_USER, {
    variables: { id: params.id },
  });

  const [tasks, setTasks] = useState([] as Task[]);
  const [maxPage, setMaxPage] = useState(1);

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
    <AdminLayout>
      <Stack spacing={2} style={{ padding: '20px 0' }}>
        <h3 style={{ textAlign: 'center' }}>
          {data?.user.name}さんのタスク一覧
        </h3>
        <p style={{ textAlign: 'right', width: '100%' }}>
          <MuiLink component={Link} to="/admin">
            ユーザー一覧に戻る
          </MuiLink>
        </p>
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
        </TaskCard>
      ))}

      <div style={{ padding: '20px 0' }}>
        <TasksPagination
          page={searchParams.page}
          maxPage={maxPage}
          onClick={handleClickPagination}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminUserTasks;
