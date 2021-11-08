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
import BaseLayout from "BaseLayout";

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
        <Card key={task.id} style={{maxWidth: '600px', margin: '15px'}}>
          <CardHeader title={task.title} />
          <CardContent>{task.description}</CardContent>
          <CardActions>
            <Stack spacing={2} direction="row">
              <Button component={Link} to={`/tasks/${task.id}/edit`} variant="contained" size="small" color="primary">編集</Button>
              <Button variant="contained" size="small" color="secondary">削除</Button>
            </Stack>
          </CardActions>
        </Card>
      ))}
    </BaseLayout>
  );
};

export default Top;
