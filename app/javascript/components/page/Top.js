import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import axios from 'module/axios_with_csrf';
import dayjs from 'dayjs';
import BaseLayout from "BaseLayout";
import TaskCard from "common/TaskCard";

const Top = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');
  const { state } = useLocation();

  useEffect(() => {
    axios.post('/graphql', {
      query: `
        {
          tasks {
            id
            title
            description
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
    setOpen(true);
    setFlashMessage(state.message);
  }, [state]);

  return (
    <BaseLayout>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={() => {setOpen(false)}}
      >
        <Alert severity="success" onClose={() => {setOpen(false)}}>{flashMessage} </Alert>
      </Snackbar>

      {tasks.map(task=> (
        <TaskCard key={task.id}>
          <CardHeader
            title={task.title}
            subheader={dayjs(task.createdAt).format('YYYY-MM-DD HH:mm:ss')}
          />
          <CardContent>{task.description}</CardContent>
          <CardActions>
            <Stack spacing={2} direction="row">
              <Button component={Link} to={`/tasks/${task.id}/edit`} variant="contained" size="small" color="primary">編集</Button>
              <Button variant="contained" size="small" color="secondary">削除</Button>
            </Stack>
          </CardActions>
        </TaskCard>
      ))}
    </BaseLayout>
  );
};

export default Top;
