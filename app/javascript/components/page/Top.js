import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'module/axios_with_csrf';
import dayjs from 'module/dayjs_tz';
import BaseLayout from "BaseLayout";

const TaskCard = styled(Card)(
  ({theme}) => `
  max-width: 600px;
  margin: 15px;
`,
);

const Top = () => {
  const [tasks, setTasks] = useState([]);

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

  return (
    <BaseLayout>
      {tasks.map(task=> (
        <TaskCard key={task.id}>
          <CardHeader
            title={task.title}
            subheader={dayjs.tz(task.createdAt).format('YYYY-MM-DD HH:mm:ss')}
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
