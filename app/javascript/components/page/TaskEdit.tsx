import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import BaseLayout from 'BaseLayout';
import TaskForm from 'common/TaskForm';
import { Task } from 'utils/types';
import { client } from 'common/MyApolloProvider';
import { GQL_TASK, GQL_UPDATE_TASK } from 'utils/gql';

const TaskEdit = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [task, setTask] = React.useState({} as Task);

  useEffect(() => {
    client
      .mutate({
        mutation: GQL_TASK,
        variables: { id: params.id },
      })
      .then(({ data }) => {
        setTask(data.task);
      });
  }, []);

  const handleEdit = (data) => {
    console.log(data);
    client
      .mutate({
        mutation: GQL_UPDATE_TASK,
        variables: {
          id: params.id,
          title: data.title,
          description: data.description,
          deadline: data.deadline,
          doneId: data.doneId,
          priorityNumber: data.priorityNumber,
        },
      })
      .then(({ data }) => {
        console.log(data);
        navigate('/', { state: { message: 'タスクを更新しました' } });
      });
  };

  return (
    <BaseLayout>
      {task.id && (
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
