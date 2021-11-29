import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AdminLayout from 'AdminLayout';
import useQueryEx from 'hooks/useQueryEx';
import { GQL_USER } from 'utils/gql';
import MuiLink from '@mui/material/Link';
import TaskList from 'common/TaskList';

const AdminUserTasks = () => {
  const params = useParams();

  const {
    data: { user },
  } = useQueryEx(GQL_USER, { variables: { id: params.id } });

  return (
    <AdminLayout maxWidth="sm">
      {user && (
        <TaskList userId={user.id}>
          <h3 style={{ textAlign: 'center' }}>{user.name}さんのタスク一覧</h3>
          <p style={{ textAlign: 'right', width: '100%' }}>
            <MuiLink component={Link} to="/admin">
              ユーザー一覧に戻る
            </MuiLink>
          </p>
        </TaskList>
      )}
    </AdminLayout>
  );
};

export default AdminUserTasks;
