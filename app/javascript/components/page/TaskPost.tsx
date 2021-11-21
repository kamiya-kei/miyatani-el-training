import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseLayout from 'BaseLayout';
import TaskForm from 'common/TaskForm';
import { client } from 'common/MyApolloProvider';
import { GQL_CREATE_TASK } from 'utils/gql';

const TaskPost = () => {
  const navigate = useNavigate();

  const handleAdd = (data) => {
    client
      .mutate({
        mutation: GQL_CREATE_TASK,
        variables: {
          title: data.title,
          description: data.description,
          deadline: data.deadline,
          doneId: data.doneId,
          priorityNumber: data.priorityNumber,
        },
      })
      .then(({ data }) => {
        console.log(data);
        navigate('/', { state: { message: 'タスクを投稿しました' } });
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
