import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'module/axios_with_csrf';
import dayjs from 'dayjs';
import BaseLayout from 'BaseLayout';
import TaskCard from 'common/TaskCard';
import ConfirmDialog, { ConfirmDialogHandler } from 'common/ConfirmDialog';
import FlashMessage, { FlashMessageHandler } from 'common/FlashMessage';
import SortForm from 'common/SortForm';
import SearchForm from 'common/SearchForm';
import Priority from 'common/Priority';
import DoneChip from 'common/DoneChip';
import TasksPagination from 'common/TasksPagination';
import { DATETIME_FORMAT } from 'utils/constants';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const DEFAULT_SEARCH_PARAMETERS = {
  word: '',
  target: 'all',
  doneIds: ['-1', '0', '1'],
  sortType: 'createdAt',
  isAsc: false,
  page: 1,
};

const Top = () => {
  const [searchParams, setSearchParams] = useState(DEFAULT_SEARCH_PARAMETERS);
  const [tasks, setTasks] = useState([]);
  const [maxPage, setMaxPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { state } = useLocation();
  const confirmDialogRef = useRef({} as ConfirmDialogHandler);
  const flashMessageRef = useRef({} as FlashMessageHandler);

  const getTasks = (newParams = {}) => {
    const allParams = { ...searchParams, ...newParams }; // 新しいパラメータを上書き
    const { page, word, target, doneIds, sortType, isAsc } = allParams;
    setSearchParams(allParams);

    setIsLoading(true);
    axios
      .post('/graphql', {
        query: `
        {
          tasks(
            page: ${page},
            word: "${word}",
            doneIds: [${doneIds}],
            sortType: "${sortType}",
            isAsc: ${isAsc},
            target: "${target}"
          ) {
            tasks {
              id
              title
              description
              deadline
              done {
                id
                text
              }
              priorityNumber
              createdAt
            }
            count
            maxPage
          }
        }
      `,
      })
      .then((res) => {
        const result = res.data.data.tasks;
        setTasks(result.tasks);
        setMaxPage(result.maxPage);
      })
      .catch((error) => {
        alert(
          '申し訳ございません、エラーが発生しました。ページを再読み込みしてください。'
        );
        console.error(error);
      })
      .finally(() => {
        // loadingが終わったことを認識できるように少しだけloadingを非表示にするまで遅延
        setTimeout(() => setIsLoading(false), 100);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    if (!state) return;

    // タスク作成・編集画面から戻ってきた時にフラッシュメッセージを表示する
    if (!flashMessageRef.current) return;
    flashMessageRef.current.showMessage(state.message);
  }, [state]);

  const handleDelete = async (id) => {
    if (!confirmDialogRef.current) return;
    const is_agree = await confirmDialogRef.current.confirm();
    if (!is_agree) return;

    axios
      .post('/graphql', {
        query: `
        mutation {
          deleteTask(
            input:{
              id: ${id}
            }
          ){
            task {
              id
            }
          }
        }
      `,
      })
      .then(() => {
        // 削除後、タスク一覧のデータを再取得して更新
        getTasks();
        // フラッシュメッセージ表示
        flashMessageRef.current.showMessage('タスクが削除されました');
      })
      .catch((error) => {
        alert(
          '申し訳ございません、エラーが発生しました。ページを再読み込みしてください。'
        );
        console.error(error);
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
      <ConfirmDialog ref={confirmDialogRef} />
      <FlashMessage ref={flashMessageRef} />

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

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </BaseLayout>
  );
};

export default Top;
