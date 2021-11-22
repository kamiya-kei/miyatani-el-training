import React from 'react';
import BaseLayout from 'BaseLayout';
import MuiLink from '@mui/material/Link';
import UserList from 'common/UserList';

import { Link } from 'react-router-dom';
const AdminTop = () => {
  return (
    <BaseLayout>
      <div style={{ margin: '20px 0' }}>
        <h3 style={{ textAlign: 'center' }}>管理画面 ユーザー一覧</h3>
        <p style={{ textAlign: 'right', width: '100%' }}>
          <MuiLink component={Link} to="/admin/users/new">
            新規ユーザー作成
          </MuiLink>
        </p>
        <UserList />
      </div>
    </BaseLayout>
  );
};

export default AdminTop;
