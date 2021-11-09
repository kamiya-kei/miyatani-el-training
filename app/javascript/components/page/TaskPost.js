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

  const handleAdd = () => {
    const formData = new FormData(formRef.current);
    axios.post('/graphql', {
      query: `
        mutation {
          createTask(
            input:{
              title: "${formData.get('title')}"
              description: "${formData.get('description')}"
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
      <TaskForm title="タスク投稿フォーム" task={{}} ref={formRef}>
        <Button variant="contained" size="small" color="primary" onClick={handleAdd}>投稿</Button>
      </TaskForm>
    </BaseLayout>
  );
};

export default TaskPost;
