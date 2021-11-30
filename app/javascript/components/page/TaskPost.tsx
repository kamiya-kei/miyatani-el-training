import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseLayout from 'BaseLayout';
import TaskForm from 'common/TaskForm';
import useMutationEx from 'hooks/useMutationEx';
import { GQL_CREATE_TASK } from 'utils/gql';
import { Task } from 'utils/types';

const TaskPost = () => {
  const navigate = useNavigate();

  const [createTask] = useMutationEx(GQL_CREATE_TASK, {
    onCompleted: (res) => {
      console.log(res);
      navigate('/', { state: { message: 'タスクを投稿しました' } });
    },
  });

  const handleAdd = (data) => {
    createTask({ variables: data });
  };

  return (
    <BaseLayout>
      <TaskForm
        title="タスク投稿フォーム"
        task={{} as Task}
        buttonText="投稿"
        onAction={handleAdd}
      />
    </BaseLayout>
  );
};

export default TaskPost;
