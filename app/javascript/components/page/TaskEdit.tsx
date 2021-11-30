import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import BaseLayout from 'BaseLayout';
import TaskForm from 'common/TaskForm';
import useQueryEx from 'hooks/useQueryEx';
import useMutationEx from 'hooks/useMutationEx';
import { GQL_TASK, GQL_UPDATE_TASK } from 'utils/gql';
import { Task } from 'utils/types';

const TaskEdit = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { data } = useQueryEx(GQL_TASK, { variables: { id: params.id } });
  const task = data.task as Task;

  const [updateTask] = useMutationEx(GQL_UPDATE_TASK, {
    onCompleted: () => {
      navigate('/', { state: { message: 'タスクを更新しました' } });
    },
  });
  const handleEdit = (data) => {
    updateTask({ variables: { ...data, id: params.id } });
  };

  return (
    <BaseLayout>
      {task && (
        <TaskForm
          title="タスク編集"
          task={task}
          buttonText="更新"
          onAction={handleEdit}
        />
      )}
    </BaseLayout>
  );
};

export default TaskEdit;
