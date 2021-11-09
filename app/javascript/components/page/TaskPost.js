import React, { useState, createRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'module/axios_with_csrf';
import BaseLayout from "BaseLayout";
import TaskForm from "common/TaskForm";

const TaskPost = () => {
  const navigate = useNavigate();
  const formRef = createRef();

  const handleAdd = (data) => {
    axios.post('/graphql', {
      query: `
        mutation {
          createTask(
            input:{
              title: "${data.title}"
              description: "${data.description}"
            }
          ) {
            task {
              id
              title
              description
              createdAt
            }
          }
        }
      `,
      })
      .then(res => {
        navigate('/');
      })
      .catch(error => {
        alert('申し訳ございません、エラーが発生しました。ページを再読み込みしてください。');
        console.error(error);
      });
  };

  return (
    <BaseLayout>
      <TaskForm title="タスク投稿フォーム" task={{}} buttonText="投稿" onAction={handleAdd} />
    </BaseLayout>
  );
};

export default TaskPost;
