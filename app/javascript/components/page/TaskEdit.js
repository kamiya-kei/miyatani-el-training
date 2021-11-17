import React, { useState, useEffect, createRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import axios from 'module/axios_with_csrf';
import BaseLayout from "BaseLayout";
import TaskForm from "common/TaskForm";

const TaskEdit = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [task, setTask] = React.useState({});
  const formRef = createRef();

  useEffect(() => {
    axios.post('/graphql', {
      query: `
        {
          task(id: ${params.id}) {
            id
            title
            description
            deadline
            done {
              id
            }
            priorityNumber
            createdAt
          }
        }
      `})
      .then(res => {
        setTask(res.data.data.task);
      })
      .catch(error => {
        alert('申し訳ございません、エラーが発生しました。ページを再読み込みしてください。');
        console.error(error);
      });
  }, []);

  const handleEdit = (data) => {
    axios.post('/graphql', {
      query: `
        mutation {
          updateTask(
            input:{
              id: ${params.id}
              title: "${data.title}"
              description: "${data.description}"
              deadline: "${data.deadline}"
              doneId: "${data.done_id}"
              priorityNumber: ${data.priorityNumber}
            }
          ){
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
        console.log(res);
        navigate('/', {state: {message: 'タスクを更新しました'}});
      })
      .catch(error => {
        alert('申し訳ございません、エラーが発生しました。ページを再読み込みしてください。');
        console.error(error);
      });
  };

  return (
    <BaseLayout>
      {task.id &&
        <TaskForm title="タスク編集" task={task} buttonText="更新" onAction={handleEdit} />
      }
    </BaseLayout>
  );
};

export default TaskEdit;
