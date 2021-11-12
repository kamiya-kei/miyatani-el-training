import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'module/axios_with_csrf';
import dayjs from 'dayjs';
import BaseLayout from "BaseLayout";
import TaskCard from "common/TaskCard";
import ConfirmDialog from "common/ConfirmDialog";
import FlashMessage from "common/FlashMessage";
import Box from '@mui/material/Box';
import { datetime_format } from 'utils/constants';
import SortForm from "common/SortForm";

const Top = () => {
  const [tasks, setTasks] = useState([]);
  const { state } = useLocation();
  const confirmDialogRef = useRef();
  const flashMessageRef = useRef();

  useEffect(() => {
    axios.post('/graphql', {
      query: `
        {
          tasks {
            id
            title
            description
            deadline
            createdAt
          }
        }
      `})
      .then(res => {
        setTasks(res.data.data.tasks);
      })
      .catch(error => {
        alert('申し訳ございません、エラーが発生しました。ページを再読み込みしてください。');
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!state) { return; }
    // タスク作成・編集画面から戻ってきた時にフラッシュメッセージを表示する
    flashMessageRef.current.showMessage(state.message);
  }, [state]);

  const handleDelete = async (id) => {
    const is_agree = await confirmDialogRef.current.confirm();
    if (!is_agree) { return; }

    axios.post('/graphql', {
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
      `})
      .then(res => {
        // 削除を画面に反映
        setTasks(tasks.filter(task=>task.id != id));//削除したタスク以外のタスクを残して再セット
        // フラッシュメッセージ表示
        flashMessageRef.current.showMessage('タスクが削除されました');
      })
      .catch(error => {
        alert('申し訳ございません、エラーが発生しました。ページを再読み込みしてください。');
        console.error(error);
      });
  };

  // タスク一覧のソート処理
  const getValueForSort = sortType => task => dayjs(task[sortType] || '2100-01-01'); // 期限が設定されていないものは遥か未来として扱う
  const handleChangeSort = (sortType, isAsc) => {
    const f = getValueForSort(sortType);
    const n = isAsc ? 1 : -1;
    const sortedTasks = Array.from(tasks).sort((a, b) => (f(a) - f(b)) * n);
    setTasks(sortedTasks);
  };

  return (
    <BaseLayout>
      <ConfirmDialog ref={confirmDialogRef} />
      <FlashMessage ref={flashMessageRef} />

      <div style={{ padding: '20px 0' }}>
        <SortForm onChange={handleChangeSort} />
      </div>

      {tasks.map(task=> (
        <TaskCard key={task.id}>
          <CardHeader
            title={task.title}
            subheader={
              <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  作成日時:
                  {dayjs(task.createdAt).format(datetime_format)}
                </div>
                <div>
                  期限:
                  {task.deadline ? dayjs(task.deadline).format(datetime_format) : '--'}
                </div>
              </Box>
            }
          />
          <CardContent>{task.description}</CardContent>
          <CardActions>
            <Stack spacing={2} direction="row">
              <Button component={Link} to={`/tasks/${task.id}/edit`} variant="contained" size="small" color="primary">編集</Button>
              <Button variant="contained" size="small" color="secondary" onClick={()=>{handleDelete(task.id)}}>削除</Button>
            </Stack>
          </CardActions>
        </TaskCard>
      ))}
    </BaseLayout>
  );
};

export default Top;
