import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'module/axios_with_csrf';
import BaseLayout from 'BaseLayout';
import TaskForm from 'common/TaskForm';

const TaskPost = () => {
  const navigate = useNavigate();

  const handleAdd = (data) => {
    axios
      .post('/graphql', {
        query: `
        mutation {
          createTask(
            input:{
              title: "${data.title}"
              description: "${data.description}"
              deadline: "${data.deadline}"
              doneId: "${data.done_id}"
              priorityNumber: ${data.priorityNumber}
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
      .then(() => {
        navigate('/', { state: { message: 'タスクを投稿しました' } });
      })
      .catch((error) => {
        alert(
          '申し訳ございません、エラーが発生しました。ページを再読み込みしてください。'
        );
        console.error(error);
      });
  };

  return (
    <BaseLayout>
      <TaskForm
        title="タスク投稿フォーム"
        task={{}}
        buttonText="投稿"
        onAction={handleAdd}
      />
    </BaseLayout>
  );
};

export default TaskPost;
