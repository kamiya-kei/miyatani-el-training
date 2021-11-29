import React from 'react';
import { Link } from 'react-router-dom';

import MuiLink from '@mui/material/Link';
import AdminLayout from 'AdminLayout';
import UserList from 'common/UserList';

const AdminTop = () => {
  return (
    <AdminLayout>
      <div style={{ margin: '20px 0' }}>
        <h3 style={{ textAlign: 'center' }}>ユーザー一覧</h3>
        <p style={{ textAlign: 'right', width: '100%' }}>
          <MuiLink component={Link} to="/admin/users/new">
            新規ユーザー作成
          </MuiLink>
        </p>
        <UserList />
      </div>
    </AdminLayout>
  );
};

export default AdminTop;
