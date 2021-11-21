import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'module/axios_with_csrf';
import BaseLayout from 'BaseLayout';
import TaskForm from 'common/TaskForm';

interface Done {
  id: string;
  text: string;
}

interface Task {
  id?: string;
  title?: string;
  description?: string;
  deadline?: Date;
  done?: Done;
  priorityNumber?: 0 | 1 | 2;
  createdAt?: Date;
}

const TaskEdit = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [task, setTask] = React.useState({} as Task);

  useEffect(() => {
    axios
      .post('/graphql', {
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
      `,
      })
      .then((res) => {
        setTask(res.data.data.task);
      })
      .catch((error) => {
        alert(
          '申し訳ございません、エラーが発生しました。ページを再読み込みしてください。'
        );
        console.error(error);
      });
  }, []);

  const handleEdit = (data) => {
    axios
      .post('/graphql', {
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
      .then((res) => {
        console.log(res);
        navigate('/', { state: { message: 'タスクを更新しました' } });
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